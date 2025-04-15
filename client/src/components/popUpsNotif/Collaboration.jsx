import "../../ComponentsStyles/popUpsNotif styles/Collaboration.css"
import i from "../../assets/x.png"
import axios from "axios"
import  AuthContext from "../../helpers/AuthContext"
import {useContext} from "react"
import { useNavigate } from "react-router-dom"

function Collaboration ({popUp,close,notif}) {
    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);
    const colab = (action) => {
        console.log(authState);
        axios.put(`http://localhost:3001/notifications/collaboration/valider/${notif._id}`,{decision:action},{headers:{Authorization:`Bearer ${authState.accessToken}`}})    
        .then((response)=>{
            console.log(response.data)
            navigate("/notifications")
            
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }
 return(
    popUp &&
    (   
    <div className="main-bac-notif">
        <div className="notif-pop2">

            <div className="Ti2">
            <p>Demande de collaboration</p>
            </div>
            <img className="close-btn2" src={i} alt="fd" onClick={close} />
            <div className="ktibaa">
            <p><span className="gris">Par: </span>{notif.sender}<br />
            <span className="gris">Projet:</span> 
            {notif.projet}</p>
            </div>
            <div className="batens">
                <button className="baten3" onClick={()=>{colab("accept")}}>Accepter</button>
                <button className="baten4" onClick={()=>{colab("refuse")}}>Refuser</button>
            </div>
        </div>
    </div>  )
 )
}

export default Collaboration