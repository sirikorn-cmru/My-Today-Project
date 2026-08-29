# API Spec — Internal Data Access Contract (Conceptual)

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้เป็น **Internal Data Access Contract แบบ conceptual และ technology-agnostic** — อธิบายว่าแต่ละ Conceptual Component (ดู [[architecture#1. Conceptual Components|architecture.md]]) เปิดให้ทำ operation อะไรได้บ้างเหนือข้อมูลที่นิยามไว้ใน [[database-schema|database-schema.md]] (create/read/update/delete/query/link/unlink/mark-status) คำว่า "API" ในเอกสารนี้จึงหมายถึง "สัญญาการเข้าถึงข้อมูลภายในแอป" เท่านั้น **ไม่ใช่ network API** — เพราะ My Today เป็นแอป **client-only ไม่มี Backend** (ดู `CLAUDE.md`) ไม่มี server ให้เรียก ไม่มี route/verb/status code/รูปแบบ request-response ใดๆ ที่ต้องนิยาม ทุก operation ด้านล่างเกิดขึ้นในเครื่องผู้ใช้เครื่องเดียวทั้งหมด

รูปแบบที่ใช้เขียนแต่ละ operation คือ signature แบบฟังก์ชันล้วนๆ เช่น `createTask(input: TaskInput) → Task` — เป็น **สัญญาเชิงแนวคิดเพื่อสื่อสารพฤติกรรม** ไม่ใช่โค้ดจริง ไม่อ้างอิงไฟล์ TypeScript จริง ชื่อ hook (เช่น `useTasks`) หรือ framework API ใดๆ ที่ codebase เลือกใช้ (แม้จะมีอยู่จริงแล้วก็ตาม)

เอกสารนี้เป็น **living document ที่ regenerate ใหม่ทั้งหมด** จาก spec ปัจจุบันทุกครั้งที่รัน (เหมือน [[architecture|architecture.md]] และ [[database-schema|database-schema.md]]) — ไม่ใช่ประวัติสะสมแบบ append-only โครงสร้างหัวข้อ (`##` ต่อ Conceptual Component) ใช้ชุดเดียวกับ [[architecture#1. Conceptual Components|architecture.md ส่วนที่ 1]] และชื่อ field/entity ที่อ้างในแต่ละ signature ใช้คำศัพท์เดียวกับ [[database-schema|database-schema.md]] เพื่อให้ทั้งสามเอกสารสอดคล้องกัน

**สถานะ grounding:** operation ที่เกี่ยวกับ Personal Profile, Life Area, Task, Event/Schedule Item, File (field พื้นฐานจาก Sprint 1-7) มี code จริงรองรับแนวคิดอยู่แล้ว ส่วน operation ที่เกี่ยวกับ Note, Link ทั้งหมด (Sprint 8) และ operation ที่พึ่ง field `reminderLeadTime`, `linkedNoteIds`, `linkedLinkIds` ของ Task/Event หรือการเชื่อม File↔Event (Sprint 10) **ยังไม่มี code รองรับ ณ ตอนเขียนเอกสารนี้ — เป็น spec-derived เท่านั้น** ระบุไว้ชัดเจนในหมายเหตุของแต่ละ operation ที่เกี่ยวข้อง (สอดคล้องกับสถานะ grounding ต่อ field ใน [[database-schema|database-schema.md]])

---

## Personal Profile & Life Area Management

ที่มา: [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7]]

### Personal Profile

- **`getPersonalProfile() → PersonalProfile`**
  ดึง Personal Profile ชุดเดียวที่มีอยู่เสมอในระบบ (ไม่มีระบบบัญชี/ผู้ใช้หลายคน จึงมีแค่ 1 record ต่อการติดตั้งใช้งาน)
- **`updatePersonalProfile(input: PersonalProfileInput) → PersonalProfile`**
  สร้าง/แก้ไข record เดียวนี้ — `name` เป็น field เดียวที่ควรบังคับกรอก ส่วนกลุ่มข้อมูลการศึกษา (`studentId`, `faculty`, `major`) และองค์กร (`organization`, `position`) ต้องเป็น optional เสมอ **ห้ามบังคับกรอกเด็ดขาด** (Sprint 7 Business Rule ข้อ 4)

### Life Area

- **`listLifeAreas() → LifeArea[]`**
  ดึง Life Area ทั้งหมด เป็นรายการระดับเดียว ไม่มี hierarchy ซ้อนกัน
- **`createLifeArea(input: LifeAreaInput) → LifeArea`**
  สร้าง Life Area ใหม่จากชื่อที่ผู้ใช้กำหนดเอง ไม่มีชุดค่าตายตัว (ชุด seed ตัวอย่างมีให้แค่ตอนใช้งานครั้งแรก, Sprint 7 Business Rule ข้อ 1)
- **`updateLifeArea(lifeAreaId, input: LifeAreaInput) → LifeArea`**
  แก้ไขชื่อ Life Area ที่มีอยู่
- **`deleteLifeArea(lifeAreaId) → void`**
  ลบ Life Area — **การลบไม่ลบ Task/Event/File/Note/Link ที่เคยอ้างอิงถึง** เพียงทำให้ field อ้างอิง Life Area ของ record เหล่านั้นกลายเป็นค่าว่างเท่านั้น (Sprint 7 Acceptance Criteria)

---

## Universal Capture & Inbox

ที่มา: [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]]

- **`quickCapture(input: { kind: "Task"|"Event"|"File"|"Note"|"Link", title: string }) → Task | Event | File | Note | Link`**
  บันทึกรายการใหม่แบบเร็วจากที่ไหนก็ได้ในระบบ โดยกรอกแค่ประเภท + ชื่อ/ข้อความขั้นต่ำ field อื่นที่ entity ประเภทนั้นต้องมีตามปกติจะถูกเว้นว่างไว้ก่อนได้ชั่วคราว (Sprint 8 Business Rule ข้อ 1) รายการที่สร้างยังไม่มี Life Area จึงอยู่ในสถานะ Inbox โดยอัตโนมัติ **ห้ามแยกวิเคราะห์ข้อความอิสระด้วยกลไกอัตโนมัติใดๆ** — ข้อความที่พิมพ์เข้ามาถูกเก็บตรงตัวเป็นชื่อ/หัวข้อเท่านั้น ไม่มีการแยกวันที่/หมวดหมู่ให้อัตโนมัติ (Sprint 8 Business Rule ข้อ 5)
- **`listInboxItems() → (Task | Event | File | Note | Link)[]`**
  ดึงทุก record จาก Task/Event/File/Note/Link ที่ยังไม่ถูกกำหนด Life Area — Inbox ไม่ใช่ entity ที่เก็บข้อมูลของตัวเอง เป็นแค่สถานะของ 5 entity นี้ (ดู [[database-schema#Inbox Status (ไม่ใช่ table แยก)|database-schema.md]])
- **`assignInboxItemToLifeArea(itemId, itemKind, lifeAreaId, remainingFields) → Task | Event | File | Note | Link`**
  จัดรายการจาก Inbox เข้า Life Area ที่เลือก พร้อมเติม field ที่เหลือให้ครบ (เช่น กำหนดส่งของ Task, เวลาเริ่ม-สิ้นสุดของ Event) รายการจะกลายเป็นสมาชิกปกติของ entity ประเภทนั้นทันที **ไม่มีการสร้าง record ซ้ำสองชุด** — เป็น record เดิมที่ถูกเติมข้อมูลให้ครบขึ้นเท่านั้น (Sprint 8 Business Rule ข้อ 2)
- **`createNote(input: NoteInput) → Note`** / **`updateNote(noteId, input: NoteInput) → Note`** / **`deleteNote(noteId) → void`**
  CRUD ของ Note (หัวข้อ, เนื้อหา, Life Area ที่เกี่ยวข้องแบบ optional) — ไม่มี deadline/priority/status เหมือน Task (Sprint 8 Business Rule ข้อ 3) **entity นี้ยังไม่มี code รองรับ ณ ตอนเขียนเอกสารนี้ — spec-derived เท่านั้น**
- **`createLink(input: LinkInput) → Link`** / **`updateLink(linkId, input: LinkInput) → Link`** / **`deleteLink(linkId) → void`**
  CRUD ของ Link (ชื่อ, URL, Life Area ที่เกี่ยวข้องแบบ optional) (Sprint 8 Business Rule ข้อ 4) **entity นี้ยังไม่มี code รองรับ ณ ตอนเขียนเอกสารนี้ — spec-derived เท่านั้น**

---

## Task & Schedule Management

ที่มา: [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]], [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]], [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

### Task

- **`createTask(input: TaskInput) → Task`**
  สร้าง Task ใหม่ — `title` ต้องมีเสมอแม้สร้างผ่าน quick capture; `description`, `dueDate`, `dueTime`, `priority` ต้องมีค่าตามกฎเดิมของ [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]] แต่เว้นว่างไว้ก่อนได้ชั่วคราวหากรายการยังอยู่ในสถานะ Inbox ([[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]] Business Rule ข้อ 1) `lifeAreaId` เป็น optional เสมอ ([[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7]] Business Rule ข้อ 2 — override ข้อบังคับเดิมของ Sprint 2) `status` เริ่มต้นเป็น "To Do"
- **`updateTask(taskId, input: TaskInput) → Task`**
  แก้ไขรายละเอียด Task ที่มีอยู่
- **`deleteTask(taskId) → void`**
  ลบ Task ออกจากระบบ
- **`setTaskStatus(taskId, status: "To Do"|"Doing"|"Done") → Task`**
  เปลี่ยนสถานะความคืบหน้าของ Task
- **`markTaskDone(taskId) → Task`**
  ทางลัดของ `setTaskStatus(taskId, "Done")` — สถานะ Done ของ Task มีผลต่อการคำนวณ Life Progress ทันที ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 3)
- **`listTasks(filter?: { status?, priority?, lifeAreaId? }) → Task[]`**
  ดึงรายการ Task ทั้งหมด รองรับ Filter ตาม Status และ Priority
- **`searchTasks(query: string) → Task[]`**
  ค้นหา Task จากชื่องาน
- **`sortTasksByDeadline(tasks: Task[]) → Task[]`**
  จัดเรียง Task ตามกำหนดส่ง
- **`setTaskReminderLeadTime(taskId, leadTime: number | null) → Task`**
  ตั้งค่าเวลานำหน้าการเตือนแบบกำหนดเองต่อ Task รายการนี้ override ค่าเริ่มต้นกลางของระบบจาก [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]] ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 2) **field `reminderLeadTime` ยังไม่มี code รองรับ ณ ตอนเขียนเอกสารนี้ — spec-derived เท่านั้น**

### Event / Schedule Item

- **`createEvent(input: EventInput) → Event`**
  สร้างกิจกรรม/นัดหมาย/ตารางเรียน — ต้องมี `title`, `type`, `date`, `startTime`, `endTime` เสมอ `location`/`description` optional `lifeAreaId` เชื่อมได้แบบ optional ด้วยกลไกเดียวกับ Task ([[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]] Business Rule ข้อ 1, 7)
- **`updateEvent(eventId, input: EventInput) → Event`**
- **`deleteEvent(eventId) → void`**
- **`listEventsByView(view: "Today"|"Week"|"Month") → Event[]`**
  ดึง Event ตามมุมมอง Calendar ที่ผู้ใช้เลือก
- **`setEventReminderLeadTime(eventId, leadTime: number | null) → Event`**
  ตั้งค่าเวลานำหน้าการเตือนเฉพาะ Event รายการนี้ ด้วยกลไกเดียวกับ Task ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 4) **field `reminderLeadTime` ของ Event ยังไม่มี code รองรับ — spec-derived เท่านั้น**

### Calendar view (รวม Task + Event)

- **`listCalendarItemsForDate(date) → (Task | Event)[]`**
  รวม Task ที่มีกำหนดส่งตรงกับวันนั้นเข้ากับ Event ของวันเดียวกันเป็นมุมมองเดียว **ไม่สร้างข้อมูลซ้ำ** — Task ที่มี `dueDate` ถูกดึงมาแสดงในมุมมอง Calendar โดยตรงจากข้อมูลชุดเดียวกัน ไม่ใช่ record ใหม่คนละชุด ([[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]] Business Rule ข้อ 2-3)

---

## File & Attachment Management

ที่มา: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

- **`addFile(input: FileInput) → File`**
  เพิ่มไฟล์ใหม่ (ชื่อ, หมวดหมู่ optional, Life Area optional, เนื้อหาไฟล์จริง) เนื้อหาไฟล์เก็บอยู่ในเครื่องผู้ใช้เท่านั้น ไม่ถูกส่งออกไปที่อื่นไม่ว่ากรณีใด ([[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]] Business Rule ข้อ 1)
- **`renameFile(fileId, name: string) → File`**
- **`setFileCategory(fileId, category: string | null) → File`**
- **`setFileLifeArea(fileId, lifeAreaId: string | null) → File`**
- **`deleteFile(fileId) → void`**
- **`listFiles(filter?: { lifeAreaId?, query? }) → File[]`**
  รองรับ Search และ Filter ตาม Life Area สำหรับหน้า Files
- **`listRecentFiles() → File[]`**
  ดึงไฟล์ที่เพิ่มล่าสุดสำหรับส่วน Recent Files
- **`previewFile(fileId) → FilePreview | null`**
  คืนค่าตัวอย่างเนื้อหาไฟล์เท่าที่ browser รองรับ ไฟล์ประเภทที่ preview ไม่ได้จะคืนค่าไม่มี preview (ไม่ error)
- **`downloadFile(fileId) → FileContent`**
  คืนเนื้อหาไฟล์กลับให้ผู้ใช้ดาวน์โหลดออกไปได้
- **`linkFileToTask(fileId, taskId) → File`** / **`unlinkFileFromTask(fileId, taskId) → File`**
  เชื่อม/ยกเลิกเชื่อมไฟล์กับ Task — เปิด Task แล้วต้องเห็นไฟล์นี้เป็น Related File ทันที ([[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]] Business Rule ข้อ 3)
- **`listFilesLinkedToTask(taskId) → File[]`**
  ดึงรายการ Related Files ของ Task หนึ่งรายการ
- **`linkFileToEvent(fileId, eventId) → File`** / **`unlinkFileFromEvent(fileId, eventId) → File`**
  ขยายกลไกเชื่อมไฟล์แบบเดียวกับ Task ให้ใช้กับ Event ได้ด้วย ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 4) **การเชื่อม File↔Event ยังไม่มี field/code รองรับ ณ ตอนเขียนเอกสารนี้ (มีแค่ File↔Task ผ่าน `linkedTaskIds`) — spec-derived เท่านั้น**
- **`listFilesLinkedToEvent(eventId) → File[]`**
  **spec-derived เท่านั้น ด้วยเหตุผลเดียวกันข้างบน**

---

## Notification & Deadline Awareness

ที่มา: [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

- **`checkDeadlines() → Notification[]`**
  ตรวจสอบ Task/Event ทั้งหมดโดยอัตโนมัติ เทียบเวลาปัจจุบันกับกำหนดของแต่ละรายการ (ใช้เวลานำหน้าการเตือนที่ผู้ใช้ตั้งเฉพาะรายการถ้ามี ไม่เช่นนั้นใช้ค่าเริ่มต้นกลางของระบบ — [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 2, 4) แบ่งระดับเป็น Overdue / DueToday / DueSoon นี่คือ operation ที่ **derive/คำนวณ** ผลลัพธ์ ไม่ใช่รับข้อมูลจากผู้ใช้ตรงๆ
- **`listNotifications(filter?: { read?: boolean }) → Notification[]`**
  ดึงรายการสำหรับ Notification Center
- **`markNotificationRead(notificationId) → Notification`**
  เป็น field เดียวของ Notification ที่ผู้ใช้เปลี่ยนแปลงโดยตรง (field อื่นคำนวณซ้ำจาก Task/Event ต้นทางทุกครั้ง)
- **`markAllNotificationsRead() → Notification[]`**
- **`resolveNotificationSource(notificationId) → Task | Event`**
  คืนค่า Task/Event ต้นทางเพื่อพาผู้ใช้ย้อนกลับไปดูเมื่อคลิก Notification ([[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]] Business Rule ข้อ 1)
- **`requestBrowserNotificationPermission() → PermissionState`**
  ขอสิทธิ์แจ้งเตือนระดับอุปกรณ์ (ถ้ามี) เป็นเพียงส่วนเสริม (progressive enhancement) — ไม่เรียก operation นี้ หรือผู้ใช้ปฏิเสธสิทธิ์ ต้องไม่กระทบการทำงานของ operation อื่นใดในระบบเลย ([[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]] Business Rule ข้อ 2)

---

## Timeline, Smart Priority & Life Progress

ที่มา: [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]

- **`getTimeline(now?: DateTime) → { now: (Task | Event)[], next: (Task | Event)[], later: (Task | Event)[] }`**
  รวม Task ที่มีกำหนดส่งของวันนี้ + Event ของวันนี้จากทุก Life Area เข้าด้วยกัน แล้วแบ่ง 3 กลุ่ม: **Now** (ถึงเวลาแล้วหรือเริ่มภายใน 1 ชั่วโมงข้างหน้า), **Next** (ที่เหลือของวันนี้ถัดจาก Now), **Later** (ไกลออกไปอีกของวันนี้/ยังไม่ระบุเวลาแน่นอน) ครอบคลุมเฉพาะ "วันนี้" เท่านั้น — รายการอนาคตไกลกว่านั้นยังคงอยู่ใน `getUpcoming()` และ `listCalendarItemsForDate()` ตามเดิม (Sprint 9 Business Rule ข้อ 1)
- **`sortBySmartPriority(items: (Task | Event)[]) → (Task | Event)[]`**
  จัดเรียงตามกฎตายตัว: Overdue → Due Today → Upcoming → High Priority → Normal ใช้ร่วมกันทั้งกับ Today's Tasks ของ Dashboard และ Timeline **ไม่มีการประมวลผลแบบปรับตัวเองหรือ machine learning ใดๆ** (Sprint 9 Business Rule ข้อ 2)
- **`getLifeProgress(date?) → { total: number, done: number, byLifeArea: { lifeAreaId: string | null, total: number, done: number }[] }`**
  คำนวณจาก Task ที่ `status = Done` เทียบกับ Task ทั้งหมดที่ครบกำหนดในวันนั้น แยกย่อยตาม Life Area ได้ ผลลัพธ์เป็นตัวเลขสถานะเฉยๆ — **ห้ามนำไปแสดงเป็นคะแนน/การตัดสินผู้ใช้ในชั้น UI ใดๆ** (เช่น ห้ามใช้คำว่า "Score", Sprint 9 Business Rule ข้อ 3)

---

## Cross-Entity Linking (What / When / Information)

ที่มา: [[../../01-requirements/01-spec/20260806-004-my-today-sprint4-file-organizer|Sprint 4]], [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]], [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]]

- **`getTaskDetail(taskId) → { what: { title, description, lifeAreaId }, when: { dueDate, dueTime, reminderLeadTime }, information: { files: File[], notes: Note[], links: Link[] } }`**
  ประกอบข้อมูลทั้ง 3 มิติของ Task รายการเดียวไว้ในผลลัพธ์เดียว เพื่อให้หน้า Task Detail ไม่ต้องสลับไปมาหลายหน้าเพื่อประกอบข้อมูลเอง (`information.files` มาจาก `linkFileToTask`/`listFilesLinkedToTask` ที่นิยามไว้ในหัวข้อ File & Attachment Management ด้านบน) ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 3)
- **`getEventDetail(eventId) → { what, when, information }`**
  รูปร่างผลลัพธ์และกลไกเดียวกับ `getTaskDetail` แต่สำหรับ Event ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 4)
- **`linkNoteToTask(taskId, noteId) → Task`** / **`unlinkNoteFromTask(taskId, noteId) → Task`**
  เชื่อม/ยกเลิกเชื่อม Note เข้ากับ Task ผ่าน `linkedNoteIds` **field นี้ยังไม่มี code รองรับ — spec-derived เท่านั้น (Note เองก็ยังไม่มี code รองรับ)**
- **`linkLinkToTask(taskId, linkId) → Task`** / **`unlinkLinkFromTask(taskId, linkId) → Task`**
  เชื่อม/ยกเลิกเชื่อม Link เข้ากับ Task ผ่าน `linkedLinkIds` **field นี้ยังไม่มี code รองรับ — spec-derived เท่านั้น (Link เองก็ยังไม่มี code รองรับ)**
- **`linkNoteToEvent(eventId, noteId) → Event`** / **`unlinkNoteFromEvent(eventId, noteId) → Event`**
- **`linkLinkToEvent(eventId, linkId) → Event`** / **`unlinkLinkFromEvent(eventId, linkId) → Event`**
  เชื่อมโยง Note/Link เข้ากับ Event ด้วยกลไกเดียวกับ Task ทุกประการ ([[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10]] Business Rule ข้อ 4) **spec-derived เท่านั้น ด้วยเหตุผลเดียวกันข้างบน**

**หมายเหตุ:** การเชื่อม File↔Task และ File↔Event (`linkFileToTask`, `linkFileToEvent` และคู่ unlink/list ของทั้งสอง) นิยามไว้ในหัวข้อ **File & Attachment Management** ด้านบนแล้ว ไม่ซ้ำสร้าง signature คู่ขนานที่นี่ — หัวข้อนี้ต่อยอดความสัมพันธ์เดิมให้ครอบคลุม Note/Link เพิ่ม และเป็นจุดที่ประกอบทั้ง 3 มิติเข้าด้วยกันผ่าน `getTaskDetail`/`getEventDetail`

---

## Today Dashboard / Workspace Overview

ที่มา: [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1]], [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]], [[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]], [[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]], [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]], [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]]

Dashboard ไม่เก็บข้อมูลของตัวเอง — ทุก operation ด้านล่างเป็น **มุมมองที่คำนวณสด (derived read)** จากข้อมูล Task/Event/Notification/Life Progress ที่นิยามไว้ในหัวข้ออื่นด้านบนเท่านั้น

- **`getDashboardSummary(date?) → { totalToday: number, doneToday: number, pendingToday: number, dueSoonCount: number }`**
  สรุปตัวเลขของ Summary Cards — คำนวณจากข้อมูล Task/Event จริงตั้งแต่ [[../../01-requirements/01-spec/20260806-002-my-today-sprint2-task-management|Sprint 2]] เป็นต้นไป (Sprint 1 ใช้ข้อมูลตัวอย่างสำหรับทดสอบ UI เท่านั้น ยังไม่เชื่อมกับข้อมูลจริง)
- **`getTodayTasks() → Task[]`**
  ดึง Task ที่กำหนดส่งวันนี้ พร้อมจัดลำดับผ่าน `sortBySmartPriority` ([[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] Business Rule ข้อ 2)
- **`getTodaySchedule() → Event[]`**
  ดึง Event ของวันนี้สำหรับส่วน Today's Schedule ([[../../01-requirements/01-spec/20260806-003-my-today-sprint3-calendar-schedule|Sprint 3]] Business Rule ข้อ 4)
- **`getUpcoming() → (Task | Event)[]`**
  ดึงรายการที่ใกล้ครบกำหนดถัดจากวันนี้ (นอกช่วง Timeline ของ [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9]] ที่ครอบคลุมแค่วันนี้)
- **`getDashboardNotifications() → Notification[]`**
  ดึง Notification สำคัญ/ยังไม่อ่านมาแสดงบน Dashboard ([[../../01-requirements/01-spec/20260806-005-my-today-sprint5-notification-deadline-awareness|Sprint 5]] Feature Requirements)
- **`getPrivacyNotice() → { privacyNotice: string, termsOfUse: string }`**
  ดึงเนื้อหา Privacy Notice / ข้อกำหนดการใช้งานแบบ static ที่ต้องเข้าถึงได้จากทุกหน้า — ยืนยันว่าข้อมูลทั้งหมดที่ operation อื่นในเอกสารนี้จัดการอยู่ในเครื่องผู้ใช้เท่านั้น ไม่มีการส่งออกไปที่อื่น ([[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]] เพิ่มเติมเรื่อง PDPA)

**หมายเหตุ:** ปุ่ม Quick Action "+ เพิ่มงาน" ของ [[../../01-requirements/01-spec/20260806-001-my-today-sprint1-today-dashboard|Sprint 1]] เป็นเพียง placeholder UI ใน Sprint 1 (ยังไม่เชื่อม operation จริง) และถูกแทนที่ด้วย `quickCapture(...)` ที่นิยามไว้ในหัวข้อ **Universal Capture & Inbox** ด้านบนตั้งแต่ [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]] เป็นต้นไป — ไม่มี operation คู่ขนานแยกต่างหากสำหรับปุ่มนี้

**หมายเหตุ (Sprint 6/11):** ทั้งสอง Sprint นี้ไม่ได้เพิ่ม operation ใหม่ — เป็น Sprint ปิดจบที่ตรวจสอบ integration ระหว่าง operation ที่มีอยู่แล้วทั้งหมด, ปรับ UX (Empty/Loading State, Validation, Confirmation ก่อนลบ, Error Message), และพิสูจน์ว่าทั้งสอง persona (นักศึกษา/บุคคลทั่วไป) ใช้ operation ชุดเดียวกันได้โดยไม่มี logic แยกกัน (สอดคล้องกับหมายเหตุเดียวกันใน [[architecture#1. Conceptual Components|architecture.md]])
