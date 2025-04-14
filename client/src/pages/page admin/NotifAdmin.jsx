import "../../PagesStyles/Pages Admin Styles/NotifAdmin.css"
import {useState,useEffect} from "react"
import Collaboration from "../../components/popUpsNotif/Collaboration"
import ConflitRes from "../../components/popUpsNotif/ConflitRes"
import SearchBar from "../../components/SearchBar/SearchBar"
import SideNav from "../../components/SideNav/SideNav"
import SideNavAdmin from "../../components/SideNav/SideNavAdmin"
import Validation from "../../components/popUpsNotif/Validation"
import Validation2 from "../../components/popUpsNotif/Validation2"


import imjjjjjj from "../../assets/person.png"


function NotifAdmin() {

    const [notificationsConflit, setNotificationsConflit] = useState([
        { id: "1", type: "expert", seen: false, imge: imjjjjjj, user: "Aliouche Ghazine", time: "1min", button: "Détails" },
        { id: "2", type: "expert", seen: false, imge: imjjjjjj, user: "Souames Manel", time: "2min", button: "Détails" },
        { id: "3", type: "expert", seen: false, imge: imjjjjjj, user: "Yahia Lina", time: "4min", button: "Détails" },
    ]);   
    const [notificationsCol, setNotificationsCol] = useState([
        { seen: false, id: "4", type: "visiteur", imge: imjjjjjj, user: "Rahim Sarah", time: "1min", button: "Détails" },
        { seen: false, id: "5", type: "visiteur", imge: imjjjjjj, user: "Rachem Mohamed Riadh", time: "2min", button: "Détails" },
        { seen: false, id: "6", type: "visiteur", imge: imjjjjjj, user: "Haddad Amina", time: "4min", button: "Détails" },
        { seen: false, id: "7", type: "visiteur", imge: imjjjjjj, user: "Rahim Sarah", time: "1min", button: "Détails" },
        { seen: false, id: "8", type: "visiteur", imge: imjjjjjj, user: "Rachem Mohamed Riadh", time: "2min", button: "Détails" },
        { seen: false, id: "9", type: "visiteur", imge: imjjjjjj, user: "Haddad Amina", time: "4min", button: "Détails" },
        { seen: false, id: "10", type: "visiteur", imge: imjjjjjj, user: "Rahim Sarah", time: "1min", button: "Détails" },
        { seen: false, id: "11", type: "visiteur", imge: imjjjjjj, user: "Rachem Mohamed Riadh", time: "2min", button: "Détails" },
        { seen: false, id: "12", type: "visiteur", imge: imjjjjjj, user: "Haddad Amina", time: "4min", button: "Détails" },
        { seen: false, id: "13", type: "visiteur", imge: imjjjjjj, user: "Rahim Sarah", time: "1min", button: "Détails" },
        { seen: false, id: "14", type: "visiteur", imge: imjjjjjj, user: "Rachem Mohamed Riadh", time: "2min", button: "Détails" },
        { seen: false, id: "15", type: "visiteur", imge: imjjjjjj, user: "Haddad Amina", time: "4min", button: "Détails" },
    ]); 
    
    
    const handleSeenConflit = (id,type) => {
        if (type === "expert") {
        const updated = notificationsConflit.map(n =>
            n.id === id ? { ...n, seen: true } : n
        );
        setNotificationsConflit(updated)}

        else if (type === "visiteur") {
            const updated = notificationsCol.map(n =>
                n.id === id ? { ...n, seen: true } : n
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
                            <p className="notif-message-notifAd"><span className="userName">{element.user}</span> souhaite créer un compte {element.type}</p>
                            </div>
                            <div className="notwtabwdom-notifAd">
                            <span className="notif-time-notifAd">{element.time}</span>
                            <button className="det-button-notifAd" onClick={() => {handleDetailsClick(element.type);handleSeenConflit(element.id,"expert")}}>
                                {element.button}
                            </button>
                            </div>
                            {<Validation2 popUp={poop3} close={close3}/>}
                        </div>
                        ))}


                        {col && notificationsCol.map(element => (
                            <div key={element.id} className="note-notifAd" style={{ background: element.seen ? '#f1f1f1' : 'white' }}>
                            <div className="iconwmessage-notifAd">
                            <img className="notif-icon-notifAd" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-notifAd"><span className="userName">{element.user}</span> souhaite créer un compte {element.type} </p>
                            </div>
                            <div className="notwtabwdom-notifAd">
                            <span className="notif-time-notifAd">{element.time}</span>
                            <button className="det-button-notifAd" onClick={()=>{handleDetailsClick(element.type); handleSeenConflit(element.id,"visiteur")}}>{element.button}</button>
                            </div>
                        {<Validation popUp={poop} close={close}/>}
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