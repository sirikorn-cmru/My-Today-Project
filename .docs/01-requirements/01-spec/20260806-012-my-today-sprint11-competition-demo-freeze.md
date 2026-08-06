# My Today — Sprint 11: Competition Demo + User Journey + UX Polish, then Freeze (Final Sprint ของ Competition Track / Version 2)

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-006-my-today-sprint6-integration-ux-final-testing]], [[20260806-007-my-today-sprint7-category-profile]], [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]], [[20260806-010-my-today-sprint9-timeline-priority-progress]], [[20260806-011-my-today-sprint10-task-event-file-linking]]

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint สุดท้ายของ **Competition Track (Sprint 7-11, "My Today — One Life, One Workspace")** ต่อยอดจาก Sprint 7 (Life Area/Workspace & Personal Profile), Sprint 8 (Universal Inbox + Quick Capture), Sprint 9 (Timeline + Smart Priority + Life Progress) และ Sprint 10 (Task–Event–File Linking) พัฒนาต่อจาก Codebase เดิมของ Sprint 1-10 ทั้งหมด

**หมายเหตุคำศัพท์:** เอกสารนี้ใช้คำว่า **"Life Area"** ตามที่ renumber/rename ไว้แล้วใน [[20260806-007-my-today-sprint7-category-profile]] ไม่ใช้คำว่า "Category"

## เป้าหมาย

เหมือน Sprint 6 ([[20260806-006-my-today-sprint6-integration-ux-final-testing]] ซึ่งเป็น Final Sprint ของ Version 1) แต่สำหรับ Competition Track — ไม่เพิ่ม Feature ใหม่แล้ว หน้าที่เดียวคือทำของที่มีอยู่จาก Sprint 7-10 ให้ดี พร้อม Demo แข่งขัน แล้ว **Freeze** (ไม่เพิ่มฟีเจอร์ใหม่อีกหลังจากนี้ — AI หรือฟีเจอร์อื่นๆ เป็นเรื่องของ Phase ถัดไป ไม่ใช่ส่วนหนึ่งของ scope นี้)

## Feature Requirements / งานที่ต้องทำ (ไม่ใช่ feature ใหม่ แต่เป็นการปรับปรุง/ตรวจสอบ)

- ตรวจสอบ Integration ระหว่างโมดูลทั้งหมดจาก Sprint 1-10: Life Area ↔ Task/Event/File/Note/Link, Inbox → Life Area, Timeline/Life Progress ↔ ข้อมูลจริง, Task Detail (What/When/Information) ↔ Notification
- ปรับ UX/UI ตามมาตรฐานเดียวกับ Sprint 6 (Empty State, Loading State, Validation, Confirmation ก่อน Delete, Error Message ที่เข้าใจง่าย) ให้ครอบคลุมหน้าจอใหม่ทั้งหมดจาก Sprint 7-10 ด้วย (Life Area management, Personal Profile, Inbox, Timeline, Task Detail แบบใหม่)
- ทำ Black Box Testing ครบทุก Functional Requirement จาก Sprint 7-10
- ลบ Mock/Debug Code/Console Error ที่ไม่จำเป็นออกจากฟีเจอร์ใหม่ทั้งหมด
- เตรียม **Competition Demo**: สคริปต์ Demo ที่ใช้ Final User Journey (ดู Business Rules ข้อ 2) และ Positioning Narrative (ดู Business Rules ข้อ 3) แทนการอธิบายว่า "เราทำเว็บจัดการ Task"

## Business Rules

1. ห้ามเพิ่ม Feature ใหม่ใดๆ ใน Sprint นี้ (เหมือน Sprint 6) — ห้าม AI, Chatbot, ระบบธนาคาร/โรงพยาบาล/GPS/LMS integration ใดๆ, ห้ามเพิ่ม API ภายนอกจำนวนมาก — AI อาจเพิ่มได้ใน **Phase ถัดไป** ในฐานะ "Daily Orchestrator" (เช่น ช่วยสรุปว่าวันนี้อะไรสำคัญ หรือช่วยจัดข้อมูลที่ผู้ใช้โยนเข้า Inbox) แต่ต้องเป็นคนละ Phase ไม่ใช่ส่วนหนึ่งของ Sprint 11 หรือ Version 2 นี้
2. **Final Competition User Journey (ต้องทำได้ครบ end-to-end ทั้งสอง persona):**
   - นักศึกษา: เพิ่ม Task "ส่งรายงาน HCI" ผ่าน Quick Capture → เข้า Inbox → จัดเข้า Life Area "Study" → กำหนด Deadline → แนบไฟล์ → เห็น Deadline ใน Calendar และ Timeline → เปิด My Today ตอนเช้าเห็นงานบน Dashboard → ระบบเตือนตาม Reminder ที่ตั้งไว้ → ทำงานเสร็จกด Done → Life Progress อัปเดต
   - บุคคลทั่วไป: เพิ่ม Task "จ่ายค่าไฟ" ผ่าน Quick Capture → เข้า Inbox → จัดเข้า Life Area "Finance" → แนบใบแจ้งหนี้ → เห็น Deadline ใน Timeline → ได้รับการเตือน → จ่ายเงินเสร็จกด Done → Life Progress อัปเดต
   - ทั้งสอง Journey ต้องใช้ Core เดียวกันทั้งหมด (Quick Capture, Inbox, Life Area, Task, Timeline, Notification, Life Progress) ไม่มี code path แยกตาม persona
3. **Positioning Narrative สำหรับ Demo** (ใช้ตอนนำเสนอ ไม่ใช่ functional requirement แต่เป็นสคริปต์ demo ที่ต้องเตรียมไว้): อย่าพูดว่า "เราพัฒนาเว็บแอปสำหรับจัดการ Task" (จะถูกเทียบกับ Todoist/Notion/Google Calendar ทันที) ให้พูดว่า "ปัญหาไม่ใช่คนไม่มีแอป แต่คนมีแอปมากเกินไป ข้อมูลที่ต้องใช้ในชีวิตจึงกระจัดกระจายอยู่คนละที่" แล้วเสนอว่า "My Today เป็น Personal Daily Workspace ที่จัดข้อมูลตามชีวิตของคน ไม่ได้จัดตามระบบที่องค์กรสร้างขึ้น" ปิดท้ายด้วย: "ทุกวันนี้เราไม่ได้ขาดระบบ แต่ชีวิตของเรากระจัดกระจายอยู่ในหลายระบบ My Today จึงไม่ได้สร้างอีกระบบหนึ่งขึ้นมาเพิ่ม แต่สร้างพื้นที่ที่เริ่มจากชีวิตของคน และตอบคำถามง่ายที่สุดว่า วันนี้ฉันต้องทำอะไร"
4. หลัง Sprint นี้คือ **Freeze** — ไม่รับ Feature request ใหม่เข้า Version 2 อีก ฟีเจอร์ใดๆ หลังจากนี้ถือเป็น Phase/Version ถัดไป (ต้องผ่าน requirement intake ใหม่)
5. พัฒนาต่อจาก Codebase เดิมของ Sprint 1-10 ทั้งหมด (Non-regression: ห้ามทำให้ฟีเจอร์ใดๆ จาก Sprint ก่อนหน้าพังหรือหายไป)

## ขอบเขต (Scope)

### In scope (Sprint 11 — ปรับปรุง/ตรวจสอบ/เตรียม demo เท่านั้น)

- ตรวจ/แก้ Integration ระหว่างโมดูลทั้งหมด Sprint 1-10
- ปรับปรุง UX/UI หน้าจอใหม่จาก Sprint 7-10 ให้ได้มาตรฐานเดียวกับ Sprint 6
- Black Box Testing ครบ Sprint 7-10
- Cleanup mock/debug code
- เตรียม Demo script (Final User Journey คู่ persona + Positioning Narrative)
- Freeze — ปิดรับ Feature ใหม่

### Out of scope (ห้ามทำใน Sprint นี้โดยเด็ดขาด)

- เพิ่ม AI ใดๆ (รวมถึง Daily Orchestrator ที่กล่าวถึงในหมายเหตุ — เก็บไว้ Phase ถัดไป)
- เพิ่ม Chatbot, Social Features, ระบบธนาคาร/โรงพยาบาล/GPS/LMS integration
- เพิ่มฟังก์ชันใดๆ ที่ไม่อยู่ใน Sprint 7-10 ที่ทำมาแล้ว

## Acceptance Criteria (Final Acceptance Criteria ของ Competition Track / Version 2)

- ผู้ใช้ใหม่ทำ Final Competition User Journey ได้ครบทั้งสอง persona โดยไม่ต้องมีคนสอน
- ไม่มี Console Error ในทุกหน้าจอใหม่จาก Sprint 7-10
- Responsive ครบ Mobile/Tablet/Desktop เหมือน Sprint 6
- Demo script พร้อมใช้จริง มี Positioning Narrative ครบตาม Business Rules ข้อ 3

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 11 / Final Gate ของ Competition Track:** ทดสอบ Final Competition User Journey ทั้งสอง persona แบบ end-to-end ตาม Business Rules ข้อ 2 — ถ้าทำได้ครบและ Demo script พร้อม ถือว่า My Today — One Life, One Workspace (Version 2) สำเร็จ และเข้าสู่สถานะ Freeze
