import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown  } from "@fortawesome/free-solid-svg-icons";

export default function DeleteTableDropdown(props){
    return (
      
    <div className="relative inline-block  mr-1 py-[5px] hover:bg-neutral-100">
      <label className="pl-2 pr-1 cursor-pointer text-neutral-500 ">
    
      <svg viewBox="0 0 24 24" version="1.1" className="w-6 inline-block" 
      
      fill="none"><g id="SVGRepo_bgCarrier" 
      strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" 
      strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> 
        <g id="🔍-System-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path fill="#707778" d="M17.5,12 C20.5376,12 23,14.4624 23,17.5 C23,20.5376 20.5376,23 17.5,23 C14.4624,23 12,20.5376 12,17.5 C12,14.4624 14.4624,12 17.5,12 Z M17.75,3 C19.5449,3 21,4.45507 21,6.25 L21,12.0218 C20.5368,11.7253 20.0335,11.4858 19.5,11.3135 L19.5,10 L15.5,10 L15.5,11.3135 C14.9665,11.4858 14.4632,11.7253 14,12.0218 L14,10 L10,10 L10,14 L12.0218,14 C11.7253,14.4632 11.4858,14.9665 11.3135,15.5 L10,15.5 L10,19.5 L11.3135,19.5 C11.4858,20.0335 11.7253,20.5368 12.0218,21 L6.25,21 C4.45507,21 3,19.5449 3,17.75 L3,6.25 C3,4.45507 4.45507,3 6.25,3 L17.75,3 Z M15.1464,15.1464 C14.9512,15.3417 14.9512,15.6583 15.1464,15.8536 L16.7929,17.5 L15.1464,19.1464 C14.9512,19.3417 14.9512,19.6583 15.1464,19.8536 C15.3417,20.0488 15.6583,20.0488 15.8536,19.8536 L17.5,18.2071 L19.1464,19.8536 C19.3417,20.0488 19.6583,20.0488 19.8536,19.8536 C20.0488,19.6583 20.0488,19.3417 19.8536,19.1464 L18.2071,17.5 L19.8536,15.8536 C20.0488,15.6583 20.0488,15.3417 19.8536,15.1464 C19.6583,14.9512 19.3417,14.9512 19.1464,15.1464 L17.5,16.7929 L15.8536,15.1464 C15.6583,14.9512 15.3417,14.9512 15.1464,15.1464 Z M8.5,15.5 L4.5,15.5 L4.5,17.75 C4.5,18.668175 5.20710875,19.4211925 6.10647256,19.4941988 L6.25,19.5 L8.5,19.5 L8.5,15.5 Z M8.5,10 L4.5,10 L4.5,14 L8.5,14 L8.5,10 Z M8.5,4.5 L6.25,4.5 C5.2835,4.5 4.5,5.2835 4.5,6.25 L4.5,8.5 L8.5,8.5 L8.5,4.5 Z M17.75,4.5 L15.5,4.5 L15.5,8.5 L19.5,8.5 L19.5,6.25 C19.5,5.331825 18.7928913,4.5788075 17.8935274,4.50580119 L17.75,4.5 Z M14,4.5 L10,4.5 L10,8.5 L14,8.5 L14,4.5 Z" />
    
    
    <circle cx="17.5" cy="17.5" r="5.5" fill="#ef4444" />
    
    
    <path
      fill="white"
      d="M15.146 15.146a.5.5 0 0 1 .708 0L17.5 16.793l1.646-1.647a.5.5 0 0 1 .708.708L18.207 17.5l1.647 1.646a.5.5 0 0 1-.708.708L17.5 18.207l-1.646 1.647a.5.5 0 0 1-.708-.708l1.647-1.646-1.647-1.646a.5.5 0 0 1 0-.708Z"
    /> </g> </g></svg> 
        <FontAwesomeIcon icon={faCaretDown} className="w-5 h-5 text-neutral-400" />
      </label>
      <select defaultValue=""
        className="absolute right-1 top-0 opacity-0 w-full h-full cursor-pointer "
        onChange={(e) => {
          const value = e.target.value;
    
          if (value === "1") {
            props.editor.chain().focus().deleteTable().run()
          } 
          // Reset selection so it always shows "Column"
          e.target.value = "";
        }}
      >
        <option value="" disabled hidden>tableau</option>
       <option value="1">Supprimer le tableau &nbsp; </option>
      
      </select>
    </div>
    
    )       
}