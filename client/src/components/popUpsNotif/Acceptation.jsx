
// popup to indicate that a user was accepted as collaborator in a certain project by the chef du projet

import "../../ComponentsStyles/popUpsNotif styles/Acceptation.css"
import i from "../../assets/x.png"
import { useNavigate } from "react-router-dom"

function Acceptation ({popUp,close,notif}) {
const navigate = useNavigate();

// popup contains the name of chef and title of projet
return (
    popUp &&
        ( 
        <div className="main-bac-notif">
            <div className="notif-pop3">
                <div className="Ti3">
                <p> Vous avez été<span className="beige"> accepté</span></p>
                </div>
                <img className="close-btn2" src={i} alt="fd" onClick={close} />
                <div className="ktiba3">
                <p><span className="gris">Par: </span> 
                <span className = "underline cursor-pointer " onClick={()=>navigate(`/afficher-expert/${notif.senderId}`)} >{notif.sender}</span><br />
              <div className="h-2"></div>  <span className="gris  " >Projet:</span> 
                <span className = "underline cursor-pointer" onClick={()=>navigate(`/visualisation/${notif.projetId}`)} >{notif.projet}</span></p>
                </div>
                
            </div>
        </div> 
        ) 
)

}

export default Acceptation