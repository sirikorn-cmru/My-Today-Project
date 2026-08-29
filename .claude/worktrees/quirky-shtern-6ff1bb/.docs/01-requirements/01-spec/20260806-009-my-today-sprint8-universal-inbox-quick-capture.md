# My Today — Sprint 8: Universal Inbox + Quick Capture (Competition Track)

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-004-my-today-sprint4-file-organizer]], [[20260806-007-my-today-sprint7-category-profile]]

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint ที่ 2 ของ **Competition Track (Sprint 7-12, "My Today — One Life, One Workspace")** ต่อยอดจาก Sprint 7 (Life Area/Workspace & Personal Profile) พัฒนาต่อจาก Codebase เดิมของ Sprint 1-7 ทั้งหมด

**หมายเหตุคำศัพท์:** เอกสารนี้ใช้คำว่า **"Life Area"** ตามที่ renumber/rename ไว้แล้วใน [[20260806-007-my-today-sprint7-category-profile]] ไม่ใช้คำว่า "Category"

## เป้าหมาย

ผู้ใช้ไม่ควรต้องกรอกฟอร์มยาวทุกครั้งที่นึกอะไรขึ้นมาได้ แนวคิดหลักของ Sprint นี้คือ **"อย่าบังคับผู้ใช้ให้จัดระเบียบก่อนที่เขาจะมีเวลาจัด"** — ก่อนข้อมูลจะถูกจัดเข้า Life Area ผู้ใช้โยนทุกอย่างเข้ามาที่ "My Inbox" ก่อน แล้วค่อยจัดทีหลังเมื่อมีเวลา

## Feature Requirements / User Stories

- ผู้ใช้กดปุ่มกลาง **"+ Add to My Today"** จากที่ไหนก็ได้ในแอป แล้วเลือกประเภทของสิ่งที่จะบันทึก: Task / Event / File / Note / Link
- ผู้ใช้กรอกแค่ข้อมูลขั้นต่ำ (เช่น พิมพ์ข้อความอิสระ "จ่ายค่าไฟ 10 สิงหาคม") แล้วบันทึกได้ทันทีโดยไม่ต้องกรอกฟอร์มเต็ม
- รายการที่ capture มาแบบเร็วจะเข้า **"My Inbox"** ก่อน (ยังไม่ถูกจัด Life Area)
- ผู้ใช้เปิดหน้า Inbox ดูรายการที่ยังไม่จัดหมวดได้ แล้วเลือกจัดเข้า Life Area และเติมรายละเอียดที่ขาด (เช่น Deadline, Priority ของ Task) ภายหลัง
- เพิ่ม entity ใหม่ 2 ชนิดที่ไม่เคยมีมาก่อน: **Note** (ข้อความที่ต้องจำ ไม่มี deadline) และ **Link** (ลิงก์ที่ต้องเก็บไว้)

## Business Rules

1. รายการใน Inbox ต้องการแค่ field ขั้นต่ำตอนสร้าง: ประเภท (Task/Event/File/Note/Link) + ข้อความ/ชื่อ (title) เท่านั้น ฟิลด์อื่นๆ ที่ entity นั้นต้องมีตามปกติ (เช่น Deadline ของ Task, เวลาเริ่ม-สิ้นสุดของ Event) เป็น optional จนกว่าผู้ใช้จะมาแก้ไขทีหลัง
2. เมื่อผู้ใช้จัดรายการจาก Inbox เข้า Life Area แล้ว รายการนั้นจะกลายเป็น Task/Event/File/Note/Link ปกติที่ใช้กลไกเดิมของ Sprint ที่เกี่ยวข้อง (Task = [[20260806-002-my-today-sprint2-task-management]], Event = [[20260806-003-my-today-sprint3-calendar-schedule]], File = [[20260806-004-my-today-sprint4-file-organizer]]) — ไม่มี entity ซ้อนสองชุด
3. Note มี field ขั้นต่ำ: id, ชื่อ/หัวข้อ, เนื้อหา (text), Life Area (optional), วันที่สร้าง — ไม่มี deadline/priority/status เหมือน Task
4. Link มี field ขั้นต่ำ: id, ชื่อ, URL, Life Area (optional), วันที่สร้าง
5. **ห้ามใช้ AI ในการแยกวิเคราะห์ (parsing) ข้อความอิสระที่ผู้ใช้พิมพ์** เวอร์ชันนี้ยังไม่ต้องแยกวันที่/ชื่อจากข้อความอัตโนมัติ ผู้ใช้พิมพ์ข้อความอิสระเป็น title ตรงๆ แล้วไปกรอกรายละเอียด (เช่น วันที่) แยกเป็นฟิลด์ปกติเอาเอง หรือปล่อยว่างไว้ก่อนแล้วเติมทีหลังใน Inbox
6. พัฒนาต่อจาก Codebase เดิมของ Sprint 1-7 (Non-regression: ต้องรักษาทุกฟีเจอร์เดิมให้ทำงานได้ครบถ้วน)

## ขอบเขต (Scope)

### In scope (Sprint 8)

- ปุ่ม Quick Capture กลาง "+ Add to My Today" เข้าถึงได้จากทุกหน้า เปิด modal เลือกประเภท + กรอกข้อมูลขั้นต่ำ
- หน้า "My Inbox" แสดงรายการที่ยังไม่จัด Life Area ทั้งหมด (ทุกประเภท)
- ฟีเจอร์ "จัดเข้า Life Area" จาก Inbox (assign Life Area + เติมรายละเอียดที่ขาด แล้วแปลงเป็น entity เต็มรูปแบบ)
- CRUD entity ใหม่ 2 ชนิด: Note, Link (เก็บด้วย LocalStorage เหมือน Task/Event)

### Out of scope (ห้ามทำใน Sprint นี้)

- AI parsing ข้อความอิสระ (แยกวันที่/ชื่อ/หมวดหมู่อัตโนมัติ)
- Voice input / Camera capture
- Browser extension สำหรับ capture จากเว็บอื่น

## Acceptance Criteria

- Quick capture "จ่ายค่าไฟ 10 สิงหาคม" เป็น Task ได้ภายในไม่กี่วินาที โดยไม่ต้องกรอกฟอร์มเต็ม
- รายการที่ capture มาปรากฏในหน้า Inbox ทันที
- จัดรายการจาก Inbox เข้า Life Area "Finance" ได้ และรายการนั้นไปปรากฏในหน้า Tasks/Dashboard ตามปกติเหมือน Task ที่สร้างผ่านฟอร์มเต็ม
- สร้าง Note และ Link ผ่าน Quick Capture ได้ และดูได้ภายหลัง

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 8:** ทดสอบ capture รายการ 5 ประเภท (Task, Event, File, Note, Link) ผ่าน Quick Capture เข้า Inbox ให้ครบ แล้วจัดเข้า Life Area ที่เหมาะสมทีละอันจนหมด Inbox — ต้องทำได้ครบทุกประเภทโดยไม่มี error
