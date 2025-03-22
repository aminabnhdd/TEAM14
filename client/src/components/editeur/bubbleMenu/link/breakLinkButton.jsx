import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkSlash} from "@fortawesome/free-solid-svg-icons";

export default function BreakLinkButton(props){
    return (
    <button className="p-1 hover:bg-neutral-100 rounded"
    onClick={() => {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }}
    disabled={!props.editor.isActive('link')}>
     <FontAwesomeIcon icon={faLinkSlash} className="w-5 h-5 " />
    </button>
    )       
}