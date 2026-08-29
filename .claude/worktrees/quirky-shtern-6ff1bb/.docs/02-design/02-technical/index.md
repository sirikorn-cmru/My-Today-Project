# 02 - Technical

เก็บเอกสาร **การออกแบบเชิงเทคนิค (Technical Design)** เช่น

- System architecture / โครงสร้างระบบโดยรวม
- Database schema
- API design / data contract
- เทคโนโลยีและไลบรารีที่เลือกใช้ พร้อมเหตุผล

เอกสารในโฟลเดอร์นี้คือพิมพ์เขียวที่ทีมพัฒนาใช้อ้างอิงตอนลงมือเขียนโค้ด และเป็นฐานในการวางแผนทดสอบใน [[../../03-testing/01-test-plan/index|01-test-plan]]

ตอนนี้ active ครบทั้ง 5 ไฟล์:

- `architecture.md` — สร้าง/อัปเดตผ่าน skill `architecture-intake` (ดู `CLAUDE.md`) เป็นเอกสาร High-Level Architecture (Conceptual Components, Conceptual Data Model, Data Flow ตาม User Journey) แบบ conceptual **ไม่เอ่ยชื่อ technology/framework ใดๆ โดยตั้งใจ**
- `database-schema.md` และ `api-spec.md` — สร้าง/อัปเดตผ่าน skill `db-api-intake` (ดู `CLAUDE.md`) โดย `database-schema.md` คือรายละเอียดแต่ละ table/entity + ER Diagram ระดับ field และ `api-spec.md` คือ Internal Data Access Contract ต่อ Conceptual Component (ไม่ใช่ HTTP/REST API เพราะแอปนี้ client-only ไม่มี backend) ทั้งสองไฟล์แบบ conceptual เช่นกัน อ้างอิงคำศัพท์ entity/component เดียวกับ `architecture.md`
- `detailed-design.md` — สร้าง/อัปเดตผ่าน skill `detailed-design-intake` (ดู `CLAUDE.md`) ลงรายละเอียดกว่า `architecture.md` อีกขั้น: Sequence Diagram ต่อ operation จาก `api-spec.md` ที่มีหลายขั้นตอน/ข้ามหลาย Component (ข้าม CRUD เดี่ยวๆ) และ State/Lifecycle Diagram ต่อ entity ที่มีสถานะ (ไม่รวม decision/branching logic breakdown แยกต่างหาก — ใส่ไว้ใน sequence diagram เองแทน) แบบ conceptual เช่นกัน
- `technology-choices.md` — สร้าง/อัปเดตผ่าน skill `tech-stack-intake` (ดู `CLAUDE.md`) **เอกสารเดียวในโฟลเดอร์นี้ที่เอ่ยชื่อเทคโนโลยีจริงได้** (React, TypeScript, Vite, Tailwind, LocalStorage/IndexedDB, Vercel ฯลฯ) — เก็บเหตุผล/ข้อจำกัดเบื้องหลังตัวเลือกที่ build ไปแล้ว (ไม่ใช่การเลือก stack ใหม่) รวมถึงช่วยตัดสินใจ library ใหม่สำหรับ Sprint ที่ยังไม่เริ่ม
