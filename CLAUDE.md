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

- Entry: `index.html` → `src/main.tsx` (wraps `<App>` in `BrowserRouter`) → `src/App.tsx` (owns the single `useTasks()` instance, passes `tasks`/CRUD callbacks down as props, renders `<Routes>` + `<NavBar>`)
- `src/pages/` — one component per route: `DashboardPage` (`/`, the Today Dashboard) and `TasksPage` (`/tasks`, full list with search/filter/sort). Both receive task data and CRUD callbacks as props from `App.tsx` — there's no context/store, since `App.tsx` is the single owner of task state and both routes are its direct children
- `src/components/` — presentational pieces used by the pages: `Header`, `SummaryCards`, `TodayTasks`, `TodaySchedule`, `Upcoming`, `NavBar`, `TaskCard` (shared row renderer for both Today's Tasks and the Tasks page — compact vs. full view is just which optional props/callbacks are passed in), `TaskFormModal` (shared create/edit form)
- `src/hooks/useTasks.ts` — the one hook that owns Task state: loads from LocalStorage (seeding `src/data/seedTasks.ts` on first run), persists on every change, exposes `addTask`/`updateTask`/`deleteTask`/`setStatus`. Only `App.tsx` calls this hook — don't call `useTasks()` again elsewhere, it would create a second out-of-sync copy of the data
- `src/lib/storage.ts` — generic typed LocalStorage read/write JSON helpers
- `src/lib/taskUtils.ts` — pure functions for date/deadline logic (`todayISO`, `daysUntil`, `isDueToday`, `dueLabel`), filtering/sorting (`filterTasks`, `sortByDeadline`), and the shared priority/status badge color maps
- `src/types.ts` — shared domain types (`Task`, `TaskInput`, `ScheduleItem`, etc.)
- `src/data/seedTasks.ts` — one-time seed data for a fresh install (dates computed relative to "today" so it never looks stale); `src/data/mockData.ts` now holds only `mockSchedule`, which stays mock until Sprint 3 implements real Calendar/Schedule storage
- Styling is Tailwind utility classes only (see `tailwind.config.js` / `postcss.config.js`) — no CSS-in-JS or component library. Follow [DESIGN.md](DESIGN.md) (the product's design system — brand identity, color/type/spacing tokens, component patterns, UX rules) for any new or changed UI; it documents a "minimalist + MUJI" target look that the current Sprint 1-2 components don't fully match yet (see its Adoption note) — don't restyle existing screens to match it as a side effect of unrelated work, but new components/screens should follow it from the start
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

- `01-spec/` — the source-of-truth requirements docs, one file per requirement: `{YYYYMMDD}-{RUNNING_NO}-{topic-slug}.md` (English slug, Thai content). `RUNNING_NO` is a single global sequence across all spec docs (zero-padded to 3 digits), not reset per day. Every Sprint spec (not the non-Sprint Functional Requirements Master List) carries a mandatory `## Acceptance Criteria` section and a `## Gate (เกณฑ์ผ่าน Sprint)` section — these are what the testing docs and the Feature List/User Journey docs below key off of, and their running number is reused as the ID prefix for that Sprint's `AC-{RUNNING_NO}-*`/`TC-{RUNNING_NO}-*` scenarios (see Test intake below).
- `backlog.md` — a flat file directly under `01-requirements/` that is the **Product Backlog**: one entry per spec doc, linking back to it. This is generated/maintained alongside spec docs, not hand-authored from scratch.
- `feature-list.md` and `user-journey.md` — two more flat files at the same level as `backlog.md`: a consolidated feature catalog and dual-persona (นักศึกษา/บุคคลทั่วไป) end-to-end journeys, both derived from the current specs. Unlike `backlog.md` (corrected in place) or spec docs (append-only history), these two are **living summaries meant to be fully regenerated** from current spec content — see the Feature List & User Journey section below.

`02-plan/` (roadmap/milestones) and `03-task/` (task breakdown) are secondary right now and not the backlog — don't conflate them with `backlog.md`.

The later stages — `04-retrospectives/` and `03-testing/02-test-result/` — are not active yet; don't create content there unless explicitly asked, since there's no test-execution work to document until there's a running build to test. `02-design/01-prototypes/` (via `prototype-intake`), `02-design/02-technical/` (via `architecture-intake`, conceptual architecture only — database/API/technology-choice docs in that same folder are still not active), and `03-testing/01-test-plan/` (via `test-intake`) are the exceptions — see below.

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

Use the `architecture-intake` skill (`.claude/skills/architecture-intake/SKILL.md`) to create or refresh `.docs/02-design/02-technical/architecture.md`, a single living document covering exactly three parts: Conceptual Components (grouped by responsibility, spanning whatever Sprints contribute to each — not one component per Sprint), Conceptual Data Model (entities and relationships, no field types), and Data Flow per User Journey (traced against `user-journey.md`, rendered as Mermaid diagrams). It's deliberately **technology-agnostic** — never names a framework, library, or storage technology even though the codebase has already chosen one; database schema, API contracts, and technology-choice docs remain a separate, still-inactive part of `02-technical/` if added later. The skill decides full regeneration vs. incremental update the same way `feature-journey-intake` does, then delegates to the `architecture-writer` subagent (`.claude/agents/architecture-writer.md`), which self-checks its own output for accidental tech-stack references before reporting done.

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
  - `02-technical/` — `architecture.md` (conceptual, generated via `architecture-intake`, see above); database schema, API design, and technology-choice docs are not yet active
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
