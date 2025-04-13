import i from "../../assets/x.png"
import axios from "axios"

function Validation2 ({popUp,close,notif}) {

    const handleValidation = (action) => {
            axios.put(`http://localhost:3001/admin/${notif.sendeId._id}`, { action : action })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
            axios.delete(`http://localhost:3001/admin/notif/${notif._id}`)
            .then((res)=>{
                console.log(res.data)
                close();
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    return(
        popUp &&  
        <div className="main-bac-notif">
            <div className="notif-pop2">
    
                <div className="Ti2">
                <p>Demande de validation de compte</p>
                </div>
                <img className="close-btn2" src={i} alt="fd" onClick={close} />
                <div className="ktibaa">
                <p><span className="gris">Utilisateur: </span>{notif.sendeId.nom } {notif.sendeId.prenom}  <br />
                <span className="gris">Type de compte: </span> 
                expert</p>
                </div>
                <div className="batens">
                    <button className="baten3" onClick={()=>{handleValidation("validate")}}>Accepter</button>
                    <button className="baten4" onClick={()=>{handleValidation("reject")}}>Refuser</button>
                </div>
            </div>
        </div>  
     )

}
export default Validation2