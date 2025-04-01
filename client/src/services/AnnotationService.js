import axios from "axios";

const URL = "http://localhost:3001";
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub20iOiJrb3VkaWwiLCJwcmVub20iOiJtb3Vsb3VkIiwiaWQiOiI2N2MxZGViNDhjOTEzNzkzOTJlYjdjNTEiLCJlbWFpbCI6ImtvdWRpbEBnbWFpbC5jb20iLCJyb2xlIjoiYjhlOTk1MDc2NDExMjZkNDQxZWQ1YWNiNGFkOTIyMmM3ZmVkZjI0MTcyNjk1NGZkNzQwMzI3MzUyNmY2NjU2MGJlZWNkODM3ODQ0NGQ0Y2RiNTJlYmZlOWUzODhmMjEzNDM1MzhhNjhjZDI1ZWI2MDJhZDgzZjRkZTQ3Y2VlNTMiLCJpYXQiOjE3NDMxMTU4NDcsImV4cCI6MTc0MzExNjc0N30.u0UDtEt4ju4l-mwN9bdBcCDM23T86HJwqOeWgBQj0Os";
const AnnotationService = {
  Annoter: async (sectionId, projetId, content, editor_content) => {
    try {
        const editor = JSON.stringify(editor_content)
      const response = await axios.post(
        `${URL}/editeur/annoter/${projetId}/${sectionId}`, 
        { content ,editor}, 
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
  Update: async (sectionId,projetId,editor_content) => {
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
  Reference: async ( projetId, number,text) => {
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

