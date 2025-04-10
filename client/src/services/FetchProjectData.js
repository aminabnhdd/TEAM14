import axios from "axios";




async function FetchProjectData(projetId,token) {
    try {
        console.log("here is the id: ",projetId);
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