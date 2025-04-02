import axios from "axios";


const projetId = "67dd38ed23e0ac5a602a0e72";


async function FetchProjectData(token) {
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