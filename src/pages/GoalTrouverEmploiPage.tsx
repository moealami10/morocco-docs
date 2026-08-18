import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:trouver-un-emploi'

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

type TagType = 'Obligation légale' | 'Généralement demandé' | 'Recommandé' | 'Dépend du cas'

interface StepItem {
  id: number
  title: string
  context: string
  tag: TagType
  linkText?: string
  linkTo?: string
  isExternal?: boolean
}

const STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Obtenir votre casier judiciaire',
    context: 'Fréquemment demandé par les employeurs lors d\'une embauche afin d\'attester de votre situation judiciaire (bulletin n°3).',
    tag: 'Généralement demandé',
    linkText: 'Consulter le guide casier judiciaire →',
    linkTo: '/guides/casier-judiciaire',
  },
  {
    id: 2,
    title: 'Générer votre attestation de travail si vous en avez besoin pour le dossier',
    context: 'Si vous êtes déjà en poste ou devez prouver votre ancienneté auprès d\'un futur employeur.',
    tag: 'Dépend du cas',
    linkText: 'Générer l\'attestation de travail →',
    linkTo: '/attestation-de-travail',
  },
  {
    id: 3,
    title: 'Préparer une photo d\'identité aux normes si le dossier en demande une',
    context: 'Au format standard 35×45 mm à joindre à votre fiche de candidature ou badge d\'entreprise.',
    tag: 'Recommandé',
    linkText: 'Formater votre photo d\'identité →',
    linkTo: '/photo-cin',
  },
]

function getTagBadgeStyle(tag: TagType): string {
  switch (tag) {
    case 'Obligation légale':
      return 'bg-amber-50 text-amber-800 border-amber-200'
    case 'Généralement demandé':
      return 'bg-blue-50 text-blue-800 border-blue-200'
    case 'Recommandé':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    case 'Dépend du cas':
      return 'bg-neutral-100 text-neutral-700 border-neutral-200'
  }
}

const GoalTrouverEmploiPage: React.FC = () => {
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
        title="Dossier d'embauche Maroc — Guide et documents requis | Kaghit"
        description="Plan d'action pour votre dossier d'embauche au Maroc : casier judiciaire, attestation de travail et photo d'identité aux normes."
        canonicalUrl="https://kaghit.com/objectifs/trouver-un-emploi"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-neutral-900 transition-colors">Accueil</Link>
        <span>/</span>
        <Link to="/objectifs" className="hover:text-neutral-900 transition-colors">Objectifs</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">Trouver un emploi</span>
      </nav>

      <PageHeading
        title="Dossier d'embauche : trouver un emploi"
        description="Le guide complet pour rassembler rapidement tous les documents exigés par les recruteurs et services RH au Maroc."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
      />

      {/* Intro context */}
      <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
        <p className="text-sm text-neutral-700 leading-relaxed">
          Au Maroc, la plupart des recruteurs et départements RH demandent un ensemble de documents standard lors de la constitution de votre dossier d'embauche ou de candidature. Ce plan d'action vous guide étape par étape pour obtenir votre casier judiciaire, votre attestation de travail et votre photo d'identité conforme.
        </p>

        {/* Progress indicator */}
        <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-700">
            Progression : {completedCount} / {STEPS.length} étape{STEPS.length > 1 ? 's' : ''} complétée{completedCount > 1 ? 's' : ''}
          </span>
          <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(completedCount / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Checklist */}
      <div className="space-y-4">
        {STEPS.map((step) => {
          const isDone = Boolean(checkedSteps[step.id])
          return (
            <Card
              key={step.id}
              className={`p-5 transition-all duration-150 ${
                isDone ? 'bg-neutral-50/80 border-neutral-200 opacity-90' : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Numbered Pill / Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleStep(step.id)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary-50 text-primary hover:bg-primary hover:text-white'
                  }`}
                  aria-label={isDone ? `Marquer l'étape ${step.id} comme non faite` : `Marquer l'étape ${step.id} comme faite`}
                >
                  {isDone ? (
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-base font-bold ${isDone ? 'line-through text-neutral-500' : 'text-neutral-900'}`}>
                        {step.title}
                      </h3>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getTagBadgeStyle(step.tag)}`}>
                        {step.tag}
                      </span>
                    </div>

                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-neutral-500 hover:text-neutral-900 select-none">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleStep(step.id)}
                        className="rounded border-neutral-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>{isDone ? 'Fait' : 'À faire'}</span>
                    </label>
                  </div>

                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {step.context}
                  </p>

                  {step.linkTo && step.linkText && (
                    <div className="mt-3">
                      <Link
                        to={step.linkTo}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-600 transition-colors"
                      >
                        {step.linkText}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default GoalTrouverEmploiPage
