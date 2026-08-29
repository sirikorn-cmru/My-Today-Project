---
name: project-plan-intake
description: สร้างหรืออัปเดต .docs/01-requirements/02-plan/project-plan.md — เอกสาร Project Plan ที่จัดกลุ่ม Sprint ทั้งหมดของโปรเจกต์เข้าเป็น Phase ระดับสูง (ปัจจุบัน 2 Phase ตาม CLAUDE.md: Version 1/Core และ Competition Track) พร้อมคำอธิบายและสถานะที่ roll-up มาจาก backlog.md ถามผู้ใช้เมื่อไม่ชัดเจนว่าจะ regenerate ทั้งหมดหรือแค่ refresh สถานะ แล้วส่งให้ subagent project-plan-writer เขียนไฟล์จริง ใช้เมื่อ user ขอสร้าง/ปรับปรุง Project Plan หรือแบ่ง Phase การทำงาน หรือเรียกผ่าน /project-plan-intake โดยตรง
---

Skill นี้สร้างหรืออัปเดตเอกสาร `.docs/01-requirements/02-plan/project-plan.md` ของโปรเจกต์ "My Today Project" — เอกสาร **Project Plan** ที่จัดกลุ่ม Sprint ทั้งหมด (ที่มีอยู่แล้วใน `backlog.md`) เข้าเป็น **Phase ระดับสูง** พร้อมคำอธิบายสั้นๆ ต่อ Phase, รายการ Sprint ที่อยู่ใน Phase นั้น, และสถานะ roll-up จาก `backlog.md` — **ไม่ใช่** timeline/milestone/dependency breakdown (ผู้ใช้ยืนยันแล้วว่าต้องการเวอร์ชันกระชับแบบนี้เท่านั้น)

เอกสารนี้เป็น living document ที่ regenerate ให้ตรงกับ `CLAUDE.md`/`backlog.md` ปัจจุบันเสมอ เหมือน `architecture.md`/`feature-list.md`/`test-plan.md` ไม่ใช่ประวัติสะสม

## 1. กำหนดว่า "Phase" คืออะไร

**ค่าเริ่มต้นที่ยืนยันแล้วกับ user:** Phase = การจัดกลุ่ม Sprint ที่มีอยู่แล้วตาม track ที่ `CLAUDE.md` section "Project purpose" ระบุไว้ (ปัจจุบันคือ 2 Phase: Phase 1 Version 1/Core = Sprint 1-6, Phase 2 Competition Track = Sprint 7-11) — **ไม่ใช่** การแตก Sprint ที่เหลือเป็น task ย่อยใน `03-task/`, และ**ไม่ใช่** Phase ใหม่ที่ผู้ใช้กำหนดเองแบบไม่ผูกกับ Sprint เดิม

ถ้า user ขอ Phase breakdown แบบอื่นนอกเหนือจากนี้ (เช่น "แบ่งตามทีม", "แบ่งตามไตรมาส") ให้ถามใหม่พร้อมเสนอ ≥3 แนวทางพร้อมข้อดี/ข้อเสียก่อนดำเนินการ อย่าเดาเอง — ไม่ใช่เงื่อนไขบังคับให้ต้องถามทุกครั้ง แค่เมื่อ user ระบุแนวทางที่ต่างจากค่าเริ่มต้นนี้

## 2. กำหนดโหมด: Full regeneration หรือ Status-only refresh

- Glob เช็คว่ามี `.docs/01-requirements/02-plan/project-plan.md` อยู่แล้วหรือไม่
- **ยังไม่มี (ครั้งแรก):** โหมด full regeneration ไม่ต้องถาม user
- **มีอยู่แล้ว:**
  - ถ้า user แค่ขอ "อัปเดตให้ตรงกับสถานะปัจจุบัน" หรือคล้ายกัน → โหมด **status-only refresh** (Phase boundary/คำอธิบายเดิมไม่เปลี่ยน แค่คำนวณสถานะ roll-up ใหม่จาก `backlog.md`)
  - ถ้า user ขอเปลี่ยนตัว Phase เอง (เช่น เพิ่ม Phase ที่ 3) → โหมด full regeneration พร้อม Phase boundary ใหม่ที่ user ยืนยันแล้ว
  - ถ้า user บอกกว้างๆ ไม่ระบุ → แนะนำ status-only refresh เป็นค่าเริ่มต้น (Phase boundary ไม่ได้เปลี่ยนบ่อย ผูกกับ track ของโปรเจกต์ ไม่ใช่ราย Sprint)

## 3. เรียก subagent `project-plan-writer`

เรียก Agent tool ด้วย `subagent_type: "project-plan-writer"` พร้อมส่ง:

- โหมด (full regeneration / status-only refresh)
- วันที่ปัจจุบันแบบ `YYYYMMDD`

subagent จะอ่าน `CLAUDE.md` (Project purpose) และ `backlog.md` เอง แล้วสร้าง/อัปเดตไฟล์ พร้อม log — subagent มีหน้าที่ตรวจสอบตัวเองว่าไม่ได้เพิ่ม timeline/milestone/dependency เกินขอบเขตที่ตกลงไว้

## 4. รายงานผลให้ user

- สรุปว่าเป็น full regeneration หรือ status-only refresh, แต่ละ Phase มีสถานะ roll-up อะไร (พร้อมจำนวน Sprint ที่เสร็จ/ทั้งหมด)
- ถ้าสถานะของ Phase ไหนเปลี่ยนจากรอบก่อน (เช่น จาก "กำลังดำเนินการ" เป็น "เสร็จแล้ว") ให้ชี้ให้ user เห็นชัดๆ
- ไม่ต้อง push ขึ้น GitHub เองโดยอัตโนมัติ — ถามยืนยันกับ user ก่อนเสมอ ตาม convention ที่กำหนดไว้ใน `CLAUDE.md`
