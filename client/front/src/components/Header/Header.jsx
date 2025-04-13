import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
function Header(){

    const navigate = useNavigate();

    const handleClick = () => {
    navigate('/profile'); // Change this to your desired route
    };


    return(
        <div className="header">
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <FaUserCircle className="profile-icon" />
            </div>
            <h1 className="title-1">Plongez dans la l'histoire et la beauté de <br />
            <div className="hilighted-discover">L'Architecture Algerienne</div>
            </h1>
            <p>Où chaque pierre raconte une époque, une culture et une identité unique</p> 

        </div>
    )
}

export default Header;