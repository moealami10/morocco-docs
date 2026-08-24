import React from 'react'
import { PageHeading, Card } from '../components/ui'
import { Seo } from '../components/Seo'

const TrustPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo
        title="Confidentialité et sécurité — Vos données restent privées | Kaghit"
        description="Découvrez comment Kaghit protège votre vie privée grâce à son architecture 100% client-side, sans serveur ni base de données. Vos données ne quittent jamais votre navigateur."
        canonicalUrl="https://kaghit.com/confidentialite"
      />

      <PageHeading
        title="Vos données restent privées"
        description="Comprenez comment Kaghit garantit la confidentialité et la sécurité de vos informations personnelles grâce à son architecture entièrement côté client."
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zm5 9v-3a1 1 0 00-1-1H4a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1z"/>
            <path d="M12 9a4 4 0 100 8 4 4 0 000-8z"/>
          </svg>
        }
      />

      {/* Architecture Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Architecture 100% client-side
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-4">
          Kaghit fonctionne entièrement dans votre navigateur web. Aucune donnée n'est jamais envoyée à un serveur, stockée dans une base de donnée, ou traitée par un tiers.
        </p>

        <div className="space-y-3 text-sm text-neutral-800 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            Aucune inscription requise
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            Aucune donnée personnelle collectée
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            Traitement 100% local dans votre navigateur
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            Aucune transmission de vos informations à des serveurs externes
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" aria-hidden="true" />
            Vos données restent exclusivement sur votre appareil
          </div>
        </div>
      </Card>

      {/* Data Handling Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Comment vos données sont gérées
        </h2>

        <p className="text-neutral-600 leading-relaxed mb-4">
          Lorsque vous remplissez un formulaire sur Kaghit, vos informations sont stockées temporairement dans la mémoire de votre navigateur uniquement pour vous permettre de prévisualiser et générer votre document.
        </p>

        <div className="space-y-3 text-sm text-neutral-800 font-medium">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            Stockage temporaire en sessionStorage (effacé lorsque vous fermez l'onglet ou le navigateur)
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            Les données sont disponibles uniquement pendant votre session de navigation actuelle
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            Aucun historique n'est conservé après fermeture de l'onglet
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
            Le générateur de PDF fonctionne entièrement dans votre navigateur grâce à pdf-lib
          </div>
        </div>

        <p className="mt-4 text-xs text-neutral-500 leading-relaxed bg-neutral-50 px-3 py-2 rounded">
          <strong>Remarque :</strong> Nous utilisons @vercel/analytics pour collecter des données anonymes et agrégées sur l'utilisation générale du site (pages vues, taux de rebond, etc.). Aucune donnée personnelle ou information saisie dans les formulaires n'est collectée ou transmise.
        </p>
      </Card>

      {/* Security Guarantees Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Nos garanties de sécurité
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                1
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">Pas de serveur, pas de base de données</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Kaghit n'a aucun serveur backend ni base de données. Cette architecture élimine entièrement les risques de fuite de données ou de piratage liés au stockage centralisé d'informations sensibles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                2
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">Traitement entièrement local</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Tous les calculs, la génération de prévisualisation et la création du PDF sont effectués directement dans votre navigateur. Rien ne quitte votre appareil pendant que vous utilisez nos outils.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">Effacement automatique des données</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Vos données sont stockées en sessionStorage, ce qui signifie qu'elles sont automatiquement effacées lorsque vous fermez l'onglet ou le navigateur, laissant aucune trace persistante sur votre appareil.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                4
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">Transparence totale</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Le code source de Kaghit est disponible publiquement sur GitHub, permettant à quiconque de vérifier que nos affirmations concernant la confidentialité sont exactes.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* What We Don't Do Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Ce que nous ne faisons pas
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">Vendre ou partager vos données personnelles avec des tiers</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">Conserver vos informations après fermeture de l'onglet</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">Utiliser des cookies de suivi ou des traceurs publicitaires</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">Exiger la création d'un compte ou la connexion à un service</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">✕</span>
            <span className="flex-1 text-neutral-600">Envoyer vos données à des serveurs pour traitement ou stockage</span>
          </div>
        </div>
      </Card>

      {/* Verification Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Comment vérifier nos affirmations
        </h2>

        <p className="text-neutral-600 leading-relaxed mb-4">
          Vous pouvez vérifier vous-même que Kaghit respecte ses engagements de confidentialité :
        </p>

        <div className="space-y-3 text-sm text-neutral-800">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              Ouvrez les outils de développement de votre navigateur (F12 ou clic droit → "Inspecter") et allez dans l'onglet "Application" → "Stockage" → "Session Storage" pour voir les données temporaires stockées pendant votre utilisation.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              Dans le même onglet d'outils de développement, allez dans l'onglet "Réseau" et observez qu'aucune requête n'est envoyée à des domaines externes lorsque vous remplissez et générez un document (à l'exception des requêtes vers kaghit.com lui-même et vers les CDN pour charger les ressources nécessaires au fonctionnement du site).
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              Consultez le code source public de Kaghit sur GitHub pour vérifier qu'il n'existe aucune logique d'envoi de données vers des serveurs externes.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              Notez que lorsque vous générez un PDF, celui-ci est créé directement dans votre navigateur et proposé au téléchargement - aucun appel à un service externe n'est nécessaire pour cette opération.
            </span>
          </div>
        </div>
      </Card>

      {/* Limitations Section */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Limitations et responsabilités
        </h2>

        <p className="text-neutral-600 leading-relaxed mb-4">
          Bien que Kaghit mette tout en œuvre pour protéger votre vie privée, il est important de comprendre certaines limitations :
        </p>

        <div className="space-y-3 text-sm text-neutral-600">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              Kaghit génère des modèles de documents à usage pratique. Pour qu'un document ait une valeur juridique ufficiale, il doit être imprimé, signé par les parties concernées et, le cas échéant, revêtu du cachet officiel ou fait l'objet d'une légalisation selon les exigences de l'administration marocaine.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              Nous ne fournissons pas de conseils juridiques ou fiscaux. Les informations fournies sur le site le sont à titre informatif uniquement et ne remplacent pas la consultation d'un professionnel qualifié pour des questions spécifiques à votre situation.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-primary-500">•</span>
            <span className="flex-1">
              Bien que nous fassions référence à des sources officielles marocaines pour garantir l'exactitude de nos informations, nous ne sommes pas affiliés au gouvernement marocain ni à aucune administration publique.
            </span>
          </div>
        </div>
      </Card>

      {/* Trust Badge Section */}
      <div className="text-center pt-8 border-t border-neutral-200">
        <p className="text-xs text-neutral-500">
          Construire la confiance par la transparence et l'architecture respectueuse de la vie privée
        </p>
      </div>
    </div>
  )
}

export default TrustPage