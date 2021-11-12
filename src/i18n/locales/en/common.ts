import { AcademicDataType } from "@/types/resume.type";

const common = {
  pr: "Pooria Rajabzadeh",
  resume: {
    summary: {
      title: "Summary",
      list: [
        "4+ years React, freelancer and team worker",
        "2+ years Nextjs Developer, Working with ssg/isr, next/image, ...",
        "2+ years React native Developer, Experinced writing native module in android java",
        "Solid understanding of functional and object oriented programming in javascript and python",
        "1+ years Nodejs developer, Implement api with REST and Graphql technologies",
        "Master in creating mobile-first and responsive websites",
        "Master in creating fully customized html/css component",
        "Master in ui library like material ui and emotion",
        "Experienced working with rollup/lerna and building library",
        "Experienced design monorepos with yarn workspace",
        "Experienced in creating reusable modules",
        "Familiar with Azure and AWS",
        "Familiar with classical Machine learning algorithems and statictics",
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
          duration:"2011 - 2015"
        },
        {
          degree: "M.Sc in Power Electrical engineering",
          university: "University of Tehran,Iran",
          gpa: "17/20",
          duration:"2015 - 2017"
        },
      ] as Array<AcademicDataType>,
    },
  },
  profExp: {
    title: "Professional Experience",
    list: [
      {
        title: "Nextjs Front End Developer",
        company: "Apsy",
        project: "Company Embark Website",
        description: "This project introduce company",
        link: " https://www.apsy.io/how-it-works",
      },
    ],
  },
};

export default common;
