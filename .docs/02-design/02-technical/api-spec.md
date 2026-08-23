# My Today — API Spec (Domain Logic Layer Operation Contract)

เชื่อมโยงกลับ: [[index|02-technical]], [[architecture|architecture]], [[database-schema|database-schema]], [[tech-stack|tech-stack]] (เอกสาร stack-specific ที่ใช้เป็นแหล่งอ้างอิงของหมายเหตุ "การ implement ปัจจุบัน" ท้ายเอกสารนี้เท่านั้น), [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR master list]]

## ขอบเขตของเอกสารนี้

เอกสารนี้เป็น **operation contract เชิงแนวคิดของ Application/Domain Logic Layer** ตาม Container View ของ [[architecture|architecture.md]] (หัวข้อ 2) — **ไม่ใช่ REST/GraphQL API spec** เพราะแอปนี้ไม่มี backend server ใดๆ (client-side only by design) เอกสารนี้บันทึกว่า Domain Logic Layer เปิด operation อะไรให้ Presentation Layer เรียกใช้บ้าง โดยอธิบายแบบไม่ผูกกับเทคโนโลยี (technology-agnostic) — operation แต่ละอย่างใช้ได้เหมือนกันไม่ว่าจะ implement เป็น local function call ธรรมดา (ตามปัจจุบัน) หรือในอนาคตจะเปลี่ยนเป็น network call ก็ตาม เนื้อหาหลักจึงจะไม่เอ่ยชื่อ HTTP method, route, หรือ status code ใดๆ รายละเอียดการ implement จริงปัจจุบันอยู่ในหมายเหตุท้ายเอกสารเท่านั้น

Operation และกฎที่ระบุในเอกสารนี้อ้างอิงจาก entity/field ที่นิยามใน [[database-schema|database-schema.md]] และ Business Rules ของแต่ละ Sprint spec โดยตรง ไม่ใช่การคิดเพิ่มเอง

## 1. Operation Contract ต่อ Entity

### 1.1 Life Area

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| Create Life Area | `name` | Life Area record ที่สร้างใหม่ (พร้อม `id`/`createdAt`) | ต้องการแค่ `name` เท่านั้น (field ขั้นต่ำตาม Business Rule Sprint 7 ข้อ 1) |
| Update Life Area | `id`, `name` ใหม่ | Life Area record ที่อัปเดตแล้ว | — |
| Delete Life Area | `id` | ไม่มี (การอ้างอิงที่เคยชี้มาที่ Life Area นี้ถูกเคลียร์แล้วก่อนลบจริง — ดูหัวข้อ 2) | ไม่ cascade ลบ Task/Event/File/Note/Link ที่อ้างอิงถึง (Sprint 7 Acceptance Criteria) — operation นี้ต้อง**เรียกผ่าน cross-cutting operation "Delete Life Area" ในหัวข้อ 2 เท่านั้น** ไม่ใช่เรียก delete ตรงๆ |
| List Life Areas | — | รายการ Life Area ทั้งหมด | ใช้เติม dropdown เลือก Life Area ในทุกฟอร์มของ Task/Event/File/Note/Link |

### 1.2 Task

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| Create Task | `title`, `description?`, `lifeAreaId?`, `dueDate?`, `dueTime?`, `priority?`, `status?` | Task record ใหม่ (`inInbox` ตั้งตาม context ที่เรียก — ดูหมายเหตุ) | ฟอร์มเต็ม (Sprint 2): ต้องมี `title`; `priority`/`status` มีค่า default ถ้าไม่ระบุ, สร้างด้วย `inInbox = false` — ถ้าสร้างผ่าน Quick Capture (Sprint 8) ต้องการแค่ `title` เท่านั้น ฟิลด์อื่นปล่อยว่างได้ และสร้างด้วย `inInbox = true` เสมอ |
| Update Task | `id`, ฟิลด์ที่จะเปลี่ยน | Task record ที่อัปเดตแล้ว | ใช้ทั้งแก้ไขทั่วไปและเปลี่ยน Priority/Deadline (FR-04) |
| Set Task Status | `id`, `status` ใหม่ | Task record ที่อัปเดตแล้ว | รองรับ To Do/Doing/Done รวมถึงกดทำเครื่องหมายว่าเสร็จ (FR-03) |
| Delete Task | `id` | ไม่มี | ลบ Task record ตรงๆ — ไม่กระทบ Life Area (ทิศทางตรงข้ามกับ "Delete Life Area") |
| List Tasks (filter/search/sort) | `status?`, `priority?`, `searchText?`, `sortBy?` | รายการ Task ที่กรอง/เรียงแล้ว | ใช้กับหน้า Tasks (FR-03, Sprint 2 Business Rule ข้อ 8) |

### 1.3 Event

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| Create Event | `title`, `type?`, `date?`, `startTime?`, `endTime?`, `location?`, `description?`, `lifeAreaId?` | Event record ใหม่ | ฟอร์มเต็ม (Sprint 3): ต้องมี `title`; ผ่าน Quick Capture (Sprint 8) ต้องการแค่ `title` เท่านั้น สร้างด้วย `inInbox = true` |
| Update Event | `id`, ฟิลด์ที่จะเปลี่ยน | Event record ที่อัปเดตแล้ว | — |
| Delete Event | `id` | ไม่มี | ไม่กระทบ Task ที่ Deadline ถูกรวมแสดงในมุมมองเดียวกัน (เพราะไม่ใช่ entity เดียวกัน) |
| List Events by Date Range | `startDate`, `endDate` | รายการ Event ในช่วงวันที่ | ใช้กับมุมมอง Today/Week/Month ของ Calendar (FR-07) |

### 1.4 File

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| Create File (Upload) | `name`, `category?`, `lifeAreaId?`, `linkedTaskIds?`, `content` (binary), `mimeType`, `size` | File record ใหม่ | ฟอร์มเต็ม (Sprint 4): ต้องมี `name` + เนื้อหาไฟล์จริง; ผ่าน Quick Capture (Sprint 8) ต้องการแค่ชื่อ/เนื้อหาขั้นต่ำ สร้างด้วย `inInbox = true` |
| Update File Metadata | `id`, `name?`, `category?`, `lifeAreaId?` | File record ที่อัปเดตแล้ว | ไม่แก้เนื้อหาไฟล์จริง มีแต่ metadata |
| Link File to Task | `fileId`, `taskId` | File record ที่อัปเดตแล้ว (`linkedTaskIds` เพิ่ม `taskId`) | เก็บ FK ทิศทางเดียวที่ File (ดู database-schema 2.4) |
| Unlink File from Task | `fileId`, `taskId` | File record ที่อัปเดตแล้ว (`linkedTaskIds` เอา `taskId` ออก) | — |
| Delete File | `id` | ไม่มี | ลบทั้ง metadata และเนื้อหาไฟล์จริง |
| Search/Filter Files | `searchText?`, `lifeAreaId?` | รายการ File ที่กรองแล้ว | ใช้กับหน้า Files (FR-08) |
| Get Related Files for Task | `taskId` | รายการ File ที่ `linkedTaskIds` มี `taskId` นี้อยู่ | นี่คือ query ไม่ใช่ field ที่เก็บบน Task (ดูหัวข้อ 3) |

### 1.5 Note

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| Create Note | `title`, `content?`, `lifeAreaId?` | Note record ใหม่ | ผ่านฟอร์มเต็มหรือ Quick Capture ก็ต้องการแค่ `title` เป็นอย่างน้อย (Sprint 8 Business Rule ข้อ 3) |
| Update Note | `id`, ฟิลด์ที่จะเปลี่ยน | Note record ที่อัปเดตแล้ว | — |
| Delete Note | `id` | ไม่มี | — |
| List Notes | `lifeAreaId?` | รายการ Note | Note ไม่มี status/priority ให้ filter เหมือน Task โดยเจตนา |

### 1.6 Link

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| Create Link | `title`, `url`, `lifeAreaId?` | Link record ใหม่ | ต้องการแค่ `title`+`url` เป็นอย่างน้อย (Sprint 8 Business Rule ข้อ 4) |
| Update Link | `id`, ฟิลด์ที่จะเปลี่ยน | Link record ที่อัปเดตแล้ว | — |
| Delete Link | `id` | ไม่มี | — |
| List Links | `lifeAreaId?` | รายการ Link | — |

### 1.7 Personal Profile

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| Get Profile | — | Profile record ปัจจุบัน (record เดียวเสมอ) | ไม่มี `id` ให้ระบุ เพราะเป็น singleton |
| Update Profile | ฟิลด์ที่จะเปลี่ยน (`name`, `profileImage?`, `email?`, `preferredName?`, `studentId?`, `faculty?`, `major?`, `organization?`, `position?`) | Profile record ที่อัปเดตแล้ว | ห้ามบังคับ `studentId`/`faculty`/`major`/`organization`/`position` เป็นเงื่อนไขบันทึกสำเร็จ (Sprint 7 Business Rule ข้อ 4) — มีแค่ `name` ที่ควรบังคับ |

## 2. Cross-cutting Operations

| Operation | Input | Output | Notes / กฎทางธุรกิจที่บังคับใช้ |
|---|---|---|---|
| **Delete Life Area** (cascade-safe) | `lifeAreaId` | ไม่มี | ต้องทำสองขั้นตอนตามลำดับเสมอ: (1) หา Task/Event/File/Note/Link ทุกรายการที่ `lifeAreaId` เท่ากับค่านี้ แล้วเคลียร์ฟิลด์นั้นให้ว่างทีละ entity, (2) จึงลบ Life Area record ทิ้ง — ห้ามลบ Life Area ก่อนแล้วปล่อยให้มี record อื่นค้าง `lifeAreaId` ที่ชี้ไปยังอะไรไม่ได้ (orphaned reference) เด็ดขาด (Sprint 7 Acceptance Criteria: "Task ที่เคยผูกกับ Life Area ที่ถูกลบยังคงอยู่ ไม่หาย แค่ไม่มี Life Area แล้ว") |
| **Quick Capture** | `kind` (Task/Event/File/Note/Link), `title` (หรือข้อความอิสระที่ผู้ใช้พิมพ์) | record ใหม่ของประเภทที่เลือก ด้วย `inInbox = true` | เข้าถึงได้จากทุกหน้าผ่านปุ่มกลาง "+ Add to My Today" ต้องการแค่ประเภท + title เท่านั้น ห้ามใช้ AI แยกวิเคราะห์ข้อความอิสระใดๆ (Sprint 8 Business Rule ข้อ 5) — ฟิลด์อื่นที่ entity นั้นควรมีตามปกติเป็น optional จนกว่าจะจัดระเบียบทีหลัง |
| **Organize from Inbox** | `id`, `kind`, `lifeAreaId`, ฟิลด์ที่ขาดอื่นๆ ที่ผู้ใช้เติม (เช่น `dueDate`/`priority` ของ Task) | record เดิมที่อัปเดตแล้วด้วย `inInbox = false` | เปลี่ยนสถานะจาก "รอการจัดระเบียบ" เป็นรายการปกติ ไม่สร้าง entity ใหม่ซ้อนสองชุด (Sprint 8 Business Rule ข้อ 2) — record ที่ผ่าน operation นี้ใช้ operation ปกติของ entity นั้นต่อได้ทันที (Update/Delete/List ตามหัวข้อ 1) |
| **List Inbox Items** | — | รายการรวมของ Task/Event/File/Note/Link ทุกตัวที่ `inInbox = true` ข้ามทุก entity | ใช้กับหน้า "My Inbox" (FR-14) — เป็น query ข้าม entity ไม่ใช่ operation เฉพาะของ entity ใดเดียว |

## 3. Derived / Read-only Operations

Operation กลุ่มนี้**ไม่ได้อ่าน record ที่เก็บถาวรตรงๆ** แต่คำนวณผลลัพธ์จากข้อมูลสดของ entity อื่นทุกครั้งที่ถูกเรียก — ไม่ใช่ CRUD ต่อ entity ที่ถูกเก็บไว้:

| Operation | Input | Output | หมายเหตุ |
|---|---|---|---|
| **Build Notifications** | Task ทั้งหมด, Event ทั้งหมด, ชุด id ที่อ่านแล้ว | รายการ notification ที่จำแนกเป็น Overdue/DueToday/DueSoon พร้อมสถานะอ่าน/ยังไม่อ่าน | คำนวณใหม่จาก Task/Event สดทุกครั้ง ไม่ได้อ่านจาก record ที่เก็บถาวร (FR-10) — ผลลัพธ์แต่ละรายการมี id แบบ `{kind}-{sourceId}-{level}` ที่เปลี่ยนเมื่อ level เปลี่ยน จึงกลายเป็น "รายการใหม่ที่ยังไม่อ่าน" โดยอัตโนมัติเมื่อข้าม threshold |
| **Mark Notification Read** | `notificationId` | Notification Read State record ที่อัปเดต/สร้างใหม่ | เป็น operation เดียวใต้กลุ่มนี้ที่เขียนลงที่เก็บถาวรจริง (เขียนแค่สถานะอ่าน ไม่ใช่ตัว notification) |
| **Mark All Notifications Read** | รายการ `notificationId` ปัจจุบันทั้งหมด | Notification Read State ที่อัปเดตครบ | ใช้กับปุ่ม "mark all read" |
| **Get Day Items (Calendar merge view)** | `date`, Task ทั้งหมด, Event ทั้งหมด, Life Area ทั้งหมด | รายการรวม Event + Task ที่มี Deadline ตรงวันนั้น เรียงตามเวลา พร้อมชื่อ Life Area | ทำให้ "Task Deadline ปรากฏใน Calendar อัตโนมัติ" โดยไม่สร้าง Event record ซ้ำ (Sprint 3 Business Rule ข้อ 3) |
| **Get Today Dashboard Summary** | Task ทั้งหมด, Event ทั้งหมด | จำนวนงานทั้งหมด/เสร็จแล้ว/ยังไม่เสร็จ/ใกล้ครบกำหนด + รายการวันนี้ | ใช้กับ Today Dashboard (FR-05, FR-11, FR-12) |
| **Get Life Area Display Name** | `lifeAreaId`, Life Area ทั้งหมด | ชื่อ Life Area หรือค่าว่างถ้าไม่พบ/ถูกลบไปแล้ว | ใช้ทุกที่ที่ต้องแสดงชื่อ Life Area จาก id ที่เก็บไว้ |

## 4. Known Gaps / ส่วนขยายที่ยังไม่ถูกสร้าง

Operation กลุ่มนี้ narrative ของ Sprint ที่ยังไม่เริ่ม (ตาม backlog.md ณ วันที่ 20260823 — Sprint 9-10 ยังไม่มี commit ใดๆ) บอกเป็นนัยว่าจะต้องมี แต่ **ยังไม่ถูกสร้างจริงใน Domain Logic Layer ปัจจุบัน**:

- **Get Timeline (Now/Next/Later)** (Sprint 9, FR-16) — query ที่รวม Task deadline + Event จากทุก Life Area ของ "วันนี้" เท่านั้น แล้วแบ่งเป็น 3 กลุ่มตามเวลาปัจจุบัน (Now = ถึงเวลาแล้ว/เริ่มภายใน 1 ชม., Next = ที่เหลือของวันนี้, Later = ไกลออกไป/ไม่ระบุเวลาแน่นอน)
- **Smart Priority Sort** (Sprint 9, FR-16) — operation จัดลำดับรายการตามกฎตายตัว: Overdue → Due Today → Upcoming → High Priority → Normal ใช้ร่วมกับทั้ง Today's Tasks และ Timeline ไม่ใช้ AI/machine learning
- **Get Life Progress** (Sprint 9, FR-17) — aggregation นับ Task ที่ Status = Done เทียบกับ Task ทั้งหมดที่ครบกำหนดวันนี้ ทั้งแบบรวมและแยกตาม Life Area ต้องแสดงเป็นตัวเลขสถานะเฉยๆ ห้ามใช้คำว่า "Score"
- **Link Note to Task/Event** และ **Link Link to Task/Event** (Sprint 10, FR-18) — operation เพิ่ม/ลบ `linkedNoteIds`/`linkedLinkIds` บน Task และ Event (คู่ขนานกับ "Link File to Task"/"Unlink File from Task" ที่มีอยู่แล้วในหัวข้อ 1.4 แต่ปัจจุบันมีเฉพาะฝั่ง File→Task)
- **Set Custom Reminder Lead Time** (Sprint 10, FR-19) — operation ตั้งค่า `reminderLeadTime` เฉพาะ Task/Event รายการหนึ่ง ให้ "Build Notifications" ใช้ค่านี้แทนค่า default กลางของระบบเฉพาะรายการนั้น
- **Get Task/Event Detail (What/When/Information unified view)** (Sprint 10) — query รวมข้อมูล Task/Event เดียวกับไฟล์/Note/Link/reminder ที่เชื่อมไว้ทั้งหมด ให้แสดงในหน้าเดียวโดยไม่ต้องสลับหน้า
- **Get Storage Usage Estimate / Warn Near Quota** (NFR-08, [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR master list]]) — operation แบบ derived/read-only ที่ query ความจุที่ใช้ไป/เหลืออยู่ของ Binary/Blob Local Persistence container เอง (ไม่ใช่การอ่าน record ของ entity ใด) ใช้ผลลัพธ์เพื่อ trigger คำเตือนบน UI ก่อนที่ผู้ใช้จะเจอ error แบบไม่มีการเตือนล่วงหน้าเมื่อพื้นที่จัดเก็บไฟล์แนบใกล้เต็ม ยังไม่กำหนดค่า threshold % ที่แน่นอน (รอ Sprint ที่นำไปพัฒนาจริงกำหนด) — ยังไม่ถูกสร้างจริงใน Domain Logic Layer ปัจจุบัน

**ข้อควรระวังเรื่องความสอดคล้องของ spec (แก้ไขแล้ว):** ดูหมายเหตุใน [[database-schema|database-schema.md]] หัวข้อ 4 — เดิม spec ของ Sprint 10 อ้างถึง `linkedFileIds` บน Task ราวกับมีอยู่แล้ว ซึ่งไม่ตรงกับ operation "Link File to Task"/"Unlink File from Task" ที่มีอยู่จริงในหัวข้อ 1.4 ข้างบน (เขียนที่ฝั่ง File ไม่ใช่ Task) ประเด็นนี้ได้รับการแก้ไขแล้วผ่าน commit `83a38ee` ("Correct Sprint 10 spec's incorrect Task.linkedFileIds claim") ซึ่งเพิ่มหัวข้อ `## เพิ่มเติม (20260823): แก้ไขข้อความคลาดเคลื่อนเรื่อง Task↔File relationship (linkedFileIds)` ต่อท้าย spec Sprint 10 ยืนยันว่าความสัมพันธ์จริงคือ File→Task ผ่าน `linkedTaskIds` และ `linkedNoteIds`/`linkedLinkIds` ของ Sprint 10 เป็นการตัดสินใจออกแบบใหม่บน Task ไม่ใช่การขยายฟิลด์เดิม การแก้ไขนี้ยืนยันว่า operation contract ที่บันทึกไว้ในเอกสารนี้ถูกต้องมาตั้งแต่แรก **ไม่ต้องแก้ไข operation ใดๆ เพิ่มเติม** — ที่ผิดคือถ้อยคำของ spec Sprint 10 เท่านั้น คงหมายเหตุนี้ไว้เป็นบันทึกประวัติความไม่สอดคล้องและการแก้ไข แทนการลบทิ้ง

## 5. Change Log

- 20260823 — สร้างเอกสารนี้ครั้งแรก: operation contract ต่อ entity ครบ 7 กลุ่ม (Life Area, Task, Event, File, Note, Link, Personal Profile), cross-cutting operations (Delete Life Area, Quick Capture, Organize from Inbox, List Inbox Items), derived/read-only operations (Build Notifications, Get Day Items, Get Today Dashboard Summary, ฯลฯ), known gaps จาก Sprint 9-10, และหมายเหตุความไม่สอดคล้องของ spec Sprint 10 เรื่อง `linkedFileIds`
- 20260823 (อัปเดตภายหลัง) — อัปเดตหมายเหตุความไม่สอดคล้องของ spec Sprint 10 ในหัวข้อ 4 จากคำแนะนำเชิง forward-looking ให้เป็นบันทึกแบบ resolved: spec Sprint 10 ถูกแก้ไขแล้ว (commit `83a38ee`) ยืนยันว่า operation contract เดิมถูกต้อง ไม่ต้องแก้ operation เพิ่ม
- 20260823 (อัปเดตภายหลังอีกครั้ง) — เพิ่มความละเอียดของหมายเหตุ "การ implement ปัจจุบัน" ท้ายเอกสาร โดยอ้างอิง [[tech-stack|tech-stack.md]] ที่เพิ่งถูกสร้างขึ้น (ระบุเวอร์ชัน hook/library จริง และผูกเหตุผล "local function call ไม่ใช่ network call" กับ Fixed Constraint/state-ownership ที่ระบุใน tech-stack.md โดยตรง) ไม่มีการแก้ไข operation contract ตาราง/cross-cutting operations/derived operations/known gaps ใดๆ
- 20260823 (อัปเดตอีกครั้ง — NFR master list) — เพิ่ม cross-link ไปยัง [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR master list]] ในหัวข้อเชื่อมโยงกลับ และเพิ่ม known gap ใหม่ในหัวข้อ 4: "Get Storage Usage Estimate / Warn Near Quota" (NFR-08) — derived/read-only operation query ความจุที่เหลือของ Binary/Blob Local Persistence container ไม่มีการแก้ไข operation contract ตาราง/cross-cutting/derived operations เดิมใดๆ

---

> **หมายเหตุการ implement ปัจจุบัน:** operation กลุ่ม Task/Event/File/Note/Link/Life Area/Profile ข้างต้น implement จริงเป็น hook ใน `src/hooks/` (`useTasks`, `useEvents`, `useFiles`, `useNotes`, `useLinks`, `useLifeAreas`, `useProfile`) เขียนด้วย **React `^18.3.1` hooks** (ดู [[tech-stack|tech-stack.md]] หัวข้อ 3 แถว "UI Framework") ที่ `src/App.tsx` เป็นเจ้าของ instance เดียวแล้วส่ง callback ลงไปเป็น props — Presentation Layer (`src/pages/`, `src/components/`) ไม่เรียก hook เหล่านี้ตรงๆ เพิ่มเอง รูปแบบ "state เดียวที่ `App.tsx` เป็นเจ้าของ ส่งลง props" นี้ตรงกับแถว "State/Data (ในแอป)" ของ [[tech-stack|tech-stack.md]] หัวข้อ 3 ที่ระบุไว้ตรงๆ ว่า "React hooks + props (ไม่มี context/store แยก) — `App.tsx` เป็นเจ้าของ state เดียว ส่งลง props ให้ทุก route"
>
> **เหตุผลที่ operation เหล่านี้เป็น local function call ธรรมดา ไม่ใช่ network call:** อ้างอิงตรงจาก [[tech-stack|tech-stack.md]] หัวข้อ 1 "Fixed Constraints" — "client-only, ไม่มี backend" ยังคงบังคับใช้ตลอดทั้ง Version 1/Core และ Version 2/Competition Track (Sprint 1-11) และหัวข้อ 3 "การตัดสินใจ" ที่ยืนยันว่า Hosting เป็น "Vercel (free tier) — static SPA" เท่านั้น ไม่มี backend server ให้เรียกผ่านเครือข่ายเลย operation contract ในเอกสารนี้จึง implement เป็น TypeScript function call ธรรมดาที่ resolve แบบ synchronous (กรณี LocalStorage-backed entity ทั้งหมด) หรือ asynchronous ผ่าน Promise (กรณี File ที่ backed ด้วย IndexedDB ผ่าน `src/lib/fileDb.ts` — นี่คือเหตุผลที่ `useFiles` ต้อง expose flag `loaded` ให้หน้าที่เรียกใช้ตรวจสอบก่อน render ต่างจาก hook อื่นที่อ่าน LocalStorage แบบ synchronous ล้วนๆ) ไม่มีขั้นตอนใดของทั้งสองแบบที่ข้าม process/เครื่องของผู้ใช้ออกไปเลย ตรงตามเจตนาของเอกสารนี้ที่ operation ต้องใช้ได้เหมือนกันไม่ว่าจะเป็น local call วันนี้หรือ network call ในอนาคต (ถ้ามี — ซึ่ง [[tech-stack|tech-stack.md]] หัวข้อ 5 "Risks / Open Questions" ระบุว่าจะต้องกลับมาทบทวน stack ทั้งหมดใหม่หากเกิดขึ้นจริง)
>
> cross-cutting operation "Delete Life Area" implement อยู่ที่ `App.tsx`'s `handleDeleteLifeArea` (เรียก `updateTask`/`updateEvent`/`useFiles().updateFileLifeArea` ให้ครบก่อน แล้วจึงเรียก `deleteLifeArea`) "Quick Capture"/"Organize from Inbox"/"List Inbox Items" implement อยู่ใน `src/components/QuickCaptureModal.tsx` และ `src/pages/InboxPage.tsx` "Build Notifications" คือฟังก์ชัน `buildNotifications` ใน `src/lib/notificationUtils.ts` เรียกจาก `src/hooks/useNotifications.ts` ทุก render "Get Day Items" คือ `getDayItems` ใน `src/lib/calendarUtils.ts` "Get Life Area Display Name" คือ `getLifeAreaName` ใน `src/lib/lifeAreaUtils.ts` การนำทางระหว่างหน้า (เช่น `TasksPage`'s `?taskId=` query param, `CalendarPage`'s `?date=`) ใช้ **React Router `^7.18.2`** (`BrowserRouter`, ดู `src/main.tsx`) ทั้งหมดนี้ build ด้วย Vite `^5.3.1` และ deploy เป็น static SPA เดียวบน Vercel free tier — ไม่มี route/endpoint แบบ server-rendered ใดๆ ให้ operation contract นี้ต้องอ้างอิงถึง
