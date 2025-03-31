    import "../../PagesStyles/Pages Admin Styles/ListProjets.css"
    import {useState} from "react"
    import SearchBar from "../../components/SearchBar/SearchBar"
    import SideNavAdmin from "../../components/SideNav/SideNavAdmin"

    import imjjjjjj from "../../assets/person.png"
    import imjjjjjjjjj from "../../assets/mingcute_file-line.svg"

    function LsProjets() {

        const notificationsConflit = [
            {type:"projet",imge:imjjjjjjjjj,titre:"Alger",tab:imjjjjjj,owner:"Benhaddad Amina",button:"Voir projet"},
            {type:"projet",imge:imjjjjjjjjj,titre:"Azeffoun",tab:imjjjjjj,owner:"Rachem Mohamed Ryad",button:"Voir projet"},
            {type:"projet",imge:imjjjjjjjjj,titre:"Bab zouar",tab:imjjjjjj,owner:"Rachem Ryad Mohamed",button:"Voir projet"},
            {type:"projet",imge:imjjjjjjjjj,titre:"li jat",tab:imjjjjjj,owner:"Aliouche Razine",button:"Voir projet"},
            
            
        ]    
        const [searchQuery, setSearchQuery] = useState("");
        const filteredNotifications = notificationsConflit.filter((notif) =>
            notif.titre.toLowerCase().includes(searchQuery.toLowerCase())
        );
    

        
        
        

    return(

        <div className="main-notif-lsPrjct">
            <div className="navigation-bar-lsPrjct">
                <SideNavAdmin />
            </div>
            <div className="secondary-notif-lsPrjct">

                    <div className=" textos-lsPrjct">
                        <h1 className="hnotif-lsPrjct">Listes des projets</h1>
                        <div>
                        <p className="pnotif-lsPrjct">Gérez les projets. Examinez chaque ressource, visualisez le chef du projet, les <br />
                        collaborateurs et gardez un œil sur le projet.</p>
                        </div>
                    </div>
                <SearchBar onSearch={setSearchQuery} title="Rechercher Un Projet"/>

                <div className="second-div-lsPrjct">
                    <div className="final-div-lsPrjct">
                        
                        <div className="notifications-lsPrjct">
                            
                            { filteredNotifications.map(element => (
                                <div className="note-lsPrjct">
                                <div className="iconwmessage-lsPrjct">
                                <img className="notif-icon-lsPrjct" src={element.imge} alt="Notification Icon" />
                                <p className="notif-message-lsPrjct">{element.titre}</p>
                                </div>
                                <div className="notwtabwdom-lsPrjct">
                                <div className="tabwdom-lsPrjct">
                                <img className="tab-lsPrjct" src={element.tab}></img>
                                <p className="dom-lsPrjct">{element.owner}</p>
                                </div>
                                <button className="det-button-lsPrjct">
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
    )
    }

    export default LsProjets