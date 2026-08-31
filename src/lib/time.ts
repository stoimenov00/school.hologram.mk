import { periods } from "@/data/schools/orce-nikolov";
import { Lesson } from "@/data/types";
export const weekDays: Record<number, { key: Lesson["day"]; label: string }> = {
  1: { key: "monday", label: "Понеделник" },
  2: { key: "tuesday", label: "Вторник" },
  3: { key: "wednesday", label: "Среда" },
  4: { key: "thursday", label: "Четврток" },
  5: { key: "friday", label: "Петок" },
};
export const toMinutes = (v: string) => {
  const [h, m] = v.split(":").map(Number);
  return h * 60 + m;
};
export const formatMkDate = (d: Date) => {
  const days = ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"];
  const months = ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
};
export function schoolStatus(now = new Date()) {
  const mins = now.getHours() * 60 + now.getMinutes();
  const current = periods.find(
    (p) => mins >= toMinutes(p.start) && mins < toMinutes(p.end),
  );
  if (current)
    return {
      tone: "green" as const,
      eyebrow: `Во тек е ${current.number}-ти час`,
      value: `${toMinutes(current.end) - mins} минути`,
      label: "Завршува за",
      period: current,
    };
  const next = periods.find((p) => mins < toMinutes(p.start));
  if (!next)
    return {
      tone: "blue" as const,
      eyebrow: "Наставата за денес заврши",
      value: "Утре во 07:30",
      label: "Повторно сме тука",
      period: null,
    };
  const previous = [...periods].reverse().find((p) => mins >= toMinutes(p.end));
  if (previous && previous.shift === next.shift)
    return {
      tone:
        previous.breakAfter === "long" ? ("amber" as const) : ("blue" as const),
      eyebrow: previous.breakAfter === "long" ? "Голем одмор" : "Одмор",
      value: next.start,
      label: "Следниот час започнува во",
      period: null,
    };
  return {
    tone: "blue" as const,
    eyebrow: "Следува настава",
    value: `${toMinutes(next.start) - mins} минути`,
    label: "Започнува за",
    period: null,
  };
}
