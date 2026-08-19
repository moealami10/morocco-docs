import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card } from '../components/ui'
import { Seo } from '../components/Seo'

interface GoalItem {
  to: string
  title: string
  description: string
  badge: string
  icon: React.ReactNode
}

const GOALS: GoalItem[] = [
  {
    to: '/objectifs/constituer-dossier-embauche',
    title: 'Constituer mon dossier d\'embauche',
    description:
      'Liste personnalisée selon votre situation : casier judiciaire, attestation de travail, photo d\'identité.',
    badge: 'Questionnaire adapté',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    to: '/objectifs/voyager-avec-mon-enfant',
    title: 'Faire voyager mon enfant sans moi',
    description:
      'Autorisation parentale et photo d\'identité, réunis.',
    badge: '4 étapes',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: '/objectifs/renouveler-ma-cin',
    title: 'Renouveler ou refaire ma CIN',
    description:
      'Ce qu\'il faut savoir avant de vous déplacer.',
    badge: '4 étapes + Guide',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2.5" />
        <path d="M15 8h2" />
        <path d="M15 12h2" />
        <path d="M7 16c0-1.5 1.5-2.5 3.5-2.5s3.5 1 3.5 2.5" />
      </svg>
    ),
  },
]

const ObjectifsIndexPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Objectifs et guides démarches Maroc | Kaghit"
        description="Découvrez nos plans d'action guidés pour vos démarches administratives au Maroc : trouver un emploi, voyage d'un enfant mineur, renouvellement de CIN."
        canonicalUrl="https://kaghit.com/objectifs"
      />

      <PageHeading
        title="Qu'est-ce que vous voulez accomplir ?"
        description="Sélectionnez votre objectif ci-dessous pour obtenir un plan d'action guidé étape par étape et créer tous vos documents sans rien oublier."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        }
      />

      <div className="grid gap-6 sm:grid-cols-3">
        {GOALS.map((goal) => (
          <Link
            key={goal.to}
            to={goal.to}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
          >
            <Card className="h-full flex flex-col justify-between transition-all duration-200 group-hover:shadow-card-hover group-hover:-translate-y-0.5 group-hover:border-neutral-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-150">
                    {goal.icon}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                    {goal.badge}
                  </span>
                </div>

                <h2 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors duration-150 mb-2">
                  {goal.title}
                </h2>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  {goal.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-primary pt-3 border-t border-neutral-100">
                Voir le plan d'action
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ObjectifsIndexPage
