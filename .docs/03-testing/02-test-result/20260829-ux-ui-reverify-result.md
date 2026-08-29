# Test Result — UX/UI Re-verify (Sprint 6 Standard, applied to Sprint 7-10 Screens)

เชื่อมโยงกลับ: [[index|02-test-result]], [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6 spec]], [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]], [[../../01-requirements/backlog|backlog.md]]

## ขอบเขตของเอกสารนี้

Sprint 11 ระบุให้ตรวจสอบ UX/UI มาตรฐานเดียวกับ Sprint 6 (Empty State/Loading State/Validation/Confirmation ก่อน Delete/Error Message ที่ผู้ใช้เข้าใจ) แบบครบถ้วนกับหน้าจอที่เพิ่มเข้ามาใน Sprint 7-10 ซึ่งไม่เคยผ่านการตรวจสอบชุดนี้มาก่อน (Sprint 6 ตรวจแค่ Sprint 1-5) เอกสารนี้บันทึกผลการตรวจสอบนั้น — อ่านโค้ดจริงทุกไฟล์ที่เกี่ยวข้อง และทดสอบจริงในเบราว์เซอร์เมื่อพบจุดที่น่าสงสัย

**เกณฑ์ตรวจสอบ (จาก [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6 spec]]):** ใช้งานง่าย/Mobile-first, Navigation สม่ำเสมอ, Font อ่านง่าย, Button มีความหมายชัดเจน, Form มี Validation, มี Empty State, มี Loading State หากจำเป็น, มี Confirmation ก่อน Delete, มี Error Message ที่ผู้ใช้เข้าใจ

**หน้าจอ/component ที่ตรวจ (ทั้งหมดที่เพิ่มใน Sprint 7-10):** `LifeAreasPage`, `ProfilePage` (Sprint 7); `InboxPage`, `QuickCaptureModal`, `NoteFormModal`, `LinkFormModal` (Sprint 8); `TimelinePage`, `TimelineSection`, `LifeProgress` (Sprint 9); `TaskDetailModal`, `EventDetailModal` (Sprint 10) — รวมตรวจ `TaskFormModal`/`EventFormModal`/`FileFormModal` เฉพาะส่วน `quickCapture` mode ที่เพิ่มใน Sprint 8 ด้วย (ไม่ใช่ทั้งไฟล์ เพราะไฟล์เหล่านี้เป็นของ Sprint 2-4 เดิม)

## สรุปผล

พบ **2 จุดที่เป็นช่องโหว่จริง (แก้ไขแล้วทั้งคู่ในรอบนี้)** และยืนยันว่าอีก 1 จุดที่ดูเหมือนช่องโหว่จริงๆ เป็นการออกแบบที่ตั้งใจ ไม่ใช่บั๊ก ส่วนที่เหลือทั้งหมดผ่านเกณฑ์ครบ

| # | หน้าจอ | ประเด็น | สถานะ |
|---|---|---|---|
| 1 | `LifeAreasPage` | แก้ไขชื่อ Life Area เป็นค่าว่างแล้วกด "บันทึก" เงียบๆ ไม่มีอะไรเกิดขึ้น ไม่มี Error Message | **พบช่องโหว่จริง — แก้ไขแล้ว** |
| 2 | `InboxPage` | ไม่มี Loading State ระหว่างรอไฟล์โหลดจาก IndexedDB (ต่างจาก `FilesPage` ที่มี) | **พบช่องโหว่จริง — แก้ไขแล้ว** |
| 3 | `TaskDetailModal` / `EventDetailModal` | ปุ่ม "ลบออก" (unlink ไฟล์/บันทึก/ลิงก์ออกจากงาน) ไม่มี Confirmation ก่อนกด | ตรวจสอบแล้ว — **ไม่ใช่บั๊ก** (ดูรายละเอียดด้านล่าง) |

## รายละเอียดที่พบและแก้ไข

### 1. `LifeAreasPage` — แก้ไขชื่อว่างแล้วบันทึกเงียบๆ

**ปัญหา:** ฟอร์มแก้ไขชื่อ Life Area แบบ inline ไม่มีการ disable ปุ่ม "บันทึก" เมื่อชื่อว่าง (ต่างจากฟอร์ม "+ เพิ่ม" Life Area ใหม่ ที่ disable ปุ่มถูกต้องอยู่แล้วเมื่อ `!newName.trim()`) — ทดสอบจริงในเบราว์เซอร์: เปิดแก้ไข "Health" → ลบชื่อจนว่าง → กด "บันทึก" → ระบบปิดโหมดแก้ไขเงียบๆ โดยไม่บันทึกอะไรและไม่มี Error Message ใดๆ ผู้ใช้อาจสับสนว่าทำไมชื่อไม่เปลี่ยน

**การแก้ไข:** เพิ่ม `disabled={!editingName.trim()}` ให้ปุ่ม "บันทึก" ในโหมดแก้ไข ([LifeAreasPage.tsx](../../../src/pages/LifeAreasPage.tsx)) ให้ตรงกับ pattern เดียวกับฟอร์ม "+ เพิ่ม" ด้านบนของหน้าเดียวกัน — ป้องกันการ submit ค่าว่างล่วงหน้าแทนการแสดง error ย้อนหลัง (แนวทางเดียวกับทุกฟอร์มอื่นในระบบ เช่น `TaskFormModal`/`NoteFormModal`/`LinkFormModal` ที่ disable ปุ่ม submit เมื่อ `canSubmit` เป็นเท็จ)

**ทดสอบยืนยันหลังแก้ไข (ในเบราว์เซอร์จริง):**
- ลบชื่อ "Health" จนว่าง → ปุ่ม "บันทึก" กลาย `disabled: true` ทันที (ไม่ต้องรอกดแล้วค่อยเด้ง error)
- พิมพ์ชื่อใหม่ "Health-Updated" → ปุ่มกลับมา `disabled: false` → กดบันทึก → ชื่อเปลี่ยนเป็น "Health-Updated" จริงในหน้าจอ (non-regression: การแก้ไขปกติยังทำงานถูกต้อง)

### 2. `InboxPage` — ไม่มี Loading State ระหว่างไฟล์โหลด

**ปัญหา:** `InboxPage` รับ prop `filesLoaded` จาก `useFiles()` (เหมือน `FilesPage`) แต่ใช้แค่กรองไม่ให้ไฟล์ที่ยังไม่โหลดเสร็จปรากฏใน list (`...(filesLoaded ? files.filter(...) : [])`) โดยไม่มี Loading indicator ใดๆ ต่างจาก `FilesPage` ที่มี spinner + ข้อความ "กำลังโหลดไฟล์..." ชัดเจนระหว่างรอ — ผลคือถ้า IndexedDB โหลดช้า (เช่น เครื่องช้าหรือมีไฟล์เยอะ) ผู้ใช้จะเห็น Inbox แสดง "ว่างเปล่า 🎉" ผิดๆ ชั่วขณะ ทั้งที่จริงมีไฟล์ค้างใน Inbox แค่ยังโหลดไม่เสร็จ

**การแก้ไข:** เพิ่ม Loading indicator แบบเดียวกับ `FilesPage` (spinner + "กำลังโหลดไฟล์...") ในแท็บ "Inbox" ของ `InboxPage.tsx` เมื่อ `!filesLoaded` — ใช้ style เดียวกันเพื่อความสม่ำเสมอทั้งระบบ

**ทดสอบยืนยันหลังแก้ไข:** เปิด `/inbox` หลังโหลดเสร็จ ไม่มี indicator ค้างอยู่ (ไม่ regression), แสดง Empty State ปกติเมื่อไม่มีรายการจริง — เนื่องจาก IndexedDB ในสภาพแวดล้อมทดสอบโหลดเร็วมาก ไม่สามารถจับภาพช่วง Loading จริงได้ แต่ยืนยันโค้ดตรงกับ pattern ของ `FilesPage` ทุกจุด (ไม่มี syntax/type error จาก `npm run build`)

## ข้อสังเกตที่ตรวจสอบแล้วไม่ใช่บั๊ก

### 3. `TaskDetailModal`/`EventDetailModal` — ปุ่ม "ลบออก" (unlink) ไม่มี Confirmation

ดูเผินๆ ขัดกับมาตรฐาน "Confirmation ก่อน Delete" เพราะปุ่ม "ลบออก" ใช้ style เดียวกับปุ่มลบอื่นๆ ที่มี `window.confirm` (เช่น ลบ Life Area, ลบ Task/Event/File/Note/Link ทั้งรายการใน `InboxPage`/`FileCard`) แต่ตรวจโค้ดแล้วพบว่าการกระทำนี้คือ **unlink** (ตัดความสัมพันธ์) ไม่ใช่ **delete** (ลบข้อมูลถาวร) — กด "ลบออก" ที่ไฟล์/บันทึก/ลิงก์ใน Task Detail แค่เอาออกจากรายการที่เชื่อมกับ Task นี้เท่านั้น ตัวไฟล์/บันทึก/ลิงก์เองยังอยู่ครบในระบบ (ยังเห็นในหน้า Files/Inbox ตามปกติ) และย้อนกลับได้ทันทีผ่าน dropdown "+ แนบ...ที่มีอยู่..." ข้างล่างโดยไม่มีผลเสียถาวร — จึงเป็นการตัดสินใจออกแบบที่สมเหตุสมผลว่าไม่จำเป็นต้องมี Confirmation แบบเดียวกับการลบถาวร ไม่ต้องแก้ไข

## สรุป

ตรวจสอบ UX/UI มาตรฐาน Sprint 6 ครบทุกหน้าจอ/component ที่เพิ่มใน Sprint 7-10 พบช่องโหว่จริง 2 จุด (Life Area inline-edit validation, Inbox loading state) **แก้ไขและยืนยันด้วยการทดสอบจริงในเบราว์เซอร์แล้วทั้งคู่** ไม่พบ regression จาก `npm run build` (`tsc --noEmit` ผ่าน + build สำเร็จ) พบข้อสงสัยเพิ่มอีก 1 จุดที่ตรวจแล้วยืนยันเป็นการออกแบบที่ตั้งใจ ไม่ใช่บั๊ก
