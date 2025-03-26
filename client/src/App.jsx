import InsEx from "./pages/page inscription/PageInsEx";
import InsVs from "./pages/page inscription/PageInsVs"
import Notif from "./pages/notifications/Notif";
import Con from "./pages/page connexion/PageConnexion";
import ReiniMotdps from "./pages/page connexion/PageReinit";
import { BrowserRouter as  Router,Route,Routes } from "react-router-dom";
import LsProjets from "./pages/page admin/ListProjets";
import ListUtil from "./pages/page admin/ListUtil";

function App() {
  return (
    <div>
      {/* <Notif/> */}
      {/* <Router>
        <Routes>
          <Route path="/con" element={<Con />} />
          <Route path="/" element={<h1>I hate racisme</h1>}/>
          <Route path="/InsEx" element={<InsEx/>}/>
          <Route path="/InsVs" element={<InsVs/>}/>
          <Route path="/ReiniMotdps" element={<ReiniMotdps/>}/>
        </Routes>
      </Router> */}
      {/* <LsProjets/> */}
      <ListUtil/>

    </div>
  );
}

export default App;
