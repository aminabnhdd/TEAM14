import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnderline } from "@fortawesome/free-solid-svg-icons"; // ✅ Fixed icon name

export default function UnderlineButton(props) {
  return (
    <button
      className={`px-2 cursor-pointer ${props.editor.isActive('underline') ? 'text-black' : 'text-neutral-500'}`} // ✅ Check 'underline' instead of 'bold'
      onClick={() => props.editor.chain().focus().toggleUnderline().run()} // ✅ Use toggleUnderline()
    >
      <FontAwesomeIcon icon={faUnderline} className="w-5 h-5" />
    </button>
  );
}
