// Project Visualization Component
// - Displays all project information for viewing
// - Accessible to all users for content viewing
// - Enables collaborators to create, edit, and annotate sections
// - Enables printing projects and saving them
// - Grants experts access to AI-powered features
// - Shows authors of each section with links to their profiles
// - Lets experts request to join as collaborators
// - Enables project leader to edit project details and manage collaborators
// - Allows admin and project leader to archive the project




import SideNav from "../../components/SideNav"
import TitleBar from "../../components/visualisation/titleBar"
import LeftSection from "../../components/visualisation/leftSection"
import RightSection from "../../components/visualisation/rightSection"
import { useState, useEffect, useRef } from "react"
import ListSections from "../../components/visualisation/listSections"
import DemandeCollaboration from "../../components/visualisation/demandeCollaboration"
import Footer from "../../components/Footer"
import { useContext } from "react"
import AuthContext from '../../helpers/AuthContext'
import VisuService from "../../services/VisuService";
import RefreshService from "../../services/RefreshService";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar.jsx";
import PopAjouterCollaborateur from "../../components/visualisation/popupAjouterCollaborateur.jsx"
import { MdSmartToy } from 'react-icons/md';
import ChatBot from "../../components/chatBot/ChatBot.jsx"
import { PuffLoader } from 'react-spinners';


export default function Visualisation() {
  const { projetId } = useParams();
  const [isExpert, setIsExpert] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCollaborateur, setIsCollaborateur] = useState(null);
  const [isChef, setIsChef] = useState(null);
  const [discipline, setDiscipline] = useState(null);
  const [projet, setProjet] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chef, setChef] = useState(null);
  const [collaborateurs, setCollaborateurs] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [canAsk, setCanAsk] = useState(false);
  const [actualReferences, setActualReferences] = useState(null);

  const [isFixed, setIsFixed] = useState(true);

  const footerRef = useRef();


  // fetch the project, user, chef du projet, list of collaborators
  // set whether the user is an expert, admin, chef, collaborator to define what features he has access to 
  // get the discipline of the admin if he's a collaborator
  useEffect(() => {
    const fetchProjet = async () => {
      try {

        const response = await RefreshService.Refresh();
        setAuthState({ email: response.email, role: response.role, accessToken: response.accessToken });
        const projetData = await VisuService.getProjet(projetId, response.accessToken);

        setProjet(projetData.projet);
        setUser(projetData.user);
        setChef(projetData.chef);
        setCollaborateurs(projetData.collaborateurs);

        setIsExpert(projetData.isExpert);
        setIsAdmin(projetData.isAdmin);
        setIsChef(projetData.isChef);
        setIsCollaborateur(projetData.isCollaborateur);
        setDiscipline(projetData.discipline);

      } catch (err) {
        console.log("Failed to load projet");
      } finally {
        setLoading(false);
      }
    };
    fetchProjet();
  }, []);

  // list of all possible sections
  const sections = ['description', 'architecture', 'histoire', 'archeologie', 'autre'];

  // list of existing sections
  const sectionsExistantes = projet && projet.sections && Array.isArray(projet.sections)
    ? sections.filter(section =>
      projet.sections.some(sec => sec.type === section)
    )
    : [];


  // make sure the right section doesn't scroll up too far
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;

      const footerTop = footerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (footerTop <= windowHeight - 100) { // 100px BEFORE footer enters
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
      console.log("position is : ", isFixed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // adjust the chatbot position when scrolling
  useEffect(() => {
    function adjustBotDivPosition() {
      try {
        const botDiv = document.querySelector('.bot-div');
        const footer = document.querySelector('.footer');

        if (!botDiv || !footer) return;

        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
          const overlap = windowHeight - footerRect.top;
          botDiv.style.bottom = `${overlap + 20}px`;
        } else {
          botDiv.style.bottom = '20px';
        }
      } catch (e) { }
    }

    window.addEventListener('scroll', adjustBotDivPosition);
    window.addEventListener('resize', adjustBotDivPosition);

    // delay to ensure DOM is rendered
    setTimeout(adjustBotDivPosition, 100);

    return () => {
      window.removeEventListener('scroll', adjustBotDivPosition);
      window.removeEventListener('resize', adjustBotDivPosition);
    };
  }, []);





  const override = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };


  return (

    <>
      {loading ? (
        <PuffLoader
          color="#e8c07d"
          loading={loading}
          cssOverride={override}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (<>
        <div className="min-h-screen relative flex flex-col ">
          <div className="flex flex-1  relative max-w-full ">
            <SideNav className="" />
            <div className="flex-1 w-full bg-white main-content">
              <SearchBar />
              <main className="">
                <div className="mt-5 bg w-[86%] mx-auto mb-10">
                  <TitleBar isExpert={isExpert} isChef={isChef} projet={projet} references={actualReferences} chef={chef} collaborateurs={collaborateurs} />
                  <div className="flex align-items justify-between mt-[30px]">
                    <LeftSection
                       projet={projet}
                      setProjet={setProjet}
                      isAdmin={isAdmin}
                      isChef={isChef}
                      isExpert={isExpert}
                      isCollaborateur={isCollaborateur}
                      user={user}
                      collaborateurs={collaborateurs}
                      sectionsExistantes={sectionsExistantes}
                      setActualReferences={setActualReferences}
                    />
                    <RightSection
                      projet={projet}
                      isAdmin={isAdmin}
                      isExpert={isExpert}
                      isChef={isChef}
                      setProjet={setProjet}
                      utilisateur={user}
                      chef={chef}
                      collaborateurs={collaborateurs}
                      setCollaborateurs={setCollaborateurs}
                      showPopup={showPopup}
                      setShowPopup={setShowPopup}
                    />
                  </div>
                </div>
              </main>
            </div>
            {/* Menu to scroll to any section in the project */}
            <ListSections sectionsExistantes={sectionsExistantes}
              projet={projet} />
            {/* Button to ask to join the project*/}

            <DemandeCollaboration projet={projet} user={user} setCanAsk={setCanAsk} isExpert={isExpert} isCollaborateur={isCollaborateur} collaborateurs={collaborateurs} />
            {isExpert &&
              <ChatBot className="bot-div" projetId={projetId} canAsk={canAsk} isFixed={isFixed} />}

          </div>

          <Footer className="footer"
            ref={footerRef}
          /> </div>
        {showPopup && (
          <PopAjouterCollaborateur onClose={() => setShowPopup(false)} projet={projet} setProjet={setProjet} collaborateurs={collaborateurs} setCollaborateurs={setCollaborateurs} />
        )}
      </>)}


    </>
  );
}