import React, { useState, useEffect, useCallback } from 'react'
import { PageHeading, Card, Button, FormField, Input } from '../components/ui'
import { Seo } from '../components/Seo'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Document {
  id: string
  title: string
  description: string
  category: string
  agency: string
  complexity: 'Simple' | 'Moderate' | 'Complex'
  versionDate: string
  htmlContent: string
  pdfUrl: string
  tags: string[]
}

interface DocumentFilters {
  searchTerm: string
  category: string
}

// ---------------------------------------------------------------------------
// Document Data (Based on actual Moroccan administrative documents)
// ---------------------------------------------------------------------------

const DOCUMENTS_DATA: Document[] = [
  // Marriage Documents
{
      id: 'mariage-etranger',
      title: 'Demande de mariage avec étranger',
      description: 'Autorisation nécessaire pour un mariage entre un Marocain et un ressortissant étranger',
      category: 'Mariage',
      agency: 'Ministère de la Justice',
      complexity: 'Moderate',
      versionDate: '2025',
      htmlContent: '/public/documents/mariage/demande-mariage-etranger.html',
      pdfUrl: '/public/documents/mariage/demande-mariage-etranger.pdf', // Would be generated from HTML
      tags: ['mariage', 'étranger', 'autorisation', 'union']
    },
{
      id: 'extrait-acte-mariage',
      title: 'Demande d\'extrait d\'acte de mariage',
      description: 'Demande d\'extrait d\'acte de mariage pour des procédures administratives',
      category: 'Mariage',
      agency: 'Ministère de la Justice',
      complexity: 'Simple',
      versionDate: '2025',
      htmlContent: '/public/documents/mariage/extrait-acte-mariage.html', // Would exist if created
      pdfUrl: '/public/documents/mariage/extrait-acte-mariage.pdf',
      tags: ['mariage', 'extrait', 'acte', 'certificat']
    },
  
  // Civil Status Documents
{
      id: 'changement-nom',
      title: 'Demande de changement de nom',
      description: 'Formulaire pour demander un changement de nom légal au Maroc',
      category: 'État civil',
      agency: 'Ministère de la Justice',
      complexity: 'Moderate',
      versionDate: '2025',
      htmlContent: '/public/documents/etat-civil/changement-nom.html',
      pdfUrl: '/public/documents/etat-civil/changement-nom.pdf',
      tags: ['nom', 'identité', 'état civil', 'changement']
    },
{
      id: 'acte-naissance',
      title: 'Demande d\'extrait d\'acte de naissance',
      description: 'Demande d\'extrait d\'acte de naissance pour divers besoins administratifs',
      category: 'État civil',
      agency: 'Ministère de la Justice',
      complexity: 'Simple',
      versionDate: '2025',
      htmlContent: '/public/documents/etat-civil/acte-naissance.html',
      pdfUrl: '/public/documents/etat-civil/acte-naissance.pdf',
      tags: ['naissance', 'acte', 'certificat', 'état civil']
    },
  
  // Contract Documents
{
      id: 'contrat-location',
      title: 'Contrat de location d\'habitation',
      description: 'Modèle de contrat de location pour un logement résidentiel au Maroc',
      category: 'Contrats',
      agency: 'Ministère de l Habitat',
      complexity: 'Moderate',
      versionDate: '2025',
      htmlContent: '/public/documents/contrats/contrat-location.html',
      pdfUrl: '/public/documents/contrats/contrat-location.pdf',
      tags: ['location', 'logement', 'bail', 'contrat']
    },
{
      id: 'contrat-travail',
      title: 'Contrat de travail à durée indéterminée',
      description: 'Modèle de contrat de travail CDI conforme au droit du travail marocain',
      category: 'Contrats',
      agency: 'Ministère du Travail',
      complexity: 'Moderate',
      versionDate: '2025',
      htmlContent: '/public/documents/contrats/contrat-travail.html',
      pdfUrl: '/public/documents/contrats/contrat-travail.pdf',
      tags: ['travail', 'emploi', 'CDI', 'contrat']
    },
  
  // Attestation Documents
{
      id: 'attestation-travail',
      title: 'Demande d\'attestation de travail',
      description: 'Demande de lettre de vérification d\'emploi',
      category: 'Attestations',
      agency: 'Employeur',
      complexity: 'Simple',
      versionDate: '2025',
      htmlContent: '/public/documents/attestations/attestation-travail.html',
      pdfUrl: '/public/documents/attestations/attestation-travail.pdf',
      tags: ['attestation', 'travail', 'emploi', 'certificat']
    }
]

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const DocumentLibraryPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
const [filters, setFilters] = useState<DocumentFilters>({
  searchTerm: '',
  category: ''
})
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize documents data
  useEffect(() => {
    setDocuments(DOCUMENTS_DATA)
    setFilteredDocuments(DOCUMENTS_DATA)
    setIsLoading(false)
  }, [])

// Filter documents based on search criteria
   const applyFilters = useCallback(() => {
     if (!documents.length) return

     const filtered = documents.filter(doc => {
       const matchesSearch =
         filters.searchTerm.trim() === '' ||
         doc.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
         doc.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
         doc.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))

       const matchesCategory =
         filters.category === '' || doc.category === filters.category

       return matchesSearch && matchesCategory
     })

     setFilteredDocuments(filtered)
   }, [documents, filters])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

// Get unique categories for filter dropdowns
   const categories = Array.from(new Set(documents.map(doc => doc.category)))

  // Handle document selection for preview
  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc)
  }

  // Handle closing preview
  const handlePreviewClose = () => {
    setSelectedDocument(null)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      <Seo
        title="Bibliothèque de modèles de documents administratifs — Kaghit"
        description="Accédez gratuitement à une bibliothèque de modèles de documents administratifs marocains : demandes de mariage, contrats de location, attestations et autres formulaires pour vos démarches."
        canonicalUrl="https://kaghit.com/formulaires-administratifs"
      />
      <PageHeading
        title="Parcourir et télécharger des modèles de documents administratifs"
        description="Évitez les déplacements chez le notaire - Téléchargez vos formulaires administratifs marocains"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        }
      />

      {/* Search and filters */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Rechercher et filtrer
        </h2>

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
           <FormField id="search" label="Rechercher par mot-clé">
             <Input
               id="search"
               type="text"
               value={filters.searchTerm}
               onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
               placeholder="Tapez votre recherche (ex: mariage, location, travail)..."
               aria-describedby="search-hint"
             />
             <p id="search-hint" className="text-xs text-neutral-500 mt-1">
               Recherche dans le titre, la description et les tags
             </p>
           </FormField>

           <FormField id="category-filter" label="Catégorie">
             <select
               id="category-filter"
               value={filters.category}
               onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
               className="w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
             >
               <option value="">Toutes les catégories</option>
               {categories.map(category => (
                 <option key={category} value={category}>
                   {category}
                 </option>
               ))}
             </select>
           </FormField>
         </div>

        {/* Show filters info when active */}
{(filters.searchTerm !== '' || filters.category !== '') && (
           <div className="mt-3 flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-xs text-blue-900">
             <svg className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
             </svg>
             Filtres actifs :{" "}
             {(filters.searchTerm !== '' && <span className="font-medium">« {filters.searchTerm} »</span>)}
             {(filters.category !== '' && <span className="font-medium ml-2">{filters.category}</span>)}
             <button
               onClick={() => setFilters({ searchTerm: '', category: '' })}
               className="ml-auto text-xs underline text-blue-600 hover:text-blue-800"
             >
               Effacer
             </button>
           </div>
         )}
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-neutral-500">Chargement de la bibliothèque de documents...</p>
        </div>
      )}

      {/* Documents grid */}
      {!isLoading && filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">
            Aucun document ne correspond à vos filtres. Essayez de modifier votre recherche.
          </p>
        </div>
      )}

      {!isLoading && filteredDocuments.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="flex flex-col">
              <DocumentCard
                key={doc.id}
                document={doc}
                onSelect={handleDocumentSelect}
              />
            </div>
          ))}
        </div>
      )}

      {/* Document preview modal */}
      {selectedDocument && (
        <DocumentViewerModal
          document={selectedDocument}
          onClose={handlePreviewClose}
        />
      )}

      {/* Informational section */}
      {!isLoading && (
        <section className="mt-16 border-t border-neutral-200 pt-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            À propos de notre bibliothèque de documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Modèles à titre informatif seulement
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Les documents disponibles dans cette bibliothèque sont des modèles à titre informatif.
                Ils ne constituent pas des documents officiels et doivent être validés par les autorités
                compétentes avant toute utilisation officielle.
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Confidentialité garantie
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Votre utilisation de cette bibliothèque est entièrement confidentielle. Aucune donnée
                n'est stockée ou transmise à nos serveurs. Tout le traitement se fait dans votre
                navigateur uniquement.
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Gratuit et sans inscription
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                L'accès à cette bibliothèque est totalement gratuit et ne nécessite aucune création
                de compte ou abonnement. Notre objectif est de simplifier vos démarches administratives
                sans frais supplémentaires.
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Mise à jour régulière
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Nous nous efforçons de maintenir cette bibliothèque à jour avec les derniers modèles
                disponibles. Toutefois, nous vous recommandons de toujours vérifier la version officielle
                auprès de l'administration concernée avant utilisation.
              </p>
            </Card>
          </div>
        </section>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Document Card Component
// ---------------------------------------------------------------------------

interface DocumentCardProps {
  document: Document
  onSelect: (doc: Document) => void
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(document)}
      className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <Card
        aria-label={`Aperçu du document : ${document.title}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary flex-shrink-0">
              {/* Document icon based on category */}
              {document.category.includes('Mariage') && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 18.184A8.004 8.004 0 0 0 15.942 22L12 18.252l-3.942 3.748A8.004 8.004 0 0 0 2 18.184V6a8.004 8.004 0 0 1 13.557-6.726l1.423.423a2 2 0 0 1 2.02 0l1.423-.423A8.004 8.004 0 0 1 22 6z"></path>
                  <line x1="2" y1="9" x2="22" y2="9"></line>
                  <line x1="2" y1="13" x2="22" y2="13"></line>
                </svg>
              )}
              {!document.category.includes('Mariage') && document.category.includes('Contrat') && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="7" x2="22" y2="7"></line>
                  <line x1="2" y1="11" x2="22" y2="11"></line>
                </svg>
              )}
              {!document.category.includes('Mariage') && !document.category.includes('Contrat') && document.category.includes('État civil') && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              )}
              {!document.category.includes('Mariage') && !document.category.includes('Contrat') && !document.category.includes('État civil') && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">{document.title}</h3>
              <p className="text-xs text-neutral-500 line-clamp-2">{document.description}</p>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-neutral-100">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-neutral-50 text-neutral-700 rounded-full">
                {document.category}
              </span>
              {document.agency && (
                <span className="px-2 py-0.5 text-xs font-medium bg-neutral-50 text-neutral-700 rounded-full">
                  {document.agency}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {document.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 text-xs font-medium bg-primary-50 text-white rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <Button
              variant="secondary"
              className="w-full text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(document);
              }}
            >
              Voir
            </Button>

                      </div>
        </div>
      </Card>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Document Viewer Modal
// ---------------------------------------------------------------------------

interface DocumentViewerModalProps {
  document: Document
  onClose: () => void
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-neutral-200 transition-colors duration-150"
          aria-label="Fermer l'aperçu"
        >
          <svg className="w-4 h-4" stroke="currentColor" viewBox="0 0 20 20" fill="none" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Document content */}
        <div className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900">{document.title}</h1>
            <span className="px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-800 rounded-full">
              {document.category}
            </span>
          </div>

          <p className="text-neutral-600 mb-6">{document.description}</p>

{/* Document metadata */}
           <div className="grid grid-cols-1 gap-4 mb-6 text-sm text-neutral-600">
             <div className="flex flex-col">
               <span className="font-medium">Autorité émettrice :</span>
               <span>{document.agency}</span>
             </div>
             <div className="flex flex-col">
               <span className="font-medium">Version :</span>
               <span>{document.versionDate}</span>
             </div>
           </div>

          {/* Download buttons */}
          <div className="mt-6 pt-4 border-t border-neutral-100">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                className="w-full text-sm sm:w-auto"
                onClick={() => {
                  console.log('Opening PDF:', document.pdfUrl);
                  window.open(document.pdfUrl, '_blank')
                }}
              >
                Voir le document
              </Button>
              <a
                href={document.pdfUrl}
                download={`${document.title.replace(/\s+/g, '_')}.pdf`}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50 hover:ring-neutral-300 active:bg-neutral-100 focus-visible:outline-primary w-full text-sm sm:w-auto"
              >
                Télécharger en PDF
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-4 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 leading-relaxed">
              <strong>Important :</strong> Ce document est fourni à titre informatif seulement.
              Il ne constitue pas un document officiel et doit être validé par les autorités
              compétentes avant toute utilisation officielle. Vous devez vérifier que vous
              utilisez la version la plus récente directement auprès de l administration concernée.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentLibraryPage
