# My Today — Sprint 10: Task–Event–File Linking (What + When + Information) (Competition Track)

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-004-my-today-sprint4-file-organizer]], [[20260806-005-my-today-sprint5-notification-deadline-awareness]], [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]]

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint ที่ 4 ของ **Competition Track (Sprint 7-12, "My Today — One Life, One Workspace")** ต่อยอดจาก Sprint 7 (Life Area/Workspace & Personal Profile), Sprint 8 (Universal Inbox + Quick Capture) และ Sprint 9 (Timeline + Smart Priority + Life Progress) พัฒนาต่อจาก Codebase เดิมของ Sprint 1-9 ทั้งหมด

**หมายเหตุคำศัพท์:** เอกสารนี้ใช้คำว่า **"Life Area"** ตามที่ renumber/rename ไว้แล้วใน [[20260806-007-my-today-sprint7-category-profile]] ไม่ใช้คำว่า "Category"

## เป้าหมาย

นี่คือ **Differentiator สำคัญที่สุด** ของ My Today เทียบกับ To-do App ทั่วไป — Task หนึ่งรายการไม่ใช่แค่ "ชื่องาน" แต่ต้องเชื่อมครบ 3 มิติ: **What** (ต้องทำอะไร), **When** (เมื่อไร), **Information** (ต้องใช้อะไร — ไฟล์, บันทึกช่วยจำ, ลิงก์ที่เกี่ยวข้อง) ต่อยอดจากการเชื่อม Task-File พื้นฐานที่ทำไปแล้วใน Sprint 4 ([[20260806-004-my-today-sprint4-file-organizer]]) และ entity Note/Link ใหม่จาก Sprint 8 ([[20260806-009-my-today-sprint8-universal-inbox-quick-capture]])

## Feature Requirements / User Stories

- ผู้ใช้เปิด Task แล้วเห็นข้อมูลที่เกี่ยวข้องครบในหน้าเดียว: รายละเอียดงาน (What), วันเวลา/deadline (When), และไฟล์/บันทึก/ลิงก์ที่เกี่ยวข้อง (Information) ไม่ต้องสลับไปมาหลายหน้า
- ผู้ใช้เชื่อม Note และ Link (จาก Sprint 8) เข้ากับ Task ได้ ไม่ใช่แค่ File (จาก Sprint 4) เหมือนเดิม
- ผู้ใช้กำหนด Reminder แบบ custom lead time ต่อ Task ได้ (เช่น "เตือนก่อน 1 วัน") แยกจาก threshold กลาง Due Soon ของ Sprint 5 ([[20260806-005-my-today-sprint5-notification-deadline-awareness]]) — ถ้าตั้งไว้ ระบบใช้ค่าที่ตั้งเอง แทนค่า default ของ Sprint 5 สำหรับ Task นั้น
- ตัวอย่างที่ต้องรองรับ:
  - Task "ไปโรงพยาบาล" — When: 8 สิงหาคม 09:00, Files: ใบนัด/ผลตรวจ, Note: "อาคาร 2 ชั้น 3", Reminder: ก่อน 1 วัน
  - Task "ส่งบทความ" — When: 15 สิงหาคม, Files: manuscript.docx/reviewer-comments.pdf, Life Area: Research

## Business Rules

1. Task เพิ่ม field ความสัมพันธ์ใหม่: `linkedNoteIds` และ `linkedLinkIds` (เพิ่มจาก `linkedFileIds` ที่มีอยู่แล้วจาก Sprint 4) ทั้งหมด optional
2. Task เพิ่ม field `reminderLeadTime` (optional) — ถ้าไม่ตั้งใช้ค่า default ของระบบจาก Sprint 5 ถ้าตั้งไว้ ระบบต้อง override ด้วยค่านี้เฉพาะ Task นั้น
3. หน้ารายละเอียด Task (Task Detail) ต้องจัดวางเป็น 3 ส่วนชัดเจน: **What** (ชื่อ+รายละเอียด+Life Area), **When** (Deadline/เวลา/Reminder), **Information** (รายการไฟล์ + บันทึก + ลิงก์ที่เชื่อมไว้ ทั้งหมดแสดงพร้อมกันในหน้าเดียว)
4. Event (Sprint 3) ก็เชื่อมกับ Note/Link/File ได้เช่นเดียวกับ Task ด้วยกลไกเดียวกัน (ไม่ใช่แค่ Task)
5. พัฒนาต่อจาก Codebase เดิมของ Sprint 1-9 (Non-regression: การเชื่อม Task-File เดิมจาก Sprint 4 ต้องยังทำงานได้ครบถ้วน ไม่ใช่ถูกแทนที่)

## ขอบเขต (Scope)

### In scope (Sprint 10)

- เชื่อม Task/Event กับ Note และ Link (เพิ่มจากที่เชื่อมกับ File ได้อยู่แล้ว)
- หน้า Task Detail (และ Event Detail) แบบ What/When/Information ในหน้าเดียว
- Custom reminder lead time ต่อ Task/Event (override ค่า default ของ Sprint 5)

### Out of scope (ห้ามทำใน Sprint นี้)

- AI แนะนำไฟล์/บันทึกที่น่าจะเกี่ยวข้องอัตโนมัติ
- OCR หรือแกะเนื้อหาในไฟล์
- แชร์ Task/Information ให้ผู้อื่น

## Acceptance Criteria

- สร้าง Task "ไปโรงพยาบาล" ตามตัวอย่าง เชื่อมไฟล์ 2 ไฟล์ + Note 1 อัน + ตั้ง Reminder ก่อน 1 วันได้ครบ แล้วเห็นทั้งหมดในหน้า Task Detail เดียว
- สร้าง Task "ส่งบทความ" เชื่อมไฟล์ 2 ไฟล์ + กำหนด Life Area "Research" ได้ถูกต้อง
- Custom reminder lead time ที่ตั้งไว้มีผลแทน default ของ Sprint 5 จริง (ทดสอบด้วย deadline จำลอง)
- การเชื่อม Task-File แบบเดิมจาก Sprint 4 (Related Files) ยังทำงานได้ปกติ

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 10:** ทำ Scenario ทั้งสองตัวอย่าง (โรงพยาบาล, ส่งบทความ) ให้ครบตาม Business Rules ข้อ Feature Requirements — เปิด Task แล้วเห็น What+When+Information ครบในหน้าเดียวโดยไม่ต้องสลับหน้า จึงถือว่าผ่าน
