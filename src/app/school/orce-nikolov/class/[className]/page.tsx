"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import {
  Clock3,
  MapPin,
  TriangleAlert,
  CalendarDays,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { KioskShell } from "@/components/KioskShell";
import { timetable, rooms } from "@/data/schools/orce-nikolov";
import { useKiosk } from "@/components/KioskProvider";
import { toMinutes, weekDays } from "@/lib/time";
import { useEffect, useMemo, useState } from "react";
export default function ClassPage() {
  const { className } = useParams<{ className: string }>();
  const decoded = decodeURIComponent(className);
  const [now, setNow] = useState(() => new Date("2026-09-01T10:24:00+02:00"));
  const [origin, setOrigin] = useState("https://school.hologram.mk");
  const { changes } = useKiosk();
  useEffect(() => {
    setNow(new Date());
    setOrigin(window.location.origin);
    const i = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(i);
  }, []);
  const day = weekDays[now.getDay()]?.key || "tuesday";
  const lessons = useMemo(
    () => timetable.filter((l) => l.className === decoded && l.day === day),
    [decoded, day],
  );
  const mins = now.getHours() * 60 + now.getMinutes();
  const currentIndex = lessons.findIndex(
    (l) => mins >= toMinutes(l.startTime) && mins < toMinutes(l.endTime),
  );
  const nextIndex = lessons.findIndex((l) => mins < toMinutes(l.startTime));
  const focus = currentIndex >= 0 ? currentIndex : Math.max(nextIndex, 0);
  const adjusted = (lesson: (typeof lessons)[number]) => {
    const change = changes.find(
      (c) => c.className === decoded && c.subject === lesson.subject,
    );
    return { ...lesson, roomId: change?.newRoomId || lesson.roomId, change };
  };
  const seq = [lessons[focus], lessons[focus + 1], lessons[focus + 2]]
    .filter(Boolean)
    .map(adjusted);
  const url = `${origin}/school/orce-nikolov/class/${encodeURIComponent(decoded)}`;
  return (
    <KioskShell
      title={decoded}
      subtitle={`Распоред · ${weekDays[now.getDay()]?.label || "Денес"}`}
    >
      <section className="whats-next">
        {seq.map((l, i) => (
          <div className={`next-card ${i === 0 ? "primary" : ""}`} key={l.id}>
            <small>
              {currentIndex === focus && i === 0
                ? "СЕГА"
                : i === 0
                  ? "СЛЕДНО"
                  : i === 1
                    ? "ПОТОА"
                    : "ПОДОЦНА"}
            </small>
            <h2>{l.subject}</h2>
            <p>
              <MapPin /> Кабинет {l.roomId}
            </p>
            <span>
              {l.startTime} — {l.endTime}
            </span>
            {i === 0 && currentIndex < 0 && (
              <b>за {Math.max(0, toMinutes(l.startTime) - mins)} минути</b>
            )}
          </div>
        ))}
      </section>
      {changes
        .filter((c) => c.className === decoded)
        .map((c) => (
          <div className="change-alert" key={c.id}>
            <TriangleAlert />
            <div>
              <small>ПРОМЕНА НА УЧИЛНИЦА</small>
              <h3>{c.subject}</h3>
              <p>Стар кабинет: {c.oldRoomId}</p>
            </div>
            <strong>
              НОВ
              <br />
              <b>{c.newRoomId}</b>
            </strong>
          </div>
        ))}
      <h2 className="section-label">ДЕНЕС</h2>
      <div className="lesson-list">
        {lessons.map((raw, i) => {
          const l = adjusted(raw);
          const active = i === currentIndex;
          return (
            <article className={`lesson ${active ? "active" : ""}`} key={l.id}>
              <b className="period-num">{l.period}</b>
              <div>
                <small>{active ? "СЕГА" : ""}</small>
                <h3>{l.subject}</h3>
                <p>
                  <Clock3 /> {l.startTime} - {l.endTime}
                </p>
              </div>
              <Link href={`/school/orce-nikolov/rooms/${l.roomId}`}>
                <MapPin /> Кабинет {l.roomId}
                <ArrowRight />
              </Link>
            </article>
          );
        })}
      </div>
      <Link
        className="wide-link weekly"
        href={`/school/orce-nikolov/class/${decoded}/week`}
      >
        <CalendarDays /> Цел неделен распоред
      </Link>
      <section className="qr-card">
        <div>
          <Smartphone />
          <small>ЗЕМИ ГО РАСПОРЕДОТ СО ТЕБЕ</small>
          <h2>Скенирај со телефонот</h2>
          <p>Истиот распоред, оптимизиран за мобилен.</p>
        </div>
        <div className="qr">
          <QRCodeSVG
            value={url}
            size={184}
            bgColor="#ffffff"
            fgColor="#071c2c"
            level="M"
          />
        </div>
      </section>
    </KioskShell>
  );
}
