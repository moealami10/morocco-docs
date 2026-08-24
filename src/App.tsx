import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import HomePageAr from './pages/HomePageAr'
import AttestationDeTravailPage from './pages/AttestationDeTravailPage'
import AutorisationParentalePage from './pages/AutorisationParentalePage'
import PhotoCINPage from './pages/PhotoCINPage'
import PhotoCINPageAr from './pages/PhotoCINPageAr'
import GuidesIndexPage from './pages/GuidesIndexPage'
import GuidesIndexPageAr from './pages/GuidesIndexPageAr'
import GuideCasierJudiciairePage from './pages/GuideCasierJudiciairePage'
import GuideCasierJudiciairePageAr from './pages/GuideCasierJudiciairePageAr'
import GuideActeDeNaissancePage from './pages/GuideActeDeNaissancePage'
import GuideActeDeNaissancePageAr from './pages/GuideActeDeNaissancePageAr'
import ObjectifsIndexPage from './pages/ObjectifsIndexPage'
import ObjectifsIndexPageAr from './pages/ObjectifsIndexPageAr'
import GoalConstituerDossierEmbauchePage from './pages/GoalConstituerDossierEmbauchePage'
import GoalConstituerDossierEmbauchePageAr from './pages/GoalConstituerDossierEmbauchePageAr'
import GoalVoyagerEnfantPage from './pages/GoalVoyagerEnfantPage'
import GoalVoyagerEnfantPageAr from './pages/GoalVoyagerEnfantPageAr'
import GoalRenouvelerCinPage from './pages/GoalRenouvelerCinPage'
import GoalRenouvelerCinPageAr from './pages/GoalRenouvelerCinPageAr'
import TrustPage from './pages/TrustPage'
import TrustPageAr from './pages/TrustPageAr'
import DocumentLibraryPage from './pages/DocumentLibraryPage'
import NotFoundPage from './pages/NotFoundPage'
import { ErrorBoundary } from './components/ErrorBoundary'

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ar" element={<HomePageAr />} />
              <Route path="/confidentialite" element={<TrustPage />} />
              <Route path="/ar/confidentialite" element={<TrustPageAr />} />
              <Route path="/attestation-de-travail" element={<AttestationDeTravailPage />} />
              <Route path="/ar/attestation-de-travail" element={<AttestationDeTravailPage />} />
              <Route path="/autorisation-parentale" element={<AutorisationParentalePage />} />
              <Route path="/ar/autorisation-parentale" element={<AutorisationParentalePage />} />
              <Route path="/photo-cin" element={<PhotoCINPage />} />
              <Route path="/ar/photo-cin" element={<PhotoCINPageAr />} />
              <Route path="/guides" element={<GuidesIndexPage />} />
              <Route path="/ar/guides" element={<GuidesIndexPageAr />} />
              <Route path="/guides/casier-judiciaire" element={<GuideCasierJudiciairePage />} />
              <Route path="/ar/guides/casier-judiciaire" element={<GuideCasierJudiciairePageAr />} />
              <Route path="/guides/acte-de-naissance" element={<GuideActeDeNaissancePage />} />
              <Route path="/ar/guides/acte-de-naissance" element={<GuideActeDeNaissancePageAr />} />
              <Route path="/objectifs" element={<ObjectifsIndexPage />} />
              <Route path="/ar/objectifs" element={<ObjectifsIndexPageAr />} />
              <Route path="/formulaires-administratifs" element={<DocumentLibraryPage />} />
              <Route path="/ar/formulaires-administratifs" element={<DocumentLibraryPage />} />
              <Route path="/objectifs/constituer-dossier-embauche" element={<GoalConstituerDossierEmbauchePage />} />
              <Route path="/ar/objectifs/constituer-dossier-embauche" element={<GoalConstituerDossierEmbauchePageAr />} />
              <Route path="/objectifs/voyager-avec-mon-enfant" element={<GoalVoyagerEnfantPage />} />
              <Route path="/ar/objectifs/voyager-avec-mon-enfant" element={<GoalVoyagerEnfantPageAr />} />
              <Route path="/objectifs/renouveler-ma-cin" element={<GoalRenouvelerCinPage />} />
              <Route path="/ar/objectifs/renouveler-ma-cin" element={<GoalRenouvelerCinPageAr />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Analytics />
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App