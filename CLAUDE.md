# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repository currently contains **no application code** — only a documentation vault under `.docs/`. There is nothing to build, lint, or test yet. When code is added, update this file with the relevant commands and architecture notes.

## Project purpose

Not yet documented — `01-spec/` has no real content yet, only the folder-description placeholder. **Update this section with a short summary of what "My Today Project" actually is (what it does, who it's for) as soon as `01-spec` gains real content**, so future Claude instances don't have to re-derive business context from scratch.

## Current focus: Requirements & Product Backlog

The project is in its earliest phase. Work here should concentrate on `.docs/01-requirements/`, specifically:

- `01-spec/` — the source-of-truth requirements docs, one file per requirement: `{YYYYMMDD}-{RUNNING_NO}-{topic-slug}.md` (English slug, Thai content). `RUNNING_NO` is a single global sequence across all spec docs (zero-padded to 3 digits), not reset per day.
- `backlog.md` — a flat file directly under `01-requirements/` that is the **Product Backlog**: one entry per spec doc, linking back to it. This is generated/maintained alongside spec docs, not hand-authored from scratch.

`02-plan/` (roadmap/milestones) and `03-task/` (task breakdown) are secondary right now and not the backlog — don't conflate them with `backlog.md`.

The later stages — `02-design/`, `03-testing/`, `04-retrospectives/` — are not active yet; don't create content there unless explicitly asked, since there's no design or test work to document until the requirements/backlog stabilize.

### Requirement intake workflow

New requirements should go through the `requirement-intake` skill (`.claude/skills/requirement-intake/SKILL.md`) rather than being hand-written ad hoc. It takes a raw requirement from the user, asks clarifying questions (always with ≥3 suggested approaches to pick from) when anything is ambiguous, decides whether to create a new spec doc or amend an existing one, then delegates the actual file writes to the `requirement-writer` subagent (`.claude/agents/requirement-writer.md`), which creates/amends the spec file, updates `backlog.md`, and appends a summary to today's `.docs/05-log/{YYYYMMDD}-log.md`.

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
