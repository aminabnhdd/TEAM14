
// dropdown to change the size of the selected text in tiptap editor


export default function SizeDropdown(props){
    return (
        <select
        className="main-text !font-medium cursor-pointer "
            onChange={(e) => {
              const value = e.target.value;
              if (value === "paragraph") {
                props.editor.chain().focus().setParagraph().run();
              } else {
                props.editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
              }
            }}
          >
            <option value="paragraph">Paragraphe &nbsp;</option>
            <option value="1">Titre 1</option>
            <option value="2">Titre 2</option>
            <option value="3">Titre 3</option>
          </select>
    )       
}