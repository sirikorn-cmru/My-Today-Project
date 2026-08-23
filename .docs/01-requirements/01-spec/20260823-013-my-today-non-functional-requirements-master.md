# My Today — Non-Functional Requirements Master List

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-008-my-today-functional-requirements-master]] (เอกสารพี่น้อง ฝั่ง Functional Requirement), [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-004-my-today-sprint4-file-organizer]], [[20260806-005-my-today-sprint5-notification-deadline-awareness]], [[20260806-006-my-today-sprint6-integration-ux-final-testing]], [[20260806-007-my-today-sprint7-category-profile]], [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]], [[20260806-010-my-today-sprint9-timeline-priority-progress]], [[20260806-012-my-today-sprint11-competition-demo-freeze]], `../../02-design/02-technical/tech-stack.md`, `../../02-design/02-technical/architecture.md`

## คำอธิบาย

เอกสารนี้เป็น master reference รวม Non-Functional Requirement (NFR) กลางของ My Today ทั้งระบบ ไม่ใช่ spec ของ Sprint ใดโดยเฉพาะ — เป็นเอกสารคู่กันกับ [[20260806-008-my-today-functional-requirements-master|Functional Requirements Master List]] (doc 008) แต่ฝั่ง non-functional

**ที่มาของเอกสารนี้ (สำคัญ):** NFR ส่วนใหญ่ในเอกสารนี้ **ไม่ใช่ข้อกำหนดใหม่** — เป็นการ **สังเคราะห์ (synthesize) ย้อนหลัง** จากข้อความที่เกี่ยวกับ non-functional ที่กระจัดกระจายอยู่แล้วใน Sprint spec ต่างๆ (หลักๆ คือ Sprint 1, 4, 5, 6, 7, 8, 9, 11), `tech-stack.md`, และ `architecture.md` ให้มารวมเป็นเอกสารอ้างอิงเดียวที่เป็นทางการ พร้อม cross-link กลับไปยังแหล่งที่มาจริงของแต่ละข้อ (เหมือนที่ doc 008 cross-link ไปยัง Sprint spec ต่อ FR) — **ยกเว้น 3 หัวข้อที่ระบุไว้ชัดเจนว่าเป็นข้อกำหนดใหม่** (ดูหัวข้อ "ข้อกำหนดใหม่ 3 ข้อ" ด้านล่าง) ซึ่งไม่เคยมีเอกสารใดระบุไว้มาก่อนและเพิ่งถูกยืนยันปิดในเอกสารนี้เป็นครั้งแรก

## Non-Functional Requirements

### NFR-01 Performance

ไม่มีเป้าหมายตัวเลขเข้มงวด (response time/throughput) — ระบุเชิงคุณภาพว่าต้องใช้งานลื่นไหลบนอุปกรณ์ทั่วไป เนื่องจากเป็น client-only, single-user app ไม่มี concurrency สูง

- อ้างอิงจาก: `tech-stack.md` §1 Non-functional Requirements ("ประสิทธิภาพ/load ไม่ใช่ประเด็นสำคัญ เพราะผู้ใช้เป็นบุคคลทั่วไป/นักศึกษาที่ใช้งานคนเดียว ไม่ใช่ระบบที่ต้องรองรับ concurrency สูง")
- สถานะ: สอดคล้องกับสิ่งที่ implement แล้วตั้งแต่ Sprint 1-8 (ยังไม่พบปัญหาประสิทธิภาพที่ต้องแก้)

### NFR-02 Reliability / Data Integrity

การเขียนข้อมูล (Create/Update/Delete ทุก entity) ต้องไม่ทำให้เกิด state ไม่สอดคล้องกัน (partial write) แม้เกิด error ระหว่างทาง — ต้อง fail-safe (ไม่เปลี่ยนสถานะเดิมถ้าขั้นตอนล้มเหลว) และห้ามเกิด orphaned reference (เช่น การลบ Life Area ต้องเคลียร์ reference ของ Task/Event/File/Note/Link ที่ผูกอยู่ให้ครบก่อนลบจริงเสมอ)

- อ้างอิงจาก: `detailed-design.md` §3 Error/Edge-case Notes, `architecture.md` §2 ("เป็นเจ้าของ state หนึ่งเดียวของระบบ" — Application/Domain Logic Layer), Sprint 7 Acceptance Criteria ([[20260806-007-my-today-sprint7-category-profile]]: "แก้ไขและลบ Life Area ได้ (Task ที่เคยผูกกับ Life Area ที่ถูกลบยังคงอยู่ ไม่หาย แค่ไม่มี Life Area แล้ว)")
- สถานะ: สอดคล้องกับสิ่งที่ implement แล้ว — `App.tsx`'s `handleDeleteLifeArea` เคลียร์ `lifeAreaId` ของทุก entity ที่อ้างอิงก่อนลบ Life Area จริงเสมอ

### NFR-03 Usability / UX

- ทุกหน้าต้องมี: Empty State, Loading State (เมื่อจำเป็น), Form Validation, Confirmation ก่อน Delete, Error Message ที่ผู้ใช้เข้าใจ
- ต้อง Mobile-first, Navigation สม่ำเสมอทั้งระบบ, จัดลำดับข้อมูลเร่งด่วนให้เห็นก่อน
- ผู้ใช้ใหม่ต้องใช้งาน Final User Journey ได้โดยไม่ต้องมีคนสอน
- ห้ามใช้ภาษา/UI ที่มีลักษณะตัดสินหรือเปรียบเทียบผู้ใช้ (เช่น ห้ามใช้คำว่า "Score")

- อ้างอิงจาก: [[20260806-006-my-today-sprint6-integration-ux-final-testing]] ("ปรับ UX/UI: ใช้งานง่าย, Mobile-first, Navigation สม่ำเสมอทั้งระบบ, Font อ่านง่าย, Button มีความหมายชัดเจน, Form มี Validation, มี Empty State, มี Loading State หากจำเป็น, มี Confirmation ก่อน Delete, มี Error Message ที่ผู้ใช้เข้าใจ"), [[20260806-001-my-today-sprint1-today-dashboard]] (จัดลำดับข้อมูลเร่งด่วนของ Today Dashboard), [[20260806-010-my-today-sprint9-timeline-priority-progress]] ("ให้ผู้ใช้เห็นความคืบหน้าของวันแบบไม่ตัดสิน (ไม่ใช่ \"Productivity Score\")", "ข้อความ UI ไม่มีคำว่า \"Score\" หรือลักษณะตัดสิน/เปรียบเทียบผู้ใช้"), [[20260806-012-my-today-sprint11-competition-demo-freeze]] (Black Box Testing/UX polish ครบ Sprint 7-10)
- สถานะ: สอดคล้องกับสิ่งที่ implement แล้วใน Sprint 1-8; ส่วนที่เกี่ยวกับ Sprint 9-11 (Life Progress ไม่ตัดสิน) ยังไม่เริ่มพัฒนา (ตาม backlog.md)

### NFR-04 Accessibility (ใหม่)

**ตัดสินใจแล้ว: ระดับ Baseline เบาๆ** ไม่ใช่ WCAG 2.1 AA เต็มรูปแบบ เพราะทีมเล็ก/free-tier ตาม `tech-stack.md` §1 Team Factors

**ขอบเขต Baseline ที่ต้องมี:**

- ใช้ semantic HTML element ที่ถูกต้องตามความหมาย (`nav`/`main`/`button`/`form` ฯลฯ)
- ทุก interactive element ต้อง keyboard-focusable และมี focus indicator ที่มองเห็นได้
- สีข้อความ/พื้นหลังต้องมี contrast ratio เพียงพอให้อ่านง่าย (ไม่ต้องผ่าน WCAG contrast ratio ตัวเลขที่เป็นทางการ แต่ต้องผ่านการตรวจสอบด้วยสายตาว่าอ่านง่าย)

**ไม่รวมในขอบเขตนี้:** screen-reader ARIA ครบชุด, WCAG audit tool, การรับรองมาตรฐานเป็นทางการ

- อ้างอิงจาก: ไม่มีเอกสารใดระบุมาก่อน — เป็นข้อกำหนดใหม่ที่ยืนยันปิดในเอกสารนี้เป็นครั้งแรก (อิงเหตุผลด้าน Team Factors จาก `tech-stack.md` §1)
- สถานะ: **ยังไม่เริ่มพัฒนา** — ยังไม่มี Sprint ใดกำหนดงานนี้ไว้โดยตรง ดูหมายเหตุ "คำแนะนำการนำไปปฏิบัติ" ท้ายเอกสาร

### NFR-05 Security / Privacy / Compliance

- PDPA ระดับ Privacy Notice เท่านั้น ไม่มี network request ออกนอกเครื่องเลย (ยืนยันด้วย Black Box Testing ตรวจสอบผ่าน Network request)
- ไม่เข้ารหัสข้อมูลที่เก็บ (by design — เพราะสถาปัตยกรรม client-only ทำให้ข้อมูลไม่มีทางออกจากเครื่องอยู่แล้ว) แต่ต้องแจ้งเตือนผู้ใช้ผ่าน Privacy Notice ไม่ให้เก็บข้อมูลอ่อนไหวสูง (เลขบัตรประชาชน/ข้อมูลการเงิน) เพราะ LocalStorage ไม่ได้เข้ารหัส

- อ้างอิงจาก: [[20260806-006-my-today-sprint6-integration-ux-final-testing]] §"เพิ่มเติม (20260806): ข้อกำหนดด้านกฎหมาย IT และ PDPA" (ละเอียดที่สุด — รวมข้อความ "คำแนะนำ: ไม่ควรบันทึกข้อมูลอ่อนไหวมาก ... เพราะข้อมูลใน Local storage ไม่ได้เข้ารหัส" และ "ตรวจสอบว่าไม่มีการเก็บ/ส่งข้อมูลผู้ใช้ออกนอกเครื่องจริง ... เป็นส่วนหนึ่งของ Black Box Testing ของ Sprint 6"), `tech-stack.md` §1 Security & Compliance, `architecture.md` §5 "Privacy-by-architecture"
- สถานะ: สอดคล้องกับสิ่งที่ implement แล้ว (Privacy Notice + Terms of Use หน้า `/privacy`, ยืนยันไม่มี network request ออกนอกเครื่องใน Sprint 6 Gate)

### NFR-06 Compatibility / Portability

- Responsive อย่างน้อย 3 breakpoint: Mobile 390px, Tablet, Desktop — ต้องไม่มี overflow ที่ breakpoint ใดๆ
- ฟีเจอร์ที่พึ่ง Browser API เฉพาะทาง (Browser Notification, File preview) ต้องเป็น progressive enhancement — ระบบต้องใช้งานได้ตามปกติแม้ browser ไม่รองรับ หรือผู้ใช้ปฏิเสธสิทธิ์

**ใหม่ (ตัดสินใจแล้ว): Browser Compatibility Matrix** — รองรับ Chrome/Edge/Firefox 2 เวอร์ชันล่าสุด, Safari เวอร์ชันล่าสุด, และ Mobile Chrome/Mobile Safari เวอร์ชันล่าสุด เพื่อใช้เป็นเป้าหมายการทำ Black Box Testing ใน Sprint 6/11 — แทนที่ข้อความ implicit เดิมที่ไม่เคยระบุเวอร์ชันชัดเจน

- อ้างอิงจาก (ส่วน consolidate): [[20260806-006-my-today-sprint6-integration-ux-final-testing]] ("ตรวจ Responsive อย่างน้อย 3 ขนาด: Mobile 390px, Tablet, Desktop"), [[20260806-005-my-today-sprint5-notification-deadline-awareness]] ("ใช้ Browser Notification API ได้เฉพาะกรณีผู้ใช้อนุญาต (permission) แต่ระบบต้องยังใช้งานได้ตามปกติแม้ผู้ใช้ไม่อนุญาต/ปิด Browser Notification", "Browser Notification เป็น progressive enhancement เท่านั้น"), [[20260806-012-my-today-sprint11-competition-demo-freeze]] (Black Box Testing ครบ Sprint 7-10), backlog.md หมายเหตุตรวจสอบ Sprint 6 ("responsive ที่ Mobile/Tablet/Desktop ไม่ overflow")
- อ้างอิงจาก (ส่วนใหม่ — Browser Compatibility Matrix): ไม่มีเอกสารใดระบุเวอร์ชัน browser ชัดเจนมาก่อน — เป็นข้อกำหนดใหม่ที่ยืนยันปิดในเอกสารนี้
- สถานะ: ส่วน responsive/progressive-enhancement สอดคล้องกับสิ่ง implement แล้ว; ส่วน Browser Compatibility Matrix **ยังไม่เริ่มพัฒนา/ยังไม่เคยถูกทดสอบตามเมทริกซ์นี้อย่างเป็นทางการ**

### NFR-07 Offline Capability

ต้องใช้งานได้เต็มรูปแบบโดยไม่ต้องมีเครือข่ายเลย เพราะข้อมูลทั้งหมดอยู่บนเครื่องผู้ใช้

- อ้างอิงจาก: `tech-stack.md` §1 Non-functional Requirements ("ต้องใช้งานได้แบบ offline — ข้อมูลอยู่บนเครื่องผู้ใช้ทั้งหมด ใช้งานได้แม้ไม่มีเครือข่ายเลย"), `architecture.md` §5 "No backend / local-first by design"
- สถานะ: สอดคล้องกับสิ่งที่ implement แล้วตั้งแต่ Sprint 1 (LocalStorage/IndexedDB, ไม่มี backend)

### NFR-08 Scalability / Capacity

ไม่ต้องออกแบบรองรับ relational query ซับซ้อนหรือ high concurrency (ตรงกับ record/blob storage แบบง่ายที่เลือกไว้ใน `tech-stack.md`)

**ใหม่ (ตัดสินใจแล้ว): แจ้งเตือนผู้ใช้เมื่อพื้นที่จัดเก็บไฟล์แนบใกล้เต็ม** — ระบบควรตรวจสอบพื้นที่ IndexedDB โดยประมาณและแจ้งเตือนผู้ใช้เมื่อใกล้ถึง quota ของ browser (ยังไม่ต้องกำหนดตัวเลข % ที่แน่นอนในเอกสารนี้ — เป็นรายละเอียดการออกแบบที่ Sprint ซึ่งนำไปพัฒนาจริงจะกำหนดภายหลัง) เพื่อป้องกันผู้ใช้เจอ error แบบไม่มีการเตือนล่วงหน้า — นี่คือการยกระดับความเสี่ยงที่เคยถูกบันทึกไว้เฉยๆ ใน `tech-stack.md` §5 Risks/Open Questions ให้กลายเป็นข้อกำหนดที่เป็นทางการ

- อ้างอิงจาก (ส่วน consolidate): `tech-stack.md` §1 Hosting & Data ("เป็น record/blob storage แบบง่าย ไม่ใช่ relational ที่ต้องมี complex joins หรือ ACID multi-table transaction")
- อ้างอิงจาก (ส่วนใหม่ — quota-warning): `tech-stack.md` §5 Risks/Open Questions ("ขนาดข้อมูลไฟล์แนบเติบโตเกิน IndexedDB quota ของ browser ... อาจต้องพิจารณาแจ้งเตือนผู้ใช้เรื่อง quota ... ยังไม่มีข้อกำหนดที่เป็นรูปธรรมในตอนนี้"), `database-schema.md`/`architecture.md` implementation footnotes (LocalStorage ~5-10MB quota, IndexedDB quota ไม่ระบุตัวเลขตายตัวเพราะขึ้นกับ browser/อุปกรณ์)
- สถานะ: ส่วน consolidate สอดคล้องกับ architecture ปัจจุบัน; ส่วน quota-warning **ยังไม่เริ่มพัฒนา** (เดิมเป็นแค่ความเสี่ยงที่บันทึกไว้เฉยๆ ยังไม่เคยเป็นข้อกำหนด)

### NFR-09 Maintainability

Domain Logic Layer เดียวเป็นเจ้าของ state ทั้งระบบ, entity ใหม่ต้องเข้ารูปแบบความสัมพันธ์เดิม (Life-Area-centric optional many-to-one) แทนการสร้างรูปแบบใหม่, ไม่มี mock/debug code ค้างก่อนปิด Sprint (cleanup gate)

- อ้างอิงจาก: `architecture.md` §2/§5, [[20260806-006-my-today-sprint6-integration-ux-final-testing]] และ [[20260806-012-my-today-sprint11-competition-demo-freeze]] (cleanup requirement ก่อนปิด Sprint/ก่อน Freeze)
- สถานะ: สอดคล้องกับสิ่งที่ implement แล้ว (ดู `CLAUDE.md` "Only App.tsx calls these hooks", pattern `lifeAreaId: string` ใช้ซ้ำทุก entity ตั้งแต่ Sprint 7)

## ข้อกำหนดใหม่ 3 ข้อ (ยังไม่เคยมีเอกสารใดระบุมาก่อน)

เอกสารนี้เป็นจุดแรกที่ปิดข้อกำหนดต่อไปนี้อย่างเป็นทางการ — แตกต่างจาก 6 หมวดที่เหลือซึ่งเป็นการรวบรวมสิ่งที่ระบุไว้แล้วในเอกสารอื่น (และส่วนใหญ่ implement แล้วจริง):

1. **NFR-04 Accessibility Baseline** — semantic HTML, keyboard focus, contrast ที่อ่านง่าย (ไม่ใช่ WCAG AA เต็มรูปแบบ)
2. **NFR-06 Browser Compatibility Matrix** — Chrome/Edge/Firefox 2 เวอร์ชันล่าสุด, Safari ล่าสุด, Mobile Chrome/Mobile Safari ล่าสุด
3. **NFR-08 IndexedDB Quota-Warning** — แจ้งเตือนผู้ใช้เมื่อพื้นที่ไฟล์แนบใกล้เต็ม (ไม่กำหนดตัวเลข % ในเอกสารนี้)

**อย่าเข้าใจผิดว่า 3 ข้อนี้ "implement แล้วเพราะ Sprint อื่นพูดถึง"** — ไม่มี Sprint ใดใน Sprint 1-11 ปัจจุบัน (ตาม backlog.md) กำหนดงานพัฒนาสำหรับ 3 ข้อนี้ไว้โดยตรง ทั้งสามยังเป็นเพียงข้อกำหนด (requirement) ที่รอถูกนำไปวางแผนพัฒนา ไม่ใช่สิ่งที่ verify ว่ามีอยู่ในโค้ดแล้ว

## คำแนะนำการนำไปปฏิบัติ (ไม่ใช่การแก้ไข Sprint spec ในเอกสารนี้)

3 ข้อใหม่ข้างต้นไม่ได้ผูกกับ Sprint ที่วางแผนไว้แล้ว Sprint ใดโดยเฉพาะ ข้อเสนอแนะคือให้นำไปรวมไว้ใน scope งาน UX/Testing polish ของ [[20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]] หรือ [[20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]] (หรือ Sprint ใหม่ในอนาคตถ้าจำเป็น) ในช่วงที่ลงมือพัฒนาจริง — **เอกสารนี้จะไม่แก้ไข Sprint 6/11 spec เอง** การผูกเข้ากับ Sprint ใดเป็นการตัดสินใจแยกต่างหากที่ต้องผ่าน `requirement-intake` อีกครั้งภายหลัง ตาม `CLAUDE.md` § Working conventions

## สถานะการทดสอบ (Testing)

`.docs/03-testing/` ยังเป็นเพียงไฟล์ `index.md` แบบ template เท่านั้น (ยังไม่ active ตาม `CLAUDE.md`) — จึงยังไม่มี test case/test report ใดที่ verify NFR ในเอกสารนี้ เอกสารนี้มีหน้าที่ **นิยาม (define)** NFR เท่านั้น การตรวจสอบ (verify) ว่าระบบผ่าน NFR แต่ละข้อจริงหรือไม่เป็นงานของช่วง testing phase ในอนาคต

## ขอบเขต (Scope)

**In scope ของเอกสารนี้:**

- รวบรวม NFR ที่มีอยู่แล้วกระจัดกระจายใน Sprint spec/`tech-stack.md`/`architecture.md` ให้เป็นเอกสารอ้างอิงเดียว พร้อม cross-link แหล่งที่มา
- ปิดข้อกำหนดใหม่ 3 ข้อที่ไม่เคยมีเอกสารใดระบุมาก่อน (Accessibility Baseline, Browser Compatibility Matrix, IndexedDB Quota-Warning)

**Out of scope ของเอกสารนี้:**

- ไม่กำหนดตัวเลข % ที่แน่นอนของ IndexedDB quota-warning (รอ Sprint ที่นำไปพัฒนาจริงกำหนด)
- ไม่ทำ WCAG 2.1 AA เต็มรูปแบบ, ไม่ทำ screen-reader ARIA ครบชุด, ไม่ผ่าน WCAG audit tool อย่างเป็นทางการ
- ไม่แก้ไข Sprint 6/11 spec เพื่อผูก 3 ข้อใหม่เข้ากับ Sprint ใดโดยตรง (เป็นคำแนะนำเท่านั้น ดูหัวข้อด้านบน)
- ไม่สร้าง test case/test plan สำหรับ NFR เหล่านี้ (เป็นงานของ testing phase ในอนาคต)
