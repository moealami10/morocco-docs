import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:voyager-avec-mon-enfant'

interface VoyageState {
  travelCompanion: '' | 'both-parents' | 'one-parent' | 'another-adult' | 'alone';
  destination: string;
  passportValid: '' | 'oui' | 'non';
  destinationConfirmed: boolean;
}

function loadProgress(): VoyageState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : { travelCompanion: '', destination: '', passportValid: '' }
    // Ensure destinationConfirmed exists for backward compatibility
    return {
      ...parsed,
      destinationConfirmed: parsed.destinationConfirmed ?? false
    }
  } catch {
    return { travelCompanion: '', destination: '', passportValid: '', destinationConfirmed: false }
  }
}


const GoalVoyagerEnfantPage: React.FC = () => {
  const [state, setState] = useState<VoyageState>(() => loadProgress())

  // Save to sessionStorage whenever state changes
  // useEffect(() => {
  //   saveProgress(state)
  // }, [state])

  const resetForm = () => {
    setState({ travelCompanion: '', destination: '', passportValid: '', destinationConfirmed: false })
    sessionStorage.removeItem(STORAGE_KEY)
  }

  // Determine requirements based on selections
  const requirements = {
    actions: [] as Array<{
      id: number
      title: string
      context: string
      tag: 'Obligatoire légalement' | 'Souvent demandé' | 'Recommandé' | 'Dépend de la situation'
      linkText?: string
      linkTo?: string
      isExternal?: boolean
    }>,
    documents: [] as Array<{
      id: number
      title: string
      context: string
      tag: 'Obligatoire légalement' | 'Souvent demandé' | 'Recommandé' | 'Dépend de la situation'
      linkText?: string
      linkTo?: string
      isExternal?: boolean
    }>
  }

  // Logic based on travel companion
  if (state.travelCompanion === 'both-parents') {
    // Both parents traveling with child - usually no authorization needed
    requirements.documents.push({
      id: 1,
      title: 'Passeport valide de l\'enfant',
      context: 'Seul le passeport valide de l\'enfant est exigé lorsque les deux parents voyagent ensemble.',
      tag: 'Obligatoire légalement'
    })

    // Actions
    requirements.actions.push({
      id: 1,
      title: 'Vérifier les exigences de la destination et de la compagnie aérienne',
      context: 'Selon la destination et la compagnie aérienne, vérifiez toujours leurs exigences spécifiques même lorsque les deux parents accompagnent l\'enfant.',
      tag: 'Souvent demandé'
    })
  } else if (state.travelCompanion === 'one-parent' ||
             state.travelCompanion === 'another-adult' ||
             state.travelCompanion === 'alone') {
    // One parent, another adult, or child alone - authorization needed
requirements.documents.push({
       id: 1,
       title: 'Autorisation parentale',
       context: 'Indispensable si l\'enfant voyage seul, accompagné d\'un seul parent ou d\'un autre adulte.',
       tag: 'Dépend de la situation',
       linkText: 'Générer l\'autorisation parentale →',
       linkTo: '/autorisation-parentale',
       isExternal: false
     })

requirements.actions.push({
       id: 2,
       title: 'Faire légaliser la signature',
       context: 'À la commune ou Moqataa de votre domicile muni de votre CIN afin de rendre l\'autorisation légalement valide.',
       tag: 'Dépend de la situation'
     })

requirements.documents.push({
       id: 2,
       title: 'Passeport valide de l\'enfant',
       context: 'Le passeport biométrique valide de l\'enfant est exigé.',
       tag: 'Dépend de la situation'
     })

    // Photo d'identité seulement si le passeport doit être renouvelé
if (state.passportValid === 'non') {
       requirements.documents.push({
         id: 3,
         title: 'Photo d\'identité aux normes',
         context: 'Au format standard 35×45 mm pour la demande ou le renouvellement du passeport biométrique du mineur.',
         tag: 'Dépend de la situation',
         linkText: 'Formater la photo du passeport →',
         linkTo: '/photo-cin',
         isExternal: false
       })
     }
  }

  // Add destination-specific advice if destination is provided
  if (state.destination.trim() !== '') {
    requirements.actions.push({
      id: 3,
      title: `Vérifier les exigences spécifiques pour ${state.destination}`,
      context: 'Certaines destinations peuvent avoir des exigences supplémentaires (visas, vaccinations, autorisations spécifiques). Consultez le site officiel de l\'ambassade ou du consulat de votre destination.',
      tag: 'Recommandé'
    })
  }

  // For this simplified flow, we don't need a completion counter
// In a real implementation, we might track completion differently

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Voyage d'un mineur au Maroc — Autorisation et démarches | Kaghit"
        description="Guide étape par étape personnalisé pour voyager avec un enfant mineur au Maroc : autorisation parentale, légalisation et photo passeport selon votre situation."
        canonicalUrl="https://kaghit.com/objectifs/voyager-avec-mon-enfant"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-neutral-900 transition-colors">Accueil</Link>
        <span>/</span>
        <Link to="/objectifs" className="hover:text-neutral-900 transition-colors">Objectifs</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">Voyager avec mon enfant</span>
      </nav>

      <PageHeading
        title="Voyager avec mon enfant : guide personnalisé"
        description="Répondez à quelques questions pour obtenir la liste exacte des documents et démarches nécessaires selon votre situation."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />

      {/* Questionnaire Section */}
      {state.travelCompanion === '' || state.destination === '' || state.passportValid === '' ? (
        <div className="space-y-6">
          {/* Travel Companion Question */}
          {!state.travelCompanion && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Avec qui l'enfant voyage-t-il ?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'both-parents' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Les deux parents
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'one-parent' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Un seul parent
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'another-adult' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Un autre adulte
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, travelCompanion: 'alone' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  L'enfant seul
                </button>
              </div>
            </Card>
          )}

          {/* Destination Question */}
          {state.travelCompanion && !state.destinationConfirmed && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Quelle est la destination du voyage ?
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Ex: France, Espagne, Tunisie..."
                  value={state.destination}
                  onChange={(e) => setState(prev => ({ ...prev, destination: e.target.value.trim() }))}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-150 text-sm"
                />
                {state.destination ? (
                  <>
                    <p className="mt-2 text-xs text-neutral-500">
                      Destination saisie : "{state.destination}"
                    </p>
                    <button
                      onClick={() => setState(prev => ({ ...prev, destinationConfirmed: true }))}
                      className="mt-3 w-full px-4 py-2 rounded-lg border border-primary-100 bg-primary-50 text-primary font-medium hover:bg-primary-100 transition-colors duration-150"
                    >
                      Continuer
                    </button>
                  </>
                ) : (
                  <p className="mt-2 text-xs text-neutral-500 text-italic">
                    Veuillez saisir une destination
                  </p>
                )}
              </div>
            </Card>
          )}

          {/* Passport Validity Question */}
          {state.travelCompanion !== '' && state.destinationConfirmed && state.passportValid === '' && (
            <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Le passeport de l'enfant est-il encore valide ?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setState(prev => ({ ...prev, passportValid: 'oui' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Oui, valide
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, passportValid: 'non' }))}
                  className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
                >
                  Non, à renouveler
                </button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        // Results Section when all questions answered
        <>
          <div className="space-y-6">
            {/* Requirements Summary */}
            {(requirements.actions.length > 0 || requirements.documents.length > 0) && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Voici ce dont vous avez besoin pour le voyage de votre enfant :
                </p>

                {/* Progress indicator */}
                <div className="mt-4 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700">
                    {requirements.actions.length + requirements.documents.length} élément{requirements.actions.length + requirements.documents.length > 1 ? 's' : ''} à préparer
                  </span>
                  <div className="w-32 bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${(requirements.actions.length + requirements.documents.length > 0 ? 100 : 0)}%` }}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Actions Section */}
            {requirements.actions.length > 0 && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  Démarches à accomplir
                </p>

                <div className="space-y-4">
                  {requirements.actions.map((action) => (
                    <div
                      key={action.id}
                      className="p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-100 shadow-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-neutral-900">
                            {action.title}
                          </h3>
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getTagBadgeStyle(action.tag)}`}>
                            {action.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer text-[11px] font-medium text-neutral-500 hover:text-neutral-900 select-none">
                          {/* In this simplified version, we don't have checkboxes for completion tracking */}
                          <span>-</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                        {action.context}
                      </p>

                      {action.linkTo && action.linkText && (
                        <div className="mt-2">
                          {action.isExternal ? (
                            <a
                              href={action.linkTo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {action.linkText}
                            </a>
                          ) : (
                            <Link
                              to={action.linkTo}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-600 transition-colors"
                            >
                              {action.linkText}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Documents Section */}
            {requirements.documents.length > 0 && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  Documents à préparer
                </p>

                <div className="space-y-4">
                  {requirements.documents.map((doc) => (
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
            )}
          </div>

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
              À propos du voyage des mineurs au Maroc
            </h2>
            <p className="text-neutral-700">
              Les exigences pour voyager avec un enfant mineur varient considérablement selon qui accompagne l'enfant, la destination, et la validité des documents de voyage. Cette précision est essentielle pour éviter les refus d'embarquement ou les complications aux frontières.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Conseils importants
            </h2>
            <p className="text-neutral-700">
              Toujours vérifier les exigences spécifiques de :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>La compagnie aérienne ou le transporteur</li>
              <li>Le pays de destination (et de transit le cas échéant)</li>
              <li>Les autorités marocaines si vous partez du Maroc</li>
            </ul>
            <p className="text-neutral-700">
              Conservez toujours des copies électroniques et papier de tous les documents importants.
            </p>
          </section>
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">Sources & références :</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.wathiqa.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              Wathiqa.ma - Guide voyage mineur
            </a>
            — Informations sur l'autorisation de voyage pour mineur
          </li>
          <li>
            <a
              href="https://www.mjcc.gov.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              Ministère de la Justice - Modèles d'autorisation
            </a>
            — Exemples de documents legalisés
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
      return 'bg-blue-50 text-blue-800 border-amber-200';
    case 'Recommandé':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'Dépend de la situation':
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
}

export default GoalVoyagerEnfantPage