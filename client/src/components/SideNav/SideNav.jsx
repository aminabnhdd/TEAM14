import '../../ComponentsStyles/SideNav styles/SideNav.css'
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

        <div className="side-nav">
                    <div className="upperIcons1">
        
                    <img src={img} alt="hh"  className="ico1"/>
        
                    <div className="icons1">
                    <FaCompass className="iconus1" onClick={goToLsProjets} />
                    <FaStar className="iconus1" onClick={goToLsUtil}/>
                    <FaEdit className="iconus1"  onClick={goToNotifAdmin}/>
                    <FaBell className="iconus1"  onClick={goToNotifAdmin}/>
                    </div>
        
                    </div>
                    <div className="lowerIcon1">
                    <FaQuestionCircle className="iconus1" />
                    </div>
                    
                </div>
        
        
    )
};

export default SideNav;