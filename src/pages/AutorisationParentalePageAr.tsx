import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { PageHeading, Card, FormField, Button } from '../components/ui'
import { generateAutorisationPdf } from '../lib/autorisationPdf'
import { Seo } from '../components/Seo'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TypeAutorisation =
  | " Voyage إلى الخارج"
  | 'رحلة وطنية'
  | 'نشاط رياضي / مدرسي'
  | 'أخرى'

export type QualiteParent = 'أب' | 'أم' | 'وصي قانوني'

export interface AutorisationData {
  typeAutorisation: TypeAutorisation
  nomParent: string
  qualite: QualiteParent
  cinParent: string
  adresseParent: string
  telephoneParent: string
  nomEnfant: string
  dateNaissanceEnfant: string
  cinEnfant: string        // اختياري
  destination: string      // فقط عندما يكون النوع رحلة
  datesSejour: string
  accompagnePar: string    // اختياري
  motif: string
  lieuEmission: string
  dateEmission: string
}

type FormErrors = Partial<Record<keyof AutorisationData, string>>

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TODAY = new Date().toISOString().split('T')[0]

const TYPES_AUTORISATION: TypeAutorisation[] = [
  " Voyage إلى الخارج",
  'رحلة وطنية',
  'نشاط رياضي / مدرسي',
  'أخرى',
]

const QUALITES: QualiteParent[] = ['أب', 'أم', 'وصي قانوني']

const TRAVEL_TYPES: TypeAutorisation[] = [" Voyage إلى الخارج", 'رحلة وطنية']

const EMPTY: AutorisationData = {
  typeAutorisation: " Voyage إلى الخارج",
  nomParent: '',
  qualite: 'أب',
  cinParent: '',
  adresseParent: '',
  telephoneParent: '',
  nomEnfant: '',
  dateNaissanceEnfant: '',
  cinEnfant: '',
  destination: '',
  datesSejour: '',
  accompagnePar: '',
  motif: '',
  lieuEmission: '',
  dateEmission: TODAY,
}

// ---------------------------------------------------------------------------
// Draft persistence (sessionStorage)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'kaghit:draft:autorisation-parentale'

function loadDraft(): AutorisationData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : null
  } catch {
    return null
  }
}

function saveDraft(data: AutorisationData) {
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MONTHS_AR = [
  'يناير','فبراير','مارس','أبريل','مايو','يونيو',
  'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر',
]

function formatDate(iso: string): string {
  if (!iso) return '___________'
  const [yr, mo, dd] = iso.split('-')
  return `${parseInt(dd, 10)} ${MONTHS_AR[parseInt(mo, 10) - 1]} ${yr}`
}

function isTravelType(t: TypeAutorisation): boolean {
  return TRAVEL_TYPES.includes(t)
}

function validate(data: AutorisationData): FormErrors {
  const err: FormErrors = {}
  if (!data.nomParent.trim())             err.nomParent = 'حقل إلزامي'
  if (!data.cinParent.trim())             err.cinParent = 'حقل إلزامي'
  if (!data.adresseParent.trim())         err.adresseParent = 'حقل إلزامي'
  if (!data.telephoneParent.trim())       err.telephoneParent = 'حقل إلزامي'
  if (!data.nomEnfant.trim())             err.nomEnfant = 'حقل إلزامي'
  if (!data.dateNaissanceEnfant)          err.dateNaissanceEnfant = 'حقل إلزامي'
  if (isTravelType(data.typeAutorisation) && !data.destination.trim())
    err.destination = 'حقل إلزامي لنوع الرحلة'
  if (!data.datesSejour.trim())           err.datesSejour = 'حقل إلزامي'
  if (!data.motif.trim())                 err.motif = 'حقل إلزامي'
  if (!data.lieuEmission.trim())          err.lieuEmission = 'حقل إلزامي'
  if (!data.dateEmission)                 err.dateEmission = 'حقل إلزامي'
  return err
}

// ---------------------------------------------------------------------------
// Shared input class helper
// ---------------------------------------------------------------------------
const inputCls = (hasErr: boolean) =>
  [
    'w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900',
    'placeholder-neutral-400 transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
    hasErr
      ? 'border-primary bg-primary-50'
      : 'border-neutral-200 bg-white hover:border-neutral-300',
  ].join(' ')

const selectCls = (hasErr: boolean) =>
  [
    'w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900 bg-white',
    'transition-colors duration-150 cursor-pointer appearance-none',
    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
    hasErr
      ? 'border-primary bg-primary-50'
      : 'border-neutral-200 hover:border-neutral-300',
  ].join(' ')

// ---------------------------------------------------------------------------
// Live Preview
// ---------------------------------------------------------------------------
interface PreviewProps { data: AutorisationData }

const DocumentPreview: React.FC<PreviewProps> = ({ data }) => {
  const d = data

  const cinEnfantFrag = d.cinEnfant
    ? `، حامل بطاقة التعريف الوطنية رقم ${d.cinEnfant},`
    : `،`

  const destinationFrag = d.destination
    ? ` إلى وجهة ${d.destination}`
    : ''

  const accompFrag = d.accompagnePar
    ? ` سيُرافَقّ${d.accompagnePar}.`
    : ''

  const hasContent = d.nomParent || d.nomEnfant || d.motif

  return (
    <div
      className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden"
      aria-label="معاينة المستند"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Toolbar strip */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 border-b border-neutral-100">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
        </span>
        <span className="text-xs text-neutral-400 font-sans ml-1 select-none">معاينة المستند</span>
        {/* Type badge */}
        <span className="ml-auto inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-[10px] font-semibold text-primary border border-primary-100">
          {d.typeAutorisation.trim()}
        </span>
      </div>

      {/* Document body */}
      <div className="p-6 sm:p-8 text-[13px] leading-relaxed text-neutral-800 font-serif min-h-[480px]">
        {!hasContent ? (
          <p className="text-neutral-300 italic text-center mt-20 font-sans text-sm">
            املأ النموذج لمعاينة المستند…
          </p>
        ) : (
          <>
            {/* Title */}
            <h2 className="text-center font-bold text-[15px] tracking-widest text-primary uppercase mb-6">
              إذن الوالدين
            </h2>

            {/* Paragraph 1 */}
            <p className="mb-4 text-justify">
              أنا الموقع أدناه <strong>{d.nomParent || '___________'}</strong>،{' '}
              {d.qualite},
              {d.adresseParent && <> المقيم في {d.adresseParent},</>}{' '}
              حامل بطاقة التعريف الوطنية رقم&nbsp;<strong>{d.cinParent || '___________'}</strong>,
              أصرّح بإذن لابني/ابنتي{' '}
              <strong>{d.nomEnfant || '___________'}</strong>
              {cinEnfantFrag} مواليد {formatDate(d.dateNaissanceEnfant)},
              للقيام بـ<strong>{d.motif || '___________'}</strong>
              {destinationFrag},
              خلال الفترة{ d.datesSejour || '___________' }.
              {accompFrag && <> {accompFrag}</>}
            </p>

            {/* Paragraph 2 */}
            <p className="mb-4 italic text-justify">
              أؤكد أنني أمارس كامل سلطة الوالدين على هذا الطفل.
            </p>

            {/* Phone if present */}
            {d.telephoneParent && (
              <p className="text-[11px] text-neutral-500 mb-4">
                وسيلة التواصل مع الوالد/الوصي : {d.telephoneParent}
              </p>
            )}

            {/* Closing */}
            <p className="mb-6 italic text-justify">
              يُسلم هذا الإذن للاستخدام المشروع.
            </p>

            {/* Lieu / date */}
            <p className="text-right mb-1">
              حرر في {d.lieuEmission || '___________'}، بتاريخ {formatDate(d.dateEmission)}
            </p>

            {/* Signatory */}
            <div className="text-right mb-6">
              <p className="font-bold">{d.nomParent || '___________'}</p>
              <p className="text-[11px] text-neutral-500">{d.qualite}</p>
            </div>

            {/* Signature box */}
            <div className="flex justify-end">
              <div className="border border-dashed border-neutral-300 rounded w-40 h-20 flex items-center justify-center">
                <span className="text-[10px] italic text-neutral-300">
                  توقيع الوالد / الوصي
                </span>
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
const AutorisationParentalePageAr: React.FC = () => {
  const [data, setData]           = useState<AutorisationData>(() => loadDraft() ?? EMPTY)
  const [errors, setErrors]       = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [pdfError, setPdfError]   = useState<string | null>(null)

  useEffect(() => {
    saveDraft(data)
  }, [data])

  const set = useCallback(
    <K extends keyof AutorisationData>(field: K, value: AutorisationData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }))
      if (submitted) {
        setErrors((prev) => { const n = { ...prev }; delete n[field]; return n })
      }
    },
    [submitted],
  )

  // Re-validate live after first submit attempt
  const currentErrors = useMemo<FormErrors>(() => {
    if (!submitted) return errors
    return validate(data)
  }, [submitted, data, errors])

  const showDestination = isTravelType(data.typeAutorisation)

  const handleDownload = async () => {
    setSubmitted(true)
    const errs = validate(data)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      document
        .querySelector('[aria-invalid="true"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setGenerating(true)
    setPdfError(null)
    try {
      const bytes = await generateAutorisationPdf(data)
      const blob  = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
      const url   = URL.createObjectURL(blob)
      const a     = document.createElement('a')
      a.href     = url
      a.download = 'إذن-الوالدين.pdf'
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
      setGenerating(false)
    }
  }

  // Chevron SVG for select
  const chevron = (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="إذن الوالدين للسفر بالمغرب — نموذج مجاني للطباعة"
        description="نموذج إذن الوالدين لسفر قاصر بالمغرب: أنشأ النموذج واحمل ملف PDF جاهز للتوقيع والطباعة، مجانًا تمامًا."
        canonicalUrl="https://kaghit.com/ar/autorisation-parentale"
        lang="ar"
      />

      <PageHeading
        title="إذن الوالدين"
        description="أنشئ إذنًا من الوالدين لطفل قاصر في ثوانٍ. يتم إنشاء مستند PDF في متصفحك. تبقى معلوماتك في متصفحك ولا تُرسل إلى خوادمنا."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">

        {/* ── Left: Form ─────────────────────────────────────────────────── */}
        <form
          id="autorisation-form-ar"
          noValidate
          onSubmit={(e) => { e.preventDefault(); handleDownload() }}
          aria-label="نموذج إذن الوالدين"
          dir="rtl"
        >

          {/* Informational Callout: When is authorization required */}
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs text-blue-900">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <div className="leading-relaxed">
              <strong>متى يكون هذا المستند ضروريًا؟</strong> يطلب هذا المستند فقط عندما يسافر'enfant بدون أن يرافقه holderين من בעלי الصلاحية الأبوية. إذا سافر الطفل مع holderين من בעלי الصلاحية الأبوية، فعادة لا يُطلب إذن: يكفي جواز سفر الطفل، على الرغم من أن بعض شركات الطيران أو الوجهات قد تكون لها متطلبات محددة.
            </div>
          </div>

          {/* ── Section: Type ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              نوع الإذن
            </h2>

            <FormField
              id="typeAutorisation"
              label="نوع الإذن"
              required
              error={currentErrors.typeAutorisation}
            >
              <div className="relative">
                <select
                  id="typeAutorisation"
                  value={data.typeAutorisation}
                  onChange={(e) => set('typeAutorisation', e.target.value as TypeAutorisation)}
                  className={selectCls(!!currentErrors.typeAutorisation)}
                >
                  {TYPES_AUTORISATION.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {chevron}
              </div>
            </FormField>

            {/* Informational warning for legalization — shown for ALL authorization types */}
            <div
              role="note"
              aria-label="معلومات التوثيق"
              className="mt-4 flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3"
            >
              <svg
                className="w-4 h-4 text-amber-500 mt-0.5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="text-xs text-amber-700 leading-relaxed">
                <strong>توثيق التوقيع:</strong> قد يتطلب هذا المستند توثيق التوقيع لدى البلدية (المقاطعة) أو لدى كاتب العدل قبل قبوله. وفقًا للوجهة ومتطلبات الجهة المانحة، قد يُطلب موافقة holderين من בעלי الصلاحية الأبوية.
              </div>
            </div>
          </Card>

          {/* ── Section: Parent / Tuteur ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              الوالد أو الوصي
            </h2>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="nomParent" label="الاسم الكامل" required error={currentErrors.nomParent}>
                  <input
                    id="nomParent"
                    type="text"
                    maxLength={60}
                    value={data.nomParent}
                    onChange={(e) => set('nomParent', e.target.value)}
                    placeholder="محمد العمراني"
                    aria-invalid={!!currentErrors.nomParent}
                    aria-describedby={currentErrors.nomParent ? 'nomParent-error' : undefined}
                    className={inputCls(!!currentErrors.nomParent)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.nomParent.length}/60 أحرف
                  </p>
                </FormField>

                <FormField id="qualite" label="الصفة" required error={currentErrors.qualite}>
                  <div className="relative">
                    <select
                      id="qualite"
                      value={data.qualite}
                      onChange={(e) => set('qualite', e.target.value as QualiteParent)}
                      aria-invalid={!!currentErrors.qualite}
                      className={selectCls(!!currentErrors.qualite)}
                    >
                      {QUALITES.map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                    {chevron}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.qualite.length}/15 أحرف
                  </p>
                </FormField>
              </div>

              <FormField id="cinParent" label="بطاقة التعريف الوطنية للوالد / الوصي" required error={currentErrors.cinParent}>
                <input
                  id="cinParent"
                  type="text"
                  maxLength={20}
                  value={data.cinParent}
                  onChange={(e) => set('cinParent', e.target.value.toUpperCase())}
                  placeholder="AB123456"
                  aria-invalid={!!currentErrors.cinParent}
                  aria-describedby={currentErrors.cinParent ? 'cinParent-error' : undefined}
                  className={inputCls(!!currentErrors.cinParent)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.cinParent.length}/20 أحرف
                </p>
              </FormField>

              <FormField id="adresseParent" label="العنوان الكامل" required error={currentErrors.adresseParent}>
                <input
                  id="adresseParent"
                  type="text"
                  maxLength={100}
                  value={data.adresseParent}
                  onChange={(e) => set('adresseParent', e.target.value)}
                  placeholder="12، شارع الورد، حي النخيل، الدار البيضاء"
                  aria-invalid={!!currentErrors.adresseParent}
                  aria-describedby={currentErrors.adresseParent ? 'adresseParent-error' : undefined}
                  className={inputCls(!!currentErrors.adresseParent)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.adresseParent.length}/100 أحرف
                </p>
              </FormField>

              <FormField id="telephoneParent" label="رقم الهاتف" required error={currentErrors.telephoneParent}>
                <input
                  id="telephoneParent"
                  type="tel"
                  maxLength={30}
                  value={data.telephoneParent}
                  onChange={(e) => set('telephoneParent', e.target.value)}
                  placeholder="+212 6 12 34 56 78"
                  aria-invalid={!!currentErrors.telephoneParent}
                  aria-describedby={currentErrors.telephoneParent ? 'telephoneParent-error' : undefined}
                  className={inputCls(!!currentErrors.telephoneParent)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.telephoneParent.length}/30 أحرف
                </p>
              </FormField>
            </div>
          </Card>

          {/* ── Section: Enfant ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              الطفل القاصر
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomEnfant" label="اسم ولقب الطفل" required error={currentErrors.nomEnfant}>
                <input
                  id="nomEnfant"
                  type="text"
                  maxLength={60}
                  value={data.nomEnfant}
                  onChange={(e) => set('nomEnfant', e.target.value)}
                  placeholder="يوسف العمراني"
                  aria-invalid={!!currentErrors.nomEnfant}
                  aria-describedby={currentErrors.nomEnfant ? 'nomEnfant-error' : undefined}
                  className={inputCls(!!currentErrors.nomEnfant)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.nomEnfant.length}/60 أحرف
                </p>
              </FormField>

              <FormField
                id="dateNaissanceEnfant"
                label="تاريخ الميلاد"
                required
                error={currentErrors.dateNaissanceEnfant}
              >
                <input
                  id="dateNaissanceEnfant"
                  type="date"
                  value={data.dateNaissanceEnfant}
                  onChange={(e) => set('dateNaissanceEnfant', e.target.value)}
                  aria-invalid={!!currentErrors.dateNaissanceEnfant}
                  aria-describedby={currentErrors.dateNaissanceEnfant ? 'dateNaissanceEnfant-error' : undefined}
                  className={inputCls(!!currentErrors.dateNaissanceEnfant)}
                />
              </FormField>

              <FormField
                id="cinEnfant"
                label="بطاقة التعريف الوطنية أو رقم عقد الازدياد"
                hint="اختياري"
                error={currentErrors.cinEnfant}
              >
                <input
                  id="cinEnfant"
                  type="text"
                  maxLength={30}
                  value={data.cinEnfant}
                  onChange={(e) => set('cinEnfant', e.target.value.toUpperCase())}
                  placeholder="رقم عقد الازدياد أو بطاقة التعريف الوطنية"
                  className={inputCls(false)}
                />
              </FormField>
            </div>
          </Card>

          {/* ── Section: Voyage / Détails ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              تفاصيل الإذن
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="motif" label="موضوع الإذن" required error={currentErrors.motif}>
                <input
                  id="motif"
                  type="text"
                  maxLength={150}
                  value={data.motif}
                  onChange={(e) => set('motif', e.target.value)}
                  placeholder="السفر إلى فرنسا لقضاء عطلة عائلية"
                  aria-invalid={!!currentErrors.motif}
                  aria-describedby={currentErrors.motif ? 'motif-error' : undefined}
                  className={inputCls(!!currentErrors.motif)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.motif.length}/150 أحرف
                </p>
              </FormField>

              {/* Destination — only for travel types */}
              {showDestination && (
                <FormField
                  id="destination"
                  label="الوجهه / المكان"
                  required
                  error={currentErrors.destination}
                >
                  <input
                    id="destination"
                    type="text"
                    maxLength={150}
                    value={data.destination}
                    onChange={(e) => set('destination', e.target.value)}
                    placeholder="باريس، فرنسا"
                    aria-invalid={!!currentErrors.destination}
                    aria-describedby={currentErrors.destination ? 'destination-error' : undefined}
                    className={inputCls(!!currentErrors.destination)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.destination.length}/150 أحرف
                  </p>
                </FormField>
              )}

              <FormField
                id="datesSejour"
                label="تاريخ (أو مدة) الإقامة"
                required
                hint="مثال: من 10 إلى 20 أغسطس 2026، أو 5 سبتمبر 2026"
                error={currentErrors.datesSejour}
              >
                <input
                  id="datesSejour"
                  type="text"
                  maxLength={150}
                  value={data.datesSejour}
                  onChange={(e) => set('datesSejour', e.target.value)}
                  placeholder="من 10 إلى 20 أغسطس 2026"
                  aria-invalid={!!currentErrors.datesSejour}
                  aria-describedby={currentErrors.datesSejour ? 'datesSejour-error' : undefined}
                  className={inputCls(!!currentErrors.datesSejour)}
                />
              </FormField>

              <FormField
                id="accompagnePar"
                label="مع مرافق"
                hint="اختياري — اسم المرافق"
                error={currentErrors.accompagnePar}
              >
                <input
                  id="accompagnePar"
                  type="text"
                  maxLength={60}
                  value={data.accompagnePar}
                  onChange={(e) => set('accompagnePar', e.target.value)}
                  placeholder="خديجة بنالي (عمة)"
                  className={inputCls(false)}
                />
                <p className="mt-1.5 text-[11px] text-neutral-500 leading-relaxed italic bg-neutral-50 p-2.5 rounded border border-neutral-100">
                  💡 <strong>نصيحة عملية:</strong> إذا كان اسم عائلة الطفل يختلف عن اسم عائلة المرافق المُرافق، يُنصح بشدة بحمل وثيقة إثبات النسب (عقد الازدياد أو دفتر العائلة).
                </p>
              </FormField>
            </div>
          </Card>

          {/* ── Section: Émission ── */}
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
                  className={inputCls(!!currentErrors.lieuEmission)}
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
                  className={inputCls(!!currentErrors.dateEmission)}
                />
              </FormField>
            </div>
          </Card>

          {/* PDF error */}
          {pdfError && (
            <div
              role="alert"
              className="mb-4 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary flex items-start gap-2"
            >
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
            disabled={generating}
            id="btn-telecharger-autorisation-ar"
          >
            {generating ? (
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

          {/* Footer disclaimer */}
          <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>ملحوظة:</strong> يجب طباعة هذا المستند وتوقيعه من قبل الوالد أو الوصي ليكون صالحًا. لا constitue نصيحة قانونية أو ضريبية، وقد يلزم توثيق وفقًا للاستخدام.
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
          فهم إذن الوالدين للسفر بالمغرب
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              موضوع الإذن
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              إذن الوالدين (أو إذن خروج التراب) هو وثيقة رسمية تسمح لطفل قاصر بالسفر بمفرده أو برفقة طرف ثالث. تُثبّت formalmente موافقة الوالد أو الوصي القانوني.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              المتطلبات والضوابط عند الحدود
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              بالمغرب، يُطلب عادةً هذا المستند عند عبور الحدود لجميع الرحلات الدولية لطفل قاصر غير مصحوب بوالديه. كما يُطلب أثناء الرحلات الصيفية، المخيمات، أو المسابقات الرياضية.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              توثيق التوقيع لدى البلدية (المقاطعة)
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              لكي يكون هذا المستند مقبولًا قانونيًا في المغرب والخارج، يجب توثيق التوقيع الموجود على النسخة المطبوعة من هذا المستند من قبل الجهات المحلية (المقاطعة / البلدية). هذه الأداة لا تستبدل الاستشارة القانونية المهنية.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default AutorisationParentalePageAr