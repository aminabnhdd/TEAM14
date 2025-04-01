import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditorEditable from './pages/editeur/editorEditable.jsx';
import EditorNonEditable from './pages/editeur/editorNonEditable.jsx';
import Gallerie from './components/editeur/gallerie.jsx';
import AuthContext from "./helpers/AuthContext.jsx";
import { useState } from "react";
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
        {/* Route for the editable editor */}
        <Route path="/editeur/editable/67cde422d70a4df898a9a9d8" element={<EditorEditable  />} />
<Route path="/gallerie" element={<Gallerie/>}/>
        {/* Route for annotatins */}
        <Route path="/editeur/non-editable/67cde422d70a4df898a9a9d8" element={<EditorNonEditable />} />

      </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;