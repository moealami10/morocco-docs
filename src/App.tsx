import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AttestationDeTravailPage from './pages/AttestationDeTravailPage'
import AutorisationParentalePage from './pages/AutorisationParentalePage'
import PhotoCINPage from './pages/PhotoCINPage'
import GuidesIndexPage from './pages/GuidesIndexPage'
import GuideCasierJudiciairePage from './pages/GuideCasierJudiciairePage'
import GuideActeDeNaissancePage from './pages/GuideActeDeNaissancePage'
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
              <Route path="/attestation-de-travail" element={<AttestationDeTravailPage />} />
              <Route path="/autorisation-parentale" element={<AutorisationParentalePage />} />
              <Route path="/photo-cin" element={<PhotoCINPage />} />
              <Route path="/guides" element={<GuidesIndexPage />} />
              <Route path="/guides/casier-judiciaire" element={<GuideCasierJudiciairePage />} />
              <Route path="/guides/acte-de-naissance" element={<GuideActeDeNaissancePage />} />
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
