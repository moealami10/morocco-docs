import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/** pt per mm at 72 dpi */
const MM = 72 / 25.4;
/** A4 dimensions in points */
const A4_W = 210 * MM;
const A4_H = 297 * MM;
const MARGIN_X = 20 * MM;
const MARGIN_TOP = 22 * MM;
const MARGIN_BOTTOM = 20 * MM;
const LINE_HEIGHT_BODY = 7 * MM;
const COLOR_BLACK = rgb(0.08, 0.08, 0.08);
const COLOR_DARK = rgb(0.15, 0.15, 0.15);
const COLOR_GRAY = rgb(0.4, 0.4, 0.4);
const COLOR_RED = rgb(0.757, 0.153, 0.176); // #C1272D
/** Wrap a string into lines that fit within maxWidth points. */
function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
            current = candidate;
        }
        else {
            if (current)
                lines.push(current);
            current = word;
        }
    }
    if (current)
        lines.push(current);
    return lines;
}
/** Draw a block of wrapped text, return the new Y cursor. */
function drawParagraph(page, text, font, size, x, y, maxWidth, color = COLOR_DARK, lineHeight = LINE_HEIGHT_BODY) {
    const lines = wrapText(text, font, size, maxWidth);
    for (const line of lines) {
        page.drawText(line, { x, y, size, font, color });
        y -= lineHeight;
    }
    return y;
}
// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export async function generateAttestationPdf(data) {
    const doc = await PDFDocument.create();
    const page = doc.addPage([A4_W, A4_H]);
    // Embed standard fonts (no network needed)
    const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
    const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
    const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
    const bodyWidth = A4_W - 2 * MARGIN_X;
    let y = A4_H - MARGIN_TOP;
    // ── Header band ──────────────────────────────────────────────────────────
    // Company name (large, bold)
    const companyFontSize = 16;
    page.drawText(data.nomEntreprise, {
        x: MARGIN_X,
        y,
        size: companyFontSize,
        font: fontBold,
        color: COLOR_BLACK,
    });
    y -= companyFontSize * 1.4;
    // Company address (smaller)
    if (data.adresseEntreprise) {
        page.drawText(data.adresseEntreprise, {
            x: MARGIN_X,
            y,
            size: 10,
            font: fontRegular,
            color: COLOR_GRAY,
        });
        y -= 10 * 1.4;
    }
    // ICE line
    if (data.iceEntreprise) {
        page.drawText(`ICE : ${data.iceEntreprise}`, {
            x: MARGIN_X,
            y,
            size: 9,
            font: fontRegular,
            color: COLOR_GRAY,
        });
        y -= 9 * 1.4;
    }
    // Separator line
    y -= 4 * MM;
    page.drawLine({
        start: { x: MARGIN_X, y },
        end: { x: A4_W - MARGIN_X, y },
        thickness: 1,
        color: COLOR_RED,
    });
    y -= 10 * MM;
    // ── Document title ────────────────────────────────────────────────────────
    const isSalaryIncluded = data.inclureSalaire && Boolean(data.salaireBrut?.trim());
    const titleText = isSalaryIncluded
        ? 'ATTESTATION DE TRAVAIL ET DE SALAIRE'
        : 'ATTESTATION DE TRAVAIL';
    const titleSize = 16;
    const titleWidth = fontBold.widthOfTextAtSize(titleText, titleSize);
    page.drawText(titleText, {
        x: (A4_W - titleWidth) / 2,
        y,
        size: titleSize,
        font: fontBold,
        color: COLOR_RED,
    });
    y -= titleSize * 1.5;
    // Thin underline under title
    const underlineW = titleWidth * 1.15;
    page.drawLine({
        start: { x: (A4_W - underlineW) / 2, y: y + 4 },
        end: { x: (A4_W + underlineW) / 2, y: y + 4 },
        thickness: 0.5,
        color: COLOR_RED,
        opacity: 0.4,
    });
    y -= 10 * MM;
    // ── Body paragraphs ───────────────────────────────────────────────────────
    const bodySize = 11;
    const lh = 7 * MM;
    // Format dates to French locale string
    const fmt = (iso) => {
        if (!iso)
            return '___________';
        const [y, m, d] = iso.split('-');
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
        ];
        return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
    };
    const dateFin = data.toujoursEnPoste ? 'à ce jour' : fmt(data.dateFin);
    const dateDebut = fmt(data.dateDebut);
    // Build CNSS fragment
    const cnssFragment = data.noCnss
        ? `, affilié(e) à la CNSS sous le numéro ${data.noCnss},`
        : '';
    // Build Nature du contrat fragment
    const natureContratFrag = data.natureContrat
        ? ` dans le cadre d'un contrat ${data.natureContrat}`
        : '';
    // Build Salary sentence fragment
    const salaireSentence = isSalaryIncluded
        ? ` Le salaire brut mensuel perçu par l'intéressé(e) s'élève à ${data.salaireBrut.trim()} MAD.`
        : '';
    // Paragraph 1 — opening attestation
    const p1 = `Nous soussignés, ${data.nomSignataire}, agissant en qualité de ${data.qualiteSignataire} de la société ${data.nomEntreprise}, dont le siège social est situé à ${data.adresseEntreprise}, attestons par la présente que :`;
    y = drawParagraph(page, p1, fontRegular, bodySize, MARGIN_X, y, bodyWidth, COLOR_DARK, lh);
    y -= 5 * MM;
    // Paragraph 2 — core attestation sentence with contract nature & optional salary
    const employeLabel = 'M. / Mme';
    const periodText = data.toujoursEnPoste ? 'et est toujours en poste à ce jour' : `jusqu'au ${dateFin}`;
    const p2 = `${employeLabel} ${data.nomEmploye}, titulaire de la CIN n° ${data.cinEmploye}${cnssFragment} occupe / a occupé le poste de ${data.posteOccupe}${natureContratFrag} au sein de notre société à compter du ${dateDebut} ${periodText}.${salaireSentence}`;
    y = drawParagraph(page, p2, fontRegular, bodySize, MARGIN_X, y, bodyWidth, COLOR_DARK, lh);
    y -= 8 * MM;
    // Paragraph 3 — closing formula
    const p3 = "Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.";
    y = drawParagraph(page, p3, fontOblique, bodySize, MARGIN_X, y, bodyWidth, COLOR_DARK, lh);
    y -= 14 * MM;
    // ── Lieu & date d'émission ────────────────────────────────────────────────
    const lieuDate = `Fait à ${data.lieuEmission}, le ${fmt(data.dateEmission)}`;
    const ldWidth = fontRegular.widthOfTextAtSize(lieuDate, bodySize);
    page.drawText(lieuDate, {
        x: A4_W - MARGIN_X - ldWidth,
        y,
        size: bodySize,
        font: fontRegular,
        color: COLOR_DARK,
    });
    y -= 5 * MM;
    // ── Signature block ───────────────────────────────────────────────────────
    const sigName = data.nomSignataire;
    const sigQuality = data.qualiteSignataire;
    const sigNameWidth = fontBold.widthOfTextAtSize(sigName, bodySize);
    const sigQualityWidth = fontRegular.widthOfTextAtSize(sigQuality, 9);
    page.drawText(sigName, {
        x: A4_W - MARGIN_X - sigNameWidth,
        y,
        size: bodySize,
        font: fontBold,
        color: COLOR_DARK,
    });
    y -= bodySize * 1.3;
    page.drawText(sigQuality, {
        x: A4_W - MARGIN_X - sigQualityWidth,
        y,
        size: 9,
        font: fontRegular,
        color: COLOR_GRAY,
    });
    y -= 20 * MM;
    // Signature / Cachet zone — right side
    const stampBoxW = 60 * MM;
    const stampBoxH = 28 * MM;
    const stampBoxX = A4_W - MARGIN_X - stampBoxW;
    const stampBoxY = y - stampBoxH;
    page.drawRectangle({
        x: stampBoxX,
        y: stampBoxY,
        width: stampBoxW,
        height: stampBoxH,
        borderColor: COLOR_GRAY,
        borderWidth: 0.5,
        opacity: 0,
    });
    // Label inside stamp box
    const stampLabel = 'Signature & Cachet';
    const stampLabelSize = 8;
    const stampLabelW = fontOblique.widthOfTextAtSize(stampLabel, stampLabelSize);
    page.drawText(stampLabel, {
        x: stampBoxX + (stampBoxW - stampLabelW) / 2,
        y: stampBoxY + stampBoxH / 2 - stampLabelSize / 2,
        size: stampLabelSize,
        font: fontOblique,
        color: COLOR_GRAY,
        opacity: 0.6,
    });
    // ── Footer disclaimer ─────────────────────────────────────────────────────
    const footerY = MARGIN_BOTTOM + 6;
    const disclaimer = "Document généré via Kaghit.com. Ce document doit être imprimé, signé et tamponné par l'employeur pour être valide.";
    const disclaimerSize = 7.5;
    const disclaimerWidth = fontOblique.widthOfTextAtSize(disclaimer, disclaimerSize);
    if (disclaimerWidth <= bodyWidth) {
        page.drawText(disclaimer, {
            x: MARGIN_X,
            y: footerY,
            size: disclaimerSize,
            font: fontOblique,
            color: COLOR_GRAY,
            opacity: 0.7,
        });
    }
    else {
        const lines = wrapText(disclaimer, fontOblique, disclaimerSize, bodyWidth);
        let fy = footerY + disclaimerSize * (lines.length - 1) * 1.35;
        for (const line of lines) {
            page.drawText(line, {
                x: MARGIN_X,
                y: fy,
                size: disclaimerSize,
                font: fontOblique,
                color: COLOR_GRAY,
                opacity: 0.7,
            });
            fy -= disclaimerSize * 1.35;
        }
    }
    // Footer separator
    page.drawLine({
        start: { x: MARGIN_X, y: footerY + disclaimerSize * 1.8 + 2 },
        end: { x: A4_W - MARGIN_X, y: footerY + disclaimerSize * 1.8 + 2 },
        thickness: 0.4,
        color: COLOR_GRAY,
        opacity: 0.3,
    });
    const pdfBytes = await doc.save();
    return pdfBytes;
}
