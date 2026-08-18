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
          text: 'Vous pouvez effectuer votre demande sur le portail Watiqa (watiqa.ma), le guichet électronique officiel développé avec le ministère de l\'Intérieur, l\'ADD et Barid Al-Maghrib. Le document vous est envoyé par courrier recommandé.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le délai légal pour déclarer la naissance d\'un enfant au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La déclaration de naissance doit être faite dans les 30 jours suivant l\'accouchement au bureau d\'état civil du lieu de naissance (délai d\'un an pour les MRE). Passé ce délai, un jugement du tribunal est requis et une amende de 300 à 1 200 DH s\'applique.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment les Marocains résidant à l\'étranger (MRE) peuvent-ils obtenir un acte de naissance ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les MRE peuvent commander leur document via Watiqa si Barid Al-Maghrib dessert leur pays, ou s\'adresser directement au consulat du Royaume du Maroc de leur pays de résidence.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la durée de validité d\'un extrait d\'acte de naissance au Maroc ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Certaines administrations exigent un acte de naissance datant de moins de 3 mois, d\'autres acceptent une version plus ancienne. Renseignez-vous auprès de l\'organisme destinataire.',
        },
      },
    ],
  }

  const steps = [
    {
      num: 1,
      label: 'Choisir : sur place ou en ligne (Watiqa)',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.5 10a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" clipRule="evenodd" />
          <path d="M10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      ),
    },
    {
      num: 2,
      label: 'Fournir vos informations et payer',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5v9A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 4h-15zM3 6.75A.75.75 0 013.75 6h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm.75 4.25a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      num: 3,
      label: 'Recevoir le document par courrier recommandé',
      icon: (
        <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h13A1.5 1.5 0 0118 3.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 16.5v-13zM3.5 3h13a.5.5 0 01.5.5v1.652l-7 4.148-7-4.148V3.5a.5.5 0 01.5-.5zM3 6.442v10.058a.5.5 0 00.5.5h13a.5.5 0 00.5-.5V6.442l-6.568 3.892a.75.75 0 01-.864 0L3 6.442z" clipRule="evenodd" />
        </svg>
      ),
    },
  ]

  const SOURCES = [
    {
      name: 'Agence de Développement du Digital',
      url: 'https://add.gov.ma',
      detail: 'add.gov.ma/watiqa (guichet électronique watiqa.ma)',
      verifiedDate: '18 août 2026',
    },
    {
      name: 'Le Matin.ma',
      url: 'https://lematin.ma',
      detail: '"Lancement officiel du portail watiqa.ma"',
      verifiedDate: '18 août 2026',
    },
    {
      name: 'demarchesmaroc.com',
      url: 'https://demarchesmaroc.com',
      detail: '"Obtenir un acte de naissance au Maroc"',
      verifiedDate: '18 août 2026',
    },
    {
      name: 'Loi n° 37-99 relative à l\'état civil',
      url: undefined,
      detail: 'et son décret d\'application n° 2-99-665 (articles 15-17)',
      verifiedDate: '18 août 2026',
    },
  ]

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

      <Card className="p-6 sm:p-10 mb-8">
        {/* ── Step visual timeline (3 steps) ── */}
        <div className="mb-8 rounded-xl bg-neutral-50 border border-neutral-100 p-5">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            Aperçu de la démarche en 3 étapes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-neutral-100 shadow-xs">
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
            Que ce soit pour inscrire un enfant à l'école, ouvrir un compte bancaire, se marier ou refaire une pièce d'identité, l'acte de naissance revient sans cesse dans les dossiers administratifs marocains. Voici comment l'obtenir sans perdre de temps.
          </p>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Si vous connaissez votre lieu de naissance
            </h2>
            <p>
              Deux options s'offrent à vous. La première : vous déplacer directement au bureau d'état civil de votre commune de naissance. La seconde, plus pratique si vous vivez loin de votre ville natale : passer par Watiqa (<a href="https://www.watiqa.ma" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary-600">watiqa.ma</a>), le guichet électronique officiel développé avec le ministère de l'Intérieur, l'Agence de Développement du Digital et Barid Al-Maghrib. Vous créez un compte, sélectionnez le type d'acte souhaité (extrait avec ou sans filiation, ou copie intégrale), renseignez vos informations, et payez en ligne. Le document est ensuite envoyé par courrier recommandé à l'adresse de votre choix — comptez environ 24h de traitement côté bureau d'état civil, puis jusqu'à 5 jours d'acheminement postal.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Pour un nouveau-né
            </h2>
            <p>
              La déclaration de naissance doit être faite dans les 30 jours suivant l'accouchement, au bureau d'état civil du lieu de naissance (ce délai passe à un an pour les Marocains résidant à l'étranger). Le père ou la mère peut s'en charger ; à défaut, un proche parent peut aussi le faire, selon un ordre de priorité fixé par la loi. Il faut se présenter avec l'avis de naissance délivré par le médecin ou la sage-femme. Passé ce délai, la naissance ne peut plus être inscrite qu'après un jugement du tribunal de première instance du lieu de naissance, et une amende de retard de 300 à 1 200 DH s'applique.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Marocains résidant à l'étranger (MRE)
            </h2>
            <p>
              Watiqa couvre aussi les MRE : vous pouvez faire votre demande depuis l'étranger, à condition que Barid Al-Maghrib livre bien vers votre pays de résidence — un point à vérifier avant de lancer la commande. Sinon, le consulat marocain de votre pays de résidence reste une option classique.
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

          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <span className="text-primary">💡</span> Exemple concret
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Fatima-Zahra est née à Fès mais vit à Rabat depuis ses études. Pour inscrire son fils à l'école primaire à la rentrée, l'établissement lui demande un extrait d'acte de naissance de l'enfant datant de moins de 3 mois. Plutôt que de faire l'aller-retour à Fès un week-end, elle passe commande sur Watiqa un mardi soir depuis son canapé, paie en ligne, et reçoit le document par courrier recommandé chez elle le lundi suivant — largement à temps pour le dossier d'inscription.
            </p>
          </section>

          <p className="pt-2">
            Si votre acte de naissance est demandé dans le cadre d'un dossier de passeport ou de CIN, pensez aussi à vérifier que votre photo d'identité respecte le format officiel marocain (35x45mm).
          </p>
        </article>

        {/* ── Callout Box linking to Photo CIN tool ── */}
        <div className="mt-8 rounded-xl bg-primary-50/60 border border-primary-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm select-none">
              📷
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Besoin aussi d'une photo d'identité aux normes ?
              </p>
              <p className="text-xs text-neutral-600 mt-0.5">
                Recadrez la vôtre gratuitement au format 35×45 mm.
              </p>
            </div>
          </div>

          <Button as="a" href="/photo-cin" variant="primary" className="shrink-0 text-xs">
            Redimensionner sa photo →
          </Button>
        </div>

        {/* ── Sources section (styled distinctly & subtly like footer) ── */}
        <div className="mt-10 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-500 mb-2">Sources officielles &amp; références :</p>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
            {SOURCES.map((src, i) => (
              <li key={i}>
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-neutral-700 hover:text-primary transition-colors underline"
                  >
                    {src.name}
                  </a>
                ) : (
                  <strong className="font-bold text-neutral-700">{src.name}</strong>
                )}{' '}
                — {src.detail} · <span className="italic text-neutral-400">Vérifié : {src.verifiedDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default GuideActeDeNaissancePage
