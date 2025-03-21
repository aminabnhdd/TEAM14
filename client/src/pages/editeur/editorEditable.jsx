import TiptapEditable from "../../components/editeur/tiptapEditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Conflicts from "../../components/editeur/conflicts";
import Annotations from "../../components/editeur/annotations";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import SaveButton from "../../components/editeur/saveButton";
import { useState } from 'react';
import SideNav from "../../components/SideNav";
import "../../componentsStyles/editeur/editor.css"
import DropDownButton from "../../components/editeur/dropdownButton";
export default function EditorEditable(props){

    const [editor, setEditor] = useState(null);

    const user = {
        id: 1,
        nom: "Rahim",
        prenom: "Sarah",
        email: "ns_rahim@esi.dz",
        photoProfil: "https://media.istockphoto.com/id/1495088043/fr/vectoriel/ic%C3%B4ne-de-profil-utilisateur-avatar-ou-ic%C3%B4ne-de-personne-photo-de-profil-symbole-portrait.jpg?s=612x612&w=0&k=20&c=moNRZjYtVpH-I0mAe-ZfjVkuwgCOqH-BRXFLhQkZoP8=",
        num: "0550550550",
        date: 1742515200000,
        role: "historien",
        uservalide: true,
        favoris: [],
      }
    const annotations = [
        {
            id: 1,
            projetId: 1,
            sectionId:1,
            auteur: user,
            selected:"text",
            content: "this is the content of annotation 1"
        },
        {
            id: 2,
            projetId: 2,
            sectionId:1,
            auteur: user,
            selected:"text",
            content: "this is the content of annotation 2"
        },
        {
            id: 3,
            projetId: 1,
            sectionId:2,
            auteur: user,
            selected:"text",
            content: "this is the content of annotation 3"
        },
    ]

        
    const conflits = [
        {
            id: 1,
            projetId: 1,
            sectionId:1,
            signaleur: user,
            resolu: false,
            valide: false,
            content: "this is the content of conflict 1"
        },
        {
            id: 2,
            projetId: 1,
            sectionId:1,
            signaleur: user,
            resolu: true,
            valide: false,
            content: "this is the content of conflict 2"
        },
        {
            id: 3,
            projetId: 1,
            sectionId:1,
            signaleur: user,
            resolu: false,
            valide: true,
            content: "this is the content of conflict 3"
        },  {
            id: 4,
            projetId: 1,
            sectionId:1,
            signaleur: user,
            resolu: true,
            valide: true,
            content: "this is the content of conflict 4 "
        },  {
            id: 5,
            projetId: 2,
            sectionId:1,
            signaleur: user,
            resolu: false,
            valide: true,
            content: "this is the content of conflict 5"
        },  {
            id: 6,
            projetId: 1,
            sectionId:2,
            signaleur: user,
            resolu: false,
            valide: true,
            content: "this is the content of conflict 6"
        },
    ]

    const [annotVisible, setAnnotVisible] = useState(false);
    const [annotExist, setAnnotExist] = useState(false);
    const [conflitExist, setConflitExist] = useState(false);
console.log(annotExist)
console.log(conflitExist)
    return (<>
        <div className="flex max-w-full">
            <SideNav className=""/>

           
            <div className="flex-1 w-full bg-white main-content">
                <div className="h-[106px]  px-10 py-5 w-full flex items-center justify-center bg-white sticky top-0 z-100">
                    <div className="bg-neutral-200 w-full  h-full flex items-center pl-4"> Recherchere un projet</div>
                </div>
                <main className=" ">
                    <div className="mt-5 bg w-[86%] mx-auto mb-10 ">
                        <div className="flex justify-between align-items mb-5">
                            <h1 className="titles text-black">Editer section</h1>
                            
                            <DropDownButton section={props.section} annotVisible={annotVisible} setAnnotVisible={setAnnotVisible} annotExist={annotExist} conflitExist={conflitExist} />
                        </div>
                        <div className="flex justify-between">
                        <div className={` px-10 py-7.5 border border-neutral-300 rounded-[12px] ${annotVisible ? "w-[70%]": "w-full"} `}>
                        
                        <div className="flex justify-between mb-5">
                            <h1 className="secondary-titles text-dune">{props.section}</h1>
                            <button className="main-text text-warning ">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2 w-4 h-4"  />
                            Signaler un conflit
                            </button>
                        </div>
                        {/* Pass the editor state and setter to Tiptap */}
      <TiptapEditable setEditor={setEditor} section={props.section}/>
                        <p className="buttons text-black mt-4 mb-4">Gallerie</p>
                        <div className="border border-neutral-400 rounded-[12px] p-4 h-[200px] text-neutral-500">Ajouter des illustrations</div>
                        <div className="flex justify-end w-full">
                        <SaveButton editor={editor} section={props.section}/>
                        </div>
                        </div>

                        <div className={`${annotVisible ? "w-[28%]": "hidden"} `}>
                        <Conflicts  setConflitExist={setConflitExist} conflits={conflits} />
                        <Annotations  setAnnotExist={setAnnotExist} annotations={annotations}/>
                        </div>
                        </div>
                        

                        

                    </div>
                </main>
            </div>
        </div>
    </>)
}


