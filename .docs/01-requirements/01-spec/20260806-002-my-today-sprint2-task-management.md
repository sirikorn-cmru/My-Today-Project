# My Today — Sprint 2: Task Management

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-007-my-today-sprint7-category-profile]]

## เป้าหมาย

เปลี่ยน Dashboard จาก Mock Data (Sprint 1) ให้เป็น "ข้อมูลจริงที่ผู้ใช้จัดการเอง" — พัฒนาต่อจาก Codebase เดิมของ Sprint 1 ห้ามสร้าง Project ใหม่

## Feature Requirements / User Stories

- ผู้ใช้เพิ่ม Task ได้
- ผู้ใช้แก้ไข Task ได้
- ผู้ใช้ลบ Task ได้
- ผู้ใช้ทำเครื่องหมายว่าเสร็จแล้วได้
- ผู้ใช้เปลี่ยนสถานะ (Status) ได้
- ผู้ใช้กำหนด Priority ได้
- ผู้ใช้กำหนด Deadline ได้
- สร้างหน้า "Tasks" ที่ดูงานทั้งหมด, Filter ตาม Status, Filter ตาม Priority, Search งาน, Sort ตาม Deadline ได้

## Business Rules

1. Task แต่ละรายการต้องมี field: Task ID, ชื่องาน, รายละเอียด, Life Area, วันที่กำหนดส่ง, เวลา, Priority (High/Medium/Low), Status (To Do/Doing/Done), วันที่สร้าง
2. เก็บข้อมูล Task ด้วย LocalStorage ข้อมูลต้องยังอยู่หลัง Refresh Browser
3. ข้อมูล Task ต้องเชื่อมเข้ากับ Today Dashboard ของ Sprint 1 — Dashboard ต้องคำนวณอัตโนมัติจากข้อมูล Task จริง: งานวันนี้, งานเสร็จแล้ว, งานค้าง, งานใกล้ครบกำหนด
4. พัฒนาต่อจาก Codebase เดิมของ Sprint 1 ห้ามสร้าง Project ใหม่ (Non-regression: ต้องรักษาหน้า Today Dashboard และโครงสร้างเดิมของ Sprint 1 ให้ทำงานได้ครบถ้วน)

## ขอบเขต (Scope)

### In scope (Sprint 2)

- CRUD Task ครบ (เพิ่ม/แก้ไข/ลบ/เปลี่ยนสถานะ/กำหนด Priority/กำหนด Deadline)
- หน้า Tasks (ดูทั้งหมด, Filter ตาม Status, Filter ตาม Priority, Search, Sort ตาม Deadline)
- เก็บข้อมูลด้วย LocalStorage
- เชื่อมข้อมูล Task จริงเข้ากับ Today Dashboard (แทน Mock Data เดิม)

### Out of scope (ห้ามเพิ่มใน Sprint นี้)

- Calendar
- File Management
- Notification
- AI

## Acceptance Criteria

- เพิ่ม Task แล้วปรากฏในรายการทันที
- Refresh แล้วข้อมูลยังอยู่
- แก้ไขและลบได้
- Status เปลี่ยนได้
- Dashboard เปลี่ยนตามข้อมูลจริง
- Task ที่ Deadline วันนี้ปรากฏใน Today Dashboard

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 2:** ให้นักศึกษาเพิ่มงานจริง 5 งานแล้วลองใช้งาน 1 วัน ถ้า Add → Edit → Done → Dashboard Update ทำงานครบ จึงผ่าน

## เพิ่มเติม (20260806): Generalize Target User

field "Life Area" ในข้อ 1 (Business Rules) ด้านบน มาแทนที่ field เดิม "รายวิชา" (subject, free text) — Task ตอนนี้เชื่อมกับ Life Area entity ที่นิยามใน [[20260806-007-my-today-sprint7-category-profile]] แทนการเป็น free text เพื่อรองรับผู้ใช้ทั่วไปไม่ใช่แค่นักศึกษา (เช่น Life Area "Finance", "Work" ไม่ใช่แค่ชื่อวิชาเรียน)

หมายเหตุ: การแก้โค้ดจริง (เปลี่ยน `Task.subject` เป็น `Task.lifeAreaId` ใน `src/types.ts` และ UI ที่เกี่ยวข้อง) จะทำในขั้นตอนพัฒนาแยกต่างหาก ไม่ใช่ส่วนของการแก้เอกสารนี้
