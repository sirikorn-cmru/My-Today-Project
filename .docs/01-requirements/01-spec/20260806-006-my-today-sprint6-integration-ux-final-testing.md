# My Today — Sprint 6: Integration, UX & Final Testing (Final Sprint ของ My Today Version 1)

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-004-my-today-sprint4-file-organizer]], [[20260806-005-my-today-sprint5-notification-deadline-awareness]]

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
