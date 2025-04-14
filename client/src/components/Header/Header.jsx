import './Header.css';
import { FaUser } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
function Header(){

    const navigate = useNavigate();

    const handleClick = () => {
    navigate('/profile'); // Change this to your desired route
    };


    return(
        <div className="header">
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <FaUser size={30} color="#333" />
            </div>
            <h1 className="title-1">Plongez dans l'histoire et la beauté de <br />
            <div className="hilighted-discover">L'Architecture Algérienne</div>
            </h1>
            <p>Où chaque pierre raconte une époque, une culture et une identité unique</p> 

        </div>
    )
}

export default Header;