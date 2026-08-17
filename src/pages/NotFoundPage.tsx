import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import { Seo } from '../components/Seo'

const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24 text-center">
      <Seo
        title="Page introuvable (404) | Kaghit"
        description="La page que vous recherchez n'existe pas ou a été déplacée sur Kaghit."
        canonicalUrl="https://kaghit.com/404"
      />

      <Card className="p-8 sm:p-12 shadow-card border-neutral-100">
        {/* Badge 404 */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary font-black text-xl">
          404
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-3">
          Page introuvable
        </h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-8 leading-relaxed">
          La page que vous recherchez n'existe pas ou a été déplacée. Choisissez l'un des outils ci-dessous ou retournez à l'accueil.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 select-none bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-primary shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        {/* Direct links to tools */}
        <div className="border-t border-neutral-100 pt-6">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            Nos outils disponibles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-neutral-600">
            <Link to="/attestation-de-travail" className="hover:text-primary transition-colors">
              Attestation de travail
            </Link>
            <span className="text-neutral-300">•</span>
            <Link to="/autorisation-parentale" className="hover:text-primary transition-colors">
              Autorisation parentale
            </Link>
            <span className="text-neutral-300">•</span>
            <Link to="/photo-cin" className="hover:text-primary transition-colors">
              Photo CIN
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NotFoundPage
