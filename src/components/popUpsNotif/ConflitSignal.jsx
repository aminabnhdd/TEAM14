import "../../ComponentsStyles/popUpsNotif styles/ConflitSignal.css"
import i from "../../assets/x.png"

function ConflitSignal ({popUp,close}) {
    const parts = [{tit:"Conflit Signalé",sender:"Benhaddad Amina",subject:"L’article affirme que la Casbah a été développée sous les Ottomans, mais des études archéologiques montrent des structures berbères plus anciennes. Cette information doit être clarifiée avec des sources fiables."}]
 return(
    popUp &&
    parts.map(e =>    <div className="main-bac-notif">
        <div className="notif-pop">

            <div className="Ti">
            <p>{e.tit}</p>
            </div>
            <img className="close-btn" src={i} alt="fd" onClick={close}/>
            <div className="ktiba">
            <p><span className="gris">Par: </span>{e.sender} <br />
            <span className="gris">Sujet:</span> <br /> 
              {e.subject}</p>
            </div>
            <div className="batens">
                <button className="baten1">Accepter</button>
                <button className="baten2">Refuser</button>
            </div>
        </div>
    </div>  )
 )
}

export default ConflitSignal