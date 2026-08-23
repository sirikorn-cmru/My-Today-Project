# User Journey

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้รวบรวม **journey แบบคนจริงใช้งานจริง** ของสอง persona หลักของ My Today (นักศึกษา และ บุคคลทั่วไป — ดู "Project purpose" ใน `CLAUDE.md`) เป็น living document ที่ **regenerate ใหม่ทั้งหมด** จากเนื้อหา Business Rules / Acceptance Criteria / Gate (เกณฑ์ผ่าน Sprint) ของทุก Sprint spec ปัจจุบันใน [[01-spec/index|01-spec]] ทุกครั้งที่รัน `feature-journey-intake` — ไม่ใช่ประวัติสะสม เนื้อหาที่นี่ต้องตรงกับสิ่งที่ spec พูด ณ ปัจจุบันเสมอ

แต่ละ Step เรียงตาม **ลำดับที่ฟีเจอร์จะถูกใช้จริงในชีวิตคนคนหนึ่ง** (วัน/สัปดาห์หนึ่ง) ไม่ใช่เรียงตามเลข Sprint ที่สร้างฟีเจอร์นั้น — บาง Step จึงอ้างอิง Sprint ที่เลขสูงกว่า Step ก่อนหน้ามาแทรกกลาง (เช่น Sprint 7 Life Area ต้องมีก่อนที่ Sprint 8 Quick Capture จะจัดเข้า Life Area ได้)

**หมายเหตุความสัมพันธ์กับ Persona-specific deliverable ของ Sprint 6 และ Sprint 11:** journey สองอันด้านล่างเป็นเวอร์ชัน **ทั่วไป/ตลอดเวลา** (general-purpose, always-current) ของสิ่งที่ specเรียกร้องให้เป็น **deliverable เฉพาะ Sprint** สองจุด — [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]]'s "Final Acceptance Criteria คู่ Persona" (ปิดจบ Version 1/Core) และ [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]]'s "Final Competition User Journey" (ปิดจบ Version 2/Competition Track) — journey ที่นี่ไม่ได้แทนที่ deliverable เฉพาะกิจสองอันนั้น แต่เป็นจุดอ้างอิงกลางที่ปรับตามทุกครั้งที่ spec เปลี่ยน ในขณะที่ deliverable ของ Sprint 6/11 คือสถานะ "แช่แข็ง" ณ Sprint นั้นๆ

---

## Persona 1: นักศึกษา (Student)

ตัวอย่าง: นักศึกษาที่ต้องบริหารงานเรียน (รายงาน, ตารางเรียน) ควบคู่กับชีวิตด้านอื่น

1. **ตั้งค่า Personal Profile และ Life Area ครั้งแรก** — กรอกชื่อ (Name) อย่างน้อย และสร้าง Life Area "Study" (ไม่บังคับกรอก Student ID/Faculty/Major) — [[01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7: Life Area & Personal Profile]]
2. **เปิด My Today ตอนเช้า** เห็น Today Dashboard ทันที (Header, Summary Cards, Today's Tasks, Today's Schedule, Upcoming) — ตอบคำถาม "วันนี้ต้องทำอะไร" ได้ทันทีที่เปิดหน้า — [[01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1: Today Dashboard]]
3. **กดปุ่มกลาง "+ Add to My Today"** พิมพ์ข้อความอิสระ "ส่งรายงาน HCI" บันทึกเป็น Task อย่างรวดเร็วโดยไม่ต้องกรอกฟอร์มเต็ม — รายการเข้า **My Inbox** ก่อน — [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8: Universal Inbox + Quick Capture]]
4. **เปิดหน้า Inbox** จัดรายการ "ส่งรายงาน HCI" เข้า Life Area "Study" — [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8: Universal Inbox + Quick Capture]]
5. **เติมรายละเอียด Task**: กำหนด Deadline (วันศุกร์ 23:59), Priority, Status — ทำแบบนี้ซ้ำจนมีงานจริงอย่างน้อย 5 งานแล้วใช้งานต่อเนื่อง 1 วัน (Add → Edit → Done → Dashboard update ครบ) — [[01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2: Task Management]]
6. **เพิ่มตารางเรียน/นัดหมาย** (เช่น 09:00 เรียน HCI, 13:00 ประชุมกลุ่ม) ลง Calendar และดูมุมมอง Today/Week/Month — เห็น Deadline ของ Task "ส่งรายงาน HCI" ปรากฏใน Calendar โดยอัตโนมัติ — [[01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3: Calendar & Schedule]]
7. **แนบไฟล์งาน** (report.docx, rubric.pdf, reference.pdf) เข้ากับ Task "ส่งรายงาน HCI" ผ่านหน้า Files แล้วเปิด Task เห็น Related Files ทันที — [[01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4: File Organizer]]
8. **เปิดหน้า Task Detail** เห็นข้อมูลครบในหน้าเดียว: **What** (ชื่อ+รายละเอียด+Life Area "Study"), **When** (Deadline วันศุกร์ 23:59 + Reminder), **Information** (ไฟล์ที่แนบ + Note ที่จดไว้ + Link ที่เกี่ยวข้อง) — ตั้ง Custom reminder lead time เอง (เช่น เตือนก่อน 1 วัน) แทนค่า default — [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10: Task–Event–File Linking]]
9. **ได้รับการแจ้งเตือนอัตโนมัติ** เมื่อ Task เข้าสถานะ Due Today / Due Soon / Overdue ผ่าน Notification Center (คลิกแล้วไปที่ Task ต้นทางได้ทันที) — ระบบยังใช้งานได้ปกติแม้ปิด Browser Notification — [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5: Notification & Deadline Awareness]]
10. **เปิดมุมมอง Timeline Now/Next/Later** ระหว่างวันแทนการเปิด Calendar เต็มเดือน เห็นรายการเรียงตาม Smart Priority (Overdue ก่อนเสมอ) และดู **Life Progress** ของ Life Area "Study" (เช่น "วันนี้เสร็จแล้ว 4 จาก 7 เรื่อง") — [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9: Timeline + Smart Priority + Life Progress]]
11. **ทำรายงานเสร็จ กด Done** — Dashboard และ Life Progress อัปเดตสถานะโดยอัตโนมัติทันที ไม่ต้อง refresh — [[01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]], [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]
12. **ทดสอบ end-to-end แบบ Final User Journey ของ Version 1/Core**: ได้รับงาน STEM ที่ต้องส่งวันศุกร์ 23:59 → บันทึกเป็น Task → แนบไฟล์ → เห็น Deadline ใน Calendar → เปิด My Today ตอนเช้าเห็นงานบน Dashboard → ระบบเตือนใกล้หมดเวลา → ทำเสร็จกด Done → Dashboard อัปเดตอัตโนมัติ (ตรวจสอบว่าเข้าถึง Privacy Notice/Terms of Use จาก Footer ได้ทุกหน้าด้วย) — [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]]
13. **ทดสอบ Final Competition User Journey ของ Version 2**: เพิ่ม Task "ส่งรายงาน HCI" ผ่าน Quick Capture → เข้า Inbox → จัดเข้า Life Area "Study" → กำหนด Deadline → แนบไฟล์ → เห็น Deadline ใน Calendar และ Timeline → เปิด My Today ตอนเช้าเห็นงานบน Dashboard → ระบบเตือนตาม Reminder ที่ตั้งไว้ → ทำงานเสร็จกด Done → Life Progress อัปเดต — [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11: Competition Demo + UX Polish, then Freeze]]

---

## Persona 2: บุคคลทั่วไป (General person)

ตัวอย่าง: คนทำงานทั่วไปที่ต้องบริหารบิล/นัดหมาย/ครอบครัวควบคู่กัน ไม่ใช่นักศึกษา

1. **ตั้งค่า Personal Profile และ Life Area ครั้งแรก** — กรอกชื่อ (Name) อย่างน้อย และสร้าง Life Area เช่น "Finance", "Work", "Family" (ไม่ถูกบังคับกรอก Organization/Position) — [[01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7: Life Area & Personal Profile]]
2. **เปิด My Today ตอนเช้า** เห็น Today Dashboard ทันที (Header, Summary Cards, Today's Tasks, Today's Schedule, Upcoming) — [[01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1: Today Dashboard]]
3. **กดปุ่มกลาง "+ Add to My Today"** พิมพ์ข้อความอิสระ "จ่ายค่าไฟ 10 สิงหาคม" บันทึกได้ทันทีโดยไม่ต้องกรอกฟอร์มเต็ม — รายการเข้า **My Inbox** ก่อน — [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8: Universal Inbox + Quick Capture]]
4. **เปิดหน้า Inbox** จัดรายการ "จ่ายค่าไฟ" เข้า Life Area "Finance" — [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8: Universal Inbox + Quick Capture]]
5. **เติมรายละเอียด Task**: กำหนด Deadline (ก่อนสิ้นเดือน), Priority, Status — จัดการ Task อื่นๆ ในชีวิตประจำวันด้วยกลไกเดียวกัน (Add/Edit/Done) — [[01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2: Task Management]]
6. **เพิ่มนัดหมาย/กิจกรรมส่วนตัว** (เช่น 17:00 รับลูก ใน Life Area "Family") ลง Calendar และดูมุมมอง Today/Week/Month — เห็น Deadline ของ Task "จ่ายค่าไฟ" ปรากฏใน Calendar โดยอัตโนมัติ — [[01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3: Calendar & Schedule]]
7. **แนบไฟล์ใบแจ้งหนี้ค่าไฟ (ใบแจ้งหนี้ค่าไฟ.pdf)** เข้ากับ Task "จ่ายค่าไฟ" ผ่านหน้า Files แล้วเปิด Task เห็น Related Files ทันที — [[01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4: File Organizer]]
8. **เปิดหน้า Task Detail** เห็นข้อมูลครบในหน้าเดียว: **What** (ชื่อ+รายละเอียด+Life Area "Finance"), **When** (Deadline+Reminder), **Information** (ใบแจ้งหนี้ที่แนบ + Note/Link ที่เกี่ยวข้อง) — ตั้ง Custom reminder lead time เอง — [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10: Task–Event–File Linking]]
9. **ได้รับการแจ้งเตือนอัตโนมัติ** เมื่อ Task เข้าสถานะ Due Today / Due Soon / Overdue ผ่าน Notification Center — ระบบยังใช้งานได้ปกติแม้ปิด Browser Notification — [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5: Notification & Deadline Awareness]]
10. **เปิดมุมมอง Timeline Now/Next/Later** ในวันที่มีทั้ง 08:30 ประชุม (Work), 11:30 จ่ายค่าไฟ (Finance), 17:00 รับลูก (Family) — เห็นรายการเรียงตาม Smart Priority และ **Life Progress** แยกตามแต่ละ Life Area (เช่น Work 3/4, Family 1/1, Personal 0/2) — [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9: Timeline + Smart Priority + Life Progress]]
11. **จ่ายค่าไฟเสร็จ กด Done** — Dashboard และ Life Progress อัปเดตสถานะโดยอัตโนมัติทันที — [[01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]], [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]
12. **ทดสอบ end-to-end แบบ Final User Journey ของ Version 1/Core**: มีบิลค่าไฟที่ต้องจ่ายก่อนสิ้นเดือน → บันทึกเป็น Task "จ่ายค่าไฟ" ใน Life Area "Finance" → แนบไฟล์ใบแจ้งหนี้ → เห็น Deadline ใน Calendar → เปิด My Today ตอนเช้าเห็นงานบน Dashboard → ระบบเตือนใกล้หมดเวลา → จ่ายเงินเสร็จกด Done → Dashboard อัปเดตอัตโนมัติ (Core เดียวกับ persona นักศึกษา ไม่มี logic แยกตาม persona) — [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6: Integration, UX & Final Testing]]
13. **ทดสอบ Final Competition User Journey ของ Version 2**: เพิ่ม Task "จ่ายค่าไฟ" ผ่าน Quick Capture → เข้า Inbox → จัดเข้า Life Area "Finance" → แนบใบแจ้งหนี้ → เห็น Deadline ใน Timeline → ได้รับการเตือน → จ่ายเงินเสร็จกด Done → Life Progress อัปเดต (ใช้ Core เดียวกับ persona นักศึกษาทั้งหมด — Quick Capture, Inbox, Life Area, Task, Timeline, Notification, Life Progress) — [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11: Competition Demo + UX Polish, then Freeze]]
