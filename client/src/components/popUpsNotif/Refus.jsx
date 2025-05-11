
//popup to indicate that a user wasnt accepted as a collaborator in a project by chef de projet

import "../../componentsStyles/popUpsNotif styles/Refus.css"
import i from "../../assets/x.png"
import { useNavigate } from "react-router-dom"

function Refus  ({popUp,close,notif}) {
    const navigate = useNavigate();
    

// popup displays the name of chef and title of project
return ( 
    popUp &&
    (<div className="main-bac-notif">
            <div className="notif-pop3">
    
                <div className="Ti3">
                <p >Vous avez été<span className="beige"> refusé.</span></p>
                </div>
                <img className="close-btn2" src={i} alt="fd" onClick={close} />
                <div className="ktiba3">
                <p><span className="gris">Par: </span>
                <span className = "underline cursor-pointer" onClick={()=>navigate(`/afficher-expert/${notif.senderId}`)} >{notif.sender}</span><br />
                 <div className="h-2"></div>
                <span className="gris">Projet:</span> 
                <span className = "underline cursor-pointer" onClick={()=>navigate(`/visualisation/${notif.projetId}`)} >{notif.projet}</span></p>
                </div>
                
            </div>
        </div>  )
)

}

export default Refus