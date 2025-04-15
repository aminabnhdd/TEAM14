    import "../../PagesStyles/Pages Admin Styles/ListProjets.css"
    import {useState,useEffect} from "react"
    import SearchBar from "../../components/SearchBar"
    import SideNavAdmin from "../../components/SideNav/SideNavAdmin"

    import imjjjjjj from "../../assets/person.png"
    import imjjjjjjjjj from "../../assets/mingcute_file-line.svg"
    import axios from 'axios'
    import { useNavigate } from "react-router-dom"
    import AuthContext from '../../helpers/AuthContext'
    import { useContext } from "react"


    function LsProjets() {

        const {authState,setAuthState} = useContext(AuthContext);
        const navigate = useNavigate();

        const [notificationsConflit, setNotificationsConflit] = useState([]);
          
          
        const [searchQuery, setSearchQuery] = useState("");
        const filteredNotifications = notificationsConflit.filter((notif) =>
            notif.titre.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const handleSeenProjet = (id) => {
            const updated = notificationsConflit.map(n =>
              n.id === id ? { ...n, seen: true } : n
            );
            setNotificationsConflit(updated);
          };

        useEffect(()=>{
            axios.get("http://localhost:3001/refresh", { withCredentials: true })
            .then((res) => {
                if (res.data.error) return navigate("/connexion")
                setAuthState({email:res.data.email,role:res.data.role,accessToken:res.data.accessToken});
            axios.get("http://localhost:3001/admin/search/projects",{headers: {Authorization: `Bearer ${res.data.accessToken}`}})
            .then((res)=>{
                console.log(res.data)
                setNotificationsConflit(res.data.map((el) => ({...el, seen: false,imge:imjjjjjjjjj,tab:imjjjjjj,owner:`${el.chef.nom} ${el.chef.prenom}`})));
            })
            .catch((error)=>{
                console.error("Error fetching experts:", error);
            })
        })
        .catch((error)=>{
            console.error("Error fetching refresh token:", error);
            navigate("/connexion")
        })
        },[])

    return(

        <div className="main-notif-lsPrjct">
            <div className="navigation-bar-lsPrjct">
                <SideNavAdmin />
            </div>
            <div className="secondary-notif-lsPrjct">
                    <div className="teqsam1">
                    <div className=" textos-lsPrjct">
                        <h1 className="hnotif">Listes des projets</h1>
                        <div>
                        <p className="pnotif-lsPrjct">Gérez les projets. Examinez chaque ressource, visualisez le chef du projet, les <br />
                        collaborateurs et gardez un œil sur le projet.</p>
                        </div>
                    </div>
                <SearchBar onSearch={setSearchQuery} title="Rechercher un Projet"/>

                <div className="second-div-lsPrjct">
                    <div className="final-div-lsPrjct">
                        
                        <div className="notifications-lsPrjct">
                            
                            { filteredNotifications.map(element => (
                                <div className="note-lsPrjct" key={element.id} style={{ background: element.seen ? "#f1f1f1" : "white" }}>
                                <div className="iconwmessage-lsPrjct">
                                <img className="notif-icon-lsPrjct" src={element.imge} alt="Notification Icon" />
                                <p className="notif-message-lsPrjct">{element.titre}</p>
                                </div>
                                <div className="notwtabwdom-lsPrjct">
                                <div className="tabwdom-lsPrjct">
                                <img className="tab-lsPrjct" src={element.tab}></img>
                                <p className="dom-lsPrjct">{element.owner}</p>
                                </div>
                                <button className="det-button-lsPrjct" onClick={() => handleSeenProjet(element.id)}>
                                    Voir Projet
                                </button>
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

    export default LsProjets