# My Today — Sprint 13: Smart Capture จากรูปภาพ (AI Image Analysis สำหรับ Quick Capture ประเภท Event) — Version 3

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260829-014-my-today-sprint12-cloud-sync]] (Sprint ก่อนหน้าใน Version 3, ให้ Firebase Auth ที่ Sprint นี้ใช้เป็น gate), [[20260806-012-my-today-sprint11-competition-demo-freeze]] (Freeze rule ของ Version 2 ที่เปิดช่องทางเข้าถึง Version 3 ผ่าน requirement intake ใหม่), [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]] (Quick Capture เดิมที่ Sprint นี้ต่อยอด เฉพาะประเภท Event เท่านั้น)

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint ที่ 2 ของ **Version 3** ต่อจาก Sprint 12 ([[20260829-014-my-today-sprint12-cloud-sync]], Cloud Sync) — เข้าเงื่อนไขเดียวกันคือผ่าน `requirement-intake` ใหม่ตามช่องทางที่ Freeze rule ของ Sprint 11 ([[20260806-012-my-today-sprint11-competition-demo-freeze]]) เปิดไว้เอง ไม่ใช่การฝ่าฝืน Freeze ของ Version 2 แต่อย่างใด

## หมายเหตุสำคัญ — นี่ไม่ใช่ "Daily Orchestrator" และไม่ใช่การเปิดกฎ "ไม่มี AI" ทั้งระบบ

Project purpose ของโปรเจกต์ระบุมาตั้งแต่ Sprint 1 ว่า **AI อยู่นอกขอบเขตทั้งหมด** ยกเว้นในอนาคตหลัง Freeze อาจมี "Daily Orchestrator" (ผู้ช่วยสรุปภาพรวมวัน/จัดข้อมูล Inbox แบบ AI) เป็น Phase แยกต่างหาก — **Sprint 13 นี้ไม่ใช่และไม่นับเป็นจุดเริ่มต้นของ Daily Orchestrator ดังกล่าว** สองเรื่องนี้ไม่เกี่ยวข้องกัน:

- Daily Orchestrator (ที่จองชื่อไว้ใน Project purpose) คือ AI assistant ที่ช่วยตัดสินใจ/สรุปภาพรวม/จัดลำดับความสำคัญให้ผู้ใช้ในภาพกว้าง
- Sprint 13 นี้จำกัดขอบเขตแคบมากเพียงจุดเดียว: **สกัดข้อมูล Event จากรูปภาพเดียวที่ผู้ใช้เลือกเอง** (ชื่องาน/วันที่/เวลา/สถานที่) มาเติมฟอร์ม Quick Capture ประเภท Event ให้ ไม่ใช่ AI assistant/orchestrator ทั่วไป ไม่ตัดสินใจแทนผู้ใช้ ไม่วิเคราะห์ข้อมูลอื่นใดนอกจากภาพที่ป้อนเข้ามาโดยตรง

หากในอนาคตมีการพัฒนา Daily Orchestrator จริง ต้องผ่าน requirement intake ของตัวเองแยกต่างหาก จะไม่ถือว่า Sprint 13 นี้เป็น "AI feature แรก" ที่เปิดทางให้ Daily Orchestrator ตามมาอัตโนมัติ

## เป้าหมาย

เพิ่มวิธี "+ Add to My Today" แบบใหม่ สำหรับ Quick Capture ประเภท **"กิจกรรม (Event)" เท่านั้น** — ผู้ใช้ส่งรูปภาพ (เช่น โปสเตอร์งาน/บัตรเชิญ/ประกาศนัดหมาย) ให้ AI วิเคราะห์แล้วสกัดข้อมูล (ชื่องาน, วันที่, เวลา, สถานที่) มาเติมฟอร์ม Quick Capture ของ Event ให้อัตโนมัติ โดยผู้ใช้ต้องตรวจสอบ/แก้ไขก่อนบันทึกจริงเสมอ

## Feature Requirements / User Stories

- ในฐานะผู้ใช้ที่ signed in แล้ว ฉันต้องการถ่าย/เลือกรูปภาพ แล้วให้ระบบช่วยกรอกฟอร์ม "กิจกรรม (Event)" ของ Quick Capture ให้อัตโนมัติ เพื่อประหยัดเวลาไม่ต้องพิมพ์เอง
- ในฐานะผู้ใช้ ฉันต้องการเห็นและแก้ไขข้อมูลที่ AI สกัดมาได้ก่อนบันทึกจริงเสมอ เพื่อแก้ไขกรณี AI เข้าใจผิด
- ในฐานะผู้ใช้ที่ยังไม่ signed in ฉันต้องการเห็นข้อความชัดเจนว่าต้อง sign in ก่อนถึงจะใช้ฟีเจอร์นี้ได้ (ไม่ใช่แค่ error ที่เข้าใจยาก)
- ในฐานะผู้ใช้ ฉันต้องการให้รูปที่ส่งไปไม่ถูกเก็บไว้ที่ไหนถาวรโดยไม่จำเป็น เพื่อความเป็นส่วนตัว

## Business Rules

1. **ขอบเขตประเภทข้อมูล:** ใช้ได้เฉพาะ Quick Capture ประเภท "กิจกรรม (Event)" เท่านั้น จาก 5 ประเภทเดิม (Task/Event/File/Note/Link ตาม [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]]) — อีก 4 ประเภทไม่เปลี่ยนแปลงพฤติกรรมใดๆ เลย
2. **AI แนะนำ ไม่ใช่ AI ตัดสินใจแทน:** ข้อมูลที่ AI สกัดจากภาพ (ชื่องาน, วันที่, เวลา, สถานที่) ต้องเข้าไปเติมในฟอร์ม Quick Capture ของ Event ให้ผู้ใช้เห็น/ตรวจสอบ/แก้ไขได้ก่อนเสมอ — ห้าม auto-submit ตรงๆ โดยไม่ให้ผู้ใช้ยืนยันก่อนเด็ดขาด
3. **ต้อง sign in ก่อนใช้งาน:** ต้อง sign in ด้วย Google (ผ่าน Firebase Auth เดียวกับ [[20260829-014-my-today-sprint12-cloud-sync|Sprint 12]]) ก่อนถึงจะใช้ Smart Capture จากรูปได้ — เป็นเงื่อนไข gatekeeping ป้องกันการเรียกใช้ AI API แบบไม่จำกัด/ไม่มีตัวตน **นี่คือครั้งแรกที่ My Today มี feature ที่ "ต้อง sign in ถึงจะใช้ได้"** ซึ่งเป็นข้อยกเว้นเฉพาะจุดต่อ positioning เดิมที่ Quick Capture ทุกอย่างไม่ต้องมีบัญชี — ข้อยกเว้นนี้จำกัดเฉพาะฟีเจอร์นี้เท่านั้น Quick Capture อีก 4 ประเภทเดิม (Task/Event ปกติ/File/Note/Link) ยังคงไม่ต้อง sign in เหมือนเดิมทุกประการ ไม่กระทบ positioning "ไม่ต้องมีบัญชี" ของแอปในภาพรวม
4. **สถาปัตยกรรมการเรียก AI อย่างปลอดภัย — Vercel Serverless Function:** โปรเจกต์นี้ deploy บน Vercel อยู่แล้ว (มี `vercel.json`) — ใช้ Vercel Serverless Function ใหม่เป็นตัวกลางเก็บ API key ของ AI (เป็น environment variable ฝั่ง Vercel เท่านั้น ไม่หลุดไป client เด็ดขาด) client ส่งรูปภาพไปที่ endpoint นี้ → function เรียก AI vision API ต่อ → ส่งผลลัพธ์ที่สกัดแล้วกลับมาที่ client — **นี่คือข้อยกเว้นใหม่ต่อกฎ "ไม่มี backend" ที่แยกต่างหากจาก exception ของ Firebase ใน Sprint 12** (Firebase เป็น Backend-as-a-Service ยกเว้นแบบหนึ่งสำหรับ Cloud Sync, Vercel Serverless Function เป็น exception อีกแบบหนึ่งสำหรับ AI proxy — คนละเหตุผลคนละกลไก ไม่ใช่การขยาย exception เดิม) — อ้างอิง precedent การยกเว้นกฎแบบมีเหตุผลเจาะจงที่เคยทำมาก่อน: Sprint 6 (Privacy Notice), Sprint 11 (Quota-Warning), Sprint 12 (Firebase) — นี่คือ exception ข้อที่ 2 ต่อกฎ "ไม่มี backend" ของโปรเจกต์
5. **AI provider ไม่ผูกเจาะจง:** ต้องเป็น vision-capable/multimodal model ที่วิเคราะห์ภาพได้ — เลือกผู้ให้บริการตอน implement จริงตามความเหมาะสม ไม่ผูกกับเจ้าใดเจาะจงในสเปกนี้
6. **Image handling แบบ ephemeral ไม่ persist:** ไม่เก็บรูปภาพถาวรที่ไหนเลย (ไม่ใช้ Firebase Storage ไม่ใช่ Vercel Blob) — ส่งรูปจาก client ไป Vercel function ไป AI API แล้วส่งผลลัพธ์ (text fields) กลับมาเท่านั้น เป็นการประมวลผลชั่วคราว — ถ้าผู้ใช้อยากเก็บรูปนั้นไว้เป็นไฟล์แนบของ Event ต้องทำผ่านฟีเจอร์ "แนบไฟล์" เดิมของ Sprint 4 เอง ไม่ได้ทำให้อัตโนมัติในรอบนี้
7. **Non-regression:** Quick Capture ประเภท Task/File/Note/Link ต้องไม่เปลี่ยนแปลงพฤติกรรมใดๆ เลย (ไม่ต้อง sign in เหมือนเดิม) — Sprint 1-12 ทั้งหมดต้องไม่ถูกกระทบ
8. **Error handling:** ถ้า AI วิเคราะห์ภาพไม่สำเร็จ (ภาพไม่ชัด/ไม่มีข้อมูลที่เกี่ยวข้อง/AI service ล่ม/เน็ตหลุด) ต้องแสดง error message ที่เข้าใจง่ายและให้ผู้ใช้กรอกฟอร์ม Event ด้วยตัวเองตามปกติได้ทันที ไม่บล็อกการใช้งาน

## ขอบเขต (Scope)

### In scope

- ตัวเลือกใหม่ในหน้า `QuickCaptureModal` ประเภท "กิจกรรม (Event)" — เพิ่มปุ่ม/ตัวเลือก "สแกนจากรูปภาพ" (เช่น icon กล้อง) นอกเหนือจากการกรอกฟอร์มเปล่าแบบเดิม
- Vercel Serverless Function ใหม่ (เช่น `/api/smart-capture`) รับรูปภาพ เรียก AI vision API เก็บ API key เป็น environment variable ฝั่ง Vercel เท่านั้น ส่งผลลัพธ์ (title/date/time/location ที่สกัดได้) กลับมา
- Gate ด้วย Firebase Auth: ต้อง sign in ก่อนถึงจะเห็น/ใช้ตัวเลือกนี้ได้ — ถ้ายังไม่ signed in ให้แสดงข้อความชัดเจนพร้อมทางไป sign in (ลิงก์ไปหน้า Profile)
- Error handling ครบตาม Business Rule ข้อ 8

### Out of scope (ห้ามทำในรอบนี้)

- ใช้กับ Quick Capture ประเภทอื่น (Task/File/Note/Link) — เฉพาะ Event เท่านั้น
- เก็บรูปภาพถาวรเป็นไฟล์แนบอัตโนมัติ
- Daily Orchestrator หรือ AI capability อื่นใดนอกเหนือจากการสกัดข้อมูล Event จากรูปภาพ (ดูหมายเหตุสำคัญด้านบน)
- Real-time/streaming analysis, การวิเคราะห์วิดีโอ, หรือ input ที่ไม่ใช่รูปภาพนิ่ง

## Acceptance Criteria

- ผู้ใช้ที่ signed in แล้วเลือกรูปภาพที่มีข้อมูลงาน/กิจกรรมชัดเจน (เช่น โปสเตอร์งานสัมมนาระบุวันที่/เวลา/สถานที่) แล้วเห็นฟอร์ม Event ถูกเติมข้อมูลที่สกัดได้อัตโนมัติ ก่อนกดยืนยันบันทึกจริง
- ผู้ใช้แก้ไขข้อมูลที่ AI เติมมาได้ก่อนบันทึกเสมอ
- ผู้ใช้ที่ยังไม่ signed in เห็นข้อความชัดเจนว่าต้อง sign in ก่อนถึงจะใช้ฟีเจอร์นี้ได้ ส่วน Quick Capture ประเภทอื่นยังใช้ได้ปกติโดยไม่ต้อง sign in
- API key ของ AI ไม่ปรากฏในโค้ด client ฝั่งเบราว์เซอร์เลย (ตรวจสอบผ่าน network request/source code)
- ส่งรูปที่ไม่มีข้อมูลเกี่ยวข้องหรือภาพไม่ชัด แล้วเห็น error message ที่เข้าใจง่าย และยังกรอกฟอร์ม Event ด้วยตัวเองต่อได้ตามปกติ
- Quick Capture ประเภท Task/File/Note/Link ยังทำงานได้ปกติทุกอย่างโดยไม่ต้อง sign in (non-regression)

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 13:** ทดสอบ end-to-end ครบ: (1) ผู้ใช้ยังไม่ signed in ใช้ Quick Capture 4 ประเภทเดิมได้ปกติ + เห็นข้อความชัดเจนเมื่อลองใช้ Smart Capture จากรูป, (2) signed in แล้วส่งรูปที่มีข้อมูลชัดเจน ได้ฟอร์ม Event เติมข้อมูลถูกต้องสมเหตุสมผลให้แก้ไขก่อนบันทึก, (3) ส่งรูปที่ไม่มีข้อมูลหรือ AI ล้มเหลว เห็น error ที่เข้าใจง่ายไม่บล็อกการใช้งาน, (4) ตรวจสอบว่า API key ไม่หลุดไปฝั่ง client จริง
