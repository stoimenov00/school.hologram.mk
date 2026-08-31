"use client";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Building2,
  UserRound,
  Radio,
  Trophy,
  Search,
  Sparkles,
  ArrowUpRight,
  TriangleAlert,
  CalendarDays,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/KioskShell";
import {
  school,
  announcements as baseAnnouncements,
  events,
} from "@/data/schools/orce-nikolov";
import { formatMkDate, schoolStatus } from "@/lib/time";
import { useKiosk } from "@/components/KioskProvider";
const nav = [
  {
    icon: BookOpen,
    title: "МОЈ РАСПОРЕД",
    sub: "Види што имаш денес",
    href: "/school/orce-nikolov/schedule",
    tone: "lime",
  },
  {
    icon: Users,
    title: "НАЈДИ НАСТАВНИК",
    sub: "Распоред и прием на родители",
    href: "/school/orce-nikolov/teachers",
    tone: "cyan",
  },
  {
    icon: Building2,
    title: "НАЈДИ УЧИЛНИЦА",
    sub: "Пронајди кабинет",
    href: "/school/orce-nikolov/rooms",
    tone: "paper",
  },
  {
    icon: UserRound,
    title: "ЗА РОДИТЕЛИ",
    sub: "Средби и информации",
    href: "/school/orce-nikolov/parents",
    tone: "orange",
  },
  {
    icon: Radio,
    title: "ДЕНЕС",
    sub: "Што се случува во училиштето",
    href: "/school/orce-nikolov/today",
    tone: "paper",
  },
  {
    icon: Trophy,
    title: "АКТИВНОСТИ",
    sub: "Проекти, клубови и настани",
    href: "/school/orce-nikolov/activities",
    tone: "cyan",
  },
];
export default function Home() {
  const [now, setNow] = useState(() => new Date("2026-09-01T10:24:00+02:00"));
  const [idle, setIdle] = useState(false);
  const [slide, setSlide] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { changes, meetings, announcements } = useKiosk();
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  useEffect(() => {
    const reset = () => {
      setIdle(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setIdle(true), 30000);
    };
    reset();
    ["pointerdown", "keydown", "touchstart"].forEach((e) =>
      window.addEventListener(e, reset),
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
      ["pointerdown", "keydown", "touchstart"].forEach((e) =>
        window.removeEventListener(e, reset),
      );
    };
  }, []);
  useEffect(() => {
    if (!idle) return;
    const i = setInterval(() => setSlide((s) => (s + 1) % 4), 7000);
    return () => clearInterval(i);
  }, [idle]);
  const status = schoolStatus(now);
  const date = formatMkDate(now);
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const todayISO = now.toISOString().slice(0, 10);
  const meeting = meetings.find((m) => m.date === todayISO) || null;
  const activeAnnouncement = [...announcements, ...baseAnnouncements].find(
    (a) => a.displayOnHome,
  );
  const slides = [
    {
      k: "Добредојдовте",
      title: "70 години знаење. Иднината започнува тука.",
      meta: "СУГС Гимназија „Орце Николов“",
    },
    {
      k: "УСПЕСИ И ПРОЕКТИ",
      title: "Young Voices of Europe",
      meta: "Учење, соработка и одржлива иднина",
    },
    {
      k: "СЛЕДЕН НАСТАН",
      title: events[2].title,
      meta: `${events[2].time} · ${events[2].location}`,
    },
    {
      k: "ВАЖНО ИЗВЕСТУВАЊЕ",
      title: activeAnnouncement?.title || "Проверете го дневниот распоред",
      meta:
        activeAnnouncement?.content ||
        "Информациите се ажурираат во текот на денот",
    },
  ];
  if (idle)
    return (
      <div className="signage" onPointerDown={() => setIdle(false)}>
        <div className="signage-top">
          <Mark />
          <span>ДИГИТАЛНО УЧИЛИШТЕ</span>
          <b>{time}</b>
        </div>
        <div className="signage-slide" key={slide}>
          <p>{slides[slide].k}</p>
          <h1>{slides[slide].title}</h1>
          <h2>{slides[slide].meta}</h2>
        </div>
        <div className="signage-bottom">
          <span>Допрете каде било за почетна</span>
          <div>
            {[0, 1, 2, 3].map((i) => (
              <i className={i === slide ? "active" : ""} key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <main className="home-screen">
      <header className="home-header">
        <div className="identity">
          <Mark />
          <div>
            <p>СУГС ГИМНАЗИЈА</p>
            <h1>{school.shortName}</h1>
            <span>{school.city}</span>
          </div>
        </div>
        <div className="clock">
          <p>{date}</p>
          <b>{time}</b>
        </div>
      </header>
      <section className={`status-card ${status.tone}`}>
        <div>
          <span className="pulse" />
          <p>{status.eyebrow}</p>
        </div>
        <small>{status.label}</small>
        <strong>{status.value}</strong>
      </section>
      {changes.length > 0 && (
        <Link className="live-change" href="/school/orce-nikolov/class/III-3">
          <TriangleAlert />
          <div>
            <small>ПРОМЕНА НА УЧИЛНИЦА</small>
            <b>
              {changes[0].className} · {changes[0].subject}
            </b>
          </div>
          <span>
            Кабинет {changes[0].oldRoomId} →{" "}
            <strong>{changes[0].newRoomId}</strong>
          </span>
        </Link>
      )}
      {meeting && (
        <Link
          className="meeting-promo"
          href="/school/orce-nikolov/parents/meetings"
        >
          <CalendarDays />
          <div>
            <small>ДЕНЕС</small>
            <b>Родителски средби</b>
          </div>
          <strong>{meeting.time}</strong>
        </Link>
      )}
      <section className="home-nav">
        {nav.map(({ icon: Icon, ...n }) => (
          <Link key={n.title} href={n.href} className={`nav-card ${n.tone}`}>
            <Icon />
            <div>
              <h2>{n.title}</h2>
              <p>{n.sub}</p>
            </div>
            <ArrowUpRight className="arrow" />
          </Link>
        ))}
      </section>
      <Link className="ask-bar" href="/school/orce-nikolov/ask">
        <span>
          <Search />
          <b>ПРАШАЈ ГО УЧИЛИШТЕТО</b>
        </span>
        <em>
          <Sparkles /> Брз одговор
        </em>
      </Link>
      <footer className="home-footer">
        <span>Демонстративна верзија со јавно достапни и пример податоци.</span>
        <Link href="/school/orce-nikolov/about">За училиштето</Link>
      </footer>
    </main>
  );
}
