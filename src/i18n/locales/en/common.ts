import { AcademicDataType, ProfessionDataType } from "@/types/resume.type";

const common = {
  pr: "Pooria Rajabzadeh",
  title: "Senior Frontend Developer",
  gpa: "GPA",
  testUser: "Test User",
  technologies: "Technologies",
  role: "Role",
  password: "Password",
  username: "Username",
  linkedin: "LinkedIn",
  stackoverflow: "Stack Overflow",

  tryItWithTestUser:
    "You could try the development environment of site with this test user",
  resume: {
    summary: {
      title: "Summary",
      content:
        "I'm 5+ years frontend developer working on React(-Native) Framework working on more than 10 projects. I'm self-learner and motivated.\n\nI have lead experience in a front-end team with 4 other developers.\nI have master degree in electrical engineering and I know how to research and write article in university. And also learned python and how to creating machine learning models.\n\n",
      linkTitle: "Portfolio Website",
      resumeLink: "Resume Link",
    },
    techSkill: {
      title: "Technical Skill",
      list: [
        "Javascript",
        "CSS/SASS/JSS",
        "React",
        "React native",
        "Redux",
        "Nextjs",
        "Tailwind",
        "Styled Component",
        "E2E",
        "Playwright",
        "Rollup",
        "Nodejs",
        "Graphql",
        "Rest",
        "Express",
        "Git",
        "CI/CD",
        "Monorepo",
        "NX",
        "Cypress",
        "Python",
        "Machine Learning",
        "Adobe Illustrator",
        "Adobe XD",
      ],
    },
    academic: {
      title: "Academic Qualification",
      list: [
        {
          degree: "B.Sc in Electrical engineering",
          university: "University of Tehran,Iran",
          gpa: "16/20",
          duration: "2011 - 2015",
        },
        {
          degree: "M.Sc in Power Electrical engineering",
          university: "University of Tehran,Iran",
          gpa: "17/20",
          duration: "2015 - 2017",
        },
      ] as Array<AcademicDataType>,
    },
    professional: {
      title: "Professional Experience",
      list: [
        {
          name: "Tali.ai",
          category: "SaaS",
          link: "https://tali.ai/",
          description: {
            text: "Worked on monorepo contains Desktop, chrome-extension, SDK and react-native mobile app with a team of size 14 developers. I was owner of writing e2e tests with playwright and the owner of website migration to next.js 13.\n I worked with the team to move code to nx monorepo.\nI Worked on analytics with Segment and Mixpanel and GCP.",
          },
          technologies: [
            "NX",
            "React",
            "React-Native",
            "Next.js 13",
            "Electron",
            "Playwright",
            "GCP",
            "Mixpanel",
            "Segment",
          ],
          role: "Senior Software Developer",
          duration: "",
        },

        {
          name: "Zebracat.ai",
          category: "AI Video generation",
          link: "https://www.zebracat.ai/",
          description: {
            text: "Owner of implement effects and animations creating advertisement video",
          },
          technologies: [
            "Remotion",
            "CSS-Transition",
            "GSAP",
            "PIXI.js",
            "Lottie (After effects)",
          ],
          role: "Software developer",
          duration: "4 Months",
        },

        {
          name: "Digikala",
          category: "e-commerce",
          link: "https://www.digikala.com/",
          description: {
            text: "Digikala which is known as the biggest online shop company and it also has the biggest tech team in Iran. I worked with team of size 100 developers. I mostly worked on refactoring jQuery code to React.js and also maintaining the core UI library. I also participate on technical code interviews and hiring procedure. ",
          },
          technologies: [
            "React.js",
            "Next JS",
            "Typescript",
            "Webpack",
            "Rollup",
            "SCSS",
            "JQuery ",
            "MVC pattern",
            "Advance Forms",
          ],
          role: "Software developer",
          duration: "1 Year and 5 Months",
        },
        {
          name: "Chime Beauty",
          category: "Social media",
          link: "https://play.google.com/store/apps/details?id=io.apsy.chimebeauty&hl=de_CH&gl=US",
          description: {
            text: "A social media progressive web app. This website implemented with nextjs on ssr mode, It has image optimization (server side) and compression (client side) and uses graphql apis with swr cache for state management.",
          },
          technologies: [
            "React",
            "Next",
            "SSR",
            "Emotionjs",
            "Material ui",
            "Graphql",
            "Azure",
            "CI/CD",
          ],
          role: "Senior Front-end developer",
          duration: "3 Months",
        },

        {
          name: "Apsy",
          category: "Landing",
          link: "https://www.apsy.io/",
          description: {
            text: "I was owner of developing company website with next.js in ISR mode. Website  has some challenging animations including scroll animation.",
          },
          technologies: [
            "Next.js",
            "React.JS",
            "tailwind",
            "React native",
            "yarn workspace",
            "monorepo front project (with nx)",
            "Azure",
            "SWR",
            "EmotionJS",
            "typescript",
            "SSR & SSG & ISR",
            "PWA ",
            "Animation with React-spring ",
            "Material ui",
          ],
          role: "Lead Frontend Developer",
          duration: "2 Years",
        },

        {
          name: "React Table and Map",
          category: "React Library",
          link: "https://cranky-snyder-0e6782.netlify.app/",
          description: {
            text: "A map, table and table-map library. Code is not publicly available as company requested. Leaflet map library and react-window and also material ui are most important library used in this project and rollup help us bundle this project. Document is written in mdx format.",
          },
          technologies: [
            "React",
            "Roleup",
            "Lerna",
            "Mdx Documentation",
            "Story book",
            "Material UI",
            "React-window",
          ],
          role: "Lead Developer",
          duration: "6 Months",
        },
        {
          name: "Knitnet",
          category: "Admin Panel",
          link: "https://vip.myknitnet.com/login",
          description: {
            text: "",
            testUsers: [{ username: "demo", password: "demo123!@" }],
          },

          technologies: ["React", "CSR", "Material UI", "REST"],
          role: "Senior Developer",
          duration: "12 Months",
        },
        {
          name: "Visual Query builder",
          category: "Analysis Application",
          link: "https://heuristic-lumiere-a191d3.netlify.app/",
          description: {
            text: "(!This project is not completed!) This is a visual query builder for non-technical who want to work with data.",
          },

          technologies: ["React", "CSR", "Material UI", "redux"],
          role: "Lead Developer",
          duration: "2 Months",
        },
      ] as Array<ProfessionDataType>,
    },
  },
};

export default common;
