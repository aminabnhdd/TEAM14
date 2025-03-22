import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft} from "@fortawesome/free-solid-svg-icons";

export default function BlockQuoteButton(props){
    return (
         <button  className={`px-2 cursor-pointer ${props.editor.isActive('blockquote') ? 'text-black' : 'text-neutral-500'}`}
            onClick={() => props.editor.chain().focus().toggleBlockquote().run()}>
            <FontAwesomeIcon icon={faQuoteLeft} className="w-5 h-5" />
        </button>
    )       
}