import React from 'react'
import { PageHeading, Card } from '../components/ui'

const AutorisationParentalePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <PageHeading
        title="Autorisation parentale"
        description="Créez une autorisation parentale pour un mineur — voyage, sortie scolaire ou démarche administrative. Remplissez le formulaire et téléchargez le PDF."
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />

      <Card>
        <p className="text-sm text-neutral-500 text-center py-8">
          Le formulaire de génération d'autorisation parentale sera disponible ici.
        </p>
      </Card>
    </div>
  )
}

export default AutorisationParentalePage
