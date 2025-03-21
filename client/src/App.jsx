import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/expert" element={<h1>Inscrire expert </h1>} />
        <Route path="/signup/visiteur" element={<h1>Inscrire visiteur </h1>} />
        <Route path="/login" element={<h1>Se connecter</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;