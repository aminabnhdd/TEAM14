import { BrowserRouter, Routes, Route } from "react-router-dom";
import Decouvrir from "./pages/Decouvrir";
import SearchBar from "./components/SearchBar/SearchBar";
import SideNav from "./components/SideNav/SideNav";
import Favoris from "./pages/Favoris";

import "./App.css"

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path="/search" element={
          <>
          <SearchBar /> 
          <SideNav />
          </>
        } />
        <Route path="/discover" element={<Decouvrir />} />

        <Route path="/favoris" element={<Favoris />} />

        
        
      </Routes>
    </BrowserRouter>

    
    
  
   </> 
  );
}

export default App; 


