# 02 - Technical

เก็บเอกสาร **การออกแบบเชิงเทคนิค (Technical Design)** เช่น

- System architecture / โครงสร้างระบบโดยรวม
- Database schema
- API design / data contract
- เทคโนโลยีและไลบรารีที่เลือกใช้ พร้อมเหตุผล

เอกสารในโฟลเดอร์นี้คือพิมพ์เขียวที่ทีมพัฒนาใช้อ้างอิงตอนลงมือเขียนโค้ด และเป็นฐานในการวางแผนทดสอบใน [[../../03-testing/01-test-plan/index|01-test-plan]]

ตอนนี้ active อยู่ 3 ไฟล์ ทั้งหมดแบบ conceptual ล้วนๆ **ไม่เอ่ยชื่อ technology/framework/network protocol ใดๆ โดยตั้งใจ** แม้โค้ดจริงจะเลือกใช้ไปแล้วก็ตาม:

- `architecture.md` — สร้าง/อัปเดตผ่าน skill `architecture-intake` (ดู `CLAUDE.md`) เป็นเอกสาร High-Level Architecture (Conceptual Components, Conceptual Data Model, Data Flow ตาม User Journey)
- `database-schema.md` และ `api-spec.md` — สร้าง/อัปเดตผ่าน skill `db-api-intake` (ดู `CLAUDE.md`) โดย `database-schema.md` คือรายละเอียดแต่ละ table/entity + ER Diagram ระดับ field และ `api-spec.md` คือ Internal Data Access Contract ต่อ Conceptual Component (ไม่ใช่ HTTP/REST API เพราะแอปนี้ client-only ไม่มี backend) ทั้งสองไฟล์อ้างอิงคำศัพท์ entity/component เดียวกับ `architecture.md` เพื่อความสอดคล้อง

เอกสารเลือกเทคโนโลยีจริง (Technology Choices) ยังไม่ active
