# Feature List

เชื่อมโยงกลับ: [[backlog|backlog]], [[01-spec/index|01-spec]]

เอกสารนี้เป็น **Feature List ระดับ Sprint** ที่แปลงมาจาก [[backlog|backlog.md]] ผสานกับเนื้อหาจริงของแต่ละ spec doc ใน [[01-spec/index|01-spec]] granularity ของเอกสารนี้คือ **1 feature = 1 Sprint** (ไม่ใช่ 1 feature = 1 ปุ่ม/1 หน้าจอ) และจัดลำดับความสำคัญด้วย **MoSCoW** (Must/Should/Could/Won't) ตามที่ผู้ใช้ยืนยันแล้ว

MoSCoW ที่ระบุในเอกสารนี้คือมุมมอง **ย้อนหลัง** (Sprint 1-9 ทำเสร็จไปแล้วตาม backlog.md ณ วันที่ 20260824) ผสมกับมุมมอง **ที่เหลือ** (Sprint 10-11 ยังไม่เริ่ม) ใช้สำหรับสื่อสารว่าอะไรคือแก่นที่ขาดไม่ได้ของผลิตภัณฑ์ เทียบกับอะไรที่เป็นส่วนเสริมคุณค่าแต่ตัดออกได้หากเวลาจำกัด

## สรุปตาราง

| # | Feature (Sprint) | MoSCoW | สถานะ | FR ที่เกี่ยวข้อง | Spec |
|---|---|---|---|---|---|
| 1 | Today Dashboard | Must | เสร็จแล้ว | FR-05, FR-11, FR-12 | [[01-spec/20260806-001-my-today-sprint1-today-dashboard\|Sprint 1]] |
| 2 | Task Management | Must | เสร็จแล้ว | FR-03, FR-04, FR-11 | [[01-spec/20260806-002-my-today-sprint2-task-management\|Sprint 2]] |
| 3 | Calendar & Schedule | Must | เสร็จแล้ว | FR-06, FR-07 | [[01-spec/20260806-003-my-today-sprint3-calendar-schedule\|Sprint 3]] |
| 4 | File Organizer | Must | เสร็จแล้ว | FR-08, FR-09 | [[01-spec/20260806-004-my-today-sprint4-file-organizer\|Sprint 4]] |
| 5 | Notification & Deadline Awareness | Must | เสร็จแล้ว | FR-10 | [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness\|Sprint 5]] |
| 6 | Integration, UX & Final Testing (ปิดจบ Version 1/Core) | Must | เสร็จแล้ว | (ไม่มี FR ใหม่ — เป็นการปรับปรุง/ทดสอบ FR-01 ถึง FR-12 เดิม) | [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing\|Sprint 6]] |
| 7 | Life Area / Workspace & Personal Profile | Must | เสร็จแล้ว | FR-01, FR-02 | [[01-spec/20260806-007-my-today-sprint7-category-profile\|Sprint 7]] |
| 8 | Universal Inbox + Quick Capture | Should | เสร็จแล้ว | FR-13, FR-14, FR-15 | [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture\|Sprint 8]] |
| 9 | Now/Next/Later Timeline + Smart Priority + Life Progress | Should | เสร็จแล้ว | FR-16, FR-17 | [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress\|Sprint 9]] |
| 10 | Task-Event-File-Note-Link Linking (What/When/Information) | Must | เสร็จแล้ว | FR-18, FR-19 | [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking\|Sprint 10]] |
| 11 | Competition Demo + UX Polish, then Freeze (รวม NFR Accessibility/Browser Compatibility/Storage Quota-Warning ทั้งระบบ) | Must | กำลังดำเนินการ | (ไม่มี FR ใหม่ — เป็นการปรับปรุง/ทดสอบ/เตรียม demo ของ FR-13 ถึง FR-19 เดิม) | [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze\|Sprint 11]] |

## รายละเอียดแต่ละ Sprint

### Sprint 1: Today Dashboard

- **MoSCoW:** Must — หัวใจ/ทางเข้าแอป, Gate 1 บังคับให้ผ่านเดี่ยวๆ ก่อน Sprint อื่นทั้งหมด
- **คำอธิบาย:** สร้างหน้า Today Dashboard ซึ่งเป็น "หัวใจ" ของ My Today ให้ผู้ใช้เปิดแอปแล้วรู้ทันทีว่าวันนี้ต้องทำอะไร ประกอบด้วย 6 ส่วน: Header (ชื่อแอป/วันที่/คำทักทาย), Summary Cards (งานทั้งหมด/เสร็จแล้ว/ยังไม่เสร็จ/ใกล้ครบกำหนด), Today's Tasks, Today's Schedule, Upcoming, และปุ่ม Quick Action "+ เพิ่มงาน" Sprint นี้ใช้ Mock Data เท่านั้น ยังไม่มีระบบจัดการข้อมูลจริง
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-05 (แสดง Task ของวันนี้), FR-11 (สถานะ/ความคืบหน้าของ Task — ร่วมกับ Sprint 2), FR-12 (Today Dashboard รวบรวมข้อมูลสำคัญประจำวัน)
- **Spec:** [[01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1]]

### Sprint 2: Task Management

- **MoSCoW:** Must — CRUD พื้นฐานที่ทุก Sprint อื่น (Calendar, File, Notification, Life Area) พึ่งพาอยู่
- **คำอธิบาย:** เปลี่ยน Dashboard จาก Mock Data ให้เป็นข้อมูลจริงที่ผู้ใช้จัดการเอง ผู้ใช้เพิ่ม/แก้ไข/ลบ Task, เปลี่ยนสถานะ (To Do/Doing/Done), กำหนด Priority และ Deadline ได้ พร้อมหน้า "Tasks" ที่ดูงานทั้งหมด กรองตาม Status/Priority, ค้นหา, และเรียงตาม Deadline เก็บข้อมูลด้วย LocalStorage ให้ข้อมูลอยู่หลัง Refresh
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-03 (เพิ่ม/แก้ไข/ลบ/เปลี่ยนสถานะ Task), FR-04 (กำหนด Deadline/Priority), FR-11 (สถานะ/ความคืบหน้าของ Task)
- **Spec:** [[01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]]

### Sprint 3: Calendar & Schedule

- **MoSCoW:** Must — ส่วนหนึ่งของ Final User Journey ที่บังคับผ่าน (Gate 6)
- **คำอธิบาย:** ตอบคำถาม "ต้องทำอะไร เมื่อไร" ด้วยหน้า Calendar 3 มุมมอง (Today/Week/Month) ให้ผู้ใช้เพิ่ม/แก้ไข/ลบตารางเรียน/นัดหมาย/กิจกรรมได้ Task ที่มี Deadline จาก Sprint 2 ปรากฏใน Calendar โดยอัตโนมัติโดยไม่สร้างข้อมูลซ้ำ และ Today Dashboard อัปเดตให้แสดงตารางวันนี้ + Deadline วันนี้เพิ่มเข้าไปด้วย เก็บข้อมูลด้วย LocalStorage
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-06 (เพิ่ม/แก้ไข/ลบ Schedule/Event), FR-07 (ดูข้อมูลผ่าน Calendar)
- **Spec:** [[01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]]

### Sprint 4: File Organizer

- **MoSCoW:** Must — spec ระบุเองว่าเป็นจุดที่ My Today เริ่มแตกต่างจาก To-do App ทั่วไป และอยู่ใน Final User Journey ของ Gate 6
- **คำอธิบาย:** ตอบคำถาม "ไฟล์ที่ต้องใช้กับงานนี้อยู่ไหน?" ผู้ใช้เพิ่ม/ตั้งชื่อ/จัดหมวดหมู่/ระบุ Life Area ของไฟล์, ค้นหา, Preview (เท่าที่ Browser รองรับ), Download, และ Delete ไฟล์ได้ พร้อมหน้า "Files" ที่มี Search/Filter ตาม Life Area/Recent Files เก็บไฟล์ด้วย IndexedDB จุดสำคัญที่สุดคือไฟล์เชื่อมโยงกับ Task ได้ (Related Files) — เปิด Task แล้วเห็นไฟล์ที่เกี่ยวข้องทันที
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-08 (จัดเก็บ/ค้นหา/จัดหมวดหมู่ File), FR-09 (เชื่อม File กับ Task/Life Area)
- **Spec:** [[01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]]

### Sprint 5: Notification & Deadline Awareness

- **MoSCoW:** Must — อยู่ใน Final User Journey ที่บังคับผ่าน (Gate 6)
- **คำอธิบาย:** ตอบคำถาม "อะไรใกล้จะพลาดแล้ว?" โดยระบบตรวจสอบอัตโนมัติว่างานครบกำหนดวันนี้/ใกล้ครบกำหนด/เลยกำหนด/กิจกรรมกำลังจะเริ่ม แบ่งระดับ Due Today / Due Soon / Overdue สร้าง Notification Center ที่เชื่อมกลับไปยัง Task/Event ต้นทางได้และมีสถานะอ่านแล้ว/ยังไม่อ่าน Today Dashboard แสดง Notification สำคัญเพิ่มเข้าไปด้วย และใช้ Browser Notification API แบบ progressive enhancement เท่านั้น (ไม่บังคับ)
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-10 (แจ้งเตือน Task/Event ที่ใกล้ถึงกำหนด)
- **Spec:** [[01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]]

### Sprint 6: Integration, UX & Final Testing

- **MoSCoW:** Must — เป็น Definition of Done ของ Version 1/Core เอง ไม่ใช่ feature เสริม
- **คำอธิบาย:** Sprint ปิดจบของ Version 1/Core ไม่เพิ่ม feature ใหม่ แต่ตรวจ Integration ระหว่างโมดูล Dashboard/Task/Calendar/File/Notification, ปรับ UX/UI (Empty State, Loading State, Validation, Confirmation ก่อน Delete, Error Message), ทดสอบ Responsive 3 ขนาด, ทำ Black Box Testing ครบทุก FR จาก Sprint 1-5, cleanup mock/debug code, และเตรียม deploy บน Vercel นอกจากนี้ยังเพิ่มหน้า Privacy Notice/Terms of Use (PDPA) และพิสูจน์ Final User Journey ทั้งสอง persona (นักศึกษา "ส่งรายงาน STEM" และบุคคลทั่วไป "จ่ายค่าไฟ") ผ่าน Core เดียวกัน
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** ไม่มี FR ใหม่ — เป็นการปรับปรุง/ทดสอบ/ยืนยัน FR-01 ถึง FR-12 เดิมให้ทำงานร่วมกันได้ครบ
- **Spec:** [[01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]]

### Sprint 7: Life Area/Workspace & Personal Profile

- **MoSCoW:** Must — เป็น prerequisite ของ Competition Track ทั้งหมด (Sprint 8-11) และเป็น retrofit เข้า core ที่ build แล้วจาก Sprint 1-6
- **คำอธิบาย:** จุดเปลี่ยนสำคัญจาก "Student App" เป็น "Personal Daily Workspace" — เพิ่มกลไกกลาง Life Area/Workspace ให้ Task/Event/File จัดกลุ่มร่วมกันได้ตามบริบทชีวิตของผู้ใช้ (Work, Study, Family, Finance, Health, Personal, Project ฯลฯ) แทนที่จะผูกกับ "วิชาเรียน" เพียงอย่างเดียว พร้อมเพิ่ม Personal Profile (Name, Profile Image, Email, Preferred Name เป็นหลัก; Student ID/Faculty/Major/Organization/Position เป็น optional ทั้งหมด) เป็น breaking change ที่แทนที่ `Task.subject` ด้วย `Task.lifeAreaId`
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-01 (จัดการ Personal Profile), FR-02 (สร้าง/แก้ไข/ลบ Life Area/Workspace)
- **Spec:** [[01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7]]

### Sprint 8: Universal Inbox + Quick Capture

- **MoSCoW:** Should — มีคุณค่าจริง (ลด friction ก่อนจัดระเบียบ) แต่ core CRUD ยังเข้าถึงได้ผ่านฟอร์มเต็มจาก Sprint 2-4 อยู่แล้วโดยไม่ต้องมี Quick Capture/Inbox หากเวลาจำกัดตัดออกได้โดยไม่ทำให้ core พัง
- **คำอธิบาย:** เพิ่มปุ่มกลาง "+ Add to My Today" ที่เข้าถึงได้จากทุกหน้า ให้ผู้ใช้กรอกแค่ข้อมูลขั้นต่ำแล้วบันทึกได้ทันทีโดยไม่ต้องกรอกฟอร์มเต็ม รายการที่ capture มาเข้า "My Inbox" ก่อน (ยังไม่จัด Life Area) แล้วผู้ใช้มาจัดเข้า Life Area + เติมรายละเอียดทีหลัง เพิ่ม entity ใหม่ 2 ชนิด: Note และ Link ห้ามใช้ AI parsing ข้อความอิสระ
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-13 (Quick Capture Task/Event/File/Note/Link), FR-14 (Universal Inbox), FR-15 (สร้าง/จัดการ Note และ Link)
- **Spec:** [[01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]]

### Sprint 9: Now/Next/Later Timeline + Smart Priority + Life Progress

- **MoSCoW:** Should — เป็น differentiator สำคัญของ narrative "One Life, One Workspace" แต่ Dashboard/Upcoming ของ Sprint 1 ครอบคลุมความต้องการพื้นฐาน ("เห็นว่าวันนี้ต้องทำอะไร") อยู่แล้วในระดับหนึ่งแม้ไม่มี Sprint นี้
- **คำอธิบาย:** ตอบคำถาม "ตอนนี้ต้องทำอะไรก่อน" ด้วยมุมมอง Timeline แบบ Now/Next/Later (รวม Task deadline + Event จากทุก Life Area) แทนการมอง Calendar เต็มเดือน จัดลำดับอัตโนมัติตาม Smart Priority ที่เป็นกฎตายตัว (Overdue → Due Today → Upcoming → High Priority → Normal ไม่ใช้ AI) และแสดง Life Progress (จำนวนงานเสร็จวันนี้ รวมและแยกตาม Life Area) แบบไม่ตัดสิน ห้ามใช้คำว่า "Score"
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-16 (Timeline Now/Next/Later + Smart Priority), FR-17 (Life Progress)
- **Spec:** [[01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]

### Sprint 10: Task-Event-File-Note-Link Linking (What/When/Information)

- **MoSCoW:** Must — spec เรียกตัวเองตรงๆ ว่าเป็น "Differentiator สำคัญที่สุด" ของ My Today เทียบกับ To-do App ทั่วไป เป็นแก่นของ positioning narrative ตอน demo
- **คำอธิบาย:** ต่อยอดจากการเชื่อม Task-File พื้นฐานของ Sprint 4 และ entity Note/Link ใหม่จาก Sprint 8 ให้ Task/Event หนึ่งรายการเชื่อมครบ 3 มิติในหน้าเดียว: What (รายละเอียดงาน+Life Area), When (Deadline/เวลา/Reminder), Information (ไฟล์+บันทึก+ลิงก์ที่เกี่ยวข้อง) เพิ่ม field `linkedNoteIds`/`linkedLinkIds` และ `reminderLeadTime` แบบ custom ต่อ Task/Event ที่ override ค่า default ของ Sprint 5 ได้
- **สถานะ (backlog.md):** เสร็จแล้ว
- **FR ที่เกี่ยวข้อง:** FR-18 (เชื่อม Task/Event กับ Note/Link — What/When/Information ในหน้าเดียว), FR-19 (Reminder lead time เฉพาะ Task/Event)
- **Spec:** [[01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

### Sprint 11: Competition Demo + UX Polish, then Freeze

- **MoSCoW:** Must — จำเป็นต่อการปิดจบ/ทดสอบ/demo จริงของ Competition Track / Version 2
- **คำอธิบาย:** Sprint ปิดจบของ Competition Track/Version 2 (คู่ขนานกับ Sprint 6 ของ Version 1) โดยพื้นฐานไม่เพิ่ม feature ใหม่ แต่ตรวจ Integration ระหว่างโมดูลทั้งหมดจาก Sprint 1-10, ปรับ UX/UI หน้าจอใหม่จาก Sprint 7-10 ให้ได้มาตรฐานเดียวกับ Sprint 6, ทำ Black Box Testing ครบ Sprint 7-10, cleanup, และเตรียม Competition Demo script (Final Competition User Journey คู่ persona + Positioning Narrative) จากนั้นเข้าสู่สถานะ **Freeze** — ไม่รับ feature ใหม่เข้า Version 2 อีก (อัปเดต 20260823) ผนวกเข้ามาอีก 3 หัวข้อย่อยจาก [[01-spec/20260823-013-my-today-non-functional-requirements-master|NFR Master List]] ที่ไม่เคยผูกกับ Sprint ใดมาก่อน: Accessibility Baseline (NFR-04) และ Browser Compatibility Matrix (NFR-06) ขยายขอบเขตจากเดิม "เฉพาะหน้าจอใหม่ Sprint 7-10" เป็นครอบคลุม**ทั้งระบบ Sprint 1-10**, และ IndexedDB Quota-Warning (NFR-08) เป็นฟีเจอร์ใหม่จริงที่ได้รับยกเว้นจาก Business Rule ห้ามเพิ่ม Feature ใหม่ของ Sprint นี้โดยเฉพาะ (อ้าง precedent เดียวกับที่ Sprint 6 เคยเพิ่ม Privacy Notice/Terms of Use ทั้งที่ Sprint 6 เองก็มี Business Rule ห้ามเพิ่ม Feature ใหม่เช่นกัน) ดังนั้นกรอบ "ไม่เพิ่ม feature ใหม่" ของ Sprint นี้จึงมีข้อยกเว้นเฉพาะเจาะจง 1 ข้อ ไม่ใช่ absolute อีกต่อไป **(อัปเดต 20260825 — ความคืบหน้าจริงบางส่วน ยังไม่ commit):** 2 ใน 3 หัวข้อย่อย NFR ที่ผนวกเข้ามาทำเสร็จแล้วในโค้ดจริง ได้แก่ Accessibility Baseline ส่วน semantic HTML (เพิ่ม `<main>` landmark ครบ 10 หน้า) และ IndexedDB Quota-Warning (ฟีเจอร์เต็ม ทดสอบในเบราว์เซอร์แล้ว) ส่วนที่ยังค้างก่อนจะลอง Gate 11 ได้คือ Browser Compatibility Matrix (NFR-06), Competition Demo script, และ Black Box Testing แบบเป็นทางการ — รายละเอียดหลักฐานทั้งหมดอยู่ใน [[backlog|backlog.md]]
- **สถานะ (backlog.md):** กำลังดำเนินการ
- **FR ที่เกี่ยวข้อง:** ไม่มี FR ใหม่ — เป็นการปรับปรุง/ทดสอบ/เตรียม demo ของ FR-13 ถึง FR-19 เดิม
- **Spec:** [[01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]]

## Change Log

- 20260823: อัปเดตแบบ targeted เฉพาะ Sprint 11 (ตารางสรุป + subsection รายละเอียด) สะท้อนสเปกที่แก้ไข (commit `d6874c3`) ผนวก 3 หัวข้อย่อย NFR จาก NFR Master List (Accessibility Baseline NFR-04, Browser Compatibility Matrix NFR-06 — ขยายเป็นทั้งระบบ Sprint 1-10, IndexedDB Quota-Warning NFR-08 — ฟีเจอร์ใหม่ที่ได้รับยกเว้น) เข้า scope — ไม่เปลี่ยน MoSCoW/เหตุผลเดิม (ยังคง Must), ไม่แตะ Sprint อื่น, FR-ID column, หรือ user-journey-*.md
- 20260824: อัปเดตแบบ targeted เฉพาะ Sprint 9 (ตารางสรุป + subsection รายละเอียด) สะท้อนว่า Sprint 9 (Timeline Now/Next/Later + Smart Priority + Life Progress) build เสร็จแล้วและยืนยันใน backlog.md แล้ว — เปลี่ยนสถานะจาก "ยังไม่เริ่ม" เป็น "เสร็จแล้ว" เท่านั้น ไม่เปลี่ยน MoSCoW (ยังคง Should ตามเหตุผลเดิม — ความสมบูรณ์ไม่กระทบการจัดลำดับความสำคัญ), ไม่แตะ Sprint อื่น หรือ FR-ID column
- 20260824: อัปเดตแบบ targeted เฉพาะ Sprint 10 (ตารางสรุป + subsection รายละเอียด) สะท้อนว่า Sprint 10 (Task-Event-File-Note-Link Linking / What-When-Information) build เสร็จแล้วและยืนยันใน backlog.md แล้ว — เปลี่ยนสถานะจาก "ยังไม่เริ่ม" เป็น "เสร็จแล้ว" เท่านั้น ไม่เปลี่ยน MoSCoW (ยังคง Must ตามเหตุผลเดิม), ไม่แตะ Sprint อื่น หรือ FR-ID column
- 20260825: อัปเดตแบบ targeted เฉพาะ Sprint 11 (ตารางสรุป + subsection รายละเอียด) สะท้อนสถานะใหม่ของ backlog.md ที่เปลี่ยนจาก "ยังไม่เริ่ม" เป็นสถานะกลาง "กำลังดำเนินการ" (สถานะที่ไม่เคยใช้มาก่อน) — มีความคืบหน้าจริงบางส่วนที่ตรวจสอบในโค้ดแล้วแต่ยังไม่ commit (IndexedDB Quota-Warning เสร็จสมบูรณ์, Accessibility Baseline ส่วน semantic HTML เสร็จ) ในขณะที่ Browser Compatibility Matrix, Competition Demo script, Black Box Testing เป็นทางการ และ Gate 11 เองยังไม่ได้ทำ — ไม่เปลี่ยน MoSCoW (ยังคง Must ตามเหตุผลเดิม), ไม่แตะ Sprint อื่น, FR-ID column, หรือ user-journey-*.md
