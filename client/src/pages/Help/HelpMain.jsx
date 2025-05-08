import "../../PagesStyles/Help Styles/HelpMainStyles.css"
import SideNav from "../../components/SideNav"
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { AiOutlineNotification } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

import { useNavigate } from "react-router-dom";



function HelpPrnc() {

const questions = [
  { text: "Comment modifier mes informations personnelles ?", link: "/HelpMonProfil#pinfo" },
  { text: "Comment gérer les notifications ?", link: "/HelpNotif" },
  { text: "Comment utiliser l’éditeur ?", link: "/HelpEditeur" },
  { text: "Où trouver mes projets ?", link: "/HelpProjets" },
];

const [open, setOpen] = useState(false);

const handleClick = (link) => {
    setOpen(false);
    navigate(link);
};

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
    const goToHelpProjets =() => {
        navigate("/HelpProjets")
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

                        
    <div className="search-dropdown-container" style={{ position: "relative", width: "100%" }}>
      {/* BARRE DE RECHERCHE VISUELLE */}
      <div
        className="searchbar-help"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          border: "2px solid #C57642",
          borderRadius: "40px",
          padding: "0.7rem 1rem",
          cursor: "pointer",
          background: "white",
          margin:"auto",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <FiSearch style={{ marginRight: "0.5rem", color: "#C57642" }} />
        <span style={{ color: "#999" }}>Rechercher un problème ?</span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            right:"50%",
            transform:"translateX(50%)",
            marginTop: "0.4rem",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 20,
          }}
        >
          {questions.map((q, i) => (
            <li
              key={i}
              onClick={() => handleClick(q.link)}
              style={{
                padding: "0.75rem 1rem",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E8C07D")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {q.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  
                    </div>
                </div>
                <div className="wutiwant">
                    <div className="contain-squares">
                        <div className="sqrHelp" onClick={goToHelpMonProfil}>
                           <span className="scr"><CgProfile color="#C57642" /></span> 
                          <p>Mon Profil </p>  
                        </div>
                        <div className="sqrHelp" onClick={goToHelpProjets}>
                          <span className="scr" ><GrProjects color="#C57642"/></span>
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