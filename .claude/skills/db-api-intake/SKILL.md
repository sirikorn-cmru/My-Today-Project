---
name: db-api-intake
description: สร้างหรืออัปเดต .docs/02-design/02-technical/database-schema.md (รายละเอียดแต่ละ table/entity + ER Diagram) และ .docs/02-design/02-technical/api-spec.md (Internal Data Access Contract ต่อ Conceptual Component — ไม่ใช่ HTTP/REST API เพราะแอปนี้ client-only ไม่มี backend) ทั้งสองแบบ conceptual ไม่ผูกกับ technical stack ถามว่าจะ regenerate ทั้งหมดหรืออัปเดตเฉพาะ Sprint ที่เปลี่ยน แล้วส่งให้ subagent ที่เกี่ยวข้องเขียนไฟล์จริง ใช้เมื่อ user ขอสร้าง/ปรับปรุงเอกสาร database schema หรือ api spec หรือเรียกผ่าน /db-api-intake โดยตรง
---

Skill นี้สร้างหรืออัปเดตเอกสารกลาง 2 ไฟล์ของโปรเจกต์ "My Today Project" ใต้ `.docs/02-design/02-technical/`:

| เอกสาร | Path | ลักษณะ |
|---|---|---|
| Database Schema | `database-schema.md` | รายละเอียดแต่ละ table/entity (field, type เชิงแนวคิด, required/optional, constraint, ความสัมพันธ์) + ER Diagram ระดับ field |
| API Spec | `api-spec.md` | Internal Data Access Contract — operation (create/read/update/delete/query) ต่อ Conceptual Component **ไม่ใช่** HTTP/REST API เพราะแอปนี้ client-only ไม่มี backend |

ทั้งสองเอกสารเป็น **conceptual และ technology-agnostic** เหมือน `architecture.md` — ไม่เอ่ยชื่อ storage technology, framework, หรือ network protocol ใดๆ และเป็น living document ที่ regenerate ให้ตรงกับ spec ปัจจุบันเสมอ ไม่ใช่ประวัติสะสม

## 1. ตรวจสอบว่ามี `architecture.md` หรือยัง

ทั้งสองเอกสารนี้ควรอ้างอิง Conceptual Components และ Conceptual Data Model จาก `.docs/02-design/02-technical/architecture.md` เพื่อให้คำศัพท์/การจัดกลุ่มตรงกัน — ถ้ายังไม่มีไฟล์นี้ ให้แจ้ง user และถามว่าจะรัน `architecture-intake` ก่อนไหม หรือจะให้ subagent derive เอง (ไม่ใช่เงื่อนไขบังคับ แต่ผลลัพธ์จะสอดคล้องกับ architecture.md น้อยกว่า)

## 2. กำหนดโหมด: Regenerate ทั้งหมด หรืออัปเดตเฉพาะ Sprint

- Glob เช็คว่ามี `database-schema.md` และ `api-spec.md` อยู่แล้วหรือไม่ (เช็คแยกกัน เพราะอาจมีแค่ไฟล์เดียวที่สร้างไปแล้ว)
- **ยังไม่มี (ครั้งแรก):** โหมด full regeneration ไม่ต้องถาม user
- **มีอยู่แล้ว:** ถามเหมือน `architecture-intake`/`feature-journey-intake` — อัปเดตเฉพาะ Sprint ที่เปลี่ยน หรือ regenerate ทั้งหมด พร้อมคำแนะนำตามสถานการณ์ (แก้มาหลาย Sprint สะสม → แนะนำ regenerate ทั้งหมด; Sprint เดียวเพิ่งเปลี่ยน → แนะนำ incremental)

## 3. ตรวจสอบว่ามี `technology-choices.md` หรือยัง (optional grounding)

ถ้ามี `.docs/02-design/02-technical/technology-choices.md` อยู่แล้ว ทั้ง `database-schema-writer` และ `api-spec-writer` จะอ่านมันเพื่อ **cross-reference เท่านั้น** — เช่น ระบุว่า table/operation ของ File อ่านข้อมูลแบบ asynchronous (ต้องรอโหลด) ต่างจาก table/operation อื่นที่อ่านทันที (มาจาก Client-side Storage trade-off), หรือ wikilink ไปยัง Open/Future Decisions สำหรับ table/operation ที่ยังเป็น spec-derived เท่านั้น (Note, Link, Sprint 9-10) — **ไม่ใช่เพื่อเอ่ยชื่อเทคโนโลยี** ทั้งสองเอกสารยังคง conceptual/technology-agnostic เหมือนเดิมทุกประการ ไม่ต้องถาม user เรื่องนี้ ถ้ายังไม่มีไฟล์นี้ก็ไม่เป็นไร subagent จะข้ามส่วนนี้ไปเอง

## 4. ลำดับการเรียก subagent

- **`database-schema-writer`** ก่อนเสมอ (ถ้าต้องการ Database Schema) — เพราะ `api-spec-writer` จะอ่าน `database-schema.md` เพื่อใช้ชื่อ entity/field เดียวกัน
- **`api-spec-writer`** ต่อจากนั้น (ถ้าต้องการ API Spec) — ถ้า user ขอแค่ API Spec โดยที่ยังไม่มี `database-schema.md` เลย ให้แจ้งว่าจะได้ผลลัพธ์ที่สอดคล้องน้อยกว่า แต่ยังทำได้ (ไม่ใช่เงื่อนไขบังคับเหมือน AC→Test Case ใน `test-intake`)

ส่งให้แต่ละ subagent: โหมด (full regeneration / incremental), path ของ spec ที่เกี่ยวข้อง, วันที่ปัจจุบันแบบ `YYYYMMDD`

subagent มีหน้าที่ตรวจสอบตัวเองว่าไม่มีการเอ่ยชื่อเทคโนโลยีหรือสิ่งที่บ่ง implication ว่ามี network API จริง (`database-schema-writer` ห้ามเอ่ย LocalStorage/IndexedDB/SQL ฯลฯ, `api-spec-writer` ห้ามเอ่ย REST/HTTP verb/status code) ถ้าพบว่า subagent เผลอใส่เข้าไป ให้แก้ไขออกก่อนรายงาน user — รวมถึงถ้า cross-reference ไปยัง `technology-choices.md` กลายเป็นการสรุปเนื้อหาของมันซ้ำ ให้แก้ไขให้กระชับลงก่อนรายงาน

## 5. รายงานผลให้ user

- สรุปว่าเป็น full regeneration หรือ incremental ครอบคลุม table/component ไหนบ้าง
- ยืนยันกับ user ว่าเอกสารไม่มีการเอ่ยชื่อ technical stack หรือ network API ใดๆ ตามที่ตั้งใจไว้ และแจ้งว่ามี cross-reference ไปยัง `technology-choices.md` กี่จุด (ถ้ามี)
- ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
