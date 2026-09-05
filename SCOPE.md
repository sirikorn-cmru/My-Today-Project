# SCOPE.md — ขอบเขตโครงงาน My Today

เอกสารนี้สรุปขอบเขตของโครงงาน **My Today — One Life, One Workspace** ในภาพรวม สำหรับรายละเอียดเชิงลึกของแต่ละ Sprint ดูที่ `.docs/01-requirements/01-spec/` และสถานะล่าสุดที่ `.docs/01-requirements/backlog.md`

## แนวคิดหลัก (Positioning)

**My Today** เป็นเว็บแอป **Personal Daily Workspace** (ไม่มี backend, client-side only เป็นหลัก) ออกแบบตามแนวคิด Human-Centered Design เพื่อให้เปิดแอปแล้วตอบคำถามได้ทันทีว่า "วันนี้ต้องทำอะไร อะไรสำคัญ อะไรใกล้ครบกำหนด อะไรเสร็จแล้ว"

จุดยืนของโครงงาน**ไม่ใช่** "แอปจัดการ Task" (ซึ่งจะถูกเทียบกับ Todoist/Notion/Google Calendar โดยตรง) — แต่คือ: คนทั่วไปไม่ได้ขาดแอป แต่ข้อมูลชีวิตของแต่ละคนกระจัดกระจายอยู่ในแอปมากเกินไป My Today จึงจัดระบบรอบ "ชีวิตของคนคนหนึ่ง" ไม่ใช่รอบระบบที่องค์กรใดองค์กรหนึ่งออกแบบไว้

**กลุ่มผู้ใช้เป้าหมาย:** บุคคลทั่วไปที่ต้องจัดการชีวิตประจำวัน — นักศึกษา พนักงาน ครู ฟรีแลนซ์ พ่อแม่ ฯลฯ ไม่ใช่นักศึกษาเท่านั้น โดยรองรับหลายบทบาทผ่านแนวคิด **Life Area** (เช่น Study/Project/Personal หรือ Work/Finance/Family คนละชุดกันตามแต่ละคน) แทนการฝังคำศัพท์เฉพาะนักศึกษา (เช่น "รายวิชา") ลงในระบบ

## ขอบเขตที่ทำ (In Scope)

โครงงานพัฒนาแบบ sprint-by-sprint แบ่งเป็น 3 เวอร์ชัน:

### Version 1 / Core (Sprint 1-6) — เสร็จสมบูรณ์
ฟีเจอร์หลักที่ใช้งานได้แบบ local-first เต็มรูปแบบ ไม่ต้องมีบัญชี ไม่ต้องต่อเน็ต:
- Sprint 1: Today Dashboard
- Sprint 2: Task Management (จัดเก็บจริงด้วย LocalStorage)
- Sprint 3: Calendar & Schedule
- Sprint 4: File Organizer (จัดเก็บจริงด้วย IndexedDB)
- Sprint 5: Notification & Deadline Awareness
- Sprint 6: Integration/UX polish + การปฏิบัติตามกฎหมาย IT/PDPA + deploy บน Vercel

### Competition Track / Version 2 (Sprint 7-11) — เสร็จสมบูรณ์ แล้ว Freeze
ต่อยอดจาก Version 1 โดยไม่ทำลายของเดิม:
- Sprint 7: Life Area & Personal Profile (retrofit จาก "Subject" เดิม)
- Sprint 8: Universal Inbox + Quick Capture (เพิ่ม entity Note, Link)
- Sprint 9: Now/Next/Later Timeline + Smart Priority (กฎตายตัว ไม่ใช้ AI) + Life Progress
- Sprint 10: การเชื่อมโยง Task-Event-File-Note-Link ("What/When/Information" model)
- Sprint 11: ขัดเกลา UX สำหรับสาธิต แล้ว **Freeze** — หลังจากนี้ฟีเจอร์ใหม่ต้องผ่านกระบวนการ requirement intake ใหม่เท่านั้น

### Version 3 (Sprint 12 เป็นต้นไป) — เปิดผ่าน requirement intake หลัง Freeze
เพิ่มความสามารถที่แตะภายนอกเครื่องผู้ใช้เป็นครั้งแรก โดยยังคง "opt-in" และไม่กระทบผู้ใช้ที่ไม่เปิดใช้:
- **Sprint 12 — Cloud Sync:** sync ข้อมูลข้ามอุปกรณ์แบบ opt-in ผ่าน Firebase Authentication (Google Sign-In) + Cloud Firestore — **เสร็จสมบูรณ์ ยืนยันจริงแล้ว** ทั้งการ sync ข้ามอุปกรณ์และ Security Rules ผ่าน Firestore Emulator
- **Sprint 13 — Smart Capture from Image:** ให้ AI (Google Gemini vision) อ่านรูปภาพ (เช่น โปสเตอร์งาน) มาเติมฟอร์มสร้างกิจกรรมให้อัตโนมัติ ผ่าน Vercel Serverless Function ที่เก็บ API key ไว้ฝั่ง server — ต้อง sign in ก่อนใช้ (ฟีเจอร์แรกที่ปิดกั้นด้วยการล็อกอิน) — **โค้ดเสร็จแล้ว รอตั้งค่า `GEMINI_API_KEY` บน Vercel ก่อนยืนยัน Gate ให้ครบ**
- **Sprint 14 — Email/Password Login:** เพิ่มวิธีล็อกอินด้วยอีเมล/รหัสผ่านเป็นทางเลือกที่สอง คู่กับ Google Sign-In เดิม — **เสร็จสมบูรณ์ ยืนยันจริงแล้ว**

## ขอบเขตที่ไม่ทำ (Out of Scope)

หลักการทั่วไปที่ยึดถือมาตั้งแต่ Version 1/2 และยังใช้อยู่ เว้นแต่มีข้อยกเว้นเฉพาะจุดตามที่ระบุ:

- **ไม่มี AI** ในผลิตภัณฑ์หลัก (Version 1/2 ทั้งหมดใช้กฎตายตัวเท่านั้น ไม่มี machine learning) — ยกเว้นเฉพาะจุดที่ Sprint 13 เปิดไว้ (Smart Capture จากรูปภาพ) ซึ่งไม่นับเป็นจุดเริ่มต้นของ "Daily Orchestrator" ที่วางแผนไว้เป็นเฟสถัดไปในอนาคต
- **ไม่มี backend/server-side code** — แอปเป็น client-side only โดยหลัก ยกเว้น 2 จุดที่เปิดผ่าน requirement intake อย่างมีเงื่อนไข: Firebase (Auth + Firestore) ของ Sprint 12 และ Vercel Serverless Function (เฉพาะเป็น proxy เก็บ API key ของ Gemini) ของ Sprint 13
- **ไม่เชื่อมต่อบริการภายนอกอื่น** เช่น Google Calendar, Microsoft Teams, ระบบของมหาวิทยาลัย, ระบบธนาคาร, โรงพยาบาล, GPS/LMS — ไม่มีข้อยกเว้นใดๆ นอกจาก Firebase/Gemini ที่กล่าวไปแล้ว
- **ไม่ใช้คำศัพท์เฉพาะนักศึกษาเป็นฟิลด์บังคับ** เช่น "รายวิชา" — ใช้ "Life Area" แทนเสมอ ฟิลด์การศึกษา (Student ID, Faculty, Major) เป็นฟิลด์ไม่บังคับใน Personal Profile เท่านั้น
- **ไม่ทำ Multi-Factor Authentication (MFA/2FA)** และ **ไม่ทำการ merge บัญชี** ระหว่าง Google Sign-In กับ Email/Password (Sprint 14) — ถือเป็นข้อจำกัดที่ทราบและยอมรับไว้ตั้งแต่ต้น ไม่ใช่บั๊ก
- **ไม่ทำ Email Verification** สำหรับผู้ใช้ที่สมัครด้วยอีเมล/รหัสผ่าน (Sprint 14) — สมัครเสร็จใช้งาน Cloud Sync ได้ทันที

## เอกสารอ้างอิง

- รายการ Sprint ทั้งหมดพร้อมสถานะล่าสุด: [.docs/01-requirements/backlog.md](.docs/01-requirements/backlog.md)
- สเปกรายละเอียดแต่ละ Sprint: `.docs/01-requirements/01-spec/`
- คู่มือทำงานสำหรับ Claude Code: [CLAUDE.md](CLAUDE.md)
