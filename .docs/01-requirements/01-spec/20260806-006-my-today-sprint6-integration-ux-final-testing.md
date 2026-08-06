# My Today — Sprint 6: Integration, UX & Final Testing (Final Sprint ของ My Today Version 1 / Core)

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-004-my-today-sprint4-file-organizer]], [[20260806-005-my-today-sprint5-notification-deadline-awareness]], [[20260806-007-my-today-sprint7-category-profile]]

## เป้าหมาย

ไม่เพิ่ม Feature ใหม่แล้ว Sprint นี้มีหน้าที่เดียวคือทำของที่มีอยู่ (จาก Sprint 1-5: Today Dashboard, Task Management, Calendar, File Organizer, Notification) ให้ดีขึ้น พร้อม deploy จริง

## Feature Requirements / งานที่ต้องทำ (ไม่ใช่ feature ใหม่ แต่เป็นการปรับปรุง/ตรวจสอบ)

- ตรวจสอบ Integration ระหว่างโมดูล: Task → Dashboard, Task → Calendar, Task → File, Task → Notification
- ปรับ UX/UI: ใช้งานง่าย, Mobile-first, Navigation สม่ำเสมอทั้งระบบ, Font อ่านง่าย, Button มีความหมายชัดเจน, Form มี Validation, มี Empty State, มี Loading State หากจำเป็น, มี Confirmation ก่อน Delete, มี Error Message ที่ผู้ใช้เข้าใจ
- ตรวจ Responsive อย่างน้อย 3 ขนาด: Mobile 390px, Tablet, Desktop
- ทำ Black Box Testing สำหรับ Functional Requirements ทุกข้อจาก Sprint 1-5: Add, Edit, Delete, Search, Filter, Refresh, Data Persistence, Navigation
- ลบสิ่งที่ไม่จำเป็นออกจากระบบ: Mock Data ที่ไม่จำเป็น, Debug Code, Console Error, Feature ที่ไม่ได้อยู่ใน Scope ของ Version 1
- เตรียมระบบให้ Deploy ได้จริงบน Vercel

## Business Rules

1. ห้ามเพิ่ม Feature ใหม่ใดๆ ใน Sprint นี้ (ห้าม AI, Chatbot, Backend, Social Features, หรือฟังก์ชันใดๆ ที่ไม่อยู่ใน Version 1)
2. พัฒนาต่อจาก Codebase เดิมของ Sprint 1-5 ทั้งหมด (Non-regression: ห้ามทำให้ฟีเจอร์ที่มีอยู่จาก Sprint ก่อนหน้าพังหรือหายไป)
3. **Final User Journey ที่ใช้สอบระบบ (ต้องทำได้ครบ end-to-end):** นักศึกษาได้รับงาน STEM ที่ต้องส่งวันศุกร์ 23:59 น. → บันทึกเป็น Task → แนบไฟล์งาน → เห็น Deadline ใน Calendar → เปิด My Today ตอนเช้าเห็นงานบน Dashboard → ระบบเตือนเมื่อใกล้หมดเวลา → นักศึกษาทำงานเสร็จและกด Done → Dashboard อัปเดตสถานะโดยอัตโนมัติ
4. ยืนยันชัดเจนว่า Version 1 นี้ไม่ต้องมี AI, ไม่ต้องเชื่อม Teams/Classroom/ระบบมหาวิทยาลัยใดๆ ทั้งสิ้น

## ขอบเขต (Scope)

### In scope (Sprint 6 — ทำเฉพาะการปรับปรุง/ตรวจสอบ ไม่ใช่ feature ใหม่)

- ตรวจ/แก้ Integration ระหว่าง 4 โมดูลหลัก (Dashboard, Task, Calendar, File, Notification)
- ปรับปรุง UX/UI ตามรายการที่ระบุ (Empty State, Loading State, Validation, Confirmation, Error Message ฯลฯ)
- Responsive testing (Mobile 390px / Tablet / Desktop)
- Black Box Testing ครบทุก Functional Requirement จาก Sprint 1-5
- Cleanup: ลบ Mock Data ที่ไม่จำเป็น, Debug Code, Console Error, Feature นอก Scope
- เตรียม Deploy บน Vercel

### Out of scope (ห้ามทำใน Sprint นี้โดยเด็ดขาด)

- เพิ่ม AI
- เพิ่ม Chatbot
- เพิ่ม Backend
- เพิ่ม Social Features
- เพิ่มฟังก์ชันใดๆ ที่ไม่อยู่ใน Version 1 (รวมถึงการเชื่อม Teams, Classroom, หรือระบบมหาวิทยาลัย)

## Acceptance Criteria (Final Acceptance Criteria ของ Version 1)

ผู้ใช้ใหม่ต้องสามารถเปิด My Today แล้วดำเนิน Scenario ต่อไปนี้ได้โดยไม่ต้องมีคนสอน:

1. เพิ่มงาน
2. กำหนด Deadline
3. เห็นงานบน Dashboard
4. เห็น Deadline บน Calendar
5. แนบไฟล์กับงาน
6. ได้รับการแจ้งเตือน
7. เปลี่ยนงานเป็น Done
8. Dashboard อัปเดตสถานะโดยอัตโนมัติ

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 6 / Final Gate:** ทดสอบ Final User Journey ทั้งหมดแบบ end-to-end ตาม Scenario งาน STEM ที่ระบุใน Business Rules ข้อ 3 — ถ้าทำ Scenario นี้ได้ครบ ถือว่า My Today Version 1 สำเร็จ

## เพิ่มเติม (20260806): ข้อกำหนดด้านกฎหมาย IT และ PDPA

**บริบท:** เนื่องจากระบบไม่มี Backend และเก็บข้อมูลทั้งหมด (Task, Schedule, ไฟล์แนบ) ไว้ในเครื่องผู้ใช้เท่านั้น (LocalStorage + IndexedDB) โดยไม่มีการส่งข้อมูลออกไปยังเซิร์ฟเวอร์ใดๆ — ทีมพัฒนา/เจ้าของแอปจึงไม่ได้เป็นผู้เก็บ/ประมวลผลข้อมูลส่วนบุคคลของผู้ใช้ ผู้ใช้เป็นผู้ควบคุมข้อมูลของตนเองทั้งหมด ดังนั้นระดับการปฏิบัติตาม PDPA ที่ต้องการ (ยืนยันโดย user แล้ว) คือ **แค่แจ้ง Privacy Notice ให้ผู้ใช้ทราบ** ไม่ต้องสร้างฟีเจอร์สิทธิ์เจ้าของข้อมูลเพิ่มเติม (เพราะสิทธิ์ลบ/แก้ไขข้อมูลผู้ใช้มีอยู่แล้วในตัวผ่านฟีเจอร์ CRUD ปกติของ Sprint 2/3/4)

**ขอบเขตกฎหมายที่ครอบคลุม:** PDPA (พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล) + พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ + ลิขสิทธิ์/ทรัพย์สินทางปัญญา (กรณีผู้ใช้แนบไฟล์ผ่าน File Organizer ของ Sprint 4)

### Feature Requirements / User Stories (เพิ่มเติม)

- ในฐานะผู้ใช้ ฉันต้องการเห็นหน้า/ส่วน "Privacy Notice และข้อกำหนดการใช้งาน" ที่เข้าถึงได้จากทุกหน้า (เช่น ลิงก์ที่ Footer) เพื่อทราบว่าข้อมูลของฉันถูกจัดเก็บและใช้งานอย่างไร

### Business Rules (เพิ่มเติม)

1. **PDPA / Privacy Notice** ต้องระบุเนื้อหาอย่างน้อยดังนี้:
   - ข้อมูลทั้งหมด (Task, Schedule, ไฟล์แนบ) ถูกเก็บไว้ในเครื่อง/เบราว์เซอร์ของผู้ใช้เท่านั้น (LocalStorage + IndexedDB) ไม่มีการส่งข้อมูลออกไปนอกเครื่อง ไม่มีเซิร์ฟเวอร์เก็บข้อมูล ไม่มีการเก็บข้อมูลวิเคราะห์ (analytics) ที่ระบุตัวตนผู้ใช้
   - ผู้ใช้เป็นผู้ควบคุมข้อมูลของตนเองทั้งหมด การล้างข้อมูลเบราว์เซอร์/แคชจะทำให้ข้อมูลหายถาวร (ไม่มีการสำรองไว้ที่อื่น)
   - คำแนะนำ: ไม่ควรบันทึกข้อมูลอ่อนไหวมาก (เช่น เลขบัตรประชาชน, ข้อมูลการเงิน) เพราะข้อมูลใน Local storage ไม่ได้เข้ารหัส
2. **พ.ร.บ.คอมพิวเตอร์ / ข้อกำหนดการใช้งาน (Terms of Use)** ต้องระบุ:
   - ผู้ใช้ต้องรับผิดชอบต่อเนื้อหาที่ตนเองบันทึก/แนบเข้าระบบ (Task, ไฟล์แนบ) ห้ามใช้ระบบเก็บ/เผยแพร่เนื้อหาที่ผิดกฎหมาย
   - เนื่องจากระบบไม่มีเซิร์ฟเวอร์เก็บหรือส่งต่อข้อมูลของผู้ใช้ (ข้อมูลอยู่ในเครื่องผู้ใช้เท่านั้น) จึงไม่เข้าข่ายผู้ให้บริการที่ต้องเก็บ log ตาม พ.ร.บ.คอมพิวเตอร์ในลักษณะเดียวกับผู้ให้บริการที่มีเซิร์ฟเวอร์ — แต่ต้องบันทึกไว้เป็นข้อสังเกตว่าหากอนาคตมีการเพิ่ม Backend/Cloud sync จะต้องทบทวนข้อกำหนดนี้ใหม่
3. **ลิขสิทธิ์/ทรัพย์สินทางปัญญา (สำหรับ File Organizer ของ Sprint 4):** ผู้ใช้ต้องรับผิดชอบต่อลิขสิทธิ์ของไฟล์ที่ตนเองแนบเข้าระบบ แอปไม่เผยแพร่หรือแชร์ไฟล์ไปยังบุคคลอื่นหรือที่ใดๆ ภายนอกเครื่องผู้ใช้ (ไฟล์อยู่ใน IndexedDB ของเครื่องผู้ใช้เท่านั้น) จึงไม่มีความเสี่ยงด้านการละเมิดลิขสิทธิ์จากการเผยแพร่ต่อ

### ขอบเขต (Scope) — เพิ่มเติมใน Sprint 6

**In scope:**

- หน้า/ส่วน Privacy Notice + Terms of Use (เนื้อหาตาม Business Rules ข้อ 1-3 ด้านบน) เข้าถึงได้จาก Footer ทุกหน้า
- ตรวจสอบว่าไม่มีการเก็บ/ส่งข้อมูลผู้ใช้ออกนอกเครื่องจริง (สอดคล้องกับ Privacy Notice ที่แจ้งไว้) เป็นส่วนหนึ่งของ Black Box Testing ของ Sprint 6

**Out of scope (ไม่ต้องทำ เพราะ user ยืนยันว่าต้องการแค่ระดับแจ้ง Privacy Notice):**

- ระบบขอความยินยอม (Consent Management) แบบเต็มรูปแบบ
- ฟีเจอร์ Export/ลบข้อมูลแบบทางการที่แยกจาก CRUD ปกติ (สิทธิ์นี้ครอบคลุมอยู่แล้วผ่านฟีเจอร์ลบ/แก้ไขข้อมูลปกติของ Sprint 2-4)
- การแต่งตั้ง DPO (Data Protection Officer) หรือกระบวนการทางกฎหมายที่เป็นทางการอื่นๆ
- Cookie consent banner (ระบบไม่ใช้ tracking cookies อยู่แล้ว)

### Acceptance Criteria (เพิ่มเติม)

- มีลิงก์ Privacy Notice / Terms of Use ที่เข้าถึงได้จากทุกหน้า (เช่นที่ Footer)
- เนื้อหา Privacy Notice ครอบคลุมประเด็นตาม Business Rules ข้อ 1 ครบถ้วน
- เนื้อหา Terms of Use ครอบคลุมประเด็นตาม Business Rules ข้อ 2-3 ครบถ้วน
- ยืนยันด้วย Black Box Testing ว่าไม่มีการส่งข้อมูลผู้ใช้ออกนอกเครื่องจริง (ตรวจสอบผ่าน Network request — ต้องไม่มี request ที่แนบข้อมูลส่วนบุคคลของผู้ใช้ออกไปนอกเครื่อง)

### Gate 6 (เพิ่มเติม)

ก่อนถือว่า Sprint 6 ผ่านและพร้อม deploy บน Vercel ต้องตรวจสอบเพิ่มว่า Privacy Notice/Terms of Use แสดงผลถูกต้องและเข้าถึงได้จริงจากทุกหน้า

## เพิ่มเติม (20260806): Generalize Target User — Final Acceptance Criteria คู่ Persona

**บริบท:** ตาม requirement revision ที่อนุมัติแล้ว My Today เปลี่ยนจาก "แอปสำหรับนักศึกษาเท่านั้น" เป็น "Personal Daily Workspace สำหรับบุคคลทั่วไป โดยยังรองรับนักศึกษาเป็นหนึ่งในกลุ่มผู้ใช้" (ดู [[20260806-007-my-today-sprint7-category-profile]] สำหรับ Life Area/Profile ที่เป็นกลไกรองรับการ generalize นี้) Final Gate ของ Sprint 6 จึงต้องพิสูจน์ว่า Core ระบบเดียวกันรองรับทั้งสอง persona ได้ ไม่ใช่แค่ persona นักศึกษา

**Final User Journey เดิม (นักศึกษา — ยังคงใช้ทดสอบได้เหมือนเดิม):** นักศึกษาได้รับงาน STEM ที่ต้องส่งวันศุกร์ 23:59 น. → บันทึกเป็น Task ใน Life Area "Study" → แนบไฟล์งาน → เห็น Deadline ใน Calendar → เปิด My Today ตอนเช้าเห็นงานบน Dashboard → ระบบเตือนเมื่อใกล้หมดเวลา → นักศึกษาทำงานเสร็จและกด Done → Dashboard อัปเดตสถานะโดยอัตโนมัติ

**Final User Journey ใหม่ (บุคคลทั่วไป — persona คู่ขนานที่ต้องผ่านด้วย):** บุคคลทั่วไปมีบิลค่าไฟที่ต้องจ่ายก่อนสิ้นเดือน → บันทึกเป็น Task "จ่ายค่าไฟ" ใน Life Area "Finance" → แนบไฟล์ใบแจ้งหนี้ → เห็น Deadline ใน Calendar → เปิด My Today ตอนเช้าเห็นงานบน Dashboard → ระบบเตือนเมื่อใกล้หมดเวลา → จ่ายเงินเสร็จและกด Done → Dashboard อัปเดตสถานะโดยอัตโนมัติ

**Gate 6 เพิ่มเติม:** Requirement ใหม่ถือว่าผ่านเมื่อทั้งสอง Journey ข้างต้นใช้ Task + Life Area + Calendar + File + Notification + Dashboard ชุดเดียวกันได้ โดยไม่ต้องสร้างระบบ/โค้ดแยกสำหรับแต่ละ persona — ถ้าต้องแยก logic พิเศษสำหรับ "นักศึกษา" ออกจาก "บุคคลทั่วไป" ที่ไหนก็ตาม แสดงว่า Requirement นี้ยังไม่ผ่าน

**หมายเหตุ (20260806):** Sprint 6 นี้คือจุดปิดจบของ **My Today Version 1 / Core** (Sprint 1-6) เท่านั้น ไม่ใช่จุดจบของโปรเจกต์ทั้งหมด — หลังจากนี้มี **Competition Track (Sprint 7-12, "My Today — One Life, One Workspace")** ต่อยอดอีก เริ่มที่ [[20260806-007-my-today-sprint7-category-profile]] ซึ่งเพิ่ม Life Area/Workspace, Personal Profile, Universal Inbox, Quick Capture, Timeline และ Task-Event-File Linking แบบเต็มรูปแบบ
