import axios from "axios";

const URL = "http://localhost:3001";

const ConflitService = {
  signalerConflit: async (sectionId, projetId, content,token) => {
    try {
      const response = await axios.post(
        `${URL}/editeur/conflits/${projetId}/${sectionId}`, 
        { content },  
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
  resoudreConflit: async (conflitId,token) => {
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