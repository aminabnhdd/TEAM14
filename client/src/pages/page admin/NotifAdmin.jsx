import "../../PagesStyles/Pages Admin Styles/NotifAdmin.css"
import {useState,useEffect} from "react"
import Collaboration from "../../components/popUpsNotif/Collaboration"
import ConflitRes from "../../components/popUpsNotif/ConflitRes"
import SearchBar from "../../components/SearchBar/SearchBar"
import SideNav from "../../components/SideNav/SideNav"
import SideNavAdmin from "../../components/SideNav/SideNavAdmin"
import Validation from "../../components/popUpsNotif/Validation"
import Validation2 from "../../components/popUpsNotif/Validation2"
import axios from "axios"
import AuthContext  from "../../helpers/AuthContext"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"


import imjjjjjj from "../../assets/person.png"


function NotifAdmin() {

    const [notificationsConflit, setNotificationsConflit] = useState([]);   
    const [notificationsCol, setNotificationsCol] = useState([]); 

    const {authState,setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();
    
    
    const handleSeenConflit = (id,type) => {
        if (type === "expert") {
        const updated = notificationsConflit.map(n =>
            n._id === id ? { ...n, seen: true } : n
        );
        setNotificationsConflit(updated)}

        else if (type === "visiteur") {
            const updated = notificationsCol.map(n =>
                n._id === id ? { ...n, seen: true } : n
            );
            setNotificationsCol(updated);
        
    }
}
    

    useEffect(() => {
        // Make "Conflits" active at the beginning
        document.querySelectorAll(".transptext").forEach(el => {
            el.classList.remove("active");
        });
        document.querySelector(".transptext:first-child")?.classList.add("active");
        axios.get("http://localhost:3001/refresh", { withCredentials: true })
        .then((res) => {
            if (res.data.error) return navigate("/connexion")
            setAuthState({email:res.data.email,role:res.data.role,accessToken:res.data.accessToken});
            axios.get("http://localhost:3001/admin/notifications",{headers: {Authorization: `Bearer ${res.data.accessToken}`}})
            .then((res)=>{
                console.log(res.data)
                setNotificationsConflit(res.data.filter((el) => el.type === "validerExpert").map((el) => ({...el, seen: false,imge: imjjjjjj,genre:"expert"})));
                setNotificationsCol(res.data.filter((el) => el.type === "validerVisiteur").map((el) => ({...el, seen: false,imge: imjjjjjj,genre:"visiteur"})));
            })
            .catch((error)=>{
                console.error("Error fetching notifications:", error);
            })
        })
        .catch((error)=>{
            console.error("Error fetching refresh token:", error);
            navigate("/connexion")
        })
        
    }, []);

    const click1 = (e) => {
        document.querySelectorAll(".transptext").forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        setConflit(true);
        setCol(false);
    };

    const click2 = (e) => {
        document.querySelectorAll(".transptext").forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        setConflit(false);
        setCol(true);
    };

   

    const handleDetailsClick = (type) => {  
        if (type === "visiteur") setPoop(true)
        if (type === "expert") setPoop3(true)
        
    };

    

const close = () => {
    setPoop(false);
}

const close3 = () => {
    setPoop3(false);
}
const getTime = (time) => {

    let creationTime = new Date(time).getTime();
    let actualTime = new Date().getTime();
    let result = actualTime - creationTime;

    const seconds = Math.floor(result / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) return `${months} mois`;
    if (days > 0) return `${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} heure${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} min`;
    return `${seconds} sec`;
}

const [conflit,setConflit] = useState(true)
const [col,setCol] = useState(false)
const [poop,setPoop] = useState(false) 
const [poop3,setPoop3] = useState(false) 


    

 return(

    <div className="main-notif">
        <div className="navigation-bar-notifAd">
            <SideNavAdmin/>
        </div>
        <div className="secondary-notif-notifAd">


        <div className="teqsam">
        <SearchBar  title="Rechercher un projet" />

                <div className=" textos-notifAd">
                    <h1 className="hnotif-notifAd">Notifications</h1>
                    <div>
                    <p className="pnotif-notifAd">Gérez les demandes de validation de compte. Examinez chaque demande et choisissez de l’accepter ou de la <br />
                    refuser en fonction des informations de l’utilisateur</p>
                    </div>
                </div>

            <div className="second-div-notifAd">
                <div className="final-div-notifAd">
                    <div className="transport-notifAd">
                        <p onClick={click1} className="transptext active" >Experts</p>
                        <p onClick={click2} className="transptext">Visiteurs </p>
                        
                    </div>
                    <div className="line-notifAd"></div>
                    <div className="notifications-notifAd">
                        
                        {conflit && notificationsConflit.map(element => (
                            <div key={element.id} className="note-notifAd" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage-notifAd">
                            <img className="notif-icon-notifAd" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-notifAd"><span className="userName">{element.sendeId.nom } {element.sendeId.prenom}</span> souhaite créer un compte {element.genre}</p>
                            </div>
                            <div className="notwtabwdom-notifAd">
                            <span className="notif-time-notifAd">{getTime(element.time)}</span>
                            <button className="det-button-notifAd" onClick={() => {handleDetailsClick(element.genre);handleSeenConflit(element._id,"expert")}}>
                                Détails
                            </button>
                            </div>
                            {<Validation2 popUp={poop3} close={close3} notif={element}/>}
                        </div>
                        ))}


                        {col && notificationsCol.map(element => (
                            <div key={element.id} className="note-notifAd" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage-notifAd">
                            <img className="notif-icon-notifAd" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-notifAd"><span className="userName">{element.sendeId.nom} {element.sendeId.prenom}</span> souhaite créer un compte {element.genre} </p>
                            </div>
                            <div className="notwtabwdom-notifAd">
                            <span className="notif-time-notifAd">{getTime(element.time)}</span>
                            <button className="det-button-notifAd" onClick={()=>{handleDetailsClick(element.genre); handleSeenConflit(element._id,"visiteur")}}>Détails</button>
                            </div>
                        {<Validation popUp={poop} close={close} notif={element}/>}
                        </div>
                        ))}

                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 )
}

export default NotifAdmin