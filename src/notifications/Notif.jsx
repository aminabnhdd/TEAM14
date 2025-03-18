import "../notifications styles/Notif.css"
import im from "../assets/material-symbols_search.svg"
import imj from "../assets/gg_profile.svg"

function Notif() {

 return(

    <div className="main-notif">
        <div className="navigation-bar">

        </div>
        <div className="secondary-notif">

            <div className="search-div">

                <div className="search-bar">
                    <img className="imgrecherche" src={im} />
                    <p className="p-recherche">Rechercher un projet</p>
                </div>
                <img className="imgprofil" src={imj} />

            </div>

            <div className="second-div">
                <div className=" textos">
                    <h1 className="hnotif">Notifications</h1>
                    <p className="pnotif">Un conflit a été détecté ? Retrouvez ici toutes les notifications concernant les divergences</p>
                    <p className="pnotif">dans les contributions et prenez les décisions appropriées.</p>
                </div>
                <div className="final-div">
                    <div className="transport">

                    </div>
                    <div className="notifications">

                    </div>
                </div>
            </div>
        </div>
    </div>
 )
}

export default Notif