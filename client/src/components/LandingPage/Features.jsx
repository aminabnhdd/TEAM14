import React from "react";
import FeatureCard from "./FeatureCard";
import "../../componentsStyles/LandingPage/Features.css";


import patrimoineIcon from "../../assets/carte.png";
import documenterIcon from "../../assets/projects.png";
import editerIcon from "../../assets/edit.png";
import collaborerIcon from "../../assets/collaboration.png";
import iaIcon from "../../assets/ai.png";

const features = [
  {
    icon: patrimoineIcon,
    title: "Explorez le Patrimoine",
    description: "Découvrez l'histoire des monuments et bâtiments emblématiques.",
  },
  {
    icon: documenterIcon,
    title: "Créez & Documentez",
    description: "Initiez des projets et enrichissez leur fiche avec des analyses détaillées.",
  },
  {
    icon: editerIcon,
    title: "Éditez & Enrichissez",
    description: "Ajoutez textes, images et annotations pour documenter chaque site.",
  },
  {
    icon: collaborerIcon,
    title: "Collaborez & Partagez",
    description: "Travaillez ensemble pour enrichir les connaissances du patrimoine.",
  },
  {
    icon: iaIcon,
    title: "IA",
    description: "Annotez images et plans avec l'IA, et explorez avec un chatbot.",
  },
];

const Features = () => {
    return (
      <section id="features" className="features">
        <br/>
        <br/> 
        <br/>
        <br/>
<br/>
        <br/>
        <br/>
        <h2>Découvrez Nos Fonctionnalités</h2>
   

        <div className="features-grid">
          <div className="features-row">
            {features.slice(0, 3).map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
  
          {/* Second row with 2 items, centered */}
          <div className="features-row centered">
            {features.slice(3, 5).map((feature, index) => (
              <FeatureCard
                key={index + 3}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </section>
    );
  };

export default Features;