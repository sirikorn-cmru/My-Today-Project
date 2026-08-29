# My Today — Sprint 5: Notification & Deadline Awareness

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-004-my-today-sprint4-file-organizer]]

## เป้าหมาย

ตอบคำถาม "อะไรใกล้จะพลาดแล้ว?" — ใช้ข้อมูล Task (Sprint 2) และ Calendar (Sprint 3) ที่มีอยู่แล้ว

## Feature Requirements / User Stories

- ระบบตรวจสอบอัตโนมัติ: งานครบกำหนดวันนี้, งานใกล้ครบกำหนด, งานเลยกำหนด, กิจกรรมที่กำลังจะเริ่ม
- แบ่งระดับการเตือน: Due Today, Due Soon, Overdue
- สร้าง Notification Center ภายในระบบ แสดง: ข้อความ, เวลา, Task/Event ที่เกี่ยวข้อง, สถานะอ่านแล้ว/ยังไม่อ่าน
- Today Dashboard (Sprint 1) ต้องแสดง Notification สำคัญเพิ่มเข้าไปด้วย
- ใช้ Browser Notification API ได้เฉพาะกรณีผู้ใช้อนุญาต (permission) แต่ระบบต้องยังใช้งานได้ตามปกติแม้ผู้ใช้ไม่อนุญาต/ปิด Browser Notification

## Business Rules

1. Notification Center ต้องเชื่อมกลับไปยัง Task/Event ต้นทางได้ (คลิกแล้วไปที่ Task/Event นั้น)
2. Browser Notification เป็น progressive enhancement เท่านั้น — ไม่ใช่ dependency บังคับของฟีเจอร์นี้
3. พัฒนาต่อจาก Codebase เดิม (Non-regression: ต้องรักษา Today Dashboard, Task Management, Calendar, File Organizer จาก Sprint 1-4 ให้ทำงานได้ครบถ้วน)

## ขอบเขต (Scope)

### In scope (Sprint 5)

- ระบบตรวจสอบ Deadline อัตโนมัติ (Due Today / Due Soon / Overdue) จากข้อมูล Task และ Calendar จริง
- Notification Center (ข้อความ, เวลา, ลิงก์กลับ Task/Event, สถานะอ่าน/ยังไม่อ่าน)
- แสดง Notification สำคัญบน Today Dashboard
- ใช้ Browser Notification API แบบ optional (progressive enhancement)

### Out of scope (ห้ามสร้างใน Sprint นี้)

- Email Notification
- LINE Notification
- SMS
- Push Server
- AI

## Acceptance Criteria

- งานใกล้ Deadline ถูกแจ้งเตือน
- งาน Overdue แสดงชัดเจน
- Notification เชื่อมกลับไปยัง Task/Event ได้
- ระบบยังทำงานได้แม้ Browser Notification ถูกปิด

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 5:** ทดสอบด้วย Deadline จำลองที่เหลือ 24 ชั่วโมง, 1 ชั่วโมง, เลยเวลาแล้ว — ต้องแสดงสถานะแตกต่างกันถูกต้อง
