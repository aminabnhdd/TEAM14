import "../../ComponentsStyles/popUpsNotif styles/ConflitChat.css"
import i from "../../assets/x.png"
import link from "../../assets/Link 2.svg"


function ConflitChat ({popUp,close,notif}) {
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
                <p><span className="gris">Par: </span>{notif.sender} <br />
                <span className="gris">Sujet:</span> <br /> 
                {notif.content}</p>
                </div>
                
                <button className="batens2">
                    <p className="baten3">Lien vers chat</p>
                    <img className="linkimg" src={link} alt="walter white" />
                    
                </button>
            
            </div>
        </div>)
    )
}

export default ConflitChat