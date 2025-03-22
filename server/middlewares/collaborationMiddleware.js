const Projet = require("../model/Projet");

const isCollaborator = async (req,res,next)=>{
    try {
        const expertId = req.user.id;
        const {projetId }= req.params;
        const projet = await Projet.findById(projetId);
        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }
        if (projet.collaborateurs.includes(expertId)){
            return next()
        }
        return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas collaborateur." });

    }
    catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error });
    }
}

module.exports = isCollaborator;

