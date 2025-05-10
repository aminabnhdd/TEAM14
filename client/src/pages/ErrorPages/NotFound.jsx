// Not Found Page
// This page appears if the Route doesn't exist

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 py-8">
      
      <div className="text-7xl md:text-8xl font-extrabold text-[#2b2b2b] mb-4">
        404
      </div>

      
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#2b2b2b] mb-4">
        Page non trouvée
      </h1>

      
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      
      <button
        onClick={() => navigate('/')}
        className="bg-[#c57642] text-white px-6 py-3 rounded-full font-semibold 
                   shadow-md hover:bg-[#d6844e] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                   transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
      >
        Retour à l'accueil
      </button>
    </div>
  );
};

export default NotFound;
