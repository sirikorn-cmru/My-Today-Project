# My Today — Sprint 7: Life Area / Workspace & Personal Profile (Generalize Student → General User)

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-004-my-today-sprint4-file-organizer]], [[20260806-006-my-today-sprint6-integration-ux-final-testing]]

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint แรกของ **Competition Track (Sprint 7-12, "My Today — One Life, One Workspace")** ที่ต่อยอดจาก Sprint 1-6 ("Core My Today", ปิดจบเป็น Version 1 แล้วที่ [[20260806-006-my-today-sprint6-integration-ux-final-testing]]) เดิมตอนสร้างเอกสารนี้ครั้งแรกเคยตั้งชื่อว่า "Sprint 2.5" และวางแผนแทรกระหว่าง Sprint 2 กับ Sprint 3 แต่หลังจากได้รับ roadmap "One Life, One Workspace" ที่นับ sprint นี้เป็น **Sprint 7** อย่างเป็นทางการ (ต่อจาก Sprint 6 ไม่ใช่แทรกกลาง) จึง renumber เอกสารนี้ให้ตรงกัน เนื้อหา Life Area/Personal Profile เดิมยังใช้ได้ทั้งหมด ไม่มีอะไรเปลี่ยนนอกจากตำแหน่งใน roadmap และชื่อ Sprint

**หมายเหตุสำคัญเรื่องชื่อ "Life Area":** roadmap ใหม่เรียกแนวคิดนี้ว่า "Life Area" — เป็นการเปลี่ยนชื่อจาก "Category" ที่เคยใช้ตอนสร้างเอกสารนี้ครั้งแรก (และเคยแก้เข้าไปใน Sprint 1-4 ที่เป็น Sprint spec แล้ว) ให้ตรงกับ positioning ใหม่ ("จัดชีวิต" ไม่ใช่แค่ "จัดหมวดหมู่งาน") เป็นแนวคิด/entity เดียวกันทุกประการ **ไม่ใช่การเพิ่ม hierarchy หรือ entity ใหม่** — ทุกจุดที่เอกสารนี้และ Sprint 1-4 เคยเขียนว่า "Category" ได้ถูกแทนที่ด้วย "Life Area" แล้วทั้งหมด

## เป้าหมาย

เป็นจุดเปลี่ยนสำคัญของ My Today จาก "Student App" เป็น "Personal Daily Workspace" — เพิ่มกลไกกลาง (Life Area/Workspace) ให้ Task, Event (Sprint 3), และ File (Sprint 4) จัดกลุ่มร่วมกันได้ตามบริบทชีวิตของผู้ใช้แต่ละคน ไม่ใช่ผูกกับ "วิชาเรียน" เพียงอย่างเดียว พร้อมเพิ่ม Personal Profile ให้ผู้ใช้ระบุตัวตนได้แบบไม่บังคับข้อมูลด้านการศึกษา

### Target User (ปรับปรุงระดับโปรเจกต์)

เปลี่ยนจาก "นักศึกษามหาวิทยาลัย" เป็น "บุคคลทั่วไปที่ต้องบริหารจัดการภารกิจในชีวิตประจำวัน" ตัวอย่างกลุ่มผู้ใช้: นักศึกษา, บุคลากร/พนักงาน, อาจารย์, ผู้ประกอบอาชีพอิสระ, ผู้ปกครอง, บุคคลทั่วไปที่มีหลายบทบาทในชีวิต — นักศึกษายังคงเป็นหนึ่งในกลุ่มผู้ใช้ แต่ระบบต้องไม่ใช้โครงสร้างหรือคำศัพท์ที่บังคับให้ผู้ใช้ทุกคนเป็นนักศึกษา

## Feature Requirements / User Stories

- ผู้ใช้สร้าง แก้ไข และลบ Life Area/Workspace ได้ (เช่น Work, Study, Family, Finance, Health, Personal, Project)
- ผู้ใช้เชื่อม Task (Sprint 2), Event/Schedule (Sprint 3), และ File (Sprint 4) เข้ากับ Life Area เดียวกันได้ เพื่อดูภาพรวมของแต่ละบทบาท/ด้านในชีวิตได้ในที่เดียว
- ผู้ใช้สร้างและจัดการข้อมูลส่วนตัว (Personal Profile) ได้: Name, Profile Image, Email, Preferred Name เป็นข้อมูลหลัก
- ผู้ใช้กรอกข้อมูลเสริมแบบไม่บังคับได้ (Optional Profile Field): Student ID, Faculty, Major (สำหรับผู้ใช้ที่เป็นนักศึกษา), Organization, Position (สำหรับผู้ใช้ที่เป็นพนักงาน/อาชีพอื่น)

## Business Rules

1. Life Area มี field ขั้นต่ำ: id, ชื่อ (name) — ผู้ใช้สร้างเองได้ทั้งหมด ไม่บังคับใช้ชื่อสำเร็จรูป แต่ระบบ seed ตัวอย่างเริ่มต้นให้ตอนแรกใช้งาน (เช่น Work, Study, Personal) ที่ผู้ใช้แก้ไข/ลบ/เพิ่มเองได้ภายหลัง
2. การเชื่อม Task/Event/File กับ Life Area เป็น **optional** ไม่บังคับ (Task ที่ไม่ระบุ Life Area ยังใช้งานได้ปกติ)
3. **Breaking change ที่ต้องรู้ก่อนพัฒนา:** field เดิม `Task.subject` (free text, มาจาก Sprint 2 ที่ build แล้ว) จะถูกแทนที่ด้วย `Task.lifeAreaId` (อ้างอิง Life Area entity นี้) ข้อมูล seed/localStorage เดิมที่มีอยู่ในเครื่อง dev จะถูก **reseed ใหม่ทั้งหมด** ตอนพัฒนาจริง (ไม่ต้องเขียน migration logic เพราะยังเป็นแค่ dev/seed data ไม่มี user จริงใช้งาน)
4. Personal Profile: Name เป็นข้อมูลเดียวที่ควรบังคับกรอก (หรือปล่อยว่างได้ในระยะแรกถ้ายังไม่อยากบังคับ ให้ผู้พัฒนาตัดสินใจตอนออกแบบ UI) ส่วน Profile Image, Email, Preferred Name เป็น optional เช่นกัน ห้ามบังคับกรอกข้อมูลด้านการศึกษา (Student ID/Faculty/Major) หรือข้อมูลองค์กร (Organization/Position) เด็ดขาด
5. พัฒนาต่อจาก Codebase เดิมของ Sprint 1-2 (Non-regression: ต้องรักษา Today Dashboard และ Task Management ให้ทำงานได้ครบถ้วนหลังเปลี่ยน field)

## ขอบเขต (Scope)

### In scope (Sprint 7)

- CRUD Life Area/Workspace แบบเต็มรูปแบบ
- เชื่อม Task เข้ากับ Life Area (retrofit เข้า Sprint 1-2 ที่ build แล้ว)
- เตรียม field/นิยาม Life Area ไว้ให้ Sprint 3 (Event) และ Sprint 4 (File) อ้างอิงต่อได้ทันทีตอนพัฒนา
- CRUD Personal Profile (Name, Profile Image, Email, Preferred Name + optional education/organization fields)
- หน้าจอใหม่ 2 หน้า: Life Area management, Personal Profile

### Out of scope (ห้ามทำใน Sprint นี้)

- ระบบ multi-user/บัญชีผู้ใช้หลายคน หรือ login/authentication ใดๆ (ยังเป็น client-only ไม่มี backend เหมือนเดิม)
- Cloud sync ของ Profile/Life Area
- การแชร์/social feature ของ Life Area (เช่น แชร์ Life Area ให้คนอื่น)
- AI แนะนำ Life Area อัตโนมัติ

## Acceptance Criteria

- สร้าง Life Area ใหม่ (เช่น "Finance") ได้ และนำไปผูกกับ Task ได้จริง
- แก้ไขและลบ Life Area ได้ (Task ที่เคยผูกกับ Life Area ที่ถูกลบยังคงอยู่ ไม่หาย แค่ไม่มี Life Area แล้ว)
- กรอก Personal Profile ได้โดยกรอกแค่ Name อย่างเดียวก็ใช้งานได้ ไม่ถูกบังคับกรอกข้อมูลการศึกษา/องค์กร
- Today Dashboard และ Task Management (Sprint 1-2) ยังทำงานได้ครบถ้วนหลังเปลี่ยนจาก `subject` เป็น `lifeAreaId`
- สร้าง Task ด้วย Life Area "Study" และ Task ด้วย Life Area "Finance" ใช้กลไก/หน้าจอเดียวกันทั้งหมด ไม่มี logic แยกตาม persona

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 7:** ทดสอบ 2 persona คู่ขนานด้วยกลไกเดียวกัน — (1) นักศึกษาสร้าง Task "ส่งรายงาน HCI" ใน Life Area "Study" (2) บุคคลทั่วไปสร้าง Task "จ่ายค่าไฟ" ใน Life Area "Finance" — ทั้งสองต้องทำงานผ่าน Task + Life Area + Dashboard ชุดเดียวกันได้ ไม่มี code path แยกกัน จึงถือว่าผ่าน
