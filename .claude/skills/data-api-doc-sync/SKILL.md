---
name: data-api-doc-sync
description: สร้าง/ปรับปรุงเอกสาร Database Schema (conceptual ER diagram + รายละเอียดตาราง) และ API Spec (conceptual operation contract ของ Domain Logic Layer ไม่ใช่ REST endpoint จริง เพราะแอปนี้ไม่มี backend) ที่ .docs/02-design/02-technical/database-schema.md และ api-spec.md ใช้เมื่อ user ขอให้สร้าง/ปรับปรุง database schema, ER diagram, หรือ API spec หรือเรียกผ่าน /data-api-doc-sync โดยตรง
---

Skill นี้จัดการ workflow ของการสร้าง/ปรับปรุงเอกสาร 2 ชนิดสำหรับโปรเจกต์ "My Today Project": **Database Schema** (conceptual/logical ER diagram + รายละเอียดแต่ละตาราง) และ **API Spec** (conceptual operation contract) ทั้งคู่ต้อง**ไม่ผูกมัดกับ technical stack** เหมือนกับ `architecture-doc-sync` — ห้ามระบุ SQL dialect เฉพาะเจาะจง (Postgres/MySQL), ORM, หรือ Web API เฉพาะเจาะจง (LocalStorage/IndexedDB) ในเนื้อหาหลัก ใช้เฉพาะเชิงอรรถ "หมายเหตุการ implement ปัจจุบัน" เท่านั้น ทำตามลำดับนี้ทุกครั้ง อย่าข้ามขั้นตอน และอย่าเรียก subagent ก่อนที่จุดไม่ชัดเจนจะถูก clarify กับ user แล้ว

## 1. อ่านแหล่งข้อมูลต้นทาง

อ่านไฟล์เหล่านี้ให้ครบก่อนเริ่มวิเคราะห์:

- `.docs/02-design/02-technical/architecture.md` — เอกสาร High-Level Architecture ที่มีอยู่แล้ว (Core Domain Concepts ในหัวข้อ 3 คือจุดเริ่มต้นความสัมพันธ์ระหว่าง entity ที่เอกสารนี้ต้องขยายรายละเอียดต่อในระดับ field/operation) — **ห้ามขัดแย้งกับความสัมพันธ์ที่ระบุไว้ในนั้น**
- `.docs/01-requirements/01-spec/20260806-008-my-today-functional-requirements-master.md` — ตาราง FR-ID
- `.docs/01-requirements/feature-list.md` และ `.docs/01-requirements/backlog.md` — MoSCoW/สถานะต่อ Sprint
- ไฟล์ spec แต่ละ Sprint ที่เกี่ยวข้อง (Business Rules ของแต่ละ entity, field ที่ต้องมี, field ที่ optional, cascading rule)
- `src/types.ts` — อ่านเพื่อ**เข้าใจ field/relationship จริงเท่านั้น** ห้ามคัดลอก TypeScript syntax ลงในเอกสาร conceptual ตรงๆ (แปลงเป็นชื่อ type ทั่วไปแทน เช่น `string` → Text, `boolean` → Boolean, `Priority` enum → Enum)
- ถ้ามีอยู่แล้ว: `.docs/02-design/02-technical/database-schema.md` และ `api-spec.md` เดิม — อ่านเพื่อรักษาการตัดสินใจที่ user เคย confirm ไว้ในรอบก่อน แทนที่จะเขียนใหม่หมดทุกครั้ง

## 2. เช็ค backlog แบบเบาๆ (ไม่ deep-audit)

เหมือนกับ `architecture-doc-sync`/`feature-journey-sync` — อ่าน `backlog.md` ตามสภาพ ไม่เรียก `backlog-sync-check` อัตโนมัติทุกครั้ง แค่สังเกตสัญญาณว่า backlog อาจไม่อัปเดต แล้วจดไว้เป็นหมายเหตุที่จะแจ้ง user ตอนสรุปผล ไม่ต้องหยุดรอ ไม่ต้องแก้ backlog.md เอง

## 3. ถามเมื่อไม่แน่ใจ (ต้องมีตัวเลือก ≥3 แนวทางเสมอ พร้อมข้อดี/ข้อเสีย)

ถ้าจุดใดในการออกแบบเอกสารยังไม่ชัดเจนพอจะเขียนได้จริง (เช่น entity ใหม่ที่ยังไม่มีใน `architecture.md`, field ที่ spec ไม่ได้ระบุ type ชัดเจน, ระดับความละเอียดของ operation contract ต่อ entity, จะรวม entity ที่ยังไม่ build (Sprint 9-10) เข้าเป็นส่วนหนึ่งของ schema หลักหรือแยกเป็น "planned extension" ต่างหาก) ให้ถาม user ด้วย AskUserQuestion เสมอ — ทุกคำถามต้องแนบแนวทางให้เลือกอย่างน้อย 3 แนวทาง พร้อมเหตุผล/ข้อดี/ข้อเสียของแต่ละแนวทาง และมีคำแนะนำที่ดีที่สุดพร้อมเหตุผลกำกับไว้เสมอ (ตัวเลือก "อื่นๆ" มีให้อัตโนมัติอยู่แล้ว ไม่ต้องเพิ่มเอง)

ทำซ้ำขั้นตอนนี้จนกว่าจะมั่นใจว่าเนื้อหาเพียงพอจะเขียนเอกสารได้จริงโดยไม่ต้องเดาเอง

## 4. ส่งต่อให้ subagent `data-api-writer` เขียนไฟล์จริง

เรียก Agent tool โดยใช้ `subagent_type: "data-api-writer"` พร้อม prompt ที่ประกอบด้วย (subagent นี้จะไม่ถาม user เอง ต้องส่งข้อมูลที่ confirm แล้วให้ครบ):

- วันที่ปัจจุบันในรูปแบบ `YYYYMMDD` (ดึงจาก currentDate ใน system context ของบทสนทนานี้ — ห้ามให้ subagent คำนวณเอง)
- การตัดสินใจที่ clarify กับ user แล้วในขั้นตอนที่ 3 (ถ้ามี — เช่น field/entity ที่ยังไม่ชัดเจนถูกยืนยันเป็นอะไร, จะรวม Sprint ที่ยังไม่ build เข้า schema หลักหรือแยกส่วน)
- หมายเหตุเรื่อง backlog staleness จากขั้นตอนที่ 2 (ถ้ามี)
- ถ้าเป็นการอัปเดตไฟล์เดิม ให้ระบุด้วยว่าอะไรเปลี่ยนไปจากรอบก่อน (เช่น entity/field ใหม่จาก Sprint ที่เพิ่ง build เสร็จ)

## 5. รายงานสรุปให้ user

หลัง subagent ทำงานเสร็จ สรุปให้ user ทราบ:

- ไฟล์ที่สร้าง/แก้ (`database-schema.md`, `api-spec.md`, log)
- สรุปสั้นๆ ว่ามีตาราง/entity อะไรบ้างใน schema และ operation กลุ่มไหนบ้างใน API spec
- จุดที่ยังเป็น open question หรือ future extension (entity/field จาก Sprint ที่ยังไม่ build)
- ถ้าพบสัญญาณ backlog อาจไม่อัปเดตในขั้นตอนที่ 2 ให้แจ้ง user ไว้ พร้อมแนะนำให้รัน `backlog-sync-check` ก่อนถ้าต้องการความมั่นใจ

ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
