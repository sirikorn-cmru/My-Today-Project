# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

The application (`my-today`) is a React + TypeScript + Vite + Tailwind CSS web app, being built sprint-by-sprint per the specs in `.docs/01-requirements/01-spec/`. It is client-side only by design (see Project purpose) — no backend directory exists or should be added. **Version 1 / Core (Sprint 1-6) is complete** as of 2026-08-07 — Today Dashboard, Task Management, Calendar & Schedule, File Organizer, Notifications, and the Sprint 6 integration/UX/legal pass are all built and verified end-to-end for both target personas (see Project purpose). **Sprint 7 (Life Area & Personal Profile) is also complete** as of 2026-08-08, the first Sprint of the Competition Track — retrofitted `Task.subject` into `Task.lifeAreaId` across Task/Event/File, added Life Area and Personal Profile management. Sprint 8-11 have not started yet. `vercel.json` is in place (SPA rewrite) so the app is deploy-ready on Vercel.

### Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server (default port 5173)
- `npm run build` — type-check (`tsc --noEmit`) then production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint

No test runner is configured yet (no Sprint so far has required one). When Sprint work adds tests, record the test command here.

### Architecture

- Entry: `index.html` → `src/main.tsx` (wraps `<App>` in `BrowserRouter`) → `src/App.tsx` (owns the single `useTasks()`, `useEvents()`, `useFiles()`, `useNotifications()`, `useLifeAreas()`, and `useProfile()` instances, passes data/CRUD callbacks down as props, renders `<Routes>` + `<NavBar>`)
- `src/pages/` — one component per route: `DashboardPage` (`/`), `TasksPage` (`/tasks`, search/filter/sort, also reads a `?taskId=` query param to auto-open that task's edit modal), `CalendarPage` (`/calendar`, Today/Week/Month views + event CRUD, also reads a `?date=` query param to jump straight to that day), `FilesPage` (`/files`, search + upload/preview/download/delete), `NotificationsPage` (`/notifications`, full list + mark-read/mark-all-read + Browser Notification permission control), `PrivacyPage` (`/privacy`, static Privacy Notice + Terms of Use content, no props), `LifeAreasPage` (`/life-areas`, CRUD list with inline edit), `ProfilePage` (`/profile`, single-record form; only `name` is meaningfully required, everything else — including all education/organization fields — must stay optional per Sprint 7). All receive their data and CRUD callbacks as props from `App.tsx` — there's no context/store, since `App.tsx` is the single owner of state and every route is its direct child
- `src/components/` — presentational pieces used by the pages: `Header` (also renders `NotificationBell` plus Life Area/Profile icon links — the only place these two live in nav; not repeated on other pages' plain headers), `SummaryCards`, `TodayTasks`, `TodaySchedule` (today's events, real data since Sprint 3), `Upcoming`, `NavBar` (also shows the unread notification badge), `Footer` (links to `/privacy`, rendered at the bottom of every page's scrollable content — not fixed, so it appears once you scroll past the page's cards), `TaskCard` (shared row renderer for Today's Tasks and the Tasks page; takes an optional `lifeAreaName` string — callers look it up via `getLifeAreaName`, the card itself doesn't know about `LifeArea[]`), `TaskFormModal` (Task create/edit — also renders the "Related Files" section + attach-existing-file picker when editing, using the optional `files`/`onLinkFile`/`onUnlinkFile` props; requires `lifeAreas` to render the Life Area `<select>`), `EventFormModal` (Calendar event create/edit, also takes `lifeAreas`), `DayAgenda` (renders a merged, time-sorted list of events + task deadlines for one day — used by Calendar's Today/Week views), `FileFormModal` (file upload form, with an optional link-to-task checklist, also takes `lifeAreas`), `FileCard` (file row with inline Preview/Download/Delete, optional `lifeAreaName`), `NotificationBell` (bell icon + unread count linking to `/notifications`), `NotificationList` (shared renderer used by both the Dashboard's compact "urgent notifications" section and the full Notifications page — same click-to-navigate-and-mark-read behavior in both places)
- `src/hooks/useTasks.ts` / `src/hooks/useEvents.ts` / `src/hooks/useFiles.ts` / `src/hooks/useNotifications.ts` / `src/hooks/useLifeAreas.ts` / `src/hooks/useProfile.ts` — the only hooks that own their respective state. Tasks, Events, Life Areas, and Profile persist to LocalStorage (seeding `src/data/seedTasks.ts` / `src/data/seedEvents.ts` / `src/data/seedLifeAreas.ts` on first run — Profile has no seed, starts empty); Files persist to IndexedDB via `src/lib/fileDb.ts` (seeding `src/data/seedFiles.ts` on first run) since file blobs don't fit LocalStorage's string-only, ~5-10MB quota — `useFiles` exposes a `loaded` flag pages must check before rendering, since IndexedDB reads are async unlike the other hooks' synchronous LocalStorage reads. `useNotifications` derives its list from the live `tasks`/`events` arrays every render (see `notificationUtils.ts`) rather than owning separate stored records — only read/notified state is persisted (`my-today:notifications-read`, `my-today:notifications-notified` in LocalStorage). Only `App.tsx` calls these hooks — don't call them again elsewhere, it would create a second out-of-sync copy of the data
- Deleting a Life Area must never delete the Tasks/Events/Files that reference it (Sprint 7 Acceptance Criteria: they "stay, just with no Life Area anymore") — `App.tsx`'s `handleDeleteLifeArea` clears the stale `lifeAreaId` on every referencing record first (via `updateTask`/`updateEvent`/`useFiles().updateFileLifeArea`), then calls `deleteLifeArea`. Don't wire `LifeAreasPage`'s delete button directly to the hook's `deleteLifeArea` — it would leave orphaned IDs pointing at nothing
- `useTasks`'s LocalStorage key is `my-today:tasks:v2`, not `my-today:tasks` — Sprint 7 replaced `Task.subject` (free text) with `Task.lifeAreaId`, a breaking shape change, and bumped the key to force a clean reseed instead of writing migration logic (per the spec's own guidance, since there was no real user data yet). If Task's shape changes again the same way, bump to `:v3` rather than migrating in place
- `src/lib/storage.ts` — generic typed LocalStorage read/write JSON helpers (used by Tasks/Events/Notifications/Life Areas/Profile, not Files)
- `src/lib/lifeAreaUtils.ts` — `getLifeAreaName(lifeAreas, id)`, the one lookup helper every card/list uses to turn a stored `lifeAreaId` into a display name (returns `''` if unset or the Life Area was deleted)
- `src/lib/notificationUtils.ts` — `buildNotifications(tasks, events, readIds)` classifies each non-Done task and each event into `Overdue`/`DueToday`/`DueSoon` (or excludes it) using precise hours-until-deadline math (`dueDate`+`dueTime` combined, not just day-granularity like the Dashboard's existing `isDueToday`/`daysUntil`) — this is intentional: Gate 5 requires distinguishing "24 hours left" from "1 hour left" from "overdue", which day-only comparison can't do. Notification `id`s are keyed by `{kind}-{sourceId}-{level}`, so a task crossing from `DueSoon` into `Overdue` is treated as a new notification (unread again) without any explicit reset logic
- `src/lib/fileDb.ts` — raw IndexedDB wrapper (single `files` object store, keyed by id, storing the metadata and the `Blob` together in one record) — `getAllFiles`/`putFile`/`deleteFileRecord`/`seedIfEmpty`. `useFiles` wraps every call in try/catch and exposes an `error`/`clearError` pair (surfaced as a dismissible banner in `FilesPage`) — this is the one hook most likely to hit a real runtime failure (private-browsing mode blocking IndexedDB, quota exceeded), so it's the one with user-facing error handling; Tasks/Events/Notifications use synchronous LocalStorage and don't need it
- `src/lib/fileUtils.ts` — `formatBytes`, `previewKind` (decides image/pdf/text/none preview rendering from `mimeType` — not from filename extension, so seeded placeholder files with a real extension but `text/plain` content preview correctly), `downloadBlob`
- `src/lib/taskUtils.ts` — pure functions for Task date/deadline logic (`todayISO`, `daysUntil`, `isDueToday`, `dueLabel`), filtering/sorting, and the shared priority/status badge color maps
- `src/lib/calendarUtils.ts` — pure functions for Calendar: `getDayItems(date, events, tasks, lifeAreas)` (merges events + task deadlines for a given date into unified `DayItem[]`, sorted by time — this is how Task deadlines "appear in Calendar automatically" without duplicating Task data, per the Sprint 3 spec; the `lifeAreas` param is optional but every real call site passes it so items show their Life Area name), `getWeekDates`, `getMonthGrid`, `formatDayHeader`
- `src/types.ts` — shared domain types (`Task`, `TaskInput`, `CalendarEvent`, `CalendarEventInput`, `DayItem`, `FileRecord`, `FileRecordInput`, `LifeArea`, `LifeAreaInput`, `Profile`, etc.). `FileRecord.linkedTaskIds: string[]` is the Task↔File relation — a file linking to a Task, not the reverse, so "does this task have related files" is always computed as `files.filter(f => f.linkedTaskIds.includes(taskId))`, never stored on the Task itself. `Task`/`CalendarEvent`/`FileRecord` all carry `lifeAreaId: string` (empty string = unassigned, not `undefined` — matches the rest of the codebase's convention of empty-string-over-optional for unset text fields)
- `src/data/seedTasks.ts` / `src/data/seedEvents.ts` / `src/data/seedFiles.ts` / `src/data/seedLifeAreas.ts` — one-time seed data for a fresh install (dates computed relative to "today" so they never look stale; the seed files are linked to `seed-1` to demo the Task→Related Files flow out of the box, and seed data spans multiple Life Areas — including a "จ่ายค่าไฟ" Task in Finance — to demo the dual-persona story without any manual setup). There is no more mock data in the app (the old `src/data/mockData.ts` was removed once Sprint 3 gave Schedule real storage)
- Styling is Tailwind utility classes only (see `tailwind.config.js` / `postcss.config.js`) — no CSS-in-JS or component library. Follow [DESIGN.md](DESIGN.md) (the product's design system — brand identity, color/type/spacing tokens, component patterns, UX rules) for any new or changed UI; it documents a "minimalist + MUJI" target look that the existing components (Sprint 1-7) don't fully match yet (see its Adoption note) — don't restyle existing screens to match it as a side effect of unrelated work, but new components/screens should follow it from the start
- `tsconfig.json` covers both `src/` and `vite.config.ts` in one project (no TS project references) — keep it that way; splitting into `tsconfig.node.json` with project references previously caused `tsc -b` to emit stray `vite.config.js`/`.tsbuildinfo` files into the repo root
- `vercel.json` — SPA rewrite (`/(.*)` → `/index.html`) so client-side routes like `/tasks` resolve correctly on Vercel instead of 404ing on direct navigation/refresh. Needed because the app uses `BrowserRouter`, not `HashRouter`

### Sprint discipline

Each `.docs/01-requirements/01-spec/*.md` file is one Sprint's contract. Before writing code, read the matching spec's In-scope/Out-of-scope sections and stay inside them — don't implement a later Sprint's features early (e.g. don't wire up real Task persistence while Sprint 1 is still mock-data-only), and don't remove/break a completed Sprint's functionality while building the next one (non-regression rule, stated explicitly in each spec from Sprint 2 onward).

## Project purpose

**My Today — One Life, One Workspace** — a **Personal Daily Workspace** web app (no backend, client-side only), designed around Human-Centered Design so that opening the app immediately answers "what do I need to do today, what matters, what's due soon, what's done?". The target user is **general people managing everyday life** — students, employees, teachers, freelancers, parents, anyone juggling multiple roles — not students exclusively; students remain one supported persona among several, via the **Life Area** concept (see [20260806-007-my-today-sprint7-category-profile.md](.docs/01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile.md); one person has several Life Areas — e.g. Study/Project/Personal, or Work/Finance/Family) rather than student-specific fields/wording. Don't reintroduce student-only terminology (e.g. "Subject"/"รายวิชา" as a required field name) — use "Life Area" instead (not "Category" — renamed on 2026-08-06 to fit the product positioning), with education fields (Student ID, Faculty, Major) kept strictly optional on the Personal Profile.

The pitch is deliberately **not** "a Task manager" (that invites comparison to Todoist/Notion/Google Calendar) — it's: people don't lack apps, their life's information is scattered across too many of them; My Today organizes around a person's life, not around a system an organization built.

Built sprint-by-sprint (see `.docs/01-requirements/01-spec/`, and the cross-Sprint index at [20260806-008-my-today-functional-requirements-master.md](.docs/01-requirements/01-spec/20260806-008-my-today-functional-requirements-master.md)), in two tracks:

- **Version 1 / Core (Sprint 1-6, complete as of 2026-08-07):** Sprint 1 Today Dashboard (mock data) → Sprint 2 Task Management (real data, LocalStorage) → Sprint 3 Calendar & Schedule → Sprint 4 File Organizer (IndexedDB) → Sprint 5 Notification & Deadline Awareness → Sprint 6 Integration/UX/legal-compliance polish + Vercel deploy. Sprint 6 proved the Final User Journey end-to-end for both personas (student "ส่งรายงาน STEM" and general-person "จ่ายค่าไฟ") through the identical Task/Calendar/File/Notification/Dashboard code path — no persona-specific branching anywhere, confirming the core is already generic even before Sprint 7's Life Area retrofit.
- **Competition Track / Version 2 (Sprint 7-11, added 2026-08-06):** Sprint 7 Life Area & Personal Profile (cross-cutting, retrofits Sprint 1-2; originally drafted as "Sprint 2.5" before this track's numbering was adopted — **complete as of 2026-08-08**) → Sprint 8 Universal Inbox + Quick Capture (adds Note/Link entities) → Sprint 9 Now/Next/Later Timeline + Smart Priority + Life Progress → Sprint 10 Task-Event-File-Note-Link linking (the "What/When/Information" model + custom reminder lead time) → Sprint 11 Competition Demo/UX polish, then **Freeze** (no more new features after Sprint 11 without going through requirement intake again).

Explicitly out of scope for both tracks: AI (until a possible future post-Freeze phase as an optional "Daily Orchestrator" — not part of Version 2), backend/server-side code, and integration with any external service (Google Calendar, Teams, Classroom, university systems, banking, hospitals, GPS/LMS).

## Current focus: Requirements & Product Backlog

The project is in its earliest phase. Work here should concentrate on `.docs/01-requirements/`, specifically:

- `01-spec/` — the source-of-truth requirements docs, one file per requirement: `{YYYYMMDD}-{RUNNING_NO}-{topic-slug}.md` (English slug, Thai content). `RUNNING_NO` is a single global sequence across all spec docs (zero-padded to 3 digits), not reset per day. Every Sprint spec (not the non-Sprint Functional Requirements Master List) carries a mandatory `## Acceptance Criteria` section and a `## Gate (เกณฑ์ผ่าน Sprint)` section — these are what the testing docs and the Feature List/User Journey docs below key off of, and their running number is reused as the ID prefix for that Sprint's `AC-{RUNNING_NO}-*`/`TC-{RUNNING_NO}-*` scenarios (see Test intake below).
- `backlog.md` — a flat file directly under `01-requirements/` that is the **Product Backlog**: one entry per spec doc, linking back to it. This is generated/maintained alongside spec docs, not hand-authored from scratch.
- `feature-list.md` and `user-journey.md` — two more flat files at the same level as `backlog.md`: a consolidated feature catalog and dual-persona (นักศึกษา/บุคคลทั่วไป) end-to-end journeys, both derived from the current specs. Unlike `backlog.md` (corrected in place) or spec docs (append-only history), these two are **living summaries meant to be fully regenerated** from current spec content — see the Feature List & User Journey section below.

`02-plan/` (roadmap/milestones) and `03-task/` (task breakdown) are secondary right now and not the backlog — don't conflate them with `backlog.md`.

The later stages — `04-retrospectives/` and `03-testing/02-test-result/` — are not active yet; don't create content there unless explicitly asked, since there's no test-execution work to document until there's a running build to test. `02-design/01-prototypes/` (via `prototype-intake`), `02-design/02-technical/` (via `architecture-intake` and `db-api-intake`, all conceptual — technology-choice docs in that same folder are still not active), and `03-testing/01-test-plan/` (via `test-intake`) are the exceptions — see below.

### Requirement intake workflow

New requirements should go through the `requirement-intake` skill (`.claude/skills/requirement-intake/SKILL.md`) rather than being hand-written ad hoc. It takes a raw requirement from the user, asks clarifying questions (always with ≥3 suggested approaches to pick from) when anything is ambiguous, decides whether to create a new spec doc or amend an existing one, then delegates the actual file writes to the `requirement-writer` subagent (`.claude/agents/requirement-writer.md`), which creates/amends the spec file, updates `backlog.md`, and appends a summary to today's `.docs/05-log/{YYYYMMDD}-log.md`.

### Backlog sync check

Use the `backlog-sync-check` skill (`.claude/skills/backlog-sync-check/SKILL.md`) to audit whether `backlog.md` is still accurate — both internally (every spec doc has a matching, non-broken backlog entry) and against reality (a Sprint's noted status vs. what's actually been built in `src/` and committed in git). It delegates to the `backlog-auditor` subagent (`.claude/agents/backlog-auditor.md`), which fixes `backlog.md` directly if it's stale but never edits spec files themselves. Run this periodically or whenever backlog accuracy is in question — don't assume a Sprint's "สถานะ" note in `backlog.md` is current just because it was correct when written (e.g. Sprint 1-2 were marked "ยังไม่เริ่ม" well after being implemented, until this check catches it).

### Wikilink audit

Use the `wikilink-audit` skill (`.claude/skills/wikilink-audit/SKILL.md`) to scan every `.md` file across the entire `.docs/` vault — not just `backlog.md` vs `01-spec/` like the backlog check above, but every `index.md`, `00-archived/`, `05-log/`, and everything else — for `[[wikilinks]]` whose target file doesn't exist. It delegates to the `wikilink-auditor` subagent (`.claude/agents/wikilink-auditor.md`), which fixes unambiguous cases directly (e.g. a link that clearly should point to a file that was renamed) and reports anything ambiguous for the user to resolve manually. Run this periodically or whenever link integrity in the vault is in question.

### Feature List & User Journey

Use the `feature-journey-intake` skill (`.claude/skills/feature-journey-intake/SKILL.md`) to create or refresh `.docs/01-requirements/feature-list.md` and `.docs/01-requirements/user-journey.md`. It decides (asking the user when it's not obvious) whether a run should fully regenerate both files from every current spec or just incrementally update the section(s) tied to specific Sprint(s) that changed, then delegates the writes to the `feature-journey-writer` subagent (`.claude/agents/feature-journey-writer.md`). `feature-list.md` stays intentionally flat/scannable and points to the Functional Requirements Master List for full FR-ID traceability rather than duplicating it; `user-journey.md`'s two persona journeys are the general-purpose, always-current version of what Sprint 6's and Sprint 11's specs call for as sprint-specific demo/acceptance deliverables.

### Test intake (Acceptance Criteria, Test Plan, Test Case)

Use the `test-intake` skill (`.claude/skills/test-intake/SKILL.md`) to create or update three related-but-distinct testing docs under `.docs/03-testing/01-test-plan/`, each with its own subagent:

- **`acceptance-criteria.md`** (`acceptance-criteria-writer` subagent) — one living file, one Given-When-Then section per Backlog Item, converted from each spec's `## Acceptance Criteria`/`## Business Rules`/`## Gate`, referencing that Sprint's prototype if one exists. Scenario IDs reuse the spec's own running number: `AC-{RUNNING_NO}-{NN}`.
- **`test-plan.md`** (`test-plan-writer` subagent) — exactly **one file for the whole project**: scope, test types/strategy, environment, risk management, entry/exit criteria. Derives NFR content (responsive/device, PDPA/legal) mainly from the Sprint 6 spec, since there's no dedicated NFR doc.
- **`test-cases/{topic-slug}.md`** (`test-case-writer` subagent) — one file per Backlog Item (Sprint), step-by-step test cases (Test ID `TC-{RUNNING_NO}-{NN}`, Pre-condition, Test Steps, Expected Result, Test Data, and a reference back to the AC scenario it covers) for every feature in that Sprint.

`acceptance-criteria.md` and `test-plan.md` are living documents (regenerated to match current specs, not append-only) — same pattern as `feature-list.md`/`user-journey.md`. The skill always generates a Sprint's AC section before that Sprint's Test Case file (Test Case references AC by ID), asks for scope when it isn't given (≥3 options), and proposes the file list first for a large "every Backlog Item" run. No test runner exists yet (see Commands above), so every test case is manual/black-box — never generate test code here.

### High-level architecture

Use the `architecture-intake` skill (`.claude/skills/architecture-intake/SKILL.md`) to create or refresh `.docs/02-design/02-technical/architecture.md`, a single living document covering exactly three parts: Conceptual Components (grouped by responsibility, spanning whatever Sprints contribute to each — not one component per Sprint), Conceptual Data Model (entities and relationships, no field types), and Data Flow per User Journey (traced against `user-journey.md`, rendered as Mermaid diagrams). It's deliberately **technology-agnostic** — never names a framework, library, or storage technology even though the codebase has already chosen one; database schema and API contracts are separate documents (see Database schema & API spec below); technology-choice docs remain a still-inactive part of `02-technical/` if added later. The skill decides full regeneration vs. incremental update the same way `feature-journey-intake` does, then delegates to the `architecture-writer` subagent (`.claude/agents/architecture-writer.md`), which self-checks its own output for accidental tech-stack references before reporting done.

### Database schema & API spec

Use the `db-api-intake` skill (`.claude/skills/db-api-intake/SKILL.md`) to create or refresh `.docs/02-design/02-technical/database-schema.md` (per-table/entity field details, constraints, relationships, and a field-level Mermaid ER diagram) and `.docs/02-design/02-technical/api-spec.md` (an **Internal Data Access Contract** — conceptual create/read/update/delete/query operations per Conceptual Component, e.g. `createTask(input) → Task` — **not** an HTTP/REST/GraphQL API, since this app is client-only with no backend). Both are conceptual and technology-agnostic like `architecture.md`, which they reuse for consistent component/entity naming (`database-schema-writer` runs before `api-spec-writer` for this reason). Living documents, same full-regeneration-vs-incremental pattern as `architecture-intake`; each writer self-checks for accidental tech-stack or network-API language before reporting done.

### Prototype generation

Use the `prototype-intake` skill (`.claude/skills/prototype-intake/SKILL.md`) to create or update UI/UX prototypes under `.docs/02-design/01-prototypes/{topic-slug}/v{N}/`, drawing on Requirement specs, `backlog.md`, and `feature-list.md`/`user-journey.md` (falling back to deriving the equivalent content from a spec's own sections if those two files don't exist yet). It always checks `DESIGN.md` first (asking the user to help build it — color tone, style, reference/logo images — if it doesn't exist yet), always proposes a plan for the user to review/confirm before creating anything, and on repeat runs always asks whether to start a new version folder or edit the latest one (with a recommendation either way) before delegating the actual file writes to the `prototype-writer` subagent (`.claude/agents/prototype-writer.md`), which builds self-contained static HTML/CSS mockup screens (no CDN/external dependencies) styled from `DESIGN.md`'s tokens, an `index.md`, and a log entry.

### Language

All existing docs in `.docs/` are written in Thai. Write new spec and backlog content in Thai to stay consistent — don't switch to English mid-vault. Filenames/slugs stay in English for cross-platform safety.

## Repository structure

`.docs/` is an Obsidian vault (see `.docs/.obsidian/`) that tracks the full project lifecycle as a sequence of numbered stages, each flowing into the next:

- `01-requirements/` — source of truth for what the system must do (**current focus**, see above)
  - `01-spec/` — individual requirement docs
  - `backlog.md` — Product Backlog (flat file, not a subfolder)
  - `feature-list.md`, `user-journey.md` — two more flat files, generated/refreshed via the `feature-journey-intake` skill (see above)
  - `02-plan/`, `03-task/` — roadmap and task breakdown (secondary right now)
- `02-design/` — design built on top of requirements
  - `01-prototypes/` — UI/UX mockups and wireframes, generated via the `prototype-intake` skill (see above)
  - `02-technical/` — `architecture.md` (conceptual, via `architecture-intake`), `database-schema.md` and `api-spec.md` (conceptual, via `db-api-intake`, see above); technology-choice docs are not yet active
- `03-testing/` — testing built on top of design
  - `01-test-plan/` — `acceptance-criteria.md`, `test-plan.md`, and `test-cases/{topic-slug}.md`, all generated/updated via the `test-intake` skill (see above)
  - `02-test-result/` — actual test results and bugs found (not yet active — no build to test against yet for most Sprints)
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
