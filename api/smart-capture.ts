import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createRemoteJWKSet, jwtVerify } from 'jose'

// Sprint 13: Smart Capture จากรูปภาพ — this is the Server-side Integration Proxy
// (architecture.md's known-gap container) that keeps the Gemini API key secret.
// It verifies the caller is a signed-in Firebase user (Business Rule 3), forwards
// the image to Gemini's vision API, and returns extracted Event fields only —
// the image itself is never persisted anywhere (Business Rule 6, ephemeral).

const FIREBASE_PROJECT_ID = 'my-today-a25d9'
const GOOGLE_JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
const jwks = createRemoteJWKSet(new URL(GOOGLE_JWKS_URL))

async function verifyFirebaseIdToken(idToken: string): Promise<string> {
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
    audience: FIREBASE_PROJECT_ID,
  })
  if (!payload.sub) throw new Error('Token missing subject')
  return payload.sub
}

interface ExtractedEventFields {
  title?: string
  date?: string
  startTime?: string
  location?: string
}

const EXTRACTION_PROMPT = `You are extracting event details from an image (e.g. a poster, invitation, or announcement).
Read the image and extract, if present: the event title, the date (in YYYY-MM-DD format), the start time (in 24-hour HH:MM format), and the location.
Respond ONLY with a JSON object with keys "title", "date", "startTime", "location" — use an empty string "" for any field you cannot confidently determine. Do not guess a date/time/location if it is not clearly stated in the image. Do not include any other text.`

async function callGemini(imageBase64: string, mimeType: string): Promise<ExtractedEventFields> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured')

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: EXTRACTION_PROMPT },
              { inline_data: { mime_type: mimeType, data: imageBase64 } },
            ],
          },
        ],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    },
  )

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Gemini API error (${res.status}): ${body.slice(0, 300)}`)
  }

  const data = await res.json()
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Gemini returned no content')

  let parsed: ExtractedEventFields
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('Gemini response was not valid JSON')
  }
  return {
    title: typeof parsed.title === 'string' ? parsed.title : '',
    date: typeof parsed.date === 'string' ? parsed.date : '',
    startTime: typeof parsed.startTime === 'string' ? parsed.startTime : '',
    location: typeof parsed.location === 'string' ? parsed.location : '',
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { idToken, imageBase64, mimeType } = req.body ?? {}

  if (!idToken || typeof idToken !== 'string') {
    res.status(401).json({ error: 'ต้อง sign in ก่อนใช้ Smart Capture จากรูปภาพ' })
    return
  }
  try {
    await verifyFirebaseIdToken(idToken)
  } catch {
    res.status(401).json({ error: 'ยืนยันตัวตนไม่สำเร็จ กรุณา sign in ใหม่' })
    return
  }

  if (!imageBase64 || typeof imageBase64 !== 'string' || !mimeType || typeof mimeType !== 'string') {
    res.status(400).json({ error: 'ไม่พบข้อมูลรูปภาพ' })
    return
  }

  try {
    const extracted = await callGemini(imageBase64, mimeType)
    res.status(200).json(extracted)
  } catch (err) {
    res.status(502).json({
      error: 'วิเคราะห์รูปภาพไม่สำเร็จ ลองใหม่อีกครั้งหรือกรอกฟอร์มเอง',
      detail: err instanceof Error ? err.message : String(err),
    })
  }
}
