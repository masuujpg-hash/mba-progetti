import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Servizi from './pages/Servizi'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import Risorse from './pages/Risorse'
import Contatti from './pages/Contatti'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="settori" element={<Servizi />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:id" element={<ProjectDetail />} />
          <Route path="risorse" element={<Risorse />} />
          <Route path="contatti" element={<Contatti />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
