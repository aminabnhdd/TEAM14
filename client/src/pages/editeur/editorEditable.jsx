import { useState, useEffect, useRef } from 'react';
import TiptapEditable from "../../components/editeur/tiptapEditable";
import Conflicts from "../../components/editeur/conflicts";
import Annotations from "../../components/editeur/annotations";
import SaveButton from "../../components/editeur/saveButton";
import SideNav from "../../components/SideNav";
import "../../componentsStyles/editeur/editor.css";
import DropDownButton from "../../components/editeur/dropdownButton";
import SignalerConflit from "../../components/editeur/signalerConflit";
import SectionService from "../../services/sectionService";
import GallerieEditable from "../../components/editeur/gallerieEditable";

export default function EditorEditable() {
    const [editor, setEditor] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [conflits, setConflits] = useState([]);
    const [section, setSection] = useState({});
    const [user, setUser] = useState({});
    const [userChef, setUserChef] = useState({});
    const [projet, setProjet] = useState({});
    const [saved, setSaved] = useState(localStorage.getItem("hasLoadedBefore") ? true : false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem("hasLoadedBefore", "true");
    }, []);

    useEffect(() => {
        const fetchSection = async () => {
            try {
                const sectionData = await SectionService.getSection("67cde422d70a4df898a9a9d8"); 
                console.log("Section data:", sectionData);
                setSection(sectionData.section || {});
                setUser(sectionData.userEditing || {});
                setUserChef(sectionData.userChef || {});
                setProjet(sectionData.projet || {});
                setAnnotations(sectionData.annotations || []);
                setConflits(sectionData.conflits || []);
            } catch (err) {
                setError("Failed to load section");
            } finally {
                setLoading(false);
            }
        };

        fetchSection();
    }, []);

        const [references, setReferences] = useState ([]);
    

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
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!leftSectionRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(leftSectionRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    const [images,setImages] = useState([
        { src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },    { src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },    { src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { src: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        // ... keep all your other slide objects
      ]);

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


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
  
/////////////////     

    return (
        <>
            <div className="flex max-w-full">
                <SideNav />
                <div className="flex-1 w-full bg-white main-content">
                    <div className="h-[106px] px-10 py-5 w-full flex items-center justify-center bg-white sticky top-0 z-2000">
                        <div className="bg-neutral-200 w-full h-full flex items-center pl-4"> Recherchere un projet</div>
                    </div>
                    <main>
                        <div className="mt-5 bg w-[86%] mx-auto mb-10">
                            <div className="flex justify-between align-items mb-5">
                                <h1 className="titles text-black">Editer section</h1>
                                <DropDownButton 
                                    annotVisible={annotVisible} 
                                    setAnnotVisible={setAnnotVisible} 
                                    annotExist={annotExist} 
                                    conflitExist={conflitExist} 
                                />
                            </div>
                            <div className="flex justify-between">
                                {/* Left Section */}
                                <div
                                    ref={leftSectionRef}
                                    className={`overflow-hidden px-10 py-7.5 border border-neutral-300 rounded-[12px] 
                                        ${annotVisible ? "w-[70%]" : "w-full"} 
                                        ${!annotExist && !conflitExist && "w-full"}`}
                                >
                                    <div className="flex justify-between mb-5">
                                        <h1 className="secondary-titles text-dune">
                                            {section?.type ? section.type.charAt(0).toUpperCase() + section.type.slice(1) : "Loading..."}
                                        </h1>
                                        <SignalerConflit
                                            conflits={conflits}
                                            setConflits={setConflits}
                                            projet={projet}
                                            section={section}
                                            user={user}
                                        />                                    </div>
                                    <TiptapEditable setEditor={setEditor} section={section.type} saved={saved} setSaved={setSaved} references={references} setReferences={setReferences} />
                                   { filteredReferences.length>0 && <p className="buttons text-black mt-4 mb-1">Références</p>}
                                    {filteredReferences.length>0 && refElement}
                                    <p className="buttons text-black mt-4 mb-4">Gallerie</p>
                                    <div className="border border-neutral-400 rounded-[12px] p-4 text-neutral-500">
                                        <GallerieEditable slides={images} setSlides={setImages} section={section}/>
                                    </div>
                                    <div className="flex justify-end w-full">
                                        <SaveButton editor={editor} section={section}  />
                                    </div>
                                </div>
                                {/* Right Section */}
                                <div
                                    style={{ height: `${height}px` }}
                                    className={`${annotVisible ? "w-[28%]" : "hidden"} overflow-y-auto`}
                                >
                                    <Conflicts conflits={conflits} user={user} projet={projet} section={section} />
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