import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectHeader from "./components/Createproject/ProjectHeader";
import ProjectForm from "./components/Createproject/ProjectForm";
import ProjectImageUploader from "./components/Createproject/ProjectImageUploader";
import ProjectActions from "./components/Createproject/ProjectActions";
import CreateProject from "./pages/Createprojectpages/Createproject";
/*import Layout from "./components/Profil/Layout";
/*import ProfilVisiteur from "./pages/Profilpages/ProfilVisiteur.jsx";
import DesactiverVisiteur from "./pages/Profilpages/DesactiverVisiteur.jsx";
import ProfilExpert from "./pages/Profilpages/ProfilExpert.jsx";
import SauvExpert from "./pages/Profilpages/SauvExpert.jsx";
import InfoProjets from "./pages/Profilpages/InfoProjets.jsx";
import DesactiverExpert from "./pages/Profilpages/DesactiverExpert.jsx";
import ProjetsExpert from "./pages/Profilpages/ProjetsExpert.jsx";
import SauVisiteur from "./pages/Profilpages/SauVisiteur.jsx";
import ProfilAdmin from "./pages/Profilpages/ProfilAdmin.jsx";
import SauvAdmin from "./pages/Profilpages/SauvAdmin.jsx";
import NouveauMotdepasse from "./pages/Profilpages/NouveauMotdepasse.jsx";*/

function App() {
  return (
   /* <BrowserRouter>
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
    </BrowserRouter>*/
    /*<>
      <ProjectHeader /> 
      <ProjectForm /> 
      <ProjectImageUploader /> 
      <ProjectActions /> 
    </> */
     
    <>
    <CreateProject />
    </>
    
   
  
  );
}

export default App; 


