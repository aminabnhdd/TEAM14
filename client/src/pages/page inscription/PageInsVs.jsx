// Visitor Signup Page
// - Allows the user to enter personal and professional information
// - Sends a validation request to the admin for approval

import image from "../../assets/Group 38.png";
import image2 from "../../assets/Screenshot 2025-03-03 at 8.53.06 AM 2.png";
import "../../PagesStyles/Pages inscriptions styles/InsVs.css";

import NewInsvs from "../../components/Inscriptions/NewInsvs";
import { useNavigate } from 'react-router-dom';

function InsVs() {
  const navigate = useNavigate();

  const handleClick2 = () => {
    navigate('/');
  };


  return (
    <div className="main-page-one">
      <div className="back-home">
        <img src={image2} className="backHome-logo" onClick={handleClick2} />
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
        <NewInsvs />
      </div>
    </div>
  );
}

export default InsVs;
