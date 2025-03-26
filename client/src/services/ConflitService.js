import axios from "axios";

const URL = "http://localhost:3001";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub20iOiJrb3VkaWwiLCJwcmVub20iOiJtb3Vsb3VkIiwiaWQiOiI2N2MxZGViNDhjOTEzNzkzOTJlYjdjNTEiLCJlbWFpbCI6ImtvdWRpbEBnbWFpbC5jb20iLCJyb2xlIjoiYjhlOTk1MDc2NDExMjZkNDQxZWQ1YWNiNGFkOTIyMmM3ZmVkZjI0MTcyNjk1NGZkNzQwMzI3MzUyNmY2NjU2MGJlZWNkODM3ODQ0NGQ0Y2RiNTJlYmZlOWUzODhmMjEzNDM1MzhhNjhjZDI1ZWI2MDJhZDgzZjRkZTQ3Y2VlNTMiLCJpYXQiOjE3NDI4MzY1MjYsImV4cCI6MTc0MjgzNzQyNn0.ANz6ddp7OZyM7kSZu2WIBwYyKUxVvBpTtNJZuBjS-S8";

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
};

export default ConflitService;