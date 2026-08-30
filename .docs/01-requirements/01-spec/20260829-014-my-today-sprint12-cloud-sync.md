# My Today — Sprint 12: Cloud Sync (Firebase Authentication + Firestore) — จุดเริ่มต้นของ Version 3

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-012-my-today-sprint11-competition-demo-freeze]] (Sprint ก่อนหน้า, Freeze ของ Competition Track/Version 2), [[20260806-008-my-today-functional-requirements-master]]

## หมายเหตุตำแหน่งใน Roadmap — ทำไมไม่ใช่การฝ่าฝืน Freeze ของ Sprint 11

Sprint 11 ([[20260806-012-my-today-sprint11-competition-demo-freeze]]) ปิดท้ายด้วย Business Rule ข้อ 4 ที่เขียนไว้ตรงๆ ว่า **"หลัง Sprint นี้คือ Freeze — ไม่รับ Feature request ใหม่เข้า Version 2 อีก ฟีเจอร์ใดๆ หลังจากนี้ถือเป็น Phase/Version ถัดไป (ต้องผ่าน requirement intake ใหม่)"**

Sprint 12 นี้คือการใช้ช่องทางที่ Freeze rule เปิดไว้เองตรงๆ — ผ่านกระบวนการ `requirement-intake` ใหม่ตามที่ระบุไว้ — ไม่ใช่การฝ่าฝืน Freeze แต่อย่างใด และ**ไม่ใช่ pattern เดียวกับข้อยกเว้น Business Rule ของ Sprint 6/11** (ที่แอบเพิ่ม feature ใหม่เข้าไปใน Sprint ที่ตัวเองประกาศ "ห้ามเพิ่ม Feature ใหม่" โดยอ้างเหตุผลเฉพาะหน้า เช่น Privacy Notice ของ Sprint 6 หรือ IndexedDB Quota-Warning ของ Sprint 11) — Sprint 12 ไม่ได้ถูกยัดเข้าไปใน Sprint 11 หรือ Version 2 แต่อย่างใด แต่เป็น**จุดเริ่มต้นของเฟสใหม่ทั้งเฟส** ที่ประกาศชื่ออย่างเป็นทางการว่า **"My Today — Version 3"** สืบเนื่องจาก:

- **Version 1 / Core** (Sprint 1-6, "Personal Daily Workspace" พื้นฐาน — Today Dashboard, Task, Calendar, File, Notification, Integration/UX/Legal)
- **Version 2 / Competition Track** (Sprint 7-11, "One Life, One Workspace" — Life Area, Universal Inbox, Timeline/Priority/Progress, Task-Event-File-Note-Link linking, Competition Demo แล้ว Freeze)
- **Version 3** (เริ่มที่ Sprint 12 นี้ — Cloud Sync เป็น Sprint แรก) — เฟสใหม่ที่เปิดหลังผ่าน requirement intake ตามที่ Freeze rule ของ Sprint 11 อนุญาตไว้เอง

จึงไม่มีความสับสนว่าเอกสารนี้ "แอบเพิ่ม feature เข้า Version 2" — Sprint 12 อยู่นอก Version 2 โดยสมบูรณ์

## เป้าหมาย

เพิ่มความสามารถ sync ข้อมูลข้ามอุปกรณ์/สำรองข้อมูล (cloud backup) ผ่าน **Firebase Authentication + Cloud Firestore** แบบ **"เสริม ไม่แทน"** สถาปัตยกรรม local-first เดิม (LocalStorage/IndexedDB) — ผู้ใช้ที่ไม่เปิดใช้ฟีเจอร์นี้ต้องใช้งานแอปได้เหมือนเดิมทุกประการ 100% รวมถึงตอน offline

โปรเจกต์มี Firebase project ที่สร้างไว้แล้วรอใช้งานจริง (`projectId: "my-today-a25d9"`) — รายละเอียด configuration (apiKey ฯลฯ) เป็นรายละเอียดระดับ implementation ไม่ใช่ requirement จึงไม่ระบุในเอกสารนี้

## Feature Requirements / User Stories

- ในฐานะผู้ใช้ ฉันต้องการ Sign in ด้วย Google Account เพื่อเปิดใช้ความสามารถ sync ข้อมูลของฉันขึ้น cloud
- ในฐานะผู้ใช้ ฉันต้องการให้ sync เป็นตัวเลือกที่ฉันเปิดเองได้ (opt-in) ไม่ใช่ถูกบังคับทันทีที่ login เพื่อรักษาสิทธิ์ที่จะไม่ให้ข้อมูลออกจากเครื่องถ้าฉันไม่ต้องการ
- ในฐานะผู้ใช้ที่เปิด sync แล้ว ฉันต้องการให้ Task/Event/Note/Link/Life Area/Profile ของฉัน sync ขึ้น Firestore โดยอัตโนมัติแบบ background เพื่อให้เข้าถึงข้อมูลเดียวกันได้จากอุปกรณ์อื่น
- ในฐานะผู้ใช้ ฉันต้องการเห็นสถานะ sync (สำเร็จ/กำลัง sync/ผิดพลาด) เพื่อรู้ว่าข้อมูลของฉันปลอดภัยแล้วหรือไม่
- ในฐานะผู้ใช้ ฉันต้องการให้แอปยังทำงานได้ปกติแม้ sync ล้มเหลว (เช่น ไม่มีเน็ต) โดยไม่บล็อกการใช้งานหลัก

## Business Rules

1. **Local-first เสมอ:** LocalStorage/IndexedDB ยังเป็น source of truth หลัก ทุกการเขียนข้อมูลต้องเขียนลง local ก่อนเสมอ แล้วค่อย sync ไป Firestore แบบ background/best-effort — ห้ามให้การ sync ไป Firestore เป็นเงื่อนไขบล็อกการบันทึกข้อมูล local
2. **Sync เป็น opt-in เท่านั้น:** ปิดอยู่โดย default แม้ login ด้วย Google แล้วก็ตาม ผู้ใช้ต้องกดเปิดเองในหน้า Profile ถึงจะเริ่ม sync ข้อมูลจริง
3. **ขอบเขต entity ที่ sync ในรอบนี้:** Task, CalendarEvent, Note, Link, LifeArea, Profile เท่านั้น (6 entity ที่เป็น pure structured data ไม่มี blob) — Notification ไม่ต้อง sync เพราะเป็น derived data ที่คำนวณจาก tasks/events อยู่แล้ว (ตาม `useNotifications`/`notificationUtils.ts` เดิม)
4. **FileRecord ไม่อยู่ในขอบเขต Sprint นี้:** เพราะมี blob ขนาดใหญ่ ต้องใช้ Firebase Storage แยกต่างหาก ไม่ใช่ Firestore (Firestore จำกัด 1MB/document) — เก็บไว้เป็น future work แยก initiative
5. **Auth provider:** Google Sign-In เท่านั้นในรอบนี้ (ผ่าน Firebase Authentication) — ไม่ทำ Email/Password ในรอบนี้
6. **Firestore data model:** เก็บข้อมูลแยกตาม user ใต้ path `users/{uid}/{collection}/{id}` (เช่น `users/{uid}/tasks/{taskId}`) เพื่อให้ Security Rules จำกัดสิทธิ์ต่อ user ได้ตรงไปตรงมา
7. **Security Rules:** ต้องจำกัดให้ `request.auth.uid` ตรงกับ path ของ document เท่านั้นถึงจะอ่าน/เขียนได้ (ผู้ใช้คนอื่นห้ามเห็น/แก้ข้อมูลของกันและกันเด็ดขาด) ต้องทดสอบด้วย Firebase Emulator ก่อน deploy กฎจริงขึ้น production
8. **Conflict resolution:** ใช้ last-write-wins ด้วย timestamp เป็นนโยบายเดียวในรอบนี้ (ยอมรับความเสี่ยงที่ระบุไว้ชัดว่า: ถ้าแก้ข้อมูลเดียวกันพร้อมกันจาก 2 อุปกรณ์ ฉบับที่ sync ทีหลังจะทับฉบับก่อนหน้า ไม่มีการ merge แบบ field-by-field ในรอบนี้)
9. **ไม่กระทบ non-regression ของ Sprint 1-11:** ผู้ใช้ที่ไม่เปิด sync ต้องไม่เห็นการเปลี่ยนแปลงพฤติกรรมใดๆ ของแอปเลย

## ขอบเขต (Scope)

### In scope

- Firebase Authentication ด้วย Google Sign-In (หน้า Login/Logout)
- Firestore sync สำหรับ Task, CalendarEvent, Note, Link, LifeArea, Profile (ทั้ง 2 ทิศทาง: push ข้อมูล local ขึ้น cloud, และ pull ข้อมูลจาก cloud ตอน login บนอุปกรณ์ใหม่)
- UI เปิด/ปิด sync ในหน้า Profile + sync status indicator (สำเร็จ/กำลัง sync/ผิดพลาด) ใช้ pattern เดียวกับ error banner ที่มีอยู่แล้วใน `useFiles`/`FilesPage`
- Firestore Security Rules จำกัดสิทธิ์ต่อ user + ทดสอบด้วย Firebase Emulator
- อัปเดต CLAUDE.md ส่วน "client-side only by design" ให้สะท้อนว่ามี optional cloud sync layer แล้ว (ยังคง local-first เป็นหลัก)
- เขียน Privacy Notice (`/privacy`, มาจาก Sprint 6) ใหม่ให้ครอบคลุมทั้ง 2 สถานะ: ตอนไม่เปิด sync (ข้อความเดิมยังจริงอยู่ — ข้อมูลอยู่ในเครื่องเท่านั้น) และตอนเปิด sync แล้ว (ต้องระบุว่ามี third-party processor คือ Google Firebase/Firestore ประมวลผลข้อมูลส่วนบุคคล)
- บันทึกใน Project purpose ว่า "integration with any external service" ที่เคยเป็น out-of-scope ทั้งระบบ มีข้อยกเว้นเฉพาะ Firebase Auth+Firestore ของ Sprint 12/Version 3 นี้เท่านั้น ไม่เปิดกว้างบริการภายนอกอื่น

### Out of scope (ห้ามทำใน Sprint นี้)

- File/blob sync ผ่าน Firebase Storage (future work แยก initiative)
- Email/Password authentication (เฉพาะ Google Sign-In เท่านั้นในรอบนี้)
- Real-time multi-device collaboration (เห็นการแก้ไขของอุปกรณ์อื่นแบบ live ทันที) — sync แบบ eventual consistency พอ
- Conflict resolution ที่ซับซ้อนกว่า last-write-wins (เช่น merge เนื้อหาแบบ field-by-field)
- AI, Chatbot, บริการภายนอกอื่นนอกจาก Firebase Auth+Firestore

## Acceptance Criteria

- ผู้ใช้ที่ไม่เคย login เลย ใช้งานแอปได้ปกติทุกฟีเจอร์เหมือนก่อน Sprint 12 ทุกประการ (non-regression เต็มรูปแบบ)
- ผู้ใช้ Sign in ด้วย Google ได้สำเร็จ
- หลัง login แล้ว sync ยังปิดอยู่โดย default จนกว่าผู้ใช้จะกดเปิดเองในหน้า Profile
- เมื่อเปิด sync แล้ว: สร้าง/แก้/ลบ Task บนอุปกรณ์ A แล้วเปิดแอป login เดียวกันบนอุปกรณ์ B เห็นข้อมูลเดียวกัน (ทดสอบอย่างน้อย Task เป็นตัวแทน entity อื่น)
- ปิด network แล้วใช้งานแอป (สร้าง/แก้ Task) ยังทำงานได้ปกติ ไม่ error, ข้อมูล sync ไปเมื่อเน็ตกลับมา
- Firestore Security Rules ป้องกันไม่ให้ user A อ่าน/เขียนข้อมูลของ user B ได้ (ทดสอบผ่าน Firebase Emulator)
- หน้า Privacy Notice อัปเดตแล้วครอบคลุมทั้ง 2 สถานะ (sync ปิด/เปิด) ชัดเจน

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 12:** ทดสอบ end-to-end ครบ: (1) ผู้ใช้ที่ไม่เปิด sync ใช้งานแอปได้ปกติทุกอย่าง (regression check เต็มรูปแบบเทียบ Sprint 1-11), (2) Sign in ด้วย Google สำเร็จ, (3) เปิด sync แล้วสร้างข้อมูลบนอุปกรณ์หนึ่งเห็นบนอีกอุปกรณ์หนึ่งจริง, (4) offline แล้วใช้งานได้ปกติและ sync กลับมาเองเมื่อเน็ตกลับมา, (5) Security Rules ทดสอบผ่าน Emulator ว่า user อื่นเข้าข้อมูลกันไม่ได้
