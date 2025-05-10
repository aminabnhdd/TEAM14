// Expert Signup Page
// - Allows the user to enter personal and professional information
// - Sends a validation request to the admin for approval


import image from "../../assets/Group 38.png";
import image2 from "../../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";
import "../../PagesStyles/Pages inscriptions styles/InsEx.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import NewInsEx from "../../components/Inscriptions/NewInsEx";
import NewInsEx2 from "../../components/Inscriptions/NewInsEx2";
import NewInsEx3 from "../../components/Inscriptions/NewInsEx3";
import { AnimatePresence } from "framer-motion"; // ⬅️ import AnimatePresence
import "../../ComponentsStyles/Insctiptions styles/NewInsEx.css";

function InsEx() {
  const [step, setStep] = useState(1);
  const [swipeDirection, setSwipeDirection] = useState("");
  const navigate = useNavigate();
  const goToStep = (stepNumber, direction) => {
    setSwipeDirection(direction);
    setStep(stepNumber);
  };

  const handleClick2 = () => {
    navigate('/');
  };

  return (
    <div className="main-page-two">
      <div className="back-home">
        <img src={image2} className="backHome-logo-two"onClick={handleClick2} />
        <div className="pres2">
          <p className="pri">ATHAR, une </p>
          <p className="pri">communauté dédiée au</p>
          <p className="pre4">patrimoine architectural algérien.</p>
        </div>
      </div>

      <div className="img-container-two">
        <img className="main-img-two" src={image} alt="img" />
      </div>

      <div className="form-container-two">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <NewInsEx
              key="step1"
              fn={() => goToStep(2, "left")}
              swipeDirection={swipeDirection}
            />
          )}
          {step === 2 && (
            <NewInsEx2
              key="step2"
              prevPopUp={() => goToStep(1, "left")}
              fn={() => goToStep(3, "right")}
              swipeDirection={swipeDirection}
            />
          )}
          {step === 3 && (
            <NewInsEx3
              key="step3"
              prevPopUp2={() => goToStep(2, "left")}
              swipeDirection={swipeDirection}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default InsEx;
