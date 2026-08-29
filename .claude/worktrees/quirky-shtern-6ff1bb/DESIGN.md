# DESIGN.md

Design system for **My Today — One Life, One Workspace**.

This is the single source of truth for how the product looks, feels, and behaves at the UI level. It sits alongside [CLAUDE.md](CLAUDE.md) (which governs code/process) — CLAUDE.md tells Claude Code *how to build*, this file tells it *what the result should look like*. Read this before writing or reviewing any component, page, or style.

## Direction: Minimalist + MUJI

The product's positioning is deliberately anti-"tool" (see CLAUDE.md → Project purpose: "not a Task manager"). The visual language should carry that: quiet, undecorated, functional — the MUJI philosophy of **减法设计 / "design by subtraction"** rather than a SaaS dashboard covered in gradients, shadows, and badges.

Guiding principles, in priority order:

1. **Less, but better** (Dieter Rams / MUJI lineage) — every color, weight, and border must earn its place. If removing it doesn't hurt comprehension, remove it.
2. **Calm over exciting** — the app is opened many times a day; it should never compete for attention with itself. No bright accent colors, no celebratory animation, no gamified visual noise.
3. **Material honesty** — flat surfaces, real borders instead of drop shadows, no fake depth/skeuomorphism, no glassmorphism.
4. **One voice everywhere** — a Task card, a Note card, a File row, and a Life Area chip should all clearly belong to the same family, whichever Sprint introduced them.
5. **Bilingual by default** — every rule here must hold for both Thai and English copy (see Typography § Language). Thai is the primary UI language (`<html lang="th">`); don't design something that only reads well in English.

---

## 1. Brand Identity & CI

### Product identity
- **Name:** My Today
- **Tagline / positioning:** "One Life, One Workspace" — a personal daily workspace, not a task manager. Never style the product to look like a to-do app clone (no Todoist-red, no Notion-style block icons everywhere, no Google-Calendar color-per-category rainbow).
- **Personality:** quiet, honest, a little warm — like a well-made notebook or a MUJI storage box. Not corporate-SaaS, not playful-startup, not academic/enterprise.

### Voice & tone (applies to UI copy, empty states, errors)
- Plain, short, first-person-friendly Thai/English — not marketing language, not exclamation marks.
- Say what happened, not how the user should feel about it. ("บันทึกแล้ว" not "เยี่ยมมาก! บันทึกสำเร็จ 🎉")
- Errors are factual and actionable, never blaming ("กรอกวันครบกำหนดด้วย" not "คุณลืมกรอกข้อมูล!").

### Logo / wordmark
- No icon mark yet (not required at MVP/Core scope). Use a simple text wordmark: `My Today` in the primary typeface, regular or medium weight — never bold, never with a drop shadow, never stretched.
- If a mark is added later (post-Sprint 6/11), it should be a single flat glyph in **Ink** or **Accent** (see tokens below), no gradient, no multi-color logo.

### Hard "don'ts" (things that break the identity)
- No gradients, anywhere.
- No drop shadows heavier than `shadow-sm`; prefer a 1px border/ring over a shadow for elevation.
- No saturated primary colors (`red-500`, `blue-600`, `green-500` etc. from Tailwind's default palette) — see § Colors for the replacement palette.
- No confetti/celebration animations, streak flames, mascot characters, or achievement badges (Life Progress in the Competition Track shows calm progress, not gamification — see [20260806-010-my-today-sprint9-timeline-priority-progress.md](.docs/01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress.md)).
- No dense information walls — prefer one clear hierarchy per screen over cramming everything above the fold.

---

## 2. Design Tokens

These are written as design intent first. When they're wired into code, they belong in `tailwind.config.js` under `theme.extend` (currently empty — see CLAUDE.md → Architecture) as the token names below, not hardcoded hex values scattered across components.

### 2.1 Colors

MUJI's palette is not "gray" — it's warm, undyed, natural: paper, stone, wood, ink. Cool Tailwind slate/blue (currently used ad hoc in `src/components/*`, e.g. `text-slate-500`, `text-blue-600`) should migrate to this warmer, quieter set.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F7F5F0` | App background |
| `surface` | `#FFFFFF` | Cards, modals, inputs |
| `surface-muted` | `#F0EEE6` | Nested/secondary surfaces, disabled fields |
| `border` | `#E4E0D6` | Card borders, dividers (replaces `ring-slate-200`) |
| `ink` | `#2B2A26` | Primary text, headings |
| `stone` | `#6E6A5D` | Secondary text, metadata (replaces `text-slate-500`) |
| `mist` | `#A6A18F` | Placeholder text, disabled text, subtle icons |
| `accent` | `#556B5D` | Primary actions, links, active nav state (replaces `blue-600`/`text-blue-600`) |
| `accent-hover` | `#435847` | Hover/active state of `accent` |
| `accent-soft` | `#E4EAE4` | Accent tint background (selected chip, active badge bg) |

Semantic status colors — muted, never the raw Tailwind swatch:

| Token | Hex | Use |
|---|---|---|
| `status-done` | `#5C7A5C` (text) / `#E5EBE1` (bg) | Done / completed |
| `status-progress` | `#8A7A4E` (text) / `#F0EAD6` (bg) | Doing / in progress |
| `status-todo` | `#6E6A5D` (text) / `#F0EEE6` (bg) | To Do / not started |
| `priority-high` | `#A85C46` (text) / `#F3E4DD` (bg) | High priority (replaces bright red) |
| `priority-medium` | `#8A7A4E` (text) / `#F0EAD6` (bg) | Medium priority |
| `priority-low` | `#6E6A5D` (text) / `#F0EEE6` (bg) | Low priority |
| `danger` | `#A8503D` | Destructive actions (delete) — text/icon only, not a filled button, so it never reads as an "exciting" red CTA |

Rules:
- **Exactly one accent color** (`accent`) is used for interactive/primary elements across the whole app. Status/priority colors are informational, never used for buttons.
- Never introduce a new hue without adding it here first — if Sprint 7's Life Area needs per-area color tags, derive them as muted variants of this same palette (dusty blue, sage, clay, sand — not saturated rainbow chips), and add them to this table when that Sprint is built.
- All text/background pairs above must meet WCAG AA contrast (4.5:1 for body text) — verify any new pair before adding it.

### 2.2 Typography

- **Typeface:** system font stack — no webfont dependency needed or wanted (keeps the app fast and avoids a "designed" look that fights the minimalist goal):
  `font-sans: -apple-system, "Segoe UI", Roboto, "Noto Sans Thai", "Helvetica Neue", Arial, sans-serif`
  `"Noto Sans Thai"` (or the OS's own Thai system font) must be in the stack — this is a Thai-first UI (`<html lang="th">`), so Thai glyph rendering quality isn't optional.
- **Weights used:** Regular (400) and Medium (500) only. Reserve Semibold (600) for page-level H1/H2. **Never use Bold (700)** or heavier — it's the single fastest way to make this look like a generic SaaS product instead of a quiet workspace.
- **Case:** sentence case everywhere. No `UPPERCASE` labels except tiny (`text-xs`) meta tags where a Thai equivalent isn't awkward — prefer weight/color over case for emphasis.

Type scale:

| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| `text-display` | 28px / 36px | Semibold | Page title (e.g. "วันนี้") |
| `text-h2` | 20px / 28px | Semibold | Section headers (e.g. "Today's Tasks") |
| `text-h3` | 16px / 24px | Medium | Card titles, modal titles |
| `text-body` | 15px / 24px | Regular | Default body copy |
| `text-meta` | 13px / 18px | Regular | Secondary metadata (dates, subject/Life Area, counts) |
| `text-caption` | 12px / 16px | Regular | Badges, timestamps, helper text |

### 2.3 Spacing & Layout

4px base unit — every margin/padding/gap should be a multiple of it.

| Token | Value |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |

- **Card padding:** `space-3` (12px) to `space-4` (16px).
- **Gap between stacked cards/list items:** `space-2` (8px) to `space-3` (12px).
- **Page horizontal margin:** `space-4` (16px) on mobile.
- **Content max-width:** the app is mobile-first (bottom tab `NavBar`), so there is no wide desktop layout to define yet — cap content at `640px` centered if/when a desktop breakpoint is added, rather than letting cards stretch edge-to-edge on large screens.
- **Radius:** `rounded-lg` (8px) for inputs/buttons, `rounded-xl` (12px) for cards — keep the two-tier scale the codebase already uses in `TaskCard.tsx`; don't add a third radius size.
- **Elevation:** a single 1px `border` (see token above) is the *only* elevation device. `shadow-sm` may be used in addition to a border for cards that float over content (e.g. modals), never a shadow alone and never anything heavier than `shadow-sm`.

---

## 3. UI Components & Patterns

These patterns describe the target look for both existing components (`TaskCard`, `NavBar`, `SummaryCards`, `TaskFormModal`, `Header`) and any new component future Sprints add (Note/Link cards in Sprint 8, Timeline in Sprint 9, Task/Event Detail in Sprint 10) — new components should read as siblings of these, not a new style.

### Cards (`TaskCard` and future Note/File/Link/Event cards)
- `surface` background, 1px `border`, `rounded-xl`, `space-3`–`space-4` padding.
- One primary line (title, `text-h3`/`ink`), one secondary line (`text-meta`/`stone`) — never more than two text hierarchies on a collapsed card.
- Badges (priority/status) live top-right, pill-shaped (`rounded-full`), using the muted semantic pairs from § Colors — never a solid saturated fill.
- Action row (edit/delete) is bottom-aligned, separated by a hairline `border-t`, text-only buttons (no icon buttons, no filled buttons) — matches the current `TaskCard.tsx` footer pattern.

### Buttons
- **Primary:** solid `accent` background, white text, `rounded-lg`, Medium weight, no shadow. Used once per screen at most for the single most important action.
- **Secondary:** `ink` or `stone` text on transparent/`surface-muted` background, 1px `border` — used for everything else.
- **Destructive:** text-only in `danger` color, no background fill (matches current delete-link pattern in `TaskCard.tsx`) — deletion should feel deliberate, not like a prominent CTA.
- No icon-only buttons without a visible text label unless paired with an `aria-label` and used in a tight space (e.g. a close `×` on a modal).

### Badges / pills (priority, status, future Life Area tags)
- `rounded-full`, `text-caption`, tinted background + darker text of the *same* hue (see § Colors semantic pairs) — never white-text-on-solid-color badges.

### Forms & inputs (`TaskFormModal` and future Note/Event/Profile forms)
- `surface` background, 1px `border`, `rounded-lg`, `space-3` internal padding.
- Focus state: `border` changes to `accent`, plus a subtle 2px `accent-soft` outline — no glowing/blurred focus rings.
- Labels above inputs (not placeholder-as-label), `text-meta`/`stone`.
- Validation errors in `danger` text below the field, no red border flooding the whole input.

### Navigation (`NavBar`)
- Fixed bottom tab bar (mobile pattern already in place) — `surface` background, 1px top `border`, no shadow.
- Active tab: `accent` text/icon. Inactive: `mist`. No active-state background pill, no badge dots unless a Sprint spec explicitly requires a notification count (Sprint 5/Sprint 8 Inbox).

### Empty states
- Plain short sentence (`text-body`/`stone`) + optional single-color line icon. No mascots, no multi-step onboarding illustrations.

### Modals (`TaskFormModal` and future detail/quick-capture modals)
- Centered, `surface` background, `rounded-xl`, generous `space-4`–`space-6` padding.
- Fast, subtle transition only (see § UX Guidelines → Motion) — no bounce, no scale-up-from-zero.

---

## 4. UX Guidelines & Rules

- **One accent, used sparingly.** If a screen has more than one `accent`-colored element competing for attention, that's a signal something else should be neutral instead.
- **Whitespace over density.** When a screen feels cramped, the fix is removing content or adding spacing — not shrinking type or padding below the tokens in § Spacing.
- **No gamification.** Life Progress (Sprint 9), streaks, or completion stats are shown as plain, calm progress indicators (a thin bar or a quiet number) — never badges, trophies, confetti, or "levels."
- **Motion is functional, not decorative.** Transitions exist only to orient the user (a modal opening, a status changing), 150–200ms, `ease-out`. No bouncy/elastic easing, no animation that exists purely for delight.
- **Consistency beats novelty per-Sprint.** When a new Sprint adds a new entity (Note, Link, Event, File), reuse the existing card/badge/button patterns above rather than inventing a new visual style for it — a Note card and a Task card should look like they were designed in the same afternoon.
- **Dual-persona neutral.** Per CLAUDE.md's generalize-target-user rule, nothing in this system may visually skew "for students" or "for office workers" — no persona-specific iconography or color-coding by Life Area type.
- **Accessibility is not optional.** WCAG AA contrast (4.5:1 body text, 3:1 large text/icons) on every color pair in § Colors; every interactive element reachable and legible at mobile viewport widths (this is a bottom-tab-bar mobile-first app); Thai and English copy of differing lengths must both fit without breaking layout — test UI copy in both languages, not just English placeholders.
- **Dark mode:** not in scope for Version 1/Core or the Competition Track — don't add a dark theme or dark-mode toggle ahead of a Sprint that actually requests it.

---

## Adoption note

The current codebase (Sprint 1–2) uses Tailwind's default palette directly in components (`text-slate-500`, `text-blue-600`, `bg-white`, etc. — see `src/components/TaskCard.tsx`, `src/components/NavBar.tsx`) rather than the tokens above, and `tailwind.config.js` has no custom theme yet. This document defines the **target** system; it does not itself retrofit existing components. Migrating existing screens onto these tokens (adding them to `tailwind.config.js theme.extend`, then updating component classNames) is implementation work for a future Sprint's UX pass (e.g. Sprint 6 or Sprint 11 polish) — don't restyle existing Sprint 1–2 components as a side effect of an unrelated change; do it as its own deliberate pass, or ask the user first.
