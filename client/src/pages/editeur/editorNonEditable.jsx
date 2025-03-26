import React, { useState, useEffect, useRef } from 'react';
import TiptapNonEditable from "../../components/editeur/tiptapNonEditable";
import Conflicts from "../../components/editeur/conflicts";
import Annotations from "../../components/editeur/annotations";
import SideNav from "../../components/SideNav";
import "../../componentsStyles/editeur/editor.css";
import DropDownButton from "../../components/editeur/dropdownButton";
import SignalerConflit from "../../components/editeur/signalerConflit";
import Gallerie from '../../components/editeur/gallerie';

window.scrollToAnnotation = function (annotationId) {
    console.log("scrollToAnnotation called with ID:", annotationId);
    const annotationCard = document.getElementById(`annotation-${annotationId}`);
    if (annotationCard) {
        console.log("Annotation card found:", annotationCard);
        annotationCard.scrollIntoView({ behavior: "smooth", block: "center" });
        annotationCard.style.border = "2px solid #e8c07d";
        annotationCard.style.transition = "border 0.3s ease";
        setTimeout(() => {
            annotationCard.style.border = "1px solid #e5e5e5";
        }, 2000);
   
    } else {
        console.log("Annotation card not found for ID:", annotationId);
    }
};


export default function EditorNonEditable() {
    const [editor, setEditor] = useState(null);

 
    const user = {
        id: 1,
        nom: "Rahim",
        prenom: "Sarah",
        email: "ns_rahim@esi.dz",
        role: 'expert',
        userValide: true,
        refreshToken: "",
        pfp: "https://media.istockphoto.com/id/1495088043/fr/vectoriel/ic%C3%B4ne-de-profil-utilisateur-avatar-ou-ic%C3%B4ne-de-personne-photo-de-profil-symbole-portrait.jpg?s=612x612&w=0&k=20&c=moNRZjYtVpH-I0mAe-ZfjVkuwgCOqH-BRXFLhQkZoP8=",
        discipline: "histoire",
        num: "0550550550",
        labo: "",
        etablissement: "",
        niveau: "",
        projets: [],
        fileUrl: "",
        favorites: [],
    };

    const userChef = {
        id: 2,
        nom: "Rahim",
        prenom: "Sarah",
        email: "ns_rahim@esi.dz",
        role: 'expert',
        userValide: true,
        refreshToken: "",
        pfp: "https://media.istockphoto.com/id/1495088043/fr/vectoriel/ic%C3%B4ne-de-profil-utilisateur-avatar-ou-ic%C3%B4ne-de-personne-photo-de-profil-symbole-portrait.jpg?s=612x612&w=0&k=20&c=moNRZjYtVpH-I0mAe-ZfjVkuwgCOqH-BRXFLhQkZoP8=",
        discipline: "histoire",
        num: "0550550550",
        labo: "",
        etablissement: "",
        niveau: "",
        projets: [],
        fileUrl: "",
        favorites: [],
    };

    const [annotations, setAnnotations] = useState([
        {
            id: 1,
            projetId: 1,
            sectionId: 1,
            auteur: user,
            selected: "text",
            content: "this is the content of annotation 1"
        },
        {
            id: 2,
            projetId: 1,
            sectionId: 1,
            auteur: user,
            selected: "text",
            content: "this is the content of annotation 2"
        },
        {
            id: 3,
            projetId: 1,
            sectionId: 1,
            auteur: user,
            selected: "text",
            content: "this is the content of annotation 3"
        },
    ]);

    const [conflits, setConflits] = useState([
        {
            id: 3,
            projetId: 1,
            sectionId: 1,
            signaleur: user,
            resolu: false,
            valide: true,
            content: "this is the content of conflict 3",
            lien: "",
        },
        {
            id: 5,
            projetId: 1,
            sectionId: 1,
            signaleur: user,
            resolu: false,
            valide: true,
            content: "this is the content of conflict 5",
            lien: "",
        },
    ]);

    const projet = {
        id: 1,
        titre: "projet",
        type: "type",
        latitude: "",
        longitude: "",
        localisation: "",
        style: "",
        photoUrl: "",
        dateConstruction: "",
        chef: userChef,
        collaborateurs: [
            user,
            userChef
        ],
        demandes: [],
        sections: [],
        archivePar: null,
        archive: false,
        keywords: ""
    };

    const section = {
        id: 1,
        projetId: projet,
        type: "histoire",
        contenu: "",
        annotations: annotations,
        conflits: conflits,
    };

    const [images,setImages] = useState([
        { src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },    { src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },    { src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        // ... keep all your other slide objects
      ]);


    const [annotVisible, setAnnotVisible] = useState(false);
    const [annotExist, setAnnotExist] = useState(false);
    const [conflitExist, setConflitExist] = useState(false);

    useEffect(() => {
        setAnnotExist(annotations.length > 0);
    }, [annotations]);

    useEffect(() => {
        setConflitExist(conflits.length > 0);
    }, [conflits]);

    const leftSectionRef = useRef(null);
    const [height, setHeight] = useState(10);

    // Use ResizeObserver to track height changes
    useEffect(() => {
        if (!leftSectionRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(leftSectionRef.current);

        // Cleanup observer on unmount
        return () => resizeObserver.disconnect();
    }, []);


    
    const [references, setReferences] = useState ([]);
const newReferences = references.filter((ref) => {
    return (!!document.querySelector(`[data-reference-id="${ref._id}"]`))
  });
  
  const filteredReferences = newReferences.map((ref, index) => ({
      ...ref,                // Spread all existing properties
      number: index + 1      // Override the number with position
    }));
  
    const updateReferenceNumbers = () => {
      if (!editor) return;
    
      filteredReferences.forEach(ref => {
        editor.chain()
          .focus()
          .command(({ tr }) => {
            let updated = false;
            
            tr.doc.descendants((node, pos) => {
              if (node.type?.name === "reference" && 
                  node.attrs?.id === ref._id) {
                
                // Create new text node with updated number
                const textNode = editor.schema.text(`[${ref.number}]`);
                
                // Create new reference node with updated attributes and content
                const newNode = editor.schema.nodes.reference.create(
                  { ...node.attrs, number: ref.number },
                  textNode
                );
                
                // Replace the entire node
                tr.replaceWith(pos, pos + node.nodeSize, newNode);
                
                updated = true;
              }
            });
            
            return updated;
          })
          .run();
      });
    };
  const refElement = filteredReferences.map((ref) => (
    <div 
      id={ref._id}
      key={ref._id}
    
      className=" group ml-2  text-brown  transition-colors duration-200"
    >
      [{ref.number}] <span >
        {ref.text.substring(0, 25)}{ref.text.length > 25 ? "..." : ""}
      </span>
    </div>
  ));
  
  // Call this whenever references change
  useEffect(() => {
    updateReferenceNumbers();
  }, [references]);
  
  
  
  
  
  
  
   //////////////////////////
    
   window.scrollToReference = function(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
        element.style.color = "#2d2d2d";
  element.style.textDecoration = "underline"; // Corrected property
  element.style.transition = "color 0.3s ease";
  
  setTimeout(() => {
  
      element.style.color = " #c57642"; 
      element.style.textDecoration = "none"; // Remove underline after 2 seconds
  }, 2000);
  
      }
    };
  
    
    return (
        <>
            <div className="flex max-w-full">
                <SideNav className="" />
                <div className="flex-1 w-full bg-white main-content">
                    <div className="h-[106px] px-10 py-5 w-full flex items-center justify-center bg-white sticky top-0 z-10">
                        <div className="bg-neutral-200 w-full h-full flex items-center pl-4"> Recherchere un projet</div>
                    </div>
                    <main className=" ">
                        <div className="mt-5 bg w-[86%] mx-auto mb-10 ">
                            <div className="flex justify-between align-items mb-5">
                                <h1 className="titles text-black">Annoter section</h1>
                                <DropDownButton annotVisible={annotVisible} setAnnotVisible={setAnnotVisible} annotExist={annotExist} conflitExist={conflitExist} />
                            </div>
                            <div className="flex justify-between">
                                <div ref={leftSectionRef} className={`px-10 py-7.5 border border-neutral-300 rounded-[12px] ${annotVisible ? "w-[70%]" : "w-full"}`}>
                                    <div className="flex justify-between mb-5">
                                        <h1 className="secondary-titles text-dune">{section.type.charAt(0).toUpperCase() + section.type.slice(1)}</h1>
                                        <SignalerConflit
                                            conflits={conflits}
                                            setConflits={setConflits}
                                            projet={projet}
                                            section={section}
                                            user={user}
                                        />
                                    </div>
                                    <TiptapNonEditable setEditor={setEditor} section={section} annotations={annotations} setAnnotations={setAnnotations} user={user} projet={projet} annotVisible={annotVisible} setAnnotVisible={setAnnotVisible} references={references} setReferences={setReferences} />
                                    { filteredReferences.length>0 && <p className="buttons text-black mt-4 mb-1">Références</p>}
                                    {filteredReferences.length>0 && refElement}
                                    <p className="buttons text-black mt-4 mb-4">Gallerie</p>
                                    <div className="border border-neutral-400 rounded-[12px] p-4 text-neutral-500">
                                        <Gallerie  slides={images}  />
                                    </div>

                                </div>
                                <div
                                    style={{ height: `${height}px` }} // Apply dynamic height
                                    className={`${annotVisible ? "w-[28%]" : "hidden"} overflow-y-auto`}
                                >
                                    <Conflicts conflits={conflits} setConflits={setConflits} user={user} projet={projet} section={section} />
                                    <Annotations annotations={annotations} />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}