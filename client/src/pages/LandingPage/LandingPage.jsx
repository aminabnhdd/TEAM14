
// The Landing Page of the website


import { useState } from "react";
import Navbar from "../../components/LandingPage/Navbar";
import Footer from "../../components/LandingPage/Footer";
import Features from "../../components/LandingPage/Features";
import FAQ from "../../components/LandingPage/Faq/FAQ";
import HeroSection from "../../components/LandingPage/HeroSection";
import InsChoice from "../../components/LandingPage/InsChoice";
import "../../pagesStyles/LandingPage/LandingPage.css";
import { useLocation } from "react-router-dom";

function LandingPage() {
  const { state } = useLocation(); 
  const [popUp, setPopUp] = useState(state?.popUp || false);


  // Open sign up popup
  const openPopUp = () => {
    console.log("Opening Pop-Up"); // Debugging log
    setPopUp(true);
  };

  // Close sign up popup
  const closePopUp = () => {
    console.log("Closing Pop-Up"); // Debugging log
    setPopUp(false);
  };

  return (
    <>
    <div className={`app-container ${popUp ? "dark-background" : ""}`}>
      <Navbar openPopUp={openPopUp} />
      <main className="content">
        <HeroSection openPopUp={openPopUp} />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
    <InsChoice popUp={popUp} setPopUp={closePopUp} />
    </>
  );
}

export default LandingPage;