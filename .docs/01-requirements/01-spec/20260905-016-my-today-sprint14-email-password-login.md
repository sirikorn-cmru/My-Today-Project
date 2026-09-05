# My Today — Sprint 14: Email/Password Login (Firebase Authentication) — Version 3

เชื่อมโยงกลับ: [[index]]

เอกสารที่เกี่ยวข้อง: [[20260829-014-my-today-sprint12-cloud-sync]] (Sprint ที่เลื่อนฟีเจอร์นี้ไว้ก่อน — Business Rule ข้อ 5 และ Out-of-scope เดิมระบุ "ไม่ทำ Email/Password ในรอบนี้" ซึ่ง Sprint 14 นี้คือการมารับช่วงอย่างเป็นทางการ), [[20260830-015-my-today-sprint13-smart-capture-image]] (Sprint ก่อนหน้าใน Version 3), [[20260806-012-my-today-sprint11-competition-demo-freeze]] (Freeze rule ของ Version 2 ที่เปิดช่องทางเข้าถึง Version 3 ผ่าน requirement intake ใหม่)

## หมายเหตุตำแหน่งใน Roadmap

Sprint นี้เป็น Sprint ที่ 3 ของ **Version 3** ต่อจาก Sprint 12 (Cloud Sync) และ Sprint 13 (Smart Capture from Image) — เปิดผ่านช่องทางเดียวกันคือ `requirement-intake` ใหม่ตามที่ Freeze rule ของ Sprint 11 ([[20260806-012-my-today-sprint11-competition-demo-freeze]]) เปิดไว้เอง ไม่ใช่การฝ่าฝืน Freeze ของ Version 2 แต่อย่างใด

## หมายเหตุสำคัญ — นี่ไม่ใช่การขัดแย้งกับ Business Rule ของ Sprint 12 แต่คือการรับช่วงสิ่งที่ถูกเลื่อนไว้

สเปก Sprint 12 ([[20260829-014-my-today-sprint12-cloud-sync]]) เขียน Business Rule ข้อ 5 ไว้ตรงๆ ว่า **"Auth provider: Google Sign-In เท่านั้นในรอบนี้ (ผ่าน Firebase Authentication) — ไม่ทำ Email/Password ในรอบนี้"** และ Out-of-scope section ก็ระบุ "Email/Password authentication (เฉพาะ Google Sign-In เท่านั้นในรอบนี้)" — คำว่า **"ในรอบนี้"** ในทั้งสองที่หมายถึง Sprint 12 **เลื่อน** ฟีเจอร์นี้ไว้ก่อนเท่านั้น ไม่ใช่การปฏิเสธถาวร

Sprint 14 นี้คือการมารับช่วงสิ่งที่ Sprint 12 เลื่อนไว้อย่างเป็นทางการ ผ่านกระบวนการ requirement intake ตามปกติ — ไม่ใช่การแก้ไขสเปก Sprint 12 ที่ verified ไปแล้ว (ไฟล์ `20260829-014-...` จะไม่ถูกแก้ไข) และไม่ใช่การขัดแย้งกับ Business Rule เดิมของ Sprint 12 แต่อย่างใด

## เป้าหมาย

เพิ่มวิธีล็อกอินด้วย **อีเมล/รหัสผ่าน** (Firebase Authentication's Email/Password provider) เป็น **วิธีล็อกอินที่สอง คู่กับ Google Sign-In เดิมของ Sprint 12** — ไม่ใช่การแทนที่ ผู้ใช้เลือกได้ว่าจะล็อกอินด้วย Google หรือด้วยอีเมล/รหัสผ่านก็ได้

Firebase Auth คืน `user` object รูปแบบเดียวกันไม่ว่ามาจาก provider ไหน ทำให้โค้ดที่มีอยู่แล้วทั้งหมด (Cloud Sync ของ Sprint 12, Firestore Security Rules ที่เช็คจาก `request.auth.uid`, Sprint 13's Smart Capture ที่เช็คแค่ "signed in หรือยัง") **ใช้งานได้ทันทีโดยไม่ต้องแก้โค้ดจุดนั้นเลย** — ฟีเจอร์นี้แตะแค่ชั้น Authentication และ UI ของหน้า Login/Profile เท่านั้น

## Feature Requirements / User Stories

- ในฐานะผู้ใช้ที่ไม่มี/ไม่อยากใช้บัญชี Google ฉันต้องการสมัครสมาชิกด้วยอีเมล/รหัสผ่านของตัวเอง เพื่อเปิดใช้ Cloud Sync ได้เหมือนผู้ใช้ Google Sign-In
- ในฐานะผู้ใช้ที่สมัครด้วยอีเมล/รหัสผ่านไว้แล้ว ฉันต้องการเข้าสู่ระบบด้วยอีเมล/รหัสผ่านเดิมได้ในครั้งถัดไป
- ในฐานะผู้ใช้ที่ลืมรหัสผ่าน ฉันต้องการวิธีรีเซ็ตรหัสผ่านผ่านอีเมล เพื่อไม่ต้องเสียบัญชีของตัวเองไปถาวร
- ในฐานะผู้ใช้ ฉันต้องการเห็นข้อความ error ที่เข้าใจง่ายเป็นภาษาไทย เมื่อกรอกอีเมล/รหัสผ่านผิดหรือมีปัญหาอื่น เพื่อรู้ว่าต้องแก้อะไร

## Business Rules

1. **วิธีล็อกอินที่สอง คู่กับ Google Sign-In เดิม ไม่ใช่การแทนที่:** ปุ่ม/ฟอร์ม Email/Password วางคู่กับปุ่ม "Sign in with Google" เดิมของ Sprint 12 ในหน้า Profile — Google Sign-In ยังทำงานเหมือนเดิมทุกประการ (non-regression)
2. **ไม่ต้องยืนยันอีเมล (Email Verification) ก่อนใช้งาน:** สมัครสมาชิกด้วยอีเมล/รหัสผ่านเสร็จแล้ว sync ได้ทันที ไม่บล็อกด้วยสถานะ verified/unverified ของอีเมล
3. **ต้องมีฟีเจอร์ "ลืมรหัสผ่าน" (Password Reset) — บังคับ ไม่ใช่ nice-to-have:** ต้องมีปุ่ม/ลิงก์แยกต่างหากสำหรับส่งอีเมลรีเซ็ตรหัสผ่าน ผ่าน Firebase's `sendPasswordResetEmail` เพราะถ้าไม่มี ผู้ใช้ที่ลืมรหัสจะเข้าบัญชีตัวเองไม่ได้อีกเลย
4. **`user` object รูปแบบเดียวกันทุก provider:** Firebase Auth คืนโครงสร้าง `user` เดียวกันไม่ว่ามาจาก Google หรือ Email/Password — โค้ดที่พึ่งพา auth state ที่มีอยู่แล้วทั้งหมด (`useCloudSync`, `firestore.rules`'s `request.auth.uid`, Sprint 13's sign-in gate ใน `SmartCaptureModal`/`QuickCaptureModal`) ต้องใช้งานได้ทันทีโดยไม่ต้องแก้โค้ดจุดนั้นเลย — ถ้าพบว่าต้องแก้จุดใดจุดหนึ่งเพื่อรองรับ provider ใหม่ ถือว่าผิดสมมติฐานนี้และต้องรายงาน ไม่ใช่แก้เงียบๆ
5. **Client-side validation ก่อนส่งค่าไป Firebase:** ตรวจรูปแบบอีเมลเบื้องต้น (regex พื้นฐาน) และรหัสผ่านอย่างน้อย 6 ตัวอักษร (ค่า default ขั้นต่ำของ Firebase Auth) ก่อนเรียก Firebase SDK เพื่อลด round-trip ที่ผิดแน่ๆ อยู่แล้ว — ไม่ใช่การแทนที่ validation ฝั่ง Firebase เอง
6. **แปล Firebase error code เป็นภาษาไทยที่เข้าใจง่าย:** ต้องครอบคลุมอย่างน้อย `auth/wrong-password` (รหัสผ่านไม่ถูกต้อง), `auth/email-already-in-use` (อีเมลนี้มีผู้ใช้แล้ว), `auth/weak-password` (รหัสผ่านสั้นเกินไป), `auth/user-not-found` (ไม่พบบัญชีนี้), `auth/invalid-email` (รูปแบบอีเมลไม่ถูกต้อง) — error code อื่นที่ไม่ตรงรายการนี้ยังต้องมี fallback message ที่เข้าใจง่ายเช่นกัน ไม่ปล่อยให้ error code ดิบของ Firebase หลุดไปแสดงตรงๆ
7. **ไม่กระทบ Firestore Security Rules เดิม:** `firestore.rules` จาก Sprint 12 (`request.auth.uid == uid`) ใช้ได้เหมือนกันไม่ว่า user จะมาจาก provider ไหน — ไม่ต้องแก้ไฟล์นี้เลยใน Sprint นี้
8. **ไม่มีการ merge บัญชี Google กับบัญชี Email/Password:** ถ้าผู้ใช้คนเดียวกันสมัครทั้งสองวิธีด้วยอีเมลเดียวกัน จะกลายเป็น 2 บัญชีที่แยกกันโดยสมบูรณ์ใน Firebase (คนละ `uid`, คนละชุดข้อมูล Firestore) — เป็นข้อจำกัดที่ทราบและยอมรับไว้ชัดเจนตั้งแต่สเปกนี้ ไม่ใช่บั๊ก ไม่ต้องแก้ในรอบนี้
9. **Precondition ภายนอกโค้ด — ต้องเปิด provider ใน Firebase Console เอง:** ต้องเข้า Firebase Console → Authentication → Sign-in method → เปิด provider "Email/Password" เอง (ขั้นตอนเดียวกับตอนเปิด Google provider ใน Sprint 12) ก่อนฟีเจอร์นี้จะทำงานได้จริงบน production — นี่คือ manual step ที่ผู้ใช้ต้องทำเอง ไม่ใช่ acceptance criteria ของโค้ด
10. **ไม่มีค่าใช้จ่ายเพิ่ม / ไม่ต้องอัปเกรดแผน:** Email/Password provider อยู่ใน Firebase Authentication ตัวเดียวกับที่ Google Sign-In ใช้อยู่แล้วบน free Spark plan เดิม — ไม่มี exception ใหม่เรื่องบัตรเครดิต/ค่าใช้จ่าย แบบที่ Sprint 13 ต้องพิจารณาตอนเลือก AI provider
11. **Non-regression:** ผู้ใช้ที่ใช้ Google Sign-In เดิมของ Sprint 12 (รวมถึงผู้ใช้ที่ไม่ signed in เลย) ต้องไม่เห็นการเปลี่ยนแปลงพฤติกรรมใดๆ เลยจาก Sprint 1-13

## ขอบเขต (Scope)

### In scope

- `src/hooks/useAuth.ts` เพิ่มฟังก์ชันใหม่ 3 ตัว: `signUpWithEmail(email, password)` (สมัครสมาชิกใหม่ ใช้ `createUserWithEmailAndPassword`), `signInWithEmail(email, password)` (เข้าสู่ระบบ ใช้ `signInWithEmailAndPassword`), `resetPassword(email)` (ส่งอีเมลรีเซ็ตรหัสผ่าน ใช้ `sendPasswordResetEmail`) — ทั้งหมดเป็นฟังก์ชันจาก Firebase SDK ที่มีอยู่แล้วในโปรเจกต์ (`firebase/auth`) ไม่ต้องเพิ่ม dependency ใหม่
- `ProfilePage` เพิ่มฟอร์ม email + password พร้อมสลับโหมดได้ระหว่าง "เข้าสู่ระบบ" (Sign In) กับ "สมัครสมาชิก" (Sign Up) วางคู่กับปุ่ม "Sign in with Google" เดิมของ Sprint 12 (ไม่ได้แทนที่) พร้อมลิงก์/ปุ่ม "ลืมรหัสผ่าน" แยกต่างหากที่เรียก `resetPassword`
- Client-side validation ตาม Business Rule ข้อ 5 (รูปแบบอีเมล + ความยาวรหัสผ่านขั้นต่ำ 6 ตัวอักษร) แสดงผลก่อนเรียก Firebase
- แปล Firebase error code เป็นข้อความไทยตาม Business Rule ข้อ 6 (จุดเดียวที่รวม mapping นี้ เพื่อให้ทั้งฟอร์ม Sign In/Sign Up/Reset Password ใช้ร่วมกันได้)
- อัปเดต CLAUDE.md/สเปก Sprint 12 ที่อ้างอิงถึง ("Google Sign-In เท่านั้น") ให้สะท้อนว่าตอนนี้มี Email/Password เป็นทางเลือกที่สองแล้ว (แก้ที่ CLAUDE.md/backlog เท่านั้น — ไม่แก้ไฟล์สเปก Sprint 12 เดิม)

### Out of scope (ห้ามทำในรอบนี้)

- Social login provider อื่นเพิ่มเติม (Facebook, Apple, GitHub ฯลฯ) — เฉพาะ Email/Password เท่านั้นในรอบนี้
- Multi-factor authentication (MFA/2FA)
- การ merge/link บัญชี Google กับบัญชี Email/Password เข้าด้วยกันเป็นบัญชีเดียว (ดู Business Rule ข้อ 8 — ข้อจำกัดที่ทราบอยู่แล้ว ไม่ใช่บั๊ก)
- Email Verification (ตาม Business Rule ข้อ 2)
- การแก้ไข `firestore.rules` (ไม่จำเป็นตาม Business Rule ข้อ 7)
- การแก้ไขไฟล์สเปก Sprint 12 (`20260829-014-...`) เดิม — คงไว้ตามที่ verified แล้ว

## Acceptance Criteria

- ผู้ใช้ใหม่กรอกอีเมล/รหัสผ่านที่ถูกต้องในโหมด "สมัครสมาชิก" แล้วสมัครสำเร็จ, sync ใช้งานได้ทันทีโดยไม่ต้องยืนยันอีเมล
- ผู้ใช้ที่สมัครไว้แล้วเข้าสู่ระบบด้วยอีเมล/รหัสผ่านเดิมได้สำเร็จในโหมด "เข้าสู่ระบบ"
- กดปุ่ม "ลืมรหัสผ่าน" แล้วได้รับอีเมลรีเซ็ตรหัสผ่านจริง (ทดสอบผ่าน Firebase Auth) และตั้งรหัสผ่านใหม่แล้วเข้าสู่ระบบด้วยรหัสใหม่ได้
- กรอกอีเมล/รหัสผ่านผิด (เช่น รหัสผ่านผิด, อีเมลซ้ำตอนสมัคร, รหัสผ่านสั้นเกินไป, ไม่พบบัญชี, รูปแบบอีเมลผิด) แล้วเห็นข้อความ error ภาษาไทยที่ตรงกับ Business Rule ข้อ 6 ทุกกรณี
- ผู้ใช้ที่ล็อกอินด้วย Email/Password แล้ว เปิด Cloud Sync ได้และ sync ข้าม session/อุปกรณ์ได้เหมือนผู้ใช้ Google Sign-In (พิสูจน์ว่า `useCloudSync`/`firestore.rules` ทำงานโดยไม่ต้องแก้โค้ด)
- ผู้ใช้ที่ล็อกอินด้วย Email/Password แล้วลองใช้ Smart Capture from Image (Sprint 13) ผ่าน sign-in gate ได้เหมือนผู้ใช้ Google Sign-In
- Google Sign-In เดิมของ Sprint 12 ยังทำงานได้ปกติทุกประการ (non-regression)

## Gate (เกณฑ์ผ่าน Sprint)

**Gate 14:** ทดสอบ end-to-end ครบ: (1) สมัครสมาชิกด้วยอีเมล/รหัสผ่านใหม่สำเร็จและ sync ได้ทันทีโดยไม่ต้องยืนยันอีเมล, (2) เข้าสู่ระบบด้วยอีเมล/รหัสผ่านเดิมสำเร็จ, (3) ฟีเจอร์ "ลืมรหัสผ่าน" ส่งอีเมลจริงและตั้งรหัสผ่านใหม่ได้จริง, (4) error message ครบทุก error code ที่ระบุใน Business Rule ข้อ 6 และแสดงเป็นภาษาไทยที่เข้าใจง่าย, (5) ผู้ใช้ Email/Password sync ข้ามอุปกรณ์ได้จริงเหมือน Google Sign-In โดยไม่ต้องแก้โค้ด `useCloudSync`/`firestore.rules`, (6) Google Sign-In เดิมยังทำงานได้ปกติ (non-regression เต็มรูปแบบเทียบ Sprint 12-13)
