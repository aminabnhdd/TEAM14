import axios from "axios";

const URL = "http://localhost:3001";

const RefreshService = {
  Refresh: async () => {
    try {
      console.log("Calling refresh...");
      const response = await axios.get(`${URL}/refresh`, {
        withCredentials: true,
      });
      console.log("here is the response",response.data);
      return response.data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; 
    }
  },
  };

export default RefreshService;