# Feature List

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้เป็น **feature catalog แบบ flat/scannable** — ตารางเดียว หนึ่งแถวต่อหนึ่ง feature bullet จาก section "Feature Requirements" ของแต่ละ Sprint spec ใน [[01-spec/index|01-spec]] มีไว้ให้กวาดตาดูได้เร็วว่าระบบมี feature อะไรบ้างทั้งหมด **ไม่ใช่** เอกสารสำหรับ FR-ID-level traceability — ถ้าต้องการดู Functional Requirement แบบมี ID อ้างอิงและตาราง Requirement Mapping (Human Need → User Requirement → System Requirement → Feature) ให้ไปดูที่ [[01-spec/20260806-008-my-today-functional-requirements-master|Functional Requirements Master List]] แทน ไม่ duplicate ตาราง FR ไว้ที่นี่

เอกสารนี้ถูก **regenerate ใหม่ทั้งหมด** จากเนื้อหา spec ปัจจุบันทุกครั้งที่รัน `feature-journey-intake` (ดู `CLAUDE.md`) ไม่ใช่ประวัติสะสมแบบ Sprint spec หรือแก้ในที่แบบ `backlog.md`

**หมายเหตุสถานะ:** คอลัมน์ สถานะ ด้านล่าง copy มาจากข้อความสถานะปัจจุบันใน [[backlog|backlog.md]] ณ ตอน regenerate เอกสารนี้เท่านั้น — **ตรวจสอบล่าสุด: 20260806** — ไฟล์นี้อาจ drift ไม่ตรงกับ `backlog.md` ได้ระหว่างรอบ regenerate ถัดไป ถ้าต้องการสถานะที่ up-to-date จริง ให้ดูที่ [[backlog|backlog.md]] โดยตรง ซึ่งเป็น source of truth ของสถานะ Sprint เสมอ

## Feature Table

| Feature | Sprint | Spec | สถานะ |
|---|---|---|---|
| Header แสดงชื่อ "My Today", วันที่ปัจจุบัน, ข้อความทักทาย | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|Sprint 1]] | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|001]] | เสร็จแล้ว |
| Summary Cards: งานทั้งหมดวันนี้ / เสร็จแล้ว / ยังไม่เสร็จ / ใกล้ครบกำหนด | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|Sprint 1]] | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|001]] | เสร็จแล้ว |
| Today's Tasks: รายการงานวันนี้ (ชื่องาน, Life Area, Deadline, Priority, Status) | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|Sprint 1]] | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|001]] | เสร็จแล้ว |
| Today's Schedule: ตาราง/กิจกรรมวันนี้ (เวลา, ชื่อกิจกรรม, สถานที่) | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|Sprint 1]] | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|001]] | เสร็จแล้ว |
| Upcoming: รายการงานที่ใกล้ครบกำหนด | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|Sprint 1]] | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|001]] | เสร็จแล้ว |
| Quick Action ปุ่ม "+ เพิ่มงาน" (Modal ตัวอย่าง, placeholder) | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|Sprint 1]] | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|001]] | เสร็จแล้ว |
| เพิ่ม Task | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| แก้ไข Task | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| ลบ Task | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| ทำเครื่องหมายว่า Task เสร็จแล้ว | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| เปลี่ยนสถานะ (Status) ของ Task | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| กำหนด Priority ของ Task | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| กำหนด Deadline ของ Task | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| หน้า "Tasks": ดูทั้งหมด, Filter ตาม Status, Filter ตาม Priority, Search, Sort ตาม Deadline | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] | [[01-spec/20260806-002-my-today-sprint2-task-management\|002]] | เสร็จแล้ว |
| เพิ่มตารางเรียน/นัดหมาย/กิจกรรม | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|Sprint 3]] | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|003]] | ยังไม่เริ่ม |
| หน้า Calendar มุมมอง Today / Week / Month | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|Sprint 3]] | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|003]] | ยังไม่เริ่ม |
| แก้ไขและลบกิจกรรม | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|Sprint 3]] | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|003]] | ยังไม่เริ่ม |
| เปลี่ยนมุมมอง Calendar | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|Sprint 3]] | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|003]] | ยังไม่เริ่ม |
| เพิ่มไฟล์ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| ตั้งชื่อไฟล์ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| จัดหมวดหมู่ไฟล์ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| ระบุ Life Area ของไฟล์ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| Search ไฟล์ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| Preview ไฟล์ที่ Browser รองรับ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| Download ไฟล์ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| Delete ไฟล์ | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| หน้า "Files": Search, Filter ตาม Life Area, Recent Files | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| เชื่อมโยงไฟล์กับ Task (Related Files) | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|004]] | ยังไม่เริ่ม |
| ตรวจสอบอัตโนมัติ: งานครบกำหนดวันนี้ / ใกล้ครบกำหนด / เลยกำหนด / กิจกรรมที่กำลังจะเริ่ม | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|Sprint 5]] | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|005]] | ยังไม่เริ่ม |
| แบ่งระดับการเตือน: Due Today / Due Soon / Overdue | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|Sprint 5]] | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|005]] | ยังไม่เริ่ม |
| Notification Center (ข้อความ, เวลา, Task/Event ที่เกี่ยวข้อง, สถานะอ่านแล้ว/ยังไม่อ่าน) | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|Sprint 5]] | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|005]] | ยังไม่เริ่ม |
| Today Dashboard แสดง Notification สำคัญเพิ่มเติม | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|Sprint 5]] | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|005]] | ยังไม่เริ่ม |
| Browser Notification API แบบ optional (progressive enhancement) | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|Sprint 5]] | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|005]] | ยังไม่เริ่ม |
| ตรวจสอบ Integration ระหว่างโมดูล: Task → Dashboard/Calendar/File/Notification | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|006]] | ยังไม่เริ่ม |
| ปรับปรุง UX/UI (Empty State, Loading State, Validation, Confirmation, Error Message ฯลฯ) | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|006]] | ยังไม่เริ่ม |
| ตรวจ Responsive (Mobile 390px / Tablet / Desktop) | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|006]] | ยังไม่เริ่ม |
| Black Box Testing ครบ Functional Requirement Sprint 1-5 | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|006]] | ยังไม่เริ่ม |
| Cleanup: ลบ Mock Data/Debug Code/Console Error/Feature นอก Scope | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|006]] | ยังไม่เริ่ม |
| เตรียม Deploy บน Vercel | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|006]] | ยังไม่เริ่ม |
| หน้า/ส่วน Privacy Notice และ Terms of Use เข้าถึงได้จาก Footer ทุกหน้า | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|006]] | ยังไม่เริ่ม |
| CRUD Life Area / Workspace | [[01-spec/20260806-007-my-today-sprint7-category-profile\|Sprint 7]] | [[01-spec/20260806-007-my-today-sprint7-category-profile\|007]] | ยังไม่เริ่ม |
| เชื่อม Task / Event / File เข้ากับ Life Area เดียวกัน | [[01-spec/20260806-007-my-today-sprint7-category-profile\|Sprint 7]] | [[01-spec/20260806-007-my-today-sprint7-category-profile\|007]] | ยังไม่เริ่ม |
| CRUD Personal Profile (Name, Profile Image, Email, Preferred Name) | [[01-spec/20260806-007-my-today-sprint7-category-profile\|Sprint 7]] | [[01-spec/20260806-007-my-today-sprint7-category-profile\|007]] | ยังไม่เริ่ม |
| กรอกข้อมูลเสริมแบบไม่บังคับ (Student ID/Faculty/Major, Organization/Position) | [[01-spec/20260806-007-my-today-sprint7-category-profile\|Sprint 7]] | [[01-spec/20260806-007-my-today-sprint7-category-profile\|007]] | ยังไม่เริ่ม |
| ปุ่มกลาง "+ Add to My Today" (Quick Capture Task/Event/File/Note/Link จากทุกหน้า) | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|Sprint 8]] | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|009]] | ยังไม่เริ่ม |
| กรอกข้อมูลขั้นต่ำแล้วบันทึกได้ทันที (ไม่ต้องกรอกฟอร์มเต็ม) | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|Sprint 8]] | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|009]] | ยังไม่เริ่ม |
| หน้า "My Inbox" แสดงรายการที่ยังไม่จัด Life Area | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|Sprint 8]] | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|009]] | ยังไม่เริ่ม |
| จัดรายการจาก Inbox เข้า Life Area + เติมรายละเอียดที่ขาด | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|Sprint 8]] | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|009]] | ยังไม่เริ่ม |
| Entity ใหม่: Note (ข้อความที่ต้องจำ) และ Link (ลิงก์ที่ต้องเก็บ) | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|Sprint 8]] | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|009]] | ยังไม่เริ่ม |
| Timeline มุมมอง Now → Next → Later (รวม Task+Event ทุก Life Area) | [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress\|Sprint 9]] | [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress\|010]] | ยังไม่เริ่ม |
| Smart Priority sorting (Overdue → Due Today → Upcoming → High → Normal, กฎตายตัวไม่ใช้ AI) | [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress\|Sprint 9]] | [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress\|010]] | ยังไม่เริ่ม |
| Life Progress (จำนวนที่เสร็จวันนี้ รวม + แยกตาม Life Area) | [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress\|Sprint 9]] | [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress\|010]] | ยังไม่เริ่ม |
| หน้า Task/Event Detail แบบ What / When / Information ในหน้าเดียว | [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking\|Sprint 10]] | [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking\|011]] | ยังไม่เริ่ม |
| เชื่อม Note และ Link เข้ากับ Task/Event (นอกเหนือจาก File) | [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking\|Sprint 10]] | [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking\|011]] | ยังไม่เริ่ม |
| Custom reminder lead time ต่อ Task/Event (override default ของ Sprint 5) | [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking\|Sprint 10]] | [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking\|011]] | ยังไม่เริ่ม |
| ตรวจสอบ Integration ทุกโมดูล Sprint 1-10 | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|Sprint 11]] | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|012]] | ยังไม่เริ่ม |
| ปรับ UX/UI หน้าจอใหม่ Sprint 7-10 ให้ได้มาตรฐานเดียวกับ Sprint 6 | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|Sprint 11]] | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|012]] | ยังไม่เริ่ม |
| Black Box Testing ครบ Sprint 7-10 | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|Sprint 11]] | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|012]] | ยังไม่เริ่ม |
| Cleanup mock/debug code จากฟีเจอร์ใหม่ทั้งหมด | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|Sprint 11]] | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|012]] | ยังไม่เริ่ม |
| เตรียม Competition Demo script (Final User Journey คู่ persona + Positioning Narrative) | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|Sprint 11]] | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|012]] | ยังไม่เริ่ม |
