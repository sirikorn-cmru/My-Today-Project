---
name: test-intake
description: รับคำขอสร้างหรืออัปเดต Acceptance Criteria (acceptance-criteria.md แบบ Given-When-Then ต่อ Backlog Item), Test Plan (test-plan.md ภาพรวมกลยุทธ์ทดสอบ 1 ไฟล์ต่อโปรเจกต์), และ Test Case (test-cases/{feature-slug}.md แบบ step-by-step ต่อ Sprint) ทั้งหมดหรือเฉพาะเจาะจงตามที่ user ระบุ โดยอ้างอิง Requirement, Backlog, Feature List, และ User Journey จัดลำดับให้ AC เสร็จก่อน Test Case เสมอ (เพราะ Test Case อ้างอิง AC) แล้วส่งให้ subagent ที่เกี่ยวข้องเขียนไฟล์จริง ใช้เมื่อ user ขอสร้าง/ปรับปรุง Acceptance Criteria, Test Plan, หรือ Test Case หรือเรียกผ่าน /test-intake โดยตรง
---

Skill นี้จัดการคำขอสร้าง/อัปเดตเอกสารทดสอบ 3 ประเภทของโปรเจกต์ "My Today Project" ใต้ `.docs/03-testing/01-test-plan/`:

| เอกสาร | Path | ลักษณะ |
|---|---|---|
| Acceptance Criteria | `acceptance-criteria.md` | ไฟล์เดียว, 1 section ต่อ Backlog Item, เขียนแบบ Given-When-Then |
| Test Plan | `test-plan.md` | ไฟล์เดียวต่อโปรเจกต์ทั้งหมด (scope, ประเภทการทดสอบ, environment, risk management, entry/exit criteria) |
| Test Case | `test-cases/{feature-slug}.md` | 1 ไฟล์ต่อ Backlog Item (Sprint) — `{feature-slug}` = slug ของ Sprint นั้น รวมทุก feature ของ Sprint ไว้เป็น section ในไฟล์เดียว แบบ step-by-step |

ทั้งสามอย่างเป็นเอกสาร "living" ที่ regenerate/อัปเดตให้ตรงกับ spec ปัจจุบันเสมอ ไม่ใช่ append ประวัติแบบ spec doc

## 1. กำหนดว่าต้องการเอกสารไหนบ้าง

- ถ้า user ระบุมาว่าต้องการแค่บางอย่าง (เช่น "ทำแค่ Test Case ของ Sprint 3") ทำตามนั้น
- ถ้า user ขอแบบรวม ("ทำ Test Plan, Test Case, Acceptance Criteria") ให้ทำครบทั้ง 3 ตามลำดับ dependency ในขั้นตอนที่ 3

## 2. กำหนดขอบเขต (Scope: ทุก Backlog Item หรือเฉพาะเจาะจง)

- ถ้า user ระบุ Sprint/backlog item ที่ต้องการมาแล้ว ใช้ตามนั้น
- ถ้า user บอกกว้างๆ ไม่ระบุ ให้ถามพร้อมเสนอ ≥3 แนวทางพร้อมข้อดี/ข้อเสีย เช่น:
  1. เฉพาะ Sprint ที่เพิ่งพูดถึงล่าสุด — เร็ว โฟกัส แต่ไม่ครอบคลุม Sprint อื่น
  2. ทุก Sprint ที่ build แล้วตาม `backlog.md` — ทดสอบได้จริงตอนนี้ทันที แต่ไม่มี AC/Test Case รอไว้ล่วงหน้าสำหรับ Sprint ที่ยังไม่ build
  3. ทุก Backlog Item ที่มี spec แล้วทั้งหมด (ไม่รวม Functional Requirements Master List ซึ่งไม่ใช่ Sprint) — ครบถ้วนที่สุด แต่ไฟล์เยอะและใช้เวลานาน ควรเสนอรายการไฟล์ที่จะสร้างให้ user เห็นก่อนลงมือ (ดูขั้นตอนที่ 4)
- ตรวจว่า `.docs/01-requirements/feature-list.md` และ `.docs/01-requirements/user-journey.md` มีอยู่หรือไม่ (Glob) — ถ้าไม่มี แจ้ง user สั้นๆ ว่าจะได้ผลลัพธ์ที่ derive ตรงจาก spec เอง (ไม่มี cross-reference ไปสองไฟล์นี้) และถามว่าจะรัน `feature-journey-intake` ก่อนไหม หรือทำต่อแบบไม่มีก็ได้ — ไม่ใช่เงื่อนไขบังคับ

## 3. ลำดับ Dependency: AC ต้องเสร็จก่อน Test Case เสมอ

- **Test Plan** (`test-plan.md`) เป็นเอกสารระดับโปรเจกต์ ไม่ขึ้นกับ AC — สร้าง/อัปเดตเมื่อไหร่ก็ได้ ไม่ต้องรอ
- **Acceptance Criteria** (`acceptance-criteria.md`) ต้องมี section ของ Sprint นั้นอยู่แล้ว **ก่อน** จะสร้าง Test Case ของ Sprint นั้นได้
- ถ้า user ขอ Test Case ของ Sprint ที่ `acceptance-criteria.md` ยังไม่มี section (หรือไฟล์ยังไม่มีเลย) ให้สร้าง/อัปเดต AC ของ Sprint นั้นก่อนโดยอัตโนมัติ (ไม่ต้องถาม user เพราะเป็นเรื่องลำดับขั้นตอน ไม่ใช่การตัดสินใจ) แล้วค่อยทำ Test Case ต่อ

## 4. เสนอแผนก่อนถ้าเป็นงานใหญ่

ถ้าขอบเขตคือ "ทุก Backlog Item" (ไฟล์จำนวนมาก) ให้สรุปรายการไฟล์ที่จะสร้าง/แก้ (กี่ Sprint, จะได้ test-cases กี่ไฟล์) ให้ user เห็นก่อน แล้วรอ confirm ก่อนเรียก subagent จริง — ถ้าขอบเขตแคบ (Sprint เดียวหรือไม่กี่ Sprint) ไม่ต้องหยุดรอ ทำแล้วรายงานผลได้เลย

## 5. เรียก subagent ตามลำดับ

- **`test-plan-writer`** (ถ้าต้องการ Test Plan) — ส่ง mode (full refresh / targeted section update) และวันที่ปัจจุบันแบบ `YYYYMMDD`
- **`acceptance-criteria-writer`** (ถ้าต้องการ AC หรือจำเป็นต่อ Test Case) — ส่ง mode (full regeneration / เฉพาะ Sprint ไหน), path ของ spec ที่เกี่ยวข้อง, วันที่ปัจจุบัน
- **`test-case-writer`** (ถ้าต้องการ Test Case) — เรียก **หลังจาก** `acceptance-criteria-writer` เสร็จสำหรับ Sprint นั้นแล้วเท่านั้น ส่ง path ของ spec, ยืนยันว่า AC section พร้อมแล้ว, ว่า `user-journey.md` มีอยู่หรือไม่, วันที่ปัจจุบัน, และว่าเป็นไฟล์ใหม่หรือแก้ไฟล์เดิม (Glob เช็ค `.docs/03-testing/01-test-plan/test-cases/{slug}.md` ก่อนส่ง)

## 6. รายงานผลให้ user

- สรุปไฟล์ที่สร้าง/แก้ไขทั้งหมด แยกตามประเภท (AC / Test Plan / Test Case) พร้อมจำนวน scenario/test case ที่ได้
- ถ้ามี Sprint ไหนถูกข้ามเพราะยังไม่มี prototype หรือ user-journey.md ให้แจ้งเป็นข้อสังเกต (ไม่ใช่ error)
- ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
