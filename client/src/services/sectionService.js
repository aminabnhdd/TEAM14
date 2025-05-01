import axios from "axios";

const URL = "http://localhost:3001";

const SectionService = {
  getSection: async (sectionId,token) => {
    try {
      console.log("hello i work");
      const response = await axios.get(`${URL}/editeur/editable/${sectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("here is the datareonse:",response.data);
      console.log('Response status:', response.status);
      return response.data;
    } catch (error) {
      console.error("Error fetching section:", error.response?.data || error.message);
      throw error;
    }
  },

  updateSection: async (sectionId, contenu, imageChanges,token) => {
    try {
      const formData = new FormData();
      formData.append("contenu", JSON.stringify(contenu));
      console.log("contenu not stringified",contenu)
      console.log("contenu stringified:", JSON.stringify(contenu));
  

      for (const [index, image] of imageChanges.entries()) {
        if (image.src.startsWith("blob:")) {
          try {
            
            const response = await fetch(image.src);
            const blob = await response.blob();
            const file = new File([blob], `uploaded_image_${index}.png `, { type: blob.type });
            
            formData.append("images", file);
            console.log(`Added File: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
          } catch (error) {
            console.error("Failed to fetch blob:", error);
          }
        } else {
          try {
            formData.append("images", image.src);
            console.log(`Added Existing Image: ${image.src}`);
          } catch (error) {
            console.error("Error handling old image:", error);
          }
        }
      }

      // await Promise.all(filePromises);
  
      // Debugging: Log formData entries
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  

      const response = await axios.put(`${URL}/editeur/editable/${sectionId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating section:", error.response?.data || error.message);
      throw error;
    }
  },
};




export default SectionService;