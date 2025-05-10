
// profile picture sticky icon

import { useState, useEffect, useContext } from "react";
import AuthContext from '../helpers/AuthContext';
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import axios from "axios";

export default function Pfp({fixed,admin=false}) {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const imgUrl = user.pfp;

  // navigate to the user's profile informations page
  const handleClick = () => {
    navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`);
  };

  // get the user infos
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (authState.accessToken) {
          const res = await axios.get("http://localhost:3001/profil/mon-compte", {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`
            }
          });
          setUser(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUser();
  }, [authState]);

  return (
    <><div
      className={`${fixed && "fixed top-7 right-4"} z-5000 w-12 h-12 rounded-full border-2 ${imgUrl ? "border-neutral-200" : "border-brown"} 
                bg-white flex items-center justify-center cursor-pointer
                hover:scale-105 transition-transform duration-200`}
      onClick={handleClick}
    >
      {/* if the user has no pfp use a default icon */}
      {imgUrl ? (
        <img src={imgUrl} className='rounded-full w-full h-full object-cover' alt="User Profile" />
      ) : (
        <FaUser className="text-brown w-6 h-6" />
      )}
    </div>
    {admin &&
    <div
      className="w-12 h-12"

    >
    </div>}</>
  );
}
















































