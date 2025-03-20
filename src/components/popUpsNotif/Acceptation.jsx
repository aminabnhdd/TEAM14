import "../../ComponentsStyles/popUpsNotif styles/Acceptation.css"
import i from "../../assets/x.png"

function Acceptation ({popUp,close}) {
    const parts = [{tit:"Vous avez été",titChng:"accepté.",sender:"Benhaddad Amina",project:"Khdazej El Amia"}]
return (
    popUp &&
        parts.map( el =>
        <div className="main-bac-notif">
            <div className="notif-pop3">
                <div className="Ti3">
                <p >{el.tit} <span className="beige">{el.titChng}</span></p>
                </div>
                <img className="close-btn2" src={i} alt="fd" onClick={close} />
                <div className="ktiba3">
                <p><span className="gris">Par: </span> {el.sender} <br />
                <span className="gris">Projet:</span> 
                {el.project}</p>
                </div>
                
            </div>
        </div> 
        ) 
)

}

export default Acceptation