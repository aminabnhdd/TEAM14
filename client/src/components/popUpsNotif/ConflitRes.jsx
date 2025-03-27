import "../../ComponentsStyles/popUpsNotif styles/ConflitRes.css"
import i from "../../assets/x.png"



function ConflitRes ({popUp,close,notif}) {
    return(
        popUp &&
        (<div className="main-bac-notif">
            <div className="notif-pop4">
                <div className="Ti5">
                <p>Conflit Résolu</p>
                </div>
                <img className="close-btn" src={i} alt="fd" onClick={close} />
                <div className="ktiba">
                <p><span className="gris">Par: </span>{notif.sender} <br />
                <span className="gris">Sujet:</span> <br /> 
                {notif.content}</p>
                </div>
            </div>
        </div>
        )
    )
}

export default ConflitRes