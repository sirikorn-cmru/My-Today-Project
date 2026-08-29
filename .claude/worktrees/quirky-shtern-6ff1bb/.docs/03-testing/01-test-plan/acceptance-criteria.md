# Acceptance Criteria (Given-When-Then)

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้แปลง `## Acceptance Criteria` ของแต่ละ Sprint spec ใน [[../../01-requirements/01-spec/index|01-spec]] ให้เป็น Scenario แบบ Given-When-Then (GWT) หนึ่งรายการต่อหนึ่ง bullet พร้อมเสริม edge case จาก `## Business Rules` และ scenario เชิง integration หนึ่งรายการจาก `## Gate (เกณฑ์ผ่าน Sprint)` ของแต่ละ Sprint ชื่อ feature ในแต่ละหัวข้อ scenario อ้างอิงจาก [[../../01-requirements/feature-list|feature-list.md]]

เอกสารนี้เป็น **living document ที่ regenerate จากเนื้อหา spec ปัจจุบันทั้งหมด** เช่นเดียวกับ `feature-list.md`/`user-journey.md` — ไม่ใช่ประวัติแบบ append-only ทุกครั้งที่ spec เปลี่ยน ให้ regenerate section ของ Sprint นั้นใหม่ทั้งหมด (full regeneration = ทุก Sprint, incremental = เฉพาะ Sprint ที่ระบุ) ID ของแต่ละ scenario คือ `AC-{RUNNING_NO}-{NN}` โดย `RUNNING_NO` คือเลข 3 หลักของ spec doc เอง (เช่น Sprint 8 ใช้ spec `20260806-009-...` จึงมี ID ขึ้นต้นด้วย `AC-009-`) ไม่ใช่เลข Sprint

ณ เวลาสร้างเอกสารนี้ (20260806) ยังไม่มี prototype folder ใดใน [[../../02-design/01-prototypes/index|01-prototypes]] สำหรับ Sprint ใดเลย จึงยังไม่มี scenario ใดอ้างอิงหน้าจอ prototype — เมื่อมี prototype เกิดขึ้นภายหลัง ให้ปรับถ้อยคำ When/Then ของ Sprint ที่เกี่ยวข้องให้ตรงกับ UI copy จริงของ prototype นั้น

## Sprint 1: Today Dashboard

Spec: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard|20260806-001]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-001-01: เปิดแอปแล้วเห็น Today Dashboard ทันที
- **Given** ผู้ใช้ยังไม่เคยเปิด My Today มาก่อนในเครื่องนี้
- **When** ผู้ใช้เปิดเว็บ My Today ครั้งแรก
- **Then** หน้า Today Dashboard แสดงผลทันทีโดยไม่ต้อง Login หรือตั้งค่าใดๆ ก่อน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Acceptance Criteria|Sprint 1 - Acceptance Criteria]]

### AC-001-02: Dashboard responsive บนมือถือ
- **Given** ผู้ใช้เปิด My Today ด้วยหน้าจอขนาดมือถือ
- **When** ผู้ใช้ดูหน้า Today Dashboard
- **Then** ทั้ง 6 ส่วน (Header, Summary Cards, Today's Tasks, Today's Schedule, Upcoming, Quick Action) แสดงผลถูกต้อง ไม่ overflow ไม่ต้อง scroll แนวนอน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Acceptance Criteria|Sprint 1 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Business Rules|Business Rules]]

### AC-001-03: ไม่มี Error ใน Console ตอนเปิด Dashboard
- **Given** ผู้ใช้เปิด Developer Console ของ Browser ไว้
- **When** ผู้ใช้เปิดหน้า Today Dashboard และโต้ตอบกับ Quick Action Modal ตัวอย่าง
- **Then** ไม่มีข้อความ Error ปรากฏใน Console
- อ้างอิง: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Acceptance Criteria|Sprint 1 - Acceptance Criteria]]

### AC-001-04: ทุก Card แสดงข้อมูลถูกต้องจาก Mock Data
- **Given** ระบบโหลด Mock Data ชุดทดสอบไว้แล้ว (Sprint 1 ยังไม่เชื่อมข้อมูลจริง)
- **When** ผู้ใช้ดู Summary Cards, Today's Tasks, Today's Schedule, Upcoming
- **Then** ตัวเลข/รายการที่แสดงตรงกับค่าที่อยู่ใน Mock Data ชุดนั้นทุกจุด
- อ้างอิง: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Acceptance Criteria|Sprint 1 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Business Rules|Business Rules]]

### AC-001-05: UI ใช้งานได้โดยไม่ต้องมีคนอธิบาย
- **Given** ผู้ใช้ใหม่ที่ไม่เคยเห็น My Today มาก่อนและไม่มีใครสอนวิธีใช้
- **When** ผู้ใช้เปิดหน้า Today Dashboard และลองกดปุ่ม "+ เพิ่มงาน"
- **Then** ผู้ใช้เข้าใจได้เองว่าแต่ละส่วนของหน้าคืออะไร และปุ่ม Quick Action เปิด Modal ตัวอย่างได้โดยไม่ต้องมีคำอธิบายเพิ่มเติม
- อ้างอิง: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Acceptance Criteria|Sprint 1 - Acceptance Criteria]]

### AC-001-06: ปุ่ม "+ เพิ่มงาน" เปิดแค่ Modal ตัวอย่าง ยังไม่บันทึกงานจริง
- **Given** Sprint 1 ยังไม่สร้างระบบเพิ่มงานจริง (จะทำใน Sprint 2)
- **When** ผู้ใช้กดปุ่ม "+ เพิ่มงาน" บน Dashboard
- **Then** ระบบเปิด Modal ตัวอย่าง (placeholder) เท่านั้น ไม่มีการบันทึกงานใหม่ลงระบบจริง
- อ้างอิง: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Feature Requirements / โครงสร้างหน้า Dashboard|Feature Requirements ข้อ 6]], [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#ขอบเขต (Scope)|Out of scope]]

### AC-001-07: Gate 1 — Demo หน้าเดียวตอบคำถาม "วันนี้ต้องทำอะไร"
- **Given** อาจารย์/ผู้ประเมินขอให้ Demo หน้า Today Dashboard เพียงหน้าเดียว
- **When** นักศึกษาเปิดหน้า Today Dashboard ต่อหน้าอาจารย์
- **Then** อาจารย์ต้องสามารถตอบได้ทันทีว่า "วันนี้ต้องทำอะไรบ้าง" จากข้อมูลบนหน้าจอเดียว โดยไม่ต้องถามเพิ่มเติมหรือเปิดหน้าอื่นประกอบ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard#Gate (เกณฑ์ผ่าน Sprint)|Gate 1]]

## Sprint 2: Task Management

Spec: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|20260806-002]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-002-01: เพิ่ม Task แล้วปรากฏในรายการทันที
- **Given** ผู้ใช้อยู่ที่หน้า Tasks หรือ Today Dashboard และระบบใช้ข้อมูลจริง (ไม่ใช่ Mock Data)
- **When** ผู้ใช้กรอกฟอร์มเพิ่ม Task ใหม่ (ชื่องาน, Life Area, Deadline, Priority) แล้วกดบันทึก
- **Then** Task ใหม่ปรากฏในรายการทันทีโดยไม่ต้อง Refresh หน้า
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Acceptance Criteria|Sprint 2 - Acceptance Criteria]]

### AC-002-02: Refresh browser แล้วข้อมูล Task ยังอยู่
- **Given** ผู้ใช้เพิ่ม/แก้ไข Task ไว้แล้ว
- **When** ผู้ใช้ Refresh หน้าเว็บ (F5)
- **Then** ข้อมูล Task ทั้งหมดยังอยู่ครบเหมือนก่อน Refresh (อ่านจาก LocalStorage)
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Acceptance Criteria|Sprint 2 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Business Rules|Business Rules ข้อ 2]]

### AC-002-03: แก้ไขและลบ Task ได้
- **Given** มี Task อยู่ในระบบแล้วอย่างน้อย 1 รายการ
- **When** ผู้ใช้แก้ไขรายละเอียด Task หรือกดลบ Task นั้น
- **Then** การแก้ไขถูกบันทึกและแสดงผลถูกต้อง / Task ที่ถูกลบหายไปจากรายการทันที
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Acceptance Criteria|Sprint 2 - Acceptance Criteria]]

### AC-002-04: เปลี่ยน Status ของ Task ได้
- **Given** มี Task ที่มีสถานะ To Do อยู่
- **When** ผู้ใช้เปลี่ยนสถานะเป็น Doing แล้วเป็น Done ตามลำดับ
- **Then** สถานะของ Task อัปเดตถูกต้องตามที่เลือกทุกครั้ง
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Acceptance Criteria|Sprint 2 - Acceptance Criteria]]

### AC-002-05: Dashboard เปลี่ยนตามข้อมูล Task จริง
- **Given** ผู้ใช้มี Task จริงในระบบ (ไม่ใช่ Mock Data)
- **When** ผู้ใช้เพิ่ม/แก้ไข/เปลี่ยนสถานะ Task ใดๆ
- **Then** Summary Cards และ Today's Tasks บน Dashboard คำนวณและอัปเดตค่าใหม่โดยอัตโนมัติ (งานวันนี้, งานเสร็จแล้ว, งานค้าง, งานใกล้ครบกำหนด)
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Acceptance Criteria|Sprint 2 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Business Rules|Business Rules ข้อ 3]]

### AC-002-06: Task ที่ Deadline วันนี้ปรากฏบน Today Dashboard
- **Given** ผู้ใช้สร้าง Task ที่มี Deadline ตรงกับวันที่ปัจจุบัน
- **When** ผู้ใช้เปิดหน้า Today Dashboard
- **Then** Task นั้นปรากฏในส่วน Today's Tasks ของ Dashboard
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Acceptance Criteria|Sprint 2 - Acceptance Criteria]]

### AC-002-07: สร้าง Task โดยไม่มีชื่องานถูกปฏิเสธ
- **Given** Business Rules ข้อ 1 กำหนดว่า Task ต้องมี field ชื่องานเป็นอย่างน้อย
- **When** ผู้ใช้พยายามบันทึก Task โดยไม่กรอกชื่องาน
- **Then** ระบบไม่บันทึก Task และแจ้งให้กรอกชื่องานก่อน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Business Rules|Business Rules ข้อ 1]]

### AC-002-08: Gate 2 — Add → Edit → Done → Dashboard Update ครบวงจร
- **Given** ผู้ใช้เพิ่มงานจริง 5 งานแล้วใช้งานจริง 1 วัน
- **When** ผู้ใช้ทำ Add → Edit → เปลี่ยนเป็น Done ของงานเหล่านั้น
- **Then** Today Dashboard อัปเดตสถานะให้ตรงกับทุกการเปลี่ยนแปลงโดยอัตโนมัติ ครบทั้ง 5 งาน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management#Gate (เกณฑ์ผ่าน Sprint)|Gate 2]]

## Sprint 3: Calendar & Schedule

Spec: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|20260806-003]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-003-01: เพิ่มกิจกรรม/นัดหมาย/ตารางเรียนได้
- **Given** ผู้ใช้อยู่หน้า Calendar
- **When** ผู้ใช้กรอกฟอร์มเพิ่มกิจกรรมใหม่ (ชื่อ, ประเภท, วันที่, เวลาเริ่ม-สิ้นสุด, สถานที่, รายละเอียด) แล้วบันทึก
- **Then** กิจกรรมใหม่ปรากฏใน Calendar ทันที
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Acceptance Criteria|Sprint 3 - Acceptance Criteria]]

### AC-003-02: แก้ไขและลบกิจกรรมได้
- **Given** มีกิจกรรมอยู่ใน Calendar แล้ว
- **When** ผู้ใช้แก้ไขรายละเอียดกิจกรรมหรือลบกิจกรรมนั้น
- **Then** การแก้ไขถูกบันทึกถูกต้อง / กิจกรรมที่ลบหายไปจาก Calendar ทันที
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Acceptance Criteria|Sprint 3 - Acceptance Criteria]]

### AC-003-03: เปลี่ยนมุมมอง Calendar ได้ (Today/Week/Month)
- **Given** ผู้ใช้อยู่หน้า Calendar ในมุมมองใดมุมมองหนึ่ง
- **When** ผู้ใช้สลับไปมุมมอง Today, Week, หรือ Month
- **Then** Calendar แสดงข้อมูลตามช่วงเวลาของมุมมองที่เลือกถูกต้อง
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Acceptance Criteria|Sprint 3 - Acceptance Criteria]]

### AC-003-04: Task ที่มี Deadline ปรากฏใน Calendar อัตโนมัติ
- **Given** มี Task (จาก Sprint 2) ที่กำหนด Deadline ไว้
- **When** ผู้ใช้เปิดหน้า Calendar ในมุมมองที่ครอบคลุมวันนั้น
- **Then** Task ปรากฏใน Calendar โดยอัตโนมัติโดยไม่ต้องเพิ่มด้วยตนเองซ้ำ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Acceptance Criteria|Sprint 3 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Business Rules|Business Rules ข้อ 2, 3]]

### AC-003-05: Today Dashboard แสดงตารางวันนี้
- **Given** มีกิจกรรม/นัดหมายที่ตรงกับวันปัจจุบัน
- **When** ผู้ใช้เปิด Today Dashboard
- **Then** ส่วน Today's Schedule แสดงกิจกรรมของวันนี้ที่ดึงจากข้อมูล Calendar จริง
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Acceptance Criteria|Sprint 3 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Business Rules|Business Rules ข้อ 4]]

### AC-003-06: แก้ไข Deadline ของ Task อัปเดตใน Calendar โดยไม่สร้างข้อมูลซ้ำ
- **Given** Task มี Deadline ที่ปรากฏใน Calendar อยู่แล้ว
- **When** ผู้ใช้แก้ไข Deadline ของ Task นั้นจากหน้า Tasks
- **Then** ตำแหน่งของ Task บน Calendar ย้ายตาม Deadline ใหม่ทันที โดยไม่มี entity ซ้ำสองชุดของงานเดียวกัน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Business Rules|Business Rules ข้อ 3]]

### AC-003-07: เพิ่มกิจกรรมโดยไม่ระบุ Life Area ก็ยังใช้งานได้ปกติ
- **Given** การเชื่อม Life Area กับกิจกรรมเป็น optional
- **When** ผู้ใช้เพิ่มกิจกรรมใหม่โดยไม่เลือก Life Area ใดๆ
- **Then** กิจกรรมถูกบันทึกและแสดงผลปกติใน Calendar โดยไม่มี Life Area กำกับ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Business Rules|Business Rules ข้อ 7]]

### AC-003-08: Gate 3 — เห็นตารางเรียน/นัดหมาย/Deadline วันเดียวกันครบและเข้าใจง่าย
- **Given** วันหนึ่งมี 09:00 เรียน HCI, 13:00 ประชุมกลุ่ม, 23:59 ส่งงาน STEM
- **When** ผู้ใช้เปิดหน้า Calendar มุมมอง Today ของวันนั้น
- **Then** ผู้ใช้เห็นทั้งสามรายการเรียงตามเวลาอย่างเข้าใจง่าย ครบทั้งตารางเรียน นัดหมาย และ Deadline งาน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule#Gate (เกณฑ์ผ่าน Sprint)|Gate 3]]

## Sprint 4: File Organizer

Spec: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|20260806-004]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-004-01: เพิ่มไฟล์ได้
- **Given** ผู้ใช้อยู่หน้า Files
- **When** ผู้ใช้อัปโหลดไฟล์ใหม่ ตั้งชื่อ จัดหมวดหมู่ และระบุ Life Area
- **Then** ไฟล์ใหม่ปรากฏในรายการไฟล์ทันที
- อ้างอิง: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Acceptance Criteria|Sprint 4 - Acceptance Criteria]]

### AC-004-02: Refresh browser แล้วไฟล์ยังอยู่
- **Given** ผู้ใช้เพิ่มไฟล์ไว้แล้วอย่างน้อย 1 ไฟล์
- **When** ผู้ใช้ Refresh หน้าเว็บ
- **Then** ไฟล์ยังอยู่ครบ (อ่านจาก IndexedDB)
- อ้างอิง: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Acceptance Criteria|Sprint 4 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Business Rules|Business Rules ข้อ 2]]

### AC-004-03: Search ไฟล์ได้
- **Given** มีไฟล์หลายไฟล์อยู่ในระบบ
- **When** ผู้ใช้พิมพ์คำค้นหาในหน้า Files
- **Then** ระบบแสดงเฉพาะไฟล์ที่ตรงกับคำค้นหา
- อ้างอิง: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Acceptance Criteria|Sprint 4 - Acceptance Criteria]]

### AC-004-04: เชื่อมไฟล์กับ Task ได้
- **Given** มี Task และไฟล์อยู่ในระบบแล้ว
- **When** ผู้ใช้เลือกไฟล์เพื่อผูกเข้ากับ Task ที่ระบุ (เช่น Task "ส่งรายงาน STEM")
- **Then** ไฟล์นั้นถูกบันทึกเป็น Related File ของ Task
- อ้างอิง: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Acceptance Criteria|Sprint 4 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Business Rules|Business Rules ข้อ 3]]

### AC-004-05: เปิด Task แล้วเห็น Related Files ทันที
- **Given** Task มีไฟล์ที่เชื่อมโยงไว้แล้ว (เช่น report.docx, rubric.pdf, reference.pdf)
- **When** ผู้ใช้เปิดดูรายละเอียด Task นั้น
- **Then** ผู้ใช้เห็นรายการ Related Files ทั้งหมดที่เชื่อมไว้ทันทีโดยไม่ต้องไปหน้า Files แยก
- อ้างอิง: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Acceptance Criteria|Sprint 4 - Acceptance Criteria]]

### AC-004-06: ไฟล์ถูกเก็บใน IndexedDB ของเครื่องเท่านั้น ไม่มีการส่งออกไป Cloud
- **Given** Business Rules ข้อ 1 ห้ามใช้ Cloud Storage ใดๆ
- **When** ผู้ใช้อัปโหลดไฟล์ผ่านหน้า Files
- **Then** ไม่มี network request ส่งไฟล์ออกไปยัง server ภายนอกใดๆ ไฟล์อยู่ใน IndexedDB ของ Browser เท่านั้น
- อ้างอิง: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Business Rules|Business Rules ข้อ 1]]

### AC-004-07: Gate 4 — เห็นงาน → เปิดงาน → เจอไฟล์ที่ต้องใช้ทันที
- **Given** ผู้ใช้มี Task ที่มีไฟล์เกี่ยวข้องผูกไว้แล้ว
- **When** ผู้ใช้เห็นงานบน Dashboard/Tasks แล้วเปิดดูรายละเอียดงานนั้น
- **Then** ผู้ใช้เจอไฟล์ที่ต้องใช้ทันทีโดยไม่ต้องค้นหาแยก ถือว่าผ่าน Gate 4
- อ้างอิง: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer#Gate (เกณฑ์ผ่าน Sprint)|Gate 4]]

## Sprint 5: Notification & Deadline Awareness

Spec: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|20260806-005]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-005-01: งานใกล้ Deadline ถูกแจ้งเตือน
- **Given** มี Task ที่ Deadline ใกล้ถึง (Due Soon)
- **When** ระบบตรวจสอบ Deadline อัตโนมัติ
- **Then** Task นั้นปรากฏใน Notification Center พร้อมระดับ Due Soon
- อ้างอิง: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Acceptance Criteria|Sprint 5 - Acceptance Criteria]]

### AC-005-02: งาน Overdue แสดงชัดเจน
- **Given** มี Task ที่เลย Deadline ไปแล้ว
- **When** ผู้ใช้เปิด Notification Center หรือ Dashboard
- **Then** Task นั้นถูกแสดงด้วยสถานะ Overdue อย่างชัดเจน แยกจากระดับอื่น
- อ้างอิง: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Acceptance Criteria|Sprint 5 - Acceptance Criteria]]

### AC-005-03: Notification เชื่อมกลับไปยัง Task/Event ต้นทางได้
- **Given** มี Notification อยู่ใน Notification Center
- **When** ผู้ใช้คลิกที่ Notification นั้น
- **Then** ระบบพาผู้ใช้ไปยัง Task/Event ต้นทางของ Notification นั้นโดยตรง
- อ้างอิง: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Acceptance Criteria|Sprint 5 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Business Rules|Business Rules ข้อ 1]]

### AC-005-04: ระบบยังทำงานได้แม้ Browser Notification ถูกปิด
- **Given** ผู้ใช้ไม่อนุญาต (permission) หรือปิด Browser Notification
- **When** ระบบตรวจพบ Task/Event ที่ใกล้ครบกำหนด
- **Then** Notification Center ภายในระบบยังแสดงผลได้ตามปกติ ไม่ขึ้นกับ Browser Notification API
- อ้างอิง: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Acceptance Criteria|Sprint 5 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Business Rules|Business Rules ข้อ 2]]

### AC-005-05: Notification มีสถานะอ่านแล้ว/ยังไม่อ่าน
- **Given** มี Notification ใหม่ที่ยังไม่ถูกอ่าน
- **When** ผู้ใช้เปิดดู Notification นั้น
- **Then** สถานะเปลี่ยนจากยังไม่อ่านเป็นอ่านแล้ว และแสดงผลต่างจาก Notification ที่ยังไม่อ่าน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Feature Requirements / User Stories|Feature Requirements]]

### AC-005-06: Gate 5 — สถานะแจ้งเตือนถูกต้องตามระยะเวลาที่เหลือ
- **Given** มี Deadline จำลองที่เหลือ 24 ชั่วโมง, 1 ชั่วโมง, และเลยเวลาไปแล้ว
- **When** ระบบประมวลผล Deadline ทั้งสามกรณี
- **Then** ระบบแสดงสถานะแตกต่างกันถูกต้องตามระยะเวลาที่เหลือของแต่ละกรณี
- อ้างอิง: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness#Gate (เกณฑ์ผ่าน Sprint)|Gate 5]]

## Sprint 6: Integration, UX & Final Testing (ปิดจบ Version 1/Core)

Spec: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|20260806-006]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-006-01: ผู้ใช้ใหม่ทำ Final Journey ของ Version 1 ได้ครบโดยไม่ต้องมีคนสอน
- **Given** ผู้ใช้ใหม่เปิด My Today เป็นครั้งแรกโดยไม่มีใครอธิบายวิธีใช้มาก่อน
- **When** ผู้ใช้เพิ่มงาน → กำหนด Deadline → แนบไฟล์กับงาน → รอจนได้รับการแจ้งเตือน → เปลี่ยนงานเป็น Done
- **Then** งานปรากฏบน Dashboard, Deadline ปรากฏบน Calendar, การแจ้งเตือนทำงานถูกต้อง, และ Dashboard อัปเดตสถานะเป็นเสร็จแล้วโดยอัตโนมัติ ครบทั้ง 8 ขั้นตอนโดยไม่ต้องมีคนสอน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Acceptance Criteria (Final Acceptance Criteria ของ Version 1)|Sprint 6 - Final Acceptance Criteria ข้อ 1-8]]

### AC-006-02: มีลิงก์ Privacy Notice/Terms of Use เข้าถึงได้จากทุกหน้า
- **Given** ผู้ใช้อยู่หน้าใดก็ได้ในระบบ
- **When** ผู้ใช้เลื่อนไปที่ Footer ของหน้า
- **Then** ผู้ใช้เห็นลิงก์ Privacy Notice / Terms of Use และคลิกเข้าถึงได้จริงจากทุกหน้า
- อ้างอิง: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Acceptance Criteria (เพิ่มเติม)|Sprint 6 - Acceptance Criteria (เพิ่มเติม) ข้อ 1]]

### AC-006-03: เนื้อหา Privacy Notice ครอบคลุมตาม Business Rules ข้อ 1
- **Given** ผู้ใช้เปิดหน้า Privacy Notice
- **When** ผู้ใช้อ่านเนื้อหา
- **Then** เนื้อหาระบุครบว่าข้อมูลเก็บในเครื่องเท่านั้น (LocalStorage+IndexedDB) ไม่มีเซิร์ฟเวอร์/analytics, ผู้ใช้ควบคุมข้อมูลเอง, และคำแนะนำไม่บันทึกข้อมูลอ่อนไหว
- อ้างอิง: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Acceptance Criteria (เพิ่มเติม)|Sprint 6 - Acceptance Criteria (เพิ่มเติม) ข้อ 2]], [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Business Rules (เพิ่มเติม)|Business Rules (เพิ่มเติม) ข้อ 1]]

### AC-006-04: เนื้อหา Terms of Use ครอบคลุมตาม Business Rules ข้อ 2-3
- **Given** ผู้ใช้เปิดหน้า Terms of Use
- **When** ผู้ใช้อ่านเนื้อหา
- **Then** เนื้อหาระบุความรับผิดชอบต่อเนื้อหา/ไฟล์ที่ผู้ใช้บันทึก สถานะไม่เข้าข่าย พ.ร.บ.คอมพิวเตอร์แบบผู้ให้บริการที่มีเซิร์ฟเวอร์ และความรับผิดชอบด้านลิขสิทธิ์ไฟล์แนบครบถ้วน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Acceptance Criteria (เพิ่มเติม)|Sprint 6 - Acceptance Criteria (เพิ่มเติม) ข้อ 3]], [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Business Rules (เพิ่มเติม)|Business Rules (เพิ่มเติม) ข้อ 2-3]]

### AC-006-05: ยืนยันไม่มีการส่งข้อมูลผู้ใช้ออกนอกเครื่องจริง
- **Given** ผู้ใช้ใช้งาน Task/Calendar/File ตามปกติ
- **When** ทีมทดสอบเปิด Network tab ของ Browser ตรวจสอบระหว่างใช้งาน (Black Box Testing)
- **Then** ไม่พบ network request ใดที่แนบข้อมูลส่วนบุคคลของผู้ใช้ออกไปนอกเครื่อง
- อ้างอิง: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Acceptance Criteria (เพิ่มเติม)|Sprint 6 - Acceptance Criteria (เพิ่มเติม) ข้อ 4]]

### AC-006-06: Gate 6/Final Gate — Final User Journey ผ่านทั้งสอง Persona ด้วย Core เดียวกัน
- **Given** (1) นักศึกษามีงาน STEM ต้องส่งวันศุกร์ 23:59 น. (2) บุคคลทั่วไปมีบิลค่าไฟต้องจ่ายก่อนสิ้นเดือน
- **When** ทั้งสองคนบันทึกเป็น Task ใน Life Area ของตน (Study / Finance) → แนบไฟล์ → เห็น Deadline ใน Calendar → เปิด Dashboard ตอนเช้า → ได้รับการแจ้งเตือน → กด Done
- **Then** ทั้งสอง Journey ผ่านได้ครบโดยใช้ Task + Life Area + Calendar + File + Notification + Dashboard ชุดเดียวกัน ไม่มี code path แยกตาม persona ใดๆ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#Gate (เกณฑ์ผ่าน Sprint)|Gate 6/Final Gate]], [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing#เพิ่มเติม (20260806): Generalize Target User — Final Acceptance Criteria คู่ Persona|Generalize Target User - Final AC คู่ Persona]]

## Sprint 7: Life Area / Workspace & Personal Profile

Spec: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|20260806-007]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-007-01: สร้าง Life Area ใหม่และผูกกับ Task ได้จริง
- **Given** ผู้ใช้อยู่หน้า Life Area management
- **When** ผู้ใช้สร้าง Life Area ใหม่ชื่อ "Finance" แล้วนำไปเลือกตอนสร้าง/แก้ไข Task
- **Then** Task นั้นถูกผูกกับ Life Area "Finance" สำเร็จ และแสดงผลถูกต้องในหน้า Tasks/Dashboard
- อ้างอิง: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Acceptance Criteria|Sprint 7 - Acceptance Criteria]]

### AC-007-02: แก้ไข/ลบ Life Area โดย Task ที่เคยผูกไว้ยังไม่หาย
- **Given** มี Life Area ที่ถูกผูกกับ Task อย่างน้อย 1 รายการ
- **When** ผู้ใช้แก้ไขชื่อ Life Area นั้น หรือลบ Life Area นั้นทิ้ง
- **Then** การแก้ไขชื่อสะท้อนผลถูกต้อง / เมื่อลบ Life Area, Task ที่เคยผูกยังคงอยู่ในระบบ เพียงแต่ไม่มี Life Area กำกับแล้ว
- อ้างอิง: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Acceptance Criteria|Sprint 7 - Acceptance Criteria]]

### AC-007-03: กรอก Personal Profile แค่ Name อย่างเดียวก็ใช้งานได้
- **Given** ผู้ใช้เปิดหน้า Personal Profile เป็นครั้งแรก
- **When** ผู้ใช้กรอกเฉพาะช่อง Name แล้วบันทึก โดยไม่กรอก Student ID/Faculty/Major/Organization/Position
- **Then** ระบบบันทึก Profile สำเร็จและใช้งานต่อได้ปกติ โดยไม่บังคับกรอกข้อมูลการศึกษา/องค์กรใดๆ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Acceptance Criteria|Sprint 7 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Business Rules|Business Rules ข้อ 4]]

### AC-007-04: Today Dashboard และ Task Management ยังทำงานได้ครบหลังเปลี่ยน subject เป็น lifeAreaId
- **Given** ระบบเปลี่ยน field `Task.subject` เป็น `Task.lifeAreaId` แล้ว (breaking change)
- **When** ผู้ใช้ใช้งาน Today Dashboard และหน้า Tasks ตามปกติ (เพิ่ม/แก้ไข/ลบ/ดู)
- **Then** ทุกฟีเจอร์เดิมของ Sprint 1-2 ยังทำงานได้ครบถ้วนโดยอ้างอิง Life Area แทน subject เดิม
- อ้างอิง: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Acceptance Criteria|Sprint 7 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Business Rules|Business Rules ข้อ 3, 5]]

### AC-007-05: สร้าง Task ด้วย Life Area ต่างกันใช้กลไก/หน้าจอเดียวกัน ไม่มี logic แยกตาม persona
- **Given** มีผู้ใช้สองคน คนหนึ่งใช้ Life Area "Study" อีกคนใช้ Life Area "Finance"
- **When** ทั้งสองสร้าง Task ผ่านฟอร์มเดียวกันในระบบ
- **Then** ทั้งสอง Task ถูกสร้างและแสดงผลผ่านกลไก/หน้าจอเดียวกันทั้งหมด ไม่มี code path แยกตาม persona
- อ้างอิง: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Acceptance Criteria|Sprint 7 - Acceptance Criteria]]

### AC-007-06: เชื่อม Task กับ Life Area เป็น optional
- **Given** การเชื่อม Task กับ Life Area ไม่บังคับ
- **When** ผู้ใช้สร้าง Task ใหม่โดยไม่เลือก Life Area ใดๆ
- **Then** Task ถูกสร้างและใช้งานได้ตามปกติแม้ไม่มี Life Area กำกับ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Business Rules|Business Rules ข้อ 2]]

### AC-007-07: Gate 7 — สอง Persona ใช้กลไกเดียวกันสำเร็จ
- **Given** (1) นักศึกษาต้องการสร้าง Task "ส่งรายงาน HCI" ใน Life Area "Study" (2) บุคคลทั่วไปต้องการสร้าง Task "จ่ายค่าไฟ" ใน Life Area "Finance"
- **When** ทั้งสองคนสร้าง Task ผ่าน Task + Life Area + Dashboard ชุดเดียวกัน
- **Then** ทั้งสองทำงานสำเร็จผ่านกลไกเดียวกันทั้งหมด ไม่มี code path แยกกัน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile#Gate (เกณฑ์ผ่าน Sprint)|Gate 7]]

## Sprint 8: Universal Inbox + Quick Capture

Spec: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|20260806-009]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-009-01: Quick Capture "จ่ายค่าไฟ 10 สิงหาคม" เป็น Task ได้ในไม่กี่วินาที
- **Given** ผู้ใช้อยู่หน้าใดก็ได้ในระบบ
- **When** ผู้ใช้กดปุ่ม "+ Add to My Today" เลือกประเภท Task แล้วพิมพ์ข้อความ "จ่ายค่าไฟ 10 สิงหาคม" แล้วบันทึกทันที
- **Then** Task ใหม่ถูกสร้างสำเร็จภายในไม่กี่วินาทีโดยไม่ต้องกรอกฟอร์มเต็ม
- อ้างอิง: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Acceptance Criteria|Sprint 8 - Acceptance Criteria]]

### AC-009-02: รายการที่ capture มาปรากฏในหน้า Inbox ทันที
- **Given** ผู้ใช้เพิ่ง Quick Capture รายการใหม่มาแบบยังไม่จัด Life Area
- **When** ผู้ใช้เปิดหน้า "My Inbox"
- **Then** รายการนั้นปรากฏในหน้า Inbox ทันที
- อ้างอิง: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Acceptance Criteria|Sprint 8 - Acceptance Criteria]]

### AC-009-03: จัดรายการจาก Inbox เข้า Life Area "Finance" ได้
- **Given** มีรายการอยู่ใน Inbox ที่ยังไม่จัด Life Area
- **When** ผู้ใช้เลือกรายการนั้นแล้วจัดเข้า Life Area "Finance"
- **Then** รายการนั้นกลายเป็น Task ปกติที่ปรากฏในหน้า Tasks/Dashboard เหมือน Task ที่สร้างผ่านฟอร์มเต็มทุกประการ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Acceptance Criteria|Sprint 8 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Business Rules|Business Rules ข้อ 2]]

### AC-009-04: สร้าง Note และ Link ผ่าน Quick Capture ได้และดูได้ภายหลัง
- **Given** ผู้ใช้เปิด Quick Capture Modal
- **When** ผู้ใช้เลือกประเภท Note หรือ Link แล้วกรอกข้อมูลขั้นต่ำ (ชื่อ/เนื้อหา หรือ ชื่อ/URL) แล้วบันทึก
- **Then** Note/Link ใหม่ถูกสร้างสำเร็จ และผู้ใช้ดูรายการนั้นได้ภายหลังจากหน้า Inbox หรือหลังจัด Life Area แล้ว
- อ้างอิง: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Acceptance Criteria|Sprint 8 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Business Rules|Business Rules ข้อ 3, 4]]

### AC-009-05: ระบบไม่ auto-parse ข้อความอิสระ
- **Given** ผู้ใช้พิมพ์ข้อความอิสระ "จ่ายค่าไฟ 10 สิงหาคม" ตอน Quick Capture
- **When** ระบบบันทึกรายการ
- **Then** ระบบเก็บข้อความทั้งหมดเป็น title ตรงๆ โดยไม่แยกวันที่ "10 สิงหาคม" ออกมาเป็น Deadline อัตโนมัติ (ไม่มี AI parsing)
- อ้างอิง: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Business Rules|Business Rules ข้อ 5]]

### AC-009-06: Gate 8 — Capture ครบ 5 ประเภทแล้วจัดเข้า Life Area จนหมด Inbox
- **Given** ผู้ใช้ต้องการทดสอบ Quick Capture ครบทุกประเภท
- **When** ผู้ใช้ capture รายการประเภท Task, Event, File, Note, Link เข้า Inbox ครบทั้ง 5 ประเภท แล้วจัดแต่ละรายการเข้า Life Area ที่เหมาะสมทีละอัน
- **Then** ทำได้ครบทุกประเภทโดยไม่มี error จน Inbox ว่างเปล่า
- อ้างอิง: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture#Gate (เกณฑ์ผ่าน Sprint)|Gate 8]]

## Sprint 9: Now/Next/Later Timeline + Smart Priority + Life Progress

Spec: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|20260806-010]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-010-01: Timeline แบ่ง Now/Next/Later ถูกต้องตามเวลาปัจจุบัน
- **Given** มี Task/Event หลายรายการของวันนี้กระจายอยู่หลายช่วงเวลา
- **When** ผู้ใช้เปิดมุมมอง Timeline
- **Then** รายการถูกจัดกลุ่มเป็น Now (ถึงเวลาแล้ว/เริ่มภายใน 1 ชม.ข้างหน้า), Next (ที่เหลือของวันนี้ถัดจาก Now), Later (ไกลออกไปอีก/ยังไม่ระบุเวลาแน่นอน) ถูกต้องตามเวลาปัจจุบันจริง
- อ้างอิง: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Acceptance Criteria|Sprint 9 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Business Rules|Business Rules ข้อ 1]]

### AC-010-02: รายการ Overdue ขึ้นก่อนเสมอไม่ว่า Priority จะเป็นอะไร
- **Given** มีรายการ Overdue ที่ Priority ต่ำ (Low) และรายการ Priority สูง (High) ที่ยังไม่ถึงกำหนด
- **When** ผู้ใช้ดู Today's Tasks หรือ Timeline ที่จัดเรียงด้วย Smart Priority
- **Then** รายการ Overdue ปรากฏก่อนรายการ Priority สูงเสมอ ตามลำดับ Overdue → Due Today → Upcoming → High Priority → Normal
- อ้างอิง: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Acceptance Criteria|Sprint 9 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Business Rules|Business Rules ข้อ 2]]

### AC-010-03: Life Progress แสดงตัวเลขถูกต้องตรงกับข้อมูลจริง แยกตาม Life Area
- **Given** มี Task ที่ครบกำหนดวันนี้หลายรายการ กระจายในหลาย Life Area และบางส่วนมีสถานะ Done แล้ว
- **When** ผู้ใช้ดู Life Progress บน Dashboard
- **Then** ตัวเลขรวม (เช่น "วันนี้เสร็จแล้ว 4 จาก 7 เรื่อง") และตัวเลขแยกตาม Life Area ตรงกับข้อมูล Task จริงทุกจุด
- อ้างอิง: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Acceptance Criteria|Sprint 9 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Business Rules|Business Rules ข้อ 3]]

### AC-010-04: ข้อความ UI ไม่มีคำว่า "Score" หรือลักษณะตัดสิน
- **Given** ผู้ใช้ดู Life Progress บน Dashboard
- **When** ผู้ใช้อ่านข้อความ/label ทั้งหมดที่เกี่ยวข้องกับ Life Progress
- **Then** ไม่พบคำว่า "Score" หรือข้อความลักษณะตัดสิน/เปรียบเทียบผู้ใช้ใดๆ ในทุกจุด
- อ้างอิง: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Acceptance Criteria|Sprint 9 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Business Rules|Business Rules ข้อ 3]]

### AC-010-05: Timeline ครอบคลุมเฉพาะวันนี้ รายการอนาคตไกลอยู่ใน Upcoming/Calendar ตามเดิม
- **Given** มี Task ที่ Deadline อยู่ในอีก 3 วันข้างหน้า (ไม่ใช่วันนี้)
- **When** ผู้ใช้เปิดมุมมอง Timeline
- **Then** Task นั้นไม่ปรากฏใน Timeline (Now/Next/Later) แต่ยังคงปรากฏในส่วน Upcoming และ Calendar ตามปกติ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Business Rules|Business Rules ข้อ 1]]

### AC-010-06: Gate 9 — Timeline และ Life Progress ถูกต้องตามสถานการณ์จำลองจริง
- **Given** วันหนึ่งมีรายการ 08:30 ประชุม (Work), 11:30 จ่ายค่าไฟ (Finance), 17:00 รับลูก (Family)
- **When** ผู้ใช้เปิด Timeline และ Life Progress ระหว่างวันนั้น
- **Then** Timeline แบ่ง Now/Next/Later ถูกต้องตามเวลาจริงของแต่ละรายการ และ Life Progress แยกตาม Life Area (Work/Finance/Family) ถูกต้องตามสถานะจริงของแต่ละรายการ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress#Gate (เกณฑ์ผ่าน Sprint)|Gate 9]]

## Sprint 10: Task-Event-File-Note-Link Linking (What/When/Information)

Spec: [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|20260806-011]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-011-01: Task "ไปโรงพยาบาล" เชื่อมไฟล์ 2 ไฟล์ + Note 1 อัน + Reminder ก่อน 1 วัน เห็นครบในหน้าเดียว
- **Given** ผู้ใช้ต้องการสร้าง Task "ไปโรงพยาบาล" วันที่ 8 สิงหาคม 09:00
- **When** ผู้ใช้เชื่อมไฟล์ใบนัด/ผลตรวจ 2 ไฟล์ เพิ่ม Note "อาคาร 2 ชั้น 3" และตั้ง Reminder ก่อน 1 วัน แล้วเปิดหน้า Task Detail
- **Then** หน้า Task Detail แสดงครบทั้ง What (รายละเอียดงาน), When (วันเวลา/Reminder), Information (ไฟล์ 2 ไฟล์ + Note) ในหน้าเดียวโดยไม่ต้องสลับหน้า
- อ้างอิง: [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Acceptance Criteria|Sprint 10 - Acceptance Criteria]]

### AC-011-02: Task "ส่งบทความ" เชื่อมไฟล์ 2 ไฟล์และกำหนด Life Area "Research" ถูกต้อง
- **Given** ผู้ใช้ต้องการสร้าง Task "ส่งบทความ" กำหนดส่งวันที่ 15 สิงหาคม
- **When** ผู้ใช้เชื่อมไฟล์ manuscript.docx และ reviewer-comments.pdf และกำหนด Life Area เป็น "Research"
- **Then** Task Detail แสดงไฟล์ทั้ง 2 ไฟล์และ Life Area "Research" ถูกต้องครบถ้วน
- อ้างอิง: [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Acceptance Criteria|Sprint 10 - Acceptance Criteria]]

### AC-011-03: Custom reminder lead time มีผลแทน default ของ Sprint 5 จริง
- **Given** Task มีการตั้ง custom `reminderLeadTime` ไว้ (เช่น เตือนก่อน 1 วัน) ต่างจาก default ของระบบ
- **When** ระบบประมวลผลการแจ้งเตือนด้วย deadline จำลอง
- **Then** ระบบใช้ค่า `reminderLeadTime` ที่ผู้ใช้ตั้งเองแทนค่า default ของ Sprint 5 สำหรับ Task นั้นโดยเฉพาะ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Acceptance Criteria|Sprint 10 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Business Rules|Business Rules ข้อ 2]]

### AC-011-04: การเชื่อม Task-File แบบเดิมจาก Sprint 4 ยังทำงานได้ปกติ
- **Given** Task มี Related Files ที่เชื่อมไว้ตั้งแต่ก่อน Sprint 10 (กลไก Sprint 4)
- **When** ผู้ใช้เปิดดู Task Detail แบบใหม่ (What/When/Information)
- **Then** Related Files เดิมยังแสดงผลถูกต้องครบถ้วนในส่วน Information โดยไม่ถูกแทนที่หรือหายไป
- อ้างอิง: [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Acceptance Criteria|Sprint 10 - Acceptance Criteria]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Business Rules|Business Rules ข้อ 5]]

### AC-011-05: Event ก็เชื่อมกับ Note/Link/File ได้ด้วยกลไกเดียวกัน
- **Given** ผู้ใช้มี Event ในปฏิทิน (ไม่ใช่ Task)
- **When** ผู้ใช้เชื่อมไฟล์/Note/Link เข้ากับ Event นั้น
- **Then** Event Detail แสดงข้อมูลที่เชื่อมไว้ครบถ้วนด้วยกลไกเดียวกับ Task
- อ้างอิง: [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Business Rules|Business Rules ข้อ 4]]

### AC-011-06: Gate 10 — เปิด Task แล้วเห็น What+When+Information ครบในหน้าเดียวทั้งสอง Scenario
- **Given** มี Scenario ทั้งสองแบบตามตัวอย่าง (ไปโรงพยาบาล, ส่งบทความ) ถูกสร้างไว้ครบตาม Business Rules
- **When** ผู้ใช้เปิด Task Detail ของแต่ละ Scenario
- **Then** ผู้ใช้เห็น What, When, Information ครบในหน้าเดียวโดยไม่ต้องสลับหน้าเลย ทั้งสอง Scenario
- อ้างอิง: [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking#Gate (เกณฑ์ผ่าน Sprint)|Gate 10]]

## Sprint 11: Competition Demo + UX Polish, then Freeze

Spec: [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|20260806-012]] | Backlog: [[../../01-requirements/backlog|backlog]]

### AC-012-01: ผู้ใช้ใหม่ทำ Final Competition User Journey ได้ครบทั้งสอง Persona โดยไม่ต้องมีคนสอน
- **Given** ผู้ใช้ใหม่เปิด My Today เวอร์ชัน Competition Track เป็นครั้งแรก
- **When** ผู้ใช้ทำ Journey ของนักศึกษา (ส่งรายงาน HCI) และ Journey ของบุคคลทั่วไป (จ่ายค่าไฟ) ตาม Business Rules ข้อ 2
- **Then** ผู้ใช้ทำได้ครบทั้งสอง Journey โดยไม่ต้องมีใครอธิบายวิธีใช้
- อ้างอิง: [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Acceptance Criteria (Final Acceptance Criteria ของ Competition Track / Version 2)|Sprint 11 - Acceptance Criteria ข้อ 1]]

### AC-012-02: ไม่มี Console Error ในทุกหน้าจอใหม่จาก Sprint 7-10
- **Given** ผู้ใช้เปิด Developer Console ไว้
- **When** ผู้ใช้ใช้งานหน้าจอใหม่ทั้งหมดจาก Sprint 7-10 (Life Area management, Personal Profile, Inbox, Timeline, Task Detail แบบใหม่)
- **Then** ไม่มีข้อความ Error ปรากฏใน Console ในทุกหน้าจอ
- อ้างอิง: [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Acceptance Criteria (Final Acceptance Criteria ของ Competition Track / Version 2)|Sprint 11 - Acceptance Criteria ข้อ 2]]

### AC-012-03: Responsive ครบ Mobile/Tablet/Desktop เหมือน Sprint 6
- **Given** ผู้ใช้เปิดหน้าจอใหม่จาก Sprint 7-10 ด้วยขนาดหน้าจอ Mobile (390px), Tablet, และ Desktop
- **When** ผู้ใช้ดูและโต้ตอบกับแต่ละหน้าจอในทั้ง 3 ขนาด
- **Then** ทุกหน้าจอแสดงผลถูกต้อง ไม่ overflow ไม่ต้อง scroll แนวนอนผิดปกติ เทียบเท่ามาตรฐานของ Sprint 6
- อ้างอิง: [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Acceptance Criteria (Final Acceptance Criteria ของ Competition Track / Version 2)|Sprint 11 - Acceptance Criteria ข้อ 3]]

### AC-012-04: Demo script พร้อมใช้จริงพร้อม Positioning Narrative ครบ
- **Given** ทีมเตรียม Competition Demo
- **When** ทีมเปิด/อ่าน Demo script ที่เตรียมไว้
- **Then** Demo script มี Final User Journey คู่ persona และ Positioning Narrative ครบตาม Business Rules ข้อ 3 (ไม่พูดว่า "เว็บจัดการ Task" แต่ใช้ narrative "Personal Daily Workspace")
- อ้างอิง: [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Acceptance Criteria (Final Acceptance Criteria ของ Competition Track / Version 2)|Sprint 11 - Acceptance Criteria ข้อ 4]], [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Business Rules|Business Rules ข้อ 3]]

### AC-012-05: หลัง Freeze ไม่รับ Feature ใหม่เข้า Version 2
- **Given** Sprint 11 เสร็จสมบูรณ์และเข้าสู่สถานะ Freeze แล้ว
- **When** มีคนเสนอ Feature ใหม่ (เช่น AI Daily Orchestrator) เข้ามาหลังจากนี้
- **Then** Feature นั้นไม่ถูกรับเข้า Version 2 ทันที แต่ต้องผ่านกระบวนการ requirement intake ใหม่สำหรับ Phase/Version ถัดไป
- อ้างอิง: [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Business Rules|Business Rules ข้อ 4]]

### AC-012-06: Gate 11/Final Gate — Final Competition User Journey ผ่านทั้งสอง Persona แบบ end-to-end
- **Given** (1) นักศึกษาเพิ่ม Task "ส่งรายงาน HCI" ผ่าน Quick Capture (2) บุคคลทั่วไปเพิ่ม Task "จ่ายค่าไฟ" ผ่าน Quick Capture
- **When** ทั้งสองคนทำตามขั้นตอน เข้า Inbox → จัดเข้า Life Area → กำหนด Deadline/แนบไฟล์ → เห็นใน Calendar/Timeline → ได้รับการเตือนตาม Reminder → กด Done → Life Progress อัปเดต
- **Then** ทั้งสอง Journey สำเร็จครบทุกขั้นตอนโดยใช้ Core เดียวกันทั้งหมด (Quick Capture, Inbox, Life Area, Task, Timeline, Notification, Life Progress) ไม่มี code path แยกตาม persona ถือว่า My Today — One Life, One Workspace (Version 2) สำเร็จและเข้าสู่ Freeze
- อ้างอิง: [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Gate (เกณฑ์ผ่าน Sprint)|Gate 11/Final Gate]], [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze#Business Rules|Business Rules ข้อ 2]]
