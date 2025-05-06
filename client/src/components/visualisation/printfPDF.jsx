import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from 'react';
import AuthContext from "../../helpers/AuthContext";
import '../../ComponentsStyles/visualisation/titlebar.css'
export default function PrintPDF({ projet, references, chef, collaborateurs }) {
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      // Create clean data payload
      const pdfData = {
        projet,
        references,
        chef,
        collaborateurs

      };

      const response = await fetch('http://localhost:3001/impression/generatePDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`
        },
        body: JSON.stringify({ data: pdfData }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Handle as array buffer first
      const arrayBuffer = await response.arrayBuffer();
      
      // Create blob with explicit PDF type
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

      // Verify blob
      if (blob.size === 0) {
        throw new Error('Received empty PDF file');
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projet.titre.replace(/[^a-z0-9]/gi, '_')}_details.pdf`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('PDF download failed:', error);
      alert(`PDF download failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={downloadPDF}
      disabled={isLoading}
      className={`px-2 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
   
    >
      <FontAwesomeIcon
        icon={faFilePdf}
        className="w-5 h-5"
        style={
          isLoading
          ? {
              animation: 'zoomInOut 1s ease-in-out infinite',
            }
          : {}
        }
      />
 
    </button>
  );
}