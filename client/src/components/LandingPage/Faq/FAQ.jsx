import React, { useState } from "react";
import Accordion from "./Accordion";
import "../../../componentsStyles/LandingPage/FAQ.css";


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
/*add question about validatoon*/
  return (
    <section id="faq">
    <div className="faq-container">
    <h2>Questions Fréquentes</h2>

    <Accordion
  title="Qu'est-ce que Athar et quel est son objectif principal ?"
  answer="Athar est une application web collaborative dédiée à la documentation, l'annotation et l'enrichissement des ressources architecturales du patrimoine bâti algérien. Elle permet aux spécialistes du patrimoine de collaborer et d'apporter leur expertise pour préserver et valoriser ces ressources."
  isOpen={openIndex === 2}
  onClick={() => handleAccordionClick(2)}
/>
      <Accordion 
        title="Puis-je contribuer sans être un expert ?"
        answer="Tout le monde peut explorer les ressources et apprendre sur le patrimoine architectural. Cependant, pour garantir la qualité et la fiabilité des informations, seules les contributions des experts (architectes, historiens, archéologues, etc.) sont ajoutées aux fiches."
        isOpen={openIndex === 0}
        onClick={() => handleAccordionClick(0)}
      />
      <Accordion 
        title="Est-ce que l'application est disponible en d'autres langues que le français ?"
        answer="Non, l'application est actuellement uniquement disponible en français, mais une version arabe est en cours de développement et sera bientôt disponible."
        isOpen={openIndex === 1}
        onClick={() => handleAccordionClick(1)}
      />
      <Accordion 
  title="Quelles sont les principales disciplines impliquées dans la documentation du patrimoine bâti sur Athar ?"
  answer="Athar réunit une multitude de disciplines spécialisées dans la documentation du patrimoine bâti, telles que l'architecture, l'histoire, l'archéologie et la conservation du patrimoine. Chaque acteur, qu'il soit chercheur, architecte ou historien, contribue selon son expertise pour enrichir les informations relatives aux ressources architecturales."
  isOpen={openIndex === 3}
  onClick={() => handleAccordionClick(3)}
/>
    </div>
<br></br>
    </section>
  );
};

export default FAQ;