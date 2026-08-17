import React from 'react'
import { PageHeading, Card } from '../components/ui'

const PhotoCINPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <PageHeading
        title="Photo CIN"
        description="Redimensionnez et formatez votre photo au standard CIN marocain (35×45 mm, fond blanc) directement depuis votre navigateur, sans envoyer vos données."
        icon={
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        }
      />

      <Card>
        <p className="text-sm text-neutral-500 text-center py-8">
          L'outil de mise en format photo CIN sera disponible ici.
        </p>
      </Card>
    </div>
  )
}

export default PhotoCINPage
