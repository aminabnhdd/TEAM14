import SideNav from "../../components/SideNav"
import TitleBar from "../../components/visualisation/titleBar"
import LeftSection from "../../components/visualisation/leftSection"
import RightSection from "../../components/visualisation/rightSection"
import { useState, useEffect} from "react"


export default function Visualisation(){
    // const [isExpert, setIsExpert] = useState(null);
    // const [isAdmin, setIsAdmin] = useState(null);
    // const [isCollaborateur, setIsCollaborateur] = useState(null);
    // const [isChef, setIsChef] = useState(null);
    // const [discipline,setDiscipline]=useState(null);
    // const [projet,setProjet] = useState(null);


    const [isExpert, setIsExpert] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCollaborateur, setIsCollaborateur] = useState(true);
    const [isChef, setIsChef] = useState(true);
    const [discipline,setDiscipline]=useState(null);
    const [projet,setProjet] = useState(({
        titre: "This is the title",
        type: "This is le type de la ressource",
        latitude: "44",
        longtitude: "33",
        localisation: 'algeria',
        style: "style de la ressource",
        photoUrl: "https://herfa.dz/wp-content/uploads/2024/08/8de0fda8-46e3-4d2f-b8e9-062984ea6e09-1568x1044.jpg",
        dateConstruction: "this is the date de construction", // No default date
        chef: null, // No default assigned expert
        collaborateurs: [1,2,3,4], // Empty array for collaborators
        demandes: [], // Empty array for requests
        sections: [], // Empty array for sections
        archivePar: null, // No default archived user
        archive: false, // Assuming projects are not archived by default
        keywords: [], // Empty keywords list
        createdAt: new Date(), // Default timestamp
        updatedAt: new Date(), // Default timestamp
    }));



 
    return(
        <>
        <div className="flex max-w-full">
            <SideNav className="" />
            <div className="flex-1 w-full bg-white main-content">
                <div className="h-[106px]  py-5 w-full flex items-center justify-center bg-white sticky top-0 z-10">
                    <div className="bg-neutral-200 w-[86%] h-full flex items-center pl-4"> Recherchere un projet</div>
                </div>
                <main className=" ">
                    <div className="mt-5 bg w-[86%] mx-auto mb-10 ">
                        <TitleBar isExpert={isExpert} projet={projet} />
                        <div className="flex align-items  justify-between  mt-[30px]">
                            <LeftSection/>
                            <RightSection projet={projet} isAdmin={isAdmin} isExpert={isExpert} isChef={isChef} setProjet={setProjet} />
                        </div>
                    </div>
                  
                </main>
            </div>
        </div>
    </>
    )
}