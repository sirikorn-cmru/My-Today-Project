# Test Plan — My Today Project

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้คือ **แผนกลยุทธ์การทดสอบระดับโปรเจกต์ (Test Strategy)** มีไฟล์เดียวสำหรับทั้งโปรเจกต์ (ตรงข้ามกับ `test-cases/{feature-slug}.md` ที่มีหนึ่งไฟล์ต่อหนึ่ง Sprint สำหรับ test case แบบ step-by-step) เป็น living document ที่ **regenerate ใหม่ทั้งหมด** จาก `backlog.md` และ spec ปัจจุบันทุกครั้งที่มีการรัน `test-intake` แบบ full refresh — ไม่ใช่ประวัติสะสม

**หมายเหตุสำคัญเรื่องแหล่งข้อมูล NFR:** โปรเจกต์นี้ไม่มีเอกสาร Non-Functional Requirements (NFR) แยกต่างหาก เนื้อหาด้าน Performance, Responsive/Device Support และ Legal/Privacy (PDPA) ในเอกสารนี้จึงสกัดมาจาก [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]] เป็นหลัก (Sprint เดียวที่ระบุข้อกำหนดเหล่านี้ไว้อย่างชัดเจน) ไม่ได้มาจากเอกสาร NFR โดยเฉพาะ

---

## ขอบเขต (Scope)

### In scope — พร้อมทดสอบตอนนี้ (build แล้วตาม `backlog.md`)

- [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1: Today Dashboard]] — สถานะ: เสร็จแล้ว
- [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2: Task Management]] — สถานะ: เสร็จแล้ว

### Out of scope — ยังไม่ build ตาม `backlog.md` (ช่องว่างนี้คือ "ยังไม่ถึงคิว build" ไม่ใช่ "ถูกลืม")

- [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3: Calendar & Schedule]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4: File Organizer]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5: Notification & Deadline Awareness]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]] — ยังไม่เริ่ม (แม้ยังไม่ build แต่เนื้อหา Responsive/PDPA ของ spec นี้ถูกนำมาใช้เป็นเกณฑ์ NFR ล่วงหน้าในเอกสารนี้แล้ว — ดูหมายเหตุด้านบน)
- [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7: Life Area & Personal Profile]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8: Universal Inbox + Quick Capture]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9: Timeline + Smart Priority + Life Progress]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10: Task–Event–File Linking]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11: Competition Demo + UX Polish, then Freeze]] — ยังไม่เริ่ม

(หมายเหตุ: `20260806-008-my-today-functional-requirements-master.md` เป็นเอกสารอ้างอิงกลาง FR ทั้งหมด ไม่ใช่ Sprint จึงไม่รวมอยู่ใน scope การทดสอบนี้)

---

## ประเภทการทดสอบ (Test Types & Strategy)

1. **Functional / Manual Black-Box Testing ต่อฟีเจอร์** — ทดสอบตาม test case ที่ละเอียดในไฟล์ `test-cases/{feature-slug}.md` ของแต่ละ Sprint (หนึ่งไฟล์ต่อ Sprint ครอบคลุมทุก feature ของ Sprint นั้น) แต่ละ test case อ้างอิงกลับไปยัง scenario ใน `acceptance-criteria.md`
2. **Regression Testing** — โปรเจกต์นี้มีกฎ Non-regression ระบุไว้ชัดเจนในทุก spec ตั้งแต่ Sprint 2 เป็นต้นไป (ห้ามให้ฟีเจอร์ Sprint ก่อนหน้าพังหรือหายไป) ดังนั้นทุกครั้งที่ Sprint ใหม่ทดสอบเสร็จ ต้อง re-run test case สำคัญของ Sprint ก่อนหน้าทั้งหมดซ้ำเป็นส่วนหนึ่งของ Exit Criteria ของ Sprint นั้น (เริ่มบังคับใช้จริงตั้งแต่ Sprint 2)
3. **Responsive / UX Testing** — ทดสอบอย่างน้อย 3 ขนาดหน้าจอ: Mobile 390px, Tablet, Desktop ตามที่ระบุใน [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]] ครอบคลุม Empty State, Loading State, Form Validation, Confirmation ก่อน Delete, Error Message ที่เข้าใจง่าย, Navigation ที่สม่ำเสมอทั้งระบบ
4. **Non-functional: Legal / Privacy (PDPA)** — ทดสอบว่า Privacy Notice / Terms of Use เข้าถึงได้จากทุกหน้า (Footer) และเนื้อหาครบตามที่ [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]] กำหนด (ไม่มีการส่งข้อมูลผู้ใช้ออกนอกเครื่อง ตรวจผ่าน Network request) รวมถึงตรวจว่าไม่มี logic ที่ generalize target user ผิดพลาด (เช่น field ที่ควรเป็น optional กลับถูกบังคับกรอกแบบ student-only)
5. **Integration / Journey-level Testing** — เดินสอง persona journey (นักศึกษา และ บุคคลทั่วไป) แบบ end-to-end ตาม [[../../01-requirements/user-journey.md|user-journey.md]] เพื่อยืนยันว่าโมดูลต่างๆ (Dashboard → Task → Calendar → File → Notification → Timeline → Life Progress) เชื่อมต่อกันได้จริงข้าม Sprint ไม่ใช่แค่ทดสอบแยกทีละฟีเจอร์

---

## Test Environment

สภาพแวดล้อมและวิธีรันการทดสอบจริงในปัจจุบัน (อ้างอิง `CLAUDE.md` → Commands):

- **Stack:** React + TypeScript + Vite + Tailwind CSS, client-side only (ไม่มี backend, ข้อมูลเก็บใน LocalStorage/IndexedDB ของเบราว์เซอร์ผู้ทดสอบ)
- **วิธีรันแอปเพื่อทดสอบ:** `npm install` แล้ว `npm run dev` (Vite dev server, default port 5173) จากนั้นทดสอบด้วยมือผ่านเบราว์เซอร์ตาม test case ใน `test-cases/`
- **Build gate:** `npm run build` (ทำ `tsc --noEmit` type-check ก่อน แล้ว production build ไปที่ `dist/`) ต้องผ่านโดยไม่มี error ก่อนเริ่มทดสอบ Sprint ใดๆ — ใช้เป็นเงื่อนไขหนึ่งใน Entry Criteria ด้านล่าง
- **Preview การ build จริง:** `npm run preview` (ทดสอบซ้ำบน production build ก่อน deploy จริงตอน Sprint 6)
- **Lint:** `npm run lint` (ESLint) — ใช้ตรวจ code quality ประกอบ ไม่ใช่ตัวตัดสิน pass/fail ของ test case
- **ยังไม่มี automated test runner ที่ตั้งค่าไว้ในโปรเจกต์** ทุก test case ในเอกสารชุดนี้จึงเป็น **manual/black-box testing** ทั้งหมด (ไม่มีการ generate test code) — ส่วนนี้ของเอกสารต้อง**อัปเดตทันที** เมื่อมีการเพิ่ม test runner ในอนาคต ตามที่ `CLAUDE.md` ระบุไว้ว่าต้องบันทึก test command ไว้ที่นั่นเมื่อถูกเพิ่มเข้ามา

---

## Risk Management

| ความเสี่ยง | โอกาสเกิด (Likelihood) | ผลกระทบ (Impact) | แนวทางลดความเสี่ยง (Mitigation) |
|---|---|---|---|
| ข้อมูลใน LocalStorage/IndexedDB สูญหายหรือเสียหาย (เช่น ผู้ใช้ล้าง cache/แคชเบราว์เซอร์ หรือ schema เปลี่ยนระหว่าง Sprint) | กลาง | สูง (ไม่มี backup ที่อื่น ข้อมูลหายถาวรตามที่ Sprint 6 Privacy Notice ระบุ) | ทดสอบ persist-after-refresh ทุก Sprint ที่เกี่ยวกับ storage (Sprint 2 LocalStorage, Sprint 4 IndexedDB), ทดสอบ migration เมื่อ schema เปลี่ยน (เช่น Sprint 7 retrofit `Task.subject` → `Task.lifeAreaId`) |
| ไม่ปฏิบัติตาม PDPA/กฎหมาย IT ที่เกี่ยวข้อง | ต่ำ (ขอบเขตถูกจำกัดไว้แล้วว่าแค่ระดับแจ้ง Privacy Notice) | สูง (ผลทางกฎหมาย/ความน่าเชื่อถือ) | ทดสอบว่า Privacy Notice/Terms of Use เข้าถึงได้จริงทุกหน้าและเนื้อหาครบตาม Sprint 6 Business Rules, ตรวจ Network request ว่าไม่มีข้อมูลผู้ใช้รั่วออกนอกเครื่อง |
| Regression ข้าม Sprint (ฟีเจอร์เก่าพังจากการพัฒนา Sprint ใหม่) | สูง (โปรเจกต์นี้พัฒนาต่อยอด Codebase เดิมทุก Sprint ตั้งแต่ Sprint 2) | สูง (ละเมิดกฎ Non-regression ที่ระบุไว้ชัดเจนในทุก spec) | บังคับ re-run test case ของ Sprint ก่อนหน้าทุกครั้งที่ Sprint ใหม่เข้าสู่ Exit Criteria (ดู Regression Testing ด้านบน) |
| Generalize target user ไม่ครบ (ฟีเจอร์ดันไปอ่านเป็น student-only โดยไม่ตั้งใจ) | กลาง (มีการ retrofit เปลี่ยนจาก "รายวิชา"/นักศึกษาเท่านั้น เป็น Life Area/บุคคลทั่วไป) | กลาง-สูง (ขัดกับ Project purpose หลักที่ระบุใน `CLAUDE.md`) | ทดสอบทั้งสอง persona journey (นักศึกษา และ บุคคลทั่วไป) ใน `user-journey.md` แบบ end-to-end คู่กันเสมอ ไม่ทดสอบแค่ persona เดียว |

---

## Entry Criteria

ก่อนเริ่มทดสอบ Sprint ใดๆ ต้องครบเงื่อนไขต่อไปนี้:

1. Spec ของ Sprint นั้นมี `## Acceptance Criteria` และ `## Gate (เกณฑ์ผ่าน Sprint)` ที่ finalize แล้ว (ไม่มีการแก้ไขค้างอยู่)
2. `npm run build` ผ่านโดยไม่มี error (type-check + production build สำเร็จ)
3. มีไฟล์ `test-cases/{feature-slug}.md` ของ Sprint นั้นอยู่แล้ว (สร้างผ่าน `test-intake` skill)

## Exit Criteria

ถือว่าการทดสอบ Sprint หนึ่งเสร็จสมบูรณ์เมื่อครบเงื่อนไขต่อไปนี้ทั้งหมด:

1. Test case ทุกข้อในไฟล์ `test-cases/{feature-slug}.md` ของ Sprint นั้นถูก execute และบันทึกผลไว้ใน `.docs/03-testing/02-test-result/` แล้ว
2. Scenario ทุกข้อใน `acceptance-criteria.md` ที่เกี่ยวข้องกับ Sprint นั้นผ่าน (pass)
3. Scenario ใน Gate (เกณฑ์ผ่าน Sprint) ของ Sprint นั้นผ่าน
4. ไม่มี bug ระดับ critical ที่ยังเปิดค้างอยู่สำหรับ Sprint นั้น
