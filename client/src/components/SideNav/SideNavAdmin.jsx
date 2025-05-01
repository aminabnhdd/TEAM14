 
import React from "react";
import '../../ComponentsStyles/SideNav.css'
import { Link } from "react-router-dom";
import { FaUserCog, FaFolderOpen, FaBell } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import img from "../../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png"

import { useNavigate } from "react-router-dom";


/*import { FaFolderCog } from "react-icons/fa6";*/
function SideNavAdmin() {
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
    const goToDecouvrir = () => {
        navigate("/discover") // hna tdir la page li rak hab troh liha
        }


    return (
        <div className="parent-sideNav">
            <div className="side-nav">
                <div className="upperIcons1">
<div className='flex justify-center '> 
                      <img src={img} alt="hh"  className="ico1" onClick={goToDecouvrir} />

                      </div>
                        

                    <div className="icons1">





                        <div className='nav-link'>
                            <span className="tooltip">Gestion projets</span>
                            <FaFolderOpen className="iconus" onClick={goToLsProjets} />
                        </div>

                        <div className='nav-link'>
                            <span className="tooltip">Gestion utilisateurs</span>
                            <FaUserCog className="iconus" onClick={goToLsUtil} />
                        </div>

                        <div className='nav-link'>
                            <span className="tooltip">Notifications</span>
                            <FaBell className="iconus" onClick={goToNotifAdmin} />
                        </div>
                    </div>
                </div>
                <div className="lowerIcon1">
                    <span className="tooltip">Aide</span>

                    <FaQuestionCircle className="lastIcon" />
                </div>

            </div>
        </div>


    )
};



export default SideNavAdmin;