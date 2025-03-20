import "../popUpsNotif styles/ConflitRes.css"
import i from "../assets/x.png"



function ConflitRes ({popUp,close}) {
    const parts = [{tit:"Conflit Résolu",sender:"Benhaddad Amina",subject:"L’article affirme que la Casbah a été développée sous les Ottomans, mais des études archéologiques montrent des structures berbères plus anciennes. Cette information doit être clarifiée avec des sources fiables."}]
    return(
        popUp &&
        parts.map(e => <div className="main-bac-notif">
            <div className="notif-pop4">
                <div className="Ti5">
                <p>{e.tit}</p>
                </div>
                <img className="close-btn" src={i} alt="fd" onClick={close} />
                <div className="ktiba">
                <p><span className="gris">Par: </span>{e.sender} <br />
                <span className="gris">Sujet:</span> <br /> 
                {e.subject}</p>
                </div>
            </div>
        </div>
        )
    )
}

export default ConflitRes