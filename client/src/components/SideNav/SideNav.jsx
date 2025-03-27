import '../../ComponentsStyles/SideNav styles/SideNav.css'
import { Link } from "react-router-dom";
import { FaCompass, FaStar, FaEdit, FaBell } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
function SideNav(){
    return(
        <div className="side-nav">
            <Link to="">
            {/*<img className="discover-icon" src="/assets/images/discover.png"></img>*/}
            <FaCompass className="discover-icon" />
            </Link>

            <Link to="">
            {/*<img className="favorite-icon" src="/assets/images/favorite.png"></img>*/}
            <FaEdit className="favorite-icon" />
            </Link>

            <Link to="">
            {/*<img className="document-icon" src="/assets/images/document.png"></img>*/}
            <FaStar className="document-icon" />
            </Link>

            <Link to="">
            {/*<img className="notification-icon" src="/assets/images/notification.png"></img>*/}
            <FaBell className="notification-icon" />
            </Link>

            <Link to="">
            <FaQuestionCircle className="help-icon" />;
            </Link>
            

        </div>
        
        
    )
};

export default SideNav;