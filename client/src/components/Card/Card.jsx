{/*import "./Card.css"
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useState } from 'react'
import axios from 'axios'

function Card({size="medium", data}){
    
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavourite = async(project) => {
      const willBeFavorited = !isFavorited;
      setIsFavorited(willBeFavorited);
    
      if (willBeFavorited) {
      
        try {
           axios.get("http://localhost:3001/refresh",{withCredentials:true})
           .then((response) => {
                      // if (response.data.error) return navigate('/')
          setAuthState({email:response.data.email,role:response.data.role,accessToken:response.data.accessToken});
          const res = await axios.post(
            'http://localhost:3001/projects/favourite/add',
            { projectId: project._id },
            { withCredentials: true })}
          
          console.log("Added to favorites:", res.data);
          ) // ✅ Now fulfilled
        } catch (err) {
          console.error("Error adding to favorites:", err);
        }
      }

    };

    return(
        <div className={`card ${size}`}>
          <img src={data.photoUrl}></img>
          <p className="text">{data.titre}</p>
          <div onClick={() => toggleFavourite(data)} className="favourite-icon">
          {isFavorited ? <AiFillStar color="white" /> : <AiOutlineStar />}
          </div>
        </div>
    )
}

export default Card;*/}


import "./Card.css";
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';
import AuthContext from "../../helpers/AuthContext";
import{useContext} from 'react';

function Card({ size = "medium", data}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { authState, setAuthState} = useContext(AuthContext);

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

  return (
    <div className={`card ${size}`}>
      <img src={data.photoUrl} alt="project" />
      <p className="text">{data.titre}</p>
      <div onClick={() => toggleFavourite(data)} className="favourite-icon">
        {isFavorited ? <AiFillStar color="white" /> : <AiOutlineStar />}
      </div>
    </div>
  );
}

export default Card;
