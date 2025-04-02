import axios from "axios";


const projetId = "67dd38ed23e0ac5a602a0e72";


async function UpdateProject(newProject,token) {
    try {
        console.log("Sending FormData:", Object.fromEntries(newProject.entries())); 

        const response = await axios.put(
            `http://localhost:3001/projects/update/${projetId}`,
            newProject,
            {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
        );

        console.log("Project updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating project:", error.response?.data || error.message);
    }
}

export { UpdateProject };