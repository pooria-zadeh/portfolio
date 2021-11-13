export const DATA = [
  { name: "tel", value: "+989397443730" },
  { name: "mail", value: "p.rajabzadeh92@gmail.com" },
  { name: "linkedin", value: "https://www.linkedin.com/in/pooria-rajabzadeh/" },
  {
    name: "stackoverflow",
    value: "https://stackoverflow.com/users/10138279/lord-pooria",
  },
  { name: "github", value: "https://github.com/lordpooria" },
  { name: "codepen", value: "https://codepen.io/lordpooria" },
];

export const LINKS  = {
  unversity:"https://www.topuniversities.com/universities/university-tehran"
}

export const OBJECT_DATA = DATA.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: cur.value,
  }),
  {} as any
);
