import InsVs from "../components/Inscriptions/InsVs";
import InsEx from "../components/Inscriptions/InsEx";
import InsEx2 from "../components/Inscriptions/InsEx2";
import InsEx3 from "../components/Inscriptions/InsEx3";
import Connect from "../components/popUps/Connexion";
import MdpOublie from "../components/popUps/MdpOublie";
// import ReiniMdp from "../";
import InsChoice from "../components/popUps/InsChoice";
import Demande from "../components/popUps/Demande";
import LienEnv from "../components/popUps/LienEnv";

import { useState } from "react";

function Pages() {
    

    const [popUp, setPopUp] = useState(true);
    const [popIns, setPopIns] = useState(true);
    const [popInsVs, setPopInsVs] = useState(false);
    const [popInsEx, setPopInsEx] = useState(false);
    const [popInsZd, setPopInsZd] = useState(true);
    const [popInsEx2, setPopInsEx2] = useState(false);
    const [popInsEx3, setPopInsEx3] = useState(false);
    const [popUpConnect, setPopUpConnect] = useState(false);
    const [hide, setHide] = useState(true);
    const [mdp, setMdp] = useState(false);
    const [congrats, setCongrats] = useState(false);
    const [lien, setLien] = useState(false);
    

    const clickVisiteur = () => {
        setPopIns(false);
        setPopInsVs(true);
    };

    const clickExpert = () => {
        setPopIns(false);
        setPopInsEx(true);
        setPopUp(true)
        setPopInsZd(true)
    };

    const nextPopUp = () => {
        setPopInsEx2(true);
        setPopUp(false);
    };

    const prevPopUp = () => {
        setPopInsEx2(false);
        setPopUp(true);
    };

    const nextPopUp2 = () => {
        setPopInsEx3(true);
        setPopInsZd(false);
    };

    const prevPopUp2 = () => {
        setPopInsEx3(false);
        setPopInsEx2(true);
        setPopInsZd(true);
    };

    const connexionVs = () => {
        setPopUpConnect(true);
        setHide(false)
        
    };
    const connexionEx = () => {
        setPopUpConnect(true);
        setPopUp(false)
        
    };
    const connexionEx2 = () => {
        setPopUpConnect(true);
        setPopInsEx2(false)
       
    };
    const connexionEx3 = () => {
        setPopUpConnect(true);
        setPopInsEx3(false); 
       
        
    };

    const insPopUp = () => {
        setPopIns(true)
        setPopUpConnect(false)
        setPopInsVs(false)
        setHide(true)
        setPopInsEx(false)
        setPopInsEx2(false)
        setPopInsEx3(false)
    }

    function MdpPopUp () {
        setMdp(true)
    }

    function closePop () {
        setMdp(false)
    }


function cngrPopUp () {
    setCongrats(true)
}

function closeCngrPop () {
    setCongrats(false)
}

const lienEnv = () => {
    setLien(true)
}
const closeLienEnv = () => {
    setLien(false)
}

    return (
        <>

            {popIns && <InsChoice onClickExpert={clickExpert} onClickVisiteur={clickVisiteur} />}
            {popInsVs && <InsVs connexionPopUP={connexionVs} hideAll={popInsVs}  hide={hide}/>}
           
            {popUpConnect && <Connect car4={popUpConnect} inscriptionPopUp={insPopUp} mdpPopUp={MdpPopUp}/>}
            <MdpOublie  carti={mdp} fun={closePop} fun2={lienEnv} />
            
            {popInsEx && <InsEx nextPopUp={nextPopUp} car={popUp} connexionPopUp={connexionEx} hideAll1={popInsEx} />}
            {popInsEx2 && popInsZd && <InsEx2 nextPopUp2={nextPopUp2} prevPopUp={prevPopUp} car2={popInsEx2} connexionPopUP={connexionEx2} hideAll2={popInsEx2} />}
            {popInsEx3 && <InsEx3 prevPopUp2={prevPopUp2} car3={popInsEx3} connexionPopUp={connexionEx3} hideAll3={popInsEx3} funct={cngrPopUp}/>}
             <Demande popUp={congrats} foncone={closeCngrPop}/>
             <LienEnv  popUp={lien} foncone={closeLienEnv}/>
            
        </>
    );
}

export default Pages;
