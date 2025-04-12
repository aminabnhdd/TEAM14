import axios from "axios";
import ArchiverProjet from "../components/visualisation/archiverProjet";
import AjouterSection from "../components/visualisation/ajouterSection";

const URL = "http://localhost:3001";

const VisuService = {
  getProjet: async (projetId,token) => {
    try {
      console.log("hello i work");
      const response = await axios.get(`${URL}/projects/projet/${projetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      response.data.projet.sections.forEach(section => {
        if (Array.isArray(section.images)) {
          section.images = section.images.map(url => ({ src: url }));
        }
      });
      console.log("here is the datareonse:",response.data);
      console.log('Response status:', response.status);
      return response.data;
    } catch (error) {
      console.error("Error fetching projet:", error.response?.data || error.message);
      throw error;
    }
  },
  Archiver: async (projetId, token) => {  
    try {
      const response = await axios.put(`${URL}/projects/archive/${projetId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response status:', response.status);
    } catch (error) {
      console.error("Error archiving projet:", error.response?.data || error.message);
      throw error;
    }
  },
  AjouterSection: async (projetId, sectionType, token) => {         
    try {
      const response = await axios.post(`${URL}/projects/ajoutersection`, { type: sectionType,projetId}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response status:', response.status);
      return response.data.section;
    } catch (error) {
      console.error("Error adding section:", error.response?.data || error.message);
      throw error;
    }
  },
  findEmail: async (projetId,email, token) => {      
    try {
      const response = await axios.get(`${URL}/projects/${projetId}/collaborateurs/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response status:', response.status, response.data);
      return response.data;
    } catch (error) {
      console.error("Error finding email:", error.response?.data || error.message);
      throw error;
    }
  },
  addCollaborateur: async (projetId, userId, token) => {    
    try {
        console.log("the projet id",projetId);
      const response = await axios.put(`${URL}/projects/${projetId}/collaborateurs`, { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response status:', response.status);
      return response.data;
    } catch (error) {
      console.error("Error adding collaborator:", error.response?.data || error.message);
      throw error;
    }
  },
  demandeCollaboration: async (projetId, token) => {        
    try {
      console.log("the projet id", projetId);  
      console.log("the token", token);
      
      const response = await axios.post(
        `${URL}/projects/${projetId}/demande`,
        {}, // Le corps de la requête (vide ici)
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      console.log('Response status:', response.status);
      return response.data;
    } catch (error) {
      console.error("Error sending request:", error.response?.data || error.message);
      throw error;
    }
  }

};




export default VisuService;