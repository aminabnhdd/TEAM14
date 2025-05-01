import "../../ComponentsStyles/popUpsNotif styles/ConflitSignal.css"
import i from "../../assets/x.png"
import axios from "axios"
import  AuthContext from "../../helpers/AuthContext"
import {useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import MeetTime from "./MeetTime"

function ConflitSignal ({popUp,close,notif,handleSeen}) {
    const navigate = useNavigate()
    const {authState} = useContext(AuthContext);
    const validate = (action) => {
        axios.put(`http://localhost:3001/notifications/valider/${notif.conflitId}`,{decision:action,notifId:notif._id,projetId:notif.projetId},{headers:{Authorization:`Bearer ${authState.accessToken}`}})    
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
            console.log(notif)
        })
    }

    const [popTime,setPopTime] = useState(false);
    const closeTime = () => setPopTime(false);
 return(
    <>
    <MeetTime popUp={popTime} close={closeTime} notif={notif} handleSeen={handleSeen}/>
    {popUp &&
    (<div className="main-bac-notif">
        <div className="notif-pop">

            <div className="Ti">
            <p>Conflit Signalé</p>
            </div>
            <img className="close-btn" src={i} alt="fd" onClick={close}/>
            <div className="ktiba">
            <p><span className="gris">Par: </span>{notif.sender} <br />
            <span className="gris">Sujet:</span> 
              {notif.content}</p>
            </div>
         
            <div className="batens">
                <button className="baten1" onClick={()=>{close();setPopTime(true)}}>Accepter</button>
                <button className="baten2" onClick={()=>{close();validate("refuse");handleSeen(notif._id,"conflit")}}>Refuser</button>
            </div>
        </div>
    </div>) }
    </>
 )
}

export default ConflitSignal