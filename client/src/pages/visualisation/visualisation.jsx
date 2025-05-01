import SideNav from "../../components/SideNav"
import TitleBar from "../../components/visualisation/titleBar"
import LeftSection from "../../components/visualisation/leftSection"
import RightSection from "../../components/visualisation/rightSection"
import { useState, useEffect} from "react"
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
export default function Visualisation(){
    const { projetId } = useParams();
    const [isExpert, setIsExpert] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isCollaborateur, setIsCollaborateur] = useState(null);
    const [isChef, setIsChef] = useState(null);
    const [discipline,setDiscipline]=useState(null);
    const [projet,setProjet] = useState(null);
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chef,setChef] = useState(null);
    const [collaborateurs,setCollaborateurs] =useState(null);
    const {authState,setAuthState} = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);
    const [actualReferences,setActualReferences] = useState(null);

    useEffect(() => {
        const fetchProjet = async () => {
          try {
            const response= await  RefreshService.Refresh();
            setAuthState({email:response.email,role:response.role,accessToken:response.accessToken});
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

     const sections = ['description','architecture','histoire','archeologie','autre'];

 console.log('projet==============================',actualReferences);

     const sectionsExistantes = projet && projet.sections && Array.isArray(projet.sections)
     ? sections.filter(section => 
         projet.sections.some(sec => sec.type === section)
       )
     : [];
      




       return (

        <>
         {loading ? (
   <div className="flex justify-center items-center h-screen">
     <p>Loading section...</p>
   </div>
 ) : (<>
          <div className="flex relative max-w-full ">
            <SideNav className="" />
            <div className="flex-1 w-full bg-white main-content">
                <SearchBar/>
               <main className="">
                <div className="mt-5 bg w-[86%] mx-auto mb-10">
                  <TitleBar isExpert={isExpert} 
                       projet={projet}
                      chef={chef}
                      collaborateurs={collaborateurs}
                      references={actualReferences}/>

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
            <ListSections sectionsExistantes={sectionsExistantes} 
            projet={projet} />
            <DemandeCollaboration projet={projet} user={user} isExpert={isExpert} isCollaborateur={isCollaborateur} collaborateurs={collaborateurs}  />
          
            
             </div> <Footer/>
             {showPopup && (
        <PopAjouterCollaborateur onClose={() => setShowPopup(false)} projet={projet} setProjet={setProjet} collaborateurs={collaborateurs} setCollaborateurs={setCollaborateurs} />
      )}
             </>)}
             

        </>
      );
    }