import EditorEditable from './pages/editeur/editorEditable.jsx';
import EditorNonEditable from './pages/editeur/editorNonEditable.jsx';
import Gallerie from './components/editeur/gallerie.jsx';
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
          <Route path="/reinitialisation/mdp" element={<ReiniMotdps/>}/>
          <Route path="/signup/expert" element={<InsEx/>} />
          <Route path="/signup/visiteur" element={<InsVs/>} />
          <Route path="/editeur/editable/67cde422d70a4df898a9a9d8" element={<EditorEditable  />} />
          <Route path="/editeur/non-editable/67cde422d70a4df898a9a9d8" element={<EditorNonEditable />} />
          <Route path="/gallerie" element={<Gallerie/>}/>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
      {/* <LsProjets/> */}
      {/* <ListUtil/> */}
      {/* <NotifAdmin/> */}
      
    </div>
    </AuthContext.Provider>
  );
}


export default App;

