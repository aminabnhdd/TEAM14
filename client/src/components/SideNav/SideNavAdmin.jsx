import React from "react";
import '../../ComponentsStyles/SideNav styles/SideNavAdmin.css'
import { Link } from "react-router-dom";
import {FaUserCog, FaFolderOpen, FaBell } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import img from "../../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png"

import { useNavigate } from "react-router-dom";


/*import { FaFolderCog } from "react-icons/fa6";*/
function SideNavAdmin(){
    const navigate = useNavigate()
    const goToLsProjets = () => {
    navigate("/projets")
    }
    const goToLsUtil = () => {
    navigate("/list-utilisateurs")
    }
    const goToNotifAdmin = () => {
    navigate("/notifications-admin")
    }


    return(
        
        <div className="side-nav">
            <div className="upperIcons">

            <img src={img} alt="hh"  className="ico"/>

            <div className="icons">
            <FaFolderOpen className="iconus" onClick={goToLsProjets} />
            <FaUserCog className="iconus" onClick={goToLsUtil}/>
            <FaBell className="iconus"  onClick={goToNotifAdmin}/>
            </div>

            </div>
            <div className="lowerIcon">
            <FaQuestionCircle className="iconus" />
            </div>
            
        </div>
        
        
    );
}



export default SideNavAdmin;