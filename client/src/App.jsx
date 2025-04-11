import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditorEditable from './pages/editeur/editorEditable.jsx';
import EditorNonEditable from './pages/editeur/editorNonEditable.jsx';
import Gallerie from './components/editeur/gallerie.jsx';
import AuthContext from "./helpers/AuthContext.jsx";
import Con from "./pages/page connexion/PageConnexion";
import { useState } from "react";
import Visualisation from './pages/visualisation/visualisation.jsx';


function App() {
  const [authState, setAuthState] = useState({
    email: "",
    role:"",
    accessToken: "",
  });
  return (
<AuthContext.Provider value={{ authState, setAuthState }}>
    <Router>
      <Routes>
      <Route path="/connexion" element={<Con />} />
        {/* Route for the editable editor */}
        {/* technically el route matkounch hna mais its so i can access it normalement tkoun hadak le lien bin visualiser projet w le button editer */}
        <Route path="/editeur/editable/67cde422d70a4df898a9a9d8" element={<EditorEditable  />} />
<Route path="/gallerie" element={<Gallerie/>}/>
        {/* Route for annotatins */}
        <Route path="/editeur/non-editable/67cde422d70a4df898a9a9d8" element={<EditorNonEditable />} />
       
       
        <Route path="/visualisation" element={<Visualisation />} />

      </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;