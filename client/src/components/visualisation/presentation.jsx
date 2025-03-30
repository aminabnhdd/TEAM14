import ModifyInfos from "./modifierInfos"
import "../../componentsStyles/visualisation/presentation.css"
export default function Presentation(props){
    return (
    <><div className="mb-7">
        {props.projet.photoUrl && <img src={props.projet.photoUrl} 
        className="w-full h-auto mb-7"/>}
        <div className="bg-dune buttons py-1 px-[10px] text-black  rounded-[4px] overflow-hidden" >
            Présentation
        </div>
        <ul className="presentation-list">
            <li className="mt-4 text-black bolder-text  break-words" >Type de ressource:    <span className="main-text" > {props.projet.type || '/'}  </span></li>
            <li className="mt-4 text-black bolder-text  break-words" >Style architectural:  <span className="main-text" > {props.projet.style || '/'}  </span></li>
            <li className="mt-4 text-black bolder-text  break-words" >Date de construction: <span className="main-text" > {props.projet.dateConstruction || '/'} </span></li>
            <li className="mt-4 text-black bolder-text  break-words" >Localisation:         <span className="main-text" > {props.projet.localisation || '/'} </span></li>
            <li className="mt-4 text-black bolder-text  break-words " >Coordonnées:          <span className="main-text" >   {props.projet.latitude ? `${props.projet.latitude}°` : '/'},   {props.projet.longtitude ? `${props.projet.longtitude}°` : '/'} </span></li>
        </ul>
        { props.isChef && <ModifyInfos/>}
        </div>
    </>
    )
}