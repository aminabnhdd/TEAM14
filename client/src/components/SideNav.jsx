import '../componentsStyles/SideNav.css'
import { Link } from "react-router-dom";
import discoverIcon from "../assets/images/discover.png"
import documentIcon from "../assets/images/document.png"
import favoriteIcon from "../assets/images/favorite.png"
import notificationIcon from "../assets/images/notification.png"

function SideNav(){
    return(
        <div className="side-nav">

            <Link to="">
            <img className="discover-icon" src={discoverIcon}></img>
            </Link>

            <Link to="">
            <img className="favorite-icon" src={documentIcon}></img>
            </Link>

            <Link to="">
            <img className="document-icon" src={favoriteIcon}></img>
            </Link>

            <Link to="">
            <img className="notification-icon" src={notificationIcon}></img>
            </Link>
            

        </div>
        
        
    )
};

export default SideNav;