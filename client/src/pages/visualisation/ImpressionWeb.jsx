import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthContext from "../../helpers/AuthContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faRotateBack} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
export default function ImpressionWeb() {
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const [HTML, setHTML] = useState(`
    <div className="flex items-center justify-center h-screen w-full">
      <p>Loading...</p>
    </div>`);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract data from location state
  const { projet, references, collaborateurs, chef } = location.state || {};
  const navigate = useNavigate();
  useEffect(() => {
    const generateHTML = async () => {
      try {
        if (!projet) {
          throw new Error("No project data available");
        }

        const response = await axios.post(
          'http://localhost:3001/impression/generateHTML',
          { 
            data: { 
              projet, 
              references, 
              collaborateurs, 
              chef 
            } 
          },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
               'Content-Type': 'application/json'
            },
            timeout: 60000
          }
        );

        if (response.data) {
          setHTML(response.data);
        }
      } catch (err) {
        console.error("Failed to generate HTML:", err);
        setError(err.message);
        setHTML('<p>Error loading content</p>');
      } finally {
        setLoading(false);
      }
    };

    generateHTML();
  }, []);

  if (loading) {
    return  <div className="flex items-center justify-center h-screen w-full">
    <p>Loading...</p>
  </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div dangerouslySetInnerHTML={{ __html: HTML }} />
    {!loading && <>
    <div className="absolute right-10 top-10 flex gap-5">
      <button  onClick={() => navigate(`/visualisation/${projet._id}`)}
      className="print:hidden text-white bg-neutral-500/80
     rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5
     hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer">
         <FontAwesomeIcon icon={faRotateBack} className=" w-5 h-5" />
        Revenir au projet
     </button>  
        <button  onClick={() => window.print()}
             className="print:hidden text-white bg-neutral-500/80
            rounded-[30px] py-3 flex align-items items-center gap-3 bolder-text px-5
            hover:brightness-105  hover:scale-102 transition-all duration-300 cursor-pointer">
                <FontAwesomeIcon icon={faPrint} className=" w-5 h-5" />
                Imprimer
            </button>  </div>
            </>}
    </>
  );
}