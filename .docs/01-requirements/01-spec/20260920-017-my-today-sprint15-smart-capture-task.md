# My Today — Sprint 15: Smart Capture จากรูปภาพ สำหรับ Quick Capture ประเภท Task — Version 3

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260830-015-my-today-sprint13-smart-capture-image]] (Sprint ที่เปิดฟีเจอร์ Smart Capture from Image ไว้ก่อน — Business Rule ข้อ 1 และ Out-of-scope เดิมระบุ "ใช้ได้เฉพาะ Quick Capture ประเภท 'กิจกรรม (Event)' เท่านั้น" ซึ่ง Sprint 15 นี้คือการมารับช่วงส่วนของ Task อย่างเป็นทางการ), [[20260905-016-my-today-sprint14-email-password-login]] (Sprint ก่อนหน้าใน Version 3), [[20260829-014-my-today-sprint12-cloud-sync]] (ให้ Firebase Auth ที่ Sprint นี้ใช้เป็น gate เดียวกับ Sprint 13), [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]] (Quick Capture เดิมที่ Sprint 13/15 ต่อยอด), [[20260806-012-my-today-sprint11-competition-demo-freeze]] (Freeze rule ของ Version 2 ที่เปิดช่องทางเข้าถึง Version 3 ผ่าน requirement intake ใหม่)

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint ที่ 4 ของ **Version 3** ต่อจาก Sprint 12 (Cloud Sync), Sprint 13 (Smart Capture from Image — Event เท่านั้น) และ Sprint 14 (Email/Password Login) — เปิดผ่านช่องทางเดียวกันคือ `requirement-intake` ใหม่ตามที่ Freeze rule ของ Sprint 11 ([[20260806-012-my-today-sprint11-competition-demo-freeze]]) เปิดไว้เอง ไม่ใช่การฝ่าฝืน Freeze ของ Version 2 แต่อย่างใด

## หมายเหตุสำคัญ — นี่ไม่ใช่การขัดแย้งกับ Business Rule ของ Sprint 13 แต่คือการรับช่วงสิ่งที่ถูกกันขอบเขตไว้

สเปก Sprint 13 ([[20260830-015-my-today-sprint13-smart-capture-image]]) เขียน Business Rule ข้อ 1 ไว้ตรงๆ ว่า **"ขอบเขตประเภทข้อมูล: ใช้ได้เฉพาะ Quick Capture ประเภท 'กิจกรรม (Event)' เท่านั้น จาก 5 ประเภทเดิม (Task/Event/File/Note/Link)"** และ Out-of-scope section ก็ระบุ **"ใช้กับ Quick Capture ประเภทอื่น (Task/File/Note/Link) — เฉพาะ Event เท่านั้น"** — คำระบุขอบเขตนี้หมายถึง Sprint 13 **จำกัด** ขอบเขตของตัวเองไว้ที่ Event เท่านั้นในรอบนั้น ไม่ใช่การปฏิเสธถาวรว่า Task จะไม่มีทางได้ฟีเจอร์นี้

Sprint 15 นี้คือการมารับช่วงสิ่งที่ Sprint 13 กันขอบเขตไว้สำหรับ **Task** โดยเฉพาะอย่างเป็นทางการ ผ่านกระบวนการ requirement intake ตามปกติ — ไม่ใช่การแก้ไขสเปก Sprint 13 ที่ built ไปแล้ว (ไฟล์ `20260830-015-...` จะไม่ถูกแก้ไข) และไม่ใช่การขัดแย้งกับ Business Rule เดิมของ Sprint 13 แต่อย่างใด — เป็น pattern เดียวกับที่ Sprint 14 รับช่วง Email/Password ที่ Sprint 12's Business Rule ข้อ 5 กันไว้ก่อน

## หมายเหตุสำคัญ — นี่ไม่ใช่ "Daily Orchestrator" และไม่ใช่การเปิดกฎ "ไม่มี AI" ทั้งระบบ

เช่นเดียวกับที่ Sprint 13 เคยระบุไว้ Sprint นี้ไม่ใช่และไม่นับเป็นจุดเริ่มต้นของ "Daily Orchestrator" (AI assistant ที่ช่วยตัดสินใจ/สรุปภาพรวม/จัดลำดับความสำคัญให้ผู้ใช้ในภาพกว้าง) ที่ Project purpose จองชื่อไว้แยกต่างหากหลัง Freeze — Sprint 15 นี้จำกัดขอบเขตแคบเช่นเดียวกับ Sprint 13 เพียงแค่ขยายชนิดข้อมูลปลายทางจาก Event เป็น Task เพิ่มอีกหนึ่งประเภท ไม่ใช่ AI assistant/orchestrator ทั่วไป ไม่ตัดสินใจแทนผู้ใช้ ไม่วิเคราะห์ข้อมูลอื่นใดนอกจากภาพที่ป้อนเข้ามาโดยตรง

## เป้าหมาย

ขยายฟีเจอร์ Smart Capture from Image ของ Sprint 13 ให้ใช้กับ Quick Capture ประเภท **"งาน (Task)"** ได้ด้วย นอกเหนือจาก Event เดิม — ผู้ใช้ที่ signed in แล้วกดปุ่ม "สแกนจากรูปภาพ" ในหน้า "เพิ่มงาน" เลือกรูปภาพ (เช่น ใบปลิว/ประกาศงาน) แล้ว AI (Google Gemini vision ผ่าน Vercel Serverless Function proxy เดิมของ Sprint 13) จะสกัดชื่องาน/วันที่/เวลา/สถานที่มาเติมฟอร์ม Task ให้ผู้ใช้ตรวจสอบ/แก้ไขก่อนบันทึกเสมอ — รีใช้ `SmartCaptureModal` component และ `/api/smart-capture` endpoint เดิมของ Sprint 13 ทั้งหมด ไม่สร้างซ้ำ

## Feature Requirements / User Stories

- ในฐานะผู้ใช้ที่ signed in แล้ว ฉันต้องการถ่าย/เลือกรูปภาพตอนเพิ่มงาน (Task) ใหม่ แล้วให้ระบบช่วยกรอกฟอร์ม "งาน (Task)" ของ Quick Capture ให้อัตโนมัติ เพื่อประหยัดเวลาไม่ต้องพิมพ์เอง เหมือนที่ทำได้กับ Event อยู่แล้ว
- ในฐานะผู้ใช้ ฉันต้องการเห็นและแก้ไขข้อมูลที่ AI สกัดมาได้ก่อนบันทึกจริงเสมอ เพื่อแก้ไขกรณี AI เข้าใจผิด (เหมือน Event เดิม)
- ในฐานะผู้ใช้ที่ยังไม่ signed in ฉันต้องการเห็นข้อความชัดเจนว่าต้อง sign in ก่อนถึงจะใช้ฟีเจอร์นี้ได้ ไม่ว่าจะเลือกสแกนสำหรับ Task หรือ Event (เหมือน Event เดิม)
- ในฐานะผู้ใช้ ฉันต้องการให้งาน (Task) ที่สกัดจากภาพเก็บสถานที่ (เช่น ห้องเรียน/สถานที่จัดกิจกรรม) ไว้ด้วย ไม่ใช่แค่ชื่อ/วันที่/เวลา เพื่อไม่ต้องพิมพ์ข้อมูลนี้เพิ่มเอง

## Business Rules

1. **ขอบเขตประเภทข้อมูลที่ขยาย: Task เพิ่มจาก Event เดิม:** Sprint 13 จำกัดไว้เฉพาะ Quick Capture ประเภท "กิจกรรม (Event)" เท่านั้น ([[20260830-015-my-today-sprint13-smart-capture-image]] Business Rule ข้อ 1) — Sprint นี้เพิ่ม Quick Capture ประเภท "งาน (Task)" เข้าไปอีกหนึ่งประเภท รวมเป็น 2 ประเภทที่ใช้ Smart Capture from Image ได้ (Task, Event) จาก 5 ประเภทเดิมของ [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]] — อีก 3 ประเภทที่เหลือ (File/Note/Link) ยังไม่เปลี่ยนแปลงพฤติกรรมใดๆ เลย
2. **เพิ่มฟิลด์ใหม่ `location: string` ให้กับ `Task`/`TaskInput`:** เป็น pure addition ใน `src/types.ts` (ฟิลด์ใหม่ล้วนๆ ไม่ใช่การแก้ไข/ลบฟิลด์เดิม) จึง**ไม่ต้อง bump** LocalStorage key `my-today:tasks:v2` เป็น `:v3` — ใช้ pattern เดียวกับที่ Sprint 8's `inInbox` และ Sprint 12's `updatedAt` เคยทำมาก่อน (record เก่าที่ไม่มีฟิลด์นี้จะอ่านกลับมาเป็น `undefined`/ค่าว่าง ซึ่งไม่ทำให้อะไรพัง) — ฟิลด์นี้ใช้กับ **Task เท่านั้น** ไม่เพิ่มให้ Note/Link (ไม่มีแนวคิดสถานที่) และไม่กระทบ `CalendarEvent.location` ที่มีอยู่แล้วตั้งแต่ Sprint 3
3. **รีใช้ component และ endpoint เดิมของ Sprint 13 ทั้งหมด ไม่สร้างซ้ำ:** `SmartCaptureModal` และ `/api/smart-capture` (Vercel Serverless Function proxy เก็บ `GEMINI_API_KEY`) ของ Sprint 13 ใช้ต่อได้ทันทีโดยไม่ต้องสร้างใหม่ — ปรับแค่จุด mapping ผลลัพธ์ที่ AI สกัดได้ตอนใช้กับ Task: `title` → `title` (เหมือน Event), `date` → `dueDate`, `startTime` → `dueTime`, `location` → `location` (ฟิลด์ใหม่ตามข้อ 2) — ไม่แก้ไข endpoint ฝั่ง server หรือ prompt เดิมที่ยิงไป Gemini ถ้าโครงสร้างผลลัพธ์ 4 ฟิลด์ (title/date/startTime/location) เดิมเพียงพอสำหรับ mapping นี้
4. **ต้อง sign in ก่อนใช้งานเหมือนเดิม:** ใช้ auth gate เดียวกับที่ Sprint 13 มีอยู่แล้ว (Firebase Auth — Google Sign-In หรือ Email/Password ของ Sprint 14 ก็ได้ เพราะ `user` object รูปแบบเดียวกันทุก provider ตาม Sprint 14 Business Rule ข้อ 4) — ไม่สร้างกลไก gate ใหม่
5. **AI แนะนำ ไม่ใช่ AI ตัดสินใจแทน — สืบทอดจาก Sprint 13:** ข้อมูลที่ AI สกัดจากภาพต้องเข้าไปเติมในฟอร์ม Quick Capture ของ Task ให้ผู้ใช้เห็น/ตรวจสอบ/แก้ไขได้ก่อนเสมอ — ห้าม auto-submit ตรงๆ โดยไม่ให้ผู้ใช้ยืนยันก่อนเด็ดขาด (ใช้กฎเดียวกับ [[20260830-015-my-today-sprint13-smart-capture-image]] Business Rule ข้อ 2 ทุกประการ ไม่ต้องเขียนใหม่จากศูนย์)
6. **Non-regression เต็มรูปแบบต่อ Event และ Quick Capture ประเภทอื่น:** ไม่กระทบพฤติกรรมของ Quick Capture ประเภท Event เลยแม้แต่น้อย (Event ยังทำงานเหมือนเดิมทุกประการตาม Sprint 13 — UI/schema/flow ไม่เปลี่ยน) และ Quick Capture ประเภท File/Note/Link ยังไม่เปลี่ยนแปลงพฤติกรรมใดๆ เลยเช่นเดิม
7. **Image handling แบบ ephemeral ไม่ persist — สืบทอดจาก Sprint 13:** ไม่เก็บรูปภาพถาวรที่ไหนเลย ใช้กลไก ephemeral เดียวกับ Sprint 13 Business Rule ข้อ 6 ทุกประการ (ถ้าผู้ใช้อยากเก็บรูปนั้นไว้เป็นไฟล์แนบของ Task ต้องทำผ่านฟีเจอร์ "แนบไฟล์" เดิมของ Sprint 4 เอง ไม่ได้ทำให้อัตโนมัติในรอบนี้)
8. **Error handling — สืบทอดจาก Sprint 13:** ถ้า AI วิเคราะห์ภาพไม่สำเร็จ (ภาพไม่ชัด/ไม่มีข้อมูลที่เกี่ยวข้อง/AI service ล่ม/เน็ตหลุด) ต้องแสดง error message ที่เข้าใจง่ายและให้ผู้ใช้กรอกฟอร์ม Task ด้วยตัวเองตามปกติได้ทันที ไม่บล็อกการใช้งาน — ใช้กลไกเดียวกับ Sprint 13 Business Rule ข้อ 8

## ขอบเขต (Scope)

### In scope

- ตัวเลือกใหม่ในหน้า "เพิ่มงาน" (`TaskFormModal` ในเส้นทาง Quick Capture ประเภท Task) — เพิ่มปุ่ม/ตัวเลือก "สแกนจากรูปภาพ" คู่กับ "กรอกฟอร์มเอง" เดิม ใช้ pattern เดียวกับที่ `QuickCaptureModal` ทำกับ Event ใน Sprint 13 (แสดงตัวเลือกกลางระหว่างสองทางก่อนเปิดฟอร์มจริง)
- เพิ่มฟิลด์ `location: string` ให้ `Task`/`TaskInput` ใน `src/types.ts` (pure addition ตาม Business Rule ข้อ 2) และแสดง/แก้ไขฟิลด์นี้ในฟอร์ม Task ปกติด้วย (ไม่ใช่แค่ตอน Smart Capture)
- รีใช้ `SmartCaptureModal`/`/api/smart-capture` เดิมของ Sprint 13 พร้อมปรับ mapping ผลลัพธ์ตาม Business Rule ข้อ 3 เมื่อเรียกใช้จากเส้นทาง Task
- Gate ด้วย Firebase Auth เดียวกับ Sprint 13 — ต้อง sign in ก่อนถึงจะเห็น/ใช้ตัวเลือกนี้ได้บนเส้นทาง Task เช่นเดียวกับ Event
- Error handling ครบตาม Business Rule ข้อ 8

### Out of scope (ห้ามทำในรอบนี้)

- ไม่แก้ไข Quick Capture ประเภท File/Note/Link ในรอบนี้ (เฉพาะ Task ที่เพิ่มเข้ามาใหม่เท่านั้น นอกเหนือจาก Event เดิมของ Sprint 13)
- ไม่เปลี่ยนแปลง UI/schema/พฤติกรรมของ Event เลยแม้แต่น้อย
- ไม่เพิ่มฟิลด์ `location` ให้ entity อื่นนอกจาก Task (Note, Link ไม่มีฟิลด์นี้; CalendarEvent มี `location` อยู่แล้วตั้งแต่ Sprint 3 ไม่เกี่ยวข้องกับการเพิ่มนี้)
- ไม่สร้าง AI endpoint หรือ component ใหม่ซ้ำซ้อนกับของ Sprint 13 — รีใช้ของเดิมทั้งหมดตาม Business Rule ข้อ 3
- เก็บรูปภาพถาวรเป็นไฟล์แนบอัตโนมัติ (สืบทอด out-of-scope เดิมจาก Sprint 13)
- Daily Orchestrator หรือ AI capability อื่นใดนอกเหนือจากการสกัดข้อมูล Task/Event จากรูปภาพ (ดูหมายเหตุสำคัญด้านบน)
- Real-time/streaming analysis, การวิเคราะห์วิดีโอ, หรือ input ที่ไม่ใช่รูปภาพนิ่ง (สืบทอด out-of-scope เดิมจาก Sprint 13)

## Acceptance Criteria

- ผู้ใช้ signed in แล้วเลือก "สแกนจากรูปภาพ" ตอนเพิ่มงานใหม่ AI สกัดชื่องาน/วันที่/เวลา/สถานที่มาเติมฟอร์ม Task ถูกต้อง (mapping `title`→`title`, `date`→`dueDate`, `startTime`→`dueTime`, `location`→`location`) ผู้ใช้ตรวจสอบ/แก้ไขก่อนบันทึกได้เสมอ ไม่ auto-submit
- ผู้ใช้ที่ยังไม่ signed in เห็นข้อความบังคับ sign in พร้อม fallback กลับไปกรอกฟอร์มเอง (เหมือน Event เดิม) เมื่อลองใช้ Smart Capture จากรูปในเส้นทาง Task
- Task ที่บันทึกแล้วมีฟิลด์ `location` เก็บและแสดงผลถูกต้อง ทั้งที่มาจาก Smart Capture และที่กรอกเองผ่านฟอร์มปกติ
- ส่งรูปที่ไม่มีข้อมูลเกี่ยวข้องหรือภาพไม่ชัดในเส้นทาง Task แล้วเห็น error message ที่เข้าใจง่าย และยังกรอกฟอร์ม Task ด้วยตัวเองต่อได้ตามปกติ
- Event เดิมของ Sprint 13 ยังทำงานได้ปกติทุกประการหลังการเปลี่ยนแปลงนี้ (non-regression) — เลือกสแกนจากรูปภาพตอนเพิ่ม Event ยังได้ผลลัพธ์ mapping เดิม (title/date/startTime/location ของ Event) ไม่เปลี่ยนแปลง
- Quick Capture ประเภท File/Note/Link ยังทำงานได้ปกติทุกอย่างโดยไม่เปลี่ยนแปลง (non-regression)
- API key ของ AI ไม่ปรากฏในโค้ด client ฝั่งเบราว์เซอร์เลย (สืบทอดการตรวจสอบเดิมจาก Sprint 13 เนื่องจากรีใช้ endpoint เดิม)

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 15:** ทดสอบ end-to-end ครบ: (1) ผู้ใช้ยังไม่ signed in ลองใช้ Smart Capture จากรูปในเส้นทาง Task เห็นข้อความบังคับ sign in ชัดเจน + fallback กรอกฟอร์มเองได้ปกติ, (2) signed in แล้วส่งรูปที่มีข้อมูลงานชัดเจน (เช่น ใบปลิว/ประกาศงานระบุชื่องาน/วันที่/เวลา/สถานที่) ได้ฟอร์ม Task เติมข้อมูลถูกต้องสมเหตุสมผลให้แก้ไขก่อนบันทึก รวมถึงฟิลด์ `location` ใหม่, (3) ส่งรูปที่ไม่มีข้อมูลหรือ AI ล้มเหลวในเส้นทาง Task เห็น error ที่เข้าใจง่ายไม่บล็อกการใช้งาน, (4) ทดสอบซ้ำเส้นทาง Event เดิมของ Sprint 13 ยืนยันว่ายังทำงานได้ปกติทุกประการ (non-regression เต็มรูปแบบ), (5) ตรวจสอบว่า API key ไม่หลุดไปฝั่ง client จริง
