import './SideNav.css'
import { Link } from "react-router-dom";
import { FaCompass, FaStar, FaEdit, FaBell } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
function SideNav(){
    return(
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
            <FaQuestionCircle className="help-icon" />;
            <div className="nav-link">
            <span className="tooltip">Help</span>
            </div>
            </Link>
            

        </div>
        
        
    )
};

export default SideNav;