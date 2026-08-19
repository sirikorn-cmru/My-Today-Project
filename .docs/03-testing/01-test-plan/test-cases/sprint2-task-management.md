# Test Case: Sprint 2 — Task Management

เชื่อมโยงกลับ: [[../index|index]]

เอกสารที่เกี่ยวข้อง: [[../../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|20260806-002-my-today-sprint2-task-management]] (Spec), [[../acceptance-criteria#Sprint 2: Task Management|acceptance-criteria — Sprint 2: Task Management]]

## คำอธิบาย

Test case ทั้งหมดในไฟล์นี้เป็นแบบ **manual/black-box** ทดสอบด้วยมือบน dev build ที่รันอยู่ (`npm run dev`) ไม่มี test runner อัตโนมัติในโปรเจกต์นี้ (ดู `CLAUDE.md` → Commands)

**Pre-condition ร่วมของทุก Test Case (เว้นแต่ระบุเป็นอย่างอื่น):** เปิด My Today ด้วย Browser ที่ยังไม่เคย seed ข้อมูลซ้ำ (หรือ clear LocalStorage key ของ Task ก่อนเริ่มชุดทดสอบ), มี Life Area อย่างน้อย 1 รายการให้เลือก (เช่น "Study", "Finance")

---

## เพิ่ม Task (Create)

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-01 | เพิ่ม Task ใหม่ครบทุก field แล้วปรากฏในรายการทันที | ผู้ใช้อยู่หน้า Tasks หรือ Today Dashboard และระบบใช้ข้อมูลจริง (ไม่ใช่ Mock Data) | 1. เปิดฟอร์มเพิ่ม Task (ปุ่ม "+ เพิ่มงาน")<br>2. กรอกชื่องาน "ส่งรายงาน HCI"<br>3. กรอกรายละเอียด "สรุปงานกลุ่ม Human-Centered Design"<br>4. เลือก Life Area "Study"<br>5. กำหนดวันที่กำหนดส่ง เป็นวันศุกร์ถัดไป เวลา 23:59<br>6. เลือก Priority "High"<br>7. กดบันทึก | Task ใหม่ปรากฏในรายการทันทีโดยไม่ต้อง Refresh หน้า ค่าที่แสดงตรงกับที่กรอกทุก field, Status เริ่มต้นเป็น "To Do" | ชื่องาน: "ส่งรายงาน HCI", รายละเอียด: "สรุปงานกลุ่ม Human-Centered Design", Life Area: "Study", Deadline: วันศุกร์ถัดไป 23:59, Priority: High | [[../acceptance-criteria#AC-002-01: เพิ่ม Task แล้วปรากฏในรายการทันที\|AC-002-01]] |
| TC-002-02 | เพิ่ม Task โดยไม่กรอกชื่องาน ถูกปฏิเสธ | ผู้ใช้เปิดฟอร์มเพิ่ม Task | 1. เปิดฟอร์มเพิ่ม Task<br>2. เว้นช่องชื่องานว่างไว้<br>3. กรอก field อื่น (Life Area, Deadline, Priority) ตามปกติ<br>4. กดบันทึก | ระบบไม่บันทึก Task ใหม่ และแจ้งเตือนให้กรอกชื่องานก่อน (เช่น validation message ใต้ช่องชื่องาน) ไม่มี Task ว่างเปล่าถูกเพิ่มเข้ารายการ | ชื่องาน: (ว่าง), Life Area: "Study", Deadline: วันพรุ่งนี้, Priority: Medium | [[../acceptance-criteria#AC-002-07: สร้าง Task โดยไม่มีชื่องานถูกปฏิเสธ\|AC-002-07]], Business Rules ข้อ 1 |
| TC-002-03 | เพิ่ม Task โดยไม่เลือก Priority ใช้ค่า default ได้ (สอดคล้อง Business Rules ข้อ 1: field Priority ต้องมีอยู่) | ผู้ใช้เปิดฟอร์มเพิ่ม Task | 1. กรอกชื่องาน "จัดตู้เอกสาร"<br>2. เว้น Priority ไม่เลือกเอง (ถ้าฟอร์มบังคับเลือก ให้เลือกค่าที่ระบบเสนอเป็นค่าเริ่มต้น)<br>3. กดบันทึก | Task ถูกสร้างสำเร็จและมีค่า Priority ที่ถูกต้องหนึ่งใน High/Medium/Low ปรากฏบน Task Card ไม่ปล่อยว่าง | ชื่องาน: "จัดตู้เอกสาร", Priority: (ค่า default ของฟอร์ม) | Business Rules ข้อ 1 |
| TC-002-04 | เพิ่ม Task แล้ว Refresh Browser ข้อมูลยังอยู่ (LocalStorage) | มี Task อย่างน้อย 1 รายการที่เพิ่งเพิ่มไว้ (เช่นจาก TC-002-01) | 1. บันทึก Task "ส่งรายงาน HCI" ตาม TC-002-01<br>2. กด Refresh หน้าเว็บ (F5)<br>3. เปิดหน้า Tasks อีกครั้ง | ข้อมูล Task ทั้งหมดยังอยู่ครบเหมือนก่อน Refresh ทุก field (ชื่องาน, รายละเอียด, Life Area, Deadline, Priority, Status) ตรงกับก่อนกด Refresh | Task ที่มีอยู่แล้วในระบบ (จาก TC-002-01) | [[../acceptance-criteria#AC-002-02: Refresh browser แล้วข้อมูล Task ยังอยู่\|AC-002-02]], Business Rules ข้อ 2 |

## แก้ไข Task (Update)

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-05 | แก้ไขรายละเอียด Task ที่มีอยู่แล้วสำเร็จ | มี Task "ส่งรายงาน HCI" อยู่ในระบบแล้ว (สถานะ To Do) | 1. เปิดหน้า Tasks<br>2. กดแก้ไข Task "ส่งรายงาน HCI"<br>3. เปลี่ยนชื่องานเป็น "ส่งรายงาน HCI (ฉบับแก้ไข)"<br>4. เปลี่ยน Deadline เป็นวันเสาร์ถัดไป เวลา 12:00<br>5. กดบันทึก | การแก้ไขถูกบันทึกและแสดงผลถูกต้องทันทีในรายการ Task โดยไม่ต้อง Refresh — ชื่องานและ Deadline ใหม่ปรากฏแทนค่าเดิม | ชื่องานใหม่: "ส่งรายงาน HCI (ฉบับแก้ไข)", Deadline ใหม่: วันเสาร์ถัดไป 12:00 | [[../acceptance-criteria#AC-002-03: แก้ไขและลบ Task ได้\|AC-002-03]] |
| TC-002-06 | แก้ไข Task แล้ว Refresh ข้อมูลที่แก้ไขยังอยู่ | มี Task ที่เพิ่งแก้ไขไว้ (จาก TC-002-05) | 1. แก้ไข Task ตาม TC-002-05<br>2. กด Refresh หน้าเว็บ (F5) | ค่าที่แก้ไขล่าสุด (ชื่องาน, Deadline) ยังคงอยู่หลัง Refresh ไม่ย้อนกลับไปเป็นค่าก่อนแก้ไข | Task ที่แก้ไขแล้วจาก TC-002-05 | [[../acceptance-criteria#AC-002-02: Refresh browser แล้วข้อมูล Task ยังอยู่\|AC-002-02]], Business Rules ข้อ 2 |

## ลบ Task (Delete)

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-07 | ลบ Task ออกจากรายการทันที | มี Task อย่างน้อย 2 รายการในระบบ เช่น "ส่งรายงาน HCI" และ "จัดตู้เอกสาร" | 1. เปิดหน้า Tasks<br>2. กดปุ่มลบที่ Task "จัดตู้เอกสาร"<br>3. ยืนยันการลบ (ถ้ามี dialog ยืนยัน) | Task "จัดตู้เอกสาร" หายไปจากรายการทันที ส่วน Task อื่น ("ส่งรายงาน HCI") ยังคงอยู่ครบไม่ได้รับผลกระทบ | Task ที่จะลบ: "จัดตู้เอกสาร" | [[../acceptance-criteria#AC-002-03: แก้ไขและลบ Task ได้\|AC-002-03]] |
| TC-002-08 | ลบ Task แล้ว Refresh ข้อมูลไม่กลับมา | เพิ่งลบ Task "จัดตู้เอกสาร" ตาม TC-002-07 | 1. ลบ Task ตาม TC-002-07<br>2. กด Refresh หน้าเว็บ (F5) | Task ที่ถูกลบไม่กลับมาปรากฏอีกหลัง Refresh (การลบถูกบันทึกลง LocalStorage จริง ไม่ใช่แค่ state ชั่วคราวใน browser) | Task ที่ลบไปแล้วจาก TC-002-07 | [[../acceptance-criteria#AC-002-02: Refresh browser แล้วข้อมูล Task ยังอยู่\|AC-002-02]], Business Rules ข้อ 2 |

## เปลี่ยนสถานะ Task และทำเครื่องหมายว่าเสร็จแล้ว (Status)

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-09 | เปลี่ยนสถานะ Task จาก To Do → Doing → Done ตามลำดับ | มี Task "ส่งรายงาน HCI" สถานะ "To Do" อยู่ในระบบ | 1. เปิด Task "ส่งรายงาน HCI"<br>2. เปลี่ยนสถานะเป็น "Doing" แล้วตรวจสอบผล<br>3. เปลี่ยนสถานะเป็น "Done" แล้วตรวจสอบผล | สถานะของ Task อัปเดตถูกต้องตามที่เลือกทุกครั้ง (To Do → Doing → Done) badge สีของสถานะเปลี่ยนตาม status ที่กำหนด | Task: "ส่งรายงาน HCI", ลำดับสถานะ: To Do → Doing → Done | [[../acceptance-criteria#AC-002-04: เปลี่ยน Status ของ Task ได้\|AC-002-04]] |
| TC-002-10 | ทำเครื่องหมายว่าเสร็จแล้วจากปุ่ม/checkbox ด่วนบน Task Card | มี Task สถานะ "Doing" อยู่ในระบบ | 1. เปิดหน้า Tasks หรือ Today's Tasks บน Dashboard<br>2. กดปุ่ม/checkbox "ทำเครื่องหมายว่าเสร็จแล้ว" ที่ Task Card โดยตรง (ไม่ต้องเปิดฟอร์มแก้ไข) | Task เปลี่ยนสถานะเป็น "Done" ทันทีโดยไม่ต้องเปิดฟอร์มแก้ไขเต็ม และ Task Card แสดงผลลักษณะ "เสร็จแล้ว" (เช่น ขีดฆ่า/badge สีเขียว) | Task สถานะเริ่มต้น: "Doing" | [[../acceptance-criteria#AC-002-04: เปลี่ยน Status ของ Task ได้\|AC-002-04]] |

## กำหนด Priority

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-11 | กำหนด Priority ได้ทั้ง 3 ระดับ (High/Medium/Low) และแสดงผลต่างกัน | มี Task 3 รายการที่ยังไม่กำหนด Priority ชัดเจน | 1. สร้าง Task "งาน A" กำหนด Priority "High"<br>2. สร้าง Task "งาน B" กำหนด Priority "Medium"<br>3. สร้าง Task "งาน C" กำหนด Priority "Low"<br>4. เปิดหน้า Tasks ดูทั้ง 3 รายการ | ทั้ง 3 Task บันทึก Priority ตรงตามที่เลือก และแสดง badge สี/label ต่างกันตามระดับ Priority (High/Medium/Low) อย่างแยกแยะได้ชัดเจน | งาน A: Priority High, งาน B: Priority Medium, งาน C: Priority Low | Business Rules ข้อ 1, [[../acceptance-criteria#AC-002-01: เพิ่ม Task แล้วปรากฏในรายการทันที\|AC-002-01]] |
| TC-002-12 | แก้ไข Priority ของ Task ที่มีอยู่แล้ว | มี Task "งาน A" Priority "Low" อยู่ในระบบ | 1. เปิดแก้ไข Task "งาน A"<br>2. เปลี่ยน Priority จาก "Low" เป็น "High"<br>3. กดบันทึก | Priority ของ Task เปลี่ยนเป็น "High" ทันที และ badge/การจัดเรียงที่อ้างอิง Priority (ถ้ามี) อัปเดตตาม | Task: "งาน A", Priority เดิม: Low → ใหม่: High | [[../acceptance-criteria#AC-002-03: แก้ไขและลบ Task ได้\|AC-002-03]], Business Rules ข้อ 1 |

## กำหนด Deadline

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-13 | กำหนดวันที่และเวลา Deadline ตอนสร้าง Task | ผู้ใช้เปิดฟอร์มเพิ่ม Task | 1. กรอกชื่องาน "ส่งบทความ"<br>2. กำหนดวันที่กำหนดส่งเป็น 15 สิงหาคม เวลา 17:00<br>3. กดบันทึก | Task บันทึก Deadline (วันที่ + เวลา) ตรงตามที่กรอก และแสดงผลวันที่/เวลานั้นบน Task Card ถูกต้อง | ชื่องาน: "ส่งบทความ", Deadline: 15 สิงหาคม 17:00 | Business Rules ข้อ 1, [[../acceptance-criteria#AC-002-01: เพิ่ม Task แล้วปรากฏในรายการทันที\|AC-002-01]] |
| TC-002-14 | Task ที่มี Deadline ตรงกับวันนี้ปรากฏใน Today Dashboard | ระบบใช้ข้อมูล Task จริง (ไม่ใช่ Mock Data) | 1. สร้าง Task ใหม่ชื่อ "ประชุมทีม" กำหนดวันที่กำหนดส่งเป็นวันที่ปัจจุบัน (วันนี้) เวลา 15:00<br>2. เปิดหน้า Today Dashboard | Task "ประชุมทีม" ปรากฏในส่วน Today's Tasks ของ Dashboard ทันที | ชื่องาน: "ประชุมทีม", Deadline: วันนี้ 15:00 | [[../acceptance-criteria#AC-002-06: Task ที่ Deadline วันนี้ปรากฏบน Today Dashboard\|AC-002-06]] |
| TC-002-15 | แก้ไข Deadline ของ Task ที่เคยเป็นวันนี้ ให้เลื่อนไปวันอื่น หายจาก Today Dashboard | มี Task "ประชุมทีม" ที่ Deadline ตรงกับวันนี้ (จาก TC-002-14) และปรากฏใน Today's Tasks แล้ว | 1. เปิดแก้ไข Task "ประชุมทีม"<br>2. เปลี่ยน Deadline เป็นอีก 3 วันข้างหน้า<br>3. กดบันทึก<br>4. เปิดหน้า Today Dashboard อีกครั้ง | Task "ประชุมทีม" ไม่ปรากฏในส่วน Today's Tasks อีกต่อไป (เพราะ Deadline ไม่ตรงกับวันนี้แล้ว) แต่ยังปรากฏในหน้า Tasks ตามปกติ | Task: "ประชุมทีม", Deadline ใหม่: วันนี้ + 3 วัน | [[../acceptance-criteria#AC-002-05: Dashboard เปลี่ยนตามข้อมูล Task จริง\|AC-002-05]], Business Rules ข้อ 3 |

## หน้า Tasks (ดูทั้งหมด, Filter, Search, Sort)

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-16 | หน้า Tasks แสดง Task ทั้งหมดในระบบ | มี Task อย่างน้อย 5 รายการในระบบ สถานะ/Priority/Life Area คละกัน | 1. เปิดหน้า Tasks<br>2. นับจำนวน Task ที่แสดงในรายการ | หน้า Tasks แสดง Task ครบทั้ง 5 รายการ ไม่ตกหล่นหรือซ้ำ | Task 5 รายการ คละ Status/Priority/Life Area | Feature Requirements ("สร้างหน้า Tasks ที่ดูงานทั้งหมด") |
| TC-002-17 | Filter Task ตาม Status | มี Task 5 รายการ: 2 รายการ Status "To Do", 2 รายการ "Doing", 1 รายการ "Done" | 1. เปิดหน้า Tasks<br>2. เลือก Filter Status เป็น "Doing" | รายการที่แสดงเหลือเฉพาะ 2 รายการที่มีสถานะ "Doing" เท่านั้น รายการอื่นถูกซ่อน | Task Status ผสม: To Do x2, Doing x2, Done x1 | Feature Requirements ("Filter ตาม Status") |
| TC-002-18 | Filter Task ตาม Priority | มี Task 5 รายการ: 2 รายการ Priority "High", 2 รายการ "Medium", 1 รายการ "Low" | 1. เปิดหน้า Tasks<br>2. เลือก Filter Priority เป็น "High" | รายการที่แสดงเหลือเฉพาะ 2 รายการที่มี Priority "High" เท่านั้น | Task Priority ผสม: High x2, Medium x2, Low x1 | Feature Requirements ("Filter ตาม Priority") |
| TC-002-19 | Search Task ด้วยชื่องาน | มี Task ชื่อ "ส่งรายงาน HCI", "จ่ายค่าไฟ", "ประชุมทีม" อยู่ในระบบ | 1. เปิดหน้า Tasks<br>2. พิมพ์คำค้นหา "รายงาน" ในช่อง Search | ระบบแสดงเฉพาะ Task ที่ชื่อมีคำว่า "รายงาน" ("ส่งรายงาน HCI") ส่วน Task อื่นที่ไม่ตรงคำค้นถูกซ่อน | คำค้นหา: "รายงาน" | Feature Requirements ("Search งาน") |
| TC-002-20 | Sort Task ตาม Deadline (ใกล้สุดก่อน) | มี Task 3 รายการ Deadline ต่างกัน: วันนี้, พรุ่งนี้, อีก 5 วัน | 1. เปิดหน้า Tasks<br>2. เลือก Sort ตาม Deadline (จากใกล้ไปไกล) | รายการเรียงลำดับ: Deadline วันนี้ → พรุ่งนี้ → อีก 5 วัน ถูกต้องตามลำดับเวลา | Task Deadline: วันนี้, พรุ่งนี้, วันนี้+5 วัน | Feature Requirements ("Sort ตาม Deadline") |
| TC-002-21 | ใช้ Filter Status + Priority + Search ร่วมกัน | มี Task หลายรายการคละ Status/Priority/ชื่อ | 1. เปิดหน้า Tasks<br>2. เลือก Filter Status "To Do"<br>3. เลือก Filter Priority "High" เพิ่มเติม<br>4. พิมพ์คำค้นหาที่ตรงกับหนึ่งใน Task ที่ผ่าน filter ทั้งสอง | รายการที่แสดงตรงกับเงื่อนไขทั้งสาม (Status = To Do, Priority = High, และชื่อมีคำค้นหา) พร้อมกันทุกเงื่อนไข ไม่ใช่แค่เงื่อนไขเดียว | Filter: Status=To Do, Priority=High, Search=คำที่ตรงกับ Task เป้าหมาย | Feature Requirements ("Filter ตาม Status, Filter ตาม Priority, Search งาน") |

## เชื่อมข้อมูล Task จริงกับ Today Dashboard

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-22 | Dashboard คำนวณ Summary Cards จากข้อมูล Task จริงหลังเพิ่ม/แก้ไข/เปลี่ยนสถานะ | ผู้ใช้มี Task จริงในระบบ (ไม่ใช่ Mock Data ของ Sprint 1) | 1. บันทึก Summary Cards ปัจจุบัน (งานวันนี้, งานเสร็จแล้ว, งานค้าง, งานใกล้ครบกำหนด)<br>2. เพิ่ม Task ใหม่ที่ Deadline วันนี้<br>3. เปลี่ยนสถานะ Task อีกรายการเป็น "Done"<br>4. เปิด Today Dashboard ดู Summary Cards อีกครั้ง | Summary Cards อัปเดตค่าใหม่ถูกต้องอัตโนมัติตามการเปลี่ยนแปลงจริง (จำนวนงานวันนี้เพิ่มขึ้น 1, จำนวนงานเสร็จแล้วเพิ่มขึ้น 1) โดยไม่ต้องแก้โค้ดหรือ mock data | Task ใหม่ Deadline วันนี้ 1 รายการ, Task ที่เปลี่ยนเป็น Done 1 รายการ | [[../acceptance-criteria#AC-002-05: Dashboard เปลี่ยนตามข้อมูล Task จริง\|AC-002-05]], Business Rules ข้อ 3 |
| TC-002-23 | Non-regression: หน้า Today Dashboard เดิมของ Sprint 1 ยังทำงานได้ครบหลังต่อยอด Sprint 2 | ระบบผ่านการพัฒนา Sprint 2 ทับ Codebase เดิมของ Sprint 1 แล้ว | 1. เปิดหน้า Today Dashboard<br>2. ตรวจสอบว่าทั้ง Header, Summary Cards, Today's Tasks, Today's Schedule, Upcoming, Quick Action ยังแสดงผลและทำงานได้ครบ | ทุกส่วนของ Dashboard ที่มีมาตั้งแต่ Sprint 1 ยังคงทำงานได้ปกติ ไม่มีส่วนใดหายไปหรือพังจากการเพิ่ม Task Management เข้ามา | ไม่มี (ตรวจสอบ UI/behavior เดิมของ Sprint 1) | Business Rules ข้อ 4 (Non-regression) |
| TC-002-24 | Gate 2 — เพิ่มงานจริง 5 งานแล้วใช้งาน Add → Edit → Done → Dashboard Update ครบวงจร | ผู้ใช้ (นักศึกษา) เตรียมเพิ่มงานจริงของตนเอง 5 งาน | 1. เพิ่ม Task จริง 5 งาน (เช่น "ส่งรายงาน HCI", "อ่านหนังสือสอบ STEM", "ซักผ้า", "จ่ายค่าหอ", "นัดหมอ") กำหนด Deadline/Priority ให้ครบทุกงาน<br>2. แก้ไขรายละเอียดอย่างน้อย 1 งาน<br>3. เปลี่ยนสถานะทีละงานจาก To Do → Doing → Done จนครบทั้ง 5 งาน (ใช้งานต่อเนื่องอย่างน้อย 1 วัน)<br>4. เปิด Today Dashboard ตรวจสอบหลังแต่ละขั้นตอน | Add → Edit → Done → Dashboard Update ทำงานครบถ้วนทั้ง 5 งาน โดย Dashboard สะท้อนสถานะล่าสุดถูกต้องทุกครั้งที่มีการเปลี่ยนแปลง ถือว่าผ่าน Gate 2 | 5 Task จริงของผู้ใช้ ครบ ชื่องาน/Life Area/Deadline/Priority | [[../acceptance-criteria#AC-002-08: Gate 2 — Add → Edit → Done → Dashboard Update ครบวงจร\|AC-002-08]], Gate 2 |

## Integration: User Journey (ครอบคลุม Persona นักศึกษา/บุคคลทั่วไป)

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง (Requirement/AC) |
|---|---|---|---|---|---|---|
| TC-002-25 | Journey Step 5: เติมรายละเอียด Task จนครบและใช้งานต่อเนื่อง 1 วัน (Add → Edit → Done → Dashboard update) ทั้งสอง Persona | ผู้ใช้ผ่าน Step 1-4 ของ Journey มาแล้ว (ตั้งค่า Life Area, เปิด Dashboard, Quick Capture รายการเข้า Inbox, จัดรายการเข้า Life Area) — อ้างอิง [[../../../01-requirements/user-journey#Persona 1: นักศึกษา (Student)\|user-journey — Persona 1 ข้อ 5]] และ [[../../../01-requirements/user-journey#Persona 2: บุคคลทั่วไป (General person)\|Persona 2 ข้อ 5]] | 1. (นักศึกษา) เติมรายละเอียด Task "ส่งรายงาน HCI" ที่จัดเข้า Life Area "Study" แล้ว: กำหนด Deadline วันศุกร์ 23:59, Priority<br>2. (บุคคลทั่วไป) เติมรายละเอียด Task "จ่ายค่าไฟ" ที่จัดเข้า Life Area "Finance" แล้ว: กำหนด Deadline ก่อนสิ้นเดือน, Priority<br>3. ทำซ้ำแบบเดียวกันจนแต่ละ Persona มีงานจริงอย่างน้อย 5 งาน แล้วใช้งานต่อเนื่อง 1 วัน<br>4. ทั้งสอง Persona ทำ Add → Edit → เปลี่ยนเป็น Done ของงานเหล่านั้น<br>5. ตรวจสอบ Today Dashboard ของแต่ละ Persona หลังทำแต่ละขั้นตอน | ทั้งสอง Persona ทำ Add → Edit → Done ได้ครบผ่านกลไก/หน้าจอเดียวกัน (ไม่มี code path แยกตาม persona) และ Today Dashboard ของแต่ละคนอัปเดตสถานะให้ตรงกับทุกการเปลี่ยนแปลงโดยอัตโนมัติ | นักศึกษา: Task "ส่งรายงาน HCI" Life Area "Study"; บุคคลทั่วไป: Task "จ่ายค่าไฟ" Life Area "Finance" — งานแต่ละฝ่ายรวม 5 งาน | [[../../../01-requirements/user-journey#Persona 1: นักศึกษา (Student)\|user-journey — Persona 1 ข้อ 5]], [[../../../01-requirements/user-journey#Persona 2: บุคคลทั่วไป (General person)\|Persona 2 ข้อ 5]], [[../acceptance-criteria#AC-002-08: Gate 2 — Add → Edit → Done → Dashboard Update ครบวงจร\|AC-002-08]] |
