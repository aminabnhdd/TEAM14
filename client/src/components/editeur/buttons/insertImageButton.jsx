import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage} from "@fortawesome/free-solid-svg-icons";
import  { useCallback } from 'react';
export default function InsertImageButton(props){
        const addImage = useCallback(() => {
          const url = window.prompt("Enter image URL");
        
          if (url) {
            props.editor.chain().focus().setImage({ src: url }).run();
          }
        }, [props.editor]);
        
        return (
        <button
        className="px-2 cursor-pointer text-neutral-500"
        onClick={addImage}>
        <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
        </button>
        
    )       
}