    import "../../PagesStyles/Pages Admin Styles/ListProjets.css"
    import {useState} from "react"
    import SearchBar from "../../components/SearchBar/SearchBar"
    import SideNavAdmin from "../../components/SideNav/SideNavAdmin"

    import imjjjjjj from "../../assets/person.png"
    import imjjjjjjjjj from "../../assets/mingcute_file-line.svg"

    function LsProjets() {

        const [notificationsConflit, setNotificationsConflit] = useState([
            { id: "1", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "khdawej al 3emya", tab: imjjjjjj, owner: "Benhaddad Amina", button: "Voir projet" },
            { id: "2", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "Azeffoun", tab: imjjjjjj, owner: "Rachem Mohamed Ryad", button: "Voir projet" },
            { id: "3", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "Bab zouar", tab: imjjjjjj, owner: "Rachem Ryad Mohamed", button: "Voir projet" },
            { id: "4", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "li jat", tab: imjjjjjj, owner: "Aliouche Razine", button: "Voir projet" },
            { id: "5", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "khdawej al 3emya", tab: imjjjjjj, owner: "Benhaddad Amina", button: "Voir projet" },
            { id: "6", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "Azeffoun", tab: imjjjjjj, owner: "Rachem Mohamed Ryad", button: "Voir projet" },
            { id: "7", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "Bab zouar", tab: imjjjjjj, owner: "Rachem Ryad Mohamed", button: "Voir projet" },
            { id: "8", seen: false, type: "projet", imge: imjjjjjjjjj, titre: "li jat", tab: imjjjjjj, owner: "Aliouche Razine", button: "Voir projet" },
            // ... continue like this for the rest
          ]);
          
          
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

    return(

        <div className="main-notif-lsPrjct">
            <div className="navigation-bar-lsPrjct">
                <SideNavAdmin />
            </div>
            <div className="secondary-notif-lsPrjct">
                    <div className="teqsam1">
                    <div className=" textos-lsPrjct">
                        <h1 className="hnotif-lsPrjct">Listes des projets</h1>
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
                                    {element.button}
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