import { Period, School } from "../../types";

export const school: School = {
  id: "orce-nikolov",
  name: "СУГС Гимназија „Орце Николов“ - Скопје",
  shortName: "ОРЦЕ НИКОЛОВ",
  city: "Скопје",
  address: "Булевар Илинден бр. 101, 1000 Скопје",
  email: "info@on.edu.mk",
  mission: "Училиште со традиција, отворено за нови идеи, индивидуалност, креативност и образование за животните предизвици.",
  source: "public",
  sourceUrl: "https://orcenikolov.edu.mk/za-nas/",
};

export const periods: Period[] = [
  { number: 1, start: "07:30", end: "08:15", shift: 1, breakAfter: "short" },
  { number: 2, start: "08:20", end: "09:05", shift: 1, breakAfter: "short" },
  { number: 3, start: "09:15", end: "10:00", shift: 1, breakAfter: "long" },
  { number: 4, start: "10:15", end: "11:00", shift: 1, breakAfter: "short" },
  { number: 5, start: "11:05", end: "11:50", shift: 1, breakAfter: "short" },
  { number: 6, start: "11:55", end: "12:40", shift: 1 },
  { number: 7, start: "13:00", end: "13:45", shift: 2, breakAfter: "short" },
  { number: 8, start: "13:50", end: "14:35", shift: 2, breakAfter: "short" },
  { number: 9, start: "14:45", end: "15:30", shift: 2, breakAfter: "long" },
  { number: 10, start: "15:45", end: "16:30", shift: 2, breakAfter: "short" },
  { number: 11, start: "16:35", end: "17:20", shift: 2, breakAfter: "short" },
  { number: 12, start: "17:25", end: "18:10", shift: 2 },
];
