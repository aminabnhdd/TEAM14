/*import React from "react";
import CreateProject from "./pages/Createprojectpages/Createproject.jsx";
import ModifyProject from "./pages/Createprojectpages/ModifyProject.jsx";
import MyProjects from "./pages/MyProjectspages/MyProjects.jsx";
import RestoreProjects from "./pages/MyProjectspages/RestoreProjects.jsx";

function App() {
  return ( 
    <>
     /* <CreateProject /> */
     /* <ModifyProject /> */
     /* {<MyProjects />} */
    /* {<RestoreProjects />} */
   /* </>
    
   
  
  );
}

export default App; */

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




 