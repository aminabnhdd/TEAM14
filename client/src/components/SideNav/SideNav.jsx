import './SideNav.css'
import { Link } from "react-router-dom";
import { FaCompass, FaStar, FaEdit, FaBell } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import img from "../../assets/Screenshot 2025-03-03 at 8.36.18 PM 1.png"

function SideNav(){
    const navigate = useNavigate()

    const goToLsProjets = () => {
    navigate("/") // hna tdir la page li rak hab troh liha
    }
    const goToLsUtil = () => {
    navigate("/")
    }
    const goToNotifAdmin = () => {
    navigate("/")
    }

    return(
        <div className="parent-sideNav">
        <div className="side-nav">

           

            <Link to="/discover"className="discover">
            <FaCompass className="discover-icon" />
            <div className="nav-link">
            <span className="tooltip">Discover</span>
            </div>
            </Link>

            <Link to="/favoris" className="favourite">
            <FaStar className="favorite-icon" />
            <div className="nav-link">
            <span className="tooltip">Favourites</span>
            </div>
            </Link>

            <Link to="" className="document">
            <FaEdit className="document-icon" />
            <div className="nav-link">
            <span className="tooltip">Documents</span>
            </div>
            </Link>

            <Link to="" className="notifications">
            <FaBell className="notifications-icon" />
            <div className="nav-link">
            <span className="tooltip">Notifications</span>
            </div>
            </Link>

            <Link to=""className="help">
            <FaQuestionCircle className="help-icon" />
            <div className="nav-link">
            <span className="tooltip">Help</span>
            </div>
            </Link>
            

            </div>
            </div>
        
        
    )
};

export default SideNav;