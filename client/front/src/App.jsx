import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilVisiteur from "./pages/ProfilVisiteur.jsx";
import DesactiverVisiteur from "./pages/DesactiverVisiteur.jsx";
import ProfilExpert from "./pages/ProfilExpert.jsx";
import SauvExpert from "./pages/SauvExpert.jsx";
import InfoProjets from "./pages/InfoProjets.jsx";
import DesactiverExpert from "./pages/DesactiverExpert.jsx";
import ProjetsExpert from "./pages/ProjetsExpert.jsx";
import SauVisiteur from "./pages/SauVisiteur.jsx";
import ProfilAdmin from "./pages/ProfilAdmin.jsx";
import SauvAdmin from "./pages/SauvAdmin.jsx";
import NouveauMotdepasse from "./pages/NouveauMotdepasse.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/profil-visiteur" element={<Layout><ProfilVisiteur /></Layout>} />
        <Route path="/sauvegarde-visiteur" element={<Layout><SauVisiteur /></Layout>} />
        <Route path="/desactiver-visiteur" element={<Layout><DesactiverVisiteur /></Layout>} />
        <Route path="/profil-expert" element={<Layout><ProfilExpert /></Layout>} />
        <Route path="/sauvegarde-expert" element={<Layout><SauvExpert /></Layout>} />
        <Route path="/info-projets" element={<Layout><InfoProjets /></Layout>} />
        <Route path="/desactiver-expert" element={<Layout><DesactiverExpert /></Layout>} />
        <Route path="/projets-expert" element={<Layout><ProjetsExpert /></Layout>} />
        <Route path="/profil-admin" element={<Layout><ProfilAdmin /></Layout>} />
        <Route path="/sauvegarde-admin" element={<Layout><SauvAdmin /></Layout>} />
        <Route path="/mot-de-passe" element={<Layout><NouveauMotdepasse /></Layout>} />
        <Route path="/" element={<Layout><ProfilVisiteur /></Layout>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App; 


