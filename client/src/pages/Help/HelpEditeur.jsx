import SideNav from "../../components/SideNav"
import "../../PagesStyles/Help Styles/HelpEditeur.css"

import desktop6 from "../../assets/Desktop - 40 (20).png"
import desktop7 from "../../assets/Group 9.jpg"
import desktop8 from "../../assets/Group 1.jpg"
import desktop9 from "../../assets/Group 2.jpg"

function HelpEditeur () {
    return(
        <div className="main-help2">
        <div className="space5">
                <SideNav/>
        </div>
    <div className="rest-help2">
        
    <Section title="Comment accéder à la page Editeur ?">
  
    <p className="inforp" >
    La page éditeur d’ATHAR se divise en deux sections principales : une section pour l’édition du contenu et une autre pour la galerie associée. Le type de section est affiché en haut de la page, tandis que le bouton Sauvegarder se trouve en bas. Elle est accessible via le bouton <strong>editer</strong> situé en face du titre de la section.
    </p>
    <img src={desktop6} alt="oww" style={{height:"60%",width:"50%",margin:"auto"}}  />
    </Section>


    <Section title="Comment est l'interface d'édition ?" className="isemryadh">
      <img src={desktop8} alt="" className="idono"/>
      <ul className="ow">
        <span className="inforp"><strong> Section édition </strong> </span>
        <br />
        <br />
        <li className="lili"><strong>Mise en forme du texte :</strong> <i> italique</i>,<u> souligné</u>,<b> gras</b> , <del> barré</del></li>
        <li className="lili"><strong>Gestion des titres :</strong> Titre 1, Titre 2, Titre 3</li>
        <li className="lili"><strong>Listes :</strong> liste ordonnée, liste non ordonnée</li>
        <li className="lili"><strong>Outils de modification :</strong> annuler, rétablir</li>
        <li className="lili"><strong> Structure de texte :</strong> paragraphe, citation</li>
        <br />
        <br />
        <li className="lili"><strong> Alignement du texte :</strong> alignement à gauche, à droite, centré et justifié</li>
        <img src={desktop9} alt="" style={{width:"50%",marginLeft:"2px"}} />

      </ul>





    </Section>
    <Section title="Comment ajouter une annotation ?">
      <img src={desktop7} alt="ol"  style={{float:"right",height:"60%",width:"50%",margin:"auto"}} />
      <ul className="ow">
        <li className="lili">Sélectionnez un passage de texte dans le contenu.</li>
        <li className="lili">Cliquez sur Ajouter une annotation.</li>
        <li className="lili">Une pop-up s’ouvre pour saisir le texte de l’annotation.</li>
        <li className="lili">Cliquez sur Ajouter .</li>
       
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



export default HelpEditeur 