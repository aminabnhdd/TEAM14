// Forbidden Page
// This page appears if the user tries to access a Route he doesn't have access to


import React from 'react';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 py-8">
      
      <div className="text-7xl md:text-8xl font-extrabold text-[#2b2b2b] mb-4">
        403
      </div>

      
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#2b2b2b] mb-4">
        Accès interdit
      </h1>

      
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Vous n'avez pas les permissions requises pour accéder à cette page
      </p>

      
      <button
        onClick={() => navigate('/discover')}
        className="bg-[#c57642] text-white px-6 py-3 rounded-full font-semibold 
                   shadow-md hover:bg-[#d6844e] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                   transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
      >
        Retour à l’accueil
      </button>
    </div>
  );
};

export default Forbidden;
