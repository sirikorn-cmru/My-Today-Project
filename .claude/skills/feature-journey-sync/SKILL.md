---
name: feature-journey-sync
description: สร้าง/อัปเดต Feature List (ตารางสรุป + MoSCoW) ที่ .docs/01-requirements/feature-list.md จาก backlog.md และ spec docs พร้อมสร้าง/อัปเดต User Journey (Mermaid diagram + mapping กลับ FR-ID) ที่ .docs/02-design/01-prototypes/user-journey-{persona}.md ใช้เมื่อ user ขอให้สร้าง/ตรวจสอบ feature list หรือ user journey หรือเรียกผ่าน /feature-journey-sync โดยตรง
---

Skill นี้จัดการ workflow ของการสร้าง/อัปเดตเอกสาร 2 ชนิดสำหรับโปรเจกต์ "My Today Project": **Feature List** (ตารางสรุป + MoSCoW ต่อ Sprint) และ **User Journey** (Mermaid diagram ต่อ persona พร้อม mapping กลับ FR-ID) ทำตามลำดับนี้ทุกครั้ง อย่าข้ามขั้นตอน และอย่าเรียก subagent ก่อนที่ MoSCoW/persona จะ confirm แล้ว

## 1. อ่านแหล่งข้อมูลต้นทาง

อ่านไฟล์เหล่านี้ให้ครบก่อนเริ่มวิเคราะห์:

- `.docs/01-requirements/backlog.md` — รายการ Sprint ทั้งหมด (1-11) พร้อมสถานะปัจจุบัน นี่คือ "1 feature = 1 Sprint" granularity ที่ใช้ทำ Feature List — **ไม่รวม** รายการ "Functional Requirements Master List" (008) เพราะเป็นเอกสารอ้างอิงกลาง ไม่ใช่ Sprint/feature
- `.docs/01-requirements/01-spec/20260806-008-my-today-functional-requirements-master.md` — ตาราง FR-ID (FR-01 ถึง FR-19) พร้อม Sprint ที่เกี่ยวข้อง ใช้เป็นตัวเชื่อม feature ↔ requirement และใช้ทำ mapping ใน User Journey
- ไฟล์ spec แต่ละ Sprint ใน `.docs/01-requirements/01-spec/` ที่เกี่ยวข้อง (สำหรับดึงเนื้อหา scope/description จริง ไม่ใช่เดาเอง)
- ถ้ามีอยู่แล้ว: `.docs/01-requirements/feature-list.md` และไฟล์ `.docs/02-design/01-prototypes/user-journey-*.md` เดิม (สำหรับรอบอัปเดตครั้งถัดไป จะได้ไม่ถามซ้ำในจุดที่ user เคย confirm ไปแล้ว)

## 2. เช็ค backlog แบบเบาๆ (ไม่ deep-audit)

Feature List นี้อ่าน `backlog.md` **ตามสภาพ** ไม่เรียก `backlog-sync-check` ให้อัตโนมัติทุกครั้ง (เพื่อไม่ให้ต้นทุนงานซ้อนกัน) แต่ให้สังเกตสัญญาณว่า backlog อาจไม่อัปเดตแล้ว เช่น entry ที่บอกว่า "เสร็จแล้ว" แต่ไม่มีบันทึก "(ตรวจสอบ ...)" เลย หรือวันที่ตรวจสอบล่าสุดในไฟล์ห่างจาก commit ล่าสุดในโปรเจกต์มาก ถ้าพบสัญญาณแบบนี้ ให้จดไว้เป็นหมายเหตุที่จะแจ้ง user ตอนสรุปผล (ขั้นตอนที่ 6) — **ไม่ต้องหยุดรอ ไม่ต้องแก้ backlog.md เอง** แค่เตือนแล้วเดินหน้าต่อด้วยข้อมูลที่มีอยู่

## 3. เสนอ MoSCoW ต่อ Sprint พร้อมเหตุผล

จัดลำดับความสำคัญแบบ MoSCoW (Must / Should / Could / Won't) ให้ทั้ง 11 Sprint โดยมีเหตุผลอ้างอิงจากเนื้อหาจริงในเอกสาร (เช่น Sprint ที่เป็น prerequisite ของ Sprint อื่น, Sprint ที่ Gate/Acceptance Criteria ผูกกับ pitch หลักของสินค้า vs. Sprint ที่เป็น polish/nice-to-have) แนวทางเริ่มต้นที่ใช้ได้จริงกับ roadmap นี้:

- Sprint 1-6 (Version 1 / Core) และ Sprint 7 (Life Area/Profile, prerequisite ของ Competition Track ทั้งหมด) → มักเป็น **Must** เพราะเป็นแกนของ pitch และ Sprint อื่นพึ่งพาอยู่
- Sprint 8-10 (Competition Track กลาง) → ประเมินเป็นรายตัวว่าเป็น **Should** หรือ **Could** ตามว่าเป็น differentiator ของ narrative "One Life, One Workspace" มากแค่ไหน เทียบกับเป็นแค่ฟีเจอร์เสริม
- Sprint 11 (Competition Demo + Freeze) → มักเป็น **Must** เพราะจำเป็นต่อการปิดจบและ demo แม้จะไม่เพิ่ม feature ใหม่

นี่เป็นแค่แนวทางเริ่มต้น ไม่ใช่คำตอบตายตัว — ให้วิเคราะห์จากเนื้อหา spec จริงของโปรเจกต์นี้เสมอ

**ถ้ามี `feature-list.md` เดิมอยู่แล้ว**: ใช้ MoSCoW ที่ user เคย confirm ไว้เดิมเป็นฐาน ถามใหม่เฉพาะ Sprint ที่เพิ่งเพิ่มเข้ามาใน backlog หรือ Sprint ที่สถานะเปลี่ยนไปมากจนอาจกระทบการจัดลำดับ

แสดงตารางที่เสนอ (Sprint, MoSCoW, เหตุผลสั้นๆ) ให้ user เห็นเป็นข้อความปกติ แล้วถามยืนยันแบบเปิด (ไม่ต้องใช้ AskUserQuestion เพราะเป็นตารางใหญ่ไม่เหมาะกับ multiple-choice UI) เช่น "ตกลงตาม MoSCoW นี้ไหม หรือต้องการปรับ Sprint ไหนเป็นอย่างอื่น" ถ้า user ปรับ ให้แก้ตามนั้นก่อนไปขั้นตอนถัดไป

## 4. ยืนยัน persona สำหรับ User Journey

ค่าเริ่มต้น: สร้าง 2 journey ตาม dual-persona ที่มีอยู่แล้วในโปรเจกต์ (ดู Sprint 6/7 spec และ seed data) —

- **นักศึกษา**: ใช้ scenario เดิมที่มีอยู่ใน seed data/spec (เช่น "ส่งรายงาน STEM/HCI" ภายใต้ Life Area "Study")
- **บุคคลทั่วไป**: ใช้ scenario เดิม (เช่น "จ่ายค่าไฟ" ภายใต้ Life Area "Finance")

ถ้า user ระบุ persona อื่นหรือจำนวนอื่นมาในคำสั่ง ให้ใช้ตามนั้นแทน ถ้าไม่แน่ใจว่า user ต้องการ persona เพิ่มเติมหรือไม่ ให้ถามด้วย AskUserQuestion พร้อมตัวเลือกอย่างน้อย 3 แนวทาง (เช่น "ใช้ 2 persona เดิม", "เพิ่ม persona ที่ 3", "ทำเฉพาะ persona เดียว")

## 5. ส่งต่อให้ subagent `feature-journey-writer` เขียนไฟล์จริง

เรียก Agent tool โดยใช้ `subagent_type: "feature-journey-writer"` พร้อม prompt ที่ประกอบด้วย (subagent นี้จะไม่ถาม user เอง ต้องส่งข้อมูลที่ confirm แล้วให้ครบ):

- วันที่ปัจจุบันในรูปแบบ `YYYYMMDD` (ดึงจาก currentDate ใน system context ของบทสนทนานี้ — ห้ามให้ subagent คำนวณเอง)
- ตาราง MoSCoW ต่อ Sprint ที่ confirm แล้วในขั้นตอนที่ 3 (พร้อมเหตุผลของแต่ละแถว)
- รายชื่อ persona ที่ต้องสร้าง/อัปเดต journey (จากขั้นตอนที่ 4) พร้อม scenario/Life Area ของแต่ละ persona
- หมายเหตุเรื่อง backlog staleness จากขั้นตอนที่ 2 (ถ้ามี ให้ subagent ใส่ไว้เป็น note ในเอกสารด้วย)

## 6. รายงานสรุปให้ user

หลัง subagent ทำงานเสร็จ สรุปให้ user ทราบ:

- ไฟล์ที่สร้าง/แก้ทั้งหมด (feature-list.md, user-journey-*.md แต่ละ persona, log)
- สรุปจำนวน Must/Should/Could/Won't
- ถ้าพบสัญญาณ backlog อาจไม่อัปเดตในขั้นตอนที่ 2 ให้แจ้ง user ไว้ พร้อมแนะนำให้รัน `backlog-sync-check` ก่อนถ้าต้องการความมั่นใจว่า Feature List อ้างอิงสถานะที่ถูกต้องจริง

ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
