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
| TC-NFR06-03 | ทดสอบตาม Browser Compatibility Matrix ที่กำหนดใหม่ | Chrome/Edge/Firefox 2 เวอร์ชันล่าสุด, Safari ล่าสุด, Mobile Chrome/Mobile Safari ล่าสุด — รันทุก Test Case ของเอกสารนี้ซ้ำในแต่ละ browser | ทุก Test Case ผ่านในทุก browser ตาม matrix | รอ Sprint 11 |

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
