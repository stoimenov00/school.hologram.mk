"use client";
import Link from "next/link";
import { ArrowLeft, Home, ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
export function Mark({ small = false }: { small?: boolean }) {
  return (
    <div className={`mark ${small ? "small" : ""}`} aria-label="Орце Николов">
      <span>О</span>
      <i>Н</i>
    </div>
  );
}
export function KioskShell({
  children,
  title,
  subtitle,
  compact = false,
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (pathname.endsWith("/orce-nikolov")) return;
    const reset = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => router.push("/school/orce-nikolov"),
        120000,
      );
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
  }, [pathname, router]);
  return (
    <main className={`kiosk-shell ${compact ? "compact" : ""}`}>
      <header className="sub-header">
        <button className="nav-button" onClick={() => router.back()}>
          <ArrowLeft />
          <span>Назад</span>
        </button>
        <Link className="school-mini" href="/school/orce-nikolov">
          <Mark small />
          <span>
            <b>ОРЦЕ НИКОЛОВ</b>
            <small>Дигитално училиште</small>
          </span>
        </Link>
        <Link className="nav-button" href="/school/orce-nikolov">
          <Home />
          <span>Почетна</span>
        </Link>
      </header>
      {(title || subtitle) && (
        <section className="page-title">
          <p>{subtitle}</p>
          <h1>{title}</h1>
        </section>
      )}
      <div className="page-content">{children}</div>
      <footer className="demo-footer">
        <ShieldCheck /> Демонстративна верзија со јавно достапни и пример
        податоци.
      </footer>
    </main>
  );
}
