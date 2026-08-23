---
name: detailed-design-intake
description: สร้างหรืออัปเดต .docs/02-design/02-technical/detailed-design.md — เอกสาร Detailed Design แบบ conceptual ไม่ผูกกับ technical stack มี Mermaid sequence diagram ต่อ operation ที่มีหลายขั้นตอน/ข้ามหลาย Conceptual Component และ state/lifecycle diagram ต่อ entity ที่มีสถานะ อ้างอิงจาก architecture.md, database-schema.md, api-spec.md ถามว่าจะ regenerate ทั้งหมดหรืออัปเดตเฉพาะ Sprint ที่เปลี่ยน แล้วส่งให้ subagent เขียนไฟล์จริง ใช้เมื่อ user ขอสร้าง/ปรับปรุงเอกสาร detailed design หรือ sequence flow หรือเรียกผ่าน /detailed-design-intake โดยตรง
---

Skill นี้สร้างหรืออัปเดตเอกสาร `.docs/02-design/02-technical/detailed-design.md` ของโปรเจกต์ "My Today Project" — เอกสาร **Detailed Design แบบ conceptual** ที่ลงรายละเอียดกว่า `architecture.md` อีกขั้น: `architecture.md` แสดง data flow **ข้าม** user journey ทั้งเส้น ส่วนเอกสารนี้แสดงลำดับขั้นตอนการทำงาน **ภายใน** operation หนึ่งตัวที่มีหลายขั้นตอน/ข้ามหลาย Conceptual Component (Sequence Diagram) และสถานะ/การเปลี่ยนสถานะของ entity ที่มี lifecycle (State/Lifecycle Diagram) — ครอบคลุมแค่ 2 ประเภท diagram นี้ตามที่ตกลงไว้ **ไม่รวม** Decision/Branching Logic breakdown แยกต่างหาก (ถ้ามีเงื่อนไขแยกกิ่งในลำดับขั้นตอน ให้แสดงเป็น alt/opt block ในตัว sequence diagram เอง ไม่ใช่ section แยก)

เอกสารนี้เป็น living document ที่ regenerate ให้ตรงกับ spec ปัจจุบันเสมอ เหมือน `architecture.md`/`database-schema.md`/`api-spec.md`

## 1. ตรวจสอบว่ามี `api-spec.md` และ `architecture.md`/`database-schema.md` หรือยัง

เอกสารนี้อ้างอิง operation จาก `api-spec.md` เป็นแหล่งหลัก และใช้คำศัพท์ component/entity จาก `architecture.md`/`database-schema.md` — ถ้ายังไม่มี `api-spec.md` ให้แจ้ง user และถามว่าจะรัน `db-api-intake` ก่อนไหม (แนะนำ เพราะไม่มี operation ให้เลือกทำ sequence diagram) หรือจะให้ subagent derive operation เองจาก spec ตรงๆ (ได้ผลลัพธ์สอดคล้องน้อยกว่า)

## 2. กำหนดโหมด: Regenerate ทั้งหมด หรืออัปเดตเฉพาะ Sprint

- Glob เช็คว่ามี `detailed-design.md` อยู่แล้วหรือไม่
- **ยังไม่มี (ครั้งแรก):** โหมด full regeneration ไม่ต้องถาม user
- **มีอยู่แล้ว:** ถามเหมือน `architecture-intake`/`db-api-intake` — อัปเดตเฉพาะ Sprint ที่เปลี่ยน หรือ regenerate ทั้งหมด พร้อมคำแนะนำตามสถานการณ์

## 3. ตรวจสอบว่ามี `technology-choices.md` หรือยัง (optional grounding)

ถ้ามี `.docs/02-design/02-technical/technology-choices.md` อยู่แล้ว `detailed-design-writer` จะอ่านมันเพื่อ **cross-reference เท่านั้น** — เช่น ระบุในบาง sequence diagram ที่มี component ตัวรวมศูนย์ (เช่น Today Dashboard) ว่าทุก component อ่านจาก state ที่เป็นเจ้าของศูนย์กลางจุดเดียว (มาจาก State Management Approach), wikilink ไปยัง Open/Future Decisions สำหรับ diagram ที่แตะ operation/entity ที่ยัง spec-derived เท่านั้น, หรือระบุว่า diagram เหล่านี้ยืนยันผลผ่าน manual test case เท่านั้น (มาจาก Testing entry) — **ไม่ใช่เพื่อเอ่ยชื่อเทคโนโลยี** เอกสารยังคง conceptual/technology-agnostic เหมือนเดิมทุกประการ ไม่ต้องถาม user เรื่องนี้ ถ้ายังไม่มีไฟล์นี้ก็ไม่เป็นไร subagent จะข้ามส่วนนี้ไปเอง

## 4. เรียก subagent `detailed-design-writer`

ส่ง: โหมด (full regeneration / incremental), path ของ spec ที่เกี่ยวข้อง, วันที่ปัจจุบันแบบ `YYYYMMDD`

subagent จะอ่าน `api-spec.md`/`architecture.md`/`database-schema.md`/`technology-choices.md` (ถ้ามี) เอง เลือก operation ที่ควรมี sequence diagram (หลายขั้นตอน/ข้าม component เท่านั้น ข้าม CRUD เดี่ยวๆ) และ entity ที่ควรมี state diagram (มี field สถานะ) แล้วสร้าง/อัปเดตไฟล์ พร้อม log — subagent มีหน้าที่ตรวจสอบตัวเองว่าไม่มีการเอ่ยชื่อเทคโนโลยีใดๆ ถ้าพบว่าเผลอใส่เข้าไป ให้แก้ไขออกก่อนรายงาน user — รวมถึงถ้า cross-reference ไปยัง `technology-choices.md` กลายเป็นการสรุปเนื้อหาซ้ำ ให้แก้ไขให้กระชับลงก่อนรายงาน

## 5. รายงานผลให้ user

- สรุปว่าเป็น full regeneration หรือ incremental, operation ไหนได้ sequence diagram, entity ไหนได้ state diagram, และ operation ไหนที่ข้ามไปเพราะเป็น CRUD เดี่ยวไม่ข้าม component (เพื่อความโปร่งใส ไม่ใช่ตกหล่น)
- ยืนยันกับ user ว่าเอกสารไม่มีการเอ่ยชื่อ technical stack ใดๆ ตามที่ตั้งใจไว้ และแจ้งว่ามี cross-reference ไปยัง `technology-choices.md` กี่จุด (ถ้ามี)
- ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
