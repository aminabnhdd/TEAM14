
import "../../PagesStyles/PagesConnexionStyles/Connex.css"
import image2 from "../../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";
import image from "../../assets/Group 38.png";
import ReiniMdp from "../../components/popUps/ReiniMdp";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

function ReiniMotdps () {
  const navigate = useNavigate();
  const handleClick2 = () => {
    navigate('/');
  };
  const {otl} = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/pwd-forgotten/check-link/${otl}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        navigate("/connexion")
        console.error("Error verifying token:", error);
      });
  },[]);

    return (
        <div className="main-page-one">
          <div className="back-home">
            <img src={image2} className="backHome-logo" onClick={handleClick2}/>
          </div>
          <div className="img-container-one">
            <img className="main-img-one" src={image} alt="img" />
            <div className="pres1">
              <p className="pri">ATHAR, une </p>
              <p className="pri">communauté dédiée au</p>
              <p className="pre5">patrimoine architectural algérien.</p>
            </div>
          </div>
          <div className="form-container-one">
           <ReiniMdp otl={otl}/>
        </div>
        </div>
      );

}

export default ReiniMotdps