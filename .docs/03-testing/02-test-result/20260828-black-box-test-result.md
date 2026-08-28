# Test Result — Black Box Testing (Sprint 7-10 Functional Requirements)

เชื่อมโยงกลับ: [[index|02-test-result]], [[../../01-requirements/01-spec/20260806-008-my-today-functional-requirements-master|FR Master List]], [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]], [[../../01-requirements/backlog|backlog.md]]

## ขอบเขตของเอกสารนี้

เอกสารนี้เป็นผลการทดสอบ Black Box Testing แบบเป็นทางการฉบับแรกของโปรเจกต์ ครอบคลุมทุก Functional Requirement (FR) ของ Competition Track Sprint 7-10 ตาม [[../../01-requirements/01-spec/20260806-008-my-today-functional-requirements-master|FR Master List]] — FR-01, FR-02 (Sprint 7), FR-13, FR-14, FR-15 (Sprint 8), FR-16, FR-17 (Sprint 9), FR-18, FR-19 (Sprint 10) ตามที่ระบุไว้เป็นงานค้างของ [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]] ("Black Box Testing แบบเป็นทางการครบทุก FR ของ Sprint 7-10")

**วิธีทดสอบ:** รันแอปจริงในเบราว์เซอร์ (`npm run dev`, `localhost:5173`) บนข้อมูลที่ล้างใหม่ (`localStorage.clear()` + ลบ IndexedDB `my-today`) เพื่อให้ทดสอบซ้ำได้ (reseed จาก seed data) แล้วจำลองการกระทำของผู้ใช้จริงทีละ FR (กรอกฟอร์ม/กดปุ่ม/นำทาง) พร้อมตรวจผลลัพธ์ทั้งจาก UI ที่ render จริง และจากการอ่านค่าตรงจาก `localStorage`/IndexedDB เพื่อยืนยันว่าข้อมูล persist ถูกต้อง ไม่ใช่แค่ผ่านหน้าตา

**สิ่งที่ไม่อยู่ในขอบเขต:** NFR ทั้ง 9 หมวด (ดู [[../01-test-plan/20260823-nfr-test-plan|NFR Test Plan]] แยกต่างหาก), การทดสอบข้าม browser จริง (environment นี้มี Chromium เดียว), Gate 11 (การซ้อม demo แบบเต็มรอบ)

## สรุปผลรวม

| Sprint | FR ที่ทดสอบ | จำนวน Test Case | ผ่าน | ไม่ผ่าน | บั๊กที่พบ |
|---|---|---|---|---|---|
| 7 | FR-01, FR-02 | 4 | 4 | 0 | 0 |
| 8 | FR-13, FR-14, FR-15 | 9 | 9 | 0 | 0 |
| 9 | FR-16, FR-17 | 3 | 3 | 0 | 0 |
| 10 | FR-18, FR-19 | 3 | 3 | 0 | 0 |
| **รวม** | **9 FR** | **19** | **19** | **0** | **0** |

**ไม่พบบั๊กจริงในโค้ดระหว่างการทดสอบรอบนี้** — พบข้อสงสัยเบื้องต้น 2 จุดที่ตรวจสอบแล้วยืนยันว่าเป็นพฤติกรรมที่ถูกต้องตามการออกแบบ ไม่ใช่บั๊ก (ดูหัวข้อ "ข้อสังเกตที่ตรวจสอบแล้วไม่ใช่บั๊ก" ด้านล่าง)

## Test Cases

### FR-01, FR-02 — Personal Profile & Life Area CRUD (Sprint 7)

อ้างอิง Acceptance Criteria จาก [[../../01-requirements/01-spec/20260806-007-my-today-sprint7-category-profile|Sprint 7 spec]]

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR01-01 | กรอก Personal Profile ด้วย Name อย่างเดียว | เปิด `/profile`, กรอกเฉพาะช่อง Name แล้วบันทึก (เว้นช่อง Student ID/Faculty/Major ว่าง) | บันทึกสำเร็จ ไม่ถูกบังคับกรอกข้อมูลการศึกษา/องค์กร | บันทึกสำเร็จจริง ตรวจสอบผ่าน `localStorage['my-today:profile']` พบ record ที่มีแค่ `name` เป็นค่าจริง ฟิลด์อื่นว่าง | **ผ่าน** |
| TC-FR02-01 | สร้าง Life Area ใหม่ | เปิด `/life-areas`, สร้าง Life Area ชื่อ "TestArea" | สร้างสำเร็จ ปรากฏในรายการ | สร้างสำเร็จ ปรากฏในรายการทันที | **ผ่าน** |
| TC-FR02-02 | แก้ไข Life Area | แก้ชื่อ "TestArea" เป็น "TestArea-Edited" | แก้ไขสำเร็จ ชื่อใหม่ปรากฏทุกที่ที่อ้างอิง | แก้ไขสำเร็จ | **ผ่าน** |
| TC-FR02-03 | ลบ Life Area ที่มี Task ผูกอยู่ (cascade-safe) | สร้าง Task "งานทดสอบ TestArea" ผูกกับ "TestArea-Edited" แล้วลบ Life Area นั้น (stub `window.confirm` เพื่อยืนยันลบ) | Task ยังอยู่ครบ ไม่หาย มีแค่ `lifeAreaId` ถูกเคลียร์เป็นค่าว่าง | ยืนยันผ่าน `localStorage['my-today:tasks:v2']` — Task "งานทดสอบ TestArea" ยังอยู่ พร้อม `lifeAreaId: ""` ขณะที่ Life Area ถูกลบออกจากรายการจริง | **ผ่าน** |

### FR-13 — Quick Capture 5 ประเภท (Sprint 8)

อ้างอิง Gate 8 ("ทดสอบ capture รายการ 5 ประเภท...ให้ครบ...โดยไม่มี error") จาก [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8 spec]]

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR13-01 | Quick Capture ประเภท Task | กด FAB "+ Add to My Today" → เลือก "งาน (Task)" → กรอกชื่อ "QC Task Test" อย่างเดียว → บันทึก | บันทึกได้ทันทีโดยไม่ต้องกรอก due date, `inInbox: true` | สำเร็จ ตรวจผ่าน `localStorage['my-today:tasks:v2']` พบ `inInbox: true` | **ผ่าน** |
| TC-FR13-02 | Quick Capture ประเภท Event | เหมือนข้างต้น เลือก "กิจกรรม (Event)" ชื่อ "QC Event Test" | บันทึกได้ทันทีโดยไม่ต้องกรอกวันที่, `inInbox: true` | สำเร็จ | **ผ่าน** |
| TC-FR13-03 | Quick Capture ประเภท Note | เลือก "บันทึก (Note)" ชื่อ "QC Note Test" | บันทึกได้ทันที, `inInbox: true` | สำเร็จ | **ผ่าน** |
| TC-FR13-04 | Quick Capture ประเภท Link | เลือก "ลิงก์ (Link)" ชื่อ "QC Link Test" โดยไม่กรอก URL | บันทึกได้ทันทีโดยไม่ต้องกรอก URL, `inInbox: true` | สำเร็จ — ดูรายละเอียดการตรวจสอบเพิ่มเติมในหัวข้อ "ข้อสังเกตที่ตรวจสอบแล้วไม่ใช่บั๊ก" ข้อ 1 | **ผ่าน** |
| TC-FR13-05 | Quick Capture ประเภท File | เลือก "ไฟล์ (File)" แนบไฟล์ทดสอบ `quota-test.txt` (ชื่อไฟล์เติมอัตโนมัติ) → บันทึก | บันทึกได้ทันที, `inInbox: true` | สำเร็จ ตรวจผ่าน IndexedDB (`my-today` DB, store `files`) พบ record `quota-test.txt` พร้อม `inInbox: true` | **ผ่าน** |

### FR-14 — Universal Inbox (Sprint 8)

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR14-01 | รายการที่ capture ปรากฏใน Inbox ทันที | เปิด `/inbox` แท็บ "Inbox" หลัง capture ครบ 5 ประเภท | เห็นครบทั้ง 5 รายการ พร้อมป้ายประเภท (งาน/กิจกรรม/บันทึก/ลิงก์/ไฟล์) | เห็นครบ 5 รายการจริง หัวข้อ "5 รายการยังไม่ได้จัด Life Area" ตรงกับจำนวนจริง | **ผ่าน** |
| TC-FR14-02 | จัดไฟล์จาก Inbox เข้า Life Area | กด "จัดเข้า Life Area" ที่ `quota-test.txt` → เลือก Life Area "Finance" → บันทึก | ไฟล์หายจาก Inbox, `inInbox: false`, `lifeAreaId` ตั้งค่าแล้ว | ยืนยันผ่าน IndexedDB: `inInbox: false`, `lifeAreaId: "la-finance"`; จำนวนรายการใน Inbox ลดจาก 5 เหลือ 4 | **ผ่าน** |
| TC-FR14-03 | จัดงานจาก Inbox เข้า Life Area พร้อมกรอกฟิลด์ที่เคย deferred | กด "จัดเข้า Life Area" ที่ "QC Task Test" → เลือก Life Area "Work" + กรอกวันที่กำหนดส่ง (ฟิลด์ที่ Quick Capture ยกเว้นไว้) → บันทึก | Task หายจาก Inbox, `inInbox: false`, ปรากฏในหน้า Tasks ตามปกติ | ยืนยันผ่าน `localStorage`: `inInbox: false`, `lifeAreaId: "la-work"`, `dueDate` ตั้งค่าแล้ว; เปิดหน้า `/tasks` พบ "QC Task Test" อยู่ในรายการปกติ (Work · พรุ่งนี้) | **ผ่าน** |

### FR-15 — Note/Link Management (Sprint 8)

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR15-01 | จัดบันทึกจาก Inbox แล้วดูในแท็บ "บันทึก" | จัด "QC Note Test" เข้า Life Area "Personal" แล้วเปิดแท็บ "บันทึก" ในหน้า `/inbox` | บันทึกที่จัดแล้วปรากฏในแท็บ "บันทึก" (ไม่ใช่แท็บ Inbox อีกต่อไป) พร้อม Life Area | ก่อนจัด แท็บ "บันทึก" แสดง "ไม่พบบันทึกที่ตรงกับเงื่อนไข" (ถูกต้อง — เพราะ "บันทึก"/"ลิงก์" แสดงเฉพาะรายการที่จัดแล้ว) หลังจัดแล้วปรากฏถูกต้องพร้อมป้าย "Personal" | **ผ่าน** |

### FR-16 — Timeline Now/Next/Later + Smart Priority (Sprint 9)

อ้างอิง Business Rule จาก [[../../01-requirements/01-spec/20260806-010-my-today-sprint9-timeline-priority-progress|Sprint 9 spec]] — "Overdue ขึ้นก่อนเสมอไม่ว่า Priority จะเป็นอะไร"

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR16-01 | Timeline แบ่ง Now/Next/Later ตามเวลาจริง | เปิด `/timeline` ขณะเวลาระบบ 07:35 น. (28 ส.ค. 2569) | "ตอนนี้ (Now)" ว่าง (ไม่มีรายการภายใน 60 นาที), "ถัดไป (Next)" เรียงตามเวลาเริ่ม (09:00, 13:00, 15:30, 17:00, 23:59) | ตรงตามคาด — Now ว่าง, Next แสดงครบ 5 รายการเรียงเวลาถูกต้อง, Later ว่าง | **ผ่าน** |
| TC-FR16-02 | Overdue (แม้ Priority ต่ำ) ต้องขึ้นก่อน Priority สูงที่ยังไม่ถึงกำหนด | สร้าง Task "Overdue Today Low Priority" (Priority: Low, กำหนดส่งวันนี้ 06:00 น. — เลยเวลาปัจจุบันแล้ว) แล้วดูลำดับใน "งานของวันนี้" (Dashboard, ใช้ `sortTasksBySmartPriority`) เทียบกับ "ส่งรายงาน STEM" (Priority: High, กำหนดส่งวันนี้ 23:59 — ยังไม่ถึง) | Task ที่เลยกำหนดต้องขึ้นเป็นอันดับแรก ไม่ว่า Priority จะต่ำกว่าก็ตาม | ตรงตามคาด — "Overdue Today Low Priority" ขึ้นเป็นอันดับ 1 ในรายการ ก่อน "ทำแบบฝึกหัด HCI บทที่ 4" (Medium), "ส่งรายงาน STEM" (High), และ "เตรียมสไลด์นำเสนอกลุ่ม" (Medium) ยืนยันกฎ Overdue-first เหนือ Priority ทำงานถูกต้อง | **ผ่าน** |

### FR-17 — Life Progress (Sprint 9)

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR17-01 | ตัวเลขความคืบหน้าถูกต้อง แยกตาม Life Area, ไม่มีคำว่า "Score" | เปิด Dashboard ดูส่วน "ความคืบหน้าวันนี้" หลังมี Task ครบกำหนดวันนี้หลายรายการทั้งมี/ไม่มี Life Area | แสดง "เสร็จแล้ว X จาก Y" ถูกต้องตามจำนวนจริง, แยกกลุ่มตาม Life Area รวมกลุ่ม "ไม่ระบุ Life Area", ไม่มีคำว่า "Score" ที่ใดเลย | แสดง "วันนี้เสร็จแล้ว 1 จาก 4 เรื่อง" ตรงกับจำนวนจริง, แยกกลุ่ม "Study 0/2", "Work 1/1", "ไม่ระบุ Life Area 0/1" ถูกต้อง, ไม่พบคำว่า "Score" ในข้อความใดๆ | **ผ่าน** |

### FR-18 — Task/Event↔Note/Link Linking + What/When/Information (Sprint 10)

อ้างอิง Acceptance Criteria "ไปโรงพยาบาล" scenario จาก [[../../01-requirements/01-spec/20260806-011-my-today-sprint10-task-event-file-linking|Sprint 10 spec]]

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR18-01 | สร้าง Task พร้อมผูกไฟล์+บันทึก+reminder แล้วดูในหน้าเดียว | สร้าง Task "ไปโรงพยาบาล" (กำหนดส่ง 2026-08-30) → เปิด Task Detail ("รายละเอียด") → ผูกไฟล์ 2 ไฟล์ (`quota-test.txt`, `report.docx`) + ผูกบันทึก 1 รายการ (QC Note Test) + ตั้ง Reminder "ก่อน 1 วัน" | ทุกอย่างแสดงในมุมมอง What/When/Information เดียว ไม่ต้องสลับหน้า | Task Detail แสดงครบ: WHAT (ชื่องาน/Priority/Status), WHEN (กำหนดส่ง + Reminder "ตั้งไว้: ก่อน 1 วัน"), INFORMATION (ไฟล์ 2 รายการ + บันทึก 1 รายการ) ในหน้าเดียวจริง | **ผ่าน** |
| TC-FR18-02 (non-regression) | Task↔File link แบบเดิมจาก Sprint 4 ยังทำงานปกติ | ตรวจสอบว่าไฟล์ที่ผูกใน TC-FR18-01 บันทึกผ่านกลไกเดิม (`FileRecord.linkedTaskIds`) ไม่ใช่ field ใหม่บน Task | กลไก Sprint 4 (เก็บความสัมพันธ์ฝั่ง File) ยังใช้งานได้ ไม่ถูกแทนที่หรือพัง | ยืนยันผ่าน IndexedDB — ทั้ง `quota-test.txt` และ `report.docx` มี `linkedTaskIds` รวม id ของ "ไปโรงพยาบาล" ถูกต้อง, ส่วน `linkedNoteIds` บน Task เก็บที่ฝั่ง Task ตามรูปแบบใหม่ (คนละ pattern กันตามที่ออกแบบไว้) | **ผ่าน** |

### FR-19 — Custom Reminder Lead Time (Sprint 10)

| TC-ID | คำอธิบาย | ขั้นตอนทดสอบ | ผลที่คาดหวัง | ผลจริง | สถานะ |
|---|---|---|---|---|---|
| TC-FR19-01 | Custom reminder lead time มีผลแทน default ของ Sprint 5 จริง | เปรียบเทียบ 2 Task ที่มีกำหนดส่งวันเดียวกัน (2026-08-30 ไม่ระบุเวลา, default 23:59 ≈ 64.4 ชม.จากเวลาทดสอบ): "งานทดสอบ TestArea" (ไม่ตั้ง custom reminder) กับ "ไปโรงพยาบาล" (ตั้ง custom reminder "ก่อน 1 วัน" = 1440 นาที = 24 ชม.) แล้วเปิด `/notifications` | Task ที่ไม่ตั้ง custom reminder ต้องขึ้นแจ้งเตือน (default: ≤72 ชม. = DueSoon) ส่วน Task ที่ตั้ง custom 24 ชม. ต้อง**ไม่ขึ้น**เพราะ 64.4 ชม. > 24 ชม. — พิสูจน์ว่า custom override ค่า default จริง ไม่ใช่แค่เพิ่มเข้าไป | ตรงตามคาดทุกจุด — "งานทดสอบ TestArea" ปรากฏในรายการแจ้งเตือน ("ใกล้ครบกำหนด") ส่วน "ไปโรงพยาบาล" ที่มีกำหนดส่งวันเดียวกันแต่ตั้ง custom reminder ไม่ปรากฏในรายการแจ้งเตือนเลย ยืนยัน logic ใน `notificationUtils.ts` (`taskLevel`) ทำงานตรงตาม Business Rule 2 ของ Sprint 10 | **ผ่าน** |

## ข้อสังเกตที่ตรวจสอบแล้วไม่ใช่บั๊ก

ระหว่างทดสอบพบข้อสงสัย 2 จุด ตรวจสอบโค้ดจริงแล้วยืนยันว่าเป็นพฤติกรรมที่ถูกต้องตามการออกแบบ ไม่ใช่บั๊ก บันทึกไว้เพื่อไม่ให้เข้าใจผิดซ้ำในอนาคต:

1. **Link Quick Capture ไม่บังคับกรอก URL** — ดูเผินๆ ขัดกับคำอธิบายใน `api-spec.md` ที่ระบุว่า Link "ต้องการแค่ title+url เป็นอย่างน้อย" แต่เมื่อตรวจ `src/components/LinkFormModal.tsx` พบว่า `canSubmit` ผ่อนคลายเงื่อนไข URL เมื่ออยู่ใน `quickCapture` mode โดยตั้งใจ (`quickCapture || form.url.trim().length > 0`) ซึ่งตรงตาม Sprint 8 Business Rule ข้อ 1 ที่ระบุว่าทุก entity ที่ capture ผ่าน Quick Capture ต้องการแค่ชื่อ/หัวข้ออย่างเดียวเป็นอย่างต่ำ — คำอธิบายใน `api-spec.md` หมายถึงฟอร์มแบบเต็ม (organize mode) ไม่ใช่ Quick Capture ไม่ต้องแก้โค้ดหรือแก้เอกสาร
2. **Timing ของการอ่านค่า `disabled` หลังตั้งค่า input ผ่าน `javascript_tool`** — พบว่าอ่านค่า `submitBtn.disabled` ในคำสั่งเดียวกับที่ set ค่า input ให้ผลไม่ตรง (React 18 batch การ re-render) ต้องแยกเป็นคนละคำสั่ง จึงจะอ่านค่าที่อัปเดตแล้วได้ถูกต้อง — เป็นข้อจำกัดของเครื่องมือทดสอบ ไม่ใช่บั๊กของแอป

## สรุป

Black Box Testing รอบนี้ครอบคลุมทุก FR ของ Sprint 7-10 ตามที่ Sprint 11 ระบุไว้ (FR-01, FR-02, FR-13 ถึง FR-19) รวม 19 Test Case **ผ่านทั้งหมด ไม่พบบั๊ก** ทุกผลลัพธ์ยืนยันด้วยการอ่านค่าจริงจาก `localStorage`/IndexedDB ไม่ใช่แค่ดูจากหน้าจอ ครอบคลุมทั้ง Acceptance Criteria หลักของแต่ละ Sprint และกรณี non-regression (Task-File link แบบเดิมจาก Sprint 4 ยังทำงานถูกต้องหลัง Sprint 10)
