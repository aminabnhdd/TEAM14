import axios from "axios";

const URL = "http://localhost:3001";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub20iOiJrb3VkaWwiLCJwcmVub20iOiJtb3Vsb3VkIiwiaWQiOiI2N2MxZGViNDhjOTEzNzkzOTJlYjdjNTEiLCJlbWFpbCI6ImtvdWRpbEBnbWFpbC5jb20iLCJyb2xlIjoiYjhlOTk1MDc2NDExMjZkNDQxZWQ1YWNiNGFkOTIyMmM3ZmVkZjI0MTcyNjk1NGZkNzQwMzI3MzUyNmY2NjU2MGJlZWNkODM3ODQ0NGQ0Y2RiNTJlYmZlOWUzODhmMjEzNDM1MzhhNjhjZDI1ZWI2MDJhZDgzZjRkZTQ3Y2VlNTMiLCJpYXQiOjE3NDMxMTU4NDcsImV4cCI6MTc0MzExNjc0N30.u0UDtEt4ju4l-mwN9bdBcCDM23T86HJwqOeWgBQj0Os";
const ConflitService = {
  signalerConflit: async (sectionId, projetId, content) => {
    try {
      const response = await axios.post(
        `${URL}/editeur/conflits/${projetId}/${sectionId}`, 
        { content },  // ✅ Mettre `content` dans un objet
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"  
          } 
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error reporting conflict:", error.response?.data || error.message);
      throw error;
    }
  },
  resoudreConflit: async (conflitId) => {
    try {
      const response = await axios.put(
        `${URL}/editeur/conflits/${conflitId}/resolu`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error resolving conflict:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};


export default ConflitService;