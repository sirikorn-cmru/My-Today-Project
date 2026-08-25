// Sprint 11 (เพิ่มเติม 20260823, NFR-08): เตือนผู้ใช้ก่อนพื้นที่เก็บไฟล์แนบใกล้เต็มจริง แทนที่จะให้เจอ
// error ตอนบันทึกไฟล์ล้มเหลวแบบไม่มีการเตือนล่วงหน้า ใช้ StorageManager API (navigator.storage.estimate)
// แบบ progressive enhancement เหมือน Browser Notification ของ Sprint 5 — เบราว์เซอร์/บริบทที่ไม่รองรับ
// (เช่น non-secure context, browser เก่า) จะได้ null กลับมาเฉยๆ ไม่กระทบการทำงานปกติของแอป

export interface StorageEstimate {
  usage: number
  quota: number
  percentUsed: number
}

// NFR-08 ไม่ได้กำหนดตัวเลข % ตายตัวไว้ในสเปก (บอกให้ Sprint ที่นำไปพัฒนาจริงกำหนดเอง) — เลือก 80%
// เป็นจุดเตือนแรกที่ยังเหลือพื้นที่ให้ผู้ใช้จัดการได้ทันก่อนพื้นที่จะเต็มจริง
export const QUOTA_WARNING_THRESHOLD = 0.8

export async function getStorageEstimate(): Promise<StorageEstimate | null> {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) return null
  try {
    const { usage = 0, quota = 0 } = await navigator.storage.estimate()
    if (quota === 0) return null
    return { usage, quota, percentUsed: usage / quota }
  } catch {
    return null
  }
}

export function formatQuotaWarning(estimate: StorageEstimate): string {
  const percent = Math.round(estimate.percentUsed * 100)
  return `พื้นที่จัดเก็บไฟล์แนบใกล้เต็มแล้ว (ใช้ไปแล้วประมาณ ${percent}% ของพื้นที่ที่เบราว์เซอร์อนุญาต) ควรลบไฟล์ที่ไม่จำเป็นออกก่อนพื้นที่จะเต็มจริง`
}
