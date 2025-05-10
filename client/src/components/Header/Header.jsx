
// header for page decouvrir


import './Header.css';
import {useNavigate} from 'react-router-dom';
function Header(){

    const navigate = useNavigate();



    return(
        <div className="header relative">
            <div>
            <h1 className="titres titles text-center mt-16 mb-4 text-black">Plongez dans l'histoire et la beauté de <br />
            <div className="hilighted-discover text-brown">L'Architecture Algérienne</div>
            </h1>
            <p className="text-xl text-center" >Où chaque pierre raconte une époque, une culture et une identité unique</p> 
            </div>
           
        </div>
    )
}

export default Header;