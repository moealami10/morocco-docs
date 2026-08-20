import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import type { AutorisationData } from './types'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MM = 72 / 25.4
const A4_W = 210 * MM
const A4_H = 297 * MM
const MARGIN_X = 20 * MM
const MARGIN_TOP = 22 * MM
const MARGIN_BOTTOM = 20 * MM

const COLOR_DARK = rgb(0.15, 0.15, 0.15)
const COLOR_GRAY = rgb(0.4,  0.4,  0.4)
const COLOR_RED  = rgb(0.757, 0.153, 0.176)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function wrapText(
  text: string,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate
    } else {
      if (current) lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

function drawWrapped(
  page: ReturnType<PDFDocument['addPage']>,
  text: string,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  size: number,
  x: number,
  y: number,
  maxWidth: number,
  color = COLOR_DARK,
  lineHeight = 7 * MM,
): number {
  const lines = wrapText(text, font, size, maxWidth)
  for (const line of lines) {
    page.drawText(line, { x, y, size, font, color })
    y -= lineHeight
  }
  return y
}

const MONTHS_FR = [
  'janvier','février','mars','avril','mai','juin',
  'juillet','août','septembre','octobre','novembre','décembre',
]

function fmtDate(iso: string): string {
  if (!iso) return '___________'
  const [yr, mo, dd] = iso.split('-')
  return `${parseInt(dd, 10)} ${MONTHS_FR[parseInt(mo, 10) - 1]} ${yr}`
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export async function generateAutorisationPdf(data: AutorisationData): Promise<Uint8Array> {
  const doc  = await PDFDocument.create()
  const page = doc.addPage([A4_W, A4_H])

  const fontReg  = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const fontObl  = await doc.embedFont(StandardFonts.HelveticaOblique)

  const bodyW = A4_W - 2 * MARGIN_X
  const BS    = 11        // body font size (pt)
  const LH    = 7 * MM   // line height

  let y = A4_H - MARGIN_TOP

  // ── Type-of-authorization badge ───────────────────────────────────────────
  const badgeText = data.typeAutorisation.toUpperCase()
  const badgeSize = 8
  const badgeW    = fontBold.widthOfTextAtSize(badgeText, badgeSize) + 16
  const badgeH    = 14

  page.drawRectangle({
    x: MARGIN_X, y: y - 2, width: badgeW, height: badgeH,
    color: COLOR_RED,
  })
  page.drawText(badgeText, {
    x: MARGIN_X + 8, y: y + 1, size: badgeSize,
    font: fontBold, color: rgb(1, 1, 1),
  })
  y -= 8 * MM

  // ── Title ─────────────────────────────────────────────────────────────────
  const title     = 'AUTORISATION PARENTALE'
  const titleSize = 18
  const titleW    = fontBold.widthOfTextAtSize(title, titleSize)

  page.drawText(title, {
    x: (A4_W - titleW) / 2, y,
    size: titleSize, font: fontBold, color: COLOR_RED,
  })
  y -= titleSize * 1.4

  // Underline accent
  const ulW = titleW * 1.2
  page.drawLine({
    start: { x: (A4_W - ulW) / 2, y: y + 4 },
    end:   { x: (A4_W + ulW) / 2, y: y + 4 },
    thickness: 0.5, color: COLOR_RED, opacity: 0.4,
  })
  y -= 10 * MM

  // ── Body paragraphs ───────────────────────────────────────────────────────

  // Build the optional fragments
  const cinEnfantFrag = data.cinEnfant
    ? `, titulaire du document n\u00b0 ${data.cinEnfant},`
    : ','

  const destinationFrag = data.destination
    ? ` \u00e0 destination de ${data.destination}`
    : ''

  const accompFrag = data.accompagnePar
    ? ` Elle/Il sera accompagn\u00e9(e) par ${data.accompagnePar}.`
    : ''

  // Paragraph 1 — core authorization
  const p1 = [
    `Je soussign\u00e9(e) ${data.nomParent}, ${data.qualite},`,
    `demeurant \u00e0 ${data.adresseParent},`,
    `titulaire de la CIN n\u00b0 ${data.cinParent},`,
    `d\u00e9clare par la pr\u00e9sente autoriser mon enfant ${data.nomEnfant}${cinEnfantFrag}`,
    `n\u00e9(e) le ${fmtDate(data.dateNaissanceEnfant)},`,
    `\u00e0 ${data.motif}${destinationFrag},`,
    `du/le ${data.datesSejour}.${accompFrag}`,
  ].join(' ')

  y = drawWrapped(page, p1, fontReg, BS, MARGIN_X, y, bodyW, COLOR_DARK, LH)
  y -= 5 * MM

  // Paragraph 2 — parental authority attestation
  const p2 = `J\u2019atteste avoir le plein exercice de l\u2019autorit\u00e9 parentale \u00e0 l\u2019\u00e9gard de cet enfant.`
  y = drawWrapped(page, p2, fontObl, BS, MARGIN_X, y, bodyW, COLOR_DARK, LH)
  y -= 5 * MM

  // Optional phone line
  if (data.telephoneParent) {
    const phoneText = `Contact du parent/tuteur : ${data.telephoneParent}`
    page.drawText(phoneText, {
      x: MARGIN_X, y, size: 9.5, font: fontReg, color: COLOR_GRAY,
    })
    y -= 9.5 * 1.6
  }
  y -= 4 * MM

  // Paragraph 3 — closing formula
  const p3 = `Cette autorisation est d\u00e9livr\u00e9e pour servir et valoir ce que de droit.`
  y = drawWrapped(page, p3, fontObl, BS, MARGIN_X, y, bodyW, COLOR_DARK, LH)
  y -= 14 * MM

  // ── Lieu & date ───────────────────────────────────────────────────────────
  const lieuDate = `Fait \u00e0 ${data.lieuEmission}, le ${fmtDate(data.dateEmission)}`
  const ldW      = fontReg.widthOfTextAtSize(lieuDate, BS)
  page.drawText(lieuDate, {
    x: A4_W - MARGIN_X - ldW, y,
    size: BS, font: fontReg, color: COLOR_DARK,
  })
  y -= 5 * MM

  // ── Signatory block ───────────────────────────────────────────────────────
  const nameW = fontBold.widthOfTextAtSize(data.nomParent, BS)
  page.drawText(data.nomParent, {
    x: A4_W - MARGIN_X - nameW, y,
    size: BS, font: fontBold, color: COLOR_DARK,
  })
  y -= BS * 1.3

  const qualW = fontReg.widthOfTextAtSize(data.qualite, 9)
  page.drawText(data.qualite, {
    x: A4_W - MARGIN_X - qualW, y,
    size: 9, font: fontReg, color: COLOR_GRAY,
  })
  y -= 20 * MM

  // ── Signature box ─────────────────────────────────────────────────────────
  const boxW = 58 * MM
  const boxH = 28 * MM
  const boxX = A4_W - MARGIN_X - boxW
  const boxY = y - boxH

  page.drawRectangle({
    x: boxX, y: boxY, width: boxW, height: boxH,
    borderColor: COLOR_GRAY, borderWidth: 0.5, opacity: 0,
  })

  const sigLabel  = 'Signature du parent / tuteur'
  const slSize    = 7.5
  const slW       = fontObl.widthOfTextAtSize(sigLabel, slSize)
  page.drawText(sigLabel, {
    x: boxX + (boxW - slW) / 2,
    y: boxY + boxH / 2 - slSize / 2,
    size: slSize, font: fontObl, color: COLOR_GRAY, opacity: 0.5,
  })

  // ── Footer disclaimer ─────────────────────────────────────────────────────
  const footerY   = MARGIN_BOTTOM + 6
  const disclaimer = `Document g\u00e9n\u00e9r\u00e9 via Kaghit.com. Ce document doit \u00eatre imprim\u00e9 et sign\u00e9 par le parent ou tuteur l\u00e9gal pour \u00eatre valide.`
  const dSize     = 7.5
  const dW        = fontObl.widthOfTextAtSize(disclaimer, dSize)

  if (dW <= bodyW) {
    page.drawText(disclaimer, {
      x: MARGIN_X, y: footerY, size: dSize,
      font: fontObl, color: COLOR_GRAY, opacity: 0.7,
    })
  } else {
    const dLines = wrapText(disclaimer, fontObl, dSize, bodyW)
    let fy = footerY + dSize * (dLines.length - 1) * 1.35
    for (const line of dLines) {
      page.drawText(line, {
        x: MARGIN_X, y: fy, size: dSize,
        font: fontObl, color: COLOR_GRAY, opacity: 0.7,
      })
      fy -= dSize * 1.35
    }
  }

  page.drawLine({
    start: { x: MARGIN_X, y: footerY + dSize * 1.8 + 2 },
    end:   { x: A4_W - MARGIN_X, y: footerY + dSize * 1.8 + 2 },
    thickness: 0.4, color: COLOR_GRAY, opacity: 0.3,
  })

  return await doc.save()
}
