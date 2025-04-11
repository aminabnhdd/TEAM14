import "../../PagesStyles/Pages Admin Styles/NotifAdmin.css"
import {useState,useEffect} from "react"
import Collaboration from "../../components/popUpsNotif/Collaboration"
import ConflitRes from "../../components/popUpsNotif/ConflitRes"
import SearchBar from "../../components/SearchBar/SearchBar"
import SideNav from "../../components/SideNav/SideNav"


import imjjjjjj from "../../assets/person.png"


function NotifAdmin() {

    const notificationsConflit = [
        {type:"expert",imge:imjjjjjj,user:"Aliouche Ghazine",time:"1min",button:"Détails"},
        {type:"expert",imge:imjjjjjj,user:"Souames Manel",time:"2min",button:"Détails"},
        {type:"expert",imge:imjjjjjj,user:"Yahia Lina",time:"4min",button:"Détails"},
        
    ]    
    const notificationsCol = [
        {type:"visiteur",imge:imjjjjjj,user:"Rahim Sarah",time:"1min",button:"Détails"},
        {type:"visiteur",imge:imjjjjjj,user:"Rachem Mohamed Riadh ",time:"2min",button:"Détails"},
        {type:"visiteur",imge:imjjjjjj,user:"Haddad Amina ",time:"4min",button:"Détails"}
    ]    
    
    

    

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
    };

    const click2 = (e) => {
        document.querySelectorAll(".transptext").forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        setConflit(false);
        setCol(true);
    };

   

    const handleDetailsClick = (type) => {
        if (type === "conflitResolu") {
            setPoop(true);
        }
    };

    const handleDetailsClick2 = (type) => {
        if (type === "demandeCollaboration") setPoop3(true)
    }
    

const close = () => {
    setPoop(false);
}

const close3 = () => {
    setPoop3(false);
}


const [conflit,setConflit] = useState(true)
const [col,setCol] = useState(false)
const [poop,setPoop] = useState(false) 
const [poop3,setPoop3] = useState(false) 


    

 return(

    <div className="main-notif">
        <div className="navigation-bar-notifAd">
            <SideNav/>
        </div>
        <div className="secondary-notif-notifAd">

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
                            <div className="note-notifAd">
                            <div className="iconwmessage-notifAd">
                            <img className="notif-icon-notifAd" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-notifAd"><span className="userName">{element.user}</span> souhaite créer un compte {element.type}</p>
                            </div>
                            <div className="notwtabwdom-notifAd">
                            <span className="notif-time-notifAd">{element.time}</span>
                            <button className="det-button-notifAd" onClick={() => handleDetailsClick(element.type)}>
                                {element.button}
                            </button>
                            </div>
                            {<ConflitRes popUp={poop} close={close}/>}
                            

                            
                        </div>
                        ))}

                        {col && notificationsCol.map(element => (
                            <div className="note-notifAd">
                            <div className="iconwmessage-notifAd">
                            <img className="notif-icon-notifAd" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-notifAd"><span className="userName">{element.user}</span> souhaite créer un compte {element.type} </p>
                            </div>
                            <div className="notwtabwdom-notifAd">
                            <span className="notif-time-notifAd">{element.time}</span>
                            <button className="det-button-notifAd" onClick={()=>handleDetailsClick2(element.type)}>{element.button}</button>
                            </div>
                            {<Collaboration popUp={poop3} close={close3}/>}
                        </div>
                        ))}

                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
 )
}

export default NotifAdmin