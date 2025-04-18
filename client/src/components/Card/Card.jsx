import "./Card.css";
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';
import AuthContext from "../../helpers/AuthContext";
import{useContext} from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ size = "medium", data}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { setAuthState} = useContext(AuthContext);

  const navigate = useNavigate();

  const clickCard = () =>{
    navigate(`/visualisation/${data._id}`);
  }

  const toggleFavourite = async (project) => {
    const willBeFavorited = !isFavorited;
    setIsFavorited(willBeFavorited);

    if (willBeFavorited) {
      try {
        const refreshResponse = await axios.get("http://localhost:3001/refresh", {
          withCredentials: true,
        });
        console.log(refreshResponse.data)

        setAuthState({
          email: refreshResponse.data.email,
          role: refreshResponse.data.role,
          accessToken: refreshResponse.data.accessToken,
        });

        const res = await axios.post(
          'http://localhost:3001/projects/favourite/add',
          { projectId: project._id },
          {
            headers: {
              Authorization: `Bearer ${refreshResponse.data.accessToken}`,
            },
            withCredentials: true,
          }
        );

        console.log("Added to favorites:", res.data);
      } catch (err) {
        console.error("Error adding to favorites:", err);
      }
    }
  };

  /*return (
    <div className={`card ${size}`} onClick={clickCard}>
      <img src={data.photoUrl} alt="project" />
      <p className="text">{data.titre}</p>
      <div onClick={() => toggleFavourite(data)} className="favourite-icon">
        {isFavorited ? <AiFillStar color="white" /> : <AiOutlineStar />}
      </div>
    </div>
  );*/

  return (
    <div className={`card ${size}`}  onClick={clickCard} >
      <img src={data.photoUrl} alt="project"/>
      <div className="text-div">
      <p className="text buttons">{data.titre}</p>
      </div>
      <div onClick={(e) => {
  e.stopPropagation(); // Prevent card click
  toggleFavourite(data);
}} className="favourite-icon">
  {isFavorited ? <AiFillStar color="white" /> : <AiOutlineStar />}
</div>
    </div>
  );
}


export default Card;
