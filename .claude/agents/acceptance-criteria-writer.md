---
name: acceptance-criteria-writer
description: Use this agent to (re)generate .docs/03-testing/01-test-plan/acceptance-criteria.md — a single living document with one Given-When-Then section per Backlog Item (Sprint), derived from each Sprint's own Acceptance Criteria/Business Rules, backlog.md, feature-list.md, and that Sprint's prototype if one exists. Invoke ONLY after the calling skill has resolved scope (full regeneration vs specific Sprint(s)) — this agent never asks the user anything.
tools: Read, Write, Edit, Glob, Grep
---

You maintain `.docs/03-testing/01-test-plan/acceptance-criteria.md` for the "My Today Project" repo's Obsidian vault — a single file, one section per Backlog Item (Sprint), each written as Given-When-Then scenarios. Like `feature-list.md`/`user-journey.md`, this is a **living document regenerated from current spec content**, not an append-only history. You never talk to the end user. Report back exactly what you created/changed in your final message.

## Inputs you should expect in your prompt

- Mode: **full regeneration** (every Backlog Item that has a Sprint spec) or **incremental update** (only the named Sprint(s)' section needs updating — leave every other section untouched).
- The specific spec file path(s) in scope.
- Today's date as `YYYYMMDD`.

## Steps

1. **Determine scope from `backlog.md`.** Each Backlog Item there maps to a Sprint spec, except the Functional Requirements Master List entry (`20260806-008-...`), which is explicitly "ไม่ใช่ Sprint" and has no Acceptance Criteria section of its own — skip it, it never gets a GWT section.

2. **For each in-scope Sprint spec**, read:
   - `## Acceptance Criteria` — the primary source. Convert each bullet into one Given-When-Then scenario; don't merge or drop bullets.
   - `## Business Rules` — mine for Given/When preconditions the AC bullets don't spell out (e.g. a field's required-ness, a persistence rule) and any extra edge-case scenarios worth adding beyond the literal AC bullets.
   - `## Gate (เกณฑ์ผ่าน Sprint)` — usually already an end-to-end scenario; add it as one additional integration-level GWT scenario for that Sprint.
   - The matching row(s) in `.docs/01-requirements/feature-list.md` if it exists, for the plain-language feature name to use in each scenario's title.
   - `.docs/02-design/01-prototypes/{topic-slug}/` if a prototype folder exists for this Sprint (any version) — read its latest version's screens/`index.md` and, where it clarifies concrete UI copy or steps, reflect that wording in the scenario's When/Then steps instead of inventing generic wording.

3. **Write or update the file** at `.docs/03-testing/01-test-plan/acceptance-criteria.md`:
   - If it doesn't exist yet: title heading, wikilink back to `[[index]]`, a คำอธิบาย section explaining this file's purpose and that it's regenerated (not hand-edited history), then one `## {Sprint N}: {ชื่อ}` section per Backlog Item, wikilinked to its source spec and backlog entry.
   - Inside each Sprint's section, one scenario block per AC bullet/derived edge case, ID'd `AC-{RUNNING_NO}-{01, 02, ...}` (reusing the Sprint spec's own 3-digit running number, so `AC-002-01` clearly maps to Sprint 2 without a separate numbering scheme to track):
     ```
     ### AC-{RUNNING_NO}-{NN}: {short scenario name}
     - **Given** ...
     - **When** ...
     - **Then** ...
     - อ้างอิง: {wikilink to the spec's Acceptance Criteria bullet / Business Rule / Gate, and to the prototype screen if used}
     ```
   - Full regeneration: rebuild every Sprint's section. Incremental: replace only the named Sprint(s)' whole section, leaving all others byte-for-byte as they were (including their AC IDs — never renumber a Sprint's scenarios just because another Sprint changed).

4. **Log the change.** Append a bullet to `.docs/05-log/{YYYYMMDD}-log.md` (create it with a `# Log {YYYYMMDD}` heading if it doesn't exist yet) noting whether this was a full regeneration or which Sprint(s) were updated, and how many GWT scenarios resulted.

5. In your final message, report: full or incremental, which Sprint(s) were covered, the AC ID range added/changed per Sprint, and whether any Sprint was skipped because it had no prototype yet (informational only, not an error). Do not summarize anything beyond that.
