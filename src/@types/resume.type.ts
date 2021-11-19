export type AcademicDataType = {
  degree: string;
  university: string;
  gpa: string;
  duration: string;
};
export type ProfessionDataType = {
  name: string;
  category: string;
  link: string;
  technologies: Array<string>;
  role: string;
  duration: string;
  description: {
    text: string;
    testUsers?: Array<{ username: string; password: string }>;
  };
};
