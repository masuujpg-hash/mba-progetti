import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HomeV2 from './pages/HomeV2';
import Studio from './pages/Studio';
import Servizi from './pages/Servizi';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Risorse from './pages/Risorse';
import Contatti from './pages/Contatti';
import SimulatorePage from './pages/SimulatorePage';
import Admin from './pages/Admin';

// New Service Sub-pages
import Gare from './pages/Gare';
import Progettazione from './pages/Progettazione';
import Rilievi from './pages/Rilievi';
import BIM from './pages/BIM';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home-v2" element={<HomeV2 />} />
          <Route path="home2" element={<HomeV2 />} />
          <Route path="studio" element={<Studio />} />
          <Route path="servizi" element={<Servizi />} />
          <Route path="servizi/gare" element={<Gare />} />
          <Route path="servizi/progettazione" element={<Progettazione />} />
          <Route path="servizi/rilievi" element={<Rilievi />} />
          <Route path="servizi/bim" element={<BIM />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:id" element={<ProjectDetail />} />
          <Route path="risorse" element={<Risorse />} />
          <Route path="simulatore" element={<SimulatorePage />} />
          <Route path="contatti" element={<Contatti />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
