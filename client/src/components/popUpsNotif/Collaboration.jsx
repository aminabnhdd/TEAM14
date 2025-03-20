import "../../ComponentsStyles/popUpsNotif styles/Collaboration.css"
import i from "../../assets/x.png"

function Collaboration ({popUp,close}) {
    const parts = [{tit:"Demande de collaboration",sender:"Benhaddad Amina",project:"Khdazej El Amia"}]
 return(
    popUp &&
     parts.map(e =>   
    <div className="main-bac-notif">
        <div className="notif-pop2">

            <div className="Ti2">
            <p >{e.tit}</p>
            </div>
            <img className="close-btn2" src={i} alt="fd" onClick={close} />
            <div className="ktibaa">
            <p><span className="gris">Par: </span>{e.sender} <br />
            <span className="gris">Projet:</span> 
            {e.project}</p>
            </div>
            <div className="batens">
                <button className="baten1">Accepter</button>
                <button className="baten2">Refuser</button>
            </div>
        </div>
    </div>  )
 )
}

export default Collaboration