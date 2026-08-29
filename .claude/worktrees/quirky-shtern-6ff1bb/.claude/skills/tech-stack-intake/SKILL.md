---
name: tech-stack-intake
description: สร้างหรืออัปเดต .docs/02-design/02-technical/technology-choices.md — เอกสารเดียวใน 02-technical/ ที่เอ่ยชื่อเทคโนโลยีจริงได้ (React, TypeScript, Vite, Tailwind, LocalStorage/IndexedDB, Vercel ฯลฯ) โดยสัมภาษณ์ user แบบเข้มข้นเพื่อเก็บเหตุผล/ข้อจำกัดเบื้องหลังแต่ละตัวเลือกที่ codebase จริงเลือกใช้ไปแล้ว (ไม่ใช่การเลือก stack ใหม่ เพราะ build ไปแล้ว 7 Sprint) หรือช่วยตัดสินใจ library ใหม่สำหรับ Sprint ที่ยังไม่เริ่ม ใช้เมื่อ user ขอสร้าง/ปรับปรุงเอกสาร tech stack หรือเรียกผ่าน /tech-stack-intake โดยตรง
---

Skill นี้สร้างหรืออัปเดตเอกสาร `.docs/02-design/02-technical/technology-choices.md` ของโปรเจกต์ "My Today Project" — เอกสารเดียวใน `02-technical/` ที่**เอ่ยชื่อเทคโนโลยีจริงได้** (ตรงข้ามกับ `architecture.md`/`database-schema.md`/`api-spec.md`/`detailed-design.md` ที่ตั้งใจ conceptual ล้วนๆ)

**สำคัญ — ขอบเขตของ skill นี้ตามที่ user ยืนยันแล้ว:** โปรเจกต์นี้ build มาแล้ว 7 Sprint ด้วย stack ที่เลือกไปแล้ว (React + TypeScript + Vite + Tailwind, LocalStorage/IndexedDB, Vercel — ดู `CLAUDE.md` → Architecture) การ "ช่วยเลือก tech stack ที่เหมาะสม" ของ skill นี้จึงเน้นไปทาง **เอกสารย้อนหลัง (retrospective)**: สัมภาษณ์ user เพื่อเก็บ**เหตุผล**ที่มาของแต่ละตัวเลือกที่มีอยู่แล้ว ไม่ใช่เสนอตัวเลือกใหม่แทนของที่ build ไปแล้ว — ยกเว้นกรณี Sprint 8-11 ที่ยังไม่เริ่ม ซึ่งอาจมี library ใหม่ที่ยังไม่ตัดสินใจ (เช่น markdown editor สำหรับ Note, date-picker) เป็นจุดเดียวที่ skill นี้ "ช่วยเลือก" ของใหม่จริงๆ ได้

## 1. กำหนดโหมด: Full interview (ครั้งแรก) หรือ Incremental (decision ใหม่ 1 รายการ)

- Glob เช็คว่ามี `technology-choices.md` อยู่แล้วหรือไม่
- **ยังไม่มี (ครั้งแรก):** โหมด full interview — สัมภาษณ์ทุก layer ตามขั้นตอนที่ 2
- **มีอยู่แล้ว และ user พูดถึง decision ใหม่ 1 รายการ** (เช่น "ช่วยเลือก library สำหรับ Note editor"): โหมด incremental — สัมภาษณ์เฉพาะ decision นั้น (ในกรณีนี้ skill "ช่วยเลือก" จริงๆ ได้ เพราะยังไม่มีของเดิมให้ขัดแย้ง เสนอ ≥3 แนวทางพร้อมข้อดี/ข้อเสียตามปกติ)
- **มีอยู่แล้ว และ user พูดกว้างๆ ว่า "อัปเดตเอกสาร tech stack":** ถามว่าต้องการ regenerate ทั้งหมดใหม่ (ถ้าสงสัยว่าเอกสารเดิมไม่ตรงกับ code ปัจจุบันแล้ว) หรืออัปเดตเฉพาะส่วน

## 2. สัมภาษณ์แบบเข้มข้น — ทำในบทสนทนาหลักเท่านั้น (ห้ามส่งให้ subagent ทำ เพราะ subagent คุยกับ user ไม่ได้)

**ก่อนถามอะไร user ให้เช็คว่ามีเหตุผลบันทึกไว้แล้วในเอกสารอื่นหรือไม่ก่อน** อ่าน `CLAUDE.md` (Project state, Architecture), `package.json` (dependencies/devDependencies จริง), spec ที่เกี่ยวข้อง (โดยเฉพาะ [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]] ส่วน PDPA ที่อธิบายเหตุผล "client-only ไม่มี backend" ไว้ค่อนข้างละเอียดแล้ว) — ถ้า layer ไหนมีเหตุผลชัดเจนอยู่แล้ว ไม่ต้องถาม user ซ้ำ ให้ใช้เหตุผลนั้นไปเลย (แจ้ง user สั้นๆ ว่าดึงมาจากไหน)

สำหรับ layer ที่ยังไม่มีเหตุผลบันทึกไว้ ให้ถาม user ทีละ layer (ถามรวมเป็นชุดคำถามเดียวก็ได้ถ้าสั้นพอ ไม่ต้องทีละคำถามทุกครั้ง) ครอบคลุมอย่างน้อย:

- **Language/Type system:** TypeScript — ทำไมเลือก (เช่น type-safety, ความคุ้นเคยของทีม, ข้อกำหนดวิชา/competition)?
- **Framework:** React 18 — ทำไมเลือกเทียบกับ Vue/Svelte/Angular/vanilla JS?
- **Build tool:** Vite — ทำไมเลือกเทียบกับ Create React App/webpack/Parcel?
- **Styling:** Tailwind CSS — ทำไมเลือกเทียบกับ CSS-in-JS/plain CSS/component library อื่น (เช่น MUI, Chakra)?
- **Routing:** react-router-dom (BrowserRouter) — ทำไมเลือกเทียบกับ HashRouter หรือไม่ใช้ router library เลย?
- **Client-side storage:** LocalStorage (Task/Event/LifeArea/Profile/Notification read-state) + IndexedDB ดิบ (File blob) — ทำไมแยกสองแบบนี้ ทำไมไม่ใช้ wrapper library (เช่น `idb`) ทำไมไม่มี backend/database จริง?
- **State management:** ไม่มี library แยก (Context/Redux/Zustand) — `App.tsx` เป็นเจ้าของ state เดียวส่งผ่าน props — เป็นการตัดสินใจแบบมีเหตุผล (เช่น scope เล็กพอไม่จำเป็น) หรือเผื่อไว้เปลี่ยนถ้า Sprint 8-11 ซับซ้อนขึ้น?
- **Testing:** ยังไม่มี test runner ใดๆ — ตั้งใจเลื่อนไปก่อนหรือมีแผนจะเพิ่มตอนไหน (เช่น Sprint ไหนที่ Gate บังคับ automated test)?
- **Hosting/Deploy:** Vercel — ทำไมเลือก (เช่น ฟรี, รองรับ SPA ง่าย, ทีมคุ้นเคย)?
- **อื่นๆ ที่เจอใน `package.json` แต่ยังไม่ถูกกล่าวถึง** (เช่น ESLint, PostCSS/Autoprefixer) — ถามรวบสั้นๆ ว่ามีเหตุผลเฉพาะอะไรไหมหรือเป็น default ของ toolchain

**ถ้า user ตอบไม่ชัดหรือไม่แน่ใจในข้อไหน** ให้เสนอ ≥3 เหตุผล/มุมมองที่เป็นไปได้พร้อมข้อดี/ข้อเสียให้เลือก (เช่นสำหรับ "ทำไมเลือก React" อาจเสนอ: 1) ความคุ้นเคยของทีม/หลักสูตรที่สอน React — ข้อดี พัฒนาเร็ว ข้อเสีย ไม่ได้เลือกจากคุณสมบัติทางเทคนิคโดยตรง 2) Ecosystem/community ใหญ่ หา library เสริมง่าย — ข้อดี support ยาว ข้อเสีย bundle size ใหญ่กว่า framework ใหม่ๆ 3) ต้องการ portfolio/ประสบการณ์ React โดยเฉพาะ — ข้อดี ตรงเป้าหมายการเรียน ข้อเสีย ไม่ใช่เกณฑ์ทางเทคนิคของโปรเจกต์)

## 3. เรียก subagent `tech-stack-writer`

หลังสัมภาษณ์ครบ (หรือ decision เดียวที่ต้องการในโหมด incremental) ส่งให้ subagent:

- โหมด (full regeneration / incremental)
- ข้อจำกัดของโปรเจกต์ (client-only, no backend, no external service ฯลฯ — จาก `CLAUDE.md`/spec)
- เหตุผลต่อ layer ที่รวบรวมได้ (ทั้งที่ derive จากเอกสารเดิมและที่สัมภาษณ์ใหม่) พร้อมระบุว่าอันไหนมาจากไหน
- วันที่ปัจจุบันแบบ `YYYYMMDD`

## 4. รายงานผลให้ user

- สรุปว่า layer ไหนถูกบันทึกแล้วบ้าง อันไหน derive จากเอกสารเดิม อันไหนมาจากการสัมภาษณ์รอบนี้
- ถ้า subagent รายงานว่ามี dependency ใน `package.json` ที่ยังไม่ถูกครอบคลุม ให้แจ้ง user ไว้เป็นแนวทางสำหรับรอบสัมภาษณ์ถัดไป
- ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
