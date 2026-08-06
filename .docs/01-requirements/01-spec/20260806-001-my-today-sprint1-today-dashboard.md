# My Today — Sprint 1: Today Dashboard

เชื่อมโยงกลับ: [[index]]

## เป้าหมาย

สร้าง "หัวใจ" ของ My Today ก่อน — ผู้ใช้เปิดแอปแล้วรู้ทันทีว่าวันนี้ต้องทำอะไร Sprint นี้สร้างเฉพาะหน้า Dashboard ด้วย Mock Data เท่านั้น ยังไม่มีระบบจัดการข้อมูลจริง

## Feature Requirements / โครงสร้างหน้า Dashboard

1. **Header** แสดง: ชื่อ "My Today", วันที่ปัจจุบัน, ข้อความทักทาย (เช่น "สวัสดี วันนี้มีอะไรต้องทำบ้าง")
2. **Summary Cards** แสดง: งานทั้งหมดวันนี้, งานที่เสร็จแล้ว, งานที่ยังไม่เสร็จ, งานที่ใกล้ครบกำหนด
3. **Today's Tasks**: รายการงานของวันนี้ แต่ละรายการแสดง ชื่องาน, รายวิชา, เวลา Deadline, Priority, Status
4. **Today's Schedule**: ตารางเรียน/กิจกรรมของวันนี้ แสดง เวลา, ชื่อกิจกรรม, สถานที่
5. **Upcoming**: รายการงานที่ใกล้ครบกำหนด
6. **Quick Action**: ปุ่ม "+ เพิ่มงาน" — Sprint นี้ยังไม่ต้องสร้างระบบเพิ่มงานจริง ให้เปิด Modal ตัวอย่าง (placeholder) พอ

## Business Rules

- ข้อมูลทั้งหมดในหน้านี้เป็น Mock Data ที่สร้างขึ้นสำหรับทดสอบ Dashboard เท่านั้น (ยังไม่เชื่อมกับระบบจัดการข้อมูลจริง — จะเชื่อมใน Sprint 2)
- UI ต้อง Mobile-first, เรียบง่าย, อ่านง่าย, ใช้ Card Layout, ไม่แสดงข้อมูลมากเกินจำเป็น, จัดลำดับให้ข้อมูลเร่งด่วนมองเห็นก่อน

## ขอบเขต (Scope)

### In scope (Sprint 1)

- หน้า Today Dashboard ทั้ง 6 ส่วนตามที่ระบุข้างต้น (Header, Summary Cards, Today's Tasks, Today's Schedule, Upcoming, Quick Action แบบ Modal ตัวอย่าง)
- Mock Data สำหรับทดสอบ
- Mobile-first / Responsive

### Out of scope (ห้ามสร้างใน Sprint นี้)

- Calendar เต็มรูปแบบ
- File Organizer
- Notification System
- AI
- Backend
- ระบบเพิ่ม/แก้ไข/ลบงานจริง (จะทำใน Sprint 2)

## Acceptance Criteria

- เปิดเว็บแล้วเห็น Today Dashboard ทันที
- Responsive บนมือถือ
- ไม่มี Error ใน Console
- ทุก Card แสดงข้อมูลถูกต้องจาก Mock Data
- UI ใช้งานได้โดยไม่ต้องอธิบายเพิ่มเติม

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 1:** ให้นักศึกษา Demo หน้าเดียวก่อน คำถามของอาจารย์คือ "เปิดหน้านี้แล้วรู้ไหมว่าวันนี้ต้องทำอะไร?" ถ้ายังตอบไม่ได้ ยังไม่ผ่าน Sprint 1
