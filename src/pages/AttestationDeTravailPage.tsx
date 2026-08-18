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

function formatDate(iso: string): string {
  if (!iso) return '___________'
  const [y, m, d] = iso.split('-')
  const months = [
    'janvier','février','mars','avril','mai','juin',
    'juillet','août','septembre','octobre','novembre','décembre',
  ]
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`
}

function validate(data: AttestationData): FormErrors {
  const err: FormErrors = {}
  if (!data.nomEntreprise.trim())     err.nomEntreprise = 'Ce champ est obligatoire'
  if (!data.adresseEntreprise.trim()) err.adresseEntreprise = 'Ce champ est obligatoire'
  if (!data.nomSignataire.trim())     err.nomSignataire = 'Ce champ est obligatoire'
  if (!data.qualiteSignataire.trim()) err.qualiteSignataire = 'Ce champ est obligatoire'
  if (!data.nomEmploye.trim())        err.nomEmploye = 'Ce champ est obligatoire'
  if (!data.cinEmploye.trim())        err.cinEmploye = 'Ce champ est obligatoire'
  if (!data.posteOccupe.trim())       err.posteOccupe = 'Ce champ est obligatoire'
  if (!data.natureContrat)            err.natureContrat = 'Ce champ est obligatoire'
  if (data.inclureSalaire && !data.salaireBrut.trim()) {
    err.salaireBrut = 'Ce champ est obligatoire lorsque le salaire est inclus'
  }
  if (!data.dateDebut)                err.dateDebut = 'Ce champ est obligatoire'
  if (!data.toujoursEnPoste && !data.dateFin)
    err.dateFin = `Ce champ est obligatoire si l'employé n'est plus en poste`
  if (!data.lieuEmission.trim())      err.lieuEmission = 'Ce champ est obligatoire'
  if (!data.dateEmission)             err.dateEmission = 'Ce champ est obligatoire'
  return err
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
    ? `, affilié(e) à la CNSS sous le numéro ${d.noCnss},`
    : ''

  const periodLine = d.toujoursEnPoste
    ? `à compter du ${formatDate(d.dateDebut)} et est toujours en poste à ce jour`
    : `du ${formatDate(d.dateDebut)} jusqu'au ${formatDate(d.dateFin)}`

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
      aria-label="Aperçu du document"
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
        <span className="text-xs text-neutral-400 font-sans ml-1">Aperçu du document</span>
        {isSalaryIncluded && (
          <span className="ml-auto text-[10px] font-sans font-semibold text-primary bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
            Travail &amp; Salaire
          </span>
        )}
      </div>

      {/* A4-ish body */}
      <div className="p-6 sm:p-8 text-[13px] leading-relaxed text-neutral-800 min-h-[420px]">
        {!hasData ? (
          <p className="text-neutral-300 italic text-center mt-16 font-sans text-sm">
            Remplissez le formulaire pour voir l'aperçu du document…
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
                  <p className="text-neutral-500 text-[11px]">ICE : {d.iceEntreprise}</p>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="my-4 border-t-2 border-primary/30" aria-hidden="true" />

            {/* Title */}
            <h2 className="text-center font-bold text-[14px] sm:text-[15px] tracking-widest text-primary uppercase mb-6">
              {isSalaryIncluded
                ? 'Attestation de Travail et de Salaire'
                : 'Attestation de Travail'}
            </h2>

            {/* Opening */}
            <p className="mb-4 text-justify">
              Nous soussignés,{' '}
              <strong>{d.nomSignataire || '___________'}</strong>
              {d.qualiteSignataire && (
                <>, agissant en qualité de <strong>{d.qualiteSignataire}</strong></>
              )}{' '}
              de la société{' '}
              <strong>{d.nomEntreprise || '___________'}</strong>
              {d.adresseEntreprise && (
                <>, dont le siège social est situé à {d.adresseEntreprise}</>
              )}
              , attestons par la présente que&nbsp;:
            </p>

            {/* Core attestation */}
            <p className="mb-4 text-justify">
              M.&thinsp;/&thinsp;Mme&nbsp;<strong>{d.nomEmploye || '___________'}</strong>
              , titulaire de la CIN n°&nbsp;
              <strong>{d.cinEmploye || '___________'}</strong>
              {cnssLine && <span>{cnssLine}</span>}
              {' '}occupe&nbsp;/&nbsp;a occupé le poste de{' '}
              <strong>{d.posteOccupe || '___________'}</strong>{' '}
              dans le cadre d'un contrat <strong>{d.natureContrat}</strong> au sein de notre société {periodLine}.
              {isSalaryIncluded && (
                <> Le salaire brut mensuel perçu par l'intéressé(e) s'élève à <strong>{d.salaireBrut} MAD</strong>.</>
              )}
            </p>

            {/* Closing formula */}
            <p className="mb-6 italic text-justify">
              Cette attestation est délivrée à l&apos;intéressé(e) pour servir et valoir ce que de
              droit.
            </p>

            {/* Lieu / date */}
            <p className="text-right mb-1">
              Fait à {d.lieuEmission || '___________'}, le {formatDate(d.dateEmission)}
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
                <span className="text-[10px] italic text-neutral-300">Signature &amp; Cachet</span>
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

const AttestationDeTravailPage: React.FC = () => {
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
      a.download = data.inclureSalaire ? 'attestation-de-travail-et-de-salaire.pdf' : 'attestation-de-travail.pdf'
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
        title="Attestation de travail Maroc — Générateur gratuit en ligne"
        description="Modèle attestation de travail Maroc : remplissez le formulaire et téléchargez votre attestation de travail conforme au format PDF en quelques clics, 100% gratuit."
        canonicalUrl="https://kaghit.com/attestation-de-travail"
      />

      <PageHeading
        title="Attestation de travail"
        description="Remplissez le formulaire ci-dessous. Le document PDF est généré entièrement dans votre navigateur — aucune donnée n'est envoyée sur un serveur."
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
          id="attestation-form"
          noValidate
          onSubmit={(e) => { e.preventDefault(); handleDownload() }}
          aria-label="Formulaire d'attestation de travail"
        >
          {/* Informational Callout: Distinction attestation vs certificat de travail */}
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs text-blue-900">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <div className="leading-relaxed">
              <strong>Note d'information :</strong> Cette attestation de travail peut être demandée à tout moment au cours de la relation de travail et n'exige pas légalement de mentionner le salaire. Elle se distingue du <em>certificat de travail</em>, que l'employeur est légalement tenu de délivrer dans un délai de 8 jours suivant la fin du contrat (Article 72 du Code du travail marocain).
            </div>
          </div>

          {/* Section: Entreprise */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Informations de l'entreprise
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomEntreprise" label="Nom de l'entreprise" required error={currentErrors.nomEntreprise}>
                <input
                  id="nomEntreprise"
                  type="text"
                  value={data.nomEntreprise}
                  onChange={(e) => set('nomEntreprise', e.target.value)}
                  placeholder="Société Exemple SARL"
                  aria-invalid={!!currentErrors.nomEntreprise}
                  aria-describedby={currentErrors.nomEntreprise ? 'nomEntreprise-error' : undefined}
                  className={inputBase(!!currentErrors.nomEntreprise)}
                />
              </FormField>

              <FormField id="adresseEntreprise" label="Adresse de l'entreprise" required error={currentErrors.adresseEntreprise}>
                <input
                  id="adresseEntreprise"
                  type="text"
                  value={data.adresseEntreprise}
                  onChange={(e) => set('adresseEntreprise', e.target.value)}
                  placeholder="123, Boulevard Mohammed V, Casablanca"
                  aria-invalid={!!currentErrors.adresseEntreprise}
                  aria-describedby={currentErrors.adresseEntreprise ? 'adresseEntreprise-error' : undefined}
                  className={inputBase(!!currentErrors.adresseEntreprise)}
                />
              </FormField>

              <FormField id="iceEntreprise" label="ICE de l'entreprise" hint="Optionnel — Identifiant Commun de l'Entreprise" error={currentErrors.iceEntreprise}>
                <input
                  id="iceEntreprise"
                  type="text"
                  value={data.iceEntreprise}
                  onChange={(e) => set('iceEntreprise', e.target.value)}
                  placeholder="000000000000000"
                  className={inputBase(false)}
                />
              </FormField>
            </div>
          </Card>

          {/* Section: Signataire */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Signataire
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomSignataire" label="Nom et prénom du signataire" required error={currentErrors.nomSignataire}>
                <input
                  id="nomSignataire"
                  type="text"
                  value={data.nomSignataire}
                  onChange={(e) => set('nomSignataire', e.target.value)}
                  placeholder="Ahmed El Alami"
                  aria-invalid={!!currentErrors.nomSignataire}
                  aria-describedby={currentErrors.nomSignataire ? 'nomSignataire-error' : undefined}
                  className={inputBase(!!currentErrors.nomSignataire)}
                />
              </FormField>

              <FormField id="qualiteSignataire" label="Qualité / Titre du signataire" required error={currentErrors.qualiteSignataire}>
                <input
                  id="qualiteSignataire"
                  type="text"
                  value={data.qualiteSignataire}
                  onChange={(e) => set('qualiteSignataire', e.target.value)}
                  placeholder="Directeur des Ressources Humaines"
                  aria-invalid={!!currentErrors.qualiteSignataire}
                  aria-describedby={currentErrors.qualiteSignataire ? 'qualiteSignataire-error' : undefined}
                  className={inputBase(!!currentErrors.qualiteSignataire)}
                />
              </FormField>
            </div>
          </Card>

          {/* Section: Employé */}
          <Card className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">
              Informations de l'employé(e)
            </h2>

            <div className="flex flex-col gap-5">
              <FormField id="nomEmploye" label="Nom et prénom de l'employé(e)" required error={currentErrors.nomEmploye}>
                <input
                  id="nomEmploye"
                  type="text"
                  value={data.nomEmploye}
                  onChange={(e) => set('nomEmploye', e.target.value)}
                  placeholder="Fatima Zahra Benali"
                  aria-invalid={!!currentErrors.nomEmploye}
                  aria-describedby={currentErrors.nomEmploye ? 'nomEmploye-error' : undefined}
                  className={inputBase(!!currentErrors.nomEmploye)}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="cinEmploye" label="CIN de l'employé(e)" required error={currentErrors.cinEmploye}>
                  <input
                    id="cinEmploye"
                    type="text"
                    value={data.cinEmploye}
                    onChange={(e) => set('cinEmploye', e.target.value.toUpperCase())}
                    placeholder="AB123456"
                    aria-invalid={!!currentErrors.cinEmploye}
                    aria-describedby={currentErrors.cinEmploye ? 'cinEmploye-error' : undefined}
                    className={inputBase(!!currentErrors.cinEmploye)}
                  />
                </FormField>

                <FormField id="noCnss" label="Numéro CNSS" hint="Optionnel" error={currentErrors.noCnss}>
                  <input
                    id="noCnss"
                    type="text"
                    value={data.noCnss}
                    onChange={(e) => set('noCnss', e.target.value)}
                    placeholder="1234567"
                    className={inputBase(false)}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="posteOccupe" label="Poste occupé" required error={currentErrors.posteOccupe}>
                  <input
                    id="posteOccupe"
                    type="text"
                    value={data.posteOccupe}
                    onChange={(e) => set('posteOccupe', e.target.value)}
                    placeholder="Ingénieur logiciel"
                    aria-invalid={!!currentErrors.posteOccupe}
                    aria-describedby={currentErrors.posteOccupe ? 'posteOccupe-error' : undefined}
                    className={inputBase(!!currentErrors.posteOccupe)}
                  />
                </FormField>

                <FormField id="natureContrat" label="Nature du contrat" required error={currentErrors.natureContrat}>
                  <div className="relative">
                    <select
                      id="natureContrat"
                      value={data.natureContrat}
                      onChange={(e) => set('natureContrat', e.target.value as NatureContrat)}
                      aria-invalid={!!currentErrors.natureContrat}
                      className={inputBase(!!currentErrors.natureContrat) + ' cursor-pointer appearance-none bg-white'}
                    >
                      <option value="CDI">CDI (Durée Indéterminée)</option>
                      <option value="CDD">CDD (Durée Déterminée)</option>
                      <option value="Stage">Stage</option>
                      <option value="Autre">Autre</option>
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
                    Inclure le salaire <span className="text-xs font-normal text-neutral-500">(attestation de travail et de salaire)</span>
                  </span>
                </label>

                {data.inclureSalaire && (
                  <div className="mt-1 pl-12">
                    <FormField id="salaireBrut" label="Salaire brut mensuel (MAD)" required error={currentErrors.salaireBrut}>
                      <input
                        id="salaireBrut"
                        type="text"
                        value={data.salaireBrut}
                        onChange={(e) => set('salaireBrut', e.target.value)}
                        placeholder="12 500"
                        aria-invalid={!!currentErrors.salaireBrut}
                        aria-describedby={currentErrors.salaireBrut ? 'salaireBrut-error' : undefined}
                        className={inputBase(!!currentErrors.salaireBrut)}
                      />
                    </FormField>
                  </div>
                )}
              </div>

              <FormField id="dateDebut" label="Date de début" required error={currentErrors.dateDebut}>
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
                    Toujours en poste actuellement
                  </span>
                </label>
              </div>

              {/* Conditional end date */}
              {!data.toujoursEnPoste && (
                <FormField id="dateFin" label="Date de fin" required error={currentErrors.dateFin}>
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
              Lieu et date d'émission
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField id="lieuEmission" label="Lieu d'émission" required error={currentErrors.lieuEmission}>
                <input
                  id="lieuEmission"
                  type="text"
                  value={data.lieuEmission}
                  onChange={(e) => set('lieuEmission', e.target.value)}
                  placeholder="Casablanca"
                  aria-invalid={!!currentErrors.lieuEmission}
                  aria-describedby={currentErrors.lieuEmission ? 'lieuEmission-error' : undefined}
                  className={inputBase(!!currentErrors.lieuEmission)}
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
            id="btn-telecharger"
          >
            {isGenerating ? (
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

          {/* Disclaimer */}
          <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Important :</strong> Ce document doit être imprimé, signé et tamponné par l&apos;employeur
              pour être valide. Il ne constitue pas un conseil juridique ou fiscal.
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
          Tout savoir sur l'attestation de travail au Maroc
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Rôle et utilité du document
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              L'attestation de travail est un document officiel délivré par l'employeur certifiant qu'un salarié exerce ou a exercé une activité professionnelle au sein de l'entreprise. Elle formalise l'existence du contrat de travail, l'ancienneté ainsi que le poste occupé.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Utilisation fréquente au Maroc
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Au Maroc, l'attestation de travail est couramment demandée pour l'ouverture d'un compte bancaire, les demandes de crédit, les dossiers de visa, les souscriptions d'assurance, ou encore pour les démarches administratives auprès de la CNSS et de la mutuelle.
            </p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Valeur juridique &amp; Signature
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Ce modèle en ligne permet de générer un document conforme à l'usage courant. Pour qu'il ait une valeur juridique probante, l'attestation originale doit obligatoirement être imprimée, signée par le représentant légal de l'entreprise et revêtue du cachet officiel. Cet outil ne remplace pas un conseil juridique.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default AttestationDeTravailPage
