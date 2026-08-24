# My Today — Detailed Design (Conceptual Sequence Flows)

เชื่อมโยงกลับ: [[index|02-technical]], [[architecture|architecture]], [[api-spec|api-spec]], [[database-schema|database-schema]], [[../01-prototypes/user-journey-student|user-journey-student]], [[../01-prototypes/user-journey-general-person|user-journey-general-person]], [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR master list]]

## ขอบเขตของเอกสารนี้

เอกสารนี้เป็น **Detailed Design แบบ conceptual และไม่ผูกกับ technology stack** (stack-agnostic) อยู่ในระดับ **sequence-flow** — ขยาย Container View ของ [[architecture|architecture.md]] (หัวข้อ 2) และ operation contract ของ [[api-spec|api-spec.md]] ให้เห็นเป็นลำดับข้อความ (message) ทีละขั้นระหว่าง Container จริงๆ ว่าแต่ละ user journey/operation ไหลผ่านใครบ้างตามลำดับ ไม่ใช่แค่ระบุทิศทางรวมแบบที่ architecture.md หัวข้อ 4 ทำไว้แล้ว

เนื้อหาหลัก (รวม sequence diagram ทุกอัน) **จะไม่เอ่ยชื่อภาษา, framework, library, หรือ Web API ใดๆ โดยตรง** — participant ของทุกไดอะแกรมจำกัดอยู่ที่ชุด Container คงที่จาก [[architecture|architecture.md]] หัวข้อ 2 เท่านั้น (Presentation / Interaction Layer, Application / Domain Logic Layer, Structured Local Persistence, Binary / Blob Local Persistence, Reminder / Notification Derivation) บวก User person จากหัวข้อ 1 ไม่มีการเพิ่ม container ใหม่ในเอกสารนี้ รายละเอียดการ implement จริงปัจจุบัน ถ้าเป็นประโยชน์ จะอยู่ในหมายเหตุที่ระบุชัดเจนว่า "หมายเหตุการ implement ปัจจุบัน" เท่านั้น

ทุกไดอะแกรมแสดง **happy path เท่านั้น** — พฤติกรรมกรณี error/edge-case อยู่แยกเป็นข้อความสั้นๆ ใต้แต่ละไดอะแกรมในหัวข้อ 3 แทนการวาดเป็น `alt`/`opt` block ในไดอะแกรม

## 1. Sequence Diagrams — Persona Journeys

ทั้งสองไดอะแกรมด้านล่างเดินตามลำดับขั้นตอนที่มีอยู่แล้วใน [[../01-prototypes/user-journey-student|user-journey-student.md]] และ [[../01-prototypes/user-journey-general-person|user-journey-general-person.md]] ทุกประการ ไม่สร้าง narrative ใหม่ — วาด message เฉพาะขั้นตอนที่มีสถานะ "เสร็จแล้ว" ในเอกสารนั้นๆ (ตรวจสอบล่าสุด 20260824 — Sprint 9 ยืนยันเสร็จแล้วในรอบ backlog-sync-check วันเดียวกัน) ส่วนขั้นตอนที่เป็น "แผนในอนาคต" ถูกข้ามไปตามกฎของเอกสารนี้ และระบุไว้เป็นหมายเหตุใต้ไดอะแกรมแทน

### 1.1 นักศึกษา (Task "ส่งรายงาน HCI", Life Area "Study")

```mermaid
sequenceDiagram
    actor User as ผู้ใช้
    participant Presentation as Presentation / Interaction Layer
    participant Domain as Application / Domain Logic Layer
    participant StructPersist as Structured Local Persistence
    participant BlobPersist as Binary / Blob Local Persistence
    participant Reminder as Reminder / Notification Derivation

    User->>Presentation: พิมพ์ "ส่งรายงาน HCI" ผ่าน Quick Capture (1)
    Presentation->>Domain: Quick Capture(kind=Task, title="ส่งรายงาน HCI")
    Domain->>StructPersist: บันทึก Task ใหม่ (inInbox=true)
    StructPersist-->>Domain: Task record ที่สร้างแล้ว
    Domain-->>Presentation: ยืนยันบันทึกสำเร็จ

    User->>Presentation: เปิดหน้า My Inbox (2)
    Presentation->>Domain: List Inbox Items()
    Domain->>StructPersist: อ่าน Task/Event/File/Note/Link ที่ inInbox=true
    StructPersist-->>Domain: รายการที่รอจัดระเบียบ (รวม Task นี้)
    Domain-->>Presentation: รายการ Inbox

    User->>Presentation: เลือก Life Area "Study" ให้ Task นี้ (3)
    Presentation->>Domain: Organize from Inbox(id, kind=Task, lifeAreaId="Study")
    Domain->>StructPersist: อัปเดต Task (lifeAreaId="Study", inInbox=false)
    StructPersist-->>Domain: Task record ที่อัปเดตแล้ว
    Domain-->>Presentation: ยืนยันจัดระเบียบสำเร็จ

    User->>Presentation: กำหนด Deadline ของ Task (4)
    Presentation->>Domain: Update Task(id, dueDate, dueTime)
    Domain->>StructPersist: บันทึก dueDate/dueTime
    StructPersist-->>Domain: Task record ที่อัปเดตแล้ว
    Domain-->>Presentation: ยืนยันบันทึกสำเร็จ

    User->>Presentation: แนบไฟล์รายงาน (5)
    Presentation->>Domain: Create File(content, ...) + Link File to Task(fileId, taskId)
    Domain->>BlobPersist: เก็บเนื้อหาไฟล์จริง
    BlobPersist-->>Domain: ยืนยันเก็บไฟล์สำเร็จ
    Domain->>StructPersist: บันทึก File metadata (linkedTaskIds มี taskId)
    StructPersist-->>Domain: File record ที่สร้างแล้ว
    Domain-->>Presentation: ยืนยันแนบไฟล์สำเร็จ

    User->>Presentation: เปิดหน้า Calendar (6)
    Presentation->>Domain: Get Day Items(date)
    Domain->>StructPersist: อ่าน Task (dueDate ตรงวัน) + Event ของวันนั้น
    StructPersist-->>Domain: Task/Event ที่เกี่ยวข้อง
    Domain-->>Presentation: รายการรวม Event+Deadline เรียงตามเวลา

    User->>Presentation: เปิดหน้า Timeline ดู Now/Next/Later ของวันนี้ (7)
    Presentation->>Domain: Get Timeline(date=วันนี้)
    Domain->>StructPersist: อ่าน Task/Event ทั้งหมด + Life Area ทั้งหมด
    StructPersist-->>Domain: Task/Event/Life Area สด
    Domain->>Domain: จัดกลุ่ม Now/Next/Later ตามเวลาปัจจุบัน แล้วเรียงลำดับภายในแต่ละกลุ่มด้วย Smart Priority Sort
    Domain-->>Presentation: กลุ่ม Now/Next/Later พร้อมชื่อ Life Area ต่อรายการ

    User->>Presentation: เปิด My Today ตอนเช้า (8)
    Presentation->>Domain: Get Today Dashboard Summary()
    Domain->>StructPersist: อ่าน Task/Event ทั้งหมด
    StructPersist-->>Domain: Task/Event สด
    Domain-->>Presentation: สรุปวันนี้ (จำนวนงาน/รายการวันนี้)

    User->>Presentation: กด Done เมื่อทำงานเสร็จ (10)
    Presentation->>Domain: Set Task Status(id, status=Done)
    Domain->>StructPersist: บันทึกสถานะ Done
    StructPersist-->>Domain: Task record ที่อัปเดตแล้ว
    Domain-->>Presentation: ยืนยันบันทึกสำเร็จ

    User->>Presentation: ดูความคืบหน้าวันนี้บน Dashboard (11)
    Presentation->>Domain: Get Life Progress(date=วันนี้)
    Domain->>StructPersist: อ่าน Task ทั้งหมด + Life Area ทั้งหมด
    StructPersist-->>Domain: Task/Life Area สด
    Domain-->>Presentation: จำนวน Task ที่ Done เทียบทั้งหมดของวันนี้ (รวม + แยกตาม Life Area)
```

**mapping กลับ journey-doc (user-journey-student.md):**

1. ขั้นตอนที่ 1 (FR-13) — เพิ่ม Task ผ่าน Quick Capture
2. ขั้นตอนที่ 2 (FR-14) — เข้า My Inbox
3. ขั้นตอนที่ 3 (FR-14) — จัดเข้า Life Area "Study" จาก Inbox
4. ขั้นตอนที่ 4 (FR-04) — กำหนด Deadline ของ Task
5. ขั้นตอนที่ 5 (FR-09) — แนบไฟล์รายงาน (Related Files)
6. ขั้นตอนที่ 6 (FR-07) — เห็น Deadline ใน Calendar โดยอัตโนมัติ
7. ขั้นตอนที่ 7 (FR-16) — เห็น Deadline ใน Timeline Now/Next/Later — เสร็จแล้ว
8. ขั้นตอนที่ 8 (FR-05, FR-12) — เปิด My Today ตอนเช้า เห็นงานบน Today Dashboard
9. ขั้นตอนที่ 10 (FR-03, FR-11) — ทำงานเสร็จ กด Done
10. ขั้นตอนที่ 11 (FR-17) — Life Progress อัปเดต — เสร็จแล้ว

ขั้นตอนที่ **9** (Reminder lead time ที่ตั้งเอง, FR-19, Sprint 10) ยังไม่รวมในไดอะแกรมนี้ เพราะ Sprint ที่เกี่ยวข้องยังไม่ build (สถานะ "แผนในอนาคต" ตาม journey doc และ backlog.md ณ 20260824)

### 1.2 บุคคลทั่วไป (Task "จ่ายค่าไฟ", Life Area "Finance")

```mermaid
sequenceDiagram
    actor User as ผู้ใช้
    participant Presentation as Presentation / Interaction Layer
    participant Domain as Application / Domain Logic Layer
    participant StructPersist as Structured Local Persistence
    participant BlobPersist as Binary / Blob Local Persistence
    participant Reminder as Reminder / Notification Derivation

    User->>Presentation: พิมพ์ "จ่ายค่าไฟ" ผ่าน Quick Capture (1)
    Presentation->>Domain: Quick Capture(kind=Task, title="จ่ายค่าไฟ")
    Domain->>StructPersist: บันทึก Task ใหม่ (inInbox=true)
    StructPersist-->>Domain: Task record ที่สร้างแล้ว
    Domain-->>Presentation: ยืนยันบันทึกสำเร็จ

    User->>Presentation: เปิดหน้า My Inbox (2)
    Presentation->>Domain: List Inbox Items()
    Domain->>StructPersist: อ่าน Task/Event/File/Note/Link ที่ inInbox=true
    StructPersist-->>Domain: รายการที่รอจัดระเบียบ (รวม Task นี้)
    Domain-->>Presentation: รายการ Inbox

    User->>Presentation: เลือก Life Area "Finance" + กำหนด Deadline ก่อนสิ้นเดือน (3)
    Presentation->>Domain: Organize from Inbox(id, kind=Task, lifeAreaId="Finance", dueDate)
    Domain->>StructPersist: อัปเดต Task (lifeAreaId="Finance", dueDate, inInbox=false)
    StructPersist-->>Domain: Task record ที่อัปเดตแล้ว
    Domain-->>Presentation: ยืนยันจัดระเบียบสำเร็จ

    User->>Presentation: แนบไฟล์ใบแจ้งหนี้ค่าไฟ (4)
    Presentation->>Domain: Create File(content, ...) + Link File to Task(fileId, taskId)
    Domain->>BlobPersist: เก็บเนื้อหาไฟล์จริง
    BlobPersist-->>Domain: ยืนยันเก็บไฟล์สำเร็จ
    Domain->>StructPersist: บันทึก File metadata (linkedTaskIds มี taskId)
    StructPersist-->>Domain: File record ที่สร้างแล้ว
    Domain-->>Presentation: ยืนยันแนบไฟล์สำเร็จ

    User->>Presentation: เปิดหน้า Timeline ดู Now/Next/Later ของวันนี้ (5)
    Presentation->>Domain: Get Timeline(date=วันนี้)
    Domain->>StructPersist: อ่าน Task/Event ทั้งหมด + Life Area ทั้งหมด
    StructPersist-->>Domain: Task/Event/Life Area สด
    Domain->>Domain: จัดกลุ่ม Now/Next/Later ตามเวลาปัจจุบัน แล้วเรียงลำดับภายในแต่ละกลุ่มด้วย Smart Priority Sort
    Domain-->>Presentation: กลุ่ม Now/Next/Later พร้อมชื่อ Life Area ต่อรายการ

    User->>Presentation: เปิดหน้า Notifications / Dashboard (6)
    Presentation->>Domain: ขอข้อมูล Task/Event สดเพื่อประเมินความเร่งด่วน
    Domain->>StructPersist: อ่าน Task/Event ทั้งหมด
    StructPersist-->>Domain: Task/Event สด
    Domain->>Reminder: Build Notifications(tasks, events, readIds)
    Reminder-->>Domain: รายการแจ้งเตือน (Overdue/DueToday/DueSoon)
    Domain-->>Presentation: รายการแจ้งเตือนที่จำแนกระดับความเร่งด่วนแล้ว

    User->>Presentation: กด Done เมื่อจ่ายเงินเสร็จ (7)
    Presentation->>Domain: Set Task Status(id, status=Done)
    Domain->>StructPersist: บันทึกสถานะ Done
    StructPersist-->>Domain: Task record ที่อัปเดตแล้ว
    Domain-->>Presentation: ยืนยันบันทึกสำเร็จ

    User->>Presentation: ดูความคืบหน้าวันนี้บน Dashboard (8)
    Presentation->>Domain: Get Life Progress(date=วันนี้)
    Domain->>StructPersist: อ่าน Task ทั้งหมด + Life Area ทั้งหมด
    StructPersist-->>Domain: Task/Life Area สด
    Domain-->>Presentation: จำนวน Task ที่ Done เทียบทั้งหมดของวันนี้ (รวม + แยกตาม Life Area)
```

**mapping กลับ journey-doc (user-journey-general-person.md):**

1. ขั้นตอนที่ 1 (FR-13) — เพิ่ม Task ผ่าน Quick Capture
2. ขั้นตอนที่ 2 (FR-14) — เข้า My Inbox
3. ขั้นตอนที่ 3 (FR-14) — จัดเข้า Life Area "Finance" จาก Inbox + กำหนด Deadline
4. ขั้นตอนที่ 4 (FR-09) — แนบไฟล์ใบแจ้งหนี้ค่าไฟ (Related Files)
5. ขั้นตอนที่ 5 (FR-16) — เห็น Deadline ใน Timeline Now/Next/Later — เสร็จแล้ว
6. ขั้นตอนที่ 6 (FR-10) — ได้รับการเตือนเมื่อใกล้ถึงกำหนด (Due Soon/Overdue)
7. ขั้นตอนที่ 7 (FR-03, FR-11) — จ่ายเงินเสร็จ กด Done
8. ขั้นตอนที่ 8 (FR-17) — Life Progress อัปเดต — เสร็จแล้ว

ไม่มีขั้นตอนใดใน journey นี้ที่ยังเป็น "แผนในอนาคต" อีกต่อไป (Journey นี้ไม่มีขั้นตอนที่อ้างอิง Sprint 10 ตั้งแต่ต้น ต่างจาก journey นักศึกษาที่ยังมีขั้นตอนที่ 9)

## 2. Sequence Diagrams — Cross-cutting Operations

ทั้งสี่ operation ต่อไปนี้อยู่ใน [[api-spec|api-spec.md]] หัวข้อ 2 และ build เสร็จแล้วทั้งหมดตาม backlog.md ณ 20260823 (Delete Life Area ตั้งแต่ Sprint 7, อีกสามอย่างตั้งแต่ Sprint 8) จึงวาดไดอะแกรมเต็มให้ครบทุกอัน

### 2.1 Delete Life Area (cascade-safe, two-phase)

```mermaid
sequenceDiagram
    actor User as ผู้ใช้
    participant Presentation as Presentation / Interaction Layer
    participant Domain as Application / Domain Logic Layer
    participant StructPersist as Structured Local Persistence

    User->>Presentation: ขอลบ Life Area
    Presentation->>Domain: Delete Life Area(lifeAreaId)
    Domain->>StructPersist: หา Task ทุกรายการที่ lifeAreaId ตรงกัน
    StructPersist-->>Domain: รายการ Task ที่อ้างอิงอยู่
    Domain->>StructPersist: เคลียร์ lifeAreaId ของ Task เหล่านั้นให้ว่าง (Update Task)
    Domain->>StructPersist: หา Event ทุกรายการที่ lifeAreaId ตรงกัน
    StructPersist-->>Domain: รายการ Event ที่อ้างอิงอยู่
    Domain->>StructPersist: เคลียร์ lifeAreaId ของ Event เหล่านั้นให้ว่าง (Update Event)
    Domain->>StructPersist: หา File ทุกรายการที่ lifeAreaId ตรงกัน
    StructPersist-->>Domain: รายการ File ที่อ้างอิงอยู่
    Domain->>StructPersist: เคลียร์ lifeAreaId ของ File เหล่านั้นให้ว่าง (Update File Metadata)
    Domain->>StructPersist: หา Note ทุกรายการที่ lifeAreaId ตรงกัน
    StructPersist-->>Domain: รายการ Note ที่อ้างอิงอยู่
    Domain->>StructPersist: เคลียร์ lifeAreaId ของ Note เหล่านั้นให้ว่าง (Update Note)
    Domain->>StructPersist: หา Link ทุกรายการที่ lifeAreaId ตรงกัน
    StructPersist-->>Domain: รายการ Link ที่อ้างอิงอยู่
    Domain->>StructPersist: เคลียร์ lifeAreaId ของ Link เหล่านั้นให้ว่าง (Update Link)
    Domain->>StructPersist: ลบ Life Area record ทิ้ง (หลังเคลียร์ครบทุก entity แล้วเท่านั้น)
    StructPersist-->>Domain: ยืนยันลบสำเร็จ
    Domain-->>Presentation: ยืนยัน Life Area ถูกลบแล้ว
    Presentation-->>User: แสดงผลลัพธ์ (Task/Event/File/Note/Link เดิมยังอยู่ ไม่มี Life Area แล้ว)
```

อ้างอิง: [[api-spec|api-spec.md]] หัวข้อ 2 แถว "Delete Life Area" และ [[database-schema|database-schema.md]] หัวข้อ 2.1 (Business Rule ของ Sprint 7 Acceptance Criteria) — ลำดับ phase 1 (เคลียร์การอ้างอิงทุก entity) ต้องเสร็จก่อน phase 2 (ลบ record) เสมอ ไม่สลับลำดับ

### 2.2 Quick Capture

```mermaid
sequenceDiagram
    actor User as ผู้ใช้
    participant Presentation as Presentation / Interaction Layer
    participant Domain as Application / Domain Logic Layer
    participant StructPersist as Structured Local Persistence

    User->>Presentation: กดปุ่มกลาง "+ Add to My Today" แล้วเลือกประเภท + พิมพ์ title
    Presentation->>Domain: Quick Capture(kind, title)
    Domain->>StructPersist: บันทึก record ใหม่ของประเภทที่เลือก (inInbox=true, ฟิลด์อื่นว่าง/default)
    StructPersist-->>Domain: record ที่สร้างแล้ว
    Domain-->>Presentation: ยืนยันบันทึกสำเร็จ
    Presentation-->>User: แสดงว่าบันทึกแล้ว (ไม่ต้องกรอกรายละเอียดอื่นตอนนี้)
```

อ้างอิง: [[api-spec|api-spec.md]] หัวข้อ 2 แถว "Quick Capture" — ต้องการแค่ `kind` + `title` เท่านั้น ห้ามมี AI แยกวิเคราะห์ข้อความอิสระใดๆ (Sprint 8 Business Rule ข้อ 5)

### 2.3 Organize from Inbox

```mermaid
sequenceDiagram
    actor User as ผู้ใช้
    participant Presentation as Presentation / Interaction Layer
    participant Domain as Application / Domain Logic Layer
    participant StructPersist as Structured Local Persistence

    User->>Presentation: เปิด record จาก My Inbox แล้วเติมฟิลด์ที่ขาด (เช่น Life Area, Deadline)
    Presentation->>Domain: Organize from Inbox(id, kind, lifeAreaId, ฟิลด์อื่นที่เติม)
    Domain->>StructPersist: อัปเดต record เดิม (เติมฟิลด์ + ตั้ง inInbox=false)
    StructPersist-->>Domain: record เดิมที่อัปเดตแล้ว
    Domain-->>Presentation: ยืนยันจัดระเบียบสำเร็จ
    Presentation-->>User: record ย้ายจาก Inbox ไปเป็นรายการปกติ
```

อ้างอิง: [[api-spec|api-spec.md]] หัวข้อ 2 แถว "Organize from Inbox" — เป็นการอัปเดต record เดิมให้ `inInbox` เปลี่ยนจาก `true` เป็น `false` เท่านั้น ไม่สร้าง entity ใหม่ซ้อนสองชุด (Sprint 8 Business Rule ข้อ 2)

### 2.4 List Inbox Items

```mermaid
sequenceDiagram
    actor User as ผู้ใช้
    participant Presentation as Presentation / Interaction Layer
    participant Domain as Application / Domain Logic Layer
    participant StructPersist as Structured Local Persistence

    User->>Presentation: เปิดหน้า My Inbox
    Presentation->>Domain: List Inbox Items()
    Domain->>StructPersist: อ่าน Task ทั้งหมดที่ inInbox=true
    StructPersist-->>Domain: Task ที่รอจัดระเบียบ
    Domain->>StructPersist: อ่าน Event ทั้งหมดที่ inInbox=true
    StructPersist-->>Domain: Event ที่รอจัดระเบียบ
    Domain->>StructPersist: อ่าน File ทั้งหมดที่ inInbox=true
    StructPersist-->>Domain: File ที่รอจัดระเบียบ
    Domain->>StructPersist: อ่าน Note ทั้งหมดที่ inInbox=true
    StructPersist-->>Domain: Note ที่รอจัดระเบียบ
    Domain->>StructPersist: อ่าน Link ทั้งหมดที่ inInbox=true
    StructPersist-->>Domain: Link ที่รอจัดระเบียบ
    Domain-->>Presentation: รายการรวมข้าม entity ทั้งห้าที่ inInbox=true
    Presentation-->>User: แสดงรายการ My Inbox
```

อ้างอิง: [[api-spec|api-spec.md]] หัวข้อ 2 แถว "List Inbox Items" — เป็น query ข้าม entity ทั้งห้า ไม่ใช่ operation เฉพาะของ entity ใดเดียว ใช้กับหน้า "My Inbox" (FR-14)

## 3. Error / Edge-case Notes

- **Quick Capture / Organize from Inbox (2.2, 2.3):** ถ้าการเขียนลง Structured Local Persistence ล้มเหลว Application/Domain Logic Layer แจ้ง error กลับ Presentation Layer โดยไม่เปลี่ยนสถานะ `inInbox` ของ record เดิม (record ยังค้างอยู่ใน Inbox เหมือนก่อนพยายามบันทึก ไม่ถูกปล่อยอยู่ในสถานะครึ่งๆ กลางๆ)
- **แนบไฟล์ (1.1 ขั้นตอนที่ 5 / 1.2 ขั้นตอนที่ 4):** ถ้า Binary/Blob Local Persistence เขียนเนื้อหาไฟล์ไม่สำเร็จ ระบบแสดง error กลับที่ Presentation Layer แบบ dismissible โดยไม่สร้าง File record ใน Structured Local Persistence ค้างไว้ (ไม่มี metadata ที่ไม่มีเนื้อหาไฟล์จริงคู่กัน)
- **Delete Life Area (2.1):** ถ้าขั้นตอนเคลียร์การอ้างอิงของ entity ใด entity หนึ่งล้มเหลวระหว่างทาง ระบบต้องไม่ดำเนินการลบ Life Area record ต่อ (phase 2 เกิดขึ้นได้ก็ต่อเมื่อ phase 1 เคลียร์ครบทุก entity สำเร็จเท่านั้น) เพื่อป้องกัน orphaned reference ที่ยังชี้ไปยัง Life Area ที่ถูกลบไปแล้ว
- **Build Notifications (1.2 ขั้นตอนที่ 6):** เป็นการคำนวณสดทุกครั้ง ไม่มีสถานะกลางที่ค้างพังได้ — ถ้าไม่มี Task/Event ที่เข้าเงื่อนไข Overdue/DueToday/DueSoon ผลลัพธ์คือรายการว่างเปล่า ไม่ใช่ error
- **Get Day Items / Get Today Dashboard Summary (1.1 ขั้นตอนที่ 6, 8):** เป็น read-only query ล้วนๆ ไม่มีผลข้างเคียงต่อข้อมูล ถ้าไม่มี Task/Event ของวันนั้นก็แสดงรายการว่างตามจริง ไม่ถือเป็นสถานะ error
- **Get Timeline (Now/Next/Later) + Smart Priority Sort / Get Life Progress (1.1 ขั้นตอนที่ 7, 11 / 1.2 ขั้นตอนที่ 5, 8):** เช่นเดียวกับ Build Notifications เป็นการคำนวณสดจาก Task/Event ทุกครั้งที่เรียก ไม่มีสถานะกลางที่ค้างพังได้และไม่มีผลข้างเคียงต่อข้อมูลเดิม — ถ้าวันนี้ไม่มี Task/Event ที่เข้าเงื่อนไข (Timeline) หรือไม่มี Task ที่ครบกำหนดวันนี้เลย (Life Progress) ผลลัพธ์คือกลุ่มว่างเปล่า/สัดส่วน 0 จาก 0 ไม่ใช่ error

## 4. Known Gaps / Not-yet-built Flows

รายการนี้สอดคล้องกับ known gaps ใน [[architecture|architecture.md]] หัวข้อ 6 และ [[api-spec|api-spec.md]] หัวข้อ 4 — ยังไม่มี sequence diagram ให้เนื่องจาก Sprint ที่เกี่ยวข้องยังไม่ build ตาม backlog.md ณ 20260824 (Sprint 9 build เสร็จแล้ว — ดูไดอะแกรมจริงในหัวข้อ 1 ด้านบน — เหลือเฉพาะ Sprint 10 ที่ยังไม่มี commit ใดๆ):

- **Task/Event ↔ Note/Link linking (Sprint 10, FR-18):** flow ที่คาดว่าจะเกิดคือ "Link Note to Task"/"Link Link to Task" (และคู่ Event) ให้ Domain Logic Layer อัปเดต reference-array บน Task/Event เอง คู่ขนานกับ "Link File to Task" ที่มีอยู่แล้ว แต่กลับทิศทางการถือ FK (Task/Event เป็นฝ่ายถือ แทนที่จะเป็น Note/Link)
- **Custom Reminder Lead Time (Sprint 10, FR-19):** flow ที่คาดว่าจะเกิดคือ Presentation Layer ส่ง "Set Custom Reminder Lead Time" ให้ Domain Logic Layer บันทึกค่าเฉพาะรายการ แล้ว "Build Notifications" (Reminder/Notification Derivation) ต้องอ่านค่านี้เพิ่มจากค่า default กลางของระบบก่อนคำนวณระดับความเร่งด่วน
- **Task/Event Detail แบบ What/When/Information รวมหน้าเดียว (Sprint 10):** flow ที่คาดว่าจะเกิดคือ query รวมที่ดึง Task/Event เดียวกันกับ File/Note/Link/reminder ที่เชื่อมไว้ทั้งหมดในคำขอเดียว แทนที่จะให้ Presentation Layer เรียกหลาย operation แยกกันแล้วประกอบเองเหมือนปัจจุบัน

- **IndexedDB Quota-Warning (Sprint 11, NFR-08, [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR master list]]):** ตามข้อกำหนดใหม่ในเอกสารดังกล่าว ระบบควรเตือนผู้ใช้เมื่อพื้นที่เก็บไฟล์แนบใกล้เต็ม quota ของ Binary/Blob Local Persistence — operation ที่รองรับ ("Get Storage Usage Estimate / Warn Near Quota") ยังไม่ build จึงยังไม่มี sequence diagram ให้ในเอกสารนี้

Sprint 11 (Demo/Polish/Freeze) ไม่เพิ่ม flow ใหม่ระดับ persona journey หรือ cross-cutting operation ที่ต้องมี sequence diagram ของตัวเอง แต่เป็นเจ้าของ operation ที่ยังไม่ build "Get Storage Usage Estimate / Warn Near Quota" ตามรายการ IndexedDB Quota-Warning ด้านบน ซึ่งเป็นเหตุผลที่ bullet นั้นยังไม่มี diagram ให้ในเอกสารนี้

## 5. หมายเหตุการ implement ปัจจุบัน

> เนื้อหาส่วนนี้ผูกกับ stack เทคโนโลยีจริง (อ้างอิงรายละเอียดฉบับเต็มที่ [[tech-stack|tech-stack.md]]) — ไม่ใช่ส่วนหนึ่งของ sequence diagram เชิงแนวคิดในหัวข้อ 1/2 ด้านบน และไม่ผูกมัดว่าต้อง implement แบบนี้ตลอดไป ระบุไว้ที่นี่รวมศูนย์เดียว (แทนที่จะแทรกในทุกไดอะแกรม) เพื่อบอกว่าแต่ละ participant ในแต่ละ sequence diagram ถูก implement ด้วยฟังก์ชัน/component/ไฟล์จริงตัวไหน สอดคล้องกับหมายเหตุแบบเดียวกันใน [[architecture|architecture.md]] หัวข้อ 2 และ [[api-spec|api-spec.md]] หัวข้อ 5

### 1.1 นักศึกษา (persona journey)

- **Quick Capture (ขั้นตอนที่ 1):** Presentation = `src/components/QuickCaptureModal.tsx` (type picker เลือก Task แล้ว delegate ไปที่ `TaskFormModal` พร้อม prop `quickCapture`); Domain = `useTasks` hook's create function ที่ `App.tsx` เป็นเจ้าของ instance เดียว (ตั้ง `inInbox: Boolean(quickCapture)`); Structured Persistence = `src/lib/storage.ts` เขียนลง LocalStorage key `my-today:tasks:v2` — ทั้งหมดเขียนด้วย **React `^18.3.1`** + **TypeScript `^5.5.2` (`strict: true`)** ตาม [[tech-stack|tech-stack.md]] หัวข้อ 3
- **เปิด My Inbox (ขั้นตอนที่ 2):** Presentation = `src/pages/InboxPage.tsx` (แท็บ "Inbox"); Domain = logic กรอง `tasks`/`events`/`files`/`notes`/`links` props ที่ `inInbox === true` ภายใน `InboxPage.tsx` เอง (ไม่ใช่ hook แยก)
- **จัดเข้า Life Area จาก Inbox (ขั้นตอนที่ 3):** Presentation = `InboxPage.tsx` เปิด `TaskFormModal` แบบ non-quickCapture pre-filled จาก record เดิม; Domain = `useTasks`'s `updateTask` (ตั้ง `lifeAreaId` และ `inInbox=false`)
- **กำหนด Deadline (ขั้นตอนที่ 4):** Presentation = `TaskFormModal`; Domain = `useTasks`'s `updateTask` (`dueDate`/`dueTime`)
- **แนบไฟล์ (ขั้นตอนที่ 5):** Presentation = `FileFormModal.tsx` (ส่วน "Related Files"/attach-existing-file picker); Domain = `useFiles`'s create function + `updateFile` (ตั้ง `linkedTaskIds`); Binary/Blob Persistence = `src/lib/fileDb.ts`'s `putFile` เขียนลง IndexedDB object store `files` (metadata + `Blob` รวม record เดียว) — `useFiles` ยังเป็น hook เดียวที่ expose flag `loaded` ให้ page เช็คก่อน render เพราะ IndexedDB อ่าน/เขียนแบบ asynchronous
- **เปิด Calendar (ขั้นตอนที่ 6):** Presentation = `src/pages/CalendarPage.tsx` + `DayAgenda`; Domain = `getDayItems` ใน `src/lib/calendarUtils.ts`
- **เปิด Timeline Now/Next/Later (ขั้นตอนที่ 7, Sprint 9):** Presentation = `src/pages/TimelinePage.tsx` (route `/timeline`, เรนเดอร์ผ่าน `src/components/TimelineSection.tsx` สามชุด — Now/Next/Later); Domain = `getTimelineEntries` ใน `src/lib/timelineUtils.ts` เป็น pure function ที่คำนวณใหม่ทุกครั้งที่ component render (ไม่มี hook/state แยกเป็นเจ้าของ ไม่มี record persist ใหม่ใดๆ) เรียก `smartPriorityTier` ภายในตัวเองเพื่อจัดลำดับรายการในแต่ละกลุ่มตามกฎ 5-tier ของ Sprint 9 (Overdue → Due Today → Upcoming → High Priority → Normal) — ฟังก์ชันเดียวกันนี้ยังถูกเรียกซ้ำผ่าน `sortTasksBySmartPriority` ที่ `DashboardPage.tsx` ใช้เรียง `TodayTasks` ด้วย จึงเป็น derivation ชุดเดียวที่ใช้ร่วมกันสองที่ ไม่ใช่ตรรกะแยกกันสองชุด — เพราะเป็น pure function ที่รับ props สดของ `tasks`/`events` ล้วนๆ (ไม่มี `useEffect`/state ภายใน) การอัปเดต Task/Event ที่หน้าอื่น (เช่นกด Done ที่ขั้นตอนที่ 10) จะสะท้อนใน Timeline ทันทีที่ re-render รอบถัดไปโดยไม่ต้อง refetch เพิ่ม
- **เปิด My Today ตอนเช้า (ขั้นตอนที่ 8):** Presentation = `src/pages/DashboardPage.tsx` (`SummaryCards`, `TodayTasks`, `TodaySchedule`, `Upcoming`); Domain = pure function ใน `src/lib/taskUtils.ts`/`src/lib/calendarUtils.ts` ที่คำนวณสรุปจาก `tasks`/`events` props สด
- **กด Done (ขั้นตอนที่ 10):** Presentation = `TaskCard.tsx` (ปุ่ม/checkbox Done ใช้ร่วมกันทั้งใน `TodayTasks` และ `TasksPage`); Domain = `useTasks`'s `updateTask` (ตั้ง `status="Done"`)
- **Life Progress อัปเดต (ขั้นตอนที่ 11, Sprint 9):** Presentation = `src/components/LifeProgress.tsx` (เรนเดอร์อยู่บน `DashboardPage.tsx` เอง ไม่ใช่หน้าแยก); Domain = `getLifeProgress` ใน `src/lib/timelineUtils.ts` เป็น pure function เช่นกัน ไม่มี state/record ใหม่ที่ persist — คำนวณจาก `tasks` props สดของ `App.tsx` ทุกครั้งที่ `DashboardPage` render (หมายเหตุ: เพราะ `App.tsx`/`useTasks` เป็น React state เดียวที่ทุก route ใช้ร่วมกัน การกด Done ที่ `TaskCard` (ขั้นตอนที่ 10) จะ trigger re-render ของ `DashboardPage` รอบถัดไปให้ `getLifeProgress` เห็นค่า `status="Done"` ใหม่ทันที — ไม่มี batching ที่ทำให้ค่าที่เพิ่งเขียนหายไปจากการอ่านครั้งถัดไปในหน้าเดียวกัน เพราะทั้งสองฝั่งอยู่ใน render tree เดียวกันของ React)

### 1.2 บุคคลทั่วไป (persona journey)

- ขั้นตอนที่ 1-4, 7 implement ด้วยฟังก์ชัน/component ชุดเดียวกันกับ 1.1 ข้างต้นทุกประการ (ไม่มี code path แยกตาม persona ตามที่ [[architecture|architecture.md]] หัวข้อ 4 ยืนยันไว้แล้ว)
- **เห็น Deadline ใน Timeline Now/Next/Later (ขั้นตอนที่ 5, Sprint 9):** implement ด้วยฟังก์ชัน/component ชุดเดียวกันกับ 1.1 ขั้นตอนที่ 7 ข้างต้นทุกประการ — `src/pages/TimelinePage.tsx` + `getTimelineEntries`/`smartPriorityTier` ใน `src/lib/timelineUtils.ts` ไม่มี code path แยกตาม persona
- **เปิดหน้า Notifications/Dashboard ประเมินความเร่งด่วน (ขั้นตอนที่ 6):** Presentation = `NotificationBell.tsx`/`NotificationList.tsx`/`src/pages/DashboardPage.tsx`; Domain = `src/hooks/useNotifications.ts` (เรียกทุก render, ไม่เก็บ record แยก); Reminder/Notification Derivation = `buildNotifications` ใน `src/lib/notificationUtils.ts` (pure TypeScript function คำนวณ Overdue/DueToday/DueSoon สดจาก `tasks`/`events`) — สถานะ "อ่านแล้ว/แจ้งเตือนแล้ว" เท่านั้นที่ persist ผ่าน `src/lib/storage.ts` (key `my-today:notifications-read`, `my-today:notifications-notified`)
- **Life Progress อัปเดต (ขั้นตอนที่ 8, Sprint 9):** implement ด้วยฟังก์ชัน/component ชุดเดียวกันกับ 1.1 ขั้นตอนที่ 11 ข้างต้นทุกประการ — `src/components/LifeProgress.tsx` + `getLifeProgress` ใน `src/lib/timelineUtils.ts` ไม่มี code path แยกตาม persona

### 2.1 Delete Life Area

Presentation = `src/pages/LifeAreasPage.tsx` (ปุ่มลบ ไม่เรียก hook ตรงๆ); Domain = `App.tsx`'s `handleDeleteLifeArea` เป็นจุดเดียวที่ implement ลำดับ two-phase clear-then-delete จริง — เรียก `updateTask`/`updateEvent`/`useFiles().updateFileLifeArea`/`updateNote`/`updateLink` ให้ครบทุก entity ก่อน (phase 1) แล้วจึงเรียก `deleteLifeArea` จาก `useLifeAreas` (phase 2); Structured Persistence = `src/lib/storage.ts` เขียนทับ key ของแต่ละ entity ตามลำดับเดียวกัน

### 2.2 Quick Capture / 2.3 Organize from Inbox

Presentation ของทั้งสอง operation implement อยู่ใน `src/components/QuickCaptureModal.tsx` (type picker + delegate ไปยัง `TaskFormModal`/`EventFormModal`/`FileFormModal`/`NoteFormModal`/`LinkFormModal` ตัวใดตัวหนึ่งพร้อม prop `quickCapture`) และ `src/pages/InboxPage.tsx` (เปิด modal ชุดเดียวกันแบบ non-quickCapture pre-filled เพื่อ "จัดระเบียบ") ตามลำดับ; Domain = create function (`inInbox: Boolean(quickCapture)`) หรือ update function (ตั้ง `inInbox=false`) ของ `useTasks`/`useEvents`/`useFiles`/`useNotes`/`useLinks` แล้วแต่ประเภทที่เลือก — กลไก "relaxed-then-full validation" implement เป็น `canSubmit` check ที่ผ่อนคลายลงในแต่ละ `*FormModal` เมื่อได้รับ prop `quickCapture`

### 2.4 List Inbox Items

Presentation = `src/pages/InboxPage.tsx`; Domain = logic รวม (aggregate) `tasks`/`events`/`files`/`notes`/`links` props ที่ `inInbox === true` ภายใน `InboxPage.tsx` เอง — ไม่มี hook หรือฟังก์ชันรวมศูนย์แยกต่างหากสำหรับ operation นี้ในปัจจุบัน (เป็น derived computation ระดับ page component)

### เหตุผลที่ทุก message ในไดอะแกรมเป็น local call

อ้างอิงตรงจาก [[tech-stack|tech-stack.md]] หัวข้อ 1 "Fixed Constraints" ("client-only, ไม่มี backend") และหัวข้อ 3 (Hosting = Vercel free tier, static SPA เท่านั้น) — ทุกลูกศรระหว่าง participant ในไดอะแกรมข้างต้น implement เป็น TypeScript function call ภายใน process เดียวกัน (synchronous สำหรับ entity ที่ backed ด้วย LocalStorage, asynchronous ผ่าน Promise เฉพาะ entity File ที่ backed ด้วย IndexedDB) ไม่มีขั้นตอนใดข้าม network ออกจากเครื่องผู้ใช้เลย ทั้งหมด build ด้วย **Vite `^5.3.1`** และ deploy เป็น static SPA เดียวบน **Vercel free tier**

## 6. Change Log

- 20260823 — สร้างเอกสารนี้ครั้งแรก: sequence diagram ของทั้งสอง persona journey (นักศึกษา/บุคคลทั่วไป) ครอบคลุมเฉพาะขั้นตอนที่ build เสร็จแล้ว, sequence diagram ของ cross-cutting operations ทั้งสี่ (Delete Life Area, Quick Capture, Organize from Inbox, List Inbox Items), error/edge-case notes ต่อไดอะแกรม, และ known gaps จาก Sprint 9-10 ที่ยังไม่ build (ไม่มี diagram ให้ ตามกฎ)
- 20260823 (อัปเดตภายหลัง) — เพิ่มหัวข้อ 5 "หมายเหตุการ implement ปัจจุบัน" ใหม่ทั้งหมด (เดิมเอกสารนี้ไม่มีกลไก implementation-footnote เลย ต่างจาก [[architecture|architecture.md]]/[[api-spec|api-spec.md]]/[[database-schema|database-schema.md]] ที่มีอยู่แล้ว) โดยอ้างอิง [[tech-stack|tech-stack.md]] ที่เพิ่งถูกสร้างขึ้น ระบุฟังก์ชัน/component/ไฟล์จริงที่ implement แต่ละ participant ของทุกไดอะแกรมในหัวข้อ 1 และ 2 พร้อมเลื่อน Change Log เดิมมาเป็นหัวข้อ 6 — ไม่มีการแก้ไขเนื้อหาของหัวข้อ 1/2/3/4
- 20260823 (อัปเดตภายหลังอีกครั้ง) — เพิ่มลิงก์ [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR master list]] ในหัวข้อ cross-link ด้านบน และเพิ่มประโยคใน §4 Known Gaps สำหรับ IndexedDB Quota-Warning (NFR-08) ให้สอดคล้องกับ known gap ใหม่ที่เพิ่งเพิ่มใน [[api-spec|api-spec.md]] หัวข้อ 4 — ไม่มีการแก้ไขหัวข้อ 1/2/3/5
- 20260823 (แก้ inconsistency เรื่อง Sprint 11 scope) — แก้ citation ของ bullet "IndexedDB Quota-Warning" ใน §4 จาก "(NFR-08)" เป็น "(Sprint 11, NFR-08, ...)" ให้ตรงกับ [[api-spec|api-spec.md]]/[[database-schema|database-schema.md]] และแก้ประโยคปิดท้าย §4 ที่เคยระบุผิดว่า "Sprint 11 ไม่เพิ่ม flow ใหม่ จึงไม่มีรายการเพิ่มในหัวข้อนี้" (ไม่ตรงกับ spec Sprint 11 ที่ถูกแก้ไขในคอมมิต `d6874c3` ให้รับ scope ของ IndexedDB Quota-Warning ไว้แล้ว) เป็นประโยคที่ยืนยันว่า Sprint 11 เป็นเจ้าของ operation ที่ยังไม่ build นี้จริง — ไม่มีการแก้ไขหัวข้อ 1/2/3/5 หรือ bullet อื่นใน §4
- 20260824 (Sprint 9 เสร็จแล้ว) — เพิ่ม message จริงสำหรับขั้นตอนที่ 7 (Timeline Now/Next/Later) และ 11 (Life Progress) ในไดอะแกรม persona นักศึกษา (§1.1) และขั้นตอนที่ 5/8 ในไดอะแกรม persona บุคคลทั่วไป (§1.2) แทนที่โน้ต "ยังไม่รวมในไดอะแกรมนี้" เดิม พร้อมอัปเดต mapping list ทั้งสองให้ระบุ FR-16/FR-17 และสถานะ "เสร็จแล้ว"; คงเหลือเฉพาะขั้นตอนที่ 9 ของ persona นักศึกษา (Custom Reminder Lead Time, Sprint 10) เป็นขั้นตอนเดียวที่ยังข้ามไดอะแกรม — เพิ่มโน้ตใหม่ใน §3 สำหรับ Get Timeline/Smart Priority Sort/Get Life Progress (read-only derivation ล้วนๆ ไม่มีสถานะพังค้างได้ เหมือน Build Notifications) — ลบ known-gap bullet 2 รายการของ Sprint 9 ออกจาก §4 (ย้ายไปมี diagram จริงใน §1 แล้ว) และแก้ประโยคเปิด §4 ให้เหลือเฉพาะ Sprint 10 ที่ยังไม่ build สอดคล้องกับการแก้ไขแบบเดียวกันใน [[architecture|architecture.md]] หัวข้อ 6/7 เมื่อ 20260824 — เพิ่มหมายเหตุการ implement ใหม่ใน §5 สำหรับทั้งสองไดอะแกรม persona อ้างอิงฟังก์ชันจริง (`getTimelineEntries`, `smartPriorityTier`, `sortTasksBySmartPriority`, `getLifeProgress` ใน `src/lib/timelineUtils.ts`, เรนเดอร์โดย `src/pages/TimelinePage.tsx`/`src/components/TimelineSection.tsx`/`src/components/LifeProgress.tsx`) เป็น pure function ที่คำนวณใหม่ทุก render ไม่มี state/record persist แยก — ไม่มีการแก้ไขไดอะแกรม/mapping ของหัวข้อ 2 (cross-cutting operations) ใดๆ
