import axios from "axios";



async function addProject(newProject,token) {
    try {

        console.log("Sending FormData:", Object.fromEntries(newProject.entries())); 

        const response = await axios.post(
            "http://localhost:3001/projects/add",
            newProject,
            {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
        );

        console.log("Project added:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding project:", error.response?.data || error.message);
    }
}

export { addProject };