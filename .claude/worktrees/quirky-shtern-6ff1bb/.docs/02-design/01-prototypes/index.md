# 01 - Prototypes

เก็บ **ต้นแบบหน้าตาของระบบ (UI/UX Prototype)** เช่น

- Wireframe / mockup ของแต่ละหน้าจอ
- User flow และ navigation flow
- Design system เบื้องต้น เช่น สี ฟอนต์ คอมโพเนนต์หลัก

ใช้สำหรับสื่อสารและตกลงหน้าตาของระบบก่อนลงมือพัฒนาจริง โดยอ้างอิงความต้องการจาก [[../../01-requirements/01-spec/index|01-spec]] และส่งต่อรายละเอียดเชิงระบบให้ [[../02-technical/index|02-technical]]

Prototype ในโฟลเดอร์นี้สร้างผ่าน skill `prototype-intake` (ดู `CLAUDE.md`) โดยอ้างอิง Design System จาก `DESIGN.md` ที่ root ของโปรเจกต์เสมอ แต่ละขอบเขต (Sprint/feature) เก็บแยกเป็นโฟลเดอร์ย่อยของตัวเอง มีเวอร์ชันเป็น `v1/`, `v2/`, ... ข้างในตามลำดับ (เช่น `sprint3-calendar-schedule/v1/`) — เวอร์ชันใหม่จะถูกสร้างหรือแก้ไขเวอร์ชันล่าสุดในที่เดิม ขึ้นอยู่กับการตัดสินใจร่วมกับ user ในแต่ละครั้งที่เรียกใช้ skill
