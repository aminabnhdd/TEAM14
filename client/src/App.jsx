/*import React from "react";
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

import React from "react";
import CreateProject from "./pages/Createprojectpages/Createproject";
import ModifyProject from "./pages/Createprojectpages/ModifyProject";

function App() {
  return (
    <div>
      {/* <CreateProject /> */}
      {/* <ModifyProject /> */}
    </div>
  );
}
export default App;

 