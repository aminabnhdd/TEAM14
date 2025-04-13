import InsEx from "./pages/page inscription/PageInsEx";
import InsVs from "./pages/page inscription/PageInsVs"
import Notif from "./pages/notifications/Notif";
import Con from "./pages/page connexion/PageConnexion";
import ReiniMotdps from "./pages/page connexion/PageReinit";
import { Route,Routes } from "react-router-dom";
import LsProjets from "./pages/page admin/ListProjets";
import ListUtil from "./pages/page admin/ListUtil";
import NotifAdmin from "./pages/page admin/NotifAdmin";

function App() {
  return (
    <div>
      {/* <Notif/> */}
      
        <Routes>  
          <Route path="/con" element={<Con />} />
          <Route path="/" element={<h1>I hate racisme</h1>}/>
          <Route path="/InsEx" element={<InsEx/>}/>
          <Route path="/InsVs" element={<InsVs/>}/> 
          <Route path="/ReiniMotdps" element={<ReiniMotdps/>}/>
        

          {/* <Route path="/" element={<h1>Main page</h1>}/>
          <Route path="/lsProjet" element={<LsProjets/>}/>
          <Route path="/lsUtil" element={<ListUtil/>}/>
          <Route path="/NotifAdmin" element={<NotifAdmin/>}/> */}


        </Routes>
      
      

    </div>
  );
}

export default App;
