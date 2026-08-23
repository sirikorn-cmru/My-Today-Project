# My Today — Technology Stack Decision

เชื่อมโยงกลับ: [[index|02-technical]], [[architecture|architecture]] (โครงสร้าง container เชิงแนวคิดที่ stack นี้ implement จริง), [[../../01-requirements/feature-list|feature-list]]

## ขอบเขตของเอกสารนี้

เอกสารนี้ **ผูกกับ stack เทคโนโลยีจริง** โดยเจตนา — ต่างจากเอกสารอื่นใน `02-technical/` ([[architecture|architecture.md]], `database-schema.md`, `api-spec.md`, `detailed-design.md`) ซึ่งเป็น conceptual/stack-agnostic ตั้งใจ เอกสารนี้มีหน้าที่ระบุชื่อเทคโนโลยีจริง — ภาษา, framework, library, บริการ hosting/deployment, ฐานข้อมูล — พร้อมเหตุผลของการเลือก

**ขอบเขตของการตัดสินใจครั้งนี้ (ยืนยันกับผู้ใช้แล้ว):** เอกสารฉบับนี้เป็นการ **บันทึกและตรวจสอบย้อนหลัง (retroactive validation)** stack ที่มีอยู่จริงและ deploy ใช้งานแล้วของ "My Today Project" — ไม่ใช่การเลือก stack แบบ greenfield Sprint 1-8 ถูกสร้างและ deploy ด้วย stack นี้อยู่แล้ว การสัมภาษณ์ที่นำมาสู่เอกสารนี้มีขึ้นเพื่อยืนยันว่า stack ที่เลือกไว้ยังคงเหมาะสม ไม่ใช่เพื่อเปิดการตัดสินใจใหม่

**วันที่ตัดสินใจ (บันทึกเอกสารนี้):** 2026-08-23

## 1. สรุปข้อกำหนดและข้อจำกัด (Requirements & Constraints Summary)

### Functional Scope
**ข้ามหัวข้อนี้ (Skipped)** — เหตุผล: ขอบเขตฟังก์ชันของระบบถูกบันทึกไว้ครบถ้วนแล้วใน [[../../01-requirements/01-spec/20260806-008-my-today-functional-requirements-master|FR master list (FR-01 ถึง FR-19)]] และ [[architecture|architecture.md]] การถามซ้ำจะเป็นการทำซ้ำเอกสาร source-of-truth ที่มีอยู่แล้วโดยไม่จำเป็น

### Non-functional Requirements
- ต้องใช้งานได้แบบ **offline** — ข้อมูลอยู่บนเครื่องผู้ใช้ทั้งหมด ใช้งานได้แม้ไม่มีเครือข่ายเลย
- ต้องมี **ความเป็นส่วนตัวของข้อมูลสูง / ผู้ใช้ควบคุมข้อมูลของตัวเอง** (privacy-by-design) — เชื่อมโยงกับงาน PDPA Privacy Notice ของ Sprint 6 — ไม่มี server ใดเห็นข้อมูลผู้ใช้เลย
- ต้องการ **ต้นทุน hosting ขั้นต่ำ/ฟรี**
- **ประสิทธิภาพ/load ไม่ใช่ประเด็นสำคัญ** เพราะผู้ใช้เป็นบุคคลทั่วไป/นักศึกษาที่ใช้งานคนเดียว ไม่ใช่ระบบที่ต้องรองรับ concurrency สูง

### Team Factors
- ทีม (นักพัฒนาคนเดียว/ทีมเล็ก) คุ้นเคยกับ JS/TypeScript ecosystem อยู่แล้ว — นี่เป็นปัจจัยชี้ขาดที่ทำให้ตัดตัวเลือก stack ที่ไม่ใช่ JS/TS ออกทั้งหมด

### Budget & Timeline
- งบประมาณ: **free tier เท่านั้น** ไม่มีงบสำหรับ infrastructure/hosting แบบเสียเงิน
- Timeline: **ข้ามหัวข้อนี้บางส่วน (Skipped)** — เหตุผล: ไม่มีผลต่อการตรวจสอบย้อนหลัง (retroactive validation) เนื่องจากโค้ดถูกสร้างและ deploy เสร็จแล้ว เงื่อนไข timeline จึงถูกตอบสนองแล้วโดยปริยายจากข้อเท็จจริงที่ว่า "สร้างเสร็จและ deploy แล้ว"

### Hosting & Data
- Hosting: **static/SPA hosting บน Vercel (free tier)** ไม่มี backend server
- ความต้องการด้านข้อมูล: เป็น record/blob storage แบบง่าย ไม่ใช่ relational ที่ต้องมี complex joins หรือ ACID multi-table transaction — สอดคล้องกับ browser-native storage (structured JSON records + binary blobs) มากกว่าฐานข้อมูลแบบ hosted

### Security & Compliance
- PDPA compliance จัดการที่ระดับ "Privacy Notice" เท่านั้น (ตามสเปก Sprint 6 ที่ implement แล้ว) — เนื่องจากไม่มี backend และข้อมูลไม่เคยออกจากเครื่องผู้ใช้เลย ท่าทีการปกป้องข้อมูลที่เข้มงวดที่สุด (ข้อมูลไม่มีทางออกจาก browser ของผู้ใช้ได้เลยโดยธรรมชาติของสถาปัตยกรรม) จึงตอบโจทย์นี้ได้โดยไม่ต้องมี encryption-at-rest/access-control infrastructure เพิ่มเติม

### Fixed Constraints
- **ยืนยันว่ายังคงเป็นข้อจำกัดตายตัว:** "client-only, ไม่มี backend" ยังคงบังคับใช้ตลอดทั้ง Version 1/Core และ Version 2/Competition Track (Sprint 1-11) ตาม Project Purpose ใน `CLAUDE.md` — เอกสารนี้จะไม่เสนอให้เพิ่ม backend
- ความเป็นไปได้ในอนาคตที่ต้องมี backend (เช่น เฟส "Daily Orchestrator" ที่เป็น AI แบบเก็งกำไรหลัง Freeze) ถูกตัดออกจากการประเมินครั้งนี้เพราะยังไม่มีข้อกำหนดที่เป็นรูปธรรม (premature)

## 2. ตัวเลือกที่พิจารณา (Candidates Considered)

| Stack | ข้อดี (เทียบกับข้อกำหนดที่รวบรวมได้) | ข้อเสีย |
|---|---|---|
| **React + Vite + TypeScript + Tailwind CSS + LocalStorage/IndexedDB + Vercel** (ตัวที่เลือกจริงและ deploy แล้ว) | ทีมคุ้นเคยกับ JS/TS ecosystem อยู่แล้ว (Team Factors); LocalStorage/IndexedDB ให้ offline capability เต็มรูปแบบและตอบโจทย์ "client-only ตลอด V1-V2" (Fixed Constraints) โดยธรรมชาติโดยไม่ต้องเขียนโค้ดบังคับข้อจำกัดเพิ่ม; ต้นทุน infrastructure เป็นศูนย์ (ตรงกับงบ free-tier-only); Vercel free tier เพียงพอสำหรับ static hosting ของ SPA (Hosting & Data) | LocalStorage มี quota แบบ string-only ประมาณ 5-10MB จึงต้องแยก file blob ไปไว้ที่ IndexedDB (จัดการเชิงสถาปัตยกรรมแล้วตั้งแต่ Sprint 4); ไม่มี cross-device sync (เป็น trade-off ที่ยอมรับได้ ไม่ใช่ข้อกำหนด) |
| Vue 3 + Vite + TypeScript + Tailwind CSS (storage/hosting แบบเดียวกัน) | DX ใกล้เคียงกัน, learning curve นุ่มนวลกว่า React เล็กน้อย | ทีมเน้น React/JS-ecosystem อยู่แล้ว (Team Factors) — การเปลี่ยนไม่ได้เพิ่มประโยชน์ต่อข้อกำหนดใดที่รวบรวมมาเลย มีแต่ต้นทุนการเรียนรู้ใหม่โดยไม่จำเป็น |
| Local-first framework ที่มี sync ในตัว (เช่น สถาปัตยกรรมสไตล์ RxDB/PouchDB) | จะช่วยให้ฟีเจอร์ cross-device sync ในอนาคต (ถ้ามี) ทำได้ง่ายขึ้น | Over-engineered เทียบกับข้อกำหนดจริง — ขัดกับข้อจำกัดตายตัวที่ยืนยันแล้วว่า "client-only ตลอด V1-V2" (Fixed Constraints) และไม่มีข้อกำหนดใดเรียกร้อง sync ในตอนนี้ เพิ่มความซับซ้อนที่ไม่มีเหตุผลรองรับ |

## 3. การตัดสินใจ (Decision)

**Stack ที่ยืนยัน (คงไว้ตามที่ deploy จริง ไม่มีการเปลี่ยนแปลง):**

| Layer | เทคโนโลยี | เวอร์ชัน (จาก `package.json`/config จริง) |
|---|---|---|
| Language | TypeScript | `^5.5.2`, `strict: true` (จาก `tsconfig.json`) |
| UI Framework | React | `^18.3.1` (+ `react-dom` `^18.3.1`) |
| Build Tool / Dev Server | Vite | `^5.3.1` (`@vitejs/plugin-react` `^4.3.1`) |
| Routing | React Router | `react-router-dom` `^7.18.2` (`BrowserRouter`, ดู `src/main.tsx`) |
| Styling | Tailwind CSS | `^3.4.4` (utility classes เท่านั้น, ไม่มี CSS-in-JS หรือ component library — `postcss` `^8.4.38`, `autoprefixer` `^10.4.19`) |
| State/Data (ในแอป) | React hooks + props (ไม่มี context/store แยก) | `App.tsx` เป็นเจ้าของ state เดียว ส่งลง props ให้ทุก route |
| Persistence — structured data | Browser LocalStorage | key `my-today:tasks:v2` และ key อื่นๆ ต่อ entity ผ่าน `src/lib/storage.ts` |
| Persistence — file blobs | Browser IndexedDB | wrapper ดิบใน `src/lib/fileDb.ts` (object store เดียว เก็บ metadata + `Blob` รวมกัน) |
| Hosting / Deployment | Vercel (free tier) | static SPA + `vercel.json` (SPA rewrite `/(.*)` → `/index.html`) |
| Lint | ESLint | `^8.57.0` |
| Test runner | ยังไม่มี | ยังไม่มี Sprint ใดต้องการ test runner ตามที่ระบุใน `CLAUDE.md` |

**เหตุผลประกอบการตัดสินใจ:** การเลือก **React + TypeScript** มาจาก Team Factors โดยตรง (ทีมคุ้นเคยกับ JS/TS ecosystem อยู่แล้ว เป็นปัจจัยชี้ขาดที่ตัด stack ที่ไม่ใช่ JS/TS ออกทั้งหมด) การเลือก **LocalStorage สำหรับ structured records + IndexedDB สำหรับ file blob** มาจาก Non-functional Requirements (ต้อง offline ได้ 100%, ความเป็นส่วนตัวของข้อมูลสูงสุด — ข้อมูลไม่ออกจากเครื่องเลย) ผนวกกับ Hosting & Data (ความต้องการข้อมูลเป็น record/blob แบบง่าย ไม่ใช่ relational ที่ซับซ้อน) และ Fixed Constraints (client-only ตลอด V1-V2) — LocalStorage ตอบโจทย์ข้อมูล structured ทั่วไป ส่วน IndexedDB ถูกดึงมาใช้เฉพาะสำหรับไฟล์แนบเพราะ LocalStorage มี quota แบบ string-only จำกัดที่ ~5-10MB ไม่พอสำหรับ blob เนื้อหาไฟล์จริง การเลือก **Vite + Tailwind CSS** มาจาก Team Factors (ระบบนิเวศเดียวกับ React ที่ทีมคุ้นเคย) รวมกับ Budget & Timeline (build tool เร็ว ลด friction สำหรับทีมเล็ก) การเลือก **Vercel free tier** มาจาก Budget & Timeline (free tier เท่านั้น) ผนวกกับ Non-functional Requirements (performance/load ไม่ใช่ประเด็น จึงไม่ต้องการ tier ที่แพงกว่า) และ Fixed Constraints (ไม่มี backend — Vercel ให้แค่ static hosting ก็เพียงพอ)

## 4. Trade-offs ที่ยอมรับ (Trade-offs Accepted)

- **ไม่มี cross-device sync** — เทียบกับตัวเลือก local-first framework ที่มี sync ในตัว (เช่น RxDB/PouchDB-style) stack ที่เลือกไม่รองรับการซิงก์ข้อมูลข้ามอุปกรณ์เลย ยอมรับได้เพราะไม่มีข้อกำหนดใดเรียกร้อง sync ในขอบเขต Sprint 1-11 ปัจจุบัน และการเพิ่ม sync จะขัดกับข้อจำกัดตายตัว "client-only" อยู่ดี
- **Learning curve ที่นุ่มนวลกว่าของ Vue 3 ถูกละทิ้ง** — เทียบกับตัวเลือก Vue 3 + Vite + TypeScript + Tailwind ที่มี DX ใกล้เคียงกันและเรียนรู้ง่ายกว่าเล็กน้อยสำหรับทีมใหม่ ยอมรับได้เพราะทีมจริงคุ้นเคยกับ React อยู่แล้ว ข้อดีของ Vue จึงไม่มีผลจริงต่อทีมนี้
- **LocalStorage's ~5-10MB quota (string-only)** — ยอมรับความซับซ้อนเพิ่มขึ้นเล็กน้อยจากการต้องแยก persistence layer เป็นสองระบบ (LocalStorage + IndexedDB) แทนที่จะใช้ที่เก็บข้อมูลเดียวที่จัดการทุกอย่างได้ (เช่น hosted database) แลกกับการคงต้นทุน infrastructure ไว้ที่ศูนย์ตามงบ free-tier-only
- **ไม่มี hosted database ที่รองรับ query/join ซับซ้อน** — ยอมรับได้เพราะความต้องการข้อมูลจริงของระบบเป็น record/blob แบบง่าย ไม่มี relational query ที่ซับซ้อนตามที่ยืนยันในหัวข้อ Hosting & Data

## 5. ความเสี่ยง / คำถามเปิด (Risks / Open Questions)

- **ขนาดข้อมูลไฟล์แนบเติบโตเกิน IndexedDB quota ของ browser** — ถ้าผู้ใช้อัปโหลดไฟล์จำนวนมาก/ขนาดใหญ่ในระยะยาว อาจต้องพิจารณาแจ้งเตือนผู้ใช้เรื่อง quota หรือแนวทางจัดการไฟล์เก่า (ยังไม่มีข้อกำหนดที่เป็นรูปธรรมในตอนนี้ — เป็นเพียงข้อสังเกตเชิงเทคนิค ไม่ใช่ requirement ที่ถูกยกมาในสัมภาษณ์)
- **ถ้าในอนาคตมีความต้องการ cross-device sync จริง** — จะต้องกลับมาทบทวนการตัดสินใจนี้ทั้งหมด (LocalStorage/IndexedDB ไม่รองรับ sync โดยธรรมชาติ) แต่ ณ ปัจจุบันไม่มีข้อกำหนดเช่นนั้นและขัดกับ Fixed Constraints ของ Version 1-2
- **เฟส "Daily Orchestrator" (AI, หลัง Freeze)** — ถ้าเฟสนี้เกิดขึ้นจริงในอนาคตและต้องการ backend/AI inference service ข้อจำกัด "client-only" และ stack นี้ทั้งหมดจะต้องถูกประเมินใหม่ทั้งหมด **เอกสารฉบับนี้ไม่ครอบคลุมเฟสนั้น** เนื่องจากยังไม่มีข้อกำหนดที่เป็นรูปธรรม (out of scope ของการประเมินนี้ตามที่ระบุใน Fixed Constraints)
- **ขอบเขตของเอกสารนี้จำกัดเฉพาะ Sprint 1-8 ที่ build จริงแล้ว** — Sprint 9-11 (Now/Next/Later Timeline + Smart Priority, Task-Event-File-Note-Link linking, Demo polish) ยังไม่เริ่ม แต่จากสเปกที่มีอยู่ ยังไม่มีสัญญาณว่าจะต้องเปลี่ยน stack นี้ — หากมีข้อกำหนดใหม่ที่ขัดกับ client-only หรือ storage แบบปัจจุบันเกิดขึ้นระหว่าง Sprint 9-11 ต้องกลับมาเปิดการตัดสินใจนี้ใหม่

## 6. Change Log

- **2026-08-23** — สร้างเอกสารครั้งแรก บันทึกและยืนยัน (retroactive validation) stack ที่ deploy จริงของ Sprint 1-8: React 18 + Vite 5 + TypeScript 5 (strict) + Tailwind CSS 3 + React Router 7, persistence แบบ LocalStorage (structured data) + IndexedDB (file blob), deploy บน Vercel free tier — ไม่มีการเปลี่ยนแปลง stack ที่แนะนำ
