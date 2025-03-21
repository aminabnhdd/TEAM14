import { useState } from "react";
import Navbar from "../../components/LandingPage/Navbar";
import Footer from "../../components/LandingPage/Footer";
import Features from "../../components/LandingPage/Features";
import FAQ from "../../components/LandingPage/Faq/FAQ";
import HeroSection from "../../components/LandingPage/HeroSection";
import InsChoice from "../../components/Riadh/InsChoice";
import "../../pagesStyles/LandingPage/LandingPage.css";

function LandingPage() {
  const [popUp, setPopUp] = useState(false);

  const openPopUp = () => {
    console.log("Opening Pop-Up"); // Debugging log
    setPopUp(true);
  };

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
    <InsChoice popUp={popUp} setPopUp={setPopUp} />
    </>
  );
}

export default LandingPage;