# Project Plan

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้จัดกลุ่ม Sprint ทั้งหมดของโปรเจกต์ (ตามที่ระบุไว้แล้วใน [[../backlog|backlog.md]]) เข้าเป็น **Phase ระดับสูง** ตาม track ที่ `CLAUDE.md` section "Project purpose" กำหนดไว้ — เป็นเวอร์ชันกระชับ: คำอธิบาย Phase + รายการ Sprint ที่อยู่ใน Phase นั้น + สถานะ roll-up เท่านั้น **ไม่มี** timeline/milestone/dependency breakdown (ขอบเขตที่ตกลงไว้)

เอกสารนี้เป็น **living document** — regenerate ให้ตรงกับ `CLAUDE.md` (Phase/track boundary) และ [[../backlog|backlog.md]] (สถานะ Sprint) เสมอทุกครั้งที่รัน `project-plan-intake`, ไม่ใช่ประวัติสะสม ดู [[../01-spec/index|01-spec]] สำหรับรายละเอียด requirement ของแต่ละ Sprint

---

## Phase 1: Version 1 / Core

Core ของแอปที่ตอบคำถาม "วันนี้ต้องทำอะไร" ให้ครบก่อน — Today Dashboard (mock data) → Task Management (ข้อมูลจริง, LocalStorage) → Calendar & Schedule → File Organizer (IndexedDB) → Notification & Deadline Awareness → Integration/UX/legal-compliance polish + เตรียม Deploy บน Vercel ปิดจบด้วยการพิสูจน์ Final User Journey แบบ end-to-end ครบทั้งสอง persona (นักศึกษา และบุคคลทั่วไป) ผ่าน Core เดียวกัน

**สถานะ: เสร็จแล้ว (6/6 Sprint เสร็จแล้ว)**

- [[../01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1: Today Dashboard]] — เสร็จแล้ว
- [[../01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2: Task Management]] — เสร็จแล้ว
- [[../01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3: Calendar & Schedule]] — เสร็จแล้ว
- [[../01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4: File Organizer]] — เสร็จแล้ว
- [[../01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5: Notification & Deadline Awareness]] — เสร็จแล้ว
- [[../01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]] — เสร็จแล้ว

## Phase 2: Competition Track / Version 2

ต่อยอดจาก Core เดิมโดยไม่แก้โครงสร้างหลัก — เริ่มด้วย Life Area & Personal Profile (retrofit ข้าม Sprint 1-2 เดิม เป็น prerequisite ของ Sprint ที่เหลือทั้งหมด) ตามด้วย Universal Inbox + Quick Capture (เพิ่ม entity Note/Link), Now/Next/Later Timeline + Smart Priority + Life Progress, การเชื่อม Task-Event-File-Note-Link ข้าม entity พร้อม custom reminder lead time, และปิดท้ายด้วย Competition Demo + User Journey + UX Polish แล้ว **Freeze** (ไม่รับ Feature ใหม่เข้า Version 2 อีกหลังจากนี้โดยไม่ผ่าน requirement intake ใหม่)

**สถานะ: กำลังดำเนินการ (บางส่วนเสร็จแล้ว) — 1/5 Sprint เสร็จแล้ว**

- [[../01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7: Life Area & Personal Profile]] — เสร็จแล้ว
- [[../01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8: Universal Inbox + Quick Capture]] — ยังไม่เริ่ม
- [[../01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9: Timeline + Smart Priority + Life Progress]] — ยังไม่เริ่ม
- [[../01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10: Task–Event–File Linking]] — ยังไม่เริ่ม
- [[../01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11: Competition Demo + UX Polish, then Freeze]] — ยังไม่เริ่ม

---

**หมายเหตุ:** [[../01-spec/20260806-008-my-today-functional-requirements-master|Functional Requirements Master List]] เป็นเอกสารอ้างอิงกลาง FR ทั้งหมด ไม่ใช่ Sprint จึงไม่นับรวมอยู่ใน Phase ใด — ดูรายละเอียด FR-ID แบบเต็มได้ที่เอกสารนั้นโดยตรง
