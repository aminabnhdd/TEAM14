import React, { useEffect, useRef, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import "../../componentsStyles/MyProjectsStyles/RestoreProjectsHeader.css";
import { useContext } from "react";
import AuthContext from "../../helpers/AuthContext";
import axios from "axios";

const RestoreProjectsHeader = () => {
  const API_KEY = 'AIzaSyAtMnELor8BMUbPm-AafeAR_ZtaG1GhJTE';
  const CLIENT_ID = '853727589657-jbt0tboqsh6am7933te6cmf548crv67g.apps.googleusercontent.com';
  const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

  const { authState } = useContext(AuthContext);
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const fileInputRef = useRef(null);

  const handleLocalRestore = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          console.log(authState.accessToken);
          const response = await axios.post('http://localhost:3001/projects/import-projet', { ...jsonData }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.accessToken}`
            }
          });

          console.log(response.data);
          alert(response.data.message);
        } catch (error) {
          console.error("Erreur lors de la restauration :", error);
          alert("Le fichier est invalide ou le serveur a échoué.");
        }
      };

      reader.readAsText(file);
    }
  };

  useEffect(() => {
    console.log(authState.accessToken);
    const loadScripts = async () => {
      // Charger GAPI
      const gapiScript = document.createElement("script");
      gapiScript.src = "https://apis.google.com/js/api.js";
      gapiScript.onload = async () => {
        window.gapi.load("client", async () => {
          await window.gapi.client.init({
            apiKey: API_KEY,
            clientId:CLIENT_ID
          });
          // Charger Picker
          const pickerScript = document.createElement("script");
          pickerScript.src = "https://apis.google.com/js/picker.js";
          pickerScript.onload = () => setGapiLoaded(true);
          document.body.appendChild(pickerScript);
        });
      };
      document.body.appendChild(gapiScript);

      // Charger GIS (Google Identity Services)
      const gisScript = document.createElement("script");
      gisScript.src = "https://accounts.google.com/gsi/client";
      gisScript.async = true;
      gisScript.defer = true;
      gisScript.onload = () => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES.join(' '),
          callback: (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            launchPicker(accessToken);
          },
        });
        setTokenClient(client);
      };
      document.body.appendChild(gisScript);
    };

    loadScripts();
  }, []);

  const openPicker = () => {
    if (!gapiLoaded || !tokenClient) {
      alert("Google Picker n'est pas encore prêt.");
      return;
    }
    tokenClient.requestAccessToken();
  };

  const launchPicker = (accessToken) => {
    const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS)
      .setMimeTypes('application/json')
      .setSelectFolderEnabled(false);

    const picker = new window.google.picker.PickerBuilder()
      .setOAuthToken(accessToken)
      .setDeveloperKey(API_KEY)
      .addView(view)
      .setCallback(pickerCallback)
      .build();

    picker.setVisible(true);
  };

  const pickerCallback = async (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const fileId = data.docs[0].id;
      console.log('Fichier sélectionné :', fileId);
    
      try {
        // Le token pour accéder à Google Drive (PAS authState)
        const googleAccessToken = window.gapi.auth.getToken().access_token;
  
        // Télécharger le fichier en tant que blob depuis Google Drive
        const fileResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
          headers: new Headers({ Authorization: `Bearer ${googleAccessToken}` }),
        });
  
        const blob = await fileResponse.blob();
        const reader = new FileReader();
  
        // Lire le fichier blob et le convertir en JSON
        reader.onload = async () => {
          try {
            const jsonData = JSON.parse(reader.result);  // Convertir le contenu en JSON
            
            // Maintenant, envoie le fichier JSON directement sans FormData
            const response = await axios.post('http://localhost:3001/projects/import-projet', jsonData, {
              headers: {
                'Authorization': `Bearer ${authState.accessToken}`,
                'Content-Type': 'application/json',
              },
            });
  
            console.log(response.data);
            alert(response.data.message);
  
          } catch (error) {
            console.error("Erreur lors de l'envoi du fichier JSON :", error);
            alert("Erreur lors de la récupération du fichier JSON.");
          }
        };
  
        reader.readAsText(blob);  // Lire le fichier en tant que texte JSON
      } catch (err) {
        console.error('Erreur lors du téléchargement du fichier :', err);
        alert('Échec de la récupération ou de l’envoi du fichier.');
      }
    }
  };
  
  

  return (
    <div className="rest-projects-header">
      <h1>Restaurer un projet</h1>

      <div className="restore-buttons-container">
        <button
          className="restore-button2"
          onClick={openPicker}
        >
          <FiRotateCcw />
          Restaurer en externe
        </button>

        <button
          className="restore-button2"
          onClick={handleLocalRestore}
        >
          <FiRotateCcw />
          Restaurer en local
        </button>
      </div>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default RestoreProjectsHeader;
