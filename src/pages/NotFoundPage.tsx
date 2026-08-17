import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 sm:py-32 text-center">
      {/* Large 404 */}
      <p className="text-8xl font-black text-neutral-100 select-none" aria-hidden="true">
        404
      </p>

      <div className="-mt-6">
        <h1 className="text-2xl font-bold text-neutral-900">Page introuvable</h1>
        <p className="mt-3 text-neutral-500">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button as="a" href="/" variant="primary">
            Retour à l'accueil
          </Button>
          <Link
            to="/attestation-de-travail"
            className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
          >
            Voir les outils →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
