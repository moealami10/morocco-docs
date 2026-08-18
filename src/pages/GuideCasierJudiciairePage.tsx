import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeading, Card, Button } from '../components/ui'
import { Seo } from '../components/Seo'

const GuideCasierJudiciairePage: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Comment faire la demande de casier judiciaire en ligne au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rendez-vous sur casierjudiciaire.justice.gov.ma. Vous pouvez déposer votre demande directement en ligne avec une pièce d\'identité valide (CIN pour les Marocains, passeport ou carte de séjour pour les étrangers).',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre le casier judiciaire et la fiche anthropométrique ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le casier judiciaire (bulletin n°3) est délivré par le ministère de la Justice et concerne les Marocains et étrangers. La fiche anthropométrique est délivrée par la DGSN (police) et est réservée aux citoyens marocains.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien coûte un extrait de casier judiciaire au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le casier judiciaire coûte 10 DH, la fiche anthropométrique 30 DH, plus généralement un timbre fiscal de 10 DH. Les deux documents ont une validité de 3 mois.',
        },
      },
      {
        '@type': 'Question',
        name: 'Une autre personne peut-elle demander mon casier judiciaire à ma place ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, mais uniquement munie d\'une procuration spéciale légalisée et accompagnée de sa pièce d\'identité.',
        },
      },
    ],
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Extrait de casier judiciaire Maroc 2026 — Comment l'obtenir | Kaghit"
        description="Guide complet 2026 pour obtenir son extrait de casier judiciaire (bulletin n°3) ou fiche anthropométrique au Maroc : démarche en ligne, prix (10 DH) et délais."
        canonicalUrl="https://kaghit.com/guides/casier-judiciaire"
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
        <span className="text-neutral-900 font-medium">Casier judiciaire</span>
      </nav>

      <PageHeading
        title="Comment obtenir son extrait de casier judiciaire au Maroc (2026)"
        description="Procédure étape par étape pour demander votre bulletin n°3 ou fiche anthropométrique en ligne ou en guichet."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        }
      />

      <Card className="p-6 sm:p-10">
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <p className="text-base text-neutral-800 font-medium leading-relaxed">
            Le casier judiciaire est probablement le document administratif le plus redemandé au Maroc — on vous le réclame pour un nouvel emploi, une demande de visa, une inscription universitaire, ou même un dossier de mariage. Bonne nouvelle : depuis la digitalisation du service par le ministère de la Justice, l'obtenir est devenu nettement plus rapide qu'avant.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Faire la demande en ligne
            </h2>
            <p>
              Rendez-vous sur <a href="https://casierjudiciaire.justice.gov.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">casierjudiciaire.justice.gov.ma</a>. Après avoir accepté les conditions d'utilisation et indiqué votre lieu de naissance, vous pouvez déposer votre demande directement depuis le site, sans vous déplacer. Il vous faudra une pièce d'identité valide (CIN pour les Marocains, passeport ou carte de séjour pour les étrangers résidant au Maroc) et, si vous n'avez pas encore votre CIN, un extrait d'acte de naissance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Quel document demander : casier judiciaire ou fiche anthropométrique ?
            </h2>
            <p>
              Les deux attestent de votre situation judiciaire, mais elles ne viennent pas de la même administration. Le casier judiciaire (bulletin n°3) est délivré par le ministère de la Justice et concerne aussi bien les Marocains que les étrangers. La fiche anthropométrique, elle, vient de la DGSN (la police) et reste réservée aux citoyens marocains. En cas de doute sur celui qu'on vous demande, mieux vaut appeler directement l'organisme concerné plutôt que de se tromper de document.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Prix et délai
            </h2>
            <p>
              Le casier judiciaire coûte 10 DH, la fiche anthropométrique 30 DH, plus généralement un timbre fiscal de 10 DH. Les deux ont une validité de 3 mois seulement — ne les demandez donc pas trop en avance par rapport à votre dossier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Si la demande est faite par quelqu'un d'autre à votre place
            </h2>
            <p>
              C'est possible, mais uniquement avec une procuration spéciale légalisée, accompagnée de la pièce d'identité du mandataire. Sans ça, l'administration refusera la demande.
            </p>
          </section>

          <p className="pt-2">
            Une fois votre document en main, pensez à vérifier si le même dossier vous demande aussi une attestation de travail — beaucoup de demandes d'emploi ou de crédit exigent les deux en même temps.
          </p>
        </article>

        {/* ── Callout Box linking to Attestation de Travail tool ── */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              W
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Besoin d'une attestation de travail pour le même dossier ?
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                Générez votre attestation officielle en PDF gratuitement et instantanément.
              </p>
            </div>
          </div>

          <Button as="a" href="/attestation-de-travail" variant="primary" className="shrink-0 text-xs">
            Générer l'attestation →
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default GuideCasierJudiciairePage
