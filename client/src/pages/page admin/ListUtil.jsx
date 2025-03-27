import "../../PagesStyles/Pages Admin Styles/ListUtil.css"
import {useState,useEffect} from "react"
import SearchBar from "../../components/SearchBar/SearchBar"
import SideNav from "../../components/SideNav/SideNav"

import imjjjjjj from "../../assets/person.png"


function ListUtil() {

    const notificationsConflit = [
        
        {type:"expert",imge:imjjjjjj,util:"Benhaddad Amina",dom:"Expert en Architecture",button:"Voir compte"},
        {type:"expert",imge:imjjjjjj,util:"Rahim Sarah",dom:"Expert en Histoire",button:"Voir compte"},
        {type:"expert",imge:imjjjjjj,util:"Souames Rayhane Manel",dom:"Expert en Architecture",button:"Voir compte"},
        {type:"expert",imge:imjjjjjj,util:"Yahiha-Cherif Lina",dom:"Expert en Histoire",button:"Voir compte"},
    ]    
    
    const notificationsCol = [
        {type:"visiteur",imge:imjjjjjj,util:"Rahim Sarah",button:"Voir compte"},
        {type:"visiteur",imge:imjjjjjj,util:"Rachem Riadh",button:"Voir compte"},
        {type:"visiteur",imge:imjjjjjj,util:"l'Aliouche",button:"Voir compte"},
    ]   

    const [searchQuery, setSearchQuery] = useState("");
      
    const filteredNotifications = notificationsConflit.filter((notif) =>
            notif.util.toLowerCase().includes(searchQuery.toLowerCase())
        );
    const filteredNotifications1 = notificationsCol.filter((notif) =>
            notif.util.toLowerCase().includes(searchQuery.toLowerCase())
        );

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

const [conflit,setConflit] = useState(true)
const [col,setCol] = useState(false)



    

 return(

    <div className="main-notif">
        <div className="navigation-bar-LsUtil">
                <SideNav />
            </div>
            <div className="secondary-notif-LsUtil">

                    <div className=" textos-LsUtil">
                        <h1 className="hnotif-LsUtil">Listes des utilisateurs</h1>
                        <div>
                        <p className="pnotif-LsUtil">Gérez les utilisateurs de l’application. Examinez chaque compte et visualisez les détails de l’utilisateur.</p>
                        </div>
                    </div>
                <SearchBar  title="Rechercher un utilisateur" onSearch={setSearchQuery}/>

                

            <div className="second-div-LsUtil">
                <div className="final-div-LsUtil">
                    <div className="transport-LsUtil">
                        <p onClick={click1} className="transptext active" >Experts</p>
                        <p onClick={click2} className="transptext">Visiteurs</p>
                    </div>
                    <div className="line-LsUtil"></div>
                    <div className="notifications-LsUtil">
                        
                        {conflit && filteredNotifications.map(element => (
                            <div className="note-LsUtil1">
                            <div className="iconwmessage-LsUtil1">
                            <img className="notif-icon-LsUtil1" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-LsUtil1">{element.util}</p>
                            </div>
                            <div className="notwtabwdom-LsUtil1">
                            <div className="tabwdom-LsUtil1">
                            <p className="dom-LsUtil1">{element.dom}</p>
                            </div>
                            <button className="det-button-LsUtil1" >
                                {element.button}
                            </button>
                            </div>
                            
                            
                        </div>
                        ))}

                        {col && filteredNotifications1.map(element => (
                            <div className="note-LsUtil2">
                            <div className="iconwmessage-LsUtil2">
                            <img className="notif-icon-LsUtil2" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-LsUtil2">{element.util}</p>
                            </div>
                            <div className="notwtabwdom-LsUtil2">
                            <button className="det-button-LsUtil1" >{element.button}</button>
                            </div>
                        </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    </div>
 )
}

export default ListUtil