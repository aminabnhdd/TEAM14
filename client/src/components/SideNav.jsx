import '../ComponentsStyles/SideNav.css'
import {FaUserCog, FaFolderOpen, FaCompass, FaStar, FaEdit, FaBell } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import img from "../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png"
import { useState, useEffect, useContext } from "react";
import AuthContext from '../helpers/AuthContext';


function SideNav(){
    const { authState,setAuthState } = useContext(AuthContext);

    const isExpert = authState.role === "Expert";
    const isAdmin = authState.role === "Admin";


    const navigate = useNavigate()
  


    const goToDecouvrir = () => {
        if(isAdmin){
            navigate("/notifications-admin")

        }else{
        navigate("/discover") // hna tdir la page li rak hab troh liha
        }
    }
    const goToFavoris = () => {
        navigate("/favoris") // hna tdir la page li rak hab troh liha
        }

    const goToMesProjets = () => {
        navigate("/mesprojets") // hna tdir la page li rak hab troh liha
        }

    const goToNotifExpert = () => {
        navigate("/notifications") // hna tdir la page li rak hab troh liha
        }
    const goToHelpMain = () => {
        navigate("/HelpMain") // hna tdir la page li rak hab troh liha
        }

    const goToLsProjets = () => {
    navigate("/projets") // hna tdir la page li rak hab troh liha
    }
    const goToLsUtil = () => {
    navigate("/list-utilisateurs")
    }
    const goToNotifAdmin = () => {
    navigate("/notifications-admin")
    }
    useEffect(()=>{
        console.log("isExpert : ",isExpert," // isAdmin : ",isAdmin);
    },[]);
    

    return(
        <div className="parent-sideNav">
        <div className="side-nav">
                    <div className="upperIcons1  ">
                      <div className='flex justify-center '> 
                      <img src={img} alt="hh"  className="ico1" onClick={goToDecouvrir} />

                      </div>
                        
                    
                    
                    <div className="icons1">

                    {!isExpert && !isAdmin && <>
                        <div className='nav-link'>
                            <span className="tooltip">Découvrir</span>
                            <FaCompass className="iconus" onClick={goToDecouvrir} />
                        </div>

                        <div className='nav-link'>
                            <span className="tooltip">Favoris</span>
                            <FaStar className="iconus" onClick={goToFavoris}/>
                        </div>

 
                        </>}


                    {isExpert && <>
                        <div className='nav-link'>
                            <span className="tooltip">Découvrir</span>
                            <FaCompass className="iconus" onClick={goToDecouvrir} />
                        </div>

                        <div className='nav-link'>
                            <span className="tooltip">Favoris</span>
                            <FaStar className="iconus" onClick={goToFavoris}/>
                        </div>

                         <div className='nav-link'>
                            <span className="tooltip">Mes projets</span>
                            <FaEdit className="iconus"  onClick={goToMesProjets}/>
                            </div>

                        <div className='nav-link'>
                            <span className="tooltip">Notifications</span>
                            <FaBell className="iconus"  onClick={goToNotifExpert}/>
                            </div>
                        </>}

                        {isAdmin && <>


                            <div className='nav-link'>
                            <span className="tooltip">Gestion projets</span>
                            <FaFolderOpen className="iconus" onClick={goToLsProjets} />
                            </div>

                            <div className='nav-link'>
                            <span className="tooltip">Gestion utilisateurs</span>
                            <FaUserCog className="iconus" onClick={goToLsUtil}/>
                            </div>

                            <div className='nav-link'>
                            <span className="tooltip">Notifications</span>
                            <FaBell className="iconus"  onClick={goToNotifAdmin}/>
                            </div>
 
</>}

                        



                        


                    
                    </div>
        
                    </div>
                    <div className="lowerIcon1">
                    <span className="tooltip">Aide</span>

                    <FaQuestionCircle className="lastIcon" onClick={goToHelpMain} />
                    </div>
                    
                </div>
                </div>
        
        
    )
};

export default SideNav;