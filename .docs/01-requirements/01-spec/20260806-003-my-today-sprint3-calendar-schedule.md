# My Today — Sprint 3: Calendar & Schedule

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-007-my-today-sprint7-category-profile]]

## เป้าหมาย

ตอบคำถาม "ต้องทำอะไร เมื่อไร" — พัฒนาต่อจาก Codebase เดิมของ Sprint 1-2

## Feature Requirements / User Stories

- ผู้ใช้เพิ่มตารางเรียน, นัดหมาย, กิจกรรมได้
- สร้างหน้า Calendar ที่มีมุมมอง Today, Week, Month
- ผู้ใช้แก้ไขและลบกิจกรรมได้
- ผู้ใช้เปลี่ยนมุมมอง Calendar ได้

## Business Rules

1. แต่ละรายการกิจกรรม/นัดหมาย/ตารางเรียนต้องมี field: ชื่อกิจกรรม, ประเภท, วันที่, เวลาเริ่ม, เวลาสิ้นสุด, สถานที่, รายละเอียด
2. Task ที่มี Deadline (จาก Sprint 2) ต้องปรากฏใน Calendar โดยอัตโนมัติ
3. Schedule และ Task ต้องใช้ข้อมูลร่วมกันโดยไม่สร้างข้อมูลซ้ำ (ไม่ duplicate ข้อมูล Task เป็นอีก entity แยกใน Schedule)
4. Today Dashboard (Sprint 1) ต้องแสดงเพิ่ม: ตารางของวันนี้, Deadline ของวันนี้ (ดึงจากข้อมูล Calendar/Schedule จริง)
5. เก็บข้อมูล Schedule ด้วย LocalStorage
6. พัฒนาต่อจาก Codebase เดิม (Non-regression: ต้องรักษา Today Dashboard และ Task Management จาก Sprint 1-2 ให้ทำงานได้ครบถ้วน)
7. แต่ละกิจกรรม/นัดหมาย/ตารางเรียน สามารถเชื่อมกับ Life Area ได้ (Life Area entity เดียวกับที่ Task ใช้ใน Sprint 2 — นิยามใน [[20260806-007-my-today-sprint7-category-profile]]) เพื่อให้จัดกลุ่มร่วมกับ Task และ File ที่อยู่ Life Area เดียวกันได้ การเชื่อม Life Area เป็น optional ไม่บังคับ

## ขอบเขต (Scope)

### In scope (Sprint 3)

- CRUD กิจกรรม/นัดหมาย/ตารางเรียน
- หน้า Calendar 3 มุมมอง (Today/Week/Month)
- เชื่อม Task Deadline เข้า Calendar อัตโนมัติ
- อัปเดต Today Dashboard ให้แสดงตารางวันนี้ + Deadline วันนี้
- เก็บข้อมูลด้วย LocalStorage
- เชื่อมโยง Life Area กับกิจกรรม/นัดหมาย/ตารางเรียน (optional)

### Out of scope (ห้ามสร้างใน Sprint นี้)

- Google Calendar Integration
- University Calendar Integration
- AI Scheduling
- Notification System

## Acceptance Criteria

- เพิ่มกิจกรรมได้
- แก้ไขและลบกิจกรรมได้
- เปลี่ยนมุมมอง Calendar ได้
- Task Deadline ปรากฏใน Calendar
- ตารางวันนี้ปรากฏใน Dashboard

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 3:** ทดสอบสถานการณ์จริง เช่น 09:00 เรียน HCI, 13:00 ประชุมกลุ่ม, 23:59 ส่งงาน STEM — ผู้ใช้ต้องเห็นทั้งสามรายการได้อย่างเข้าใจง่าย

## เพิ่มเติม (20260806): Generalize Target User

Sprint นี้เพิ่มการเชื่อมโยงกิจกรรม/นัดหมาย/ตารางเรียนกับ Life Area (ดูข้อ 7 ใน Business Rules และ Scope ด้านบน) เพื่อรองรับผู้ใช้ทั่วไป ไม่ใช่แค่ตารางเรียนของนักศึกษาเท่านั้น ตัวอย่างการใช้งานจริงยังคงหลากหลายได้ เช่น Life Area "Study" (ตารางเรียน) หรือ Life Area "Work" (ประชุม) หรือ Life Area "Personal" (นัดหมายส่วนตัว) ทั้งหมดใช้กลไก Life Area เดียวกัน
