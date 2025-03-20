export default function OpenLinkButton(props){
    return (
        <button
        onClick={() => {
          const url = props.editor.getAttributes("link").href;
          if (url) {
            window.open(url, "_blank");
          }
        }}
        className="p-1 hover:bg-neutral-100 rounded"
      >
        <a>{props.editor.getAttributes('link').href}</a> 
        
      </button>
    )       
}