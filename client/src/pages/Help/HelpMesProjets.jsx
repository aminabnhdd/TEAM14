

import SideNav from "../../components/SideNav"
import "../../pagesStyles/Help Styles/HelpNotifStyles.css"
import desktop3 from "../../assets/Screenshot 2025-05-08 233203.png"
import desktop4 from "../../assets/Screenshot 2025-05-08 224455.png"
import desktop5 from "../../assets/Screenshot 2025-05-08 235532.png"
import desktop6 from "../../assets/Screenshot 2025-05-09 001634.png"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function HelpMesProjets () {

  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

    return(
        <div className="main-help2">
        <div className="space5">
                <SideNav/>
        </div>
    <div className="rest-help2">
        
    <Section title="Comment accéder à mes projets ?">
      <p className="inforp2">Vous pouvez accéder à vos projets, ainsi qu'aux projets auxquels vous collaborez, en cliquant sur l'icône <strong>Mes projets</strong> dans la barre de navigation.</p>
      <img src={desktop4} alt="ol" className="not" style={{marginBottom:"0"}}/>
      
    </Section>
    <Section title="Comment créer un projet ?" id="creation">
        <ul className="ow" >
            <li className="lili">Cliquez sur <strong>Créer un nouveau projet</strong></li>
            <li className="lili">Entrer les informations de votre nouveau projet</li>
            <li className="lili">Cliquez sur <strong>Créer le projet</strong></li>
        </ul>
        <br />
      <img src={desktop3} alt="ol" className="not" style={{marginBottom:"0"}}/>
      <br />
      <p className="inforp"><strong>Remarque: </strong><br/> Vous pouvez ajouter des mots clès pour faciliter la recherche dans la page <strong>Découvrir</strong> </p>
      <img src={desktop5} alt="" style={{width:"55%"}} />
      
    </Section>
    <Section title="Comment restaurer un projet ?" id="restore">
      <p className="inforp2">En cliquant sur <strong>Restaurer un projet</strong>, l’expert accède à deux types de restauration: </p>
      <ul className="ow">
        <li className="lili"><strong>Restaurer un projet archivé :</strong> permet de récupérer un projet précédemment archivé </li>
        <li className="lili"><strong>Restaurer localement :</strong> permet d’importer un projet sauvegardé sur l’ordinateur.</li>
        <li className="lili"><strong>Restaurer via Google Drive (externe) : </strong> permet de récupérer un projet stocké sur Google Drive.</li>
      </ul>
      <img src={desktop6} alt="ol" className="not" style={{marginBottom:"0"}}/>
      
    </Section>

  </div>
  </div>
);
};

const Section = ({ title, children, id }) => (
  <div className="help-section" id={id}>
    <h2 className="section-title">{title}</h2>
    {children}
  </div>
);




export default HelpMesProjets