
// button that allows the user to open the link, appears in the link bubble menu

export default function OpenLinkButton(props){
    return (
        <button
        onClick={() => {
          const url = props.editor.getAttributes("link").href;
          if (url) {
            window.open(url, "_blank");
          }
        }}
        className="p-1  hover:bg-neutral-100 rounded w-30"
      >
        <a className="block truncate max-w-full">{props.editor.getAttributes('link').href}</a> 
        
      </button>
    )       
}