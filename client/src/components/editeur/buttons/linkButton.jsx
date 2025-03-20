import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink} from "@fortawesome/free-solid-svg-icons";
import  { useCallback } from 'react';

export default function LinkButton(props){
      const setLink = useCallback(() => {
        const previousUrl = props.editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
          return
        }
    
        // empty
        if (url === '') {
          props.editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
          return
        }
    
        // update link
        try {
          props.editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
        } catch (e) {
          alert(e.message)
        }
      }, [props.editor]);
      return (
        <button   onClick={setLink}  className={`px-2 cursor-pointer text-neutral-500 ${props.editor.isActive('link') ? 'is-active' : ''}`}>
        <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
        </button>
    )       
}