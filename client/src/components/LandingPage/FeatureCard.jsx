
// card for one functionality in the landing page

import React from "react";
import "../../componentsStyles/LandingPage/FeatureCard.css";


const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="icon-container">
        <img src={icon} alt={title} className="feature-icon" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;