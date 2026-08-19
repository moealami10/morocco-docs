import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:constituer-dossier-embauche'

interface QuestionnaireState {
  employmentType: '' | 'prive' | 'public' | 'autre';
  currentlyEmployed: '' | 'oui' | 'non';
}

function loadProgress(): QuestionnaireState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { employmentType: '', currentlyEmployed: '' }
  } catch {
    return { employmentType: '', currentlyEmployed: '' }
  }
}

// Commenting out saveProgress as we're not using it in this simplified version
// function saveProgress(state: QuestionnaireState) {
//   try {
//     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
//   } catch {
//     // ignore
//   }
// }

const GoalConstituerDossierEmbauchePage: React.FC = () => {
  const [state, setState] = useState<QuestionnaireState>(() => loadProgress())

  // Save to sessionStorage whenever state changes
  // useEffect(() => {
  //   saveProgress(state)
  // }, [state])

  const resetForm = () => {
    setState({ employmentType: '', currentlyEmployed: '' })
    sessionStorage.removeItem(STORAGE_KEY)
  }

  // Determine required documents based on selections
  const requiredDocuments = []

  // Casier judiciaire - toujours souvent demandé
  if (state.employmentType) {
    requiredDocuments.push({
      id: 1,
      title: 'Obtenir votre casier judiciaire',
      context: 'Fréquemment demandé par les employeurs lors d\'une embauche afin d\'attester de votre situation judiciaire (bulletin n°3).',
      tag: 'Souvent demandé' as const,
      linkText: 'Consulter le guide casier judiciaire →',
      linkTo: '/guides/casier-judiciaire',
      isExternal: false
    })
  }

  // Attestation de travail - seulement si actuellement en poste
  if (state.currentlyEmployed === 'oui') {
    requiredDocuments.push({
      id: 2,
      title: 'Générer votre attestation de travail',
      context: 'Si vous êtes actuellement en poste ou devez prouver votre ancienneté auprès d\'un futur employeur.',
      tag: 'Souvent demandé' as const,
      linkText: 'Générer l\'attestation de travail →',
      linkTo: '/attestation-de-travail',
      isExternal: false
    })
  }

  // Photo d'identité - recommandée dans tous les cas
  if (state.employmentType) {
    requiredDocuments.push({
      id: 3,
      title: 'Préparer une photo d\'identité aux normes',
      context: 'Au format standard 35×45 mm à joindre à votre fiche de candidature ou badge d\'entreprise.',
      tag: 'Recommandé' as const,
      linkText: 'Formater votre photo d\'identité →',
      linkTo: '/photo-cin',
      isExternal: false
    })
  }

  // In this simplified flow, we don't track completion with checkboxes
// Instead we consider the flow complete when user has made both selections

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Constituer votre dossier d'embauche au Maroc — Guide et documents requis | Kaghit"
        description="Plan d'action personnalisé pour votre dossier d'embauche au Maroc selon votre situation : casier judiciaire, attestation de travail et photo d'identité aux normes."
        canonicalUrl="https://kaghit.com/objectifs/constituer-dossier-embauche"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-neutral-900 transition-colors">Accueil</Link>
        <span>/</span>
        <Link to="/objectifs" className="hover:text-neutral-900 transition-colors">Objectifs</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">Constituer mon dossier d'embauche</span>
      </nav>

      <PageHeading
        title="Constituer votre dossier d'embauche : guide personnalisé"
        description="Répondez à quelques questions pour obtenir la liste exacte des documents nécessaires selon votre situation."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        }
      />

      {/* Questionnaire Section */}
      {state.employmentType === '' || state.currentlyEmployed === '' ? (
        <div className="space-y-6">
          {/* Employment Type Question */}
          {state.employmentType === '' && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Pour commencer, quel type d'emploi visez-vous ?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'prive' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Secteur privé
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'public' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Concours / recrutement public
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, employmentType: 'autre' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Autre / Je ne sais pas
                </button>
              </div>
            </Card>
          )}

          {/* Currently Employed Question */}
          {state.employmentType !== '' && state.currentlyEmployed === '' && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Êtes-vous actuellement en poste ?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setState(prev => ({ ...prev, currentlyEmployed: 'oui' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Oui
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, currentlyEmployed: 'non' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Non
                </button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        // Results Section when both questions answered
        <>
          <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
            <p className="text-sm text-neutral-700 leading-relaxed">
              Voici les documents à préparer pour votre dossier d'embauche :
            </p>

            {/* Progress indicator */}
            <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700">
                {requiredDocuments.length} document{requiredDocuments.length > 1 ? 's' : ''} à préparer
              </span>
              <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(requiredDocuments.length > 0 ? 100 : 0)}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Documents List */}
          {requiredDocuments.length > 0 ? (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                Liste de préparation
              </p>

              <div className="space-y-4">
                {requiredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-100 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-neutral-900">
                          {doc.title}
                        </h3>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getTagBadgeStyle(doc.tag)}`}>
                          {doc.tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 cursor-pointer text-[11px] font-medium text-neutral-500 hover:text-neutral-900 select-none">
                        {/* In this simplified version, we don't have checkboxes for completion tracking */}
                        <span>-</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                      {doc.context}
                    </p>

                    {doc.linkTo && doc.linkText && (
                      <div className="mt-2">
                        {doc.isExternal ? (
                          <a
                            href={doc.linkTo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                          >
                            {doc.linkText}
                          </a>
                        ) : (
                          <Link
                            to={doc.linkTo}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                          >
                            {doc.linkText}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed text-center">
                Aucun document spécifique requis pour votre situation actuelle.
              </p>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 mt-8">
            <Button
              variant="secondary"
              onClick={resetForm}
              className="w-full sm:w-auto"
            >
              Recommencer
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // In a real implementation, we might save progress or navigate elsewhere
                alert('Pour conserver votre progression, utilisez l\'option de sauvegarde du navigateur ou notez la liste ci-dessus.')
              }}
              className="w-full sm:w-auto"
            >
              Télécharger la liste
            </Button>
          </div>
        </>
      )}

      {/* Main Article Content - Contextual Information */}
      <Card className="p-6 sm:p-10 mb-8">
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              À propos du dossier d'embauche au Maroc
            </h2>
            <p className="text-neutral-700">
              Au Maroc, la plupart des recruteurs et départements RH demandent un ensemble de documents standard lors de la constitution de votre dossier d'embauche ou de candidature. Les exigences peuvent varier selon :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Le secteur d'activité (privé, public, semi-public)</li>
              <li>Le type de contrat visé (CDI, CDD, stage, freelance)</li>
              <li>Si vous êtes actuellement en poste ou en recherche d'emploi</li>
              <li>La taille et les politiques internes de l'entreprise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Conseils pour renforcer votre candidature
            </h2>
            <p className="text-neutral-700">
              En plus des documents administratifs, pensez à préparer :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Un CV à jour adapté au poste visé</li>
              <li>Une lettre de motivation personnalisée</li>
              <li>Des références professionnelles (si disponibles)</li>
              <li>Un portfolio ou des réalisations pertinentes (selon votre domaine)</li>
            </ul>
          </section>
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">Sources & références :</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.emploi-public.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              Portail emploi-public.ma
            </a>
            — Ressources pour les concours et recrutement public
          </li>
          <li>
            <a
              href="https://www.anarem.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              ANAREM - Cabinet de recrutement
            </a>
            — Guide secteur privé
          </li>
        </ul>
      </div>
    </div>
  )
}

// Import the getTagBadgeStyle function from our centralized types
import type { TagType } from '../types/objectif'

function getTagBadgeStyle(tag: TagType): string {
  switch (tag) {
    case 'Obligatoire légalement':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Souvent demandé':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'Recommandé':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'Dépend de la situation':
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
}

export default GoalConstituerDossierEmbauchePage