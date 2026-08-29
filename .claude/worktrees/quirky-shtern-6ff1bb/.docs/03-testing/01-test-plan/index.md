# 01 - Test Plan

เก็บ **แผนการทดสอบ (Test Plan)** ที่เตรียมไว้ก่อนลงมือทดสอบจริง เช่น

- Test case / test scenario ของแต่ละฟีเจอร์
- เงื่อนไขและข้อมูลที่ใช้ในการทดสอบ (test data)
- ขอบเขตของการทดสอบ (in scope / out of scope)

อ้างอิงจากข้อกำหนดใน [[../../01-requirements/01-spec/index|01-spec]] และการออกแบบใน [[../../02-design/index|02-design]] ผลของการทดสอบตาม test case เหล่านี้ให้บันทึกใน [[../02-test-result/index|02-test-result]]

เอกสารในโฟลเดอร์นี้สร้าง/แก้ไขผ่าน skill `test-intake` (ดู `CLAUDE.md`) แบ่งเป็น 3 ไฟล์/รูปแบบ:

- `acceptance-criteria.md` — ไฟล์เดียว หนึ่ง section ต่อ Backlog Item เขียนแบบ Given-When-Then (ID `AC-{RUNNING_NO}-{NN}`)
- `test-plan.md` — ไฟล์เดียวสำหรับทั้งโปรเจกต์ (scope, ประเภทการทดสอบ, environment, risk management, entry/exit criteria)
- `test-cases/{topic-slug}.md` — หนึ่งไฟล์ต่อหนึ่ง Backlog Item (Sprint) รวมทุก feature ของ Sprint นั้น แบบ step-by-step (Test ID `TC-{RUNNING_NO}-{NN}`) อ้างอิงกลับไปยัง scenario ใน `acceptance-criteria.md` โดยตรง

เนื่องจากยังไม่มีการตั้งค่า test runner อัตโนมัติในโปรเจกต์ (ดู `CLAUDE.md`) ทั้งหมดนี้จึงเป็น test case แบบ manual/black-box
