import "../../ComponentsStyles/popUpsNotif styles/ConflitChat.css"
import i from "../../assets/x.png"
import link from "../../assets/Link 2.svg"


function ConflitChat ({popUp,close}) {
    const parts = [{tit:"Conflit Signalé",sender:"Benhaddad Amina",subject:"L’article affirme que la Casbah a été développée sous les Ottomans, mais des études archéologiques montrent des structures berbères plus anciennes. Cette information doit être clarifiée avec des sources fiables."}]
    return(
       popUp &&
        parts.map(e=>
        <div className="main-bac-notif">
            <div className="notif-pop">
                <div className="Ti">
                <p>{e.tit}</p>
                </div>
                <img className="close-btn" src={i} alt="fd" onClick={close} />
                <div className="ktiba">
                <p><span className="gris">Par: </span>{e.sender} <br />
                <span className="gris">Sujet:</span> <br /> 
                {e.subject}</p>
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