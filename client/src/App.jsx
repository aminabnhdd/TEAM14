import InsEx from "./pages/page inscription/PageInsEx";
import InsVs from "./pages/page inscription/PageInsVs"
import Notif from "./pages/notifications/Notif";
import Con from "./pages/page connexion/PageConnexion";
import AuthContext from "./helpers/AuthContext";
import { useState } from "react";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    role:"",
    accessToken: "",
  });
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>

    <div>
      <Notif/>
      {/* <InsEx /> */}
      {/* <InsVs /> */}
      {/* <Con/> */}

    </div>
    </AuthContext.Provider>
  );
}

export default App;
