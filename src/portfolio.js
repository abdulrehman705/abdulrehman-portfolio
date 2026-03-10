// Website related settings
const settings = {
  isSplash: true, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Abdul Rehman's Portfolio",
  description:
    "Full Stack Developer specializing in architecting end-to-end, AI-driven products with Next.js, Python, NestJS, PostgreSQL, MongoDB, Docker, and AWS.",
  og: {
    title: "Abdul Rehman Portfolio",
    type: "website",
    url: "#",
  },
};

//Home Page
const greeting = {
  title: "Abdul Rehman",
  logo_name: "AbdulRehman",
  nickname: "Abbie",
  subTitle:
    "Full Stack Developer specializing in architecting end-to-end, AI-driven products with Next.js, Python, NestJS, PostgreSQL, MongoDB, Docker, and AWS.\n"
    + "Passionate about building scalable systems, cloud-native architectures, and automation workflows.\n"
    + "Experienced with CI/CD pipelines.",
  resumeLink:
    "https://drive.google.com/file/d/1Y0-kkW_OiiF0v-Pp6_xTEBcFfyYGkVEn/view?usp=sharing",
  portfolio_repository: "https://github.com/abdulrehman705/abdulrehman-portfolio",
  githubProfile: "https://github.com/abdulrehman705",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/abdulrehman705",
    fontAwesomeIcon: "fa-github",
    backgroundColor: "#181717",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/abdulrehman705",
    fontAwesomeIcon: "fa-linkedin-in",
    backgroundColor: "#0077B5",
  },
  {
    name: "Gmail",
    link: "mailto:akabdulrehman159@gmail.com",
    fontAwesomeIcon: "fa-google",
    backgroundColor: "#D14836",
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/abdulrehman.khalid.92560/",
    fontAwesomeIcon: "fa-facebook-f",
    backgroundColor: "#1877F2",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/a_.rehman0/",
    fontAwesomeIcon: "fa-instagram",
    backgroundColor: "#E4405F",
  },
];

const skills = {
  data: [
    // {
    //   title: "Data Science & AI",
    //   fileName: "DataScienceImg",
    //   skills: [
    //     "⚡ Developing highly scalable production ready models for various deeplearning and statistical use cases",
    //     "⚡ Experience of working with Computer Vision and NLP projects",
    //     "⚡ Complex quantitative modelling for dynamic forecasting and time series analysis",
    //   ],
    //   softwareSkills: [
    //     {
    //       skillName: "Tensorflow",
    //       fontAwesomeClassname: "logos-tensorflow",
    //       style: {
    //         backgroundColor: "transparent",
    //       },
    //     },
    //     {
    //       skillName: "Keras",
    //       fontAwesomeClassname: "simple-icons:keras",
    //       style: {
    //         backgroundColor: "white",
    //         color: "#D00000",
    //       },
    //     },
    //     {
    //       skillName: "PyTorch",
    //       fontAwesomeClassname: "logos-pytorch",
    //       style: {
    //         backgroundColor: "transparent",
    //       },
    //     },
    //     {
    //       skillName: "Python",
    //       fontAwesomeClassname: "ion-logo-python",
    //       style: {
    //         backgroundColor: "transparent",
    //         color: "#3776AB",
    //       },
    //     },
    //     {
    //       skillName: "Deeplearning",
    //       imageSrc: "deeplearning_ai_logo.png",
    //     },
    //   ],
    // },
    {
      title: "Full Stack Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building responsive website front end using React-Redux, Next & Vite",
        "⚡ Developing mobile applications using React Native and solo android apps using Kotlin",
        "⚡ Creating application backend in Node, Express, Postgres & Nest",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "Sass",
          fontAwesomeClassname: "simple-icons:sass",
          style: {
            color: "#CC6699",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "TypeScript",
          fontAwesomeClassname: "simple-icons:typescript",
          style: {
            color: "#007ACC",
          },
        },
        {
          skillName: "TailwindCSS",
          fontAwesomeClassname: "simple-icons:tailwindcss",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "devicon-plain:nodejs-wordmark",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "NextJS",
          fontAwesomeClassname: "simple-icons:nextjs",
          style: {
            color: "#000000",
          },
        },
        {
          skillName: "React Native",
          fontAwesomeClassname: "simple-icons:reactnative",
          style: {
            color: "#000000",
          },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Experience working on multiple cloud platforms",
        "⚡ Hosting and maintaining websites on virtual machine instances along with integration of databases",
        "⚡ Deploying deep learning models on cloud to use on mobile devices",
        "⚡ Setting up streaming jobs from DB to Server or vice-versa on GCP and AWS",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: {
            color: "#0089D6",
          },
        },
        {
          skillName: "Firebase",
          fontAwesomeClassname: "simple-icons:firebase",
          style: {
            color: "#FFCA28",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "NestJS",
          fontAwesomeClassname: "simple-icons:nestjs",
          style: {
            color: "#E0234E",
          },
        },
        {
          skillName: "Supabase",
          fontAwesomeClassname: "simple-icons:supabase",
          style: {
            color: "#3FCF8E",
          },
        }
      ],
    },
    {
      title: "UI/UX Design",
      fileName: "DesignImg",
      skills: [
        "⚡ Designing highly attractive user interface for mobile and web applications",
        "⚡ Customizing logo designs and building logos from scratch",
        "⚡ Creating the flow of application functionalities to optimize user experience",
      ],
      softwareSkills: [
        {
          skillName: "Adobe XD",
          fontAwesomeClassname: "simple-icons:adobexd",
          style: {
            color: "#FF2BC2",
          },
        },
        {
          skillName: "Figma",
          fontAwesomeClassname: "simple-icons:figma",
          style: {
            color: "#F24E1E",
          },
        },
        {
          skillName: "Adobe Illustrator",
          fontAwesomeClassname: "simple-icons:adobeillustrator",
          style: {
            color: "#FF7C00",
          },
        },
        {
          skillName: "Inkscape",
          fontAwesomeClassname: "simple-icons:inkscape",
          style: {
            color: "#000000",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "Coursera",
      iconifyClassname: "simple-icons:coursera",
      style: {
        color: "#2A73CC",
      },
      profileLink: "https://www.coursera.org/learner/abdulrehman705",
    },
    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://www.hackerrank.com/profile/existed08",
    },
    {
      siteName: "Udemy",
      iconifyClassname: "simple-icons:udemy",
      style: {
        color: "#A435F0",
      },
      profileLink: "https://www.udemy.com/user/abdul-rehman-2538",
    },
    {
      siteName: "HP Life Global",
      iconifyClassname: "simple-icons:hp",
      style: {
        color: "#000000",
      },
      profileLink: "https://www.life-global.org",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "The Islamia University of Bahawalpur",
      subtitle: "BS Software Engineering",
      logo_path: process.env.PUBLIC_URL + "/images/iiitk_logo.png",
      alt_name: "The Islamia University of Bahawalpur",
      duration: "2021 - 2025",
      descriptions: [
        "⚡ Pursued a Bachelor of Science in Software Engineering with a focus on core computer science subjects including Data Structures, Algorithms, DBMS, Operating Systems, Computer Architecture, and Artificial Intelligence.",
        "⚡ Enrolled in elective courses such as Deep Learning, Data Science, Cloud Computing, and Full Stack Development to enhance my technical skill set.",
        "⚡ Awarded the Ahsaas Scholarship for academic excellence (top 10% of students) and recognized by the Director for outstanding academic achievements.",
      ],
      website_link: "https://www.iub.edu.pk",
    },
    {
      title: "Jinnah Science College",
      subtitle: "ICS (Intermediate Computer Science)",
      logo_path: process.env.PUBLIC_URL + "/images/jsc_logo.png",
      alt_name: "Jinnah Science College",
      duration: "2018 - 2020",
      descriptions: [
        "⚡ Completed Intermediate in Computer Science (ICS) with foundational courses in computer programming, mathematics, and physics.",
        "⚡ Actively participated in college events, academic competitions, and group projects that developed my teamwork and problem-solving abilities.",
        "⚡ Developed a strong base in computing and analytical skills, preparing me for further studies in software engineering.",
      ],
      website_link: "https://www.facebook.com/JinnahSciencecollege/",
    },
  ],
};

const courseraLogo = process.env.PUBLIC_URL + "/images/coursera_logo.png";
const hpLifeLogo = process.env.PUBLIC_URL + "/images/hp_life_logo.jpg";

const certifications = {
  certifications: [
    {
      title: "Foundations of Cybersecurity",
      subtitle: "- Coursera",
      logo_path: courseraLogo,
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/E9V7XR7TNXH2",
      alt_name: "Coursera",
      color_code: "transparent",
    },
    {
      title: "Manage Security Risks",
      subtitle: "- Coursera",
      logo_path: courseraLogo,
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/2NR9M46RHQWA",
      alt_name: "Coursera",
      color_code: "transparent",
    },
    {
      title: "Foundations of Cybersecurity",
      subtitle: "- Coursera",
      logo_path: courseraLogo,
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/E9V7XR7TNXH2",
      alt_name: "Coursera",
      color_code: "transparent",
    },
    {
      title: "Critical Thinking in the AI Era",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/3cbedb01-3498-4354-bf13-d118c860fd7d",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
    {
      title: "Customer Relationship Management",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/88705acb-48e6-4fe3-9797-08698fa03dca",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
    {
      title: "Success Mindset",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/95627d02-0d5a-47e9-b3e8-bc25a2978f5e",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
    {
      title: "Agile Project Management",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/86235eb9-4ac6-43eb-96b6-4d38cbe42404",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
    {
      title: "Customer Experience (CX) for Business Success",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/81a0398c-e996-4d0b-89e5-09f68e058a61",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
    {
      title: "Business Email",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/b1d94271-e8d7-445a-a706-dbad29031a7c",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
    {
      title: "AI for Business Professionals",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/26510999-9066-4b09-b477-c5a1a5d8a8fc",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
    {
      title: "Professional Networking for Career Growth",
      subtitle: "- HP Life Global",
      logo_path: hpLifeLogo,
      certificate_link:
        "https://www.life-global.org/certificate/af314904-40a5-4f99-8435-e0e07a007a99",
      alt_name: "HP Life Global",
      color_code: "transparent",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work and Experience",
  description:
    "Worked as Full Stack Engineer and MERN Stack Developer at Plutus21 Capital and Tallysis, focusing on AI/ads models and healthcare automation. Built Android and web apps at Enigmatix with face detection and image processing. Strong experience in app integrations, data communication, and UI in startup environments.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Full Stack Engineer",
          company: "Plutus21 Capital",
          company_url: "https://capital.plutus21.com/",
          logo_path: process.env.PUBLIC_URL + "/images/plutus21_logo.jpeg",
          duration: "April 2025 - Present",
          location: "Lahore PK",
          description:
            "Improving ads ranking models on the core Plutus21 Capital product. Experience working on modeling two-tower architectures like DeepFM, Wide & deep learning, etc. Working on Large Language Models (LLM) pretraining and Large Multi-modal Model (LMM) finetuning strategies.",
          color: "#000000",
        },
        {
          title: "MERN Stack Developer",
          company: "Tallysis (Pvt) Ltd",
          company_url: "https://www.tallysis.com/",
          logo_path: process.env.PUBLIC_URL + "/images/tallysis_logo.png",
          duration: "Aug 2024 - April 2025",
          location: "Lahore PK",
          description:
            "I am working on automating healthcare products. The projects involve automation for process improvements and for significantly enhancing the profits. I am currently working on Cancer Survival and Reoccurence Prediction. Our goal is to make AI system which scales and removes doctor dependency as much as possible.",
          color: "#222831",
        },
        {
          title: "MERN Stack Developer",
          company: "Enigmatix Global",
          company_url: "https://www.linkedin.com/company/enigmatixglobal/about/",
          logo_path: process.env.PUBLIC_URL + "/images/enigmatix_global_logo.jpeg",
          duration: "May 2023 - June 2024",
          location: "Manchester, England",
          description:
            "I have created complete Android Application for locating Pub, Bar and beverage shops around you. I have also worked on implementation of algorithms for Face Detection, Text extraction from Image. I was involved in a team for creating complete software architecure of mobile and web application as well as admin panel for company.",
          color: "#9b1578",
        },
        {
          title: "Frontend Developer",
          company: "Enigmatix Pvt.",
          company_url: "https://www.linkedin.com/company/enigmatixpvtltd/about/",
          logo_path: process.env.PUBLIC_URL + "/images/enigmatix_logo.jpg",
          duration: "May 2022 - May 2023",
          location: "Bahawalpur, PK",
          description:
            "Enigmatix is the Organization from The Islamia University, Bahawalpur. I have changed the integration of the whole app from Google to Firebase. I learnt the efﬁcient ways of Data communications like Retroﬁt, Eventbus etc. I experienced the real time start up. I learnt the Design thinking of UI on perspective of People.",
          color: "#fc1f20",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Frontend Developer Intern",
          company: "Enigmatix Global",
          company_url: "https://www.linkedin.com/company/enigmatixglobal/about/",
          logo_path: process.env.PUBLIC_URL + "/images/enigmatix_global_logo.jpeg",
          duration: "February 2022 - April 2022",
          location: "Bahawalpur, PK",
          description:
            "I have worked on implementation of algorithms for Face Detection, Text extraction from Image. I was involved in a team for creating complete software architecure of mobile and web application as well as admin panel for company.",
          color: "#9b1578",
        },
      ],
    },
    // {
    //   title: "Volunteerships",
    //   experiences: [
    //     {
    //       title: "Foundations of Cybersecurity",
    //       subtitle: "- Abdul Rehman",
    //       logo_path: courseraLogo,
    //       certificate_link:
    //         "https://www.coursera.org/account/accomplishments/certificate/E9V7XR7TNXH2",
    //       alt_name: "Coursera",
    //       color_code: "#2A73CC",
    //     },
    //     {
    //       title: "Manage Security Risks",
    //       subtitle: "- Abdul Rehman",
    //       logo_path: process.env.PUBLIC_URL + "/images/stanford_logo.png",
    //       certificate_link:
    //         "https://www.coursera.org/account/accomplishments/certificate/2NR9M46RHQWA",
    //       alt_name: "Coursera",
    //       color_code: "#8C151599",
    //     }
    //   ],
    // },
  ],
};

// Open Source Page
const openSource = {
  githubUserName: process.env.REACT_APP_GITHUB_USERNAME || "abdulrehman705",
  githubConvertedToken: btoa(
    process.env.REACT_APP_GITHUB_TOKEN || ""
  ),
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My projects makes use of vast variety of latest technology tools. My best experience is to create Data Science projects and deploy them to web applications using cloud infrastructure.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  // title: "Publications",
  // description: "Some of my published Articles, Blogs and Research.",
  // avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [
    // {
    //   id: "neuro-symbolic-sudoku-solver",
    //   name: "Neuro-Symbolic Sudoku Solver",
    //   createdAt: "2023-07-02T00:00:00Z",
    //   description: "Paper published in KDD KiML 2023",
    //   url: "https://arxiv.org/abs/2307.00653",
    // },
    // {
    //   id: "mdp-diffusion",
    //   name: "MDP-Diffusion",
    //   createdAt: "2023-09-19T00:00:00Z",
    //   description: "Blog published in Paperspace",
    //   url: "https://blog.paperspace.com/mdp-diffusion/",
    // },
    // {
    //   id: "consistency-models",
    //   name: "Consistency Models",
    //   createdAt: "2023-10-12T00:00:00Z",
    //   description: "Blog published in Paperspace",
    //   url: "https://blog.paperspace.com/consistency-models/",
    // },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with ML, AI, React, Android, Cloud and Opensource Development.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I like to document some of my experiences in professional career journey as well as some technical knowledge sharing.",
    link: "https://medium.com/@akabdulrehman159",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle: "Johar Town, Lahore, Punjab, Pakistan",
    locality: "Johar Town",
    country: "Pakistan",
    region: "Punjab",
    postalCode: "54000",
    streetAddress: "UMT Road, Johar Town",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/JdhcRftoeWwAN5Mj6",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  openSource,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
};
