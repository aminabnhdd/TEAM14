import axios from "axios";

const URL = "http://localhost:3001";

const ProjetService = {
  Get: async (token) => {
    try {
        console.log("here is the token: ",token);
        const response = await axios.get(
            `${URL}/projects/mesprojets`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
      console.log("here is the response",response.data.projects);
      return response.data.projects;
    } catch (error) {
      console.error("Error getting the projects:", error);
      throw error; 
    }
  },
  Archived: async (token) => {
    try {
        console.log("here is the token: ",token);
        const response = await axios.get(
            `${URL}/projects/mesprojets-archiver`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
      console.log("here is the response",response.data.projects);
      return response.data.projects;
    } catch (error) {
      console.error("Error getting the projects archiver:", error);
      throw error; 
    }
  },
  Restore: async (token, projetId) => {
    try {
      const response = await axios.put(
        `${URL}/projects/restore/${projetId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error restoring the project:", error);
      throw error; 
    }
  },
  };

export default ProjetService;