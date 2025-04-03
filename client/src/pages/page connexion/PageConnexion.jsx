


import Connect from "../../components/popUps/Connexion";


import { useState } from "react";


function Con () {
   const [pop,setPop] = useState(false)
   const [popLien,setPopLien] = useState(false)
    return (
        <div className="main-page-one">
          <div className="back-home">
          </div>
          <div className="img-container-one">
            <div className="pres1">
              <p className="pri">ATHAR, une </p>
              <p className="pri">communauté dédiée au</p>
              <p className="pre5">patrimoine architectural algérien.</p>
            </div>
          </div>
          <div className="form-container-one">
            <Connect mdpPopUp={() => setPop(true)}/>

          </div>
          <div className="centerpop">
          </div>
        </div>
      );

}

export default Con