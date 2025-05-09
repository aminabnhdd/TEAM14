

import SideNav from "../../components/SideNav"
import "../../PagesStyles/Help Styles/HelpNotifStyles.css"
import desktop2 from "../../assets/Screenshot 2025-05-10 174616.png"
import desktop3 from "../../assets/Group 17.jpg"
import desktop4 from "../../assets/Group 21.jpg"
import desktop5 from "../../assets/Group 19.jpg"
import desktop6 from "../../assets/Group 22.jpg"
import desktop7 from "../../assets/Group 23.jpg"


function HelpNotif () {
    return(
        <div className="main-help2">
        <div className="space5">
                <SideNav/>
        </div>
    <div className="rest-help2">
        
   
    <Section title="Que sont les types de notifications ? ">
      
      <ul className="ow2">
        <p> 
          <p className="inforp3">1.Conflit </p> 
      <img src={desktop2} alt="ol" className="not" style={{marginTop:"20px"}}/>
      <p className="inforp" style={{fontWeight:"normal",marginBottom:"20px"}}>- Il existe <strong>3</strong> types de notifications affichées sur la page dédiée aux conflits.</p>
          <ul className="ow3">
            <p>
          <span className="label" style={{textDecoration:"underline"}}><strong> Type 1 — Notification de conflit (à destination du chef de projet)</strong></span>
          <span className="explique">Ce type de notification est destiné au chef de projet.</span>
          <img src={desktop3} alt="nil"  style={{margin:"auto",marginBottom:"30px",width:"80%",marginTop:"20px"}} />
          <p className="inforp" >Elle signale l’existence d’un <strong>conflit</strong> sur une contribution et contient les informations suivantes :</p>
          <ul className="ow2" style={{listStyleType: 'disc'}}>
            <li className="lili" style={{marginBottom:"3px"}}>Le profil du signaleur</li>
            <li className="lili" style={{marginBottom:"3px"}}>La section concernée (lien)</li>
            <li className="lili" style={{marginBottom:"25px"}}>Le contenu du conflit</li>
          </ul>
          <p className="inforp" >Si l’expert valide la notification, il doit <strong>programmer une réunion</strong> en sélectionnant une date et une heure. Cette réunion permettra de discuter du conflit avec les personnes concernées :</p>
          <ul className="ow2" style={{listStyleType: 'disc'}}>
            <li className="lili" style={{marginBottom:"3px"}}>Le profil du signaleur</li>
            <li className="lili" style={{marginBottom:"25px"}}>Le contenu du conflit</li>
          </ul>
          <p className="inforp"><strong>Remarques :</strong></p>
          <ul className="ow2" style={{listStyleType: 'disc'}}>
            <li className="lili" style={{marginBottom:"3px"  ,fontWeight:"normal"}}>La <strong>date et l’heure par défaut</strong> sont fixées au <strong>prochain week-end à 10h.</strong></li>
            <li className="lili" style={{marginBottom:"25px" ,fontWeight:"normal"}} >L’expert ne peut pas sélectionner une date antérieure à la date actuelle.</li>
          </ul>
          <br />
          </p>
            <p>
            <span className="label" style={{textDecoration:"underline"}}><strong>Type 2 — Invitation à une réunion de résolution de conflit</strong></span>
            <br />
            <br />
            
            <span className="inforp"> Lorsque le chef de projet valide le conflit, une notification est envoyée à toutes les personnes concernées (le chef de projet, le signaleur et l’expert de la discipline où le conflit a eu lieu).
            </span>
            <br />
            <br />
            <p className="inforp">Elle permet de consulter les informations suivantes :</p>
            <ul className="ow2" style={{listStyleType: 'disc'}}>
            <li className="lili" style={{marginBottom:"3px" ,fontWeight:"normal"}}>Le profil du signaleur</li>
            <li className="lili" style={{marginBottom:"3px" ,fontWeight:"normal"}}>La section concernée</li>
            <li className="lili" style={{marginBottom:"25px",fontWeight:"normal"}}>Le contenu du conflit</li>
          </ul>
            <p className="inforp">En cliquant sur <strong>« Lien vers meet »</strong>, l’utilisateur est redirigé vers la réunion Google Meet planifiée.</p>
            <br />
            <img src={desktop4} alt="h" style={{width:"80%",margin:"auto"}} />
            <br /><br />
            </p>
            <p>
              <span className="label" style={{textDecoration:"underline"}}><strong>Type 3 — Résolution du conflit</strong></span>
              <br />
              <br />
              <span className="inforp">À l’issue d’une séance de concertation via Google Meet, si les experts considèrent que le conflit est résolu, une notification est envoyée aux personnes concernées.</span> 
              <br />
              <br />
              <img src={desktop5} alt=""   style={{width:"80%",margin:"auto"}}/>
            </p>
          </ul><br /><br />
        </p>
        <p>
          <p className="inforp3">2.Demandes de collaboration</p>
              <span className="inforp" > 
                Ce type de notification est destiné au chef de projet.</span>
              <span className="inforp" > <br />
              Il s’agit du traitement (acceptation ou refus) des demandes de collaboration envoyées par d’autres experts.</span>
              <span className="inforp" > <br />
              La notification permet au chef de projet de consulter l’identité de l’expéditeur ainsi que le projet concerné.</span>
              <br />
              <br />
              
              <img src={desktop6} alt="" style={{width:"80%",margin:"auto"}} />
              <br />
              <br />
        </p>
        <p>
          <p className="inforp3">3.Mes demandes</p>
          <span className="inforp">Cette notification informe l’expert si sa demande de collaboration a été acceptée ou refusée par le chef de projet. Elle permet également de consulter le nom du projet concerné.</span>
        </p>
        <br />  
        <img src={desktop7} alt="" style={{width:"80%",margin:"auto"}}/>
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