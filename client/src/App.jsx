
import InsEx from "./pages/page inscription/PageInsEx";
import InsVs from "./pages/page inscription/PageInsVs"
import Notif from "./pages/notifications/Notif";
import Con from "./pages/page connexion/PageConnexion";
import AuthContext from "./helpers/AuthContext";
import { useState } from "react";
import ReiniMotdps from "./pages/page connexion/PageReinit";
import { BrowserRouter as  Router,Route,Routes } from "react-router-dom";
import LsProjets from "./pages/page admin/ListProjets";
import ListUtil from "./pages/page admin/ListUtil";
import NotifAdmin from "./pages/page admin/NotifAdmin";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreateProject from "./pages/Createprojectpages/Createproject";
import ModifyProject from "./pages/Createprojectpages/ModifyProject.jsx";
import MyProjects from "./pages/MyProjectspages/MyProjects.jsx";
import RestoreProjects from "./pages/MyProjectspages/RestoreProjects.jsx";
import EditorEditable from './pages/editeur/editorEditable.jsx';
import EditorNonEditable from './pages/editeur/editorNonEditable.jsx';
import Gallerie from './components/editeur/gallerie.jsx';
import Visualisation from './pages/visualisation/visualisation.jsx';

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    role:"",
    accessToken: "",
  });
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>

    <div>
        <Router>
        <Routes>
          <Route path="/ihateracism" element={<h1>I hate racisme</h1>}/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/connexion" element={<Con />} />
          <Route path="/notifications" element={<Notif/>} />
          <Route path="/create-projet" element= {<CreateProject/>} />
          <Route path="/modifier-projet/:projetId" element= {<ModifyProject/>} />
          <Route path="/reinitialisation/mdp" element={<ReiniMotdps/>}/>
          <Route path="/signup/expert" element={<InsEx/>} />
          <Route path="/signup/visiteur" element={<InsVs/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/mesprojets" element={<MyProjects />} />
          <Route path="/restoreprojects" element={<RestoreProjects />} />
          <Route path="/editeur/editable/:sectionId" element={<EditorEditable  />} />
          <Route path="/gallerie" element={<Gallerie/>}/>
          {/* Route for annotatins */}
          <Route path="/editeur/annoter/:sectionId" element={<EditorNonEditable />} />
          <Route path="/visualisation/:projetId" element={<Visualisation />} />


        </Routes>
      </Router>
      
    </div>
    </AuthContext.Provider>)}
    export default App;

/*
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProjectsProvider } from "./context/ProjectsContext.jsx";
import MyProjects from "./pages/MyProjectspages/MyProjects.jsx";
import RestoreProjects from "./pages/MyProjectspages/RestoreProjects.jsx";

function App() {
  return (
    <ProjectsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/myprojects" />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/restoreprojects" element={<RestoreProjects />} />
        </Routes>
      </Router>
    </ProjectsProvider>
  );
}

export default App;
*/



/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModifierExpert from "./pages/Profilpages/ModifierExpert.jsx";
import AfficherExpert from "./pages/Profilpages/AfficherExpert.jsx";
import DesactiverExpert from "./pages/Profilpages/DesactiverExpert.jsx";
import ProjetsExpert from "./pages/Profilpages/ProjetsExpert.jsx";
import SaveExpert from "./pages/Profilpages/SaveExpert.jsx";
import ModifierVisiteur from "./pages/Profilpages/ModifierVisiteur.jsx";
import DesactiverVisiteur from "./pages/Profilpages/DesactiverVisiteur.jsx";
import SaveVisiteur from "./pages/Profilpages/SaveVisiteur.jsx";
import ChangerMotDePasse from "./pages/Profilpages/ChangerMotdePasse.jsx";
import ProjetsExpert2 from "./pages/Profilpages/ProjetsExpert2.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AfficherExpert />} />  
        <Route path="/afficher-expert" element={<AfficherExpert />} />
        <Route path="/modifier-expert" element={<ModifierExpert />} />
        <Route path="/projets-expert" element={<ProjetsExpert />} />
        <Route path="/desactiver-expert" element={<DesactiverExpert />} />
        <Route path="/projets-expert2" element={<ProjetsExpert2 />} />
        <Route path="/save-expert" element={<SaveExpert />} />
        <Route path="/modifier-visiteur" element={<ModifierVisiteur />} />
        <Route path="/desactiver-visiteur" element={<DesactiverVisiteur />} />
        <Route path="/save-visiteur" element={<SaveVisiteur />} />
        <Route path="/changer-mdp" element={<ChangerMotDePasse />} />
      </Routes>
    </Router>
  );
}

export default App;*/
