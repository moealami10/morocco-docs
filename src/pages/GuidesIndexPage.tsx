import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card } from '../components/ui'
import { Seo } from '../components/Seo'

interface GuideItem {
  to: string
  title: string
  description: string
  readTime: string
}

const GUIDES: GuideItem[] = [
  {
    to: '/guides/casier-judiciaire',
    title: 'Comment obtenir son extrait de casier judiciaire au Maroc (2026)',
    description:
      'Démarche en ligne sur casierjudiciaire.justice.gov.ma, différence entre casier judiciaire et fiche anthropométrique, tarifs (10 DH) et durée de validité.',
    readTime: '3 min de lecture',
  },
  {
    to: '/guides/acte-de-naissance',
    title: 'Acte de naissance au Maroc : comment l\'obtenir (démarche 2026)',
    description:
      'Obtenir son acte de naissance en commune ou en ligne via le portail Watiqa, délais de déclaration de naissance (30 jours) et cas des MRE.',
    readTime: '3 min de lecture',
  },
]

const GuidesIndexPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Guides administratifs marocains 2026 | Kaghit"
        description="Consultez nos guides pratiques pour vos démarches administratives au Maroc : extrait de casier judiciaire, acte de naissance, pièces à fournir et délais."
        canonicalUrl="https://kaghit.com/guides"
      />

      <PageHeading
        title="Guides administratifs"
        description="Retrouvez nos explications détaillées pour réussir vos démarches administratives au Maroc en toute simplicité."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link
            key={guide.to}
            to={guide.to}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
          >
            <Card className="h-full flex flex-col justify-between transition-all duration-200 group-hover:shadow-card-hover group-hover:-translate-y-0.5 group-hover:border-neutral-200">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2 block">
                  {guide.readTime}
                </span>
                <h2 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors duration-150 mb-2">
                  {guide.title}
                </h2>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  {guide.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-primary pt-2 border-t border-neutral-100">
                Lire le guide
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

export default GuidesIndexPage
