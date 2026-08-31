import { Teacher } from "../../types";
const src = "https://orcenikolov.edu.mk/nastava/kadar/";
export const teachers: Teacher[] = [
  { id: "elizabeta-popovska", name: "Елизабета Поповска", subjects: ["Физика"], source: "public", sourceUrl: src },
  { id: "zoran-ivanovski", name: "Зоран Ивановски", subjects: ["Физика"], source: "public", sourceUrl: src },
  { id: "suzana-stojcevska", name: "Сузана Стојчевска", subjects: ["Хемија"], source: "public", sourceUrl: src },
  { id: "mile-stoilovski", name: "Миле Стоиловски", subjects: ["Биологија"], source: "public", sourceUrl: src },
  { id: "jasmina-ivkovska", name: "Јасмина Ивковска", subjects: ["Историја"], source: "public", sourceUrl: src },
  { id: "liljana-jovanovska", name: "Лилјана Јовановска", subjects: ["Географија"], source: "public", sourceUrl: src },
  { id: "dragica-jankulovska", name: "Драгица Јанкуловска", subjects: ["Математика"], source: "public", sourceUrl: src },
  { id: "aneta-gajdardziska", name: "Анета Гајдарџиска", subjects: ["Англиски јазик"], source: "demo" },
  { id: "marija-petrovska", name: "Марија Петровска", subjects: ["Македонски јазик"], source: "demo" },
];
