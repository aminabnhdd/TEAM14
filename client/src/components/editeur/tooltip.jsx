import '../../componentsStyles/editeur/tooltip.css'
export default function  Tooltip(props){
    return(
        <div className="relative group">
            {props.element}
          <span className="absolute text-center opacity-[0.5]  left-1/2 transform -translate-x-1/2 top-full mt-1/2 text-[12px]   hidden group-hover:block bg-black text-white  px-2 py-1 rounded-[12px] animate-fadeOut">
            {props.text}
          </span>
        </div>
    )
}