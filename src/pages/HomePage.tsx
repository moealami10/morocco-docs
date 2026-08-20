import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { Seo } from '../components/Seo'

// ---------------------------------------------------------------------------
// Tool card data
// ---------------------------------------------------------------------------
interface Tool {
  to: string
  title: string
  description: string
  icon: React.ReactNode
  id: string
}

const TOOLS: Tool[] = [
  {
    id: 'card-attestation',
    to: '/attestation-de-travail',
    title: 'Attestation de travail',
    description:
      'Générez un modèle d\'attestation de travail personnalisable au nom de votre employé en quelques secondes — prêt à imprimer et à signer.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'card-autorisation',
    to: '/autorisation-parentale',
    title: 'Autorisation parentale',
    description:
      'Créez une autorisation parentale pour un mineur — voyage, sortie scolaire ou démarche administrative.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'card-photo-cin',
    to: '/photo-cin',
    title: 'Photo CIN',
    description:
      'Redimensionnez et formatez votre photo au format standard (35×45 mm, fond blanc) directement depuis votre navigateur.',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------
const HomePage: React.FC = () => {
  return (
    <>
      <Seo
        title="Générateur de documents administratifs marocains gratuit | Kaghit"
        description="Générez vos documents administratifs marocains en quelques clics — attestation de travail, autorisation parentale, photo CIN — gratuit, rapide, sans inscription."
        canonicalUrl="https://kaghit.com/"
        lang="fr"
        alternates={[
          { hrefLang: 'fr', href: 'https://kaghit.com/' },
          { hrefLang: 'ar', href: 'https://kaghit.com/ar' },
        ]}
      />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white border-b border-neutral-100">
        {/* Subtle background accent */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 50%, #C1272D 0%, transparent 60%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary mb-6 border border-primary-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Gratuit · Rapide · Sans inscription
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl max-w-3xl leading-[1.1]">
            Vos documents{' '}
            <span className="text-primary">administratifs marocains</span>{' '}
            en quelques clics
          </h1>

          <p className="mt-6 text-lg text-neutral-500 max-w-2xl leading-relaxed">
            Générez vos documents administratifs marocains en quelques clics — gratuit, rapide,
            sans inscription. Attestation de travail, autorisation parentale, photo CIN&nbsp;: l'essentiel
            en un seul endroit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#outils" variant="primary">
              Voir les outils
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
              </svg>
            </Button>
            <Button as="a" href="/attestation-de-travail" variant="secondary">
              Commencer maintenant
            </Button>
          </div>

          {/* Stats strip */}
          <dl className="mt-12 flex flex-wrap gap-6 sm:gap-10">
            {[
              { value: '100%', label: 'Gratuit' },
              { value: '0', label: 'Inscription requise' },
              { value: '3', label: 'Outils disponibles' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-neutral-500">{stat.label}</dt>
                <dd className="text-2xl font-bold text-neutral-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Tools grid ── */}
      <section
        id="outils"
        aria-labelledby="outils-heading"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="mb-10">
          <h2
            id="outils-heading"
            className="text-2xl font-bold text-neutral-900 sm:text-3xl"
          >
            Nos outils
          </h2>
          <p className="mt-2 text-neutral-500">
            Choisissez le document que vous souhaitez générer.
          </p>
          <div className="mt-3 h-0.5 w-12 rounded-full bg-primary" aria-hidden="true" />
        </div>

        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Liste des outils disponibles"
        >
          {TOOLS.map((tool) => (
            <li key={tool.to}>
              <Link
                to={tool.to}
                id={tool.id}
                className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                aria-label={tool.title}
              >
                <Card
                  as="article"
                  className="h-full flex flex-col gap-4 transition-all duration-200 group-hover:shadow-card-hover group-hover:-translate-y-0.5 group-hover:border-neutral-200"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-150">
                      {tool.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* CTA arrow */}
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                    Générer
                    <svg
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── How it works strip ── */}
      <section
        aria-labelledby="comment-heading"
        className="border-t border-b border-neutral-100 bg-neutral-50"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <h2
            id="comment-heading"
            className="text-xl font-bold text-neutral-900 sm:text-2xl mb-8 text-center"
          >
            Comment ça fonctionne&nbsp;?
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3" role="list">
            {[
              {
                step: '01',
                title: 'Remplissez le formulaire',
                body: 'Saisissez vos informations directement dans le formulaire en ligne — aucun compte requis.',
              },
              {
                step: '02',
                title: 'Prévisualisez le document',
                body: 'Le document est généré instantanément dans votre navigateur. Vérifiez chaque information.',
              },
              {
                step: '03',
                title: 'Téléchargez le PDF',
                body: 'Exportez le document en PDF prêt à imprimer, signer et tamponner selon les besoins.',
              },
            ].map((item) => (
              <li
                key={item.step}
                className="flex flex-col gap-3 bg-white rounded-xl p-6 shadow-card border border-neutral-100"
              >
                <span className="text-3xl font-black text-primary-100 leading-none select-none">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Card className="p-6 sm:p-10 bg-neutral-50/80 border-neutral-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              Vos données restent privées.
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-neutral-800 font-medium mb-8">
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
              Aucune inscription.
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
              Les documents sont générés directement dans votre navigateur.
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
              Vos informations personnelles ne sont pas envoyées à nos serveurs pour générer les documents.
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-white border border-neutral-200/80 text-xs text-neutral-600 leading-relaxed">
            Kaghit n'est pas un service gouvernemental. Nous vous aidons à préparer et comprendre vos démarches administratives, et nous indiquons toujours nos sources officielles.
          </div>
        </Card>
      </section>
    </>
  )
}

export default HomePage
