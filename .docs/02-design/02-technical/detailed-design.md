# Detailed Design (Conceptual)

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้เป็น **Detailed Design แบบ conceptual และ technology-agnostic** — ลงรายละเอียดกว่า [[architecture|architecture.md]] อีกหนึ่งขั้น: [[architecture#3. Data Flow per User Journey|architecture.md ส่วนที่ 3]] แสดงข้อมูลไหล**ข้าม** User Journey ทั้งเส้นทาง (ภาพกว้าง หลาย operation ต่อกัน) ส่วนเอกสารนี้แสดงลำดับขั้นตอนการโต้ตอบ**ภายใน** operation เดียวที่มีหลายขั้นตอนและ/หรือข้าม Conceptual Component มากกว่าหนึ่งตัว — ใช้คำศัพท์ Conceptual Component และ Entity เดียวกับ [[architecture|architecture.md]] และอ้าง signature/หมายเหตุ side-effect จาก [[api-spec|api-spec.md]] โดยตรง ส่วน field/type ระดับละเอียดของแต่ละ Entity อ้างอิงจาก [[database-schema|database-schema.md]]

**ขอบเขตของเอกสารนี้มีตรง 2 อย่างเท่านั้น** (ตกลงระดับความลึกของเอกสารนี้ไว้แบบนี้ เพื่อไม่ให้ซ้ำเนื้อหาที่มีอยู่แล้วใน Business Rules ของแต่ละ spec และใน side-effect notes ของ [[api-spec|api-spec.md]]):

1. **Sequence Diagram** — หนึ่งภาพต่อ operation ที่มีหลายขั้นตอนและ/หรือข้าม Conceptual Component มากกว่าหนึ่งตัว — ข้าม CRUD เดี่ยวๆ ที่ไม่ข้าม Component (เช่น `renameFile`, `deleteLink`, `updateLifeArea`) เพราะไม่มีลำดับขั้นตอนที่มีนัยสำคัญให้แสดง
2. **State/Lifecycle Diagram** — หนึ่งภาพต่อ Entity ที่มี field สถานะ/วงจรชีวิต (Task `status`, สถานะ Inbox ที่ Task/Event/File/Note/Link ใช้ร่วมกัน, และ Notification `level`/`read`)

เอกสารนี้**ไม่มี**หัวข้อ "Decision/Branching Logic" แยกต่างหาก — เงื่อนไข/branch ที่เกิดภายใน operation หนึ่ง (เช่น "ถ้ารายการอยู่ในสถานะ Inbox ให้ข้าม validation field บังคับ") แสดงเป็น `alt`/`opt` block อยู่ **ภายใน** sequence diagram นั้นเองเท่านั้น

**สถานะ grounding:** เอกสารนี้สืบทอดสถานะ grounding เดียวกันกับ [[api-spec|api-spec.md]] และ [[database-schema|database-schema.md]] — operation/field ที่มี code จริงรองรับแล้ว (Personal Profile, Life Area, Task, Event, File จาก Sprint 1-7) แสดงเป็นลำดับขั้นตอนปกติ ส่วน operation/field ที่ยังเป็น spec-derived เท่านั้น (Note, Link ทั้งหมด, `reminderLeadTime`, `linkedNoteIds`, `linkedLinkIds`, การเชื่อม File↔Event) จะมีหมายเหตุ **"spec-derived เท่านั้น"** กำกับไว้ในขั้นตอนที่เกี่ยวข้องของแต่ละ diagram

เอกสารนี้เป็น **living document ที่ regenerate ใหม่ทั้งหมด** จาก spec ปัจจุบันทุกครั้งที่รัน (เหมือน [[architecture|architecture.md]], [[database-schema|database-schema.md]], [[api-spec|api-spec.md]]) — ไม่ใช่ประวัติสะสมแบบ append-only โครงสร้างหัวข้อ (`##` ต่อ Conceptual Component) ใช้ชุดเดียวกับ [[api-spec|api-spec.md]]

---

## Personal Profile & Life Area Management

ที่มา: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7]]

### ลบ Life Area (cascading unset ข้าม 5 Entity)

`deleteLifeArea(lifeAreaId)` เป็น operation เดียวในกลุ่มนี้ที่ข้าม Component มากกว่าหนึ่งตัว — Life Area ถูกอ้างอิงแบบ optional จาก Task/Event/File/Note/Link ทั้งหมด การลบจึงต้องไล่เคลียร์ค่าอ้างอิงก่อนลบตัว record เอง ไม่ใช่ CRUD เดี่ยวๆ

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant LA as Personal Profile & Life Area Management
    participant TSM as Task & Schedule Management
    participant FAM as File & Attachment Management
    participant UCI as Universal Capture & Inbox (Note/Link)

    U->>LA: deleteLifeArea(lifeAreaId)
    LA->>TSM: เคลียร์ lifeAreaId ของ Task ทุกรายการที่อ้างอิง lifeAreaId นี้ให้เป็นค่าว่าง
    TSM-->>LA: เคลียร์เสร็จ (Task ยังอยู่ครบ ไม่มีรายการถูกลบ)
    LA->>TSM: เคลียร์ lifeAreaId ของ Event ทุกรายการที่อ้างอิง lifeAreaId นี้ให้เป็นค่าว่าง
    TSM-->>LA: เคลียร์เสร็จ (Event ยังอยู่ครบ)
    LA->>FAM: เคลียร์ lifeAreaId ของ File ทุกรายการที่อ้างอิง lifeAreaId นี้ให้เป็นค่าว่าง
    FAM-->>LA: เคลียร์เสร็จ (File ยังอยู่ครบ)
    LA->>UCI: เคลียร์ lifeAreaId ของ Note ทุกรายการที่อ้างอิง lifeAreaId นี้ (spec-derived เท่านั้น — Note ยังไม่มี code รองรับ)
    LA->>UCI: เคลียร์ lifeAreaId ของ Link ทุกรายการที่อ้างอิง lifeAreaId นี้ (spec-derived เท่านั้น — Link ยังไม่มี code รองรับ)
    UCI-->>LA: เคลียร์เสร็จ
    LA->>LA: ลบ Life Area record นี้ออกจากระบบ
    LA-->>U: ลบสำเร็จ — Task/Event/File/Note/Link ที่เคยอ้างอิงยังอยู่ครบ แค่ไม่มี Life Area แล้ว
```

**คำอธิบาย:** ลำดับเคลียร์ค่าอ้างอิงต้องเกิด **ก่อน** การลบ record ของ Life Area เอง เพื่อไม่ให้เหลือ `lifeAreaId` ที่ชี้ไปยัง record ที่ไม่มีอยู่แล้ว (orphaned reference) — สอดคล้องกับ [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7]] Acceptance Criteria ที่ระบุว่า "Task ที่เคยผูกกับ Life Area ที่ถูกลบยังคงอยู่ ไม่หาย แค่ไม่มี Life Area แล้ว" การลบ**ไม่มีการ cascade ลบ**ต่อ record ใดๆ เลย มีแต่การเคลียร์ field อ้างอิงเท่านั้น

---

## Universal Capture & Inbox

ที่มา: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]]

### Quick Capture → Inbox → จัดเข้า Life Area

รวม 3 operation ที่ต่อเนื่องกันเป็น flow เดียว: `quickCapture`, `listInboxItems`, `assignInboxItemToLifeArea` — ข้าม Component ตามประเภทของสิ่งที่ capture (Task/Event ไปที่ Task & Schedule Management, File ไปที่ File & Attachment Management, Note/Link อยู่ภายใน Universal Capture & Inbox เอง)

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant UCI as Universal Capture & Inbox
    participant TSM as Task & Schedule Management
    participant FAM as File & Attachment Management

    U->>UCI: quickCapture({ kind, title: "จ่ายค่าไฟ 10 สิงหาคม" })
    alt kind = Task หรือ Event
        UCI->>TSM: สร้าง record ขั้นต่ำ (title เท่านั้น, field บังคับอื่นเว้นว่าง, ไม่มี lifeAreaId)
        TSM-->>UCI: record ที่สร้างแล้ว (สถานะ Inbox)
    else kind = File
        UCI->>FAM: สร้าง record ขั้นต่ำ (title/ชื่อไฟล์เท่านั้น, ไม่มี lifeAreaId)
        FAM-->>UCI: record ที่สร้างแล้ว (สถานะ Inbox)
    else kind = Note หรือ Link
        UCI->>UCI: สร้าง record ขั้นต่ำเอง (title เท่านั้น, ไม่มี lifeAreaId) — spec-derived เท่านั้น ยังไม่มี code รองรับ
    end
    UCI-->>U: รายการปรากฏใน "My Inbox" ทันที — ไม่มีการแยกวิเคราะห์ข้อความอิสระด้วยกลไกอัตโนมัติใดๆ

    Note over U,UCI: ผู้ใช้เปิดหน้า My Inbox เมื่อมีเวลาว่าง (อาจเป็นคนละช่วงเวลา)
    U->>UCI: listInboxItems()
    UCI->>TSM: ดึง Task/Event ทุกรายการที่ยังไม่มี lifeAreaId
    TSM-->>UCI: รายการที่ยังไม่จัดหมวด
    UCI->>FAM: ดึง File ทุกรายการที่ยังไม่มี lifeAreaId
    FAM-->>UCI: รายการที่ยังไม่จัดหมวด
    UCI->>UCI: รวม Note/Link ของตัวเองที่ยังไม่มี lifeAreaId (spec-derived เท่านั้น)
    UCI-->>U: รายการ Inbox รวมทุกประเภท

    U->>UCI: assignInboxItemToLifeArea(itemId, kind, lifeAreaId, remainingFields)
    alt kind = Task
        UCI->>TSM: updateTask(id, { lifeAreaId, dueDate, dueTime, priority, ... }) — record เดิม ไม่สร้างซ้ำ
        TSM-->>UCI: Task เต็มรูปแบบ
    else kind = Event
        UCI->>TSM: updateEvent(id, { lifeAreaId, startTime, endTime, ... }) — record เดิม ไม่สร้างซ้ำ
        TSM-->>UCI: Event เต็มรูปแบบ
    else kind = File
        UCI->>FAM: setFileLifeArea(id, lifeAreaId) + เติม field ที่เหลือ
        FAM-->>UCI: File เต็มรูปแบบ
    else kind = Note หรือ Link
        UCI->>UCI: เติม lifeAreaId + field ที่เหลือให้ record เดิมของตัวเอง (spec-derived เท่านั้น)
    end
    UCI-->>U: รายการกลายเป็นสมาชิกปกติ — ไปปรากฏในหน้า Tasks/Calendar/Files/Dashboard ตามปกติทันที
```

**คำอธิบาย:** ขั้นตอนสำคัญคือ **ไม่มีการสร้าง record ซ้ำสองชุด** ระหว่างขั้นตอน capture กับขั้นตอน assign — เป็น record เดียวกันที่ถูกเติม field ให้ครบขึ้นเท่านั้น ([[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]] Business Rule ข้อ 1-2) การมอบหมายงานให้ Task/Event/File ใช้ operation ที่มี code รองรับอยู่แล้วตั้งแต่ Sprint 2/3/4 ส่วนการจัดการ Note/Link ทั้ง flow ยังเป็น spec-derived เท่านั้น (สอดคล้องกับ grounding note ของ [[api-spec#Universal Capture & Inbox|api-spec.md]])

---

## Task & Schedule Management

ที่มา: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]], [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]

**หมายเหตุ operation ที่ข้ามไป (single-step/ไม่ข้าม Component):** `createTask`/`updateTask`/`deleteTask`/`setTaskStatus`/`listTasks`/`searchTasks`/`sortTasksByDeadline`/`setTaskReminderLeadTime`/`createEvent`/`updateEvent`/`deleteEvent`/`listEventsByView`/`setEventReminderLeadTime` เป็น CRUD/query เดี่ยวๆ ภายใน Component เดียวกัน ไม่มีลำดับขั้นตอนข้าม Component ให้แสดง

### รวมมุมมอง Calendar สำหรับหนึ่งวัน (`listCalendarItemsForDate`)

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant TSM as Task & Schedule Management
    participant LA as Personal Profile & Life Area Management

    U->>TSM: listCalendarItemsForDate(date)
    TSM->>TSM: ดึง Task ทุกรายการที่ dueDate = date
    TSM->>TSM: ดึง Event ทุกรายการที่ date = date
    TSM->>TSM: รวมสองชุดเป็นรายการเดียว จัดเรียงตามเวลา
    opt แต่ละรายการมี lifeAreaId
        TSM->>LA: ขอชื่อ Life Area สำหรับแสดงผล
        LA-->>TSM: ชื่อ Life Area (หรือค่าว่างถ้า Life Area ถูกลบไปแล้ว)
    end
    TSM-->>U: รายการรวมของวันนั้น (Task + Event ผสมกัน, เรียงตามเวลา)
```

**คำอธิบาย:** ขั้นตอนนี้**ไม่สร้างข้อมูลซ้ำ** — Task ที่มี `dueDate` ถูกดึงมาแสดงในมุมมอง Calendar โดยตรงจากข้อมูลชุดเดียวกับหน้า Tasks ไม่ใช่ record ใหม่คนละชุด ([[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]] Business Rule ข้อ 2-3) การขอชื่อ Life Area เป็นขั้นตอนเสริมสำหรับการแสดงผลเท่านั้น ไม่กระทบข้อมูลต้นทาง

### ทำ Task เป็น "เสร็จแล้ว" → ผลกระทบต่อ Dashboard และ Life Progress

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant TSM as Task & Schedule Management
    participant TD as Today Dashboard / Workspace Overview
    participant TSP as Timeline, Smart Priority & Life Progress

    U->>TSM: markTaskDone(taskId)
    TSM->>TSM: setTaskStatus(taskId, "Done") — บันทึกทันที
    TSM-->>U: Task อัปเดตแล้ว (status = Done)

    Note over TD,TSP: Dashboard และ Life Progress ไม่เก็บสำเนาข้อมูลของตัวเอง — คำนวณสดทุกครั้งที่เปิด/รีเฟรช
    U->>TD: เปิด/รีเฟรช Today Dashboard
    TD->>TSM: อ่านรายการ Task/Event ล่าสุด
    TSM-->>TD: ข้อมูลล่าสุด (รวม Task ที่เพิ่ง Done)
    TD-->>U: Summary Cards/Today's Tasks อัปเดตจำนวนงานเสร็จแล้วทันที

    U->>TSP: getLifeProgress(date)
    TSP->>TSM: อ่านสถานะ Task ล่าสุดของวันนั้น แยกตาม Life Area
    TSM-->>TSP: ข้อมูลล่าสุด
    TSP-->>U: จำนวนเสร็จแล้ว/ทั้งหมด อัปเดตทันที ทั้งรวมและแยกตาม Life Area
```

**คำอธิบาย:** สถานะ Done ของ Task มีผลต่อการคำนวณ Life Progress **ทันที** โดยไม่ต้องมี operation แจ้งเตือนแยก เพราะทั้ง Dashboard และ Life Progress เป็นมุมมองที่อ่านข้อมูลสดจากที่เดียวกันเสมอ ไม่ใช่สำเนาที่ต้อง sync ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 3, [[architecture#1.8 Today Dashboard / Workspace Overview|architecture.md]])

---

## File & Attachment Management

ที่มา: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

**ไม่มี sequence diagram ในหัวข้อนี้** — operation ทั้งหมดของ Component นี้ (`addFile`, `renameFile`, `setFileCategory`, `setFileLifeArea`, `deleteFile`, `listFiles`, `listRecentFiles`, `previewFile`, `downloadFile`, `linkFileToTask`/`unlinkFileFromTask`, `listFilesLinkedToTask`, และคู่ Event ของ Sprint 10) เป็น CRUD เดี่ยวๆ หรือการตั้ง/ยกเลิกค่าความสัมพันธ์แบบขั้นตอนเดียว ไม่ข้าม Component ด้วยตัวเอง — ปฏิสัมพันธ์ข้าม Component ที่เกี่ยวกับ File ถูกแสดงไว้แล้วในที่อื่น: การรวม File เข้า Inbox flow (ดูหัวข้อ Universal Capture & Inbox ด้านบน) และการประกอบ Related Files เข้าไปใน Task/Event Detail (ดูหัวข้อ Cross-Entity Linking ด้านล่าง)

---

## Notification & Deadline Awareness

ที่มา: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

### ตรวจสอบ Deadline อัตโนมัติ → สร้าง Notification → คลิกย้อนกลับต้นทาง

```mermaid
sequenceDiagram
    participant NDA as Notification & Deadline Awareness
    participant TSM as Task & Schedule Management
    actor U as ผู้ใช้

    Note over NDA: ตรวจสอบอัตโนมัติทุกครั้งที่เปิด/รีเฟรชพื้นที่ทำงาน ไม่ต้องมีผู้ใช้สั่ง
    NDA->>TSM: อ่าน Task/Event ทั้งหมด (พร้อมกำหนดเวลาและ reminderLeadTime ถ้ามี)
    TSM-->>NDA: รายการ Task/Event ปัจจุบัน
    loop สำหรับ Task/Event แต่ละรายการที่มีกำหนดเวลา
        opt รายการนี้ตั้งค่า reminderLeadTime เฉพาะตัวไว้ (Sprint 10, spec-derived เท่านั้น)
            NDA->>NDA: ใช้เวลานำหน้าที่ผู้ใช้ตั้งเฉพาะรายการนี้
        else ไม่ได้ตั้งค่าเฉพาะตัว
            NDA->>NDA: ใช้เวลานำหน้าเริ่มต้นกลางของระบบ
        end
        alt เลยกำหนดเวลาไปแล้ว
            NDA->>NDA: จัดระดับ Overdue
        else ถึงวันกำหนดแล้วแต่ยังไม่เลยเวลา
            NDA->>NDA: จัดระดับ DueToday
        else ใกล้ถึงกำหนดภายในเวลานำหน้าที่ตั้งไว้
            NDA->>NDA: จัดระดับ DueSoon
        else ยังไม่เข้าเงื่อนไขใดเลย
            NDA->>NDA: ไม่สร้าง Notification สำหรับรายการนี้
        end
        NDA->>NDA: สร้าง/คงไว้ Notification (id ผูกกับ sourceId+level เพื่อไม่ให้ซ้ำ)
    end
    NDA-->>U: รายการ Notification ปรากฏใน Notification Center (และส่วนแจ้งเตือนบน Dashboard)

    U->>NDA: คลิก Notification รายการหนึ่ง
    NDA->>NDA: markNotificationRead(notificationId)
    NDA->>NDA: resolveNotificationSource(notificationId)
    NDA->>TSM: ขอรายละเอียด Task/Event ต้นทาง
    TSM-->>NDA: Task/Event ต้นทาง
    NDA-->>U: พาไปยังหน้ารายละเอียดของ Task/Event ต้นทางนั้นทันที
```

**คำอธิบาย:** `checkDeadlines` เป็น operation ที่ **derive/คำนวณ** ผลลัพธ์จากข้อมูล Task/Event ที่มีอยู่ ไม่ใช่รับข้อมูลจากผู้ใช้ตรงๆ ([[api-spec#Notification & Deadline Awareness|api-spec.md]]) การอ้างอิงเวลานำหน้าเฉพาะรายการ (override) เป็นความสามารถของ [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 2 และ 4 ที่ยังเป็น spec-derived เท่านั้น ส่วนการคลิกย้อนกลับต้นทางอ้างอิง [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]] Business Rule ข้อ 1 การขอสิทธิ์แจ้งเตือนระดับอุปกรณ์ (`requestBrowserNotificationPermission`) ไม่ปรากฏใน diagram นี้เพราะเป็น operation ขั้นตอนเดียวที่ไม่กระทบ flow นี้เลยไม่ว่าผลลัพธ์จะเป็นอย่างไร ([[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]] Business Rule ข้อ 2)

---

## Timeline, Smart Priority & Life Progress

ที่มา: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]

### ประกอบมุมมอง Timeline Now/Next/Later (`getTimeline`)

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant TSP as Timeline, Smart Priority & Life Progress
    participant TSM as Task & Schedule Management

    U->>TSP: getTimeline(now)
    TSP->>TSM: ดึง Task ที่ dueDate = วันนี้ จากทุก Life Area
    TSM-->>TSP: Task ของวันนี้
    TSP->>TSM: ดึง Event ที่ date = วันนี้ จากทุก Life Area
    TSM-->>TSP: Event ของวันนี้
    TSP->>TSP: sortBySmartPriority(รวม Task+Event) — กฎตายตัว: Overdue → Due Today → Upcoming → High Priority → Normal (ไม่มีการเรียนรู้/ปรับตัวเอง)
    loop สำหรับแต่ละรายการที่จัดลำดับแล้ว
        alt ถึงเวลาแล้ว หรือเริ่มภายใน 1 ชั่วโมงข้างหน้า
            TSP->>TSP: จัดเข้ากลุ่ม Now
        else เป็นรายการที่เหลือของวันนี้ถัดจาก Now
            TSP->>TSP: จัดเข้ากลุ่ม Next
        else ไกลออกไปอีกของวันนี้ หรือยังไม่ระบุเวลาแน่นอน
            TSP->>TSP: จัดเข้ากลุ่ม Later
        end
    end
    TSP-->>U: { now, next, later } — ครอบคลุมเฉพาะ "วันนี้" เท่านั้น
```

**คำอธิบาย:** Timeline รวม Task ที่มีกำหนดส่งของวันนี้กับ Event ของวันนี้จากทุก Life Area เข้าด้วยกันเป็นมุมมองเดียว โดยไม่แยกว่ามาจากด้านไหนของชีวิต ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 1) การจัดลำดับ Smart Priority ใช้กฎตายตัวชุดเดียวกันนี้ร่วมกันกับ `getTodayTasks()` ของ Today Dashboard ด้วย (ดูหัวข้อ Today Dashboard ด้านล่าง) — ไม่มีการประมวลผลแบบปรับตัวเองหรือ machine learning ใดๆ ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 2)

### คำนวณ Life Progress (`getLifeProgress`)

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant TSP as Timeline, Smart Priority & Life Progress
    participant TSM as Task & Schedule Management
    participant LA as Personal Profile & Life Area Management

    U->>TSP: getLifeProgress(date)
    TSP->>TSM: ดึง Task ทั้งหมดที่ครบกำหนดในวันนั้น
    TSM-->>TSP: Task ของวันนั้น (ทุก Life Area)
    TSP->>TSP: total = จำนวน Task ทั้งหมด, done = จำนวน Task ที่ status = Done
    TSP->>TSP: จัดกลุ่มย่อยตาม lifeAreaId
    opt ต้องแสดงชื่อ Life Area
        TSP->>LA: ขอชื่อ Life Area ต่อกลุ่ม
        LA-->>TSP: ชื่อ Life Area (หรือค่าว่างถ้าไม่มี/ถูกลบไปแล้ว)
    end
    TSP-->>U: { total, done, byLifeArea[] } — ตัวเลขสถานะเฉยๆ
```

**คำอธิบาย:** ผลลัพธ์เป็นตัวเลขสถานะเฉยๆ **ห้ามนำไปแสดงเป็นคะแนน/การตัดสินผู้ใช้ในชั้น UI ใดๆ** เช่น ห้ามใช้คำว่า "Score" ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 3) — ข้อความ UI ต้องไม่มีลักษณะตัดสิน/เปรียบเทียบผู้ใช้ตาม Acceptance Criteria ของ Sprint นี้

---

## Cross-Entity Linking (What / When / Information)

ที่มา: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]], [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

**หมายเหตุ operation ที่ข้ามไป (single-step/ไม่ข้าม Component ด้วยตัวเอง):** `linkNoteToTask`/`unlinkNoteFromTask`, `linkLinkToTask`/`unlinkLinkFromTask`, `linkNoteToEvent`/`unlinkNoteFromEvent`, `linkLinkToEvent`/`unlinkLinkFromEvent` เป็นการตั้ง/ยกเลิกค่าความสัมพันธ์ขั้นตอนเดียว — ผลของการเชื่อมเหล่านี้ถูกแสดงรวมอยู่ใน diagram ด้านล่างแล้ว (เป็นข้อมูลที่ `getTaskDetail`/`getEventDetail` อ่านกลับมาประกอบผล)

### ประกอบ What/When/Information ของ Task (`getTaskDetail`)

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant CEL as Cross-Entity Linking
    participant TSM as Task & Schedule Management
    participant FAM as File & Attachment Management
    participant UCI as Universal Capture & Inbox (Note/Link)

    U->>CEL: getTaskDetail(taskId)
    CEL->>TSM: ดึง Task { title, description, lifeAreaId, dueDate, dueTime, reminderLeadTime }
    TSM-->>CEL: What + When ของ Task
    CEL->>FAM: listFilesLinkedToTask(taskId)
    FAM-->>CEL: รายการ File ที่เชื่อมไว้
    opt Note ที่เชื่อมไว้ผ่าน linkedNoteIds (Sprint 10, spec-derived เท่านั้น)
        CEL->>UCI: ดึง Note ตาม linkedNoteIds
        UCI-->>CEL: รายการ Note
    end
    opt Link ที่เชื่อมไว้ผ่าน linkedLinkIds (Sprint 10, spec-derived เท่านั้น)
        CEL->>UCI: ดึง Link ตาม linkedLinkIds
        UCI-->>CEL: รายการ Link
    end
    CEL->>CEL: ประกอบผลลัพธ์เดียว { what, when, information: { files, notes, links } }
    CEL-->>U: รายละเอียด Task ครบทั้ง 3 มิติ ไม่ต้องสลับหน้า
```

**คำอธิบาย:** จุดประสงค์คือให้หน้า Task Detail ไม่ต้องสลับไปมาหลายหน้าเพื่อประกอบข้อมูลเอง ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 3) `information.files` มาจาก `linkFileToTask`/`listFilesLinkedToTask` ที่มี code รองรับแล้วตั้งแต่ [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]] ส่วนขั้นตอนที่ดึง Note/Link เป็น spec-derived เท่านั้น (ทั้ง entity เองและ field เชื่อมโยงยังไม่มี code รองรับ)

### ประกอบ What/When/Information ของ Event (`getEventDetail`)

ใช้กลไกเดียวกับ `getTaskDetail` ทุกประการ เพียงสลับต้นทางจาก Task เป็น Event ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 4) — ดู diagram ด้านบนแล้วอ่าน `TSM` เป็นฝั่ง Event ของ Component เดียวกัน โดยมีข้อแตกต่างหนึ่งจุดที่ต้องระบุเพิ่ม: การเชื่อม File↔Event (`linkFileToEvent`/`listFilesLinkedToEvent`) **ยังไม่มี field/code รองรับ** ณ ตอนเขียนเอกสารนี้ (มีแค่ File↔Task ผ่าน `linkedTaskIds` ในโค้ดจริง) จึงเป็นช่องว่าง (spec-derived gap) เพิ่มเติมจากที่ Note/Link ก็เป็น spec-derived เท่านั้นอยู่แล้ว:

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant CEL as Cross-Entity Linking
    participant TSM as Task & Schedule Management
    participant FAM as File & Attachment Management
    participant UCI as Universal Capture & Inbox (Note/Link)

    U->>CEL: getEventDetail(eventId)
    CEL->>TSM: ดึง Event { title, type, lifeAreaId, date, startTime, endTime, reminderLeadTime }
    TSM-->>CEL: What + When ของ Event
    opt File ที่เชื่อมไว้ผ่าน linkFileToEvent (Sprint 10, spec-derived เท่านั้น — ยังไม่มี field รองรับใน File จริง)
        CEL->>FAM: listFilesLinkedToEvent(eventId)
        FAM-->>CEL: รายการ File ที่เชื่อมไว้
    end
    opt Note/Link ที่เชื่อมไว้ (Sprint 10, spec-derived เท่านั้น)
        CEL->>UCI: ดึง Note/Link ตาม linkedNoteIds/linkedLinkIds
        UCI-->>CEL: รายการ Note/Link
    end
    CEL->>CEL: ประกอบผลลัพธ์เดียว { what, when, information }
    CEL-->>U: รายละเอียด Event ครบทั้ง 3 มิติ
```

---

## Today Dashboard / Workspace Overview

ที่มา: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1]], [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]], [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]], [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]

### เปิด Today Dashboard → รวมทุกส่วนประกอบมาแสดงในหน้าเดียว

```mermaid
sequenceDiagram
    actor U as ผู้ใช้
    participant TD as Today Dashboard / Workspace Overview
    participant TSM as Task & Schedule Management
    participant TSP as Timeline, Smart Priority & Life Progress
    participant NDA as Notification & Deadline Awareness

    U->>TD: เปิด Today Dashboard
    TD->>TSM: getDashboardSummary(date)
    TSM-->>TD: { totalToday, doneToday, pendingToday, dueSoonCount }
    TD->>TSM: getTodayTasks()
    TSM->>TSP: sortBySmartPriority(Task ของวันนี้) — ใช้กฎเรียงลำดับตายตัวชุดเดียวกับ Timeline
    TSP-->>TSM: Task ที่จัดลำดับแล้ว
    TSM-->>TD: Today's Tasks
    TD->>TSM: getTodaySchedule()
    TSM-->>TD: Today's Schedule (Event ของวันนี้)
    TD->>TSM: getUpcoming()
    TSM-->>TD: รายการที่ใกล้ถึงกำหนดถัดจากวันนี้
    TD->>NDA: getDashboardNotifications()
    NDA-->>TD: Notification สำคัญ/ยังไม่อ่าน
    TD->>TD: ประกอบ Summary Cards + Today's Tasks + Today's Schedule + Upcoming + Notification section
    TD-->>U: หน้า Dashboard ที่รวมทุกอย่างของวันนี้
```

**คำอธิบาย:** Today Dashboard **ไม่เก็บข้อมูลของตัวเอง** — ทุก operation เป็นมุมมองที่คำนวณสด (derived read) จากข้อมูล Task/Event/Notification/Life Progress ที่นิยามไว้ใน Component อื่นเท่านั้น ([[api-spec#Today Dashboard / Workspace Overview|api-spec.md]]) `getTodayTasks()` ใช้ `sortBySmartPriority` ร่วมกับ Timeline เพื่อให้ลำดับ Overdue/Due Today/Upcoming/High Priority/Normal เป็นกฎเดียวกันทั้งสองที่ ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 2) `getDashboardSummary` คำนวณจากข้อมูล Task/Event จริงตั้งแต่ [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]] เป็นต้นไป (Sprint 1 เดิมใช้ข้อมูลตัวอย่างสำหรับทดสอบ UI เท่านั้น) ปุ่ม Quick Capture กลางที่เข้าถึงได้จากหน้านี้ไม่ปรากฏเป็นขั้นตอนแยกใน diagram นี้ เพราะ flow เต็มของมันถูกแสดงไว้แล้วในหัวข้อ Universal Capture & Inbox ด้านบน

---

## Entity Lifecycles (State / Status Diagrams)

### Task — `status`

```mermaid
stateDiagram-v2
    [*] --> ToDo: createTask() (ค่าเริ่มต้นเสมอ)
    ToDo --> Doing: setTaskStatus("Doing")
    Doing --> ToDo: setTaskStatus("To Do")
    Doing --> Done: setTaskStatus("Done") / markTaskDone()
    ToDo --> Done: setTaskStatus("Done") / markTaskDone()
    Done --> Doing: setTaskStatus("Doing") (เปิดงานกลับมาทำต่อ)
    Done --> ToDo: setTaskStatus("To Do") (เปิดงานกลับมาใหม่)
```

**สิ่งที่ทำให้เปลี่ยนสถานะ:** ผู้ใช้เปลี่ยนเองผ่าน `setTaskStatus`/`markTaskDone` เท่านั้น — spec ไม่ได้จำกัดลำดับการเปลี่ยนสถานะไว้ตายตัว (ไม่บังคับว่าต้องผ่าน Doing ก่อนถึง Done) ค่าเริ่มต้นตอนสร้างเสมอคือ **To Do** ([[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]] Business Rule ข้อ 1, [[api-spec#Task & Schedule Management|api-spec.md]]) สถานะ **Done** มีผลทันทีต่อการคำนวณ Life Progress ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 3) และต่อตัวเลขสรุปบน Today Dashboard ([[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]] Business Rule ข้อ 3)

### สถานะ Inbox (ใช้ร่วมกันโดย Task/Event/File/Note/Link)

```mermaid
stateDiagram-v2
    [*] --> Inbox: quickCapture(kind, title) — ขั้นต่ำ, ไม่มี Life Area
    [*] --> Complete_NoLifeArea: สร้างผ่านฟอร์มเต็ม โดยไม่เลือก Life Area
    [*] --> Complete_WithLifeArea: สร้างผ่านฟอร์มเต็ม พร้อมเลือก Life Area

    Inbox --> Complete_WithLifeArea: assignInboxItemToLifeArea() — เติม Life Area + field ที่เหลือ (record เดิม ไม่สร้างซ้ำ)

    Complete_WithLifeArea --> Complete_NoLifeArea: deleteLifeArea() ของ Life Area ที่อ้างอิงอยู่ (เคลียร์ lifeAreaId เท่านั้น — ไม่กลับไปเป็น Inbox)
    Complete_NoLifeArea --> Complete_WithLifeArea: ผู้ใช้เลือก Life Area ให้ภายหลัง (update ปกติ)

    state Complete_NoLifeArea: Complete (ไม่มี Life Area)
    state Complete_WithLifeArea: Complete (มี Life Area)
```

**สิ่งที่ทำให้เปลี่ยนสถานะ:** สถานะ **Inbox** หมายถึง record ที่ทั้งยังไม่มี `lifeAreaId` **และ** ยังกรอกแค่ field ขั้นต่ำ (ประเภท + ชื่อ/ข้อความ) เท่านั้น ([[database-schema#Inbox Status (ไม่ใช่ table แยก)|database-schema.md]]) — `assignInboxItemToLifeArea` เป็นทางเดียวที่พารายการออกจากสถานะนี้ (ไม่มี operation ที่พารายการกลับเข้า Inbox) ข้อที่ควรสังเกต: การลบ Life Area ที่รายการหนึ่งอ้างอิงอยู่ (ดู sequence diagram ในหัวข้อ Personal Profile & Life Area Management ด้านบน) เพียงเคลียร์ `lifeAreaId` ให้กลายเป็นค่าว่างเท่านั้น **ไม่ทำให้รายการกลับไปเป็นสถานะ Inbox** เพราะรายการนั้นมี field ครบแล้วตั้งแต่ก่อนถูกลบ Life Area ([[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7]] Acceptance Criteria, [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]] Business Rule ข้อ 1-2)

### Notification — ระดับความเร่งด่วน (`level`) และสถานะอ่าน (`read`)

Notification มี 2 มิติที่เป็นอิสระจากกัน — ระดับความเร่งด่วนคำนวณอัตโนมัติจากเวลา และสถานะอ่าน/ยังไม่อ่านที่ผู้ใช้เปลี่ยนเอง:

```mermaid
stateDiagram-v2
    [*] --> DueSoon: checkDeadlines() ตรวจพบว่าใกล้ถึงกำหนด (ภายในเวลานำหน้าการเตือน)
    DueSoon --> DueToday: checkDeadlines() ตรวจพบว่าถึงวันกำหนดแล้ว
    DueToday --> Overdue: checkDeadlines() ตรวจพบว่าเลยกำหนดเวลาไปแล้ว
```

```mermaid
stateDiagram-v2
    [*] --> Unread: สร้างขึ้นจาก checkDeadlines() (ค่าเริ่มต้นเสมอ)
    Unread --> Read: markNotificationRead() / markAllNotificationsRead()
```

**สิ่งที่ทำให้เปลี่ยนสถานะ:** `level` เปลี่ยนอัตโนมัติทุกครั้งที่ `checkDeadlines()` รันซ้ำ ตามเวลาปัจจุบันเทียบกับกำหนดของ Task/Event ต้นทาง ([[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]] Feature Requirements) **ข้อสำคัญ:** เนื่องจาก id ของ Notification ผูกกับ `sourceId` + `level` การข้ามระดับ (เช่นจาก DueSoon ไป Overdue) จะถูกมองเป็น Notification **รายการใหม่** (unread อีกครั้ง) ไม่ใช่การแก้ record เดิม แม้ระดับก่อนหน้าจะถูกอ่านไปแล้วก็ตาม ส่วน `read` เป็น field เดียวของ Notification ที่ผู้ใช้เปลี่ยนแปลงโดยตรง ([[api-spec#Notification & Deadline Awareness|api-spec.md]]) และไม่มี operation ที่เปลี่ยนกลับจาก Read เป็น Unread
