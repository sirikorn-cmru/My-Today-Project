---
name: architecture-doc-sync
description: สร้าง/ปรับปรุงเอกสาร High-Level Architecture แบบ conceptual (ไม่ผูกกับ technical stack) ที่ .docs/02-design/02-technical/architecture.md ใช้ C4 Model (Context + Container) พร้อม data flow ตาม user journey ที่มีอยู่แล้ว ใช้เมื่อ user ขอให้สร้าง/ปรับปรุง high-level architecture หรือ conceptual architecture หรือเรียกผ่าน /architecture-doc-sync โดยตรง
---

Skill นี้จัดการ workflow ของการสร้าง/ปรับปรุงเอกสาร **High-Level Architecture (conceptual)** สำหรับโปรเจกต์ "My Today Project" — เอกสารนี้ต้อง**ไม่ผูกมัดกับ technical stack** (ห้ามพูดถึง React/Vite/TypeScript/Tailwind หรือ Web API เฉพาะเจาะจงอย่าง LocalStorage/IndexedDB ในเนื้อหาหลัก — ถ้าจำเป็นต้องอ้างอิงให้ใส่เป็นเชิงอรรถ/หมายเหตุแยกต่างหากว่า "ปัจจุบัน implement ด้วย...") ทำตามลำดับนี้ทุกครั้ง อย่าข้ามขั้นตอน และอย่าเรียก subagent ก่อนที่จุดไม่ชัดเจนจะถูก clarify กับ user แล้ว

## 1. อ่านแหล่งข้อมูลต้นทาง

อ่านไฟล์เหล่านี้ให้ครบก่อนเริ่มวิเคราะห์:

- ส่วน "Project purpose" ใน `CLAUDE.md` — เป้าหมายผลิตภัณฑ์, target user, การตัดสินใจว่าไม่มี backend/client-side only, รายการที่ explicitly out of scope (AI, external service integration ใดๆ)
- `.docs/01-requirements/01-spec/20260806-008-my-today-functional-requirements-master.md` — ตาราง FR-ID ทั้งหมด
- `.docs/01-requirements/feature-list.md` — MoSCoW + สถานะต่อ Sprint (ถ้ามีอยู่แล้ว)
- `.docs/01-requirements/backlog.md` — สถานะ build จริงของแต่ละ Sprint
- `.docs/02-design/01-prototypes/user-journey-*.md` ทุกไฟล์ — นี่คือแหล่งข้อมูลหลักของ **data flow ตาม user journey** ตามที่ user ยืนยันไว้ (ต่อยอดจากไฟล์เหล่านี้ ไม่สร้างเรื่องเล่าใหม่)
- `src/types.ts` — อ่านเพื่อ**เข้าใจความสัมพันธ์ระหว่าง entity เท่านั้น** (เช่น Task ↔ Life Area ↔ File) ห้ามคัดลอก syntax/field-level TypeScript ลงในเอกสาร conceptual ตรงๆ
- ถ้ามีอยู่แล้ว: `.docs/02-design/02-technical/architecture.md` เดิม — อ่านเพื่อรักษาชื่อ Container/การตัดสินใจที่ user เคย confirm ไว้ในรอบก่อน แทนที่จะเขียนใหม่หมดทุกครั้ง

## 2. เช็ค backlog แบบเบาๆ (ไม่ deep-audit)

เหมือนกับ `feature-journey-sync` — อ่าน `backlog.md` ตามสภาพ ไม่เรียก `backlog-sync-check` อัตโนมัติทุกครั้ง แค่สังเกตสัญญาณว่า backlog อาจไม่อัปเดต (เช่น entry "เสร็จแล้ว" ที่ไม่มีบันทึกตรวจสอบเลย) แล้วจดไว้เป็นหมายเหตุที่จะแจ้ง user ตอนสรุปผล ไม่ต้องหยุดรอ ไม่ต้องแก้ backlog.md เอง

## 3. ถามเมื่อไม่แน่ใจ (ต้องมีตัวเลือก ≥3 แนวทางเสมอ พร้อมข้อดี/ข้อเสีย)

ถ้าจุดใดในการออกแบบเอกสารยังไม่ชัดเจนพอจะเขียนได้จริง (เช่น จะตั้งชื่อ/แบ่งขอบเขต Container ไหนเป็นพิเศษ, ระดับความละเอียดของ data-flow diagram ต่อ journey, จะรวม Sprint 8-11 ที่ยังไม่ build เข้ามาเป็น "extension point" ในไดอะแกรมหลักหรือแยกเป็น section ต่างหาก) ให้ถาม user ด้วย AskUserQuestion เสมอ — ทุกคำถามต้องแนบแนวทางให้เลือกอย่างน้อย 3 แนวทาง พร้อมเหตุผล/ข้อดี/ข้อเสียของแต่ละแนวทาง และมีคำแนะนำที่ดีที่สุดพร้อมเหตุผลกำกับไว้เสมอ (ตัวเลือก "อื่นๆ" มีให้อัตโนมัติอยู่แล้ว ไม่ต้องเพิ่มเอง)

ทำซ้ำขั้นตอนนี้จนกว่าจะมั่นใจว่าเนื้อหาเพียงพอจะเขียนเอกสารได้จริงโดยไม่ต้องเดาเอง

## 4. ส่งต่อให้ subagent `architecture-writer` เขียนไฟล์จริง

เรียก Agent tool โดยใช้ `subagent_type: "architecture-writer"` พร้อม prompt ที่ประกอบด้วย (subagent นี้จะไม่ถาม user เอง ต้องส่งข้อมูลที่ confirm แล้วให้ครบ):

- วันที่ปัจจุบันในรูปแบบ `YYYYMMDD` (ดึงจาก currentDate ใน system context ของบทสนทนานี้ — ห้ามให้ subagent คำนวณเอง)
- การตัดสินใจที่ clarify กับ user แล้วในขั้นตอนที่ 3 (ชื่อ/ขอบเขต Container ถ้ามีการปรับจาก default, ระดับความละเอียดของ data flow, วิธีจัดการ Sprint ที่ยังไม่ build)
- หมายเหตุเรื่อง backlog staleness จากขั้นตอนที่ 2 (ถ้ามี)
- ถ้าเป็นการอัปเดตไฟล์เดิม ให้ระบุด้วยว่าอะไรเปลี่ยนไปจากรอบก่อน (เช่น Sprint ใหม่ที่ build เสร็จแล้ว ต้องย้ายจาก "แผนในอนาคต" เป็นส่วนหนึ่งของ Container/flow จริง)

## 5. รายงานสรุปให้ user

หลัง subagent ทำงานเสร็จ สรุปให้ user ทราบ:

- ไฟล์ที่สร้าง/แก้ (`architecture.md`, log)
- โครงสร้าง Context/Container ที่ได้ (สรุปสั้นๆ ว่ามี Container อะไรบ้าง)
- จุดที่ยังเป็น open question หรือ future extension (Sprint ที่ยังไม่ build)
- ถ้าพบสัญญาณ backlog อาจไม่อัปเดตในขั้นตอนที่ 2 ให้แจ้ง user ไว้ พร้อมแนะนำให้รัน `backlog-sync-check` ก่อนถ้าต้องการความมั่นใจ

ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
