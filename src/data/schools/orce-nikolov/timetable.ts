import { Lesson, WeekDay } from "../../types";
import { periods } from "./school";
const subjects = [
  "Математика",
  "Англиски јазик",
  "Физика",
  "Македонски јазик",
  "Историја",
  "Биологија",
];
const teacherIds = [
  "dragica-jankulovska",
  "aneta-gajdardziska",
  "elizabeta-popovska",
  "marija-petrovska",
  "jasmina-ivkovska",
  "mile-stoilovski",
];
const rooms = ["18", "14", "12", "21", "17", "15"];
const days: WeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
const names = [
  "I-1",
  "I-2",
  "I-3",
  "II-1",
  "II-2",
  "II-3",
  "III-1",
  "III-2",
  "III-3",
  "IV-1",
  "IV-2",
  "IV-3",
];
export const timetable: Lesson[] = names.flatMap((className, ci) =>
  days.flatMap((day, di) =>
    periods.slice(0, 6).map((p, pi) => ({
      id: `${className}-${day}-${p.number}`,
      day,
      period: p.number,
      startTime: p.start,
      endTime: p.end,
      className,
      subject: subjects[(pi + di + ci) % subjects.length],
      teacherId: teacherIds[(pi + di + ci) % teacherIds.length],
      roomId:
        className === "III-3" && subjects[(pi + di + ci) % subjects.length] === "Биологија"
          ? "15"
          : rooms[(pi + ci) % rooms.length],
      source: "demo" as const,
    })),
  ),
);
