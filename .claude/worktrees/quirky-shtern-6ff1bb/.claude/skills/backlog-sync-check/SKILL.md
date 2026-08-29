---
name: backlog-sync-check
description: ตรวจสอบว่า .docs/01-requirements/backlog.md ตรงกับเอกสาร requirement (01-spec/) และสถานะจริงของโค้ด/git history หรือไม่ ถ้าไม่ตรงให้แก้ backlog.md ให้ถูกต้อง ใช้เมื่อ user ขอให้ตรวจสอบ/sync backlog หรือเรียกผ่าน /backlog-sync-check โดยตรง
---

Skill นี้ตรวจสอบว่า `backlog.md` ของโปรเจกต์ "My Today Project" ยัง up to date อยู่หรือไม่ เทียบกับทั้งเอกสาร spec และสถานะจริงของโค้ด (ไม่ใช่แค่เทียบเอกสารกับเอกสารกันเอง) แล้วแก้ไขให้ถูกต้องถ้าไม่ตรง

## 1. เรียก subagent `backlog-auditor` ให้ตรวจสอบและแก้ไข

เรียก Agent tool โดยใช้ `subagent_type: "backlog-auditor"` พร้อมส่งวันที่ปัจจุบันในรูปแบบ `YYYYMMDD` (ดึงจาก currentDate ใน system context ของบทสนทนานี้ — ห้ามให้ subagent คำนวณเอง) subagent นี้จะ:

- เทียบไฟล์ทั้งหมดใน `.docs/01-requirements/01-spec/` กับรายการใน `backlog.md` ว่าครบและลิงก์ไม่พังหรือไม่
- เทียบ "สถานะ" ที่เขียนไว้ใน backlog.md กับหลักฐานจริงในโค้ด (`src/`) และ git log ว่าตรงกันหรือไม่ (เช่น Sprint ที่ build แล้วแต่ backlog ยังเขียนว่า "ยังไม่เริ่ม")
- แก้ `backlog.md` ให้ถูกต้องถ้าพบว่าไม่ตรง (ไม่แตะไฟล์ spec เอง)
- บันทึก log เฉพาะกรณีที่มีการแก้ไขจริง ถ้าทุกอย่างตรงอยู่แล้วจะไม่เพิ่ม log

## 2. รายงานผลให้ user

สรุปผลจาก subagent ให้ user ทราบ:

- ถ้าทุกอย่าง up to date อยู่แล้ว บอกตรงๆ ว่าไม่มีอะไรต้องแก้
- ถ้ามีการแก้ไข backlog.md บอกว่าแก้อะไรไปบ้างและเพราะอะไร (พร้อมอ้างอิง path/commit ที่เป็นหลักฐาน)
- ถ้า subagent พบปัญหาในตัว spec doc เอง (ที่ subagent ไม่ได้แก้ให้เพราะไม่ใช่หน้าที่) ให้แจ้ง user ไว้เป็นข้อสังเกตแยกต่างหาก เผื่อต้องการให้แก้ผ่าน `requirement-intake` ทีหลัง

ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
