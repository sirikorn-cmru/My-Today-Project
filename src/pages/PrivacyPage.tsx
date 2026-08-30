import { cardClass, pageHeaderClass } from '../lib/uiClasses'

export function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <header className={pageHeaderClass}>
        <h1 className="text-xl font-semibold">นโยบายความเป็นส่วนตัว และข้อกำหนดการใช้งาน</h1>
      </header>

      <section className="space-y-4 px-4 py-4 sm:px-6">
        <div className={cardClass}>
          <h2 className="font-semibold text-slate-900">นโยบายความเป็นส่วนตัว (Privacy Notice)</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>
              ข้อมูลทั้งหมดของคุณ (งาน, ตาราง/กิจกรรม, ไฟล์แนบ) ถูกเก็บไว้ในเครื่อง/เบราว์เซอร์ของคุณเท่านั้น
              (LocalStorage และ IndexedDB) ไม่มีการส่งข้อมูลออกไปนอกเครื่อง ไม่มีเซิร์ฟเวอร์เก็บข้อมูลของคุณ
              และไม่มีการเก็บข้อมูลวิเคราะห์ (analytics) ที่ระบุตัวตนคุณแต่อย่างใด —
              <strong> เว้นแต่คุณเลือกเปิดใช้ Cloud Sync ด้วยตัวเอง (ดูหัวข้อ "Cloud Sync" ด้านล่าง)</strong>
            </li>
            <li>
              คุณเป็นผู้ควบคุมข้อมูลของตนเองทั้งหมด — การล้างข้อมูลเบราว์เซอร์หรือแคชจะทำให้ข้อมูลหายไปอย่างถาวร
              เนื่องจากไม่มีการสำรองข้อมูลไว้ที่อื่น (เว้นแต่เปิด Cloud Sync ไว้)
            </li>
            <li>
              คำแนะนำ: ไม่ควรบันทึกข้อมูลที่อ่อนไหวมาก (เช่น เลขบัตรประชาชน หรือข้อมูลทางการเงินที่สำคัญ)
              เพราะข้อมูลใน Local Storage ของเบราว์เซอร์ไม่ได้ถูกเข้ารหัส
            </li>
          </ul>
        </div>

        <div className={cardClass}>
          <h2 className="font-semibold text-slate-900">Cloud Sync (ทางเลือก, ปิดโดยค่าเริ่มต้น)</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>
              Cloud Sync เป็นฟีเจอร์ทางเลือกที่<strong>ปิดอยู่โดยค่าเริ่มต้นเสมอ</strong> แม้คุณจะ Sign in ด้วย
              Google Account แล้วก็ตาม — ต้องกดเปิดเองที่หน้าโปรไฟล์เท่านั้นข้อมูลจึงจะเริ่มถูกส่งขึ้น cloud
            </li>
            <li>
              เมื่อคุณเปิดใช้ Cloud Sync: งาน, กิจกรรม, บันทึก, ลิงก์, Life Area, และข้อมูลโปรไฟล์ของคุณ
              (ไม่รวมไฟล์แนบ) จะถูกส่งไปเก็บที่ <strong>Google Firebase / Cloud Firestore</strong> ซึ่งเป็น
              third-party service provider ที่ประมวลผลข้อมูลส่วนบุคคลของคุณแทนเรา เพื่อให้ sync ข้ามอุปกรณ์ได้
            </li>
            <li>
              ข้อมูลบน Firestore ถูกจำกัดสิทธิ์ด้วย Security Rules ให้เข้าถึงได้เฉพาะบัญชี Google ของคุณเองเท่านั้น
              ไม่มีผู้ใช้คนอื่นเห็นหรือแก้ไขข้อมูลของคุณได้
            </li>
            <li>คุณปิดใช้ Cloud Sync กลับได้ทุกเมื่อที่หน้าโปรไฟล์ — ข้อมูลในเครื่องจะยังคงอยู่ครบตามปกติเสมอ</li>
          </ul>
        </div>

        <div className={cardClass}>
          <h2 className="font-semibold text-slate-900">ข้อกำหนดการใช้งาน (Terms of Use)</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>
              คุณต้องรับผิดชอบต่อเนื้อหาที่คุณเองบันทึกหรือแนบเข้าระบบ (งาน, ไฟล์แนบ) ห้ามใช้ระบบนี้เพื่อเก็บหรือ
              เผยแพร่เนื้อหาที่ผิดกฎหมาย
            </li>
            <li>
              เนื่องจากระบบไม่มีเซิร์ฟเวอร์เก็บหรือส่งต่อข้อมูลของผู้ใช้ (ข้อมูลอยู่ในเครื่องของคุณเท่านั้น)
              จึงไม่เข้าข่ายผู้ให้บริการที่ต้องเก็บ log ตามพระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์
              ในลักษณะเดียวกับผู้ให้บริการที่มีเซิร์ฟเวอร์
            </li>
          </ul>
        </div>

        <div className={cardClass}>
          <h2 className="font-semibold text-slate-900">ลิขสิทธิ์และทรัพย์สินทางปัญญา</h2>
          <p className="mt-2 text-sm text-slate-600">
            คุณต้องรับผิดชอบต่อลิขสิทธิ์ของไฟล์ที่คุณเองแนบเข้าระบบผ่านฟีเจอร์จัดการไฟล์ แอปนี้ไม่เผยแพร่หรือแชร์
            ไฟล์ของคุณไปยังบุคคลอื่นหรือที่ใดๆ ภายนอกเครื่องของคุณ (ไฟล์ถูกเก็บใน IndexedDB ของเครื่องคุณเท่านั้น)
            จึงไม่มีความเสี่ยงด้านการละเมิดลิขสิทธิ์จากการเผยแพร่ต่อ
          </p>
        </div>
      </section>
    </main>
  )
}
