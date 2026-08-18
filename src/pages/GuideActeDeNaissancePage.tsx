import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const GuideActeDeNaissancePage: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Comment obtenir un acte de naissance en ligne au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vous pouvez effectuer votre demande sur le portail Watiqa (watiqa.ma) pour recevoir votre acte de naissance par courrier recommandé à domicile sans vous déplacer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le délai légal pour déclarer la naissance d\'un enfant au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La déclaration de naissance doit être effectuée dans les 30 jours suivant l\'accouchement au bureau d\'état civil du lieu de naissance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment les Marocains résidant à l\'étranger (MRE) peuvent-ils obtenir un acte de naissance ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les MRE peuvent adresser leur demande directement auprès du consulat du Royaume du Maroc dans leur pays de résidence.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la durée de validité d\'un extrait d\'acte de naissance au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La durée varie selon les administrations : certaines exigent un acte datant de moins de 3 mois, tandis que d\'autres acceptent un exemplaire plus ancien.',
        },
      },
    ],
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Acte de naissance Maroc — Démarche complète 2026 | Kaghit"
        description="Comment obtenir un extrait d'acte de naissance au Maroc : portail Watiqa, démarche en commune, nouveau-né et MRE. Guide pratique 2026."
        canonicalUrl="https://kaghit.com/guides/acte-de-naissance"
      />

      {/* Structured data FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-500" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-neutral-900 transition-colors">Accueil</Link>
        <span>/</span>
        <Link to="/guides" className="hover:text-neutral-900 transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium">Acte de naissance</span>
      </nav>

      <PageHeading
        title="Acte de naissance au Maroc : comment l'obtenir (démarche 2026)"
        description="Toutes les options pour obtenir rapidement votre extrait d'acte de naissance : en commune, en ligne ou depuis l'étranger."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <circle cx="10" cy="13" r="2" />
            <path d="M10 11v-2" />
          </svg>
        }
      />

      <Card className="p-6 sm:p-10">
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <p className="text-base text-neutral-800 font-medium leading-relaxed">
            Que ce soit pour inscrire un enfant à l'école, ouvrir un compte bancaire, se marier ou refaire une pièce d'identité, l'acte de naissance revient sans cesse dans les dossiers administratifs marocains. Voici comment l'obtenir sans perdre de temps.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Si vous connaissez votre lieu de naissance
            </h2>
            <p>
              Deux options : vous déplacer directement au bureau d'état civil de votre commune de naissance, ou passer par le portail Watiqa (<a href="https://www.watiqa.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">watiqa.ma</a>), qui permet de recevoir le document par courrier à votre adresse sans avoir à vous déplacer. Particulièrement pratique si vous êtes né dans une autre ville que celle où vous vivez aujourd'hui.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Pour un nouveau-né
            </h2>
            <p>
              La déclaration de naissance doit être faite dans les 30 jours suivant l'accouchement, au bureau d'état civil du lieu de naissance. Le père ou la mère peut s'en charger ; à défaut, un proche peut aussi le faire. Il faut se présenter avec l'avis de naissance délivré par le médecin ou la sage-femme. C'est cette déclaration qui permettra ensuite d'obtenir tous les extraits d'acte de naissance dont l'enfant aura besoin au fil de sa vie.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Marocains résidant à l'étranger (MRE)
            </h2>
            <p>
              Vous pouvez faire la demande auprès du consulat marocain de votre pays de résidence, sans avoir besoin de revenir au Maroc.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Une chose à vérifier avant de vous déplacer
            </h2>
            <p>
              Certaines administrations demandent un acte de naissance de moins de 3 mois, d'autres acceptent une version plus ancienne. Renseignez-vous auprès de l'organisme qui vous le réclame avant de faire la démarche, pour éviter d'avoir à recommencer.
            </p>
          </section>

          <p className="pt-2">
            Si votre acte de naissance est demandé dans le cadre d'un dossier de passeport ou de CIN, pensez aussi à vérifier que votre photo d'identité respecte le format officiel marocain (35x45mm).
          </p>
        </article>

        {/* ── Callout Box linking to Photo CIN tool ── */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              📷
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Besoin aussi d'une photo d'identité aux normes ?
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                Recadrez et formatez gratuitement votre photo au standard officiel 35×45 mm.
              </p>
            </div>
          </div>

          <Button as="a" href="/photo-cin" variant="primary" className="shrink-0 text-xs">
            Formater sa photo →
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default GuideActeDeNaissancePage
