---
name: feature-journey-intake
description: สร้างหรืออัปเดต .docs/01-requirements/feature-list.md และ .docs/01-requirements/user-journey.md ซึ่งเป็นเอกสารกลาง (flat file เหมือน backlog.md) รวม Feature ทั้งหมดและ End-to-end User Journey แยกตาม Persona จากทุก Sprint spec ที่มีอยู่ ถามว่าจะ regenerate ทั้งหมดหรืออัปเดตเฉพาะ Sprint ที่เปลี่ยน แล้วส่งให้ subagent เขียนไฟล์จริง ใช้เมื่อ user ขอสร้าง/อัปเดต Feature List หรือ User Journey เป็นเอกสารถาวร (ไม่ใช่แค่ derive ชั่วคราวตอนทำ Prototype) หรือเรียกผ่าน /feature-journey-intake โดยตรง
---

Skill นี้สร้างหรืออัปเดตเอกสารกลางสองไฟล์ของโปรเจกต์ "My Today Project": `.docs/01-requirements/feature-list.md` (Feature List) และ `.docs/01-requirements/user-journey.md` (User Journey แยกตาม Persona) ทั้งสองไฟล์เป็น flat file ระดับเดียวกับ `backlog.md` ไม่ใช่ spec ของ Sprint ไหนโดยเฉพาะ และเป็นเอกสาร "living" ที่ต้อง regenerate ให้ตรงกับ spec ปัจจุบันเสมอ ไม่ใช่เอกสารแบบ append ประวัติเหมือน spec doc

## 1. กำหนดโหมด: Regenerate ทั้งหมด หรืออัปเดตเฉพาะ Sprint

- Glob เช็คว่ามี `.docs/01-requirements/feature-list.md` และ `.docs/01-requirements/user-journey.md` อยู่แล้วหรือไม่
- **ยังไม่มีทั้งคู่ (ครั้งแรก):** โหมด full regeneration จากทุก spec ที่มีอยู่ ไม่ต้องถาม user
- **มีอยู่แล้ว:**
  - ถ้า user ระบุมาว่า Sprint ไหนเพิ่ง/มีการแก้ไข (เช่น "เพิ่ง requirement-intake Sprint ใหม่ ช่วยอัปเดต feature list ด้วย") ใช้โหมด incremental update เฉพาะ Sprint นั้น ไม่ต้องถาม
  - ถ้า user แค่บอกว่า "อัปเดต feature list/user journey หน่อย" แบบกว้างๆ ไม่ระบุ ให้ถามว่าต้องการ:
    1. **อัปเดตเฉพาะ Sprint ที่เปลี่ยนล่าสุด** — เร็ว ไม่กระทบส่วนอื่น แต่ถ้ามีหลาย Sprint ที่เปลี่ยนสะสมมานานอาจตกหล่น
    2. **Regenerate ทั้งหมดใหม่** — ชัวร์ที่สุดว่าตรงกับทุก spec ปัจจุบัน แต่ใช้เวลานานกว่าและอาจ overwrite ถ้อยคำที่เคยปรับด้วยมือในไฟล์เดิม
  - แนะนำตามสถานการณ์: ถ้ามีการแก้ spec หลาย Sprint สะสมมา หรือไม่แน่ใจว่า feature-list/user-journey ตรงกับปัจจุบันแค่ไหน แนะนำ regenerate ทั้งหมด; ถ้าเพิ่งอัปเดตไม่นานและมีแค่ Sprint เดียวที่เปลี่ยน แนะนำ incremental

## 2. เรียก subagent `feature-journey-writer` ให้เขียนไฟล์จริง

เรียก Agent tool ด้วย `subagent_type: "feature-journey-writer"` พร้อมส่ง:

- โหมด (full regeneration / incremental) และถ้า incremental ให้ระบุ path ของ spec ที่อยู่ในขอบเขตชัดเจน
- วันที่ปัจจุบันแบบ `YYYYMMDD`

subagent จะอ่าน spec ที่เกี่ยวข้องเอง แล้วสร้าง/อัปเดตทั้งสองไฟล์ พร้อม log

## 3. รายงานผลให้ user

- สรุปว่าอัปเดตไฟล์ไหนบ้าง เป็นแบบ full หรือ incremental ครอบคลุม Sprint ไหน
- ถ้าเป็นครั้งแรกที่สร้าง (ยังไม่มีไฟล์มาก่อน) แจ้ง user ด้วยว่าตอนนี้ `test-intake` และ `prototype-intake` จะเริ่มอ้างอิงไฟล์เหล่านี้ได้แล้ว
- ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
