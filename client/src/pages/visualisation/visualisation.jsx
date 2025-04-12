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
 ) : (
          <div className="flex relative max-w-full">
            <SideNav className="" />
            <div className="flex-1 w-full bg-white main-content">
              <div className="h-[106px] py-5 w-full flex items-center justify-center bg-white sticky top-0 z-10">
                <div className="bg-neutral-200 w-[86%] h-full flex items-center pl-4">
                  Rechercher un projet
                </div>
              </div>
              <main className="">
                <div className="mt-5 bg w-[86%] mx-auto mb-10">
                  <TitleBar isExpert={isExpert} projet={projet} />
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
                    />
                    <RightSection
                      projet={projet}
                      isAdmin={isAdmin}
                      isExpert={isExpert}
                      isChef={isChef}
                      setProjet={setProjet}
                      chef={chef}
                      collaborateurs={collaborateurs}
                      setCollaborateurs={setCollaborateurs}
                    />
                  </div>
                </div>
              </main>
            </div>
            <ListSections sectionsExistantes={sectionsExistantes} 
            projet={projet} />
            <DemandeCollaboration projet={projet} user={user} isExpert={isExpert} isCollaborateur={isCollaborateur} collaborateurs={collaborateurs}  />
          
            
             </div> )}
             <Footer/>

        </>
      );
    }