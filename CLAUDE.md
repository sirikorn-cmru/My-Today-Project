# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

The application (`my-today`) is a React + TypeScript + Vite + Tailwind CSS web app, being built sprint-by-sprint per the specs in `.docs/01-requirements/01-spec/`. It is client-side only by design (see Project purpose) — no backend directory exists or should be added.

### Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server (default port 5173)
- `npm run build` — type-check (`tsc --noEmit`) then production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint

No test runner is configured yet (no Sprint so far has required one). When Sprint work adds tests, record the test command here.

### Architecture

- Entry: `index.html` → `src/main.tsx` (wraps `<App>` in `BrowserRouter`) → `src/App.tsx` (owns the single `useTasks()`, `useEvents()`, `useFiles()`, and `useNotifications()` instances, passes data/CRUD callbacks down as props, renders `<Routes>` + `<NavBar>`)
- `src/pages/` — one component per route: `DashboardPage` (`/`), `TasksPage` (`/tasks`, search/filter/sort, also reads a `?taskId=` query param to auto-open that task's edit modal), `CalendarPage` (`/calendar`, Today/Week/Month views + event CRUD, also reads a `?date=` query param to jump straight to that day), `FilesPage` (`/files`, search + upload/preview/download/delete), `NotificationsPage` (`/notifications`, full list + mark-read/mark-all-read + Browser Notification permission control). All receive their data and CRUD callbacks as props from `App.tsx` — there's no context/store, since `App.tsx` is the single owner of state and every route is its direct child
- `src/components/` — presentational pieces used by the pages: `Header` (also renders `NotificationBell`), `SummaryCards`, `TodayTasks`, `TodaySchedule` (today's events, real data since Sprint 3), `Upcoming`, `NavBar` (also shows the unread notification badge), `TaskCard` (shared row renderer for Today's Tasks and the Tasks page), `TaskFormModal` (Task create/edit — also renders the "Related Files" section + attach-existing-file picker when editing, using the optional `files`/`onLinkFile`/`onUnlinkFile` props), `EventFormModal` (Calendar event create/edit), `DayAgenda` (renders a merged, time-sorted list of events + task deadlines for one day — used by Calendar's Today/Week views), `FileFormModal` (file upload form, with an optional link-to-task checklist), `FileCard` (file row with inline Preview/Download/Delete), `NotificationBell` (bell icon + unread count linking to `/notifications`), `NotificationList` (shared renderer used by both the Dashboard's compact "urgent notifications" section and the full Notifications page — same click-to-navigate-and-mark-read behavior in both places)
- `src/hooks/useTasks.ts` / `src/hooks/useEvents.ts` / `src/hooks/useFiles.ts` / `src/hooks/useNotifications.ts` — the only hooks that own their respective state. Tasks and Events persist to LocalStorage (seeding `src/data/seedTasks.ts` / `src/data/seedEvents.ts` on first run); Files persist to IndexedDB via `src/lib/fileDb.ts` (seeding `src/data/seedFiles.ts` on first run) since file blobs don't fit LocalStorage's string-only, ~5-10MB quota — `useFiles` exposes a `loaded` flag pages must check before rendering, since IndexedDB reads are async unlike the other hooks' synchronous LocalStorage reads. `useNotifications` derives its list from the live `tasks`/`events` arrays every render (see `notificationUtils.ts`) rather than owning separate stored records — only read/notified state is persisted (`my-today:notifications-read`, `my-today:notifications-notified` in LocalStorage). Only `App.tsx` calls these hooks — don't call them again elsewhere, it would create a second out-of-sync copy of the data
- `src/lib/storage.ts` — generic typed LocalStorage read/write JSON helpers (used by Tasks/Events/Notifications, not Files)
- `src/lib/notificationUtils.ts` — `buildNotifications(tasks, events, readIds)` classifies each non-Done task and each event into `Overdue`/`DueToday`/`DueSoon` (or excludes it) using precise hours-until-deadline math (`dueDate`+`dueTime` combined, not just day-granularity like the Dashboard's existing `isDueToday`/`daysUntil`) — this is intentional: Gate 5 requires distinguishing "24 hours left" from "1 hour left" from "overdue", which day-only comparison can't do. Notification `id`s are keyed by `{kind}-{sourceId}-{level}`, so a task crossing from `DueSoon` into `Overdue` is treated as a new notification (unread again) without any explicit reset logic
- `src/lib/fileDb.ts` — raw IndexedDB wrapper (single `files` object store, keyed by id, storing the metadata and the `Blob` together in one record) — `getAllFiles`/`putFile`/`deleteFileRecord`/`seedIfEmpty`
- `src/lib/fileUtils.ts` — `formatBytes`, `previewKind` (decides image/pdf/text/none preview rendering from `mimeType` — not from filename extension, so seeded placeholder files with a real extension but `text/plain` content preview correctly), `downloadBlob`
- `src/lib/taskUtils.ts` — pure functions for Task date/deadline logic (`todayISO`, `daysUntil`, `isDueToday`, `dueLabel`), filtering/sorting, and the shared priority/status badge color maps
- `src/lib/calendarUtils.ts` — pure functions for Calendar: `getDayItems` (merges events + task deadlines for a given date into unified `DayItem[]`, sorted by time — this is how Task deadlines "appear in Calendar automatically" without duplicating Task data, per the Sprint 3 spec), `getWeekDates`, `getMonthGrid`, `formatDayHeader`
- `src/types.ts` — shared domain types (`Task`, `TaskInput`, `CalendarEvent`, `CalendarEventInput`, `DayItem`, `FileRecord`, `FileRecordInput`, etc.). `FileRecord.linkedTaskIds: string[]` is the Task↔File relation — a file linking to a Task, not the reverse, so "does this task have related files" is always computed as `files.filter(f => f.linkedTaskIds.includes(taskId))`, never stored on the Task itself
- `src/data/seedTasks.ts` / `src/data/seedEvents.ts` / `src/data/seedFiles.ts` — one-time seed data for a fresh install (dates computed relative to "today" so they never look stale; the seed files are linked to `seed-1` to demo the Task→Related Files flow out of the box). There is no more mock data in the app (the old `src/data/mockData.ts` was removed once Sprint 3 gave Schedule real storage)
- Styling is Tailwind utility classes only (see `tailwind.config.js` / `postcss.config.js`) — no CSS-in-JS or component library
- `tsconfig.json` covers both `src/` and `vite.config.ts` in one project (no TS project references) — keep it that way; splitting into `tsconfig.node.json` with project references previously caused `tsc -b` to emit stray `vite.config.js`/`.tsbuildinfo` files into the repo root

### Sprint discipline

Each `.docs/01-requirements/01-spec/*.md` file is one Sprint's contract. Before writing code, read the matching spec's In-scope/Out-of-scope sections and stay inside them — don't implement a later Sprint's features early (e.g. don't wire up real Task persistence while Sprint 1 is still mock-data-only), and don't remove/break a completed Sprint's functionality while building the next one (non-regression rule, stated explicitly in each spec from Sprint 2 onward).

## Project purpose

**My Today — One Life, One Workspace** — a **Personal Daily Workspace** web app (no backend, client-side only), designed around Human-Centered Design so that opening the app immediately answers "what do I need to do today, what matters, what's due soon, what's done?". The target user is **general people managing everyday life** — students, employees, teachers, freelancers, parents, anyone juggling multiple roles — not students exclusively; students remain one supported persona among several, via the **Life Area** concept (see [20260806-007-my-today-sprint7-category-profile.md](.docs/01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile.md); one person has several Life Areas — e.g. Study/Project/Personal, or Work/Finance/Family) rather than student-specific fields/wording. Don't reintroduce student-only terminology (e.g. "Subject"/"รายวิชา" as a required field name) — use "Life Area" instead (not "Category" — renamed on 2026-08-06 to fit the product positioning), with education fields (Student ID, Faculty, Major) kept strictly optional on the Personal Profile.

The pitch is deliberately **not** "a Task manager" (that invites comparison to Todoist/Notion/Google Calendar) — it's: people don't lack apps, their life's information is scattered across too many of them; My Today organizes around a person's life, not around a system an organization built.

Built sprint-by-sprint (see `.docs/01-requirements/01-spec/`, and the cross-Sprint index at [20260806-008-my-today-functional-requirements-master.md](.docs/01-requirements/01-spec/20260806-008-my-today-functional-requirements-master.md)), in two tracks:

- **Version 1 / Core (Sprint 1-6):** Sprint 1 Today Dashboard (mock data) → Sprint 2 Task Management (real data, LocalStorage) → Sprint 3 Calendar & Schedule → Sprint 4 File Organizer (IndexedDB) → Sprint 5 Notification & Deadline Awareness → Sprint 6 Integration/UX/legal-compliance polish + Vercel deploy.
- **Competition Track / Version 2 (Sprint 7-11, added 2026-08-06):** Sprint 7 Life Area & Personal Profile (cross-cutting, retrofits Sprint 1-2; originally drafted as "Sprint 2.5" before this track's numbering was adopted) → Sprint 8 Universal Inbox + Quick Capture (adds Note/Link entities) → Sprint 9 Now/Next/Later Timeline + Smart Priority + Life Progress → Sprint 10 Task-Event-File-Note-Link linking (the "What/When/Information" model + custom reminder lead time) → Sprint 11 Competition Demo/UX polish, then **Freeze** (no more new features after Sprint 11 without going through requirement intake again).

Explicitly out of scope for both tracks: AI (until a possible future post-Freeze phase as an optional "Daily Orchestrator" — not part of Version 2), backend/server-side code, and integration with any external service (Google Calendar, Teams, Classroom, university systems, banking, hospitals, GPS/LMS).

## Current focus: Requirements & Product Backlog

The project is in its earliest phase. Work here should concentrate on `.docs/01-requirements/`, specifically:

- `01-spec/` — the source-of-truth requirements docs, one file per requirement: `{YYYYMMDD}-{RUNNING_NO}-{topic-slug}.md` (English slug, Thai content). `RUNNING_NO` is a single global sequence across all spec docs (zero-padded to 3 digits), not reset per day.
- `backlog.md` — a flat file directly under `01-requirements/` that is the **Product Backlog**: one entry per spec doc, linking back to it. This is generated/maintained alongside spec docs, not hand-authored from scratch.

`02-plan/` (roadmap/milestones) and `03-task/` (task breakdown) are secondary right now and not the backlog — don't conflate them with `backlog.md`.

The later stages — `02-design/`, `03-testing/`, `04-retrospectives/` — are not active yet; don't create content there unless explicitly asked, since there's no design or test work to document until the requirements/backlog stabilize.

### Requirement intake workflow

New requirements should go through the `requirement-intake` skill (`.claude/skills/requirement-intake/SKILL.md`) rather than being hand-written ad hoc. It takes a raw requirement from the user, asks clarifying questions (always with ≥3 suggested approaches to pick from) when anything is ambiguous, decides whether to create a new spec doc or amend an existing one, then delegates the actual file writes to the `requirement-writer` subagent (`.claude/agents/requirement-writer.md`), which creates/amends the spec file, updates `backlog.md`, and appends a summary to today's `.docs/05-log/{YYYYMMDD}-log.md`.

### Backlog sync check

Use the `backlog-sync-check` skill (`.claude/skills/backlog-sync-check/SKILL.md`) to audit whether `backlog.md` is still accurate — both internally (every spec doc has a matching, non-broken backlog entry) and against reality (a Sprint's noted status vs. what's actually been built in `src/` and committed in git). It delegates to the `backlog-auditor` subagent (`.claude/agents/backlog-auditor.md`), which fixes `backlog.md` directly if it's stale but never edits spec files themselves. Run this periodically or whenever backlog accuracy is in question — don't assume a Sprint's "สถานะ" note in `backlog.md` is current just because it was correct when written (e.g. Sprint 1-2 were marked "ยังไม่เริ่ม" well after being implemented, until this check catches it).

### Language

All existing docs in `.docs/` are written in Thai. Write new spec and backlog content in Thai to stay consistent — don't switch to English mid-vault. Filenames/slugs stay in English for cross-platform safety.

## Repository structure

`.docs/` is an Obsidian vault (see `.docs/.obsidian/`) that tracks the full project lifecycle as a sequence of numbered stages, each flowing into the next:

- `01-requirements/` — source of truth for what the system must do (**current focus**, see above)
  - `01-spec/` — individual requirement docs
  - `backlog.md` — Product Backlog (flat file, not a subfolder)
  - `02-plan/`, `03-task/` — roadmap and task breakdown (secondary right now)
- `02-design/` — design built on top of requirements (not yet active)
  - `01-prototypes/` — UI/UX mockups and wireframes
  - `02-technical/` — architecture, database, and API design
- `03-testing/` — testing built on top of design (not yet active)
  - `01-test-plan/` — test plans and test cases
  - `02-test-result/` — actual test results and bugs found
- `04-retrospectives/` — lessons learned per phase/sprint/milestone, drawing on test results and the log
- `05-log/` — chronological changelog and decision log
- `00-archived/` — superseded documents; never delete docs outright, move them here instead to preserve history

Each stage's `index.md` is written in Thai and cross-links to the stages it feeds into/from via Obsidian `[[wikilinks]]`. When adding documentation, place it in the matching numbered stage folder and follow this existing linking convention rather than inventing a new structure.

## Working conventions

- `.claude/settings.local.json` is gitignored (local machine config) — do not commit it.
- Keep this file itself committed and up to date — if you change it, commit it in the same batch as the doc changes it describes.

## Git / GitHub workflow

- Remote: `origin` → https://github.com/sirikorn-cmru/My-Today-Project.git, single branch `master` (no other branches in use yet).
- Commit message style so far: short imperative summary line (e.g. "Add initial project documentation"), no strict convention beyond that.
- Don't push automatically after every edit — commit locally, then confirm with the user before `git push`, since push affects the shared remote.
