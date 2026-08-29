# My Today — Functional Requirements Master List

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-004-my-today-sprint4-file-organizer]], [[20260806-005-my-today-sprint5-notification-deadline-awareness]], [[20260806-006-my-today-sprint6-integration-ux-final-testing]], [[20260806-007-my-today-sprint7-category-profile]], [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]], [[20260806-010-my-today-sprint9-timeline-priority-progress]], [[20260806-011-my-today-sprint10-task-event-file-linking]], [[20260806-012-my-today-sprint11-competition-demo-freeze]]

## คำอธิบาย

เอกสารนี้เป็น master reference รวม Functional Requirement (FR) กลางของ My Today ทั้งระบบ ไม่ใช่ spec ของ Sprint ใดโดยเฉพาะ แต่ละ FR โยงกลับไปยัง Sprint spec ที่เป็นแหล่งรายละเอียดจริง ใช้เอกสารนี้เป็นจุดเริ่มต้นเวลาต้องการดูภาพรวมว่าระบบทำอะไรได้บ้างทั้งหมด โดยไม่ต้องไล่อ่านทีละ Sprint

## Functional Requirements

| FR ID | คำอธิบาย | Sprint ที่เกี่ยวข้อง |
|---|---|---|
| FR-01 | ผู้ใช้สามารถสร้างและจัดการข้อมูลส่วนตัว (Personal Profile) ได้ | [[20260806-007-my-today-sprint7-category-profile]] |
| FR-02 | ผู้ใช้สามารถสร้าง แก้ไข และลบ Life Area / Workspace ได้ | [[20260806-007-my-today-sprint7-category-profile]] |
| FR-03 | ผู้ใช้สามารถเพิ่ม แก้ไข ลบ และเปลี่ยนสถานะ Task ได้ | [[20260806-002-my-today-sprint2-task-management]] |
| FR-04 | ผู้ใช้สามารถกำหนด Deadline และ Priority ของ Task ได้ | [[20260806-002-my-today-sprint2-task-management]] |
| FR-05 | ระบบสามารถแสดง Task ของวันนี้ได้ | [[20260806-001-my-today-sprint1-today-dashboard]] |
| FR-06 | ผู้ใช้สามารถเพิ่ม แก้ไข และลบ Schedule / Event ได้ | [[20260806-003-my-today-sprint3-calendar-schedule]] |
| FR-07 | ผู้ใช้สามารถดูข้อมูลผ่าน Calendar ได้ | [[20260806-003-my-today-sprint3-calendar-schedule]] |
| FR-08 | ผู้ใช้สามารถจัดเก็บ ค้นหา และจัดหมวดหมู่ File ได้ | [[20260806-004-my-today-sprint4-file-organizer]] |
| FR-09 | ผู้ใช้สามารถเชื่อม File กับ Task หรือ Life Area ได้ | [[20260806-004-my-today-sprint4-file-organizer]] |
| FR-10 | ระบบสามารถแจ้งเตือน Task หรือ Event ที่ใกล้ถึงกำหนดได้ | [[20260806-005-my-today-sprint5-notification-deadline-awareness]] |
| FR-11 | ระบบสามารถแสดงสถานะและความคืบหน้าของ Task ได้ | [[20260806-002-my-today-sprint2-task-management]], [[20260806-001-my-today-sprint1-today-dashboard]] |
| FR-12 | Today Dashboard สามารถรวบรวมข้อมูลสำคัญของผู้ใช้ในแต่ละวันได้ | [[20260806-001-my-today-sprint1-today-dashboard]] |
| FR-13 | ผู้ใช้สามารถ Quick Capture รายการ (Task/Event/File/Note/Link) แบบกรอกข้อมูลขั้นต่ำได้ | [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]] |
| FR-14 | ระบบมี Universal Inbox เก็บรายการที่ยังไม่จัด Life Area และให้ผู้ใช้จัดเข้า Life Area ภายหลังได้ | [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]] |
| FR-15 | ผู้ใช้สามารถสร้างและจัดการ Note และ Link ได้ | [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]] |
| FR-16 | ระบบสามารถแสดงมุมมอง Timeline แบบ Now/Next/Later และจัดลำดับรายการตาม Smart Priority ได้ | [[20260806-010-my-today-sprint9-timeline-priority-progress]] |
| FR-17 | ระบบสามารถแสดง Life Progress (จำนวนงานที่เสร็จวันนี้ รวมและแยกตาม Life Area) ได้ | [[20260806-010-my-today-sprint9-timeline-priority-progress]] |
| FR-18 | ผู้ใช้สามารถเชื่อม Task/Event กับ Note และ Link ได้ (นอกเหนือจาก File) และดูข้อมูล What/When/Information ครบในหน้าเดียว | [[20260806-011-my-today-sprint10-task-event-file-linking]] |
| FR-19 | ผู้ใช้สามารถตั้งค่า Reminder lead time เฉพาะของแต่ละ Task/Event แทนค่า default ได้ | [[20260806-011-my-today-sprint10-task-event-file-linking]] |

## Requirement Mapping

| Human Need | User Requirement | System Requirement | Feature |
|---|---|---|---|
| ไม่ลืมสิ่งที่ต้องทำ | เห็นงานวันนี้ | แสดง Task ตามวันที่ | Today Dashboard |
| จัดการหลายบทบาทในชีวิต | แยกงานเป็นหมวด | Life Area Management | Life Area |
| ไม่พลาดกำหนดเวลา | ต้องการการเตือน | Deadline Monitoring | Notification |
| หาเอกสารง่าย | เชื่อมไฟล์กับงาน | Task–File Relationship | File Organizer |
| เห็นสิ่งที่เกิดขึ้นวันนี้ | ดูตารางรวม | Schedule Management | Calendar |
| ไม่อยากจัดระเบียบก่อนมีเวลา | โยนทุกอย่างเข้าที่เดียวก่อน | Universal Inbox + Quick Capture | Inbox |
| อยากรู้ว่าต้องทำอะไรก่อนตอนนี้เลย | ดูสถานะ ณ ตอนนี้ | Now/Next/Later + Smart Priority | Timeline |
| อยากเห็นว่าวันนี้ไปถึงไหนแล้ว | ดูความคืบหน้าแบบไม่ถูกตัดสิน | Progress Aggregation ตาม Life Area | Life Progress |
| งานหนึ่งต้องใช้ทั้งเรื่อง เวลา และของ | เห็นทุกอย่างของงานในที่เดียว | What/When/Information Linking | Task Detail |

## หมายเหตุ

เอกสารนี้เป็นผลจาก requirement revision วันที่ 20260806 ที่ generalize target user จาก "นักศึกษาเท่านั้น" เป็น "บุคคลทั่วไป โดยยังรองรับนักศึกษา" (ดูที่ [[20260806-007-my-today-sprint7-category-profile]]) และจาก vision "My Today — One Life, One Workspace" ที่ขยาย roadmap เป็น Competition Track Sprint 7-11 เพิ่มเติมจาก Core เดิม Sprint 1-6 (FR-13 ถึง FR-19)
