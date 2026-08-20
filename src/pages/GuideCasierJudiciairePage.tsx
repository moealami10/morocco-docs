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
          text: 'Rendez-vous sur casierjudiciaire.justice.gov.ma. Remplissez le formulaire de demande en ligne, puis choisissez votre mode de retrait : en tribunal, à l\'administration centrale de Rabat, par courrier sécurisé (25 DH au Maroc, 40 DH à l\'étranger) ou par e-mail si votre téléphone est compatible NFC avec la nouvelle CIN biométrique.',
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
          text: 'Comptez environ 10 DH pour le casier judiciaire (timbre fiscal) et 30 DH pour la fiche anthropométrique, plus les frais de livraison si expédié par courrier. Les deux documents ont une validité de 3 mois.',
        },
      },
      {
        '@type': 'Question',
        name: 'Une autre personne peut-elle demander mon casier judiciaire à ma place ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, mais uniquement avec une procuration spéciale légalisée et accompagnée de la pièce d\'identité du mandataire.',
        },
      },
    ],
  }

  const steps = [
    {
      num: 1,
      label: 'Se connecter sur le portail officiel',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.81 10.5h6.44a.75.75 0 000-1.5H6.81l1.47-1.22z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 2,
      label: 'Remplir le formulaire de demande',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 3,
      label: 'Choisir un mode de réception',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M3 3.5A1.5 1.5 0 014.5 2h11A1.5 1.5 0 0117 3.5v13a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zM4.5 3.5v13h11v-13h-11z" />
          <path fillRule="evenodd" d="M6.5 6.5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 4,
      label: 'Récupérer le document',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      ),
    },
  ]

  const SOURCES = [
    {
      name: 'Ministère de la Justice — portail officiel casierjudiciaire.justice.gov.ma',
      url: 'https://casierjudiciaire.justice.gov.ma',
      detail: 'Demande de casier judiciaire en ligne (bulletin n°3)',
      verifiedDate: '18 août 2026',
    },
    {
      name: 'demarchesmaroc.com',
      url: 'https://demarchesmaroc.com',
      detail: '"Le casier judiciaire : demande au Maroc et à l\'étranger"',
      verifiedDate: '18 août 2026',
    },
    {
      name: 'avocatrabat.com',
      url: 'https://avocatrabat.com',
      detail: '"Casier judiciaire marocain pour les étrangers"',
      verifiedDate: '18 août 2026',
    },
  ]

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

      <Card className="p-6 sm:p-10 mb-8">
        {/* ── Step visual timeline (4 steps) ── */}
        <div className="mb-8 rounded-xl bg-neutral-50 border border-neutral-100 p-5">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            Aperçu de la démarche en 4 étapes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-neutral-100 shadow-xs">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {s.num}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    {s.icon}
                    <span className="text-[11px] font-semibold text-neutral-400">Étape {s.num}</span>
                  </div>
                  <p className="text-xs font-medium text-neutral-900 leading-snug">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Article Content (exact text, formatted with subheadings) ── */}
        <article className="prose prose-neutral max-w-none space-y-6 text-sm text-neutral-700 leading-relaxed">
          <p className="text-base text-neutral-800 font-medium leading-relaxed">
            Le casier judiciaire revient dans énormément de dossiers administratifs marocains — un nouvel emploi, une demande de visa, une inscription universitaire, un dossier de mariage. La bonne nouvelle : le service est entièrement digitalisé depuis plusieurs années maintenant, et l'obtenir prend quelques minutes en ligne plutôt qu'une matinée au tribunal.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Faire la demande en ligne
            </h2>
            <p>
              Rendez-vous sur <a href="https://casierjudiciaire.justice.gov.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">casierjudiciaire.justice.gov.ma</a>, le portail officiel du ministère de la Justice. Après avoir accepté les conditions d'utilisation et indiqué votre lieu de naissance (au Maroc ou à l'étranger), vous remplissez le formulaire de demande, vérifiez les informations saisies, puis choisissez comment récupérer votre document : au tribunal de première instance de votre choix, à l'administration centrale du ministère à Rabat, par courrier sécurisé (25 DH de frais de livraison au Maroc, 40 DH à l'étranger), ou directement par e-mail si votre téléphone est compatible NFC et que vous possédez la nouvelle carte d'identité biométrique. Une application mobile existe aussi pour faire la demande depuis un smartphone.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Quel document demander : casier judiciaire ou fiche anthropométrique ?
            </h2>
            <p>
              Les deux attestent de votre situation judiciaire, mais elles ne viennent pas de la même administration. Le casier judiciaire — officiellement le "bulletin n°3" — est délivré par le ministère de la Justice et concerne aussi bien les Marocains que les étrangers. La fiche anthropométrique, elle, vient de la DGSN (la police) et reste réservée aux citoyens marocains. En cas de doute sur celui qu'on vous demande, mieux vaut appeler directement l'organisme concerné plutôt que de se tromper de document.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Prix et validité
            </h2>
            <p>
              Comptez environ 10 DH pour le casier judiciaire (via un timbre fiscal) et 30 DH pour la fiche anthropométrique, plus les frais de livraison si vous choisissez la remise par courrier. Les deux documents ont une validité de 3 mois seulement — ne les demandez donc pas trop en avance par rapport à votre dossier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Si la demande est faite par quelqu'un d'autre à votre place
            </h2>
            <p>
              C'est possible, mais uniquement avec une procuration spéciale légalisée, accompagnée de la pièce d'identité du mandataire. Sans ça, l'administration refusera la demande : le bulletin n°3 est en principe remis en main propre à la personne concernée.
            </p>
          </section>

          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="text-primary">💡</span> Exemple concret
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Karim vient de décrocher un poste dans une entreprise à Casablanca. Son futur employeur lui demande un casier judiciaire datant de moins de 3 mois avant de signer le contrat. Un lundi matin, il se connecte sur casierjudiciaire.justice.gov.ma depuis son téléphone, remplit le formulaire en quelques minutes, et choisit de récupérer le document au tribunal de première instance le plus proche de chez lui plutôt que d'attendre un courrier. Deux jours plus tard, il a son document en main — largement dans les temps pour signer son contrat vendredi.
            </p>
          </section>

          <p className="pt-2">
            Une fois votre document en main, pensez à vérifier si le même dossier vous demande aussi une attestation de travail — beaucoup de demandes d'emploi ou de crédit exigent les deux en même temps.
          </p>
        </article>

        {/* ── Callout Box linking to Attestation de Travail tool ── */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none">
              K
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Besoin d'une attestation de travail pour le même dossier ?
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                Générez votre attestation au format standard en PDF gratuitement et instantanément.
              </p>
            </div>
          </div>

          <Button as="a" href="/attestation-de-travail" variant="primary" className="shrink-0 text-xs">
            Générer gratuitement →
          </Button>
        </div>

        {/* ── Sources section (styled distinctly & subtly like footer) ── */}
        <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-500 mb-2">Sources officielles &amp; références :</p>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
            {SOURCES.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
                >
                  {src.name}
                </a>{' '}
                — {src.detail} · <span className="italic text-neutral-400">Vérifié : {src.verifiedDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default GuideCasierJudiciairePage
