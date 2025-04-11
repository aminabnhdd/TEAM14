import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub20iOiJrb3VkaWwiLCJwcmVub20iOiJtb3Vsb3VkIiwiaWQiOiI2N2MxZGViNDhjOTEzNzkzOTJlYjdjNTEiLCJlbWFpbCI6ImtvdWRpbEBnbWFpbC5jb20iLCJyb2xlIjoiYjhlOTk1MDc2NDExMjZkNDQxZWQ1YWNiNGFkOTIyMmM3ZmVkZjI0MTcyNjk1NGZkNzQwMzI3MzUyNmY2NjU2MGJlZWNkODM3ODQ0NGQ0Y2RiNTJlYmZlOWUzODhmMjEzNDM1MzhhNjhjZDI1ZWI2MDJhZDgzZjRkZTQ3Y2VlNTMiLCJpYXQiOjE3NDI1NTIzOTMsImV4cCI6MTc0MjU1MzI5M30.2izUTRyAtz6IqBHnbU02RsYX18fh6Lv_6jHUiWSEq-8";
const projetId = "67dd38ed23e0ac5a602a0e72";


async function FetchProjectData() {
    try {
        const response = await axios.get(
            `http://localhost:3001/projects/modifier/${projetId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        console.log("Project data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching project:", error.response?.data || error.message);
    }
}



export { FetchProjectData };