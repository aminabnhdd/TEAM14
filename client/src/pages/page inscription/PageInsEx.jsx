import image from "../../assets/Group 38.png";
import image2 from "../../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";
import "../../PagesStyles/Pages inscriptions styles/InsEx.css";
import { useState } from "react";

import NewInsEx from "../../components/Inscriptions/NewInsEx";
import NewInsEx2 from "../../components/Inscriptions/NewInsEx2";
import NewInsEx3 from "../../components/Inscriptions/NewInsEx3";
import "../../ComponentsStyles/Insctiptions styles/NewInsEx.css";

function InsEx() {
  const [pop1, setPop1] = useState(true);
  const [pop2, setPop2] = useState(false);
  const [pop3, setPop3] = useState(false);

  const nextPopUp = () => {
    setPop1(false);
    setPop2(true);
  };
  const nextPopUp2 = () => {
    setPop2(false);
    setPop3(true);
  };
  const previousPopUp = () => {
    setPop1(true);
    setPop2(false);
  };
  const previousPopUp2 = () => {
    setPop3(false);
    setPop2(true);
  };

  return (
    <div className="main-page-two">
      <div className="back-home">
        <img src={image2} className="backHome-logo-two" />
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
        {pop1 && <NewInsEx fn={nextPopUp} />}
        {pop2 && <NewInsEx2 prevPopUp={previousPopUp} fn={nextPopUp2} />}
        {pop3 && <NewInsEx3 prevPopUp2={previousPopUp2} />}
      </div>
    </div>
  );
}

export default InsEx;
