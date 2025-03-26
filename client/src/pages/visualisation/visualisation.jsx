import SideNav from "../../components/SideNav"
import TitleBar from "../../components/visualisation/titleBar"
import LeftSection from "../../components/visualisation/leftSection"
import RightSection from "../../components/visualisation/rightSection"
import { useState, useEffect} from "react"


export default function Visualisation(){
    const [isExpert, setIsExpert] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isCollaborateur, setIsCollaborateur] = useState(null);
    const [discipline,setDiscipline]=useState(null);
    const [projet,setProjet] = useState(null);


    useEffect(() => {
        setIsExpert(true);
        setProjet({
            titre: "",
            type: "",
            latitude: "",
            longtitude: "",
            localisation: "",
            style: "",
            photoUrl: "",
            dateConstruction: null, // No default date
            chef: null, // No default assigned expert
            collaborateurs: [], // Empty array for collaborators
            demandes: [], // Empty array for requests
            sections: [], // Empty array for sections
            archivePar: null, // No default archived user
            archive: false, // Assuming projects are not archived by default
            keywords: [], // Empty keywords list
            createdAt: new Date(), // Default timestamp
            updatedAt: new Date(), // Default timestamp
        })
    }, []);

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
                        <TitleBar isExpert={isExpert} />
                        <div className="flex align-items items-center justify-between  mt-[30px]">
                            <LeftSection/>
                            <RightSection/>
                        </div>
                    </div>
                  
                </main>
            </div>
        </div>
    </>
    )
}