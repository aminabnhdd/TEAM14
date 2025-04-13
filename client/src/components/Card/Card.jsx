import "./Card.css"
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useState } from 'react'
import axios from 'axios'

function Card({size="medium", data}){
    
    const userId = "67c1deb48c91379392eb7c51";
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavourite = async(project) => {
      const willBeFavorited = !isFavorited;
      setIsFavorited(willBeFavorited);
    
      if (willBeFavorited) {
      
        try {
          const res = await axios.post(`http://localhost:3001/projects/favourite/add/${userId}`, {
            projectId: project._id
          });
          console.log("Added to favorites:", res.data); // ✅ Now fulfilled
        } catch (err) {
          console.error("Error adding to favorites:", err);
        }
      }
    


        /*axios.post(`http://localhost:3001/projects/favourite/add/${userId}`, {
          project: project._id
        })
        .then(res => console.log("Added to favorites:", res.data))
        .catch(err => console.error("Error adding to favorites:", err));
      } else {
        // Optional: remove from favorites logic can go here
      }*/
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

export default Card;