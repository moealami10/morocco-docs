import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const STORAGE_KEY = 'kaghit:progress:renouveler-ma-cin'

interface CinRenewalState {
  reason: '' | 'expiration' | 'perte' | 'vol' | 'detioration' | 'adresse' | 'autre';
}

function loadProgress(): CinRenewalState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { reason: '' }
  } catch {
    return { reason: '' }
  }
}

// function saveProgress(state: CinRenewalState) {
//   try {
//     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
//   } catch {
//     // ignore
//   }
// }

const GoalRenouvelerCinPage: React.FC = () => {
  const [state, setState] = useState<CinRenewalState>(() => loadProgress())

  // Save to sessionStorage whenever state changes
  // useEffect(() => {
  //   saveProgress(state)
  // }, [state])

  const resetForm = () => {
    setState({ reason: '' })
    sessionStorage.removeItem(STORAGE_KEY)
  }

  // Determine requirements based on selected reason
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

  // Logic based on renewal reason
  if (state.reason === 'expiration') {
    // Expiration - standard renewal
    requirements.documents.push({
      id: 1,
      title: 'Ancienne CIN',
      context: 'Votre carte d\'identité nationale arrivée à expiration.',
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
      id: 1,
      title: 'Prendre rendez-vous en ligne sur le portail cnie.ma',
      context: 'La pré-demande et la prise de rendez-vous en ligne sur le portail officiel de la DGSN sont obligatoires depuis septembre 2020 avant tout déplacement.',
      tag: 'Obligatoire légalement',
      linkText: 'Accéder au portail officiel cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 2,
      title: 'Photo d\'identité aux normes',
      context: 'Format standard 35×45 mm sur fond clair, visage centré sans ombres ni reflets.',
      tag: 'Obligatoire légalement',
      linkText: 'Formater votre photo CIN →',
      linkTo: '/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'Déposer le dossier et payer les frais (75 DH)',
      context: 'Réglez les frais de 75 DH en guichet et conservez le récépissé provisoire valable 3 mois.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'perte' || state.reason === 'vol') {
    // Perte ou vol - nécessite déclaration préalable
    requirements.actions.push({
      id: 1,
      title: `Faire une déclaration de ${state.reason === 'perte' ? 'perte' : 'vol'}`,
      context: `Rendez-vous à l'arrondissement de police ou à la brigade de gendarmerie la plus proche pour faire une déclaration de ${state.reason === 'perte' ? 'perte' : 'vol'}. Conservez le récépissé de cette déclaration : il devra être joint à votre dossier de renouvellement.`,
      tag: 'Obligatoire légalement'
    })

    requirements.documents.push({
      id: 2,
      title: 'Déclaration de perte/vol',
      context: `Le récépissé de déclaration de ${state.reason === 'perte' ? 'perte' : 'vol'} obtenu auprès des autorités policières ou de gendarmerie.`,
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
      id: 2,
      title: 'Prendre rendez-vous en ligne sur le portail cnie.ma',
      context: 'La pré-demande et la prise de rendez-vous en ligne sur le portail officiel de la DGSN sont obligatoires depuis septembre 2020 avant tout déplacement.',
      tag: 'Obligatoire légalement',
      linkText: 'Accéder au portail officiel cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 3,
      title: 'Photo d\'identité aux normes',
      context: 'Format standard 35×45 mm sur fond clair, visage centré sans ombres ni reflets.',
      tag: 'Obligatoire légalement',
      linkText: 'Formater votre photo CIN →',
      linkTo: '/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 3,
      title: 'Déposer le dossier complet et payer les frais (75 DH)',
      context: 'Réglez les frais de 75 DH en guichet et conservez le récépissé provisoire valable 3 mois.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'detioration') {
    // Détérioration - similaire à expiration mais avec ancienne CIN détériorée
    requirements.documents.push({
      id: 1,
      title: 'Ancienne CIN détériorée',
      context: 'Votre carte d\'identité nationale détériorée ou illisible.',
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
      id: 1,
      title: 'Prendre rendez-vous en ligne sur le portail cnie.ma',
      context: 'La pré-demande et la prise de rendez-vous en ligne sur le portail officiel de la DGSN sont obligatoires depuis septembre 2020 avant tout déplacement.',
      tag: 'Obligatoire légalement',
      linkText: 'Accéder au portail officiel cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 2,
      title: 'Photo d\'identité aux normes',
      context: 'Format standard 35×45 mm sur fond clair, visage centré sans ombres ni reflets.',
      tag: 'Obligatoire légalement',
      linkText: 'Formater votre photo CIN →',
      linkTo: '/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'Déposer le dossier et payer les frais (75 DH)',
      context: 'Réglez les frais de 75 DH en guichet et conservez le récépissé provisoire valable 3 mois.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'adresse') {
    // Changement d'adresse - nécessite justificatif de résidence
    requirements.documents.push({
      id: 1,
      title: 'Ancienne CIN',
      context: 'Votre carte d\'identité nationale actuelle.',
      tag: 'Obligatoire légalement'
    })

    requirements.documents.push({
      id: 2,
      title: 'Justificatif de nouvelle adresse',
      context: 'Certificat de résidence ou facture récente (électricité, eau, téléphone) à votre nouveau nom et adresse.',
      tag: 'Obligatoire légalement'
    })

    requirements.actions.push({
      id: 1,
      title: 'Prendre rendez-vous en ligne sur le portail cnie.ma',
      context: 'La pré-demande et la prise de rendez-vous en ligne sur le portail officiel de la DGSN sont obligatoires depuis septembre 2020 avant tout déplacement.',
      tag: 'Obligatoire légalement',
      linkText: 'Accéder au portail officiel cnie.ma ↗',
      linkTo: 'https://www.cnie.ma',
      isExternal: true
    })

    requirements.documents.push({
      id: 3,
      title: 'Photo d\'identité aux normes',
      context: 'Format standard 35×45 mm sur fond clair, visage centré sans ombres ni reflets.',
      tag: 'Obligatoire légalement',
      linkText: 'Formater votre photo CIN →',
      linkTo: '/photo-cin',
      isExternal: false
    })

    requirements.actions.push({
      id: 2,
      title: 'Déposer le dossier complet et payer les frais (75 DH)',
      context: 'Réglez les frais de 75 DH en guichet et conservez le récépissé provisoire valable 3 mois.',
      tag: 'Obligatoire légalement'
    })
  } else if (state.reason === 'autre') {
    // Autres raisons - guidance générale
    requirements.actions.push({
      id: 1,
      title: 'Vérifier votre éligibilité au renouvellement',
      context: 'Consultez le portail officiel cnie.ma ou rendez-vous au guichet pour vérifier si votre situation particulière Justifie un renouvellement de CIN.',
      tag: 'Recommandé'
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Renouveler sa CIN au Maroc 2026 — Tarif et démarches | Kaghit"
        description="Guide personnalisé pour le renouvellement de la carte d'identité (CNIE) au Maroc selon votre situation : expiration, perte, vol, détérioration ou changement d'adresse."
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
        title="Renouveler ou refaire sa CIN au Maroc : guide personnalisé"
        description="Indiquez le motif de votre demande pour obtenir la liste exacte des documents et démarches nécessaires."
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

      {/* Questionnaire Section */}
      {state.reason === '' ? (
        <div className="space-y-6">
          <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              Pourquoi refaites-vous votre CIN ?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'expiration' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                Carte expirée
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'perte' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                Perte de la carte
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'vol' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                Vol de la carte
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'detioration' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                Carte détériorée
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'adresse' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                Changement d'adresse
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, reason: 'autre' }))}
                className="w-full text-left p-4 rounded-lg border transition-all duration-150 bg-white border-neutral-200 hover:bg-neutral-50"
              >
                Autre raison
              </button>
            </div>
          </Card>
        </div>
      ) : (
        // Results Section when reason is selected
        <>
          <div className="space-y-6">
            {/* Requirements Summary */}
            {(requirements.actions.length > 0 || requirements.documents.length > 0) && (
              <Card className="p-6 mb-8 border-primary-100 bg-neutral-50/60">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Voici ce dont vous avez besoin pour le renouvellement de votre CIN :
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
              À propos du renouvellement de la CIN au Maroc
            </h2>
            <p className="text-neutral-700">
              La carte d'identité nationale électronique (CNIE) se renouvelle dans plusieurs cas : elle arrive à expiration (valable 10 ans), elle est perdue, volée, détériorée, ou vous avez changé d'adresse. Bien que la procédure générale soit similaire, chaque situation nécessite des documents et démarches spécifiques.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Le prix et le délai
            </h2>
            <p className="text-neutral-700">
              Le tarif officiel pour le renouvellement de la CIN est de 75 DH, confirmé par le portail officiel <a href="https://www.cnie.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">cnie.ma</a>. Le récépissé provisoire est valable 3 mois maximum.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Bon à savoir
            </h2>
            <p className="text-neutral-700">
              Il est recommandé d'entamer le renouvellement environ 3 mois avant l'expiration de votre carte actuelle, pour éviter de vous retrouver sans pièce d'identité valide.
            </p>
          </section>

          {(state.reason === 'perte' || state.reason === 'vol') && (
            <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
              <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-primary">⚠️</span> En cas de perte ou de vol
              </h2>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Rendez-vous d'abord à l'arrondissement de police ou à la brigade de gendarmerie la plus proche pour faire une déclaration de perte (ou de vol). Conservez le récépissé de cette déclaration : il devra être joint à votre dossier de renouvellement.
              </p>
            </section>
          )}

          {(state.reason === 'adresse') && (
            <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
              <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="text-primary">📍</span> En cas de changement d'adresse
              </h2>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Le renouvellement devient obligatoire dans les 30 jours suivant le changement d'adresse, avec votre ancienne CIN, un certificat de résidence pour la nouvelle adresse, et un justificatif de domicile.
              </p>
            </section>
          )}
        </article>
      </Card>

      {/* Sources section */}
      <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-500 mb-2">Sources officielles & références :</p>
        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
          <li>
            <a
              href="https://www.cnie.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              cnie.ma — portail officiel de la DGSN
            </a>
            — Prise de rendez-vous et pré-demande (tarif 75 DH et RDV obligatoire depuis 2020)
          </li>
          <li>
            <a
              href="https://demarchesmaroc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              demarchesmaroc.com
            </a>
            — "Carte d'identité nationale (CIN)" et "Comment obtenir votre CNIE"
          </li>
          <li>
            <a
              href="https://guidedumaroc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              guidedumaroc.com
            </a>
            — FAQ Carte d'Identité Nationale (CIN)
          </li>
          <li>
            <a
              href="https://chhiwat.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
            >
              chhiwat.ma
            </a>
            — "CIN Maroc : rendez-vous, demande et démarche de renouvellement"
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

export default GoalRenouvelerCinPage