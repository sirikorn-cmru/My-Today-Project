# Test Result — Full App Smoke Test (รอบสุดท้ายก่อนส่งงาน 2026-09-21)

เชื่อมโยงกลับ: [../../spec.md](../../spec.md), [../01-test-plan/20260823-nfr-test-plan.md](../01-test-plan/20260823-nfr-test-plan.md), [20260921-full-app-smoke-test-rerun-result.md](20260921-full-app-smoke-test-rerun-result.md)

## ขอบเขตของเอกสารนี้

รัน **Smoke Test ทั้งแอปใหม่ทั้งหมดตั้งแต่ต้น (37 เคส, TC-01 ถึง TC-37)** เพื่อยืนยันสถานะล่าสุดของโค้ด **หลังจาก** การเปลี่ยนแปลง 5 จุดที่ระบุไว้ในโจทย์ (ดูหัวข้อ "จุดที่ให้ความสำคัญเป็นพิเศษ" ด้านล่าง) — รายงานฉบับก่อนหน้า (`20260921-full-app-smoke-test-rerun-result.md`, รันเวลา 06:36–06:52 น.) รันก่อนการเปลี่ยนแปลงเหล่านี้ ผลจึงถือว่าล้าสมัยและ **ไม่ได้คัดลอกผลจากรายงานนั้นมาใช้** ทุกเคสถูกรันจริงใหม่ทั้งหมดในรอบนี้

ครอบคลุม 10 หน้าจอตามตาราง "หน้าจอทั้งหมด" ใน `spec.md` ที่ root repo บวกฟีเจอร์ข้ามหน้า Quick Capture ทดสอบกับ **local dev server เท่านั้น** (`npm run dev` ผ่าน launch config `my-today-dev`, `http://localhost:5173`, ยืนยันจาก `preview_logs` ว่า Vite พร้อมใช้งานโดยไม่มี build error ทั้งก่อนและหลังการทดสอบ) — **ไม่ได้ทดสอบกับ URL production ตามข้อกำหนดของโจทย์** วันที่ทดสอบ **2026-09-21** ผู้ทดสอบเข้าถึงแอปผ่านเบราว์เซอร์อัตโนมัติ (ควบคุมผ่าน MCP browser tool) ทดสอบแบบ end-to-end จริงในเบราว์เซอร์ทุกเคส ไม่ได้อ่านโค้ดแล้วอนุมานผล

**ข้อจำกัดที่บังคับไว้อย่างเคร่งครัดในรอบนี้ (ห้ามแตะบัญชี Firebase production จริง):** ไม่ sign in จริง, ไม่สร้างบัญชีจริง, **ไม่กรอกอีเมล/รหัสผ่านใดๆ ทั้งสิ้นแม้แต่ค่าปลอม** (เพราะฟอร์มนี้ยิงไปที่ Firebase Auth ของ production จริงแม้จะรันบน dev server), และไม่กดเปิด Cloud Sync toggle ที่ใดเลย — ทดสอบเฉพาะสถานะ "ยังไม่ได้ sign in" (sign-in gate ของ Smart Capture ทั้ง Task/Event, fallback "กรอกฟอร์มเองแทน", และ UI สถานะยังไม่ sign in ของ Cloud Sync card) รายการที่ต้องมีบัญชีจริงบันทึกเป็น **"ไม่ได้ทดสอบ (ต้องมีบัญชีจริง — อยู่นอกขอบเขตรอบนี้โดยเจตนา)"**

## จุดที่ให้ความสำคัญเป็นพิเศษ (การเปลี่ยนแปลงตั้งแต่รอบก่อนหน้า)

| # | การเปลี่ยนแปลง | ผลการตรวจสอบในรอบนี้ |
|---|---|---|
| 1 | `src/pages/ProfilePage.tsx` — ย้าย Cloud Sync card ขึ้นมาอยู่เหนือฟอร์มโปรไฟล์, เปลี่ยนสลับโหมด sign-in/sign-up เป็น segmented tab (`role="tablist"`/`role="tab"` + `aria-selected`), เพิ่มข้อความช่วยเหลือใต้ tab ที่เปลี่ยนตามโหมด | **ยืนยันถูกต้องครบทุกจุด** (ดู TC-26..29) — Cloud Sync card อยู่เหนือฟอร์มโปรไฟล์จริงในโครงสร้าง DOM, `role=tablist`/`role=tab` มีจริงพร้อม `aria-selected` สลับ true/false ถูกต้องเมื่อคลิก, ข้อความช่วยเหลือเปลี่ยนจาก "มีบัญชีอยู่แล้ว..." เป็น "ยังไม่มีบัญชี..." เมื่อสลับโหมด, ปุ่ม submit เปลี่ยนข้อความจาก "เข้าสู่ระบบด้วยอีเมล" เป็น "สมัครสมาชิก", และ "ลืมรหัสผ่าน?" หายไปเมื่ออยู่โหมดสมัครสมาชิก (ตรวจด้วย DOM query ตรงๆ ไม่ใช่การอ่านโค้ด) |
| 2 | `src/hooks/useAuth.ts` — เปลี่ยนข้อความ error `auth/invalid-credential` | **ไม่ได้ทดสอบ (ต้องมีบัญชีจริง)** — การจะเห็นข้อความนี้ต้องกรอกอีเมล/รหัสผ่านแล้วกด submit จริงซึ่งจะยิง request ไปที่ Firebase Auth ของ production ทันที ขัดกับข้อจำกัดเรื่องห้ามกรอกอีเมล/รหัสผ่านใดๆ ของโจทย์นี้โดยตรง จึงไม่ได้ลองแม้แต่ค่าอีเมล/รหัสผ่านปลอม |
| 3 | `src/hooks/useCloudSync.ts` — โหลด `cloudSync` module ผ่าน dynamic `import()` พร้อมข้อความ error ภาษาไทยเฉพาะเมื่อโหลด chunk ไม่สำเร็จ | **ไม่ได้ทดสอบโดยตรง (นอกขอบเขต)** — การกระตุ้น error นี้ต้องจำลองการโหลด chunk ล้มเหลว (ตัดเครือข่าย) หรือเปิด Cloud Sync จริงซึ่งทั้งคู่อยู่นอกขอบเขตที่อนุญาต แต่ตรวจแล้วว่า**ไม่มี console error ใดๆ เกิดขึ้นเลยตลอดการทดสอบทั้งหมด**ในสถานะยังไม่ sign in ซึ่งเป็นสัญญาณทางอ้อมว่าการเปลี่ยนเป็น dynamic import ไม่ได้ทำให้แอปพังในสถานะปกติ |
| 4 | `src/lib/firebase.ts` / `src/lib/cloudSync.ts` — ย้าย `getFirestore()` ออกจาก `firebase.ts` ไปไว้ที่ `cloudSync.ts` | **ยืนยันทางอ้อมว่าไม่กระทบ** — แอปทั้งหมดโหลดและทำงานได้ปกติทุกหน้า ไม่มี console error ที่เกี่ยวกับ Firebase import ใดๆ (Firestore เองไม่ถูกเรียกใช้จริงเพราะ Cloud Sync ปิดอยู่โดยค่าเริ่มต้นตามที่โจทย์กำหนดให้เป็น) |
| 5 | `vite.config.ts` — เพิ่ม vendor chunk splitting ผ่าน `manualChunks` | **สังเกตไม่ได้ผ่าน dev server (ข้อจำกัดของวิธีทดสอบ ไม่ใช่บั๊ก)** — `manualChunks` มีผลเฉพาะตอน `vite build` (production build) เท่านั้น ไม่มีผลกับ `npm run dev` ซึ่งเป็น build ที่โจทย์กำหนดให้ทดสอบในรอบนี้ จึงไม่สามารถสังเกตพฤติกรรมการแบ่ง chunk ได้จริงจากรอบทดสอบนี้ — ต้องรันกับ `npm run build` + `npm run preview` เพื่อตรวจสอบจุดนี้โดยเฉพาะในรอบถัดไป |

## เวลาที่ทดสอบ (นาฬิกาของหน้าเว็บเอง, UTC → เวลาไทย UTC+7)

- เริ่มรัน: `2026-09-21T01:54:35.977Z` UTC = **2026-09-21 08:54:35 น.** เวลาไทย
- สิ้นสุดรัน: `2026-09-21T02:10:30.384Z` UTC = **2026-09-21 09:10:30 น.** เวลาไทย (รวมเวลาทดสอบจริง ~16 นาที)
- Checkpoint รายหมวด (ดึงจาก `createdAt`/`updatedAt` จริงของ record ที่สร้าง/แก้ในแต่ละหมวดหมู่ ไม่ใช่เวลาประมาณ):

| หมวด | เวลา (ไทย, UTC+7) | หลักฐาน |
|---|---|---|
| Dashboard (TC-01) | 08:54:35 | นาฬิกาเริ่มรัน |
| Tasks (TC-02..06) | 08:56:01 | `QA Smoke Test Task-F.createdAt` |
| Calendar (TC-07..10) | 08:57:37 | `QA Smoke Test Event-F.createdAt` |
| Timeline (TC-11) | ~08:57:48 | นาฬิกาหน้าเว็บ ระหว่างช่วง Calendar/Timeline |
| Files (TC-12..14) | 08:58:44 | ไฟล์ `qa-smoke-upload-f.txt.createdAt` ใน IndexedDB (`my-today` DB, `files` store) |
| Notifications (TC-15..17) | ~08:58:51 – 08:59:49 | นาฬิกาหน้าเว็บ ระหว่างช่วง Notifications |
| Inbox + Quick Capture (TC-18..21, 31..37) | 08:59:49 – 09:02:10 | `QA Quick Capture Task/Event-F.createdAt`, ไฟล์ `qa-quickcapture-file-f.txt.createdAt` |
| Life Areas + Cascade Delete (TC-22..25) | 09:08:02 | `updatedAt` ของ Task/Event/Note/Link ที่ถูกเคลียร์ `lifeAreaId` พร้อมกันหลังลบ Life Area |
| Profile (TC-26..29) | 09:09:25 | `profile.updatedAt` |
| Privacy (TC-30) | 09:10:07 | นาฬิกาหน้าเว็บ |
| สิ้นสุดรัน | 09:10:30 | นาฬิกาสิ้นสุดรัน |

**สถานะข้อมูลทดสอบก่อนเริ่ม:** ตามที่โจทย์ระบุ — dev server เพิ่งถูกรีเซ็ตเป็น seed-only data (7 seed tasks, 4 seed events, 4 seed files, 5 Life Areas, Inbox ว่างเปล่า, โปรไฟล์ว่างเปล่า) ยืนยันตรงจริงจากผลทดสอบ TC-01/02/07/12/22/26 ก่อนเริ่มสร้างข้อมูลใหม่ ทุกอย่างที่สร้างในรอบนี้ใช้ชื่อใหม่ต่อท้ายด้วย `-F` ตามที่โจทย์กำหนด ไม่ได้ล้างข้อมูลเดิมใดๆ

## เทคนิคที่ใช้แก้ข้อจำกัดของเครื่องมือทดสอบ (ตามที่ระบุไว้ในภาคผนวกของรอบก่อนหน้า)

1. **Native `window.confirm()` ถูกปิดใช้งานโดยเครื่องมือ browser automation เอง** (ค่าเริ่มต้นคือ "ยกเลิก" เสมอ, ยืนยันจาก Console warning `"native JavaScript dialogs are disabled..."`) — ใช้พฤติกรรมเริ่มต้นทดสอบ TC-05 (delete-then-cancel) ได้ตรงไปตรงมา และ stub `window.confirm = () => true` ก่อนกดปุ่มลบจริงเมื่อต้องทดสอบ TC-25 (ยืนยันลบจริง)
2. **เลือกไฟล์จาก OS File Picker ผ่าน automation ไม่ได้** — แก้ด้วยการสร้าง `File` object ใส่ผ่าน `DataTransfer` แล้ว dispatch `change` event จริง ใช้กับ TC-14 และ TC-37 (ยืนยันว่า handler จริงของแอปทำงาน เพราะแอปเติมชื่อไฟล์ในฟอร์มให้อัตโนมัติทุกครั้งหลัง dispatch)
3. **`Backspace`/`Ctrl+A` ไม่ลบ/เลือกข้อความในบาง React controlled input ได้จริงผ่าน `computer` tool** — เตรียมพร้อมใช้เทคนิค native property setter + dispatch `input` event สำหรับ TC-26 แต่ **รอบนี้ไม่จำเป็นต้องใช้จริง** เพราะช่อง "ชื่อ" ของโปรไฟล์เริ่มต้นว่างเปล่าอยู่แล้ว (ข้อมูลทดสอบสดใหม่จาก seed reset) จึงทดสอบ required-field validation ได้ตรงๆ โดยกด "บันทึกข้อมูล" ทันทีแล้วตรวจ `validity.valueMissing === true` ผ่าน `javascript_tool` (read-only)

## Test Cases

### Dashboard (`/`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-01 | เปิดหน้า Dashboard | เปิด `http://localhost:5173/` | หน้าโหลดสำเร็จ ไม่มี console error, แสดง Summary Cards/Life Progress/การแจ้งเตือนสำคัญ/งานของวันนี้/ตารางวันนี้/ใกล้ครบกำหนด ตรงกับ seed data | ครบทุก section (1 งานทั้งหมดวันนี้, Life Progress "Study 0/1", แจ้งเตือน 3 รายการ, งานของวันนี้ "ส่งการบ้าน Database", ใกล้ครบกำหนด 3 รายการ) ไม่มี console error | Pass |

### Tasks (`/tasks`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-03 | Required-field validation | เปิดฟอร์ม "+ เพิ่มงาน" กด "บันทึก" โดยไม่กรอกอะไร (ปุ่มแสดงสถานะ disabled) | Modal ไม่ปิด, ไม่มีงานใหม่ถูกสร้าง | Modal ยังเปิดอยู่, จำนวนงานคงที่ 7 (baseline seed) | Pass |
| TC-02 | สร้างงานใหม่ (golden path) | กรอกชื่อ "QA Smoke Test Task-F" + วันที่กำหนดส่ง 2026-09-25 → "บันทึก" | งานใหม่ปรากฏในรายการ, จำนวนเพิ่มขึ้น 1 | สร้างสำเร็จ, จำนวนงานเพิ่มจาก 7 → 8, ไม่มี console error | Pass |
| TC-06 | ตั้งค่า Life Area ผ่านฟอร์มแก้ไข | แก้ไข "QA Smoke Test Task-F" ตั้ง Life Area = Personal → บันทึก | บันทึกสำเร็จ แสดง Life Area ใหม่ | ยืนยันผ่าน localStorage: `lifeAreaId: "la-personal"` ตรงตัว, การ์ดแสดง "Personal · อีก 4 วัน" | Pass |
| TC-05 | Delete-then-cancel | กดปุ่ม "ลบ" บน "QA Smoke Test Task-F" โดยไม่ stub confirm (ปล่อยให้ browser คืนค่า false อัตโนมัติ) | งานยังอยู่ครบ ไม่ถูกลบ | Console แสดง dialog ถูก suppress (`confirm() returned false`), งานยังอยู่ในรายการ 8 รายการเท่าเดิม | Pass |
| TC-04 | Persistence ข้าม reload | Navigate ไป `/tasks` ใหม่ (full reload) | งานที่สร้าง/แก้ไขยังอยู่ครบพร้อม Life Area | "QA Smoke Test Task-F" แสดง "Personal · อีก 4 วัน" ถูกต้องหลัง reload, ไม่มี console error | Pass |

### Calendar (`/calendar`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-07 | หน้า Today แสดงกิจกรรม+งานที่ครบกำหนดรวมกัน | เปิด `/calendar` (Today view ค่าเริ่มต้น) | แสดงรายการรวม event+task deadline เรียงตามเวลา | แสดง "ส่งการบ้าน Database" (Task, กำหนดส่ง 12:00) ถูกต้อง | Pass |
| TC-09 | Required-field validation | เปิดฟอร์ม "+ เพิ่มกิจกรรม" กด "บันทึก" โดยไม่กรอกชื่อ (มีวันที่ default เป็นวันนี้อยู่แล้วแต่ปุ่ม disabled เพราะไม่มีชื่อ) | Modal ไม่ปิด | Modal ยังเปิดอยู่ | Pass |
| TC-08 | สร้างกิจกรรมใหม่ (golden path) | กรอกชื่อ "QA Smoke Test Event-F" + วันที่ 2026-09-24 → บันทึก | กิจกรรมปรากฏในวันที่เลือก | สร้างสำเร็จ, ไม่มี console error | Pass |
| TC-10 | Query param `?date=` เปลี่ยนวันที่แสดงถูกต้อง | navigate ไป `/calendar?date=2026-09-24` | หน้าเลื่อนไปแสดงวันที่ระบุ | แสดง "QA Smoke Test Event-F" ถูกต้อง | Pass |

### Timeline (`/timeline`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-11 | Now/Next/Later buckets เรนเดอร์ถูกต้อง | เปิด `/timeline` | แบ่ง 3 bucket ตามกฎ Smart Priority, ไม่มีคำว่า "Score"/เปรียบเทียบผู้ใช้ | "ตอนนี้ (Now)" ว่างเปล่า, "ถัดไป (Next)" มี "ส่งการบ้าน Database" 12:00, "ในวันนี้ (Later)" ว่างเปล่าพร้อม empty state ถูกต้องตาม Business Rule 1 (เวลาทดสอบ ~08:57 น. ยังไม่ถึง 1 ชม.ก่อนกำหนดส่ง 12:00) ไม่พบคำว่า Score | Pass |

### Files (`/files`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-12 | Preview ไฟล์ที่มีอยู่ | กด "Preview" บน `report.docx` | แสดงเนื้อหาตัวอย่างแบบ inline, ปุ่มเปลี่ยนเป็น "ซ่อน Preview" | แสดง "ตัวอย่างเนื้อหารายงาน STEM..." ถูกต้อง, ปุ่มเปลี่ยนชื่อถูกต้อง | Pass |
| TC-13 | Required-field validation (ฟอร์มอัปโหลด) | เปิดฟอร์ม "+ เพิ่มไฟล์" กด "บันทึก" โดยไม่เลือกไฟล์ | Modal ไม่ปิด | Modal ยังเปิดอยู่, จำนวนไฟล์คงที่ 4 | Pass |
| TC-14 | อัปโหลดไฟล์จริง (golden path, ใช้เทคนิค DataTransfer) | สร้าง `File` object "qa-smoke-upload-f.txt" ใส่ผ่าน `DataTransfer` dispatch `change` → กรอกหมวดหมู่ "QA Test" → บันทึก | ไฟล์ใหม่ปรากฏในรายการ | แอปเติมชื่อไฟล์อัตโนมัติจากไฟล์ที่เลือก (ยืนยัน handler จริงทำงาน), บันทึกลง IndexedDB จริง (`createdAt` ยืนยันได้), รายการเพิ่มจาก 4 → 5 ไฟล์, ไม่มี console error | Pass |

### Notifications (`/notifications`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-17 | Progressive enhancement เมื่อไม่ได้เปิดสิทธิ์ Browser Notification | เปิดหน้าโดยไม่ได้ให้สิทธิ์ Notification | แอปใช้งานได้ปกติ พร้อมข้อความแจ้ง | แสดง "การแจ้งเตือนจาก Browser ถูกปิดไว้ — ระบบยังใช้งานได้ตามปกติ" ไม่มี error | Pass |
| TC-15 | คลิกรายการแจ้งเตือน → ไป Task + mark read | คลิกแจ้งเตือน "เลยกำหนด" ของ "ทำแบบฝึกหัด HCI บทที่ 4" | Navigate ไป `/tasks` และเปิด modal แก้ไขงานนั้น, รายการถูก mark read | Navigate ถูกต้อง, ตรวจค่า input จริงด้วย `javascript_tool` (`.value`) ยืนยัน title field = "ทำแบบฝึกหัด HCI บทที่ 4" ตรงตัว, `my-today:notifications-read` มี id `task-seed-2-Overdue` เพิ่มเข้ามา | Pass |
| TC-16 | "อ่านทั้งหมดแล้ว" | กดปุ่ม "อ่านทั้งหมดแล้ว" | ทุกรายการถูก mark read | `my-today:notifications-read` มีครบทั้ง 6 id (ตรงกับ "6 รายการ" ที่แสดงตอนนั้น) หลังกด | Pass |

### Inbox (`/inbox`)

หมายเหตุ: เนื่องจาก Inbox เริ่มต้นว่างเปล่า (ตามสถานะข้อมูลทดสอบที่โจทย์กำหนด) จึงต้องสร้างรายการผ่าน Quick Capture (TC-31..37) ก่อนจึงจะมีของให้ "จัดเข้า Life Area" ทดสอบได้ — เรียงลำดับการรันจริงจึงสลับไปมาระหว่างสองหมวดนี้ แต่ผลลัพธ์ครอบคลุมครบทุก TC-ID เหมือนเดิม

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-18/19 | Organize ไฟล์ (Quick Capture) เข้า Life Area | สร้างไฟล์ผ่าน Quick Capture (TC-37) แล้วกด "จัดเข้า Life Area" บน `qa-quickcapture-file-f.txt` → เลือก Personal → บันทึก | ไฟล์ย้ายออกจาก Inbox ไปหน้า `/files` พร้อม Life Area ที่เลือก | Inbox ลดจาก 3 → 2 รายการ, ยืนยันภายหลังว่าไฟล์ปรากฏที่ `/files` เป็น "Personal · ทั่วไป" (6 ไฟล์ทั้งหมด) | Pass |
| TC-20 | Organize Event — re-enforce required field (วันที่) | กด "จัดเข้า Life Area" บน `QA Quick Capture Event-F` (ไม่มีวันที่จาก Quick Capture) → กด "บันทึก" โดยไม่กรอกวันที่ | Modal ไม่ปิด เพราะฟอร์ม organize บังคับ "วันที่ *" ใหม่ | Modal ยังเปิดอยู่, จำนวน Inbox คงที่ 2 | Pass |
| — | Organize Event/Task ที่เหลือให้ครบ (เพื่อทดสอบ TC-25 cascade-delete ในภายหลัง) | กรอกวันที่ 2026-09-26/2026-09-30 + Life Area = Personal ให้ Event และ Task ที่เหลือ แล้วบันทึก | ย้ายออกจาก Inbox สำเร็จทั้งคู่ | Inbox ลดจาก 2 → 1 → 0 ตามลำดับ ไม่มี console error | Pass |
| TC-21 | Inbox ว่างเปล่า (Empty State) | หลังจัดของทุกชิ้นออกจาก Inbox จนหมด | แสดงข้อความ Empty State ที่เหมาะสม | แสดง "Inbox ว่างเปล่า — จัดเข้า Life Area ครบหมดแล้ว 🎉" ถูกต้อง | Pass |

### Life Areas (`/life-areas`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-23 | Required-field validation | กด "+ เพิ่ม" โดยไม่กรอกชื่อ (ปุ่ม disabled) | ไม่มี Life Area ใหม่ถูกสร้าง | จำนวนคงที่ 5 รายการ (baseline: Work/Study/Finance/Health/Personal) | Pass |
| TC-22 | สร้าง Life Area ใหม่ | กรอก "QA-Delete-Test-F" → กด "+ เพิ่ม" | Life Area ใหม่ปรากฏในลิสต์ | สร้างสำเร็จ, รายการเพิ่มเป็น 6, ไม่มี console error | Pass |
| TC-24 | แก้ไขชื่อ Life Area | กด "แก้ไข" → เปลี่ยนเป็น "QA-Delete-Test-F-Edited" → "บันทึก" | ชื่อเปลี่ยนในลิสต์ | เปลี่ยนสำเร็จ, ไม่มี console error | Pass |
| TC-25 | **กฎห้าม cascade delete** — ผูก Life Area กับ Task/Event/Note/Link แล้วลบ Life Area | สร้าง Note-F/Link-F ผ่าน Quick Capture พร้อมเลือก Life Area = `QA-Delete-Test-F-Edited` ทันที, ตั้งค่า Life Area เดียวกันบน `QA Smoke Test Task-F`/`QA Smoke Test Event-F` ผ่านฟอร์มแก้ไข (ยืนยันผ่าน localStorage ว่าตั้งค่าสำเร็จทั้ง 4 รายการก่อนลบ) → stub `window.confirm=()=>true` → กด "ลบ" ที่ Life Area ผ่าน UI จริง | Task/Event/Note/Link ทั้ง 4 รายการยังอยู่ครบ มีแค่ `lifeAreaId` ถูกเคลียร์เป็นค่าว่าง | ลบ Life Area สำเร็จ (เหลือ 5 รายการ baseline) และตรวจ localStorage หลังลบพบทั้ง 4 รายการยังอยู่ครบ (`exists:true` ทุกตัว) โดย `lifeAreaId` เป็น `""` ทุกตัว ไม่มีรายการใดค้างชี้ id ที่ถูกลบ | Pass |

### Profile (`/profile`) — จุดที่ให้ความสำคัญเป็นพิเศษในรอบนี้ (การเปลี่ยนแปลง #1)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-28 | สถานะ "ยังไม่ sign in" ของ Cloud Sync + ตำแหน่ง card | เปิดหน้า Profile โดยไม่ sign in, ตรวจโครงสร้าง DOM ว่า Cloud Sync card อยู่ก่อนฟอร์มโปรไฟล์ | แสดงปุ่ม "Sign in ด้วย Google" ไม่มี toggle เปิด Cloud Sync, Cloud Sync card ต้องอยู่**เหนือ**ฟอร์มโปรไฟล์ (เปลี่ยนจากเดิมที่อยู่ด้านล่าง) | แสดงตรงตามคาด พร้อมข้อความอธิบาย "ปิดโดยค่าเริ่มต้น เปิดเองได้..." และยืนยันจาก `read_page`/accessibility tree ว่า heading "Cloud Sync" render ก่อน heading "ข้อมูลส่วนตัว"'s form element จริง | Pass |
| TC-26 | Required-field validation (ชื่อ) | ช่อง "ชื่อ" ว่างเปล่าอยู่แล้ว (ข้อมูล seed สด) → กด "บันทึกข้อมูล" ทันที | ฟอร์มไม่ยอม submit (HTML5 required) | ยืนยันผ่าน `validity.valid === false`, `validity.valueMissing === true`, และค่าที่บันทึกจริงใน localStorage ไม่เปลี่ยน (`name: ""` เท่าเดิม) | Pass |
| TC-27 | บันทึกโปรไฟล์ + persistence | กรอกชื่อ "QA Tester F" → "บันทึกข้อมูล" → reload หน้า | ข้อมูลถูกบันทึกใน LocalStorage และแสดงใน input หลัง reload | `my-today:profile.name` = "QA Tester F" ทั้งก่อน/หลัง reload, input แสดงค่าถูกต้อง, ไม่มี console error | Pass |
| TC-29 | Segmented tab เข้าสู่ระบบ/สมัครสมาชิก (Sprint 14, โครงสร้างใหม่) | ตรวจ `role=tablist`/`role=tab` + `aria-selected` เริ่มต้นที่ "เข้าสู่ระบบ" → คลิก tab "สมัครสมาชิก" → ตรวจการเปลี่ยนแปลงทั้งหมด → กด submit โดยไม่กรอกอะไร | ต้องพบ: (1) `aria-selected` สลับ true/false ถูกต้อง (2) ข้อความช่วยเหลือเปลี่ยนจาก "มีบัญชีอยู่แล้ว..." เป็น "ยังไม่มีบัญชี..." (3) ปุ่ม submit เปลี่ยนข้อความเป็น "สมัครสมาชิก" (4) "ลืมรหัสผ่าน?" ต้องหายไปในโหมดสมัครสมาชิก (5) กด submit ว่างไม่ crash ไม่เรียก Firebase จริง | ครบทั้ง 5 ข้อ: `aria-selected` ของ "เข้าสู่ระบบ"/"สมัครสมาชิก" เปลี่ยนจาก `true/false` เป็น `false/true` ถูกต้องหลังคลิก, ข้อความช่วยเหลือเปลี่ยนเป็น "ยังไม่มีบัญชี — กรอกอีเมลและตั้งรหัสผ่านใหม่อย่างน้อย 6 ตัวอักษร" ตรงตัว, ปุ่ม submit เปลี่ยนเป็น "สมัครสมาชิก" และมีสถานะ `disabled: true` เพราะยังไม่กรอกอะไร (client-side validation กันไว้ก่อนแตะ Firebase เลย), ปุ่ม "ลืมรหัสผ่าน?" หาไม่พบใน DOM แล้ว (`forgotPasswordVisible: false`), กด submit ไม่มี console error และตรวจ Network requests ไม่พบการเรียก Firebase Auth endpoint ใดๆ | Pass |

*หมายเหตุ: ไม่ได้ทดสอบการ sign in จริง (Google หรือ Email/Password) หรือแม้แต่การกรอกอีเมล/รหัสผ่านค่าใดๆ ตามข้อกำหนดของโจทย์ — บันทึกเป็น "ไม่ได้ทดสอบ (ต้องมีบัญชีจริง)" รวมถึงข้อความ error `auth/invalid-credential` ใหม่ (การเปลี่ยนแปลง #2) ก็ไม่สามารถกระตุ้นให้เกิดได้โดยไม่ละเมิดข้อจำกัดนี้*

### Privacy (`/privacy`)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-30 | เนื้อหาคงที่แสดงครบ | เปิด `/privacy` | แสดง Privacy Notice + Cloud Sync section + Terms of Use + ลิขสิทธิ์ | แสดงครบทุกหัวข้อ ไม่มี console error | Pass |

### Quick Capture (ฟีเจอร์ข้ามหน้า)

| TC-ID | คำอธิบาย | ขั้นตอน | ผลที่คาดหวัง | ผลจริง | Pass/Fail |
|---|---|---|---|---|---|
| TC-31 | Chooser แสดงครบ 5 ประเภท | กด "+ Add to My Today" (FAB) | แสดงปุ่มเลือก งาน/กิจกรรม/ไฟล์/บันทึก/ลิงก์ | แสดงครบทั้ง 5 ปุ่ม | Pass |
| TC-32 | Smart Capture — สถานะยังไม่ sign in (ประเภทงาน) | เลือก "งาน (Task)" → "📷 สแกนจากรูปภาพ" | แสดงข้อความ sign-in-required + ปุ่ม "กรอกฟอร์มเองแทน" | แสดง dialog "สแกนจากรูปภาพ — งาน" พร้อมข้อความ "ฟีเจอร์นี้ต้อง sign in ก่อนใช้งาน (Quick Capture ประเภทอื่นยังใช้ได้โดยไม่ต้อง sign in ตามปกติ)" ถูกต้อง | Pass |
| TC-33 | Smart Capture — สถานะยังไม่ sign in (ประเภทกิจกรรม) | เลือก "กิจกรรม (Event)" → "📷 สแกนจากรูปภาพ" | เหมือน TC-32 แต่สำหรับ Event | แสดง "สแกนจากรูปภาพ — กิจกรรม" พร้อมข้อความเดียวกัน ถูกต้อง | Pass |
| TC-34 | "กรอกฟอร์มเองแทน" fallback ใช้งานได้จริง (ประเภทงาน) | กดปุ่ม fallback จาก TC-32 → กรอกชื่อ "QA Quick Capture Task-F" อย่างเดียว → บันทึก | เปิด TaskFormModal โหมด Quick Capture (ไม่มี `*` ที่วันที่กำหนดส่ง), บันทึกได้ด้วยชื่ออย่างเดียว | เปิดฟอร์มถูกต้อง, บันทึกสำเร็จ (ยืนยัน record ปรากฏใน Inbox ทันที), ไม่มี console error | Pass |
| TC-35 | Quick Capture item เข้า Inbox ก่อนเสมอ | สร้าง Event ผ่าน fallback เดียวกัน (ชื่อ "QA Quick Capture Event-F") | รายการปรากฏใน `/inbox` เท่านั้น | ทั้ง Task-F และ Event-F ปรากฏในแท็บ Inbox ถูกต้อง (2 รายการ) | Pass |
| TC-36 | **ไม่รั่วไหลออกนอก Inbox ขณะ `inInbox: true`** | เปิด `/tasks` (8 งาน), `/calendar` (Today), และ Dashboard ระหว่างที่ Task-F/Event-F ยังอยู่ใน Inbox | ไม่พบ "QA Quick Capture Task-F"/"Event-F" ในหน้าดังกล่าว | `/tasks` แสดง 8 งานแต่ไม่มี Quick-Capture-Task-F, `/calendar` วันนี้ไม่มี Quick-Capture-Event-F, Dashboard ไม่มีทั้งสองปรากฏที่ใดเลย | Pass |
| TC-37 | Quick Capture ประเภทไฟล์ | เลือก "ไฟล์ (File)" → inject ไฟล์ `qa-quickcapture-file-f.txt` ผ่าน DataTransfer → บันทึก | เปิดฟอร์ม File โหมด Quick Capture, ไฟล์เข้า Inbox ไม่ใช่หน้า `/files` | ข้อความโหมด Quick Capture ถูกต้อง ("เลือกไฟล์แล้วบันทึกได้เลย ตั้งชื่อ/หมวดหมู่/Life Area ทีหลังได้ที่ My Inbox"), บันทึกสำเร็จ ปรากฏที่ `/inbox` (3 รายการรวม Task/Event ก่อนหน้า) และ **ไม่รั่วไปหน้า `/files`** (คงที่ 5 ไฟล์ ไม่มีตัวนี้จนกว่าจะ organize ออก) | Pass |

## สรุปปัญหาที่พบ

**ไม่พบบั๊กของแอปพลิเคชันเลยตลอดการทดสอบรอบนี้** — ไม่มี console error จุดใดเลยทั้ง 10 หน้าและทุก flow ที่ทดสอบ (ยืนยันด้วย `read_console_messages` หลังทุก action ที่มีการบันทึกข้อมูล), ทุก golden path และทุก required-field validation ทำงานถูกต้องตามที่ออกแบบไว้, Quick Capture non-leak rule ทำงานถูกต้องครบทั้ง Task/Event/File, กฎ organize-mode ที่ต้อง re-enforce validation ทำงานถูกต้อง, และกฎห้าม cascade delete ของ Life Area (CLAUDE.md) ยืนยันผ่านการลบจริงผ่าน UI ครบทั้ง 4 ประเภท entity (Task/Event/Note/Link) ในรอบนี้

**การเปลี่ยนแปลง ProfilePage (#1) ทำงานถูกต้องสมบูรณ์** — Cloud Sync card ย้ายมาอยู่เหนือฟอร์มโปรไฟล์จริงตามที่ตั้งใจ, segmented tab ใช้ `role=tablist`/`role=tab`/`aria-selected` ตาม ARIA pattern ที่ถูกต้อง, ข้อความช่วยเหลือและปุ่ม submit เปลี่ยนตามโหมดถูกต้องครบ, และ "ลืมรหัสผ่าน?" ซ่อนถูกที่ในโหมดสมัครสมาชิก

**ข้อจำกัดของขอบเขตการทดสอบรอบนี้ (ไม่ใช่บั๊ก แต่ควรบันทึกไว้):**

1. การเปลี่ยนแปลง #2 (ข้อความ error `auth/invalid-credential` ใหม่) **ไม่สามารถทดสอบได้ในรอบนี้** เพราะการกระตุ้นให้เกิด error นี้ต้องกรอกอีเมล/รหัสผ่านแล้ว submit จริงซึ่งขัดกับข้อจำกัดเรื่องห้ามแตะบัญชี Firebase production ของโจทย์นี้โดยตรง — ต้องรอรอบทดสอบที่อนุญาตให้ใช้บัญชีทดสอบจริง (ไม่ใช่บัญชีของเจ้าของโปรเจกต์) จึงจะปิดจุดนี้ได้
2. การเปลี่ยนแปลง #3 (`useCloudSync.ts` dynamic import) **ไม่ได้ถูกกระตุ้น error path โดยตรง** เพราะต้องจำลองการโหลด chunk ล้มเหลวหรือเปิด Cloud Sync จริง ทั้งคู่อยู่นอกขอบเขตที่อนุญาต — ตรวจได้แค่ทางอ้อมว่าไม่มี regression ในสถานะปกติ (signed-out)
3. การเปลี่ยนแปลง #5 (`vite.config.ts` vendor chunk splitting) **สังเกตไม่ได้ผ่าน `npm run dev`** เพราะ `manualChunks` มีผลเฉพาะ production build เท่านั้น — ต้องทดสอบผ่าน `npm run build` + `npm run preview` ในรอบถัดไปหากต้องการยืนยันจุดนี้โดยเฉพาะ

**เทคนิคแก้ข้อจำกัดเครื่องมือทดสอบที่ใช้ (ตามภาคผนวกรอบก่อนหน้า):**

1. Native `window.confirm()` ถูกปิดใช้งานโดย browser automation tool เอง — ใช้ค่าเริ่มต้น (คืนค่า false) ทดสอบ TC-05 ได้ตรงไปตรงมา และ stub `window.confirm=()=>true` ก่อนกดปุ่มลบเมื่อจำเป็นต้องทดสอบ "ยืนยันลบจริง" (TC-25)
2. เลือกไฟล์จาก OS File Picker ผ่าน automation ไม่ได้ — แก้ด้วยเทคนิค `DataTransfer` + dispatch `change` event (TC-14, TC-37)
3. native property setter + dispatch `input` event สำหรับเคลียร์ text input ที่ `Backspace`/`Ctrl+A` ใช้ไม่ได้ — เตรียมพร้อมไว้แต่ **ไม่จำเป็นต้องใช้จริงในรอบนี้** เพราะช่อง "ชื่อ" ของโปรไฟล์เริ่มต้นว่างเปล่าอยู่แล้วจากข้อมูล seed สด

## สรุปผลรวม

- จำนวน Test Case ทั้งหมดที่รันจริงในรอบนี้: **37** (TC-01 ถึง TC-37 ครบตามขอบเขตเดิม)
- Pass: **37**
- Fail: **0**
- ไม่ได้ทดสอบ เนื่องจากข้อจำกัดเครื่องมือ: **0**
- ไม่ได้ทดสอบโดยเจตนา (นอกขอบเขต ห้ามแตะบัญชี production ตามโจทย์): sign-in สำเร็จจริง (Google/Email-Password), ข้อความ error `auth/invalid-credential` ใหม่, การกระตุ้น error path ของ dynamic-import cloudSync, เปิด Cloud Sync จริง, sync ข้ามอุปกรณ์จริง, และการเรียก Smart Capture ไปยัง Gemini API จริง
- ข้อจำกัดของวิธีทดสอบ (ไม่ใช่นอกขอบเขตโดยเจตนา แต่สังเกตไม่ได้ด้วยวิธีที่โจทย์กำหนด): ผล vendor chunk splitting ของ `vite.config.ts` เพราะ `npm run dev` ไม่ทำ production chunking

**สรุป:** รัน Full App Smoke Test ทั้งแอปตั้งแต่ต้นในรอบสุดท้ายก่อนส่งงานวันที่ 2026-09-21 **ไม่พบบั๊กของแอปพลิเคชันเลย** ทุกฟีเจอร์ทำงานถูกต้องตามที่ระบุใน `spec.md` รวมถึงกฎเฉพาะทั้งหมด (Quick Capture non-leak ครบทั้ง 5 ประเภทรวมไฟล์, organize-mode re-validate, สถานะ signed-out ของ Smart Capture/Cloud Sync, กฎห้าม cascade delete ของ Life Area) และ**การเปลี่ยนแปลง ProfilePage ทั้ง 5 จุดที่ระบุในโจทย์ทำงานถูกต้องเท่าที่ทดสอบได้ภายใต้ข้อจำกัดห้ามแตะบัญชี production** — จุดที่ #1 (ProfilePage UI/tab) ยืนยันถูกต้องสมบูรณ์ผ่านการทดสอบจริงในเบราว์เซอร์ ส่วนจุดที่ #2, #3 และ #5 ไม่สามารถกระตุ้น error/behavior path เฉพาะของมันได้ภายใต้ข้อจำกัดของโจทย์นี้ (ต้องมีบัญชีทดสอบจริงหรือต้องรันด้วย production build) จึงบันทึกเป็น "ไม่ได้ทดสอบ" อย่างชัดเจนแทนการอนุมานว่าใช้งานได้ เนื่องจากโจทย์นี้เป็น Full App Smoke Test ไม่ผูกกับ Gate ของ Sprint ใดโดยเฉพาะ จึงไม่มี "Gate" ที่ต้องตัดสิน pass/fail แบบเป็นทางการ — แต่จากผลที่ได้ แอปในสถานะปัจจุบัน (ณ commit ล่าสุดของ `master`) ยังคงเสถียรและพร้อมสำหรับการส่งงาน โดยเหลือเพียง 3 จุดย่อยที่ต้องการรอบทดสอบเพิ่มเติมภายใต้เงื่อนไขที่ต่างออกไป (บัญชีทดสอบจริง หรือ production build) ตามที่ระบุไว้ข้างต้น

## Change Log

- 2026-09-21 — สร้างเอกสารนี้: รัน Full App Smoke Test ใหม่ทั้งหมดตั้งแต่ต้น (ไม่คัดลอกผลจากรายงานรอบ 06:36–06:52 น. ซึ่งรันก่อนการเปลี่ยนแปลง 5 จุด) ครบ 37 เคสตามขอบเขตเดิม บนโค้ดล่าสุดหลังการเปลี่ยนแปลง ProfilePage/useAuth/useCloudSync/firebase.ts-cloudSync.ts/vite.config.ts ให้ความสำคัญเป็นพิเศษกับ 5 จุดนี้ ยืนยันจุดที่ #1 (ProfilePage UI) ถูกต้องสมบูรณ์ผ่านเบราว์เซอร์จริง ส่วนจุดที่ #2/#3/#5 บันทึกเป็น "ไม่ได้ทดสอบ" อย่างชัดเจนเนื่องจากข้อจำกัดห้ามแตะบัญชี production/ต้องใช้ production build ผลลัพธ์: 37 Pass / 0 Fail / 0 ไม่ได้ทดสอบเพราะข้อจำกัดเครื่องมือ ไม่พบบั๊กแอปพลิเคชันใหม่
