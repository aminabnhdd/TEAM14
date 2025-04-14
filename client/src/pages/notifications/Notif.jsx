import "../../PagesStyles/notifications styles/Notif.css"
import {useState,useEffect} from "react"
import ConflitSignal from "../../components/popUpsNotif/ConflitSignal"
import Collaboration from "../../components/popUpsNotif/Collaboration"
import ConflitRes from "../../components/popUpsNotif/ConflitRes"
import ConflitChat from "../../components/popUpsNotif/ConflitChat"
import Refus from "../../components/popUpsNotif/Refus"
import Acceptation from "../../components/popUpsNotif/Acceptation"
import SideNav from "../../components/SideNav/SideNav"
import SearchBar from "../../components/SearchBar/SearchBar"

import imjj from "../../assets/Alert triangle (1).png"
import imjjj from "../../assets/Alert triangle.png"
import imjjjj from "../../assets/ix_success.png"
import imjjjjj from "../../assets/tablette 2.png"
import imjjjjjj from "../../assets/person.png"
import imjjjjjjj from "../../assets/Vector.png"
import imjjjjjjjj from "../../assets/utilisateur-verifie 1.png"

function Notif() {

    const [notificationsConflit, setNotificationsConflit] = useState([
        {id:"1",seen: false,  type:"conflitResolu",imge:imjjjj,message:"Un conflit a été résolu !",time:"1min",tab:imjjjjj,dom:"Architecture",button:"Détails"},
        {id:"2",seen: false,  type:"conflitSignal",imge:imjj,message:"Un conflit a été signalé !",time:"2min",tab:imjjjjj,dom:"Histoire",button:"Détails"},
        {id:"3",seen: false,  type:"conflitValid",imge:imjjj,message:"Un conflit a été signalé dans l’un de vos projets !",time:"4min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"4",seen: false,  type:"conflitResolu",imge:imjjjj,message:"Un conflit a été résolu !",time:"1min",tab:imjjjjj,dom:"Architecture",button:"Détails"},
        {id:"5",seen: false,  type:"conflitSignal",imge:imjj,message:"Un conflit a été signalé !",time:"2min",tab:imjjjjj,dom:"Histoire",button:"Détails"},
        {id:"6",seen: false,  type:"conflitValid",imge:imjjj,message:"Un conflit a été signalé dans l’un de vos projets !",time:"4min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"7",seen: false,  type:"conflitResolu",imge:imjjjj,message:"Un conflit a été résolu !",time:"1min",tab:imjjjjj,dom:"Architecture",button:"Détails"},
        
    ]);    
    
    const [notificationsCol, setNotificationsCol] = useState([
        {id:"8" ,seen: false ,type:"demandeCollaboration",imge:imjjjjjj,message:"Rahim Sarah souhaite collaborer dans votre projet",time:"1min",tab:imjjjjj,dom:"Architecture",button:"Détails"},
        {id:"9" ,seen: false ,type:"demandeCollaboration",imge:imjjjjjj,message:"Rachem Riadh souhaite collaborer dans votre projet ",time:"2min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"10",seen: false  ,type:"demandeCollaboration",imge:imjjjjjj,message:"Rahim Sarah souhaite collaborer dans votre projet",time:"1min",tab:imjjjjj,dom:"Architecture",button:"Détails"},
        {id:"11",seen: false  ,type:"demandeCollaboration",imge:imjjjjjj,message:"Rachem Riadh souhaite collaborer dans votre projet ",time:"2min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"12",seen: false  ,type:"demandeCollaboration",imge:imjjjjjj,message:"Rahim Sarah souhaite collaborer dans votre projet",time:"1min",tab:imjjjjj,dom:"Architecture",button:"Détails"},
        {id:"13",seen: false  ,type:"demandeCollaboration",imge:imjjjjjj,message:"Rachem Riadh souhaite collaborer dans votre projet ",time:"2min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        
    ])

    const [notificationsDem, setNotificationsDem] = useState([
        {id:"14",seen: false ,type:"demandeRefuse",imge:imjjjjjjj,message:"Votre demande de collaboration a été refusée.",time:"5min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"15",seen: false ,type:"demandeAccepte",imge:imjjjjjjjj,message:"Votre demande de collaboration a été acceptée ! ",time:"34min",tab:imjjjjj,dom:"Histoire",button:"Détails"},
        {id:"16",seen: false ,type:"demandeRefuse",imge:imjjjjjjj,message:"Votre demande de collaboration a été refusée.",time:"5min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"17",seen: false ,type:"demandeAccepte",imge:imjjjjjjjj,message:"Votre demande de collaboration a été acceptée ! ",time:"34min",tab:imjjjjj,dom:"Histoire",button:"Détails"},
        {id:"18",seen: false ,type:"demandeRefuse",imge:imjjjjjjj,message:"Votre demande de collaboration a été refusée.",time:"5min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"19",seen: false ,type:"demandeAccepte",imge:imjjjjjjjj,message:"Votre demande de collaboration a été acceptée ! ",time:"34min",tab:imjjjjj,dom:"Histoire",button:"Détails"},
        {id:"20",seen: false ,type:"demandeRefuse",imge:imjjjjjjj,message:"Votre demande de collaboration a été refusée.",time:"5min",tab:imjjjjj,dom:"Archéologie",button:"Détails"},
        {id:"21",seen: false ,type:"demandeAccepte",imge:imjjjjjjjj,message:"Votre demande de collaboration a été acceptée ! ",time:"34min",tab:imjjjjj,dom:"Histoire",button:"Détails"},
    ]  )  

    useEffect(() => {
        // Make "Conflits" active at the beginning
        document.querySelectorAll(".transptext").forEach(el => {
            el.classList.remove("active");
        });
        document.querySelector(".transptext:first-child")?.classList.add("active");
    }, []);

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

         else if (type === "conflitValid") {
            setPoop1(true);
        }
        else if (type === "conflitSignal") {
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
                notification.id === id ? { ...notification, seen: true } : notification
            );
            setNotificationsConflit(updatedNotifications);
        } else if (type === "col") {
            const updatedNotifications = notificationsCol.map(notification =>
                notification.id === id ? { ...notification, seen: true } : notification
            );
            setNotificationsCol(updatedNotifications);
        } else if (type === "dem") {
            const updatedNotifications = notificationsDem.map(notification =>
                notification.id === id ? { ...notification, seen: true } : notification
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
                    <div className="line"></div>
                    <div className="notifications">
                        
                        {conflit && notificationsConflit.map(element => (
                            <div key={element.id} className="note" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage">
                            <img className="notif-icon" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message">{element.message}</p>
                            </div>
                            <div className="notwtabwdom">
                            <span className="notif-time">{element.time}</span>
                            <div className="tabwdom">
                            <img className="tab" src={element.tab}></img>
                            <p className="dom">{element.dom}</p>
                            </div>
                            <button className="det-button" onClick={() => {handleDetailsClick(element.type); handleSeen(element.id,"conflit"); }}>
                                {element.button}
                            </button>
                            </div>
                            {<ConflitRes popUp={poop} close={close}/>}
                            {<ConflitSignal popUp={poop1} close={close1}/>}
                            {<ConflitChat popUp={poop2} close={close2}/>}

                            
                        </div>
                        ))}

                        {col && notificationsCol.map(element => (
                            <div key={element.id} className="note" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage">
                            <img className="notif-icon" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message">{element.message}</p>
                            </div>
                            <div className="notwtabwdom">
                            <span className="notif-time">{element.time}</span>
                            <div className="tabwdom">
                            <img className="tab" src={element.tab}></img>
                            <p className="dom">{element.dom}</p>
                            </div>
                            <button className="det-button" onClick={()=> {handleDetailsClick2(element.type);handleSeen(element.id,"col")}}>{element.button}</button>
                            </div>
                            {<Collaboration popUp={poop3} close={close3}/>}
                        </div>
                        ))}

                        {dem && notificationsDem.map(element => (
                            <div key={element.id} className="note" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage">
                            <img className={element.type === "demandeRefuse" ? "refusIcon" : "notif-icon"} src={element.imge} alt="Notification Icon" />
                            <p className="notif-message">{element.message}</p>
                            </div>
                            <div className="notwtabwdom">
                            <span className="notif-time">{element.time}</span>
                            <div className="tabwdom">
                            <img className="tab" src={element.tab}></img>
                            <p className="dom">{element.dom}</p>
                            </div>
                            <button className="det-button" onClick={()=> {handleDetailsClick3(element.type);handleSeen(element.id,"dem")}}>{element.button}</button>
                            </div>
                            {<Refus  popUp={poop4} close={close4}/>}
                            {<Acceptation  popUp={poop5} close={close5}/>}
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

export default Notif