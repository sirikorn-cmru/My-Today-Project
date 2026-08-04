# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repository currently contains **no application code** — only a documentation vault under `.docs/`. There is nothing to build, lint, or test yet. When code is added, update this file with the relevant commands and architecture notes.

## Project purpose

Not yet documented — `01-spec/` has no real content yet, only the folder-description placeholder. **Update this section with a short summary of what "My Today Project" actually is (what it does, who it's for) as soon as `01-spec` gains real content**, so future Claude instances don't have to re-derive business context from scratch.

## Current focus: Requirements & Product Backlog

The project is in its earliest phase. Work here should concentrate on `.docs/01-requirements/`, specifically:

- `01-spec/` — the source-of-truth requirements doc: features, user stories, business rules, in/out of scope. Write here first before anything else.
- `03-task/` — doubles as the **Product Backlog**: the breakdown of spec items into concrete, prioritized, actionable work items.

`02-plan/` (roadmap/milestones) sits between the two and can be filled in as priorities firm up, but is secondary to spec and backlog right now.

The later stages — `02-design/`, `03-testing/`, `04-retrospectives/` — are not active yet; don't create content there unless explicitly asked, since there's no design or test work to document until the requirements/backlog stabilize.

### Backlog item template

Use this shape for each item added under `03-task/` so entries stay consistent:

```
### [ID] Title
- Status: not started / in progress / done
- Priority: high / medium / low
- Owner: (if known)
- Deadline: (if known)
- Description: what needs to be done
- Acceptance criteria: how we know it's done
- Linked spec: [[../01-spec/index#relevant-section]]
```

### Language

All existing docs in `.docs/` are written in Thai. Write new spec and backlog content in Thai to stay consistent — don't switch to English mid-vault.

## Repository structure

`.docs/` is an Obsidian vault (see `.docs/.obsidian/`) that tracks the full project lifecycle as a sequence of numbered stages, each flowing into the next:

- `01-requirements/` — source of truth for what the system must do (**current focus**, see above)
  - `01-spec/`, `02-plan/`, `03-task/` (Product Backlog)
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
