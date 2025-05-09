import SideNav from "../../components/SideNav"
import "../../PagesStyles/Help Styles/HelpEditeur.css"

import desktop1 from "../../assets/Group 3 (1).jpg"
import desktop2 from "../../assets/Group 5.jpg"
import desktop3 from "../../assets/Group 4.jpg"
import desktop4 from "../../assets/Group 6.jpg"
import desktop5 from "../../assets/Group 7.jpg"
import desktop6 from "../../assets/Desktop - 40 (20).png"
import desktop7 from "../../assets/Group 9.jpg"
import desktop8 from "../../assets/Group 1.jpg"
import desktop9 from "../../assets/Group 2.jpg"
import desktop10 from "../../assets/Group 8.jpg"
import desktop20 from "../../assets/Screenshot 2025-05-08 062058.png"
import desktop30 from "../../assets/Group 11.jpg"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function HelpEditeur () {
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
        
    <Section title="Comment accéder à la page Editer Section ?">
  
    <p className="inforp" >
    La page éditeur d’ATHAR se divise en deux sections principales : une section pour l’édition du contenu et une autre pour la galerie associée. Le type de section est affiché en haut de la page, tandis que le bouton Sauvegarder se trouve en bas. Elle est accessible via le bouton <strong>editer</strong> situé en face du titre de la section.
    </p>
    <img src={desktop6} alt="oww" style={{height:"60%",width:"50%",margin:"auto"}}  />
    </Section>


    <Section title="Comment est l'interface d'édition ?" className="isemryadh" id="fonct">
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
        <br />
        <br />
        <li className="lili"><strong>Liens : </strong>En cliquant sur Insérer un lien, une fenêtre pop-up s’ouvre, permettant d’ajouter une URL. Une fois le lien inséré, il apparaît souligné et en couleur. Il est également possible de le modifier ou de le supprimer ultérieurement.</li>
        <img src={desktop1} alt="" style={{width:"90%",margin:"auto"}} />
        <br /><br />
        <li className="lili" ><div style={{marginBottom:"2px"}}><strong>Références : </strong>L’ajout d’une référence ouvre une fenêtre pop-up dans laquelle vous pouvez soit :</div>
        
          <ul style={{ listStyleType: 'circle', marginLeft: '50px' }}>
            <li className="lili" style={{fontSize:"16px",marginBottom:"0px"} }>entrer une nouvelle référence en renseignant le titre, l’auteur, la date de publication.</li>
            <li className="lili" style={{fontSize:"16px",marginBottom:"20px"}}>soit choisir une référence déjà existante.</li>
          </ul>
        </li>
          <p className="inforp">Une fois insérée, la référence apparaît sous forme de numéro dans le texte. Cliquer sur ce numéro vous redirige automatiquement vers l’entrée correspondante dans la section des références.</p>
          <img src={desktop3} alt="" style={{width:"90%",margin:"auto"}} />
          <br />
          <br />
          <li className="lili"><strong> Illustrations et vidéos : </strong>
          L’insertion d’illustrations ou de vidéos se fait localement depuis l’ordinateur de l’utilisateur. Lors de l’insertion, une fenêtre pop-up s’ouvre pour permettre d’ajouter une légende (caption). Une fois insérés, les médias peuvent être déplacés et alignés à gauche, au centre ou à droite dans le contenu.</li>
          <img src={desktop2} alt="" style={{width:"90%",margin:"auto"}} />
          <br /><br />
          <li className="lili"><div style={{marginBottom:"10px"}}><strong>Tableaux : </strong>
          L’éditeur permet d’insérer des tableaux personnalisables. Il est possible d’ajouter ou de supprimer des lignes et des colonnes, avant ou après une cellule sélectionnée. On peut également : </div>
          <ul style={{ listStyleType: 'circle', marginLeft: '50px' }}>
            <li className="lili" style={{fontSize:"16px",marginBottom:"0px"}} >basculer une ligne en tant qu’en-tête.</li>
            <li className="lili" style={{fontSize:"16px",marginBottom:"0px"}} >supprimer une cellule, une ligne, une colonne ou le tableau entier.</li>
            <li className="lili" style={{fontSize:"16px",marginBottom:"0px"}} >fusionner ou diviser des cellules selon les besoins de mise en page.</li>
          </ul>
          </li>
          
          <img src={desktop4} alt="" style={{width:"90%",margin:"auto"}} />
          <br /><br /><br />
          <span className="inforp"><strong> Section galerie </strong> </span>
          <p className="inforp">Cette section permet d’ajouter des photos pour illustrer la section en cours. Il est possible de :</p>
          <ul style={{ listStyleType: 'circle', marginLeft: '50px' }}>
            <li className="lili" style={{fontSize:"16px",marginBottom:"0px"}}>ajouter des photos depuis l’appareil de l’utilisateur.</li>
            <li className="lili" style={{fontSize:"16px",marginBottom:"0px"}}>supprimer des photos individuellement si nécessaire.</li>
          <br />
          </ul>
          <ul>
          <img src={desktop5} alt="" style={{width:"90%",margin:"auto"}}/>
          <br />
            <li className="lili" ><div style={{marginBottom:"8px"}}> En <strong>cliquant sur une image</strong>, une visionneuse s’ouvre, permettant :</div>
              <ul style={{ listStyleType: 'square', marginLeft: '50px'}}>
                <li>de faire défiler les images vers la gauche ou la droite.</li>
                <li >de zoomer et dézoomer.</li>
                <li className="lili">de télécharger l’image affichée</li>
              </ul>
            </li>
            <img src={desktop10} alt="" style={{width:"60%",margin:"auto"}} />
          </ul>
      </ul>
    </Section>

    <Section title="Comment accéder à la page Annoter Section ?" >
    <p className="inforp">La page Annoter Section est divisée en trois sections principales :<strong> Contenu, Galerie, Annotations / Conflits.</strong>  Elle est accessible via le bouton editer situé en face du titre de la section. Un bouton “Retourner au projet” est également disponible pour revenir facilement à la vue principale du projet.</p>   
    <img src={desktop20} alt="" style={{height:"60%",width:"50%",margin:"auto"}}/>
    <br />
      <ul className="ow">
        <li className="lili">L’expert peut <strong>signaler un conflit</strong> s’il détecte des informations contradictoires ou erronées dans le contenu.</li>
        <li className="lili">Il peut également <strong>ajouter une annotation.</strong></li>
        <li className="lili">Dans la section Galerie, il est possible de cliquer sur une icône dédiée pour naviguer vers l’annotation assistée par IA sur une image spécifique.</li>
      </ul>
      <br />
      <p className="inforp">Dès qu’une annotation ou un conflit est disponible, la section Annotations / Conflits devient <strong>dépliable</strong> ou <strong>repliable</strong>, permettant à l’utilisateur d’afficher ou de masquer la liste des éléments concernés pour la section en cours.</p>
    </Section>

    <Section title="Comment ajouter une annotation ?" id="annoter">
  <div style={{ overflow: "hidden" }}>
    <img
      src={desktop7}
      alt="annotation"
      style={{
        float: "right",
        width: "50%",
        height: "auto",
        marginLeft: "20px",
        marginBottom: "10px"
      }}
    />
    <ul className="ow" style={{listStyleType: 'number'}}>
      <li className="lili">Sélectionnez un passage de texte dans le contenu</li>
      <li className="lili">Cliquez sur Ajouter une annotation</li>
      <li className="lili">Une pop-up s’ouvre pour saisir le texte de l’annotation</li>
      <li className="lili" style={{marginBottom:"20px"}}>Cliquez sur Ajouter</li>
    </ul>
    <p className="inforp"> Après validation : </p>
    <ul className="ow" style={{listStyleType: 'disc'}}>
      <li className="lili">L’annotation apparaît dans la section Annotations / Conflits </li>
      <li className="lili">Le texte sélectionné est surligné en couleur</li>
      <li className="lili">Une pop-up s’ouvre pour saisir le texte de l’annotation</li>
      <li className="lili">Cliquez sur Ajouter</li>
    </ul>
  </div>
</Section>

    <Section title="Comment ajouter un conflit ?" id="conflit">
  <div style={{ overflow: "hidden" }}>
    <img
      src={desktop30}
      alt="annotation"
      style={{
        float: "right",
        width: "50%",
        height: "auto",
        marginLeft: "20px",
        marginBottom: "10px"
      }}
    />
    <ul className="ow" style={{listStyleType: 'number'}}>
      <li className="lili">Cliquez sur Signaler un conflit</li>
      <li className="lili">Entrez une description du conflit dans la pop-up qui s’ouvre</li>
      <li className="lili" style={{marginBottom:"20px"}}>Cliquez sur Signaler</li>
    </ul>
    <p className="inforp"> Une fois signalé : </p>
    <ul className="ow" style={{listStyleType: 'disc'}}>
      <li className="lili">Une notification est envoyée au chef de projet pour qu’il examine le conflit </li>
      <li className="lili">Le conflit n’apparaît pas immédiatement dans la section Annotations / Conflits</li>
      <li className="lili">Il n’est affiché que si le chef de projet le valide et l’accepte</li>
      <li className="lili">Si l’expert est soit le chef de projet soit le signaleur, il peut cliquer sur “Résoudre le conflit” s’il estime que le problème a été réglé</li>
    </ul>
  </div>
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



export default HelpEditeur 