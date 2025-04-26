import PrintWeb from "./printWeb"
import PrintPDF from "./printfPDF"
import SaveIntern from "./saveIntern"
import SaveExtern from "./saveExtern"
import Tooltip from "../editeur/tooltip"

export default function TitleBar (props){
    return (
        <div className="bg-dune text-black rounded-[8px] px-5 py-[10px] big-remark  flex align-items items-center justify-between">
        <p> {props.projet.titre} </p>
        {props.isExpert && 
            <div className=" flex align-items items-center gap-2">
            <Tooltip element={<SaveExtern/>} text='Sauvegarder en externe' />
            <Tooltip element={<SaveIntern projet={props.projet}/>} text='Sauvegarder en interne' />
            <Tooltip element={<PrintWeb/>} text='Imprimer Web' />
            <Tooltip element={<PrintPDF/>} text='Imprimer PDF' />
        </div>}
        
    </div>
    )
}