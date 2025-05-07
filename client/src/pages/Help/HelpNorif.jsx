

import SideNav from "../../components/SideNav"
import "../../PagesStyles/Help Styles/HelpNotifStyles.css"
import desktop2 from "../../assets/notif.png"
import desktop3 from "../../assets/Desktop - 40 (3).png"
import desktop4 from "../../assets/Desktop - 40 (2).png"
import desktop5 from "../../assets/Desktop - 40 (5).png"
import desktop6 from "../../assets/Desktop - 40 (19).png"
import desktop7 from "../../assets/Screenshot 2025-05-07 031133 copy.png"


function HelpNotif () {
    return(
        <div className="main-help2">
        <div className="space5">
                <SideNav/>
        </div>
    <div className="rest-help2">
        
   
    <Section title="Que sont les types de notifications ? ">
      <p className="inforp2">Il existe 3 types de notifications: <strong> Conflits</strong>,<strong> Demandes de collaboration </strong> et <strong> Mes demandes</strong></p>
      <img src={desktop2} alt="ol" className="not"/>
      <ul className="ow2">
        <li className="lili2">Conflit 
          <ul className="ow3">
            <li>
          <span className="label">Conflit signalé global :</span>
          <span className="explique"> Une notification envoyée aux utilisateurs concernés par le conflit (le chef de projet, le signaleur et l’expert de discipline).</span>
          <img src={desktop3} alt="nil" />
          </li>
            <li >
            <span className="label">Conflit signalé au chef du projet :</span>
            <span className="explique"> Une notification visible seulement par le chef de projet,Si'l accepte le conflit signalé, il doit alors choisir la date et l’heure pour organiser une réunion. Une fois la date et l’heure choisies, toutes les personnes concernées par le conflit (le chef de projet, le signaleur et l’expert de discipline) recevront un e-mail concernant la réunion organisée sur Google Meet
            </span>
            <img src={desktop4} alt="h" />
            <span className="explique" style={{marginBottom:"35px"}}><strong>Remarque:</strong> La date et l’heure par défaut pour la réunion Meet sont fixées au prochain week-end à 10h. </span>
            </li>
            <li>
              <span className="label">Conflit Résolu :</span>
              <span className="explique">Une notification qui s'affiche quand un conflit est resolu</span> 
              <img src={desktop5} alt=""  style={{marginBottom:"25px"}}/>
            </li>
          </ul>
        </li>
        <li className="lili2">Demandes de collaboration
              <span className="explique" style={{marginTop:"15px"}}>Il s'agit du traitement (Acceptation ou refus) des demandes de collaboration envoyées par les autres experts au chef de projet</span>
              <img src={desktop6} alt="" />
        </li>
        <li className="lili2">Mes demandes
          <span className="explique">Il s'agit du traitement (Acceptation ou refus) des demandes de collaboration envoyées par les autres experts au chef de projet</span>
        </li>
        <img src={desktop7} alt="" />
      </ul>
    </Section>

  </div>
  </div>
);
};

const Section = ({ title, children }) => (
<div className="help-section">
  <h2 className="section-title">{title}</h2>
  {children}
</div>
);



export default HelpNotif