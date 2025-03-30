import { useEffect, useState} from "react";

export default function ReferencesSection(props){


  const [references, setReferences] = useState([]);

  useEffect(() => {
    const newReferences = props.projet.references.filter((ref) => {
      return (!!document.querySelector(`[data-reference-id="${ref._id}"]`))
    });
    
    const filteredReferences = newReferences.map((ref, index) => ({
      ...ref,
      number: index + 1
    }));
    
    setReferences(filteredReferences);
  }, [props.projet.references]);


    const refElement = references.map((ref) => (
    <div 
      id={ref._id}
      key={ref._id}
    
      className="main-text  group mb-1 text-brown  transition-colors duration-200"
    >
      [{ref.number}] <span >
        {ref.text.substring(0, 25)}{ref.text.length > 25 ? "..." : ""}
      </span>
    </div>
  ));
  
    
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
        <div>
        {references.length>0 && <p className="secondary-titles text-black mb-2 ">Références</p>}
        {references.length>0 && refElement}
        </div>
        </>
    )
}