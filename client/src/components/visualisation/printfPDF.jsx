import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useState } from 'react';
import AuthContext from "../../helpers/AuthContext"
import { useContext } from "react"


export default function PrintPDF( props ) {
    const {authState} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/pdf/generate', {projet: props.projet}, {

                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                    "Content-Type":"application/json"
                }
            });
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${props.projet.titre}-details.pdf`.replace(/[^a-z0-9-]/gi, '_'));
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
            
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert(error.response?.data?.error || 'Failed to generate PDF');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={generatePDF}
            disabled={isLoading}
            className={`px-2 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
            title="Download PDF Report"
        >
            <FontAwesomeIcon 
                icon={faFilePdf} 
                className="w-5 h-5" 
                spin={isLoading} 
            />
            {isLoading && <span className="ml-2">Generating...</span>}
        </button>
    );
}