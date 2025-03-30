import TiptapRenderer from "./titapRenderer"

export default function Section(props){
    return (
        <div className="mb-14 flex flex-col gap-4">
            <h1>{props.section.type}</h1>
<TiptapRenderer  content={props.section.contenu} />
        </div>
    )
}