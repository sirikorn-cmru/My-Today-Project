# Test Plan — Non-Functional Requirements

เชื่อมโยงกลับ: [[index|01-test-plan]], [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR Master List]], [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]]

## ขอบเขตของเอกสารนี้

เอกสารนี้เป็น Test Plan ฉบับแรกที่ถูกสร้างขึ้นใน `03-testing/` ของโปรเจกต์นี้ ครอบคลุมการทดสอบ **Non-Functional Requirement (NFR)** ทั้ง 9 หมวดตาม [[../../01-requirements/01-spec/20260823-013-my-today-non-functional-requirements-master|NFR Master List]] — ไม่ครอบคลุม Functional Requirement (การทดสอบ FR อยู่นอกขอบเขตเอกสารนี้ และยังไม่มี Test Plan แยกสำหรับ FR ในเวลาที่เขียนเอกสารนี้)

**สถานะของแต่ละ Test Case แบ่งเป็น 2 กลุ่ม:**
- **ทดสอบได้ทันที** — NFR ที่สอดคล้องกับสิ่งที่ implement แล้วใน Sprint 1-8 (6 หมวด: Performance, Reliability/Data Integrity, Usability/UX, Security/Privacy/Compliance, Offline Capability, Maintainability)
- **รอ Sprint 11** — NFR ที่เพิ่งถูกผูกเข้ากับ [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]] และยังไม่ถูก build (3 หมวดย่อย: Accessibility Baseline, Browser Compatibility Matrix, IndexedDB Quota-Warning — ดูหัวข้อ "เพิ่มเติม (20260823)" ของ Sprint 11 spec)

ผลการทดสอบตาม Test Case เหล่านี้ให้บันทึกใน [[../02-test-result/index|02-test-result]] เมื่อเริ่มทดสอบจริง

## Test Cases

### NFR-01 Performance

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR01-01 | เปิดแต่ละหน้าหลัก (Dashboard/Tasks/Calendar/Files/Inbox) บนอุปกรณ์ทั่วไป | เครื่อง/เบราว์เซอร์ทั่วไป ไม่ใช่เครื่อง spec สูง, ข้อมูล seed มาตรฐาน | หน้าโหลดและโต้ตอบได้ลื่นไหล ไม่มีอาการค้าง/กระตุกที่สังเกตเห็นได้ชัด (เชิงคุณภาพ — ไม่มีตัวเลข benchmark ตายตัวตาม NFR-01) | ทดสอบได้ทันที |

### NFR-02 Reliability / Data Integrity

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR02-01 | ลบ Life Area ที่มี Task/Event/File/Note/Link ผูกอยู่ | สร้าง Life Area ใหม่ ผูกกับอย่างน้อย 1 record ของแต่ละ entity แล้วลบ Life Area นั้น | record ทุกตัวยังอยู่ครบ ไม่หาย มีแค่ `lifeAreaId` ถูกเคลียร์เป็นค่าว่าง ไม่มี orphaned reference | ทดสอบได้ทันที |
| TC-NFR02-02 | จำลอง error ระหว่างบันทึกไฟล์แนบ (เช่น ปิด IndexedDB/private browsing) | เปิดแอปใน private browsing mode ที่บล็อก IndexedDB แล้วลองแนบไฟล์ | ระบบแสดง error banner ที่ปิดได้ (dismissible) ไม่สร้าง record metadata ที่ไม่มีเนื้อหาไฟล์ค้างอยู่ | ทดสอบได้ทันที |

### NFR-03 Usability / UX

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR03-01 | ผู้ใช้ใหม่ (ไม่เคยเห็นแอปมาก่อน) ทำ Final User Journey โดยไม่มีคนสอน | ผู้ทดสอบที่ไม่คุ้นเคยกับแอป, Scenario ตาม Sprint 6/11 Business Rules | ทำ Journey ได้ครบโดยไม่ต้องมีคนอธิบายเพิ่มเติม | ทดสอบได้ทันที |
| TC-NFR03-02 | ตรวจสอบ Empty State/Loading State/Confirmation ก่อน Delete ทุกหน้า | ล้างข้อมูลทั้งหมดแล้วเปิดแต่ละหน้า, กดลบ record ใดๆ | ทุกหน้าแสดง Empty State ที่เหมาะสม, มี Confirmation dialog ก่อนลบเสมอ | ทดสอบได้ทันที |
| TC-NFR03-03 | ตรวจสอบว่าไม่มีข้อความ/UI ที่มีลักษณะตัดสินผู้ใช้ | ค้นหาคำว่า "Score" หรือข้อความเปรียบเทียบใน UI ทั้งหมด (เมื่อ Sprint 9 build แล้ว) | ไม่พบคำว่า "Score" หรือข้อความลักษณะตัดสิน/เปรียบเทียบผู้ใช้ | รอ Sprint 9 (ยังไม่ build — Sprint 9 เป็นคนละ Sprint จาก 3 ข้อใหม่ที่ผูกกับ Sprint 11) |

### NFR-04 Accessibility (Baseline)

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR04-01 | ตรวจสอบ semantic HTML ของทุกหน้า | เปิด DevTools/HTML source ของแต่ละหน้า Sprint 1-10 | ใช้ element ที่ถูกต้องตามความหมาย (`nav`, `main`, `button`, `form` ฯลฯ) แทน `div`/`span` ล้วนสำหรับโครงสร้างหลัก | รอ Sprint 11 |
| TC-NFR04-02 | ตรวจสอบ keyboard navigation | ใช้ปุ่ม Tab ไล่ทุก interactive element ในแต่ละหน้า ไม่ใช้เมาส์เลย | ทุก element ที่คลิกได้ต้อง focus ได้ด้วยคีย์บอร์ด และมี focus indicator ที่มองเห็นชัดเจน | รอ Sprint 11 |
| TC-NFR04-03 | ตรวจสอบ contrast ของสีข้อความ/พื้นหลัง | ตรวจด้วยสายตาในแต่ละหน้า (ไม่ใช้ WCAG contrast checker อย่างเป็นทางการ ตามขอบเขต Baseline) | ข้อความอ่านง่ายในทุกสถานะ (ปกติ/hover/disabled) | รอ Sprint 11 |

### NFR-05 Security / Privacy / Compliance

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR05-01 | ตรวจสอบว่าไม่มี network request ออกนอกเครื่อง | เปิด Network tab ใน DevTools แล้วใช้งานแอปทุกฟีเจอร์ | ไม่มี request ใดๆ ที่แนบข้อมูลผู้ใช้ออกไปนอกเครื่อง (เดิมยืนยันแล้วใน Sprint 6 — ทดสอบซ้ำเพื่อยืนยัน non-regression) | ทดสอบได้ทันที |
| TC-NFR05-02 | ตรวจสอบเนื้อหา Privacy Notice/Terms of Use | เปิดหน้า `/privacy` จาก Footer ทุกหน้า | เนื้อหาครอบคลุมตาม Business Rules ของ Sprint 6 (ที่เก็บข้อมูล, ไม่เข้ารหัส, ไม่ควรเก็บข้อมูลอ่อนไหว) | ทดสอบได้ทันที |

### NFR-06 Compatibility / Portability (รวม Browser Compatibility Matrix)

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR06-01 | ทดสอบ Responsive 3 breakpoint | Mobile 390px, Tablet, Desktop บนทุกหน้า | ไม่มี overflow ที่ breakpoint ใดๆ (เดิมยืนยันแล้วใน Sprint 6 — ทดสอบซ้ำเพื่อยืนยัน non-regression กับหน้าจอใหม่จาก Sprint 7-10 ด้วย) | ทดสอบได้ทันที (ส่วน Sprint 7-10 รอ Sprint 11 gate) |
| TC-NFR06-02 | ทดสอบ progressive enhancement ของ Browser Notification | ปิดสิทธิ์ Browser Notification แล้วใช้งานแอป | แอปใช้งานได้ปกติ ไม่มี error หรือฟีเจอร์อื่นพัง | ทดสอบได้ทันที |
| TC-NFR06-03 | ทดสอบตาม Browser Compatibility Matrix ที่กำหนดใหม่ | Chrome/Edge/Firefox 2 เวอร์ชันล่าสุด, Safari ล่าสุด, Mobile Chrome/Mobile Safari ล่าสุด — รันทุก Test Case ของเอกสารนี้ซ้ำในแต่ละ browser | ทุก Test Case ผ่านในทุก browser ตาม matrix | รอ Sprint 11 — แบ่งเป็น 2 ส่วน ดูหัวข้อย่อยด้านล่าง: (ก) code-level compatibility audit **ทำแล้ว**, (ข) การรันทดสอบจริงในแต่ละ browser **ยังไม่ได้ทำ** (ต้องใช้เครื่องที่มี browser จริงหลายตัว — environment นี้มีแค่ browser preview แบบ Chromium ตัวเดียว รันข้าม browser จริงไม่ได้) |

#### ตาราง Browser Compatibility Matrix (เป้าหมาย)

| Browser | เวอร์ชันเป้าหมาย | Dependency หลักที่ใช้ | สถานะจาก code audit |
|---|---|---|---|
| Chrome (desktop) | 2 เวอร์ชันล่าสุด | IndexedDB, LocalStorage, Notification API, `navigator.storage.estimate()` | รองรับครบทุกตัว — เป็น browser ที่ dev/verify ทุก Sprint ผ่านมาแล้ว |
| Edge (desktop, Chromium-based) | 2 เวอร์ชันล่าสุด | เหมือน Chrome (engine เดียวกัน) | รองรับครบทุกตัว โดยอนุมานจาก engine เดียวกับ Chrome — ยังไม่ได้เปิดทดสอบจริงแยกต่างหาก |
| Firefox (desktop) | 2 เวอร์ชันล่าสุด | IndexedDB, LocalStorage, Notification API, `navigator.storage.estimate()`, `Intl.DateTimeFormat` (`th-TH-u-ca-buddhist` calendar) | รองรับ IndexedDB/LocalStorage/Notification/StorageManager ครบตาม MDN — **ยังไม่ได้ทดสอบจริง**, ยังไม่ยืนยัน `u-ca-buddhist` calendar formatting ด้วยตา |
| Safari (desktop, ล่าสุด) | เวอร์ชันล่าสุด | เหมือน Firefox | รองรับ IndexedDB/LocalStorage/Notification/StorageManager (`navigator.storage.estimate()` รองรับตั้งแต่ Safari 15.2) ในเวอร์ชันล่าสุดครบ — **ยังไม่ได้ทดสอบจริง**, ประวัติศาสตร์ Safari เคยมีช่องว่างเรื่อง Intl calendar extension ที่ไม่ใช่ Gregorian จึงเป็นจุดที่ควรตรวจด้วยตาก่อน demo |
| Mobile Chrome (Android) | เวอร์ชันล่าสุด | เหมือน Chrome desktop | รองรับครบทุกตัว โดยอนุมานจาก engine เดียวกับ Chrome desktop — ยังไม่ได้ทดสอบบนอุปกรณ์จริง |
| Mobile Safari (iOS) | เวอร์ชันล่าสุด | เหมือน Safari desktop | เหมือน Safari desktop — ยังไม่ได้ทดสอบบนอุปกรณ์จริง |

**Code-level compatibility audit ที่ทำแล้ว (20260825) — ตรวจ source code ทั้งหมด ไม่ใช่การรัน browser จริง:**
- Build tool (Vite `^5.3.1`, ไม่ได้ตั้ง `build.target` เอง) ใช้ default target `modules` ของ esbuild ซึ่งรองรับ Chrome ≥87, Edge ≥88, Firefox ≥78, Safari ≥14 เป็น floor ของ JS ที่ transpile ออกมา — ต่ำกว่าเป้าหมาย matrix นี้ (ซึ่งคือเวอร์ชัน "ล่าสุด") มาก จึงไม่มีความเสี่ยงเรื่อง JS syntax
- `navigator.storage.estimate()` (Sprint 11, NFR-08) — เขียนเป็น progressive enhancement อยู่แล้ว (`if (!navigator.storage?.estimate) return null`) ปลอดภัยแม้ browser ไม่รองรับ (เช่น Safari < 15.2)
- `Notification` API (Sprint 5) — เขียนเป็น progressive enhancement อยู่แล้ว (`typeof Notification === 'undefined'` guard) ปลอดภัยแม้ browser ไม่รองรับหรือผู้ใช้ปฏิเสธสิทธิ์
- `indexedDB`/`localStorage` — เป็น hard dependency ของแอป (ไม่มี fallback อื่น) แต่รองรับครบใน browser ทุกตัวของ matrix นี้ในเวอร์ชันปัจจุบัน; กรณี IndexedDB ใช้งานไม่ได้ (เช่น private browsing บาง browser) มี error handling อยู่แล้วจาก Sprint 4 (`useFiles.ts`)
- `Intl.DateTimeFormat('th-TH-u-ca-buddhist', ...)` (ใช้แสดงวันที่แบบ พ.ศ. บน Header ทุกหน้า) — เป็นจุดเดียวที่ตรวจแล้วไม่มั่นใจ 100% ข้าม browser: ตาม ECMA-402 spec, calendar extension ที่ engine ไม่รองรับจะ fallback เป็นปฏิทินเริ่มต้นของ locale โดยอัตโนมัติ (ไม่ throw error) แต่ **อาจทำให้ปีที่แสดงผิดจาก พ.ศ. เป็น ค.ศ. เงียบๆ** ถ้า browser engine ไม่รองรับ — แนะนำให้ตรวจด้วยตาใน Firefox/Safari จริงก่อน demo

**สิ่งที่ยังทำไม่ได้ในบทสนทนานี้ (ข้อจำกัดของ environment):** การรันแอปจริงและกดผ่านทุก Test Case ในเอกสารนี้บน Firefox/Safari/Edge จริง (รวมมือถือ) — environment ที่ใช้พัฒนา/ทดสอบตอนนี้มี browser preview เป็น Chromium ตัวเดียว ไม่มี Firefox/Safari ให้เปิดทดสอบจริง ต้องให้ทีม/ผู้ใช้ที่มีเครื่อง/browser หลากหลายเป็นผู้รันด้วยตัวเองก่อน demo จริง

### NFR-07 Offline Capability

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR07-01 | ปิดเครือข่ายแล้วใช้งานแอปทุกฟีเจอร์หลัก | ปิด Wi-Fi/ตัดเน็ตทั้งหมด แล้วเปิดแอปที่เคย build ไว้ (ไม่ใช่ครั้งแรกที่ยังไม่มี asset cache) | ใช้งาน Task/Event/File/Note/Link/Life Area/Profile ได้ปกติทุกอย่างโดยไม่มีเครือข่ายเลย | ทดสอบได้ทันที |

### NFR-08 Scalability / Capacity (รวม IndexedDB Quota-Warning)

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR08-01 | แนบไฟล์จำนวนมาก/ขนาดใหญ่จนใกล้ quota ของ IndexedDB | จำลองด้วยการแนบไฟล์ต่อเนื่องจนพื้นที่จัดเก็บใกล้เต็ม (ใช้ค่า quota โดยประมาณของเบราว์เซอร์ทดสอบ) | ระบบแสดงการแจ้งเตือนผู้ใช้ก่อนถึง quota เต็มจริง ไม่ใช่ให้ผู้ใช้เจอ error กะทันหันตอนบันทึกไฟล์ล้มเหลว | รอ Sprint 11 |

### NFR-09 Maintainability

| TC-ID | คำอธิบาย | เงื่อนไข/ข้อมูลทดสอบ | ผลที่คาดหวัง | สถานะ |
|---|---|---|---|---|
| TC-NFR09-01 | ตรวจสอบว่าไม่มี Console Error/mock data ค้าง | เปิด Console ใน DevTools แล้วใช้งานทุกหน้า | ไม่มี error ใน Console, ไม่มี mock/debug data ปรากฏในโหมดใช้งานจริง | ทดสอบได้ทันที (ส่วน Sprint 7-10 รอ Sprint 11 gate ตาม Acceptance Criteria เดิมของ Sprint 11) |

## หมายเหตุ

- Test Case กลุ่ม "รอ Sprint 11" ทั้งหมดอ้างอิงตรงกับหัวข้อ "เพิ่มเติม (20260823)" ของ [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11 spec]] — ห้าม mark ว่า pass ก่อน Sprint 11 build จริง
- เอกสารนี้ไม่ครอบคลุม Functional Requirement testing — ถ้าต้องการ Test Plan สำหรับ FR ต้องสร้างเอกสารแยกต่างหาก (ยังไม่มีในเวลาที่เขียนเอกสารนี้)
- ตัวเลขที่แน่นอน (เช่น % quota ที่ต้องแจ้งเตือน, เวอร์ชัน browser ที่แน่นอน ณ เวลาทดสอบจริง) ให้ทีมทดสอบกำหนด/อัปเดตตอนลงมือทดสอบจริง เพราะเปลี่ยนแปลงตามเวลา ไม่ fix ไว้ในเอกสารนี้

## Change Log

- 2026-08-23 — สร้างเอกสารนี้ครั้งแรก: Test Plan สำหรับ NFR ทั้ง 9 หมวดตาม NFR Master List, แบ่งเป็น Test Case ที่ทดสอบได้ทันที (6 หมวดที่ implement แล้ว) และรอ Sprint 11 (3 หมวดย่อยใหม่ที่เพิ่งผูก Sprint)
- 2026-08-25 — เพิ่มตาราง Browser Compatibility Matrix ที่เป็นรูปธรรม (NFR-06, TC-NFR06-03) พร้อมผล code-level compatibility audit (ตรวจ dependency หลักทุกตัวที่ผูกกับ browser API — IndexedDB/LocalStorage/Notification/StorageManager/Intl calendar extension — ไม่พบความเสี่ยงร้ายแรง มีจุดเดียวที่แนะนำให้ตรวจด้วยตา คือ `Intl.DateTimeFormat` ปฏิทิน พ.ศ.) — ยืนยันชัดเจนว่านี่คือ code audit เท่านั้น ยังไม่ใช่การรันทดสอบจริงข้าม browser เพราะ environment นี้มี Chromium ตัวเดียว
