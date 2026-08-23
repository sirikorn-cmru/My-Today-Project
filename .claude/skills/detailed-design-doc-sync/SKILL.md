---
name: detailed-design-doc-sync
description: สร้าง/ปรับปรุงเอกสาร Detailed Design แบบ conceptual (ไม่ผูกกับ technical stack) ที่ .docs/02-design/02-technical/detailed-design.md มี Sequence Diagram อย่างน้อยครอบคลุม persona journey ทั้งสองและ cross-cutting operation หลักจาก api-spec.md ใช้เมื่อ user ขอให้สร้าง/ปรับปรุง detailed design หรือ sequence diagram หรือเรียกผ่าน /detailed-design-doc-sync โดยตรง
---

Skill นี้จัดการ workflow ของการสร้าง/ปรับปรุงเอกสาร **Detailed Design** (conceptual, sequence-flow level) สำหรับโปรเจกต์ "My Today Project" — เอกสารนี้ต่อยอดจาก `architecture.md` (Container) และ `api-spec.md` (operation contract) มาเป็นระดับ **sequence flow ทีละขั้นตอนจริง** ของแต่ละ scenario ต้อง**ไม่ผูกมัดกับ technical stack** เหมือนกับ `architecture-doc-sync`/`data-api-doc-sync` — ห้ามระบุชื่อ framework/library/Web API เฉพาะเจาะจงในเนื้อหาหลัก ใช้เฉพาะเชิงอรรถ "หมายเหตุการ implement ปัจจุบัน" เท่านั้น ทำตามลำดับนี้ทุกครั้ง อย่าข้ามขั้นตอน และอย่าเรียก subagent ก่อนที่จุดไม่ชัดเจนจะถูก clarify กับ user แล้ว

## 1. อ่านแหล่งข้อมูลต้นทาง

อ่านไฟล์เหล่านี้ให้ครบก่อนเริ่มวิเคราะห์:

- `.docs/02-design/02-technical/architecture.md` — Container View (หัวข้อ 2) คือชุด participant ที่ sequence diagram ทุกอันในเอกสารนี้ต้องใช้ร่วมกัน (Presentation / Domain Logic / Structured Persistence / Binary-Blob Persistence / Reminder-Notification Derivation) — **ห้ามคิดชื่อ container ใหม่**
- `.docs/02-design/02-technical/api-spec.md` — operation contract ต่อ entity + cross-cutting operations (หัวข้อ 2: Delete Life Area, Quick Capture, Organize from Inbox, List Inbox Items) คือแหล่งเนื้อหาหลักที่ต้องแตกเป็น step-by-step sequence
- `.docs/02-design/02-technical/database-schema.md` — ใช้ตรวจสอบ field/entity ให้ตรงกันตอนอธิบายแต่ละ step
- `.docs/02-design/01-prototypes/user-journey-student.md` และ `user-journey-general-person.md` — narrative ที่ต้องแปลงเป็น sequence diagram โดยตรง ไม่สร้างเรื่องเล่าใหม่
- `.docs/01-requirements/feature-list.md` และ `.docs/01-requirements/backlog.md` — สถานะ Sprint ปัจจุบัน (ใช้ตัดสินว่า flow ไหน build แล้ว วาด sequence diagram เต็ม กับ flow ไหนยังไม่ build ให้พูดถึงแบบย่อ)
- ถ้ามีอยู่แล้ว: `.docs/02-design/02-technical/detailed-design.md` เดิม — อ่านเพื่อรักษาการตัดสินใจที่ user เคย confirm ไว้ในรอบก่อน แทนที่จะเขียนใหม่หมดทุกครั้ง

## 2. เช็ค backlog แบบเบาๆ (ไม่ deep-audit)

เหมือนกับ `architecture-doc-sync`/`data-api-doc-sync`/`feature-journey-sync` — อ่าน `backlog.md` ตามสภาพ ไม่เรียก `backlog-sync-check` อัตโนมัติทุกครั้ง แค่สังเกตสัญญาณว่า backlog อาจไม่อัปเดต แล้วจดไว้เป็นหมายเหตุที่จะแจ้ง user ตอนสรุปผล ไม่ต้องหยุดรอ ไม่ต้องแก้ backlog.md เอง

## 3. ถามเมื่อไม่แน่ใจ (ต้องมีตัวเลือก ≥3 แนวทางเสมอ พร้อมข้อดี/ข้อเสีย)

ถ้าจุดใดในการออกแบบเอกสารยังไม่ชัดเจนพอจะเขียนได้จริง (เช่น scenario/flow ใหม่ที่ยังไม่เคยมีใน api-spec.md/user-journey docs, ระดับความละเอียดของ step ต่อ diagram, จะรวม flow จาก Sprint ที่ยังไม่ build เข้าเอกสารหลักหรือแยกเป็นส่วนย่อย) ให้ถาม user ด้วย AskUserQuestion เสมอ — ทุกคำถามต้องแนบแนวทางให้เลือกอย่างน้อย 3 แนวทาง พร้อมเหตุผล/ข้อดี/ข้อเสียของแต่ละแนวทาง และมีคำแนะนำที่ดีที่สุดพร้อมเหตุผลกำกับไว้เสมอ (ตัวเลือก "อื่นๆ" มีให้อัตโนมัติอยู่แล้ว ไม่ต้องเพิ่มเอง)

ทำซ้ำขั้นตอนนี้จนกว่าจะมั่นใจว่าเนื้อหาเพียงพอจะเขียนเอกสารได้จริงโดยไม่ต้องเดาเอง

## 4. ส่งต่อให้ subagent `detailed-design-writer` เขียนไฟล์จริง

เรียก Agent tool โดยใช้ `subagent_type: "detailed-design-writer"` พร้อม prompt ที่ประกอบด้วย (subagent นี้จะไม่ถาม user เอง ต้องส่งข้อมูลที่ confirm แล้วให้ครบ):

- วันที่ปัจจุบันในรูปแบบ `YYYYMMDD` (ดึงจาก currentDate ใน system context ของบทสนทนานี้ — ห้ามให้ subagent คำนวณเอง)
- การตัดสินใจที่ clarify กับ user แล้วในขั้นตอนที่ 3 (ถ้ามี)
- หมายเหตุเรื่อง backlog staleness จากขั้นตอนที่ 2 (ถ้ามี)
- ถ้าเป็นการอัปเดตไฟล์เดิม ให้ระบุด้วยว่าอะไรเปลี่ยนไปจากรอบก่อน (เช่น flow ใหม่ที่เพิ่งเกี่ยวข้องจาก Sprint ที่เพิ่ง build เสร็จ ต้องเปลี่ยนจาก "ย่อ" เป็น sequence diagram เต็ม)

## 5. รายงานสรุปให้ user

หลัง subagent ทำงานเสร็จ สรุปให้ user ทราบ:

- ไฟล์ที่สร้าง/แก้ (`detailed-design.md`, log)
- รายชื่อ sequence diagram ที่มีในเอกสาร (persona journey + cross-cutting operation)
- จุดที่ยังเป็น open question หรือ future extension (flow จาก Sprint ที่ยังไม่ build)
- ถ้าพบสัญญาณ backlog อาจไม่อัปเดตในขั้นตอนที่ 2 ให้แจ้ง user ไว้ พร้อมแนะนำให้รัน `backlog-sync-check` ก่อนถ้าต้องการความมั่นใจ

ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
