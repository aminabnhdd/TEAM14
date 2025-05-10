
// tooltip to clarify what each button is for


import '../../componentsStyles/editeur/tooltip.css'
export default function  Tooltip({element,text,position='left-1/2 top-full'}){
    return(
        <div className="relative group">
            {element}
          <span className={`absolute text-center opacity-[0.5]  z-[999] ${position} transform -translate-x-1/2 mt-1/2 text-[12px]   hidden group-hover:block bg-black text-white  px-2 py-1 rounded-[12px] animate-fadeOut`}>
            {text}
          </span>
        </div>
    )
}