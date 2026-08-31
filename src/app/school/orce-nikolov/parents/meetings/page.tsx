"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, UserRound } from "lucide-react";
import { KioskShell } from "@/components/KioskShell";
import { classesByYear, teachers } from "@/data/schools/orce-nikolov";
import { useKiosk } from "@/components/KioskProvider";

export default function Meetings() {
  const [selected, setSelected] = useState("III-3");
  const { meetings } = useKiosk();
  const today = new Date().toISOString().slice(0, 10);
  const all = Object.values(classesByYear).flat();
  const exact = meetings.find((m) => m.className === selected && m.date === today);
  const teacher = teachers.find((t) => t.id === (exact?.teacherId || "dragica-jankulovska"));
  const room = exact?.roomId || "21";
  return (
    <KioskShell title="Родителски средби денес" subtitle={exact?.time || "18:00"}>
      <div className="meeting-classes">
        {all.map((c) => <button className={selected === c ? "active" : ""} onClick={() => setSelected(c)} key={c}>{c}</button>)}
      </div>
      <section className="meeting-result">
        <small>ИЗБРАНА ПАРАЛЕЛКА</small><h2>{selected}</h2>
        <div><UserRound/><span><small>КЛАСЕН РАКОВОДИТЕЛ</small><b>{teacher?.name || "Информација на влез"}</b></span></div>
        <div><MapPin/><span><small>КАБИНЕТ</small><b>{room} · I кат</b></span></div>
        <Link href={`/school/orce-nikolov/rooms/${room}`}><Navigation/> Прикажи патека</Link>
      </section>
    </KioskShell>
  );
}
