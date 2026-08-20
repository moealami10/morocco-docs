import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { PageHeading, Card, FormField, Button } from '../components/ui'
import { generateAutorisationPdf } from '../lib/autorisationPdf'
import { Seo } from '../components/Seo'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TypeAutorisation =
  | "Voyage à l'étranger"
  | 'Voyage national'
  | 'Sortie scolaire / activité'
  | 'Autre'

export type QualiteParent = 'Père' | 'Mère' | 'Tuteur légal'

export interface AutorisationData {
  typeAutorisation: TypeAutorisation
  nomParent: string
  qualite: QualiteParent
  cinParent: string
  adresseParent: string
  telephoneParent: string
  nomEnfant: string
  dateNaissanceEnfant: string
  cinEnfant: string        // optional
  destination: string      // only when travel type
  datesSejour: string
  accompagnePar: string    // optional
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
  "Voyage à l'étranger",
  'Voyage national',
  'Sortie scolaire / activité',
  'Autre',
]

const QUALITES: QualiteParent[] = ['Père', 'Mère', 'Tuteur légal']

const TRAVEL_TYPES: TypeAutorisation[] = ["Voyage à l'étranger", 'Voyage national']

const EMPTY: AutorisationData = {
  typeAutorisation: "Voyage à l'étranger",
  nomParent: '',
  qualite: 'Père',
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

const MONTHS_FR = [
  'janvier','février','mars','avril','mai','juin',
  'juillet','août','septembre','octobre','novembre','décembre',
]

function formatDate(iso: string): string {
  if (!iso) return '___________'
  const [yr, mo, dd] = iso.split('-')
  return `${parseInt(dd, 10)} ${MONTHS_FR[parseInt(mo, 10) - 1]} ${yr}`
}

function isTravelType(t: TypeAutorisation): boolean {
  return TRAVEL_TYPES.includes(t)
}

function validate(data: AutorisationData): FormErrors {
  const err: FormErrors = {}
  if (!data.nomParent.trim())             err.nomParent = 'Champ obligatoire'
  if (!data.cinParent.trim())             err.cinParent = 'Champ obligatoire'
  if (!data.adresseParent.trim())         err.adresseParent = 'Champ obligatoire'
  if (!data.telephoneParent.trim())       err.telephoneParent = 'Champ obligatoire'
  if (!data.nomEnfant.trim())             err.nomEnfant = 'Champ obligatoire'
  if (!data.dateNaissanceEnfant)          err.dateNaissanceEnfant = 'Champ obligatoire'
  if (isTravelType(data.typeAutorisation) && !data.destination.trim())
    err.destination = 'Champ obligatoire pour un type de voyage'
  if (!data.datesSejour.trim())           err.datesSejour = 'Champ obligatoire'
  if (!data.motif.trim())                 err.motif = 'Champ obligatoire'
  if (!data.lieuEmission.trim())          err.lieuEmission = 'Champ obligatoire'
  if (!data.dateEmission)                 err.dateEmission = 'Champ obligatoire'
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
    ? `, titulaire du document n° ${d.cinEnfant},`
    : ','

  const destinationFrag = d.destination
    ? ` à destination de ${d.destination}`
    : ''

  const accompFrag = d.accompagnePar
    ? ` Elle/Il sera accompagné(e) par ${d.accompagnePar}.`
    : ''

  const hasContent = d.nomParent || d.nomEnfant || d.motif

  return (
    <div
      className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden"
      aria-label="Aperçu du document"
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
        <span className="text-xs text-neutral-400 font-sans ml-1 select-none">Aperçu du document</span>
        {/* Type badge */}
        <span className="ml-auto inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-[10px] font-semibold text-primary border border-primary-100">
          {d.typeAutorisation}
        </span>
      </div>

      {/* Document body */}
      <div className="p-6 sm:p-8 text-[13px] leading-relaxed text-neutral-800 font-serif min-h-[480px]">
        {!hasContent ? (
          <p className="text-neutral-300 italic text-center mt-20 font-sans text-sm">
            Remplissez le formulaire pour voir l'aperçu…
          </p>
        ) : (
          <>
            {/* Title */}
            <h2 className="text-center font-bold text-[15px] tracking-widest text-primary uppercase mb-6">
              Autorisation Parentale
            </h2>

            {/* Paragraph 1 */}
            <p className="mb-4 text-justify">
              Je soussigné(e) <strong>{d.nomParent || '___________'}</strong>,{' '}
              {d.qualite},
              {d.adresseParent && <> demeurant à {d.adresseParent},</>}{' '}
              titulaire de la CIN n°&nbsp;<strong>{d.cinParent || '___________'}</strong>,
              déclare par la présente autoriser mon enfant{' '}
              <strong>{d.nomEnfant || '___________'}</strong>
              {cinEnfantFrag} né(e) le {formatDate(d.dateNaissanceEnfant)},
              à <strong>{d.motif || '___________'}</strong>
              {destinationFrag},
              du/le {d.datesSejour || '___________'}.
              {accompFrag && <> {accompFrag}</>}
            </p>

            {/* Paragraph 2 */}
            <p className="mb-4 italic text-justify">
              J'atteste avoir le plein exercice de l'autorité parentale à l'égard de cet enfant.
            </p>

            {/* Phone if present */}
            {d.telephoneParent && (
              <p className="text-[11px] text-neutral-500 mb-4">
                Contact du parent/tuteur : {d.telephoneParent}
              </p>
            )}

            {/* Closing */}
            <p className="mb-6 italic text-justify">
              Cette autorisation est délivrée pour servir et valoir ce que de droit.
            </p>

            {/* Lieu / date */}
            <p className="text-right mb-1">
              Fait à {d.lieuEmission || '___________'}, le {formatDate(d.dateEmission)}
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
                  Signature du parent / tuteur
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
const AutorisationParentalePage: React.FC = () => {
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
      a.download = 'autorisation-parentale.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      clearDraft()
      setData(EMPTY)
      setSubmitted(false)
    } catch (e) {
      console.error(e)
      setPdfError('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.')
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
        title="Autorisation parentale voyage Maroc — Modèle gratuit à remplir"
        description="Modèle d'autorisation parentale de voyage pour mineur au Maroc : générez et téléchargez votre document prêt à imprimer et signer, gratuit et sans inscription."
        canonicalUrl="https://kaghit.com/autorisation-parentale"
      />

      <PageHeading
        title="Autorisation parentale"
        description="Créez une autorisation parentale pour un mineur en quelques secondes. Le document PDF est généré dans votre navigateur. Vos informations restent dans votre navigateur et ne sont pas envoyées à nos serveurs."
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
          id="autorisation-form"
          noValidate
          onSubmit={(e) => { e.preventDefault(); handleDownload() }}
          aria-label="Formulaire d'autorisation parentale"
        >

          {/* Informational Callout: When is authorization required */}
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs text-blue-900">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <div className="leading-relaxed">
              <strong>Quand ce document est-il nécessaire ?</strong> Ce document est requis uniquement lorsque l'enfant voyage sans être accompagné de ses deux parents titulaires de l'autorité parentale. Si les deux parents voyagent avec l'enfant, aucune autorisation n'est généralement requise : le passeport de l'enfant suffit, bien que certaines compagnies aériennes ou destinations puissent avoir des exigences spécifiques.
            </div>
          </div>

          {/* ── Section: Type ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Type d'autorisation
            </h2>

            <FormField
              id="typeAutorisation"
              label="Type d'autorisation"
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
              aria-label="Information légalisation"
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
                <strong>Légalisation de signature :</strong> ce document peut nécessiter une légalisation auprès de la commune (Moqataa) ou d'un notaire avant d'être accepté. Selon la destination et les exigences de l'autorité destinataire, l'accord des deux parents peut être demandé.
              </div>
            </div>
          </Card>

          {/* ── Section: Parent / Tuteur ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Parent ou tuteur légal
            </h2>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="nomParent" label="Nom et prénom" required error={currentErrors.nomParent}>
                  <input
                    id="nomParent"
                    type="text"
                    maxLength={60}
                    value={data.nomParent}
                    onChange={(e) => set('nomParent', e.target.value)}
                    placeholder="Mohammed El Amrani"
                    aria-invalid={!!currentErrors.nomParent}
                    aria-describedby={currentErrors.nomParent ? 'nomParent-error' : undefined}
                    className={inputCls(!!currentErrors.nomParent)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.nomParent.length}/60 caractères
                  </p>
                </FormField>

                <FormField id="qualite" label="Qualité" required error={currentErrors.qualite}>
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
                    {data.qualite.length}/15 caractères
                  </p>
                </FormField>
              </div>

              <FormField id="cinParent" label="CIN du parent / tuteur" required error={currentErrors.cinParent}>
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
                  {data.cinParent.length}/20 caractères
                </p>
              </FormField>

              <FormField id="adresseParent" label="Adresse complète" required error={currentErrors.adresseParent}>
                <input
                  id="adresseParent"
                  type="text"
                  maxLength={100}
                  value={data.adresseParent}
                  onChange={(e) => set('adresseParent', e.target.value)}
                  placeholder="12, Rue des Roses, Quartier Palmier, Casablanca"
                  aria-invalid={!!currentErrors.adresseParent}
                  aria-describedby={currentErrors.adresseParent ? 'adresseParent-error' : undefined}
                  className={inputCls(!!currentErrors.adresseParent)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.adresseParent.length}/100 caractères
                </p>
              </FormField>

              <FormField id="telephoneParent" label="Téléphone" required error={currentErrors.telephoneParent}>
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
                  {data.telephoneParent.length}/30 caractères
                </p>
              </FormField>
            </div>
          </Card>

          {/* ── Section: Enfant ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Enfant mineur
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomEnfant" label="Nom et prénom de l'enfant" required error={currentErrors.nomEnfant}>
                <input
                  id="nomEnfant"
                  type="text"
                  maxLength={60}
                  value={data.nomEnfant}
                  onChange={(e) => set('nomEnfant', e.target.value)}
                  placeholder="Youssef El Amrani"
                  aria-invalid={!!currentErrors.nomEnfant}
                  aria-describedby={currentErrors.nomEnfant ? 'nomEnfant-error' : undefined}
                  className={inputCls(!!currentErrors.nomEnfant)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.nomEnfant.length}/60 caractères
                </p>
              </FormField>

              <FormField
                id="dateNaissanceEnfant"
                label="Date de naissance"
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
                label="CIN ou numéro d'acte de naissance"
                hint="Optionnel"
                error={currentErrors.cinEnfant}
              >
                <input
                  id="cinEnfant"
                  type="text"
                  maxLength={30}
                  value={data.cinEnfant}
                  onChange={(e) => set('cinEnfant', e.target.value.toUpperCase())}
                  placeholder="Numéro acte de naissance ou CIN"
                  className={inputCls(false)}
                />
              </FormField>
            </div>
          </Card>

          {/* ── Section: Voyage / Détails ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Détails de l'autorisation
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="motif" label="Motif / objet de l'autorisation" required error={currentErrors.motif}>
                <input
                  id="motif"
                  type="text"
                  maxLength={150}
                  value={data.motif}
                  onChange={(e) => set('motif', e.target.value)}
                  placeholder="voyager en France pour des vacances en famille"
                  aria-invalid={!!currentErrors.motif}
                  aria-describedby={currentErrors.motif ? 'motif-error' : undefined}
                  className={inputCls(!!currentErrors.motif)}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {data.motif.length}/150 caractères
                </p>
              </FormField>

              {/* Destination — only for travel types */}
              {showDestination && (
                <FormField
                  id="destination"
                  label="Destination / lieu"
                  required
                  error={currentErrors.destination}
                >
                  <input
                    id="destination"
                    type="text"
                    maxLength={150}
                    value={data.destination}
                    onChange={(e) => set('destination', e.target.value)}
                    placeholder="Paris, France"
                    aria-invalid={!!currentErrors.destination}
                    aria-describedby={currentErrors.destination ? 'destination-error' : undefined}
                    className={inputCls(!!currentErrors.destination)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {data.destination.length}/150 caractères
                  </p>
                </FormField>
              )}

              <FormField
                id="datesSejour"
                label="Date(s) ou durée du séjour"
                required
                hint="Ex : du 10 au 20 août 2026, ou le 5 septembre 2026"
                error={currentErrors.datesSejour}
              >
                <input
                  id="datesSejour"
                  type="text"
                  maxLength={150}
                  value={data.datesSejour}
                  onChange={(e) => set('datesSejour', e.target.value)}
                  placeholder="du 10 au 20 août 2026"
                  aria-invalid={!!currentErrors.datesSejour}
                  aria-describedby={currentErrors.datesSejour ? 'datesSejour-error' : undefined}
                  className={inputCls(!!currentErrors.datesSejour)}
                />
              </FormField>

              <FormField
                id="accompagnePar"
                label="Accompagné(e) par"
                hint="Optionnel — nom de la personne accompagnatrice"
                error={currentErrors.accompagnePar}
              >
                <input
                  id="accompagnePar"
                  type="text"
                  maxLength={60}
                  value={data.accompagnePar}
                  onChange={(e) => set('accompagnePar', e.target.value)}
                  placeholder="Khadija Benali (tante)"
                  className={inputCls(false)}
                />
                <p className="mt-1.5 text-[11px] text-neutral-500 leading-relaxed italic bg-neutral-50 p-2.5 rounded border border-neutral-100">
                  💡 <strong>Conseil pratique :</strong> Si le nom de famille de l'enfant diffère de celui de l'adulte accompagnateur, il est vivement recommandé de vous munir d'un justificatif de filiation (acte de naissance ou livret de famille).
                </p>
              </FormField>
            </div>
          </Card>

          {/* ── Section: Émission ── */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Lieu et date d'émission
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField id="lieuEmission" label="Lieu d'émission" required error={currentErrors.lieuEmission}>
                <input
                  id="lieuEmission"
                  type="text"
                  maxLength={60}
                  value={data.lieuEmission}
                  onChange={(e) => set('lieuEmission', e.target.value)}
                  placeholder="Casablanca"
                  aria-invalid={!!currentErrors.lieuEmission}
                  aria-describedby={currentErrors.lieuEmission ? 'lieuEmission-error' : undefined}
                  className={inputCls(!!currentErrors.lieuEmission)}
                />
              </FormField>

              <FormField id="dateEmission" label="Date d'émission" required error={currentErrors.dateEmission}>
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
            id="btn-telecharger-autorisation"
          >
            {generating ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Génération en cours…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v7.44l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0L5.72 9.78a.75.75 0 011.06-1.06l2.47 2.47V3.75A.75.75 0 0110 3zM3.25 14a.75.75 0 01.75.75v1.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-1.5a.75.75 0 011.5 0v1.5A2 2 0 0115.5 18h-11A2 2 0 012.5 16v-1.25A.75.75 0 013.25 14z" clipRule="evenodd" />
                </svg>
                Télécharger le PDF
              </>
            )}
          </Button>

          {/* Footer disclaimer */}
          <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Important :</strong> Ce document doit être imprimé et signé par le parent ou
              tuteur légal pour être valide. Il ne constitue pas un conseil juridique ou fiscal, et peut
              nécessiter légalisation selon son usage.
            </p>
          </div>
        </form>

        {/* ── Right: Live preview ── */}
        <div className="lg:sticky lg:top-20">
          <DocumentPreview data={data} />
          <p className="mt-3 text-center text-xs text-neutral-400">
            L'aperçu est mis à jour en temps réel à mesure que vous remplissez le formulaire.
          </p>
        </div>
      </div>

      {/* ── Informational / SEO Section ── */}
      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Comprendre l'autorisation parentale de voyage au Maroc
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Objet de l'autorisation
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              L'autorisation parentale (ou autorisation de sortie du territoire) est un document officiel permettant à un enfant mineur de voyager séparément ou accompagné d'un tiers. Elle atteste formellement du consentement du parent ou tuteur légal.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Exigences et contrôles aux frontières
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Au Maroc, ce document est généralement demandé lors du passage aux frontières pour tout voyage international d'un mineur non accompagné de ses deux parents. Il est aussi requis lors des sorties scolaires, colonies de vacances ou compétitions sportives.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Légalisation à la commune (Moqataa)
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pour être juridiquement recevable au Maroc et à l'étranger, la signature du parent sur ce document imprimé doit obligatoirement être légalisée auprès des autorités locales (Moqataa / commune). Cet outil ne remplace pas un conseil juridique professionnel.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default AutorisationParentalePage
