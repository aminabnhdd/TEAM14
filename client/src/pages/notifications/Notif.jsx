import "../../PagesStyles/notifications styles/Notif.css"
import {useState,useEffect} from "react"
import ConflitSignal from "../../components/popUpsNotif/ConflitSignal"
import Collaboration from "../../components/popUpsNotif/Collaboration"
import ConflitRes from "../../components/popUpsNotif/ConflitRes"
import ConflitChat from "../../components/popUpsNotif/ConflitChat"
import Refus from "../../components/popUpsNotif/Refus"
import Acceptation from "../../components/popUpsNotif/Acceptation"
import SideNav from "../../components/SideNav"
import SearchBar from "../../components/SearchBar"

import imjj from "../../assets/Alert triangle (1).png"
import imjjj from "../../assets/Alert triangle.png"
import imjjjj from "../../assets/ix_success.png"
import imjjjjj from "../../assets/tablette 2.png"
import imjjjjjj from "../../assets/person.png"
import imjjjjjjj from "../../assets/Vector.png"
import imjjjjjjjj from "../../assets/utilisateur-verifie 1.png"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useContext } from "react"
import AuthContext from '../../helpers/AuthContext'

function Notif() {
  
    const [notificationsConflit,setNotificationsConflit] =useState([]);  
    const [notifConf,setNotifConf] = useState({});  
    const {authState,setAuthState} = useContext(AuthContext);
    
    const [notificationsCol,setNotificationsCol] = useState([]);
    const [notifCol,setNotifCol] = useState({});

    const [notificationsDem,setNotificationsDem] = useState([]);
    const [notifDem,setNotifDem] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        // Make "Conflits" active at the beginning
        document.querySelectorAll(".transptext").forEach(el => {
            el.classList.remove("active");
        });
        document.querySelector(".transptext:first-child")?.classList.add("active");
        axios.get("http://localhost:3001/refresh",{withCredentials:true})
        .then((response) => {
            // if (response.data.error) return navigate('/connexion')
            console.log(response.data)
            setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
            axios.get("http://localhost:3001/notifications",{headers:{Authorization:`Bearer ${response.data.accessToken}`}})
            .then((response) => {
                console.log(response.data);
                const confNotifs = response.data.notifications
                .filter((notif) => ["conflitResolu", "conflitSignale", "conflitValide"].includes(notif.type))
                .map((notif) => {
                    if (notif.type === "conflitResolu") {
                        return { ...notif, imge: imjjjj, tab: imjjjjj, message: "Un conflit a été résolu !" };
                    } else if (notif.type === "conflitValide") {
                        return { ...notif, imge: imjj, tab: imjjjjj,message: "Un conflit a été signalé dans l’un de vos projets !"  };
                    } else if (notif.type === "conflitSignale") {
                        return { ...notif, imge: imjjj, tab: imjjjjj,  message: "Un conflit a été signalé !"};
  
                    }
                });
                const colNotifs = response.data.notifications
                .filter((notif) => notif.type === "demandeCollaboration")
                .map((notif) => {
                    
                    return { ...notif, imge: imjjjjjj, tab: imjjjjj, message: `${notif.sender} souhaite collaborer dans votre projet` };
                    
                });
                const demNotifs = response.data.notifications
                .filter((notif) => ["demandeRefuse", "demandeAccepte"].includes(notif.type))
                .map((notif) => {
                    if (notif.type === "demandeRefuse") {
                        return({ ...notif, imge: imjjjjjjj, tab: imjjjjj, message: "Votre demande de collaboration a été refusée." });
                    } else if (notif.type === "demandeAccepte") {
                        return({ ...notif, imge: imjjjjjjjj, tab: imjjjjj, message: "Votre demande de collaboration a été acceptée !" });
                    }
                });
                

              
                setNotificationsConflit(confNotifs);
                setNotificationsCol(colNotifs);
                setNotificationsDem(demNotifs);
            }
            )
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
        
    }, []);

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
    


    const click1 = (e) => {
        document.querySelectorAll(".transptext").forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        setConflit(true);
        setCol(false);
        setDem(false);
    };

    const click2 = (e) => {
        document.querySelectorAll(".transptext").forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        setConflit(false);
        setCol(true);
        setDem(false);
    };

    const click3 = (e) => {
        document.querySelectorAll(".transptext").forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        setConflit(false);
        setCol(false);
        setDem(true);
    };

    const handleDetailsClick = (type) => {
        if (type === "conflitResolu") {
            setPoop(true);
        }

         else if (type === "conflitSignale") {
            setPoop1(true);
            
        }
        else if (type === "conflitValide") {
            setPoop2(true);
        }
    };

    const handleDetailsClick2 = (type) => {
        if (type === "demandeCollaboration") setPoop3(true)
    }
    const handleDetailsClick3 = (type) => {
        if (type === "demandeRefuse") setPoop4(true)
        if (type === "demandeAccepte") setPoop5(true)
    }
    
    const handleSeen = (id, type) => {
        if (type === "conflit") {
            const updatedNotifications = notificationsConflit.map(notification =>
                notification._id === id ? { ...notification, seen: true } : notification
            );
            setNotificationsConflit(updatedNotifications);
        } else if (type === "col") {
            const updatedNotifications = notificationsCol.map(notification =>
                notification._id === id ? { ...notification, seen: true } : notification
            );
            setNotificationsCol(updatedNotifications);
        } else if (type === "dem") {
            const updatedNotifications = notificationsDem.map(notification =>
                notification._id === id ? { ...notification, seen: true } : notification
            );
            setNotificationsDem(updatedNotifications);
        }
    };
const close = () => {
    setPoop(false);
}
const close1 =  () => {
    setPoop1(false);
}
const close2 = () => {
    setPoop2(false);
}
const close3 = () => {
    setPoop3(false);
}
const close4 = () => {
    setPoop4(false);
}
const close5 = () => {
    setPoop5(false);
}

const [conflit,setConflit] = useState(true)
const [col,setCol] = useState(false)
const [dem,setDem] = useState(false)
const [poop,setPoop] = useState(false) 
const [poop1,setPoop1] = useState(false) 
const [poop2,setPoop2] = useState(false) 
const [poop3,setPoop3] = useState(false) 
const [poop4,setPoop4] = useState(false) 
const [poop5,setPoop5] = useState(false) 

    

 return(

    <div className="main-notif">
        <div className="navigation-bar">
            <SideNav/>
        </div>
        <div className="secondary-notif">

        <div className="teqsam">
        <SearchBar  title="Rechercher Un Projet"/>
            <div className=" textos">
                <h1 className="hnotif">Notifications</h1>
                <div>
                <p className="pnotif">Un conflit a été détecté ? Retrouvez ici toutes les notifications concernant les divergences</p>
                <p className="pnotif">dans les contributions et prenez les décisions appropriées.</p>
                </div>
            </div>

            <div className="second-div">
                <div className="final-div">
                    <div className="transport">
                        <p onClick={click1} className="transptext active" >Conflits</p>
                        <p onClick={click2} className="transptext">Demandes de collaboration</p>
                        <p onClick={click3} className="transptext">Mes demandes</p>
                    </div>
                    <div className="line-riadh  "></div>
                    <div className="notifications">
                        
                        {conflit && (notificationsConflit.length>0 ? notificationsConflit.map(element => (
                            <div key={element._id} className="note" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage">
                            <img className="notif-icon" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message">{element.message}</p>
                            </div>
                            <div className="notwtabwdom">
                            <span className="notif-time">{getTime(element.time)}</span>
                            <div className="tabwdom">
                            <img className="tab" src={element.tab}></img>
                            <p className="dom">{element.dom}</p>
                            </div>
                            <button className="det-button" onClick={() => {setNotifConf(element);handleDetailsClick(element.type); handleSeen(element._id,"conflit"); }}>
                                Détails
                            </button>
                            </div>
                            

                            
                        </div>
                        )):<p className="pt-2 main-text" >Aucune notification.</p>)}
                        {<ConflitRes popUp={poop} close={close} notif={notifConf}/>}
                        {<ConflitSignal popUp={poop1} close={close1} notif={notifConf}/>}
                        {<ConflitChat popUp={poop2} close={close2} notif={notifConf}/>}
                        {col && (notificationsCol.length>0 ? notificationsCol.map(element => (
                            <div key={element._id} className="note" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage">
                            <img className="notif-icon" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message">{element.message}</p>
                            </div>
                            <div className="notwtabwdom">
                            <span className="notif-time">{getTime(element.time)}</span>
                            <div className="tabwdom">
                            <img className="tab" src={element.tab}></img>
                            <p className="dom">{element.dom}</p>
                            </div>
                            <button className="det-button" onClick={()=>{setNotifCol(element);handleSeen(element._id,"col"); handleDetailsClick2(element.type)}}>Détails</button>
                            </div>
                            
                        </div>
                        
                        )):<p className="pt-2 main-text" >Aucune notification.</p>)}
                        {<Collaboration popUp={poop3} close={close3} notif={notifCol}/>}

                        {dem && (notificationsDem.length>0 ? notificationsDem.map(element => (
                            <div key={element._id} className="note" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage">
                            <img className={element.type === "demandeRefuse" ? "refusIcon" : "notif-icon"} src={element.imge} alt="Notification Icon" />
                            <p className="notif-message">{element.message}</p>
                            </div>
                            <div className="notwtabwdom">
                            <span className="notif-time">{getTime(element.time)}</span>
                            <div className="tabwdom">
                            <img className="tab" src={element.tab}></img>
                            <p className="dom">{element.dom}</p>
                            </div>
                            <button className="det-button" onClick={()=>{setNotifDem(element); handleDetailsClick3(element.type);handleSeen(element._id,"dem")}}>Détails</button>
                            </div>
                            
                        </div>
                        )):<p className="pt-2 main-text" >Aucune notification.</p>)}
                        {<Refus  popUp={poop4} close={close4} notif={notifDem}/>}
                        {<Acceptation  popUp={poop5} close={close5} notif={notifDem}/>}
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
 )
}

export default Notif