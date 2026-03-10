require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const GITHUB_TOKEN =
  process.env.GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME || process.env.REACT_APP_GITHUB_USERNAME;
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
      console.warn(`  Warning: could not fetch org "${extLogin}": ${e.message}`);
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

    console.log("\nGitHub data updated successfully!\n");
  } catch (err) {
    console.error("\nError fetching GitHub data:", err.message);
    process.exit(1);
  }
}

main();
