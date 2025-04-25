import i from "../../assets/x.png"
import axios from "axios"
import React, { useContext } from "react"
import AuthContext from "../../helpers/AuthContext"
import {useNavigate} from "react-router-dom"

function Validation ({popUp,close,notif}) {
    const {authState,setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleValidation = (action) => {
        axios.put(`http://localhost:3001/admin/${notif.sendeId._id}`, { action : action },{headers: {Authorization: `Bearer ${authState.accessToken}`}})
        .then((res) => {
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        axios.delete(`http://localhost:3001/admin/notif/${notif._id}`,{headers: {Authorization: `Bearer ${authState.accessToken}`}})
        .then((res)=>{
            console.log(res.data)
            close()
            window.location.reload()
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
                <p >Demande de validation de compte</p>
                </div>
                <img className="close-btn2" src={i} alt="fd" onClick={close} />
                <div className="ktibaa">
                <p><span className="gris">Utilisateur: </span><span 
                            onClick={()=>{navigate(`/desactiver-visiteur/${notif.sendeId._id}`)}}                               
                            className=" underline cursor-pointer">{notif.sendeId.nom } {notif.sendeId.prenom}
                            </span> <br />
                <span className="gris">Type de compte: </span> 
                Visiteur</p>
                </div>
                {notif.read ? <p className="text-center font-semibold text-success">
    Cette demande a déjà été traitée.
  </p>:
                <div className="batens">
                    <button className="baten3" onClick={()=>{handleValidation("validate");close()}}>Accepter</button>
                    <button className="baten4" onClick={()=>{handleValidation("reject");close()} }>Refuser</button>
                </div>}
            </div>
        </div>  )
     

}
export default Validation