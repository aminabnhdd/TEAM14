import axios from "axios";

const URL = "http://localhost:3001";

const AnnotationService = {
  Annoter: async (sectionId, projetId, content,token) => {
    try {
      console.log(token);
      const response = await axios.post(
        `${URL}/editeur/annoter/${projetId}/${sectionId}`, 
        { content}, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"  
          } 
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error annotating:", error.response?.data || error.message);
      throw error;
    }
  },
  Update: async (sectionId,projetId,editor_content,token) => {
    try {
        console.log("YES DKHLT");
        const editor = JSON.stringify(editor_content)
      const response = await axios.put(
        `${URL}/editeur/annoter/${projetId}/${sectionId}/update`, 
        { editor_content: editor}, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"  
          } 
        }
      );
      console.log("here is the data response",response.data);
      return response.data;
    } catch (error) {
      console.error("Error annotating:", error.response?.data || error.message);
      throw error;
    }
  },
  Reference: async ( projetId, number,text,token) => {
    try {
      const response = await axios.post(
        `${URL}/editeur/references/${projetId}`, 
        { number ,text}, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"  
          } 
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error referencing:", error.response?.data || error.message);
      throw error;
    }
  },
};


export default AnnotationService;

