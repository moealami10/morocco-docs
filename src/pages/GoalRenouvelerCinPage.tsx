import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:renouveler-ma-cin'

function loadProgress(): Record<number, boolean> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(state: Record<number, boolean>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

interface StepItem {
  id: number
  title: string
  context: string
  linkText?: string
  linkTo?: string
  isExternal?: boolean
}

const STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Vérifier le motif et la déclaration en cas de perte/vol',
    context: 'En cas de perte ou vol, rendez-vous à la police/gendarmerie pour obtenir la déclaration. En cas d\'expiration ou changement d\'adresse, préparez votre ancienne CIN et justificatifs.',
  },
  {
    id: 2,
    title: 'Prendre rendez-vous en ligne sur le portail cnie.ma',
    context: 'La pré-demande et la prise de rendez-vous en ligne sur le portail officiel de la DGSN sont obligatoires avant tout déplacement.',
    linkText: 'Accéder au portail officiel cnie.ma ↗',
    linkTo: 'https://www.cnie.ma',
    isExternal: true,
  },
  {
    id: 3,
    title: 'Préparer la photo d\'identité aux normes (35×45 mm)',
    context: 'Format officiel 35×45 mm sur fond clair, visage centré sans ombres ni reflets.',
    linkText: 'Formater votre photo CIN →',
    linkTo: '/photo-cin',
  },
  {
    id: 4,
    title: 'Déposer le dossier (75 DH) et obtenir le récépissé provisoire',
    context: 'Réglez les frais de 75 DH en guichet et conservez le récépissé provisoire valable 3 mois.',
  },
]

const sources = [
  'cnie.ma — portail officiel de la DGSN pour la prise de rendez-vous et la pré-demande (vérifié directement, y compris le tarif de 75 DH et l\'obligation de rendez-vous en ligne depuis 2020)',
  'demarchesmaroc.com — "Carte d\'identité nationale (CIN)" et "Comment obtenir votre CNIE"',
  'guidedumaroc.com — FAQ Carte d\'Identité Nationale (CIN) (source de la mention sur la délocalisation par commune, non confirmée sur une page officielle)',
  'chhiwat.ma — "CIN Maroc : rendez-vous, demande et démarche de renouvellement"',
]

const GoalRenouvelerCinPage: React.FC = () => {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>(() => loadProgress())

  useEffect(() => {
    saveProgress(checkedSteps)
  }, [checkedSteps])

  const toggleStep = (id: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const completedCount = Object.values(checkedSteps).filter(Boolean).length

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Renouveler sa CIN au Maroc 2026 — Tarif et démarches | Kaghit"
        description="Guide complet pour le renouvellement de la carte d'identité (CNIE) au Maroc : tarif (75 DH), rendez-vous cnie.ma, pièces et perte/vol."
        canonicalUrl="https://kaghit.com/objectifs/renouveler-ma-cin"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-neutral-900 transition-colors">Accueil</Link>
        <span>/</span>
        <Link to="/objectifs" className="hover:text-neutral-900 transition-colors">Objectifs</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">Renouveler sa CIN</span>
      </nav>

      <PageHeading
        title="Renouveler ou refaire sa CIN au Maroc : ce qu'il faut savoir (2026)"
        description="Tarifs (75 DH), prise de rendez-vous sur cnie.ma, pièces à fournir et procédure étape par étape."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2.5" />
            <path d="M15 8h2" />
            <path d="M15 12h2" />
            <path d="M7 16c0-1.5 1.5-2.5 3.5-2.5s3.5 1 3.5 2.5" />
          </svg>
        }
      />

      {/* Checklist */}
      <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
          Plan d'action &amp; Suivi des étapes
        </p>

        <div className="space-y-3 mb-4">
          {STEPS.map((step) => {
            const isDone = Boolean(checkedSteps[step.id])
            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-lg border transition-all duration-150 flex items-start gap-3.5 ${
                  isDone ? 'bg-neutral-100/70 border-neutral-200 opacity-90' : 'bg-white border-neutral-100 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleStep(step.id)}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-bold text-xs transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary-50 text-primary hover:bg-primary hover:text-white'
                  }`}
                  aria-label={isDone ? `Marquer l'étape ${step.id} comme non faite` : `Marquer l'étape ${step.id} comme faite`}
                >
                  {isDone ? (
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs font-bold ${isDone ? 'line-through text-neutral-500' : 'text-neutral-900'}`}>
                      Étape {step.id} : {step.title}
                    </h3>
                    <label className="flex items-center gap-1 cursor-pointer text-[11px] font-medium text-neutral-500 hover:text-neutral-900 select-none">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleStep(step.id)}
                        className="rounded border-neutral-300 text-primary focus:ring-primary h-3.5 w-3.5"
                      />
                      <span>{isDone ? 'Fait' : 'À faire'}</span>
                    </label>
                  </div>

                  <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                    {step.context}
                  </p>

                  {step.linkTo && step.linkText && (
                    <div className="mt-2">
                      {step.isExternal ? (
                        <a
                          href={step.linkTo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                        >
                          {step.linkText}
                        </a>
                      ) : (
                        <Link
                          to={step.linkTo}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                        >
                          {step.linkText}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-700">
            Progression : {completedCount} / {STEPS.length} étapes
          </span>
          <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(completedCount / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Main Article Content */}
      <Card className="p-6 sm:p-10 mb-8">
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <p className="text-base text-neutral-800 font-medium leading-relaxed">
            La carte d'identité nationale électronique (CNIE) se renouvelle dans plusieurs cas : elle arrive à expiration (valable 10 ans), elle est perdue, volée, détériorée, ou vous avez changé d'adresse. La procédure est globalement la même dans les trois premiers cas, avec une étape supplémentaire en cas de perte ou de vol.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Le prix et le délai
            </h2>
            <p>
              Comptez 75 DH pour un renouvellement standard, confirmé directement en vérifiant le site officiel <a href="https://www.cnie.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">cnie.ma</a> (portail de la DGSN, obligatoire depuis septembre 2020 pour toute prise de rendez-vous). Plusieurs guides administratifs indépendants rapportent aussi que la procédure serait désormais délocalisée depuis 2020 — vous pourriez déposer votre dossier dans n'importe quelle commune du Maroc, pas uniquement celle où vous êtes enregistré, à condition de fournir un certificat de résidence de votre commune réelle si vous déposez ailleurs. Ce point précis n'a pas pu être confirmé sur une page officielle unique — mieux vaut le vérifier auprès de votre commune avant de vous déplacer ailleurs que votre lieu d'enregistrement habituel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              En cas de perte ou de vol
            </h2>
            <p>
              Rendez-vous d'abord à l'arrondissement de police ou à la brigade de gendarmerie la plus proche pour faire une déclaration de perte (ou de vol). Conservez le récépissé de cette déclaration : il devra être joint à votre dossier de renouvellement. En cas de détérioration simple, cette étape n'est pas nécessaire.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              En cas de déménagement
            </h2>
            <p>
              Le renouvellement devient obligatoire dans les 30 jours suivant le changement d'adresse, avec votre ancienne CIN, un certificat de résidence pour la nouvelle adresse, et un justificatif de domicile.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Le récépissé provisoire
            </h2>
            <p>
              Une fois votre dossier déposé, vous recevez un récépissé qui fait office de pièce d'identité provisoire pendant 3 mois maximum. Utile si vous avez besoin de prouver votre identité avant que la nouvelle carte ne soit prête.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Bon à savoir
            </h2>
            <p>
              Il est recommandé d'entamer le renouvellement environ 3 mois avant l'expiration de votre carte actuelle, pour éviter de vous retrouver sans pièce d'identité valide.
            </p>
          </section>

          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="text-primary">💡</span> Exemple concret
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Youssef a déménagé de Fès à Tanger pour un nouveau travail. Il ne savait pas que le changement d'adresse imposait un renouvellement de CIN dans les 30 jours. Une fois informé, il se rend directement à un bureau d'état civil à Tanger (pas besoin de retourner à Fès) muni de son ancienne carte, d'un certificat de résidence à sa nouvelle adresse et d'un justificatif de domicile — le dossier est accepté le jour même.
            </p>
          </section>
        </article>

        {/* ── Callout Box linking to Photo CIN tool ── */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none">
              📷
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Besoin d'une photo aux normes pour votre nouvelle CIN ?
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                Recadrez la vôtre gratuitement au format officiel 35×45 mm.
              </p>
            </div>
          </div>

          <Button as="a" href="/photo-cin" variant="primary" className="shrink-0 text-xs">
            Formater sa photo →
          </Button>
        </div>

        {/* ── Sources section ── */}
        <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-500 mb-2">Sources officielles &amp; références :</p>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
            {sources.map((src, i) => (
              <li key={i}>{src}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default GoalRenouvelerCinPage
