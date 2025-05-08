import SideNav from "../../components/SideNav"
import "../../PagesStyles/Help Styles/HelpMonprofil.css"
import desktop2 from "../../assets/Desktop - 44 (3).png"
import desktop4 from "../../assets/Desktop - 44 (1).png"
import desktop5 from "../../assets/Desktop - 45.png"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function HelpMonProfil () {
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
        
    <Section title="Comment accéder à mon compte ?">
  
    <p className="inforp" >
      Une fois connecté, vous pouvez accéder à <strong>votre profil</strong> à tout moment en cliquant sur l'icône de profil située en haut de chaque page.
    </p>
    <img src={desktop4} alt="oww"  />
    </Section>

    <Section title="Comment modifier mes informations ?" id="pinfo">
      <ul className="ow">
        <li className="lili">Connectez-vous à votre compte.</li>
        <li className="lili">Accédez à votre <strong>profil utilisateur</strong>.</li>
        <li className="lili">Cliquez sur <strong>"Modifier"</strong>.</li>
        <li className="lili">Faites les changements souhaités (nom, mot de passe, photo, etc.).</li>
        <li className="lili">Cliquez sur <strong>"Sauvegarder"</strong> pour sauvegarder.</li>
      </ul>
      <img src={desktop2} alt="ol" />
    </Section>

    <Section title="Comment se déconnecter ?">
      <ul className="ow">
        <li className="lili">Cliquez sur votre <strong>icon de profil</strong> en haut de la page.</li>
        <li className="lili">Sélectionnez <strong>"Se déconnecter"</strong>.</li>
      </ul>
      <p className="inforp">Vous serez alors redirigé vers la page d'accueil.</p>
      <img src={desktop5} alt="hh" />
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



export default HelpMonProfil