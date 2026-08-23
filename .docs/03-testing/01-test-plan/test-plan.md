# Test Plan — My Today Project

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้คือ **แผนกลยุทธ์การทดสอบระดับโปรเจกต์ (Test Strategy)** มีไฟล์เดียวสำหรับทั้งโปรเจกต์ (ตรงข้ามกับ `test-cases/{feature-slug}.md` ที่มีหนึ่งไฟล์ต่อหนึ่ง Sprint สำหรับ test case แบบ step-by-step) เป็น living document ที่ **regenerate ใหม่ทั้งหมด** จาก `backlog.md` และ spec ปัจจุบันทุกครั้งที่มีการรัน `test-intake` แบบ full refresh — ไม่ใช่ประวัติสะสม

**หมายเหตุสำคัญเรื่องแหล่งข้อมูล NFR:** โปรเจกต์นี้ไม่มีเอกสาร Non-Functional Requirements (NFR) แยกต่างหากมาตั้งแต่แรก เนื้อหาด้าน NFR ในเอกสารนี้จึงถูกรวบรวมและ formalize ไว้ที่ส่วน [[#Non-Functional Requirements|Non-Functional Requirements]] ด้านล่าง ซึ่งถือเป็น**แหล่งอ้างอิงหลักที่เป็นทางการที่สุด ณ ปัจจุบัน** สำหรับ Performance, Usability, Compatibility, Reliability, Security/Privacy (PDPA), Maintainability, Scalability, Testability, Accessibility และ Localization — โดยมี [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]] เป็น**เมล็ดพันธุ์ดั้งเดิม (original seed)** ของเนื้อหาด้าน Usability, Compatibility และ Security/Privacy (PDPA) ก่อนจะถูกขยายและ formalize เพิ่มเติมร่วมกับแหล่งอื่น (ดูรายละเอียดแหล่งอ้างอิงในหัวข้อนั้น)

---

## ขอบเขต (Scope)

### In scope — พร้อมทดสอบตอนนี้ (build แล้วตาม `backlog.md`)

- [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1: Today Dashboard]] — สถานะ: เสร็จแล้ว
- [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2: Task Management]] — สถานะ: เสร็จแล้ว
- [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3: Calendar & Schedule]] — สถานะ: เสร็จแล้ว
- [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4: File Organizer]] — สถานะ: เสร็จแล้ว
- [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5: Notification & Deadline Awareness]] — สถานะ: เสร็จแล้ว
- [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]] — สถานะ: เสร็จแล้ว (เนื้อหา Responsive/PDPA ของ spec นี้ถูกนำมาใช้เป็นเกณฑ์ NFR หลักในเอกสารนี้ด้วย — ดูหมายเหตุด้านบน)
- [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7: Life Area & Personal Profile]] — สถานะ: เสร็จแล้ว

### Out of scope — ยังไม่ build ตาม `backlog.md` (ช่องว่างนี้คือ "ยังไม่ถึงคิว build" ไม่ใช่ "ถูกลืม")

- [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8: Universal Inbox + Quick Capture]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9: Timeline + Smart Priority + Life Progress]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10: Task–Event–File Linking]] — ยังไม่เริ่ม
- [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11: Competition Demo + UX Polish, then Freeze]] — ยังไม่เริ่ม

(หมายเหตุ: `20260806-008-my-today-functional-requirements-master.md` เป็นเอกสารอ้างอิงกลาง FR ทั้งหมด ไม่ใช่ Sprint จึงไม่รวมอยู่ใน scope การทดสอบนี้)

---

## Non-Functional Requirements

เอกสารนี้ **ไม่มี** เอกสาร Non-Functional Requirements (NFR) แยกต่างหากในระดับ vault มาก่อน — ตารางด้านล่างคือ**ชุด NFR แบบทางการชุดแรกของโปรเจกต์** ที่ถูกวิเคราะห์และยืนยันร่วมกับผู้ใช้แล้ว (ผ่านการซักถามยืนยันสองรอบนอกเอกสารนี้) จึงบันทึกไว้ที่นี่แบบสรุปผลลัพธ์ที่ตกลงแล้ว ไม่ใช่การวิเคราะห์ใหม่

**แหล่งอ้างอิงที่ใช้ประกอบกัน:**

- [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]] — แหล่งหลัก/เมล็ดพันธุ์ดั้งเดิมของเกณฑ์ Usability (Responsive/UX), Compatibility (breakpoint), และ Security/Privacy (PDPA)
- [[../../02-design/02-technical/technology-choices|technology-choices.md]] — อ้างอิงเรื่อง client-only architecture (ไม่มี Data Controller ตาม PDPA), การแยก LocalStorage/IndexedDB ตามชนิดข้อมูล, สถานะ "ยังไม่มี test runner", และจุดที่ควรทบทวนเรื่อง automated testing ในช่วง Sprint 11
- [[../../02-design/02-technical/architecture|architecture.md]] — อ้างอิงเรื่อง Data Flow per User Journey ที่ยืนยันว่าไม่มี network round-trip (เป็นเหตุผลรองรับเกณฑ์ Performance ที่ตั้งไว้เข้มได้)
- `CLAUDE.md` (root ของ repo, section "Architecture" และ "Commands") — อ้างอิงเรื่อง LocalStorage quota (~5-10MB), convention การบัมพ์ storage key เมื่อ schema เปลี่ยนแบบ breaking (เช่น `my-today:tasks` → `my-today:tasks:v2` ใน Sprint 7), และสถานะ build/lint tooling ปัจจุบัน

4 หมวดต่อไปนี้ไม่มีเอกสารใดในโปรเจกต์พูดถึงมาก่อน (เป็นช่องว่างเดิม) และถูกกำหนดขึ้นใหม่ผ่านการตัดสินใจของผู้ใช้โดยตรง: **Performance, Compatibility, Scalability, Accessibility**

| หมวด | เกณฑ์/ตัวเลข | เหตุผล/แหล่งอ้างอิง |
|---|---|---|
| **1. Performance** | หน้าหลัก (Dashboard/Tasks/Calendar/Files) ต้องโหลด ≤2 วินาที; ทุก interaction (add/edit/delete/filter/sort) ต้องตอบสนอง ≤300ms บนเครื่องทั่วไป | ระบบเป็น client-only ไม่มี network round-trip (ดู [[../../02-design/02-technical/architecture|architecture.md]] ส่วน Data Flow) จึงตั้งเกณฑ์เข้มได้ — เกณฑ์นี้ไม่มีเอกสารเดิมระบุไว้มาก่อน กำหนดขึ้นใหม่โดยผู้ใช้ ควรใช้เป็น regression gate เมื่อข้อมูลโตขึ้นในช่วง Sprint 8-11 |
| **2. Usability** | คงเกณฑ์เดิมจาก Sprint 6: Mobile-first, มี Empty State, Loading State, Form Validation, Confirmation ก่อน Delete, Error Message ที่ผู้ใช้เข้าใจ, Navigation สม่ำเสมอทั้งระบบ — ยกระดับเป็น NFR บังคับตรวจซ้ำทุก Sprint ใหม่ (Sprint 7-11) ไม่ใช่ผูกกับ Sprint 6 เพียง Sprint เดียว | ที่มา: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]] Business Rules — เดิมผูกกับ Sprint 6 เพียง Sprint เดียว ยกเป็น NFR ระดับโปรเจกต์เพื่อให้บังคับใช้ต่อเนื่อง |
| **3. Compatibility (Browser/Device)** | รองรับ Chrome/Edge/Firefox/Safari evergreen 2 เวอร์ชันล่าสุด (ไม่รองรับ browser เก่า/legacy อย่างเป็นทางการ); ทดสอบ responsive อย่างน้อย 3 breakpoint: Mobile 390px / Tablet / Desktop | Breakpoint มาจาก [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]]; ขอบเขต browser evergreen ไม่มีเอกสารเดิมระบุไว้ กำหนดขึ้นใหม่โดยผู้ใช้ |
| **4. Reliability / Data Persistence** | ข้อมูลต้อง persist ข้าม refresh/session 100% ของกรณีใช้งานปกติ; ต้องมี error state ที่ผู้ใช้เห็นได้ชัดเจนเมื่อ storage ล้มเหลว (private-browsing block, quota exceeded) | อ้างอิงกลไก error handling ของ `useFiles` (ตาม `CLAUDE.md` section "Architecture") เป็นตัวอย่างมาตรฐานที่ hook อื่นควรทำตามหากจำเป็นในอนาคต |
| **5. Security & Privacy (PDPA)** | ต้องไม่มี network request ออกนอกเครื่องผู้ใช้เลย (ตรวจผ่าน network inspection); Privacy Notice/Terms of Use เข้าถึงได้จาก Footer ทุกหน้าและเนื้อหาครบตามที่กำหนด; ไม่ต้องทำ consent management หรือมี DPO เพราะระบบไม่ได้เป็น Data Controller ตาม PDPA (ไม่มี backend เก็บข้อมูลส่วนกลาง) | ที่มา: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]] section "ข้อกำหนดด้านกฎหมาย IT และ PDPA" และยืนยันเพิ่มเติมใน [[../../02-design/02-technical/technology-choices|technology-choices.md]] section "Client-only ไม่มี backend โดยตั้งใจ" |
| **6. Maintainability** | `npm run build` (รวม `tsc --noEmit` type-check) ต้องผ่านโดยไม่มี error 100% ก่อนเริ่มทดสอบทุก Sprint (ผูกกับ Entry Criteria ด้านล่างอยู่แล้ว แต่ยกเป็น NFR ด้วย); การเปลี่ยนแปลง storage key แบบ breaking change ต้องบันทึกเหตุผลไว้เสมอ | บทเรียนจาก Sprint 7 ที่บัมพ์ `my-today:tasks` เป็น `my-today:tasks:v2` (ที่มา: `CLAUDE.md` section "Architecture") |
| **7. Scalability** | ระบบต้องทำงานลื่นไหล (ไม่มี lag ที่สังเกตได้) จนถึงประมาณ 500 รายการ Task/Event/Note/Link รวมกัน และไฟล์ที่แนบรวมกันไม่เกินประมาณ 5-8MB ก่อนใกล้ quota ของ LocalStorage/IndexedDB | เป็นตัวเลขอ้างอิง/ประมาณการ ไม่ใช่ผลจาก user research จริง — อ้างอิงจาก quota ~5-10MB ของ LocalStorage ตามที่ `CLAUDE.md` ระบุไว้ (ดูเพิ่มใน [[../../02-design/02-technical/technology-choices|technology-choices.md]] section "Client-side Storage") |
| **8. Testability** | คงการทดสอบแบบ manual/black-box 100% ต่อไปจนถึงอย่างน้อย Sprint 11 — ยังไม่บังคับ automated test coverage เป็น NFR ในตอนนี้ เพราะยังไม่มี Sprint Gate ใดต้องการ | อ้างอิงสถานะ "ยังไม่มี test runner" ใน [[../../02-design/02-technical/technology-choices|technology-choices.md]] section "Testing" — จุดที่ควรทบทวนอีกครั้งคือช่วง Sprint 11 Black Box Testing ตามที่ระบุไว้ในเอกสารเดียวกัน |
| **9. Accessibility** | กำหนดระดับพื้นฐาน (basic) เท่านั้น: ทุกฟังก์ชันหลักต้องใช้งานได้ด้วย keyboard navigation, contrast ของสีต้องอ่านง่ายไม่ต่ำกว่ามาตรฐาน default ของ browser, ทุก form field ต้องมี label ที่ถูกต้องเชื่อมกับ input — ไม่ทำ WCAG 2.1 AA audit อย่างเป็นทางการ | ไม่มี requirement เดิมรองรับ WCAG audit และไม่คุ้มเวลากับ timeline ของ Sprint 8-11 ที่เหลือ — เป็นช่องว่างเดิมที่ไม่มีเอกสารใดพูดถึงมาก่อน กำหนดขึ้นใหม่โดยผู้ใช้ |
| **10. Localization** | Thai เป็นภาษาหลักของทั้ง UI และเอกสารทั้งหมด ไม่ทำ i18n/multi-language support | ไม่มี Functional Requirement ใดขอความสามารถนี้ (ยืนยันจากการสำรวจ spec ทั้งหมด) |

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
