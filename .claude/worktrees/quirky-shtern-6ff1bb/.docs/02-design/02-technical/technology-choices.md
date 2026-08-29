# Technology Choices

เชื่อมโยงกลับ: [[index]]

## คำอธิบาย

เอกสารนี้เป็น **เอกสารเดียวในโฟลเดอร์ [[index|02-technical]] ที่ตั้งใจเอ่ยชื่อเทคโนโลยีจริง** ต่างจากเพื่อนบ้านในโฟลเดอร์เดียวกัน — [[architecture|architecture.md]] (Conceptual Components/Data Model/Data Flow), [[database-schema|database-schema.md]] (field-level schema), [[api-spec|api-spec.md]] (Internal Data Access Contract) และ [[detailed-design|detailed-design.md]] (Sequence/State Diagram) — ซึ่งทั้งหมดนั้น**ตั้งใจ technology-agnostic** โดยออกแบบ ไม่เอ่ยชื่อ framework/library/storage ใดๆ แม้ codebase จริงจะเลือกใช้ไปแล้วก็ตาม เอกสารนี้ทำหน้าที่ตรงข้าม: บันทึกว่า codebase จริงเลือกใช้เทคโนโลยีอะไร **เพราะเหตุผลอะไร** เคยพิจารณาตัวเลือกอื่นหรือไม่ (และทำไมไม่เลือก) และ trade-off อะไรที่ยอมรับไปแล้วอย่างรู้ตัว — ไม่ใช่การเลือก stack ใหม่ แต่เป็นการบันทึกเหตุผลเบื้องหลังตัวเลือกที่ build ไปแล้วจริง (retroactive) รวมถึงช่วยตัดสินใจ library ใหม่สำหรับ Sprint ที่ยังไม่เริ่ม

เอกสารนี้เป็น **living document**: จะถูก regenerate ใหม่ทั้งหมดเป็นบางครั้ง (bootstrap ครั้งแรก หรือเมื่อผู้ใช้ต้องการทบทวนทุกตัวเลือกอีกครั้ง) แต่โดยทั่วไปแล้วจะถูก**อัปเดตแบบ incremental บ่อยกว่า** — เพิ่ม/แก้เฉพาะรายการที่มีการตัดสินใจใหม่ (เช่น เลือก library สำหรับ feature ของ Sprint 8 เป็นต้นไป) โดยไม่แตะส่วนที่เหลือของเอกสาร

---

## ข้อจำกัดของโปรเจกต์ที่มีผลต่อการเลือกเทคโนโลยี (Constraints)

ข้อจำกัดเชิงผลิตภัณฑ์/โปรเจกต์ต่อไปนี้เป็นกรอบที่ทำให้ตัวเลือกด้านล่างทุกตัวสมเหตุสมผล — ไม่ใช่แค่ "เลือกอะไร" แต่ "ทำไมต้องเลือกแบบนี้"

- **Client-only ไม่มี backend โดยตั้งใจ** — ตามที่ระบุไว้ใน section "เพิ่มเติม (20260806): ข้อกำหนดด้านกฎหมาย IT และ PDPA" ของ [[../../01-requirements/01-spec/20260806-006-my-today-sprint6-integration-ux-final-testing|Sprint 6]]: การไม่มี server ทำให้ทีมไม่ต้องกลายเป็น "ผู้ควบคุมข้อมูล (Data Controller)" ตาม PDPA — ต้องมีแค่ Privacy Notice เท่านั้น ไม่ต้องทำ consent management, ไม่ต้องมี DPO, ไม่มีภาระเก็บ log ฝั่ง server ตาม พ.ร.บ.คอมพิวเตอร์ ข้อจำกัดนี้ยังผูกกับ positioning ของผลิตภัณฑ์เอง — ตั้งใจไม่ใช่ "a Task manager" ที่ต้องเทียบกับ Todoist/Notion/Google Calendar และไม่เชื่อมต่อกับบริการภายนอกใดๆ ทั้งสิ้น
- **การแยกที่เก็บข้อมูลฝั่ง client เป็นสองชนิด** — LocalStorage สำหรับ Task/Event/Life Area/Notification/Profile และ IndexedDB สำหรับ File โดยเฉพาะ เพราะ blob ของไฟล์ไม่พอดีกับ quota แบบ string-only ขนาด ~5-10MB ของ LocalStorage (ที่มา: CLAUDE.md section "Architecture")
- **การพัฒนาแบบแบ่ง Sprint** — roadmap 11 Sprint (Version 1/Core Sprint 1-6, Competition Track Sprint 7-11) ภายใต้บริบทการแข่งขัน/งานที่ส่งตามหลักสูตร (ตามที่ [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]] วางกรอบไว้ว่าเป็น "Competition Demo") — ตัวเลือกด้านล่างหลายรายการผูกกับเงื่อนไขเรื่องเวลาที่มีจำกัดตาม roadmap นี้โดยตรง

---

## Language: TypeScript

- **เลือกใช้:** TypeScript (`^5.5.2`)
- **เหตุผล:** เพื่อ type-safety — จับ bug ได้ก่อน runtime ผู้ตัดสินใจยกตัวอย่างเจาะจงว่าเรื่องนี้สำคัญมากตอนทำ breaking change ของ Sprint 7 ที่ retrofit `Task.subject` (free text) เป็น `Task.lifeAreaId` ข้าม Task/Event/File พร้อมกัน — ความมั่นใจตอน refactor ข้าม type ทั้งระบบเป็นเหตุผลหลักที่เลือกใช้ TypeScript ตั้งแต่แรก
- **Trade-off ที่ยอมรับ:** ต้องมีขั้น type-check (`tsc --noEmit`) ก่อน build ทุกครั้ง (ดู `npm run build`) และต้องดูแล type ให้ตรงกับ shape จริงของข้อมูลที่เก็บ (เช่นตอนบัมพ์ LocalStorage key จาก `my-today:tasks` เป็น `my-today:tasks:v2`)

## Framework: React 18

- **เลือกใช้:** React (`^18.3.1`) + React DOM (`^18.3.1`)
- **เหตุผล:** ความคุ้นเคยของทีม/ผู้พัฒนา — เป็นสิ่งที่หลักสูตรสอน ไม่ใช่ผลจากการเทียบความสามารถเชิงเทคนิคกับ Vue/Svelte/Angular
- **ตัวเลือกอื่นที่พิจารณา:** ไม่มีการเทียบกับ framework อื่นอย่างเป็นทางการ (ผู้ตัดสินใจระบุชัดว่าเหตุผลคือความคุ้นเคย ไม่ใช่ feature comparison)
- **Trade-off ที่ยอมรับ:** ไม่มีการชั่งน้ำหนักทางเทคนิคกับตัวเลือกอื่นในหมวดนี้ — ยอมรับความเสี่ยงที่ framework อื่นอาจเหมาะกับสโคปนี้กว่าโดยไม่รู้ตัว เพื่อแลกกับความเร็วในการพัฒนาจากความคุ้นเคยที่มีอยู่แล้ว

## Build Tool: Vite 5

- **เลือกใช้:** Vite (`^5.3.1`) พร้อม `@vitejs/plugin-react` (`^4.3.1`) เป็น plugin คู่กันมาตรฐานสำหรับ React
- **เหตุผล:** ความเร็วของ dev server / Hot Module Replacement (HMR) — สำคัญเพราะโปรเจกต์พัฒนาแบบแบ่ง Sprint (ดู Constraints ด้านบน) ต้อง feedback loop เร็วระหว่างรอบ Sprint ต่อเนื่องกัน
- **Trade-off ที่ยอมรับ:** ผูก tooling ไว้กับ ecosystem ของ Vite (เช่น `vite.config.ts`, `import.meta.env`) ซึ่งต่างจาก tooling แบบ Create React App หรือ Webpack ที่เอกสาร/ตัวอย่างออนไลน์บางส่วนยังอ้างอิงอยู่

## Styling: Tailwind CSS 3

- **เลือกใช้:** Tailwind CSS (`^3.4.4`)
- **เหตุผล:** พัฒนา UI ได้เร็วโดยไม่ต้องสลับไปเขียนไฟล์ CSS/component แยกทุกครั้งที่ต้องปรับ style — ใช้ utility class ในตัว markup ได้ทันที
- **Trade-off ที่ยอมรับ:** markup มี class string ยาวขึ้น (readability trade-off ที่ทีม Tailwind เองก็ยอมรับเป็นธรรมชาติของแนวทางนี้) และต้องพึ่งพา `tailwind.config.js` เป็นจุดเดียวที่กำหนด design token — ดู `DESIGN.md` ที่ root ของโปรเจกต์สำหรับ token/pattern ที่ตกลงไว้

## Routing: react-router-dom v7 (BrowserRouter)

- **เลือกใช้:** `react-router-dom` (`^7.18.2`) ใช้ `BrowserRouter` (ไม่ใช่ `HashRouter`)
- **เหตุผล:** แอปมีหน้าจริงหลายหน้าที่ต้อง navigate จริง — Dashboard, Tasks, Calendar, Files, Notifications, Privacy, Life Areas, Profile — ไม่ใช่ single-page toggle เดียว จึงจำเป็นต้องมี router library ผู้ตัดสินใจยืนยันว่าเหตุผลของการ "ต้องมี router" คือ "มีหน้าจริงหลายหน้า ต้องการ navigation จริง" เพียงอย่างเดียว **ไม่ได้**อ้างเหตุผลเรื่อง URL ที่สะอาดกว่า หรือเรื่องที่ Vercel's rewrite รองรับปัญหา refresh/404 ของ `BrowserRouter` ได้ (แม้ข้อเท็จจริงนั้นจะเป็นจริงและมีบันทึกอยู่แล้วใน CLAUDE.md section "Architecture" — `vercel.json` มี SPA rewrite `/(.*)` → `/index.html` เพราะแอปใช้ `BrowserRouter`) — ข้อเท็จจริงนี้เป็นแค่บริบทสนับสนุนที่ทำให้ตัวเลือกนี้ใช้งานได้จริงบน Vercel เท่านั้น ไม่ใช่เหตุผลตอนตัดสินใจเลือก
- **Trade-off ที่ยอมรับ:** ต้องพึ่ง SPA rewrite ของ hosting (ดู Hosting section ด้านล่าง) เพื่อให้ direct navigation/refresh ไปยัง route ย่อยอย่าง `/tasks` ทำงานถูกต้อง — ถ้าเปลี่ยนไปใช้ hosting ที่ไม่รองรับ rewrite แบบนี้ต้องแก้ config เพิ่ม (หรือสลับไป `HashRouter`)

## Client-side Storage: LocalStorage + IndexedDB (แยกตามชนิดข้อมูล)

- **เลือกใช้:** LocalStorage สำหรับ Task, Event, Life Area, Notification (read/notified state), Profile — และ IndexedDB (ผ่าน wrapper ดิบใน `src/lib/fileDb.ts`) สำหรับ File เท่านั้น
- **เหตุผล:** ตรงกับ Constraints ด้านบน — blob ของไฟล์ไม่พอดีกับ LocalStorage's string-only quota ขนาด ~5-10MB จึงต้องแยกไปใช้ IndexedDB เฉพาะ entity ที่เก็บ binary data จริง ส่วน entity อื่นที่เป็นข้อมูล text/number/date ปริมาณน้อย LocalStorage เพียงพอและใช้งานง่ายกว่า (synchronous read เทียบกับ IndexedDB ที่ async)
- **Trade-off ที่ยอมรับ:** สอง storage มี characteristic ต่างกัน — LocalStorage อ่าน/เขียนแบบ synchronous ส่วน IndexedDB แบบ async เท่านั้น ทำให้ `useFiles` ต้อง expose `loaded` flag ให้หน้าที่เรียกใช้ต้องเช็คก่อน render (ต่างจาก hook อื่นที่อ่านแบบ synchronous ล้วน) และ `useFiles` เป็น hook เดียวที่ต้องมี error handling ผู้ใช้เห็นได้ (private-browsing block, quota exceeded) เพราะเป็น storage ที่มีโอกาสล้มเหลวจริงมากที่สุด

## State Management Approach: ไม่มี library เฉพาะ (Context/Redux/Zustand)

- **เลือกใช้:** ไม่มี — `App.tsx` เป็นเจ้าของ state เดียวของทุก hook (`useTasks`, `useEvents`, `useFiles`, `useNotifications`, `useLifeAreas`, `useProfile`) แล้วส่งข้อมูล/callback ลงไปเป็น props ให้ทุก route ที่เป็นลูกตรง
- **เหตุผล:** เป็นการตัดสินใจโดยตั้งใจ ไม่ใช่การมองข้าม — ผู้ตัดสินใจยืนยันว่าสโคปของแอปตอนนี้เล็กพอที่ props จะเพียงพอ จึงเลือกไม่นำ abstraction แบบ Context/Redux/Zustand เข้ามาล่วงหน้าก่อนที่จะจำเป็นจริง
- **Trade-off ที่ยอมรับ:** เสี่ยง prop-drilling มากขึ้นถ้าจำนวน route/data ที่ต้องแชร์เพิ่มขึ้นต่อไป — ดูรายการ "ตัดสินใจที่ยังเปิดอยู่" ด้านล่าง ซึ่งระบุว่าต้องทบทวนใหม่ถ้า Sprint 8-11 ทำให้ prop-drilling จัดการไม่ไหว

## Testing: ยังไม่มี test runner

- **สถานะปัจจุบัน:** ไม่มี test runner ติดตั้งในโปรเจกต์ (ไม่มี `test` script ใน `package.json`) — การทดสอบทั้งหมดเป็นแบบ manual/black-box ตามเอกสารที่ skill `test-intake` สร้างไว้ที่ `.docs/03-testing/01-test-plan/`
- **เหตุผล:** ไม่ใช่การมองข้าม — ยังไม่มี Gate ของ Sprint ใดที่บังคับให้ต้องมี automated testing จนถึงตอนนี้
- **Trade-off ที่ยอมรับ:** ไม่มี regression safety net อัตโนมัติ — พึ่งพา Black Box Testing แบบ manual ทั้งหมดตาม test case ที่เขียนไว้ล่วงหน้า ดูรายการ "ตัดสินใจที่ยังเปิดอยู่" ด้านล่างสำหรับจุดที่ควรทบทวนเรื่องนี้อีกครั้ง

## Hosting / Deploy: Vercel

- **เลือกใช้:** Vercel (ดู `vercel.json` — SPA rewrite `/(.*)` → `/index.html`)
- **เหตุผล:** deploy ได้ฟรี เหมาะกับโปรเจกต์ส่วนตัว/งานการศึกษาที่ไม่มีงบประมาณ
- **Trade-off ที่ยอมรับ:** ต้องมี SPA rewrite config เพื่อให้ `BrowserRouter` ทำงานถูกต้องตอน refresh/direct navigation (ดู Routing section ด้านบน) — เป็น config เพิ่มเติมที่ผูกกับตัวเลือก hosting นี้โดยเฉพาะ

## Toolchain defaults: ESLint, PostCSS, Autoprefixer

- **เลือกใช้:** ESLint (`^8.57.0`), PostCSS (`^8.4.38`), Autoprefixer (`^10.4.19`)
- **เหตุผล:** ไม่มีเหตุผลที่ถูกพิจารณาเป็นรายตัว — เป็น toolchain มาตรฐานที่มาพร้อมกับการตั้งค่า Vite + React + Tailwind ทั่วไป (PostCSS/Autoprefixer จำเป็นสำหรับ Tailwind ให้ทำงาน, ESLint เป็นค่าเริ่มต้นมาตรฐานของโปรเจกต์ React) ระบุไว้ตรงๆ ว่านี่ไม่ใช่ตัวเลือกที่ผ่านการชั่งน้ำหนักแบบรายการอื่นในเอกสารนี้

---

## ตัดสินใจที่ยังเปิดอยู่ (Open / Future Decisions)

- **ทบทวน State Management Approach** — ถ้า Sprint 8-11 (Universal Inbox, Now/Next/Later Timeline, การเชื่อม Task-Event-File-Note-Link ข้าม entity) ทำให้การส่ง props ลงไปหลายชั้นจัดการไม่ไหว ให้กลับมาพิจารณาเพิ่ม Context หรือ library อื่น (Redux/Zustand ฯลฯ) ในเอกสารนี้จุดนี้เป็นจุดที่ควรเพิ่ม section ใหม่
- **ตัดสินใจเรื่อง test runner** — จุดที่มีโอกาสสูงสุดที่จะต้องกลับมาตัดสินใจคือช่วง Black Box Testing ของ [[../../01-requirements/01-spec/20260806-012-my-today-sprint11-competition-demo-freeze|Sprint 11]] ถ้า Sprint นั้นทำให้ทีมต้องการ automated regression coverage จริง
- **Library สำหรับ entity ใหม่ของ Sprint 8 (Note/Link)** — [[../../01-requirements/01-spec/20260806-009-my-today-sprint8-universal-inbox-quick-capture|Sprint 8]] เพิ่ม entity ใหม่สองชนิดเข้าระบบ แต่ยังไม่มีการตัดสินใจเรื่อง library เฉพาะสำหรับ feature นี้ ณ ตอนที่เขียนเอกสารนี้ (Sprint 8-11 ยังไม่เริ่ม)
- **Library สำหรับ Timeline/Smart Priority/Life Progress ของ Sprint 9** และ **Cross-Entity Linking ของ Sprint 10** — ยังไม่มีการตัดสินใจเรื่องเทคโนโลยีเฉพาะสำหรับสองส่วนนี้เช่นกัน รอ incremental update รอบถัดไปเมื่อ Sprint เหล่านี้เริ่มงานจริง
