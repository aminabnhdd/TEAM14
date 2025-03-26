import { useRef,useEffect} from "react";
import "../../componentsStyles/editeur/gallerie.css";

export default function AddImage({ images, setImages, section }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file), // Generates a temporary URL instead of Base64
      }));

      setImages((prev) => [...prev, ...newImages]); // Add new images to 
      
     
    }
    
    e.target.value = null; // Reset input so same files can be selected again
   };




  return (
    <>
      <div 
        className="text-center flex flex-col items-center justify-center border-add-image gallerie-image border border-neutral-400 border-dashed cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        <div className="bg-neutral-200 inline-block p-2 rounded-[100px]">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#707778">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/>
          </svg>
        </div>
        <p className="px-3 pt-1">Ajouter des images</p>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </>
  );
}