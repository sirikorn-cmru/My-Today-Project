---
name: architecture-intake
description: สร้างหรืออัปเดต .docs/02-design/02-technical/architecture.md — เอกสาร High-Level Architecture แบบ conceptual ที่ไม่ผูกกับ technical stack (Conceptual Components, Conceptual Data Model, Data Flow ตาม User Journey) จาก spec และ user-journey.md ถามว่าจะ regenerate ทั้งหมดหรืออัปเดตเฉพาะ Sprint ที่เปลี่ยน แล้วส่งให้ subagent เขียนไฟล์จริง ใช้เมื่อ user ขอสร้าง/ปรับปรุงเอกสาร architecture ระดับสูง หรือเรียกผ่าน /architecture-intake โดยตรง
---

Skill นี้สร้างหรืออัปเดตเอกสารกลาง `.docs/02-design/02-technical/architecture.md` ของโปรเจกต์ "My Today Project" — เอกสาร **High-Level Architecture แบบ conceptual** ที่ตั้งใจ**ไม่ผูกกับ technical stack** (ไม่เอ่ยชื่อ framework/library/เทคโนโลยีเก็บข้อมูลใดๆ แม้โค้ดจริงจะเลือกใช้ไปแล้ว) ครอบคลุมแค่ 3 ส่วนตามที่ตกลงไว้: Conceptual Components, Conceptual Data Model, และ Data Flow ตาม User Journey — **ไม่รวม** Cross-cutting Principles, Non-goals, หรือ Technology Choices (ถ้า user อยากได้ส่วนเหล่านี้ทีหลัง ให้ถามใหม่ก่อนขยายสโคป ไม่ใช่เพิ่มเข้าไปเอง)

เอกสารนี้เป็น living document ที่ regenerate ให้ตรงกับ spec ปัจจุบันเสมอ เหมือน `feature-list.md`/`user-journey.md`/`test-plan.md` ไม่ใช่ประวัติสะสมแบบ spec doc

## 1. กำหนดโหมด: Regenerate ทั้งหมด หรืออัปเดตเฉพาะ Sprint

- Glob เช็คว่ามี `.docs/02-design/02-technical/architecture.md` อยู่แล้วหรือไม่
- **ยังไม่มี (ครั้งแรก):** โหมด full regeneration จากทุก spec ที่มีอยู่ + `user-journey.md` ไม่ต้องถาม user
- **มีอยู่แล้ว:**
  - ถ้า user ระบุมาว่า Sprint ไหนเพิ่ง/มีการแก้ไข ใช้โหมด incremental update เฉพาะ component/entity/flow ที่เกี่ยวข้องกับ Sprint นั้น ไม่ต้องถาม
  - ถ้า user บอกกว้างๆ ไม่ระบุ ให้ถามว่าต้องการ:
    1. **อัปเดตเฉพาะส่วนที่เปลี่ยน** — เร็ว ไม่กระทบส่วนอื่น แต่ถ้ามีหลาย Sprint เปลี่ยนสะสมมานานอาจตกหล่น
    2. **Regenerate ทั้งหมดใหม่** — ชัวร์ที่สุดว่าตรงกับ spec ปัจจุบันทุก component แต่ใช้เวลานานกว่า
  - แนะนำตามสถานการณ์เหมือน `feature-journey-intake`: ถ้าแก้ spec มาหลาย Sprint สะสม หรือไม่แน่ใจว่าเอกสารตรงกับปัจจุบันแค่ไหน แนะนำ regenerate ทั้งหมด; ถ้าเพิ่งอัปเดตไม่นานและมีแค่ Sprint เดียวที่เปลี่ยน แนะนำ incremental

## 2. ตรวจสอบว่ามี `user-journey.md` หรือยัง

Data Flow ส่วนที่ 3 ของเอกสารต้องอ้างอิง `.docs/01-requirements/user-journey.md` — ถ้ายังไม่มีไฟล์นี้ (ยังไม่เคยรัน `feature-journey-intake`) ให้แจ้ง user และถามว่าจะรัน `feature-journey-intake` ก่อนไหม หรือจะทำ Conceptual Components + Data Model ไปก่อนแล้วเว้น Data Flow ไว้ (ไม่ใช่เงื่อนไขบังคับเหมือน `DESIGN.md` ใน `prototype-intake` แต่ Data Flow จะทำได้ไม่ดีถ้าไม่มี user-journey.md)

## 3. เรียก subagent `architecture-writer` ให้เขียนไฟล์จริง

เรียก Agent tool ด้วย `subagent_type: "architecture-writer"` พร้อมส่ง:

- โหมด (full regeneration / incremental) และถ้า incremental ให้ระบุ path ของ spec ที่อยู่ในขอบเขตชัดเจน
- วันที่ปัจจุบันแบบ `YYYYMMDD`

subagent จะอ่าน spec และ `user-journey.md` เอง แล้วสร้าง/อัปเดตไฟล์ พร้อม log — subagent มีหน้าที่ตรวจสอบตัวเองว่าไม่มีการเอ่ยชื่อเทคโนโลยีใดๆ ในเอกสาร ถ้าพบว่า subagent เผลอใส่ชื่อ framework/library เข้าไป (เช่น "React", "LocalStorage", "IndexedDB", "Tailwind") ให้แก้ไขออกก่อนรายงาน user

## 4. รายงานผลให้ user

- สรุปว่าเป็น full regeneration หรือ incremental ครอบคลุม component/entity/flow ไหนบ้าง
- ยืนยันกับ user ว่าเอกสารไม่มีการเอ่ยชื่อ technical stack ใดๆ ตามที่ตั้งใจไว้
- ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
