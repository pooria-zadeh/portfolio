import { AcademicDataType, ProfessionDataType } from "@/types/resume.type";

const common = {
  pr: "Pooria Rajabzadeh",
  gpa: "GPA",
  testUser: "Test User",
  technologies: "Technologies",
  role: "Role",
  password: "Password",
  username: "Username",
  tryItWithTestUser:
    "You could try the development environment of site with this test user",
  resume: {
    summary: {
      title: "Summary",
      list: [
        "4+ years React, freelancer and team worker",
        "2+ years Nextjs Developer, Working with ssg/isr, next/image, ...",
        "2+ years React native Developer, Experienced writing native module in android java",
        "Solid understanding of functional and object oriented programming in javascript and python",
        "1+ years Nodejs developer, Implement api with REST and Graphql technologies",
        "Master in creating mobile-first and responsive websites",
        "Master in creating fully customized html/css component",
        "Master in ui library like material ui and emotion",
        "Experienced working with rollup/lerna and building library",
        "Experienced design monorepos with yarn workspace",
        "Experienced in creating reusable modules",
        "Familiar with Azure and AWS",
        "Familiar with Machine learning algorithms and statistics",
      ],
    },
    techSkill: {
      title: "Technical Skill",
      list: [
        "Javascript",
        "CSS/SASS/JSS",
        "React",
        "React native",
        "Redux",
        "emotionjs",
        "mui",
        "Rollup",
        "Lerna",
        "Nextjs",
        "Nodejs",
        "Graphql",
        "Rest",
        "Express",
        "Git",
        "CI/CD",
        "Monorepo",
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
          name: "Digikala",
          category: "e-commerce",
          link: "https://www.digikala.com/",
          description: {
            text: "Digikala is the biggest e-commerce company in Iran, I work in the commercial team on seller panel and also maintain and develop core packages.",
          },
          technologies: [
            "jQuery",
            "React",
            "Typescript",
            "Next",
            "SSR",
            "SCSS",
            "Webpack",
            "Rollup"
          ],
          role: "Senior front-end developer work in a team with more than 500 engineers.",
          duration: "5 Months",
        },
        {
          name: "Chime Beauty",
          category: "Social media",
          link: "http://mychimebeauty.com/",
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
          role: "Lead Developer with 2 other front developers",
          duration: "3 Months",
        },

        {
          name: "Volynt",
          category: "Admin Panel",
          link: "https://kind-coast-062757d1e.azurestaticapps.net/en/auth/login/",
          description: {
            text: "This is a admin panel with role base authorization. All ui element implemented from scratch with emotionjs and api implemented with help of graphql and api state managed with swr and calls with optimistic updates, Each role has separate website so if you wanna see all pages you should try both user types.",
            testUsers: [
              { username: "manager@volynt.com", password: "123456" },
              { username: "superadmin@volynt.com", password: "123456" },
            ],
          },

          technologies: [
            "React",
            "Next",
            "SSG",
            "Emotionjs",
            "Graphql",
            "AWS",
            "CI/CD",
          ],
          role: "Lead Developer",
          duration: "3 Months",
        },

        {
          name: "Apsy",
          category: "Landing",
          link: "https://www.apsy.io/how-it-works/",
          description: {
            text: "Embark is landing page of the Apsy which is a software company creating application using some automation processes. It has too many animation using react-spring and material ui help us as ui library.",
          },
          technologies: [
            "React",
            "Next",
            "ISR",
            "Graphql",
            "React-Spring",
            "Azure",
            "CI/CD",
          ],
          role: "Lead Developer",
          duration: "5 Months",
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
          duration: "4 Months",
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
          duration: "6 Months",
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
