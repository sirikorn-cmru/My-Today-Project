# My Today — Sprint 4: File Organizer

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]]

## เป้าหมาย

ตอบคำถาม "ไฟล์ที่ต้องใช้กับงานนี้อยู่ไหน?" — พัฒนาต่อจาก Codebase เดิมของ Sprint 1-3 นี่คือ Sprint สำคัญมาก เพราะเป็นจุดที่ My Today เริ่มแตกต่างจาก To-do App ทั่วไป

## Feature Requirements / User Stories

- ผู้ใช้เพิ่มไฟล์ได้
- ผู้ใช้ตั้งชื่อไฟล์ได้
- ผู้ใช้จัดหมวดหมู่ไฟล์ได้
- ผู้ใช้ระบุรายวิชาของไฟล์ได้
- ผู้ใช้ Search ไฟล์ได้
- ผู้ใช้ Preview ไฟล์ที่ Browser รองรับได้
- ผู้ใช้ Download ไฟล์ได้
- ผู้ใช้ Delete ไฟล์ได้
- สร้างหน้า "Files" ที่มี Search, Filter ตามรายวิชา, Recent Files
- **สำคัญที่สุด:** ไฟล์ต้องเชื่อมโยงกับ Task ได้ (Related Files) — เมื่อเปิด Task ผู้ใช้ต้องเห็นไฟล์ที่เกี่ยวข้องทันที เช่น Task "ส่งรายงาน STEM" มี Related Files: report.docx, rubric.pdf, reference.pdf

## Business Rules

1. เก็บไฟล์ด้วย IndexedDB ภายใน Browser เท่านั้น (ห้ามสร้าง Google Drive ใหม่หรือ Cloud Storage)
2. ไฟล์ต้อง refresh browser แล้วยังอยู่ (persist ผ่าน IndexedDB)
3. ต้องมีความสัมพันธ์ (relation) ระหว่างไฟล์กับ Task ของ Sprint 2 — เปิด Task แล้วเห็น Related Files ทันที
4. พัฒนาต่อจาก Codebase เดิม (Non-regression: ต้องรักษา Today Dashboard, Task Management, Calendar ของ Sprint 1-3 ให้ทำงานได้ครบถ้วน)

## ขอบเขต (Scope)

### In scope (Sprint 4)

- CRUD ไฟล์ (เพิ่ม/ตั้งชื่อ/จัดหมวดหมู่/ระบุรายวิชา/ลบ) เก็บด้วย IndexedDB
- Search, Preview (เท่าที่ Browser รองรับ), Download
- หน้า Files (Search, Filter ตามรายวิชา, Recent Files)
- เชื่อมโยงไฟล์กับ Task (Related Files แสดงในหน้า Task)

### Out of scope (ห้ามสร้างใน Sprint นี้)

- Cloud Sync
- Google Drive API
- Dropbox
- AI File Search

## Acceptance Criteria

- เพิ่มไฟล์ได้
- Refresh แล้วไฟล์ยังอยู่
- Search ได้
- เชื่อมไฟล์กับ Task ได้
- เปิด Task แล้วเห็น Related Files

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 4:** ให้นักศึกษาพิสูจน์ Scenario: เห็นงาน → เปิดงาน → เจอไฟล์ที่ต้องใช้ทันที ถ้าทำได้ ผ่าน
