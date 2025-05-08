import "../../ComponentsStyles/popUpsNotif styles/ConflitChat.css"
import i from "../../assets/x.png"
import link from "../../assets/Link 2.svg"
import { useNavigate } from "react-router-dom"

function ConflitChat ({popUp,close,notif}) {
    const navigate = useNavigate();
    return(
       popUp &&
       (
        <div className="main-bac-notif">
            <div className="notif-pop">
                <div className="Ti">
                <p>Conflit Signalé</p>
                </div>
                <img className="close-btn" src={i} alt="fd" onClick={close} />
                <div className="ktiba">
                <p><span className="gris">Par: </span>
                <span className="underline cursor-pointer" onClick={()=>navigate(`/afficher-expert/${notif.senderId}`)}>{notif.sender} </span><br />
                <span className="gris">Sujet:</span> <br /> 
                {notif.content}</p>
                </div>
                
                <button className="batens2"  onClick={() => window.open(notif.chat, "_blank")}>
                    <p className="baten5">Lien vers meet</p>
                    <img className="linkimg" src={link} alt="walter white" />
                    
                </button>
            
            </div>
        </div>)
    )
}

export default ConflitChat