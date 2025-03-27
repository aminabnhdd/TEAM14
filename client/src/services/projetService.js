import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub20iOiJrb3VkaWwiLCJwcmVub20iOiJtb3Vsb3VkIiwiaWQiOiI2N2MxZGViNDhjOTEzNzkzOTJlYjdjNTEiLCJlbWFpbCI6ImtvdWRpbEBnbWFpbC5jb20iLCJyb2xlIjoiYjhlOTk1MDc2NDExMjZkNDQxZWQ1YWNiNGFkOTIyMmM3ZmVkZjI0MTcyNjk1NGZkNzQwMzI3MzUyNmY2NjU2MGJlZWNkODM3ODQ0NGQ0Y2RiNTJlYmZlOWUzODhmMjEzNDM1MzhhNjhjZDI1ZWI2MDJhZDgzZjRkZTQ3Y2VlNTMiLCJpYXQiOjE3NDI1NTExODIsImV4cCI6MTc0MjU1MjA4Mn0.uPAbWjaCwbgodmfq0uD_Kaju_VMoWghiWQklzE4fkts";

async function addProject(newProject) {
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