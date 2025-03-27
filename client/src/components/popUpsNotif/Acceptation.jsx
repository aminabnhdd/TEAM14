import "../../ComponentsStyles/popUpsNotif styles/Acceptation.css"
import i from "../../assets/x.png"

function Acceptation ({popUp,close,notif}) {
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
                <p><span className="gris">Par: </span> {notif.sender} <br />
                <span className="gris">Projet:</span> 
                {notif.projet}</p>
                </div>
                
            </div>
        </div> 
        ) 
)

}

export default Acceptation