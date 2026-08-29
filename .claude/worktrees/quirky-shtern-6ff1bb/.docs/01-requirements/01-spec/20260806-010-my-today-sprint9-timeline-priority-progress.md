# My Today — Sprint 9: Now/Next/Later Timeline + Smart Priority + Life Progress (Competition Track)

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260806-001-my-today-sprint1-today-dashboard]], [[20260806-002-my-today-sprint2-task-management]], [[20260806-003-my-today-sprint3-calendar-schedule]], [[20260806-007-my-today-sprint7-category-profile]], [[20260806-009-my-today-sprint8-universal-inbox-quick-capture]]

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint ที่ 3 ของ **Competition Track (Sprint 7-12, "My Today — One Life, One Workspace")** ต่อยอดจาก Sprint 7 (Life Area/Workspace & Personal Profile) และ Sprint 8 (Universal Inbox + Quick Capture) พัฒนาต่อจาก Codebase เดิมของ Sprint 1-8 ทั้งหมด

**หมายเหตุการจัดกลุ่ม:** vision ต้นฉบับแยกพูดถึง "Timeline", "Smart Priority", และ "Life Progress" เป็นแนวคิดคนละหัวข้อ แต่ไม่ได้ระบุ Sprint แยกให้ชัดเจน จึงรวม 3 อย่างนี้เข้าเป็น Sprint เดียวกัน (Sprint 9) เพราะทั้งหมดคือ "Dashboard intelligence" ที่ช่วยให้ผู้ใช้เห็นภาพรวมสถานะปัจจุบันได้ทันที หากผู้ใช้ต้องการแยกเป็นคนละ Sprint ในภายหลังสามารถแจ้งให้แยกได้

**หมายเหตุคำศัพท์:** เอกสารนี้ใช้คำว่า **"Life Area"** ตามที่ renumber/rename ไว้แล้วใน [[20260806-007-my-today-sprint7-category-profile]] ไม่ใช้คำว่า "Category"

## เป้าหมาย

ตอบคำถาม **"ตอนนี้ต้องทำอะไรก่อน"** แบบไม่ต้องมองปฏิทินทั้งเดือน และให้ผู้ใช้เห็นความคืบหน้าของวันแบบไม่ตัดสิน (ไม่ใช่ "Productivity Score")

## Feature Requirements / User Stories

- ผู้ใช้ดูมุมมอง Timeline แบบ **Now → Next → Later** แทนการมอง Calendar เต็มเดือน (รวม Task deadline + Event จากทุก Life Area เข้าด้วยกัน ไม่แยกว่ามาจากด้านไหน — Universal Dashboard)
- Dashboard/Timeline จัดลำดับรายการอัตโนมัติตาม **Smart Priority**: Overdue → Due Today → Upcoming → High Priority → Normal (ไม่ใช้ AI แค่กฎเรียงลำดับตายตัว)
- Dashboard แสดง **Life Progress**: จำนวนที่เสร็จแล้ววันนี้ (เช่น "วันนี้เสร็จแล้ว 4 จาก 7 เรื่อง") และแบ่งตาม Life Area ได้ (เช่น Work 3/4, Family 1/1, Personal 0/2)

## Business Rules

1. Timeline แบ่งเป็น 3 กลุ่ม: **Now** (รายการที่ถึงเวลาแล้วหรือเริ่มภายใน 1 ชั่วโมงข้างหน้า), **Next** (รายการที่เหลือของวันนี้ถัดจาก Now), **Later** (รายการของวันนี้ที่ไกลออกไปอีก/ยังไม่ระบุเวลาแน่นอน) — Timeline ครอบคลุมเฉพาะ "วันนี้" เท่านั้น รายการในอนาคตไกลกว่านั้นยังคงอยู่ใน Upcoming ([[20260806-001-my-today-sprint1-today-dashboard]]) และ Calendar ([[20260806-003-my-today-sprint3-calendar-schedule]]) ตามเดิม
2. Smart Priority sorting ใช้กับทั้ง Today's Tasks ([[20260806-001-my-today-sprint1-today-dashboard]]) และ Timeline: เรียงตามลำดับ Overdue ก่อน, ตามด้วย Due Today, Upcoming, High Priority, แล้วจึง Normal priority — เป็นกฎตายตัว ไม่ใช้ AI หรือ machine learning ใดๆ
3. Life Progress คำนวณจาก Task ที่มี Status = Done เทียบกับ Task ทั้งหมดที่ครบกำหนดวันนี้ แบ่งย่อยตาม Life Area ได้ ต้องไม่แสดงเป็นคะแนน/ตัดสินผู้ใช้ (ห้ามใช้คำว่า "Productivity Score") ให้แสดงเป็นตัวเลขสถานะเฉยๆ
4. พัฒนาต่อจาก Codebase เดิมของ Sprint 1-8 (Non-regression: ต้องรักษาทุกฟีเจอร์เดิมให้ทำงานได้ครบถ้วน)

## ขอบเขต (Scope)

### In scope (Sprint 9)

- มุมมอง Timeline (Now/Next/Later) รวม Task+Event จากทุก Life Area
- Smart Priority sorting (กฎตายตัว ไม่ใช้ AI) ใช้กับ Today's Tasks และ Timeline
- Life Progress บน Dashboard (รวมและแยกตาม Life Area)

### Out of scope (ห้ามทำใน Sprint นี้)

- AI-based prioritization หรือ prediction ใดๆ
- Gamification (badge, streak, คะแนนสะสม)
- การเปรียบเทียบ Progress ระหว่างผู้ใช้คนอื่น (ไม่มี social feature)

## Acceptance Criteria

- Timeline แบ่ง Now/Next/Later ถูกต้องตามเวลาปัจจุบันจริง
- รายการ Overdue ขึ้นก่อนเสมอไม่ว่า Priority จะเป็นอะไร
- Life Progress แสดงตัวเลขถูกต้องตรงกับข้อมูล Task จริง แยกตาม Life Area ได้ถูกต้อง
- ข้อความ UI ไม่มีคำว่า "Score" หรือลักษณะตัดสิน/เปรียบเทียบผู้ใช้

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 9:** จำลองวันหนึ่งที่มีรายการ เช่น 08:30 ประชุม (Work), 11:30 จ่ายค่าไฟ (Finance), 17:00 รับลูก (Family) ผู้ใช้ต้องเห็น Timeline แบ่ง Now/Next/Later ถูกต้อง และ Life Progress แยกตาม Life Area ถูกต้องตามสถานะจริงของแต่ละรายการ
