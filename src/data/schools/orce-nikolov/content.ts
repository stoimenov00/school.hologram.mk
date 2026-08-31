import { Activity, Announcement, SchoolEvent } from "../../types";
export const announcements: Announcement[] = [
  { id: "a1", title: "Почеток на учебната 2026/27 година", category: "НАСТАВА", content: "На 1 септември наставата започнува по посебниот објавен распоред.", date: "27 август 2026", priority: "important", displayOnHome: true, displayInSignage: true, source: "public", sourceUrl: "https://orcenikolov.edu.mk/" },
  { id: "a2", title: "Промена на распоред за III година", category: "ПРОМЕНА", content: "Проверете го дневниот распоред пред почетокот на часот.", date: "Денес", priority: "important", source: "demo" },
];
export const events: SchoolEvent[] = [
  { id: "e1", title: "Почеток на прва смена", time: "07:30", location: "Училиште", category: "НАСТАВА", description: "Почеток на наставниот ден.", priority: 1, source: "demo" },
  { id: "e2", title: "Ученички клуб", time: "10:30", location: "Кариерен центар", category: "КЛУБ", description: "Отворена средба на ученичкиот клуб.", priority: 1, source: "demo" },
  { id: "e3", title: "Натпревар по математика", time: "12:30", location: "Кабинет 18", category: "НАТПРЕВАР", description: "Училишен квалификациски круг.", priority: 2, source: "demo" },
  { id: "e4", title: "Родителски средби", time: "18:00", location: "I и II кат", category: "РОДИТЕЛИ", description: "Средби по паралелки.", priority: 2, source: "demo" },
];
export const activities: Activity[] = [
  { id: "ac1", title: "Young Voices of Europe", category: "ЕКОЛОГИЈА", description: "Еразмус+ проект за еколошка свест и учење преку соработка.", source: "public", sourceUrl: "https://orcenikolov.edu.mk/aktivnosti/" },
  { id: "ac2", title: "Меѓународна размена — Љубљана", category: "МЕЃУНАРОДНО", description: "Редовна мобилност со Гимназија Пољане од Љубљана.", source: "public", sourceUrl: "https://orcenikolov.edu.mk/aktivnosti/" },
  { id: "ac3", title: "Веб дизајн и ИКТ", category: "ТЕХНОЛОГИЈА", description: "Проектни активности по информатика и веб-дизајн.", source: "public", sourceUrl: "https://orcenikolov.edu.mk/nastava/" },
  { id: "ac4", title: "Драмска секција", category: "КУЛТУРА", description: "Сценски активности, литература и ученичко творештво.", source: "public", sourceUrl: "https://orcenikolov.edu.mk/nastava/" },
  { id: "ac5", title: "Спорт и здравје", category: "СПОРТ", description: "Планинарење, тенис, фитнес и велосипедизам.", source: "public", sourceUrl: "https://orcenikolov.edu.mk/nastava/" },
  { id: "ac6", title: "Природни науки", category: "НАУКА", description: "Истражувачки активности по хемија, физика и биологија.", source: "public", sourceUrl: "https://orcenikolov.edu.mk/nastava/" },
];
