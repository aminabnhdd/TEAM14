import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";



export default function saveExtern({projet}) {
    const location = useLocation();
    const verifyGoogleAuth = async () => {
        try {
          const access_token = localStorage.getItem('access_token');
          const response = await fetch('http://localhost:3001/oauth/verify-token', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          });
      
          const data = await response.json();
          return data.valid; 
        } catch (err) {
          console.error("Erreur de vérification du token :", err);
          return false;
        }
      };

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  const openExplorer = params.get('openExplorer');

  

  if (accessToken && refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    window.history.replaceState({}, document.title, location.pathname);
  }

}, [location]);
const saveProject = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');

      const response = await fetch("http://localhost:3001/oauth/save-to-drive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          projectData: projet,
          fileName: `ATHAR - ${projet.titre}.json`,
        }),
      });

      const data = await response.json();

      if (data.requireReauth) {
        auth(); 
      } else if (data.success) {
        alert("Projet sauvegardé avec succès !");
        console.log(data.webViewLink);
      } else {
        alert("Erreur lors de la sauvegarde.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur inattendue.");
    }
  };

    const navigation = (url)=>{
        window.location.href = url;
    }
    const auth = async ()=>{
        console.log(projet._id);
        const response = await fetch('http://localhost:3001/oauth/auth/google',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ projetId: projet._id }),
        });
        const data = await response.json();
        navigation(data.url);
    }
    return (

  <button className="px-2 cursor-pointer" onClick={async ()=>{
    const isAuthenticated = await verifyGoogleAuth();
  if (isAuthenticated) {
    saveProject();
  } else {
    auth(); 
  }
  }}>
    <FontAwesomeIcon icon={faCloudArrowDown} className="w-5 h-5" />
  </button>
        
    )       
}