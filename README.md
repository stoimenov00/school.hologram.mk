# Дигитално училиште

Production-quality touchscreen kiosk demo for **СУГС Гимназија „Орце Николов“ — Скопје**. The interface is Macedonian-first, designed primarily for a 1080×1920 portrait display, and adapts to desktop, tablet, and mobile.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (redirects to `/school/orce-nikolov`). The admin demo is at `http://localhost:3000/admin`.

Production verification:

```bash
npm run build
npm start
```

No database, paid API, account, or internet connection is required at runtime.

## Main demo flows

- Student: Home → Мој распоред → III → III-3 → current/next lesson → room → QR handoff.
- Parent: Home → За родители → Средба со наставник → subject search → teacher → reception → room directions.
- Live change: open `/admin` in another tab → Промени → publish III-3 / Биологија / 15 → 23. The kiosk updates through `localStorage` plus the browser `storage` event.
- Parent meeting: `/admin` → Родителски средби → publish a meeting for today. Home promotes it automatically.

## Project structure

```text
src/
  app/
    school/orce-nikolov/       Kiosk routes and flows
    admin/                     Local demo CMS
  components/                  Shared shell, keyboard, data provider
  data/
    types.ts                   Source-aware domain interfaces
    schools/orce-nikolov/      School configuration and records
  lib/                         Period engine and browser override storage
```

School identity and data live in `src/data/schools/orce-nikolov/`, not in reusable UI components. Timetable, rooms, meetings, teachers, announcements, events, activities, period times, and signage settings are separate structured modules.

## Public and demo data

Every relevant record uses:

```ts
source: "public" | "demo"
sourceUrl?: string
```

`public` records were derived from public pages of the official school site. The app intentionally does not include student names, grades, attendance, personal contacts, or other sensitive records. Timetables, room numbers/directions, consultation times, meetings, and the indoor-navigation diagram are demonstrative because a complete current verified dataset was not publicly available. Source metadata stays discreet in the kiosk, while developers can inspect it directly in data files.

## Adapting for another school

1. Copy `src/data/schools/orce-nikolov` to a new school id.
2. Replace `school.ts`, then replace or import each structured collection.
3. Keep source tags and source URLs accurate.
4. Add the school id to a small resolver layer when multiple schools are enabled. Current UI routes intentionally use one configured demo school, while components consume structured school data.
5. Replace the generated `ON` product mark with an approved official logo asset if the school provides one for product use.

## Admin override model

Static school data is the immutable base. Admin operations store only overrides under namespaced browser keys:

- `digital-school-room-changes`
- `digital-school-meetings`
- `digital-school-announcements`

The provider merges these into the displayed experience. Same-origin tabs receive changes immediately. Refreshing does not remove base data or overrides. Clearing site data resets only demo overrides.

## Period engine and kiosk behavior

Period times are configurable in `school.ts`. `src/lib/time.ts` calculates an active lesson, break, next lesson, and remaining minutes. The home screen enters signage after 30 seconds of inactivity. Subpages return home after two minutes. Navigation never depends only on browser Back; visible Назад and Почетна controls are included.

The on-screen keyboard uses a Macedonian Cyrillic layout. Touch targets are intentionally large, hover is never required, text selection is discouraged on the kiosk home, and layouts avoid horizontal overflow at 1080×1920.

## QR and mobile

Class pages generate a QR code from `window.location.origin`, so preview and production deployments link to their own responsive route. On narrow screens the same route becomes a compact mobile schedule with horizontally scrollable current/next cards, the daily list, weekly view, announcements access, and no oversized kiosk chrome.

## PWA and limited connectivity

The core experience and records are local, and a web-app manifest is included. There are no required runtime fetches or external fonts. This is the architectural groundwork for a service worker and installable PWA; full offline update synchronization is deliberately deferred.

## Vercel deployment

Import the repository into Vercel or run:

```bash
npx vercel
```

Use the standard Next.js preset. No environment variables are required. HTTPS and a stable domain are recommended so QR handoff and future PWA installation work cleanly.

## Future Supabase migration

Replace the browser-backed provider in `src/components/KioskProvider.tsx` with repository functions backed by Supabase tables for rooms, lessons, overrides, meetings, announcements, and signage slides. Preserve the domain interfaces and source metadata. Map room changes and announcements to Supabase Realtime channels; the consuming kiosk components should not need structural changes.

## Android kiosk WebView

- Use a modern Chromium-based WebView and load the production HTTPS URL.
- Enable DOM storage for local overrides; disable text selection/context menus at the wrapper level if needed.
- Lock orientation to portrait and provision 1080×1920 CSS-pixel-equivalent viewport scaling.
- Keep navigation inside the WebView and intercept external schemes.
- Configure screen wake, immersive mode, network recovery, and automatic app restart in the Android kiosk wrapper.
- For a centrally managed installation, move admin mutations to Supabase before deploying multiple devices.

## Useful routes

- `/school/orce-nikolov`
- `/school/orce-nikolov/schedule`
- `/school/orce-nikolov/teachers`
- `/school/orce-nikolov/parents`
- `/school/orce-nikolov/rooms`
- `/school/orce-nikolov/today`
- `/school/orce-nikolov/activities`
- `/school/orce-nikolov/about`
- `/school/orce-nikolov/ask`
- `/admin`
