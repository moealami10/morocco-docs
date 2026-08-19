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
import GuidesIndexPage from './pages/GuidesIndexPage'
import GuideCasierJudiciairePage from './pages/GuideCasierJudiciairePage'
import GuideActeDeNaissancePage from './pages/GuideActeDeNaissancePage'
import ObjectifsIndexPage from './pages/ObjectifsIndexPage'
import GoalTrouverEmploiPage from './pages/GoalTrouverEmploiPage'
import GoalVoyagerEnfantPage from './pages/GoalVoyagerEnfantPage'
import GoalRenouvelerCinPage from './pages/GoalRenouvelerCinPage'
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
              <Route path="/attestation-de-travail" element={<AttestationDeTravailPage />} />
              <Route path="/autorisation-parentale" element={<AutorisationParentalePage />} />
              <Route path="/photo-cin" element={<PhotoCINPage />} />
              <Route path="/guides" element={<GuidesIndexPage />} />
              <Route path="/guides/casier-judiciaire" element={<GuideCasierJudiciairePage />} />
              <Route path="/guides/acte-de-naissance" element={<GuideActeDeNaissancePage />} />
              <Route path="/objectifs" element={<ObjectifsIndexPage />} />
              <Route path="/objectifs/trouver-un-emploi" element={<GoalTrouverEmploiPage />} />
              <Route path="/objectifs/voyager-avec-mon-enfant" element={<GoalVoyagerEnfantPage />} />
              <Route path="/objectifs/renouveler-ma-cin" element={<GoalRenouvelerCinPage />} />
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
