import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AttestationDeTravailPage from './pages/AttestationDeTravailPage'
import AutorisationParentalePage from './pages/AutorisationParentalePage'
import PhotoCINPage from './pages/PhotoCINPage'
import NotFoundPage from './pages/NotFoundPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/attestation-de-travail" element={<AttestationDeTravailPage />} />
          <Route path="/autorisation-parentale" element={<AutorisationParentalePage />} />
          <Route path="/photo-cin" element={<PhotoCINPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
