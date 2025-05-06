import "../../PagesStyles/Help Styles/HelpMainStyles.css"
import SideNav from "../../components/SideNav"
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { AiOutlineNotification } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

import { BrowserRouter,Route,useNavigate } from "react-router-dom";


import SearchBarHelp from "../../components/SearchBar/SearchBarHelp"

function HelpPrnc() {
    const navigate = useNavigate()

    const goToHelpMonProfil =() => {
        navigate("/HelpMonProfil")
    }

    const goToHelpNotif =() => {
        navigate("/HelpNotif")
    }

    const goToHelpEditeur =() => {
        navigate("/HelpEditeur")
    }

    return(

        <div className="main-help">
            <div className="space5">
                <SideNav/>
            </div>
            <div className="rest-help">
                <div className="wutyouwant">
                    <p className="specialAth">ATHAR <span className="supbro">support</span></p>
                    <div className="wrapkho">
                        <p className="Howcanwehelp">Comment pouvons-nous vous aider ?  </p>

                        <SearchBarHelp/>
                    </div>
                </div>
                <div className="wutiwant">
                    <div className="contain-squares">
                        <div className="sqrHelp" onClick={goToHelpMonProfil}>
                           <span className="scr"><CgProfile color="#C57642" /></span> 
                          <p>Mon Profil </p>  
                        </div>
                        <div className="sqrHelp">
                          <span className="scr"><GrProjects color="#C57642"/></span>
                          <p> Projets </p> 
                        </div>
                        <div className="sqrHelp" onClick={goToHelpNotif}>
                            <span className="scr" >< AiOutlineNotification color="#C57642"/></span>
                          <p>Notifications </p>  
                        </div>
                        <div className="sqrHelp" onClick={goToHelpEditeur}>
                            <span className="scr">< TbEdit color="#C57642"/></span>
                          <p>Editeur </p>  
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )


}

export default HelpPrnc