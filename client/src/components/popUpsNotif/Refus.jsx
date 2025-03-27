import "../../ComponentsStyles/popUpsNotif styles/Refus.css"
import i from "../../assets/x.png"

function Refus  ({popUp,close,notif}) {
return (
    popUp &&
    (<div className="main-bac-notif">
            <div className="notif-pop3">
    
                <div className="Ti3">
                <p >Vous avez été<span className="beige"> refusé.</span></p>
                </div>
                <img className="close-btn2" src={i} alt="fd" onClick={close} />
                <div className="ktiba3">
                <p><span className="gris">Par: </span>{notif.sender}<br />
                <span className="gris">Projet:</span> 
                {notif.projet}</p>
                </div>
                
            </div>
        </div>  )
)

}

export default Refus