require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const GITHUB_TOKEN =
  process.env.GH_PAT ||
  process.env.GITHUB_TOKEN ||
  process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME =
  process.env.PORTFOLIO_GITHUB_USERNAME ||
  process.env.GITHUB_USERNAME ||
  process.env.REACT_APP_GITHUB_USERNAME;
const GITHUB_API = "https://api.github.com/graphql";

if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
  console.error(
    "Missing GITHUB_TOKEN or GITHUB_USERNAME in .env file.\n" +
      "Please add them:\n  GITHUB_TOKEN=ghp_...\n  GITHUB_USERNAME=yourname"
  );
  process.exit(1);
}

async function graphql(query) {
  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors, null, 2)}`);
  }
  return json.data;
}

// Organizations you contribute to externally (not as a member).
// The API only returns orgs where you're a member, so these are merged in manually.
const EXTERNAL_ORGS = ["Ctrllaunch"];

// Rolling window for commit history. Older commits are dropped from the output.
const COMMIT_MONTHS_BACK = 12;

async function fetchOrganizations() {
  const data = await graphql(`{
    user(login: "${GITHUB_USERNAME}") {
      organizations(first: 100) {
        nodes {
          login
          avatarUrl
        }
      }
    }
  }`);

  const orgs = data.user.organizations.nodes.map((org) => ({
    login: org.login,
    avatarUrl: org.avatarUrl,
    __typename: "Organization",
  }));

  const memberLogins = new Set(orgs.map((o) => o.login));

  for (const extLogin of EXTERNAL_ORGS) {
    if (memberLogins.has(extLogin)) continue;
    try {
      const extData = await graphql(
        `{ organization(login: "${extLogin}") { login avatarUrl } }`
      );
      orgs.push({
        login: extData.organization.login,
        avatarUrl: extData.organization.avatarUrl,
        __typename: "Organization",
      });
    } catch (e) {
      console.warn(
        `  Warning: could not fetch org "${extLogin}": ${e.message}`
      );
    }
  }

  return { data: orgs };
}

async function fetchAllPaginated(fieldName, queryBuilder) {
  let all = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const query = queryBuilder(cursor);
    const data = await graphql(query);
    const field = data.user[fieldName];
    all = all.concat(field.nodes);
    hasNextPage = field.pageInfo.hasNextPage;
    cursor = field.pageInfo.endCursor;
  }

  return all;
}

async function fetchPullRequests() {
  const allPRs = await fetchAllPaginated("pullRequests", (cursor) => {
    const after = cursor ? `, after: "${cursor}"` : "";
    return `{
      user(login: "${GITHUB_USERNAME}") {
        pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}${after}) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes {
            id
            title
            url
            state
            mergedBy { avatarUrl url login }
            createdAt
            number
            changedFiles
            additions
            deletions
            baseRepository {
              name
              url
              owner { avatarUrl login url }
            }
          }
        }
      }
    }`;
  });

  const open = allPRs.filter((pr) => pr.state === "OPEN").length;
  const merged = allPRs.filter((pr) => pr.state === "MERGED").length;
  const closed = allPRs.filter((pr) => pr.state === "CLOSED").length;

  return { data: allPRs, open, merged, closed, totalCount: allPRs.length };
}

async function fetchIssues() {
  const allIssues = await fetchAllPaginated("issues", (cursor) => {
    const after = cursor ? `, after: "${cursor}"` : "";
    return `{
      user(login: "${GITHUB_USERNAME}") {
        issues(first: 100, orderBy: {field: CREATED_AT, direction: DESC}${after}) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes {
            id
            title
            url
            createdAt
            closed
            number
            assignees(first: 10) {
              nodes { avatarUrl name url }
            }
            repository {
              name
              url
              owner { login avatarUrl url }
            }
          }
        }
      }
    }`;
  });

  const open = allIssues.filter((i) => !i.closed).length;
  const closed = allIssues.filter((i) => i.closed).length;

  return { data: allIssues, open, closed, totalCount: allIssues.length };
}

function commitsSince(months) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString();
}

async function fetchUserId() {
  const data = await graphql(`{ user(login: "${GITHUB_USERNAME}") { id } }`);
  return data.user.id;
}

// Every repo the user can see: their own, ones they collaborate on, and org repos.
// Private repos only come back if the token carries the `repo` scope.
async function fetchRepositories() {
  return fetchAllPaginated("repositories", (cursor) => {
    const after = cursor ? `, after: "${cursor}"` : "";
    return `{
      user(login: "${GITHUB_USERNAME}") {
        repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], orderBy: {field: PUSHED_AT, direction: DESC}${after}) {
          pageInfo { hasNextPage endCursor }
          nodes {
            name
            nameWithOwner
            url
            isPrivate
            isFork
            primaryLanguage { name }
            defaultBranchRef { name }
            owner { login avatarUrl url }
          }
        }
      }
    }`;
  });
}

// Returns null when the token cannot read the repo's git history at all, which
// is different from a repo that simply has no commits in the window. A token
// without the `repo` scope still lists private repos but reports a null
// defaultBranchRef for them.
async function fetchRepoCommits(repo, authorId, since) {
  if (!repo.defaultBranchRef) return null;

  const [owner, name] = repo.nameWithOwner.split("/");
  let all = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const after = cursor ? `, after: "${cursor}"` : "";
    const data = await graphql(`{
      repository(owner: "${owner}", name: "${name}") {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 100, since: "${since}", author: {id: "${authorId}"}${after}) {
                pageInfo { hasNextPage endCursor }
                nodes {
                  oid
                  message
                  messageHeadline
                  committedDate
                  url
                  additions
                  deletions
                  changedFilesIfAvailable
                }
              }
            }
          }
        }
      }
    }`);

    const target = data.repository.defaultBranchRef.target;
    if (!target || !target.history) break;

    all = all.concat(target.history.nodes);
    hasNextPage = target.history.pageInfo.hasNextPage;
    cursor = target.history.pageInfo.endCursor;
  }

  return all;
}

async function fetchCommits() {
  const authorId = await fetchUserId();
  const since = commitsSince(COMMIT_MONTHS_BACK);
  const repos = await fetchRepositories();

  const data = [];
  const unreadable = [];
  for (const repo of repos) {
    const commits = await fetchRepoCommits(repo, authorId, since);
    if (commits === null) {
      unreadable.push(repo.nameWithOwner);
      continue;
    }
    if (!commits.length) continue;

    data.push({
      name: repo.name,
      nameWithOwner: repo.nameWithOwner,
      url: repo.url,
      isPrivate: repo.isPrivate,
      isFork: repo.isFork,
      primaryLanguage: repo.primaryLanguage ? repo.primaryLanguage.name : null,
      owner: repo.owner,
      totalCount: commits.length,
      commits,
    });
  }

  data.sort((a, b) => b.totalCount - a.totalCount);

  const totalCount = data.reduce((sum, r) => sum + r.totalCount, 0);
  const privateRepos = data.filter((r) => r.isPrivate).length;

  if (unreadable.length) {
    const sample = unreadable.slice(0, 5).join(", ");
    const rest =
      unreadable.length > 5 ? `, +${unreadable.length - 5} more` : "";
    console.warn(
      `\n  WARNING: git history unreadable in ${unreadable.length} repo(s), so their ` +
        `commits are missing from this output.\n` +
        `  This almost always means the token lacks the "repo" scope ` +
        `("public_repo" alone cannot read private history).\n` +
        `  Affected: ${sample}${rest}\n`
    );
  }

  return {
    data,
    since,
    totalCount,
    repoCount: data.length,
    privateRepos,
    publicRepos: data.length - privateRepos,
    unreadableRepos: unreadable.length,
  };
}

function writeJSON(filename, data) {
  const outputDir = path.join(__dirname, "..", "src", "shared", "opensource");
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

async function main() {
  console.log(`\nFetching GitHub data for user: ${GITHUB_USERNAME}\n`);

  try {
    process.stdout.write("  Organizations... ");
    const orgs = await fetchOrganizations();
    writeJSON("organizations.json", orgs);
    console.log(`${orgs.data.length} found`);

    process.stdout.write("  Pull Requests... ");
    const prs = await fetchPullRequests();
    writeJSON("pull_requests.json", prs);
    console.log(
      `${prs.totalCount} found (${prs.open} open, ${prs.merged} merged, ${prs.closed} closed)`
    );

    process.stdout.write("  Issues... ");
    const issues = await fetchIssues();
    writeJSON("issues.json", issues);
    console.log(
      `${issues.totalCount} found (${issues.open} open, ${issues.closed} closed)`
    );

    process.stdout.write("  Commits... ");
    const commits = await fetchCommits();
    writeJSON("commits.json", commits);
    console.log(
      `${commits.totalCount} found across ${commits.repoCount} repos ` +
        `(${commits.publicRepos} public, ${commits.privateRepos} private)`
    );

    console.log("\nGitHub data updated successfully!\n");
  } catch (err) {
    console.error("\nError fetching GitHub data:", err.message);
    process.exit(1);
  }
}

main();
