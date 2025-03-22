import React, { createContext, useState, useContext, useEffect } from "react";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  // Charger les projets depuis localStorage au démarrage
  const loadProjects = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  };

  const [myProjects, setMyProjects] = useState(() => 
    loadProjects("myProjects", [{ projetId: 1, photoUrl:"https://upload.wikimedia.org/wikipedia/commons/d/d4/AlgerCasbah.jpg", title: "La casbah" },
    { projetId: 2, photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Basilique_Notre_Dame_d%27Afrique2.jpg", title: "Notre-Dame d'Afrique" },
    { projetId: 3, photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Palace_khdaouedj_amia.jpg/1920px-Palace_khdaouedj_amia.jpg", title: "Dar Khdaouadj El Amia" },
  ])
  );

  const [archivedProjects, setArchivedProjects] = useState(() => 
    loadProjects("archivedProjects", [
      { projetId: 5, photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Timgad_la_ville.jpg", title: "Timgad" },
      { projetId: 6, photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Martyrs_Memorial._Algiers%2C_Algeria.jpg/1920px-Martyrs_Memorial._Algiers%2C_Algeria.jpg", title: "Maqam Echahid" },
    { projetId: 7, photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Grande_Mosqu%C3%A9e_d%27Alger.jpg", title: "La Grande Mosquée d'Alger" }
    ])
  );
  

  // Mettre à jour localStorage à chaque changement de projet
  useEffect(() => {
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
  }, [myProjects]);

  useEffect(() => {
    localStorage.setItem("archivedProjects", JSON.stringify(archivedProjects));
  }, [archivedProjects]);

  // Fonction pour restaurer un projet
  const restoreProject = (project) => {
    setArchivedProjects(prevProjects => {
      const updatedArchived = prevProjects.filter(p => p.projetId !== project.projetId);
      localStorage.setItem("archivedProjects", JSON.stringify(updatedArchived)); 
      return updatedArchived;
    });

    setMyProjects(prevProjects => {
      const updatedMyProjects = [...prevProjects, project];
      localStorage.setItem("myProjects", JSON.stringify(updatedMyProjects)); 
      return updatedMyProjects;
    });
  };

  return (
    <ProjectsContext.Provider value={{ myProjects, archivedProjects, restoreProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);

// Ce fichier gère le contexte des projets dans l'application.
// - `ProjectsProvider` stocke et met à jour les projets actifs et archivés en utilisant `localStorage`.
// - `loadProjects` récupère les projets sauvegardés ou initialise une valeur par défaut.
// - `restoreProject` permet de restaurer un projet archivé en le transférant dans les projets actifs.
// - `useProjects` est un hook personnalisé qui fournit l'accès au contexte des projets.
// - Les projets sont mis à jour en temps réel et sauvegardés immédiatement dans `localStorage`.

