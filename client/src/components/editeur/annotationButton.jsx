import annoterIcon from "../../assets/message.png"
export default function AnnotationButton({editor,section}){

    return(
        <button 
         className="thin-text text-brown px-4 flex gap-2  rounded-[36px] items-center justify-center cursor-pointer">
             <img className="w-4 h-4" src={annoterIcon}/>  Ajouter une annotation
        </button>
    )
}