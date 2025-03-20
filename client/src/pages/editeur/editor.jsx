import TipTap from "../../components/editeur/tiptap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Editor(){
    return (<>
        <div className="flex">
            <aside className="bg-brown h-screen w-[80px] sticky top-0">

            </aside>
            <div className="flex-1 bg-white">
                <div className="h-[106px]  px-10 py-5 w-full flex items-center justify-center bg-white sticky top-0 z-100">
                    <div className="bg-neutral-200 w-full  h-full flex items-center pl-4"> Recherchere un projet</div>
                </div>
                <main className=" ">
                    <div className="mt-5 w-[86%] mx-auto mb-10">
                        <div className="flex justify-between mb-5">
                            <h1 className="titles text-black">Editer section</h1>
                            <button title="this is a test" className="buttons text-black">Afficher les annotations et les conflits
                            <FontAwesomeIcon icon={faCaretDown} className="ml-[12px] w-5 h-5" />
                            </button>
                        </div>
                        <div className=" px-10 py-7.5 border border-neutral-300 rounded-[12px]">
                        
                        <div className="flex justify-between mb-5">
                            <h1 className="secondary-titles text-dune">Architecture</h1>
                            <button className="main-text text-warning ">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2 w-4 h-4"  />
                            Signaler un conflit
                            </button>
                        </div>
                        <p className="buttons text-black mb-4">Contenu</p>
                        <TipTap/>
                        <p className="buttons text-black mt-4 mb-4">Gallerie</p>
                        <div className="border border-neutral-400 rounded-[12px] p-4 h-[200px] text-neutral-500">Ajouter des illustrations</div>
                        </div>

                        

                    </div>
                </main>
            </div>
        </div>
    </>)
}


