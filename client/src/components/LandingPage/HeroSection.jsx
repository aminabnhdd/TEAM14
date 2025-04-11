import React from "react";
import "../../componentsStyles/LandingPage/HeroSection.css";

const HeroSection = ({ openPopUp }) => {  // Accept openPopUp function as a prop
  return (
    <section id="acceuil" className="hero-section">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="hero-content">
        <h1>Explorez et immortalisez le patrimoine algérien</h1>
        <p>
          ATHAR vise à préserver le patrimoine architectural algérien en offrant
          une plateforme collaborative
        </p>
        <button className="bigbutton" onClick={openPopUp}>S'inscrire</button> {/* Open Pop-up */}
      </div>

      <div className="whole-gallery">
        <div id="first" className="image-gallery">
          <div className="placeholder img1 bg1"></div>
          <div className="placeholder img2 bg2"></div>
          <div className="placeholder img3 bg3"></div>
          <div className="placeholder img4 bg4"></div>
          <div className="placeholder img5 bg5"></div>
        </div>
        <div className="outside-second">
          <div id="second" className="image-gallery">
            <div className="placeholder img1 bg6"></div>
            <div className="placeholder img2 bg7"></div>
            <div className="placeholder img3 bg8"></div>
            <div className="placeholder img4 bg9"></div>
            <div className="placeholder img5 bg10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;