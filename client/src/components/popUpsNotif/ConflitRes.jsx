
// popup to indicate that a conflict was resolved

import "../../ComponentsStyles/popUpsNotif styles/ConflitRes.css"
import i from "../../assets/x.png"
import { useNavigate } from "react-router-dom"


function ConflitRes ({popUp,close,notif}) {
    const navigate = useNavigate();
    return(
        popUp &&
        (<div className="main-bac-notif">
            <div className="notif-pop4">
                <div className="Ti5">
                <p>Conflit Résolu</p>
                </div>
                <img className="close-btn" src={i} alt="fd" onClick={close} />
                <div className="ktiba">
                <p><span className="gris">Par: </span>
                <span className="underline cursor-pointer" onClick={()=>navigate(`/afficher-expert/${notif.senderId}`)}>{notif.sender} </span><br />

                <span className="gris">Sujet:</span> <br /> 
                {notif.content}</p>
                </div>
            </div>
        </div>
        )
    )
}

export default ConflitRes