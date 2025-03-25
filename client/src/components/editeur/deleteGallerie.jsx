import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


export default function DeleteGallerie ({ slides, setSlides, index }) {
  const deleteImage = (e) => {
    e.stopPropagation();  // Prevent triggering the lightbox
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    
  };

  return (
    <FontAwesomeIcon 
      onClick={deleteImage}
      icon={faTrashCan} 
      className="absolute right-2 bottom-2 w-5 h-5 text-black hover:text-warning bg-neutral-300/60 px-[6px] py-2 rounded-[100px]  hover:brightness-105 hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
      // ... rest of your icon props
    />
  );
};