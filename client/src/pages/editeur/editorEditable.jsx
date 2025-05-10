// Page Editer Section


import { useState, useEffect, useRef } from "react";
import TiptapEditable from "../../components/editeur/tiptapEditable";
import Conflicts from "../../components/editeur/conflicts";
import Annotations from "../../components/editeur/annotations";
import SaveButton from "../../components/editeur/saveButton";
 import "../../componentsStyles/editeur/editor.css";
import DropDownButton from "../../components/editeur/dropdownButton";
import { useContext } from "react"
import AuthContext from '../../helpers/AuthContext'
import SectionService from "../../services/sectionService";
import GallerieEditable from "../../components/editeur/gallerieEditable";
import RefreshService from "../../services/RefreshService";
import { useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import SearchBar from "../../components/SearchBar";
import PuffLoader from "react-spinners/PuffLoader";

export default function EditorEditable() {
  const { sectionId } = useParams();
  console.log("Section ID:", sectionId);
  const [editor, setEditor] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [conflits, setConflits] = useState([]);
  const [section, setSection] = useState({});
  const [user, setUser] = useState({});
  const [userChef, setUserChef] = useState({});
  const [projet, setProjet] = useState({});
  const [saved, setSaved] = useState(
    localStorage.getItem("hasLoadedBefore") ? true : false
  );
  const {authState,setAuthState} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(
    JSON.parse(localStorage.getItem("images")) || []
  );
  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));
  }, [images]);

  const [references, setReferences] = useState([]);

  useEffect(() => {
    localStorage.setItem("hasLoadedBefore", true);
  }, []);
  const override = {
    display: "block",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)"
    };

  useEffect(() => {
    const fetchSection = async () => {
      try {


        const response= await  RefreshService.Refresh();
       
       setAuthState({email:response.email,role:response.role,accessToken:response.accessToken});


        const sectionData = await SectionService.getSection(
          sectionId,response.accessToken
        );
        console.log("Section data:", sectionData);
        // Only update the images if they haven't been set (empty array)
        let processedImages = [];
        if (sectionData.images && sectionData.images.length > 0) {
          processedImages = sectionData.images.map((image) => ({
            src: image,
          }));
        }

        // get the user,project, section, and the conflicts, annotations, images,  refrences, images of the section
        setSection(sectionData.section || {});
        setUser(sectionData.userEditing || {});
        setUserChef(sectionData.userChef || {});
        setProjet(sectionData.projet || {});
        setAnnotations(sectionData.annotations || []);
        setConflits(sectionData.conflits || []);
        setReferences(sectionData.projet.references || []);
        setImages(processedImages || []);
      } catch (err) {
        setError("Failed to load section");
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, []);

  const [annotVisible, setAnnotVisible] = useState(false);
  const [annotExist, setAnnotExist] = useState(false);
  const [conflitExist, setConflitExist] = useState(false);


  // check whether at least one annotation exists
  useEffect(() => {
    setAnnotExist(annotations.length > 0);
  }, [annotations]);

  // check whether at least 1 conflict exists
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

  const newReferences = references.filter((ref) => {
    return !!document.querySelector(`[data-reference-id="${ref._id}"]`);
  });

  const filteredReferences = newReferences.map((ref, index) => ({
    ...ref, // Spread all existing properties
    number: index + 1, // Override the number with position
  }));


  // make sure to use the right reference numer
  const updateReferenceNumbers = () => {
    if (!editor) return;

    filteredReferences.forEach((ref) => {
      editor
        .chain()
        .focus()
        .command(({ tr }) => {
          let updated = false;

          tr.doc.descendants((node, pos) => {
            if (node.type?.name === "reference" && node.attrs?.id === ref._id) {
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
      [{ref.number}]{" "}
      <span>
        {ref.text.substring(0, 25)}
        {ref.text.length > 25 ? "..." : ""}
      </span>
    </div>
  ));

  // Call this whenever references change
  useEffect(() => {
    updateReferenceNumbers();
  }, [references]);

 

  // scroll to reference element when the refererence node is clicked inside the editor

  window.scrollToReference = function (id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
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
    {
      loading ? (
        <PuffLoader
                    color="#e8c07d"
                    loading={loading}
                    cssOverride={override}
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
      ) : 
      
      (
        <div className="flex relative max-w-full ">
            <SideNav className="" />
            <div className="flex-1 w-full bg-white main-content">
                <SearchBar/>
          <main>
            <div className="mt-5 bg w-[86%] mx-auto mb-10">
              <div className="flex justify-between align-items mb-5">
                <h1 className="titles text-black">Éditer section</h1>
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
                                        ${
                                          !annotExist &&
                                          !conflitExist &&
                                          "w-full"
                                        }`}
                >
                  <div className="flex justify-between mb-5">
                    <h1 className="secondary-titles text-dune">
                      {section?.type
                        ? section.type.charAt(0).toUpperCase() +
                          section.type.slice(1)
                        : "Loading..."}
                    </h1>






                    {" "}
                  </div>
                  {loading ? (
                    <div className="flex justify-center items-center h-screen">
                      <p>Loading section...</p>
                    </div>
                  ) : error ? (
                    <div className="flex justify-center items-center h-screen">
                      <p className="text-red-500">{error}</p>
                    </div>
                  ) : (
                    <TiptapEditable
                      setEditor={setEditor}
                      section={section}
                      projet={projet}
                      saved={saved}
                      setSaved={setSaved}
                      references={references}
                      setReferences={setReferences}
                    />
                  )}
                  {filteredReferences.length > 0 && (
                    <p className="buttons text-black mt-4 mb-1">Références</p>
                  )}
                  {filteredReferences.length > 0 && refElement}
                  <p className="buttons text-black mt-4 mb-4">Galerie</p>
                  <div className="border border-neutral-400 rounded-[12px] p-4 text-neutral-500">
                    <GallerieEditable
                      slides={images}
                      setSlides={setImages}
                      section={section}
                    />
                  </div>
                  <div className="flex justify-end w-full">
                    <SaveButton
                      editor={editor}
                      section={section}
                      images={images}
                    />
                  </div>
                </div>
                {/* Right Section */}
                <div
                  style={{ height: `${height}px` }}
                  className={`${
                    annotVisible ? "w-[28%]" : "hidden"
                  } overflow-y-auto`}
                >
                  <Conflicts
                    conflits={conflits}
                    user={user}
                    projet={projet}
                    section={section}
                    setConflits={setConflits}
                  />
                  <Annotations annotations={annotations} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      )
    }
    
    
    </>
   
    
  );
}
