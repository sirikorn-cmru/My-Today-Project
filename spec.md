# spec.md — สรุปข้อกำหนดระบบ My Today

เอกสารนี้สรุปจากการอ่าน [SCOPE.md](SCOPE.md) และโค้ดจริงในโปรเจกต์ (`src/`, `api/`) ณ วันที่ 2026-09-20 (หลัง Sprint 15) ไม่ใช่เอกสารสเปกละเอียดรายฟีเจอร์ — ดูรายละเอียดเชิงลึกได้ที่ `.docs/01-requirements/01-spec/`

## หน้าจอทั้งหมด (10 หน้า)

| Route | หน้าจอ | หน้าที่หลัก |
|---|---|---|
| `/` | Dashboard | สรุปภาพรวมวันนี้ — จำนวนงาน, ความคืบหน้า (Life Progress), การแจ้งเตือนสำคัญ, ตารางวันนี้ |
| `/tasks` | งานทั้งหมด (Tasks) | ค้นหา/กรอง/เรียงงาน, เพิ่ม/แก้ไข/ลบงาน (รองรับสแกนจากรูปภาพด้วย AI ตั้งแต่ Sprint 15) |
| `/calendar` | ปฏิทิน (Calendar) | มุมมอง วันนี้/สัปดาห์/เดือน, จัดการกิจกรรม/นัดหมาย |
| `/timeline` | Timeline | Now/Next/Later ของวันนี้ เรียงตาม Smart Priority (กฎตายตัว ไม่ใช้ AI) |
| `/files` | ไฟล์ (Files) | อัปโหลด/ดูตัวอย่าง/ดาวน์โหลด/ลบไฟล์แนบ |
| `/notifications` | การแจ้งเตือน | รายการแจ้งเตือนทั้งหมด (เลยกำหนด/ใกล้ถึงกำหนด/ใกล้ครบกำหนด) |
| `/inbox` | My Inbox | รายการที่ยังไม่จัดหมวดหมู่ (ทุกประเภท) + บันทึก/ลิงก์ที่จัดแล้ว |
| `/life-areas` | Life Area | จัดการหมวดหมู่ชีวิต (Study/Work/Finance ฯลฯ) |
| `/profile` | ข้อมูลส่วนตัว | แก้ไขโปรไฟล์ + เปิด/ปิด Cloud Sync + เข้าสู่ระบบ/สมัครสมาชิก |
| `/privacy` | นโยบายความเป็นส่วนตัว | Privacy Notice และข้อกำหนดการใช้งาน (เนื้อหาคงที่) |

**ฟีเจอร์ข้ามหน้า:** ปุ่มกลาง "+ Add to My Today" (Quick Capture) ลอยอยู่ทุกหน้า — เพิ่มงาน/กิจกรรม/ไฟล์/บันทึก/ลิงก์แบบเร็ว กรอกแค่ชื่อก็บันทึกได้ทันที (เข้า Inbox ก่อนเสมอ)

## โครงสร้างข้อมูล (Data Structures)

ทั้งหมดนิยามที่ `src/types.ts` — เก็บจริงใน LocalStorage (ยกเว้น File → IndexedDB) และ sync ขึ้น Cloud Firestore ได้แบบ opt-in (ยกเว้น File กับ Notification)

| Entity | ฟิลด์หลัก | เก็บที่ไหน | Sync ขึ้น Cloud ได้ไหม |
|---|---|---|---|
| **Task** | title, description, lifeAreaId, dueDate, dueTime, **location** (ใหม่ Sprint 15), priority, status, inInbox, linkedNoteIds, linkedLinkIds, reminderLeadTime | LocalStorage | ✅ |
| **CalendarEvent** | title, type, date, startTime, endTime, location, description, lifeAreaId, inInbox, linkedNoteIds, linkedLinkIds, reminderLeadTime | LocalStorage | ✅ |
| **FileRecord** | name, category, lifeAreaId, linkedTaskIds, linkedEventIds, mimeType, size, inInbox, blob | IndexedDB | ❌ (ต้องใช้ Firebase Storage ซึ่งยังไม่ทำ) |
| **LifeArea** | name | LocalStorage | ✅ |
| **Note** | title, content, lifeAreaId, inInbox | LocalStorage | ✅ |
| **Link** | title, url, lifeAreaId, inInbox | LocalStorage | ✅ |
| **Profile** | name, profileImage, email, preferredName, studentId, faculty, major, organization, position | LocalStorage | ✅ (record เดียว ไม่ใช่ array) |
| **NotificationItem** | kind, sourceId, level, title, message, timeLabel, read | คำนวณสดจาก Task/Event ทุกครั้ง ไม่ใช่ข้อมูลที่เก็บแยก | ❌ (เป็น derived data) |

ทุก entity ที่ sync ได้จะมี `updatedAt: string` (ใช้ last-write-wins ตอน sync ขัดแย้งกัน) และ (ยกเว้น Profile/LifeArea) มี `inInbox: boolean` สำหรับกลไก Quick Capture

## บทบาทผู้ใช้ (User Roles)

**ไม่มีระบบ Role/Admin-User** — My Today เป็นแอป Personal Daily Workspace แบบผู้ใช้เดียว มีแค่ **2 สถานะการใช้งาน** ของผู้ใช้คนเดียวกัน (ไม่ใช่บทบาทที่มีสิทธิ์ต่างกัน):

1. **ผู้ใช้ที่ยังไม่ sign in** — ใช้งานหลักได้ครบทุกอย่าง (Task/Event/File/Note/Link/Life Area/Profile) เก็บข้อมูลในเครื่องเท่านั้น
2. **ผู้ใช้ที่ sign in แล้ว** (Google หรือ Email/Password — สิทธิ์เท่ากันทุกประการ) — ได้เพิ่ม: เปิด Cloud Sync ข้ามอุปกรณ์ได้ และใช้ Smart Capture จากรูปภาพได้ (2 ฟีเจอร์นี้เป็นฟีเจอร์เดียวที่ต้อง sign in)

กฎสิทธิ์ที่บังคับจริงมีข้อเดียว: **ผู้ใช้แต่ละคนเข้าถึงได้เฉพาะข้อมูลของตัวเองบน Cloud เท่านั้น** (บังคับที่ `firestore.rules` ระดับ server ไม่ใช่แค่ UI) — ไม่มีบทบาท "ผู้ดูแลระบบ" ที่เห็นข้อมูลผู้ใช้คนอื่นได้เลย ดูรายละเอียดที่ [ACL.md](ACL.md)

## สิ่งที่ไม่ทำใน Module นี้ (Out of Scope)

- **ไม่มี AI ทั่วไป** — มีเฉพาะจุดเดียวคือ Smart Capture จากรูปภาพ (Sprint 13/15) ไม่ใช่ AI assistant/orchestrator ที่ตัดสินใจแทนผู้ใช้ ไม่ใช่จุดเริ่มต้นของ "Daily Orchestrator" ที่วางแผนไว้แยกต่างหากในอนาคต
- **ไม่มี backend ทั่วไป** — ยกเว้น Firebase (Auth + Firestore, Sprint 12) และ Vercel Serverless Function หนึ่งตัวที่เป็น proxy เก็บ Gemini API key เท่านั้น (Sprint 13/15) ไม่ใช่ REST API ทั่วไป
- **ไม่เชื่อมต่อบริการภายนอกอื่น** — ไม่มี Google Calendar, Microsoft Teams, ระบบมหาวิทยาลัย, ระบบธนาคาร, โรงพยาบาล, GPS/LMS ใดๆ ทั้งสิ้น
- **ไม่มีระบบ Role/สิทธิ์หลายระดับ** — ไม่มี Admin แยกจาก User (ดูหัวข้อบทบาทผู้ใช้ด้านบน)
- **ไม่ทำ Multi-Factor Authentication (MFA/2FA)**
- **ไม่ทำการ merge บัญชี** ระหว่าง Google Sign-In กับ Email/Password — sign in คนละวิธีด้วยอีเมลเดียวกันจะกลายเป็นคนละบัญชี
- **ไม่ทำ Email Verification** — สมัครด้วยอีเมล/รหัสผ่านแล้วใช้งานได้ทันที
- **ไม่เก็บไฟล์แนบ (File) ขึ้น Cloud** — sync ได้เฉพาะ Task/Event/Note/Link/Life Area/Profile เท่านั้น ไฟล์ยังอยู่ในเครื่องเดียว
- **ไม่ใช้คำศัพท์เฉพาะนักศึกษาเป็นฟิลด์บังคับ** เช่น "รายวิชา" — ใช้ "Life Area" แทนเสมอ

