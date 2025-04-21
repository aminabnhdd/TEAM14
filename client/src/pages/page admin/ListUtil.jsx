import "../../PagesStyles/Pages Admin Styles/ListUtil.css"
import {useState,useEffect, useContext} from "react"
import SearchBar from "../../components/SearchBar"
import SideNavAdmin from "../../components/SideNav/SideNavAdmin"

import imjjjjjj from "../../assets/person.png"
import axios from "axios"
import AuthContext from '../../helpers/AuthContext'
import { useNavigate } from "react-router-dom"


function ListUtil() {

    const {authState,setAuthState} = useContext(AuthContext);


    const [notificationsConflit, setNotificationsConflit] = useState([]) 
    const [notificationsCol , setNotificationsCol] = useState([])
    const navigate = useNavigate();

    const handleSeenProjet = (id,type) => {
        if (type === "expert") {
        const updated = notificationsConflit.map(n =>
          n._id === id ? { ...n, seen: true } : n
        );
        setNotificationsConflit(updated);
    }else if (type === "visiteur") {
        const updated = notificationsCol.map(n =>
          n._id === id ? { ...n, seen: true } : n
        );
        setNotificationsCol(updated);
    }
      };

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
        axios.get("http://localhost:3001/refresh", { withCredentials: true })
        .then((res) => {
            // if (res.data.error) return navigate("/connexion")
            setAuthState({email:res.data.email,role:res.data.role,accessToken:res.data.accessToken});
            axios.get("http://localhost:3001/admin/search/experts",{headers: {Authorization: `Bearer ${res.data.accessToken}`}})
            .then((res)=>{
                console.log(res.data)
                setNotificationsConflit(res.data.map((el) => ({...el, seen: false,type:"expert",imge:imjjjjjj,util:`${el.nom} ${el.prenom}`,dom:`Expert en ${el.discipline}`})));
            })
            .catch((error)=>{
                console.error("Error fetching experts:", error);
            })
            axios.get("http://localhost:3001/admin/search/visitors",{headers: {Authorization: `Bearer ${res.data.accessToken}`}})
            .then((res)=>{
                console.log(res.data)
                setNotificationsCol(res.data.map((el) => ({...el, seen: false,imge:imjjjjjj,util:`${el.nom} ${el.prenom}`,type:"visiteur"})));
            })
            .catch((error)=>{
                console.error("Error fetching experts:", error);
            })
        })
        .catch((error)=>{
            console.error("Error fetching refresh token:", error);
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

const [conflit,setConflit] = useState(true)
const [col,setCol] = useState(false)



    

 return(

    <div className="main-notif">
        <div className="navigation-bar-LsUtil">
                <SideNavAdmin />
            </div>
            <div className="secondary-notif-LsUtil">
                    <div className="teqsam1">
                    <div className=" textos-LsUtil">
                        <h1 className="hnotif">Listes des utilisateurs</h1>
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
                            <div className="note-LsUtil1" key={element._id} style={{ background: element.seen ? "#f1f1f1" : "white" }}>
                            <div className="iconwmessage-LsUtil1">
                            <img className="notif-icon-LsUtil1" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-LsUtil1">{element.util}</p>
                            </div>
                            <div className="notwtabwdom-LsUtil1">
                            <div className="tabwdom-LsUtil1">
                            <p className="dom-LsUtil1">{element.dom}</p>
                            </div>
                            <button className="det-button-LsUtil1" onClick={( ) => {handleSeenProjet(element._id,"expert");navigate(`/desactiver-expert/${element._id}`)}}>
                                Voir Compte
                            </button>
                            </div>
                            
                            
                        </div>
                        ))}

                        {col && filteredNotifications1.map(element => (
                            <div className="note-LsUtil2" key={element._id} style={{ background: element.seen ? "#f1f1f1" : "white" }}>
                            <div className="iconwmessage-LsUtil2">
                            <img className="notif-icon-LsUtil1" src={element.imge} alt="Notification Icon" />
                            <p className="notif-message-LsUtil2">{element.util}</p>
                            </div>
                            <div className="notwtabwdom-LsUtil2">
                            <button className="det-button-LsUtil1" onClick={( ) => {handleSeenProjet(element._id,"visiteur");navigate(`/desactiver-expert/${element._id}`)}} >Voir Compte</button>
                            </div>
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

export default ListUtil