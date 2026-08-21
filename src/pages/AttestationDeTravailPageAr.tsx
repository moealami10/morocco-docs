import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { PageHeading, Card, FormField, Button } from '../components/ui'
import { generateAttestationPdf } from '../lib/attestationPdf'
import { Seo } from '../components/Seo'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NatureContrat = 'CDI' | 'CDD' | 'Stage' | 'Autre'

export interface AttestationData {
  nomEntreprise: string
  adresseEntreprise: string
  iceEntreprise: string
  nomSignataire: string
  qualiteSignataire: string
  nomEmploye: string
  cinEmploye: string
  noCnss: string
  posteOccupe: string
  natureContrat: NatureContrat
  inclureSalaire: boolean
  salaireBrut: string
  dateDebut: string
  toujoursEnPoste: boolean
  dateFin: string
  lieuEmission: string
  dateEmission: string
}

type FormErrors = Partial<Record<keyof AttestationData, string>>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TODAY = new Date().toISOString().split('T')[0]

const EMPTY: AttestationData = {
  nomEntreprise: '',
  adresseEntreprise: '',
  iceEntreprise: '',
  nomSignataire: '',
  qualiteSignataire: '',
  nomEmploye: '',
  cinEmploye: '',
  noCnss: '',
  posteOccupe: '',
  natureContrat: 'CDI',
  inclureSalaire: false,
  salaireBrut: '',
  dateDebut: '',
  toujoursEnPoste: true,
  dateFin: '',
  lieuEmission: '',
  dateEmission: TODAY,
}

// ---------------------------------------------------------------------------
// Draft persistence (sessionStorage — survives page navigation within the
// same tab, clears automatically when the tab/browser closes)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'kaghit:draft:attestation-de-travail'

function loadDraft(): AttestationData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : null
  } catch {
    return null
  }
}

function saveDraft(data: AttestationData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage unavailable
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

function formatDateIsoToArabic(iso: string): string {
  if (!iso) return '___________'
  const [y, m, d] = iso.split('-')
  const months = [
    'يناير','فبراير','مارس','أبريل','مايو','يونيو',
    'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر',
  ]
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`
}

// ---------------------------------------------------------------------------
// Preview component
// ---------------------------------------------------------------------------

interface PreviewProps {
  data: AttestationData
}

const DocumentPreview: React.FC<PreviewProps> = ({ data }) => {
  const d = data

  const cnssLine = d.noCnss
    ? `، منت associated with the CNSS تحت الرقم ${d.noCnss},`
    : ''

  const periodLine = d.toujoursEnPoste
    ? `بدءًا من ${formatDateIsoToArabic(d.dateDebut)} وما زال يعمل حتى اليوم`
    : `من ${formatDateIsoToArabic(d.dateDebut)} إلى ${formatDateIsoToArabic(d.dateFin)}`

  const hasData =
    d.nomEntreprise ||
    d.nomEmploye ||
    d.cinEmploye ||
    d.posteOccupe ||
    d.dateDebut ||
    d.nomSignataire

  const isSalaryIncluded = d.inclureSalaire && Boolean(d.salaireBrut.trim())

  return (
    <div
      className="font-serif bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden"
      aria-label="معاينة المستند"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Preview header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 border-b border-neutral-100">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
        </span>
        <span className="text-xs text-neutral-400 font-sans ml-1">معاينة المستند</span>
        {isSalaryIncluded && (
          <span className="ml-auto text-[10px] font-sans font-semibold text-primary bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
            عمل & راتب
          </span>
        )}
      </div>

      {/* A4-ish body */}
      <div className="p-6 sm:p-8 text-[13px] leading-relaxed text-neutral-800 min-h-[420px]">
        {!hasData ? (
          <p className="text-neutral-300 italic text-center mt-16 font-sans text-sm">
            املأ النموذج لمعاينة المستند…
          </p>
        ) : (
          <>
            {/* Company header */}
            {d.nomEntreprise && (
              <div className="mb-5">
                <p className="font-bold text-base text-neutral-900">{d.nomEntreprise}</p>
                {d.adresseEntreprise && (
                  <p className="text-neutral-500 text-[11px]">{d.adresseEntreprise}</p>
                )}
                {d.iceEntreprise && (
                  <p className="text-neutral-500 text-[11px]">الرقم التعريفي للشركة : {d.iceEntreprise}</p>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="my-4 border-t-2 border-primary/30" aria-hidden="true" />

            {/* Title */}
            <h2 className="text-center font-bold text-[14px] sm:text-[15px] tracking-widest text-primary uppercase mb-6">
              {isSalaryIncluded
                ? 'شهادة عمل وراتب'
                : 'شهادة عمل'}
            </h2>

            {/* Opening */}
            <p className="mb-4 text-justify">
              نحن الموقعين أدناه،{' '}
              <strong>{d.nomSignataire || '___________'}</strong>
              {d.qualiteSignataire && (
                <>, ونعمل صفة <strong>{d.qualiteSignataire}</strong></>
              )}{' '}
              من شركة{' '}
              <strong>{d.nomEntreprise || '___________'}</strong>
              {d.adresseEntreprise && (
                <>, ومقرها الرئيسي في {d.adresseEntreprise}</>
              )}
              , نشهد بما يلي أن&nbsp;:
            </p>

            {/* Core attestation */}
            <p className="mb-4 text-justify">
              السيد/السيدة&nbsp;<strong>{d.nomEmploye || '___________'}</strong>
              , حامل بطاقة التعريف الوطنية رقم&nbsp;
              <strong>{d.cinEmploye || '___________'}</strong>
              {cnssLine && <span>{cnssLine}</span>}
              {' '}يشغل /&nbsp;شغل منصب{' '}
              <strong>{d.posteOccupe || '___________'}</strong>{' '}
              في إطار عقد عمل <strong>{d.natureContrat}</strong> داخل شركتنا {periodLine}.
              {isSalaryIncluded && (
                <> والراتب الشهري الإجمالي الذي يتقاضاه المعني بالأمر يبلغ <strong>{d.salaireBrut} درهم</strong>.</>
              )}
            </p>

            {/* Closing formula */}
            <p className="mb-6 italic text-justify">
              تُسلم هذه الشهادة للمعني بالأمر للاستخدام المشروع.
            </p>

            {/* Lieu / date */}
            <p className="text-right mb-1">
              حرر في {d.lieuEmission || '___________'}، بتاريخ {formatDateIsoToArabic(d.dateEmission)}
            </p>

            {/* Signatory */}
            <div className="text-right mb-6">
              <p className="font-bold">{d.nomSignataire || '___________'}</p>
              {d.qualiteSignataire && (
                <p className="text-neutral-500 text-[11px]">{d.qualiteSignataire}</p>
              )}
            </div>

            {/* Stamp box */}
            <div className="flex justify-end">
              <div className="border border-dashed border-neutral-300 rounded w-44 h-24 flex items-center justify-center">
                <span className="text-[10px] italic text-neutral-300">التوقيع & الختم</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const AttestationDeTravailPageAr: React.FC = () => {
  const [data, setData] = useState<AttestationData>(() => loadDraft() ?? EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

  // Persist to sessionStorage on every change
  useEffect(() => {
    saveDraft(data)
  }, [data])

  // Generic field setter
  const set = useCallback(
    <K extends keyof AttestationData>(field: K, value: AttestationData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }))
      if (submitted) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    },
    [submitted],
  )

  // Re-validate live once the user has submitted once
  const currentErrors = useMemo<FormErrors>(() => {
    if (!submitted) return errors
    return validate(data)
  }, [submitted, data, errors])

  const handleDownload = async () => {
    setSubmitted(true)
    const errs = validate(data)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErrorEl = document.querySelector('[aria-invalid="true"]')
      firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsGenerating(true)
    setPdfError(null)
    try {
      const bytes = await generateAttestationPdf(data)
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = data.inclureSalaire ? 'شهادة-عمل-وراتب.pdf' : 'شهادة-عمل.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      clearDraft()
      setData(EMPTY)
      setSubmitted(false)
    } catch (e) {
      console.error(e)
      setPdfError('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsGenerating(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
  const inputBase = (hasErr: boolean) =>
    `${inputClass} ${hasErr ? 'border-primary bg-primary-50' : 'border-neutral-200 bg-white hover:border-neutral-300'}`

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="شهادة عمل مغربية — مولد مجاني عبر الإنترنت"
        description="نموذج شهادة عمل مغربية: املأ النموذج وحمل شهادة العمل بصيغة PDF في بضع نقرات، مجانًا تمامًا."
        canonicalUrl="https://kaghit.com/ar/attestation-de-travail"
        lang="ar"
      />

      <PageHeading
        title="شهادة عمل"
        description="املأ النموذج أدناه. يتم إنشاء مستند PDF في متصفحك. تبقى معلوماتك في متصفحك ولا تُرسل إلى خوادمنا."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        }
      />

      {/* Two-column layout on desktop */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">

        {/* ── Left: Form ── */}
        <form
          id="attestation-form-ar"
          noValidate
          onSubmit={(e) => { e.preventDefault(); handleDownload() }}
          aria-label="نموذج شهادة العمل"
          dir="rtl"
        >
          {/* Informational Callout: Distinction attestation vs certificat de travail */}
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs text-blue-900">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <div className="leading-relaxed">
              <strong>ملاحظة معلوماتية:</strong> يمكن طلب شهادة العمل في أي وقت أثناء العلاقة الوظيفية ولا يتوجب légalement ذكر الراتب. وهي تختلف عن <em>شهادة نهاية الخدمة</em> التي يلزم على المشغل تقديمها خلال 8 أيام من انتهاء العقد (الفصل 72 من قانون الشغل المغربي).
            </div>
          </div>

          {/* Section: Entreprise */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              معلومات الشركة
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomEntreprise" label="اسم الشركة" required error={currentErrors.nomEntreprise}>
                <input
                  id="nomEntreprise"
                  type="text"
                  maxLength={100}
                  value={data.nomEntreprise}
                  onChange={(e) => set('nomEntreprise', e.target.value)}
                  placeholder="مثال شركة مسؤولية محدودة"
                  aria-invalid={!!currentErrors.nomEntreprise}
                  aria-describedby={currentErrors.nomEntreprise ? 'nomEntreprise-error' : undefined}
                  className={inputBase(!!currentErrors.nomEntreprise)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.nomEntreprise.length}/100 أحرف
                </p>
              </FormField>

              <FormField id="adresseEntreprise" label="عنوان الشركة" required error={currentErrors.adresseEntreprise}>
                <input
                  id="adresseEntreprise"
                  type="text"
                  maxLength={100}
                  value={data.adresseEntreprise}
                  onChange={(e) => set('adresseEntreprise', e.target.value)}
                  placeholder="123، شارع محمد الخامس، الدار البيضاء"
                  aria-invalid={!!currentErrors.adresseEntreprise}
                  aria-describedby={currentErrors.adresseEntreprise ? 'adresseEntreprise-error' : undefined}
                  className={inputBase(!!currentErrors.adresseEntreprise)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.adresseEntreprise.length}/100 أحرف
                </p>
              </FormField>

              <FormField id="iceEntreprise" label="الرقم التعريفي للشركة" hint="اختياري — المعرف الموحد للشركة" error={currentErrors.iceEntreprise}>
                <input
                  id="iceEntreprise"
                  type="text"
                  maxLength={20}
                  value={data.iceEntreprise}
                  onChange={(e) => set('iceEntreprise', e.target.value)}
                  placeholder="000000000000000"
                  className={inputBase(false)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.iceEntreprise.length}/20 أحرف
                </p>
              </FormField>
            </div>
          </Card>

          {/* Section: Signataire */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              الموقع
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomSignataire" label="اسم ولقب الموقع" required error={currentErrors.nomSignataire}>
                <input
                  id="nomSignataire"
                  type="text"
                  maxLength={60}
                  value={data.nomSignataire}
                  onChange={(e) => set('nomSignataire', e.target.value)}
                  placeholder="أحمدألعمامي"
                  aria-invalid={!!currentErrors.nomSignataire}
                  aria-describedby={currentErrors.nomSignataire ? 'nomSignataire-error' : undefined}
                  className={inputBase(!!currentErrors.nomSignataire)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.nomSignataire.length}/60 أحرف
                </p>
              </FormField>

              <FormField id="qualiteSignataire" label="صفة الموقع" required error={currentErrors.qualiteSignataire}>
                <input
                  id="qualiteSignataire"
                  type="text"
                  maxLength={80}
                  value={data.qualiteSignataire}
                  onChange={(e) => set('qualiteSignataire', e.target.value)}
                  placeholder="مدير الموارد البشرية"
                  aria-invalid={!!currentErrors.qualiteSignataire}
                  aria-describedby={currentErrors.qualiteSignataire ? 'qualiteSignataire-error' : undefined}
                  className={inputBase(!!currentErrors.qualiteSignataire)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.qualiteSignataire.length}/80 أحرف
                </p>
              </FormField>
            </div>
          </Card>

          {/* Section: Employé */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              معلومات الموظف
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomEmploye" label="اسم ولقب الموظف" required error={currentErrors.nomEmploye}>
                <input
                  id="nomEmploye"
                  type="text"
                  maxLength={60}
                  value={data.nomEmploye}
                  onChange={(e) => set('nomEmploye', e.target.value)}
                  placeholder="فاطمة الزهراء بنعلي"
                  aria-invalid={!!currentErrors.nomEmploye}
                  aria-describedby={currentErrors.nomEmploye ? 'nomEmploye-error' : undefined}
                  className={inputBase(!!currentErrors.nomEmploye)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.nomEmploye.length}/60 أحرف
                </p>
              </FormField>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="cinEmploye" label="بطاقة التعريف الوطنية للموظف" required error={currentErrors.cinEmploye}>
                  <input
                    id="cinEmploye"
                    type="text"
                    maxLength={20}
                    value={data.cinEmploye}
                    onChange={(e) => set('cinEmploye', e.target.value.toUpperCase())}
                    placeholder="AB123456"
                    aria-invalid={!!currentErrors.cinEmploye}
                    aria-describedby={currentErrors.cinEmploye ? 'cinEmploye-error' : undefined}
                    className={inputBase(!!currentErrors.cinEmploye)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.cinEmploye.length}/20 أحرف
                  </p>
                </FormField>

                <FormField id="noCnss" label="رقم الضمان الاجتماعي" hint="اختياري" error={currentErrors.noCnss}>
                  <input
                    id="noCnss"
                    type="text"
                    maxLength={20}
                    value={data.noCnss}
                    onChange={(e) => set('noCnss', e.target.value)}
                    placeholder="1234567"
                    className={inputBase(false)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.noCnss.length}/20 أحرف
                  </p>
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="posteOccupe" label="المنصب المشغول" required error={currentErrors.posteOccupe}>
                  <input
                    id="posteOccupe"
                    type="text"
                    maxLength={80}
                    value={data.posteOccupe}
                    onChange={(e) => set('posteOccupe', e.target.value)}
                    placeholder="مهندس برمجيات"
                    aria-invalid={!!currentErrors.posteOccupe}
                    aria-describedby={currentErrors.posteOccupe ? 'posteOccupe-error' : undefined}
                    className={inputBase(!!currentErrors.posteOccupe)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.posteOccupe.length}/80 أحرف
                  </p>
                </FormField>

                <FormField id="natureContrat" label="نوع العقد" required error={currentErrors.natureContrat}>
                  <div className="relative">
                    <select
                      id="natureContrat"
                      value={data.natureContrat}
                      onChange={(e) => set('natureContrat', e.target.value as NatureContrat)}
                      aria-invalid={!!currentErrors.natureContrat}
                      className={inputBase(!!currentErrors.natureContrat) + ' cursor-pointer appearance-none bg-white'}
                    >
                      <option value="CDI">عقد غير محدد المدة (CDI)</option>
                      <option value="CDD">عقد محدد المدة (CDD)</option>
                      <option value="Stage">التدريب</option>
                      <option value="Autre">أخرى</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </FormField>
              </div>

              {/* Optional salary inclusion */}
              <div className="flex flex-col gap-3 pt-2 border-t border-neutral-100">
                <label htmlFor="inclureSalaire" className="flex items-center gap-3 cursor-pointer select-none group">
                  <input
                    id="inclureSalaire"
                    type="checkbox"
                    checked={data.inclureSalaire}
                    onChange={(e) => set('inclureSalaire', e.target.checked)}
                    className="sr-only peer"
                  />
                  <span className="relative inline-flex h-5 w-9 shrink-0 rounded-full bg-neutral-200 transition-colors duration-200 peer-checked:bg-primary group-hover:bg-neutral-300 peer-checked:group-hover:bg-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-primary/50">
                    <span className="pointer-events-none absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-4" />
                  </span>
                  <span className="text-sm font-medium text-neutral-700">
                    إدراج الراتب <span className="text-xs font-normal text-neutral-500">(شهادة عمل وراتب)</span>
                  </span>
                </label>

                {data.inclureSalaire && (
                  <div className="mt-1 pl-12">
                    <FormField id="salaireBrut" label="الراتب الشهري الإجمالي (درهم)" required error={currentErrors.salaireBrut}>
                      <input
                        id="salaireBrut"
                        type="text"
                        maxLength={20}
                        value={data.salaireBrut}
                        onChange={(e) => set('salaireBrut', e.target.value)}
                        placeholder="12500"
                        aria-invalid={!!currentErrors.salaireBrut}
                        aria-describedby={currentErrors.salaireBrut ? 'salaireBrut-error' : undefined}
                        className={inputBase(!!currentErrors.salaireBrut)}
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        {data.salaireBrut.length}/20 أحرف
                      </p>
                    </FormField>
                  </div>
                )}
              </div>

              <FormField id="dateDebut" label="تاريخ البداية" required error={currentErrors.dateDebut}>
                <input
                  id="dateDebut"
                  type="date"
                  value={data.dateDebut}
                  onChange={(e) => set('dateDebut', e.target.value)}
                  aria-invalid={!!currentErrors.dateDebut}
                  aria-describedby={currentErrors.dateDebut ? 'dateDebut-error' : undefined}
                  className={inputBase(!!currentErrors.dateDebut)}
                />
              </FormField>

              {/* Still-employed toggle */}
              <div className="flex items-center gap-3 py-1">
                <label
                  htmlFor="toujoursEnPoste"
                  className="flex items-center gap-3 cursor-pointer select-none group"
                >
                  <input
                    id="toujoursEnPoste"
                    type="checkbox"
                    checked={data.toujoursEnPoste}
                    onChange={(e) => set('toujoursEnPoste', e.target.checked)}
                    className="sr-only peer"
                  />
                  <span className="relative inline-flex h-5 w-9 shrink-0 rounded-full bg-neutral-200 transition-colors duration-200 peer-checked:bg-primary group-hover:bg-neutral-300 peer-checked:group-hover:bg-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-primary/50">
                    <span className="pointer-events-none absolute left-0.5 top-0.5 inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-4" />
                  </span>
                  <span className="text-sm font-medium text-neutral-700">
                    ما زال يعمل حاليًا
                  </span>
                </label>
              </div>

              {/* Conditional end date */}
              {!data.toujoursEnPoste && (
                <FormField id="dateFin" label="تاريخ النهاية" required error={currentErrors.dateFin}>
                  <input
                    id="dateFin"
                    type="date"
                    value={data.dateFin}
                    onChange={(e) => set('dateFin', e.target.value)}
                    aria-invalid={!!currentErrors.dateFin}
                    aria-describedby={currentErrors.dateFin ? 'dateFin-error' : undefined}
                    className={inputBase(!!currentErrors.dateFin)}
                  />
                </FormField>
              )}
            </div>
          </Card>

          {/* Section: Émission */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              مكان وتاريخ الإصدار
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField id="lieuEmission" label="مكان الإصدار" required error={currentErrors.lieuEmission}>
                <input
                  id="lieuEmission"
                  type="text"
                  maxLength={60}
                  value={data.lieuEmission}
                  onChange={(e) => set('lieuEmission', e.target.value)}
                  placeholder="الدار البيضاء"
                  aria-invalid={!!currentErrors.lieuEmission}
                  aria-describedby={currentErrors.lieuEmission ? 'lieuEmission-error' : undefined}
                  className={inputBase(!!currentErrors.lieuEmission)}
                />
              </FormField>

              <FormField id="dateEmission" label="تاريخ الإصدار" required error={currentErrors.dateEmission}>
                <input
                  id="dateEmission"
                  type="date"
                  value={data.dateEmission}
                  onChange={(e) => set('dateEmission', e.target.value)}
                  aria-invalid={!!currentErrors.dateEmission}
                  aria-describedby={currentErrors.dateEmission ? 'dateEmission-error' : undefined}
                  className={inputBase(!!currentErrors.dateEmission)}
                />
              </FormField>
            </div>
          </Card>

          {/* PDF error */}
          {pdfError && (
            <div role="alert" className="mb-4 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              {pdfError}
            </div>
          )}

          {/* Download button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-base"
            disabled={isGenerating}
            id="btn-telecharger-attestation-ar"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                جاري الإنشاء…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v7.44l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0L5.72 9.78a.75.75 0 011.06-1.06l2.47 2.47V3.75A.75.75 0 0110 3zM3.25 14a.75.75 0 01.75.75v1.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-1.5a.75.75 0 011.5 0v1.5A2 2 0 0115.5 18h-11A2 2 0 012.5 16v-1.25A.75.75 0 013.25 14z" clipRule="evenodd" />
                </svg>
                تحميل ملف PDF
              </>
            )}
          </Button>

          {/* Disclaimer */}
          <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>ملحوظة:</strong> يجب طباعة هذا المستند وتوقيعه وختمه من قبل المشغل ليكون صالحًا. لا constituye نصيحة قانونية أو ضريبية.
            </p>
          </div>
        </form>

        {/* ── Right: Live preview ── */}
        <div className="lg:sticky lg:top-20">
          <DocumentPreview data={data} />

          <p className="mt-3 text-center text-xs text-neutral-400">
            يتم تحديث المعاينة في الوقت الفعلي أثناء ملء النموذج.
          </p>
        </div>
      </div>

      {/* ── Informational / SEO Section ── */}
      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          كل ما تحتاج معرفته عن شهادة العمل بالمغرب
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              دور وفائدة المستند
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              شهادة العمل هي وثيقة رسمية يصدرها المشغل تثبت أن الموظف يمارس أو مارس نشاطًا مهنيًا داخل الشركة. تُ Formalize وجود عقد العمل، والأقدمية، والمنصب المشغول.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              الاستعمال الشائع في المغرب
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              بالمغرب، تُطلب شهادة العمل غالبًا لفتح حساب بنكي، وطلبات القروض، وملفات التأشيرات، واشتراكات التأمين،-or still for الاجراءات الإدارية لدى الصندوق الوطني للضمان الاجتماعي والصندوق mutual.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              القيمة القانونية والتوقيع
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              يسمح هذا النموذج بإنشاء مستند منظم حسب الاستخدام الشائع. لكي تكون له قيمة قانونية كإثبات، يجب أن تُطبع الشهادة الأصلية وتوقع من قبل الممثل القانوني للشركة وتوضع عليها الختم الرسمي. هذه الأداة لا تستبدل الاستشارة القانونية.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default AttestationDeTravailPageAr