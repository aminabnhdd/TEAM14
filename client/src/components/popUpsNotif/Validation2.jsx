import i from "../../assets/x.png"

function Validation2 ({popUp,close}) {
    const parts = [{tit:"Demande de validation de compte",sender:"Benhaddad Amina",type:"expert"}]


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
                <p><span className="gris">Utilisateur: </span>{e.sender} <br />
                <span className="gris">Type de compte: </span> 
                {e.type}</p>
                </div>
                <div className="batens">
                    <button className="baten3">Accepter</button>
                    <button className="baten4">Refuser</button>
                </div>
            </div>
        </div>  )
     )

}
export default Validation2