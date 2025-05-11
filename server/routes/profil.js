const express = require("express");
const router = express.Router();
const { userModel, expertModel } = require("../model/User");
const projetModel= require("../model/Projet");
const validateToken = require("../middlewares/authMiddleware");
const {validateRole} = require('../middlewares/roleMiddleware');
const bcrypt = require("bcrypt");
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;
const cloudinary = require('../config/cloudinary');
const { upload } = require('../middlewares/multerMiddleware');

/**
 * Route GET pour récupérer les informations du compte de l'utilisateur connecté
 * Nécessite un token d'authentification valide
 */
router.get("/mon-compte", validateToken, async (req, res) => {
  try {
    const userId = req.user.id; // ID extrait du token JWT

    // Recherche de l'utilisateur dans la base de données en excluant les champs sensibles
    const user = await userModel
      .findById(userId)
      .select("-password -refreshToken -accessToken");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


/**
 * Route PUT pour modifier les informations du compte utilisateur
 * Nécessite un token d'authentification valide
 * Supporte l'upload d'une image de profil
 */
router.put("/mon-compte/modifier", validateToken, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    // Regex pour valider le format de l'email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Regex pour valider le format des numéros de téléphone algériens
    const algerianPhoneRegex = /^\+213[5-7]\d{8}$/;

    // Validation du format de l'email
    if (updates.email && !emailRegex.test(updates.email)) {
      return res.status(400).json({ message: "Email format invalide." });
    }

    // Vérification si l'email existe déjà pour un autre utilisateur
    if (updates.email) {
      const existingUser = await userModel.findOne({ email: updates.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email déja utilisé" });
      }
    }

    // Blocage de la modification du mot de passe par cette route
    if (updates.password) {
      return res
        .status(400)
        .json({ message: "Mot de passe ne peut pas être changé içi." });
    }

    // Validation du format du numéro de téléphone
    if (updates.phoneNumber && !algerianPhoneRegex.test(updates.phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Invalid phone number format. Use +213XXXXXXXXX." });
    }

    // Traitement de l'upload d'image si présent
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updates.pfp = result.secure_url;
    }
    
    // Mise à jour de l'utilisateur dans la base de données
    const user = await userModel
      .findByIdAndUpdate(userId, updates, { new: true, runValidators: true })
      .select("-password -refreshToken -accessToken -otl");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.json({ message: "Profile mis à jour.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * Route PUT pour modifier les informations du compte expert
 * Similaire à la route précédente mais pour les experts
 */
router.put("/mon-compte/modifier/expert", validateToken, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const algerianPhoneRegex = /^\+213[5-7]\d{8}$/;

    // Validation du format de l'email
    if (updates.email && !emailRegex.test(updates.email)) {
      return res.status(400).json({ message: "Email format invalide." });
    }

    // Vérification si l'email existe déjà pour un autre expert
    if (updates.email) {
      const existingUser = await expertModel.findOne({ email: updates.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email déja utilisé" });
      }
    }

    if (updates.password) {
      return res
        .status(400)
        .json({ message: "Mot de passe ne peut pas être changé içi." });
    }

    if (updates.phoneNumber && !algerianPhoneRegex.test(updates.phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Invalid phone number format. Use +213XXXXXXXXX." });
    }
    
    // Traitement de l'upload d'image
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updates.pfp = result.secure_url;
    }
    
    // Mise à jour de l'expert dans la base de données
    const user = await expertModel
      .findByIdAndUpdate(userId, updates, { new: true, runValidators: true })
      .select("-password -refreshToken -accessToken -otl");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.json({ message: "Profile mis à jour.", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * Route PUT pour changer le mot de passe de l'utilisateur
 * Nécessite un token d'authentification valide
 */
router.put("/mon-compte/changer-mdp", validateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { oldmdp, newmdp, new2mdp } = req.body;
  
      // Récupération de l'utilisateur pour vérifier l'ancien mot de passe
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }
  
      // Vérification si l'ancien mot de passe est correct
      const isMatch = await bcrypt.compare(oldmdp, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Ancien mot de passe incorrect" });
      }
  
      // Vérification si les deux nouveaux mots de passe correspondent
      if (newmdp !== new2mdp) {
        return res.status(400).json({ message: "Les nouveaux mots de passe ne correspondent pas." });
      }
      
      // Hachage du nouveau mot de passe
      const hashedNewMdp = await bcrypt.hash(newmdp, 10);
  
      // Mise à jour du mot de passe
      await userModel.findByIdAndUpdate(userId, { password: hashedNewMdp });
  
      res.status(200).json({ message: "Mot de passe changé avec succès !" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });

/**
 * Route GET pour récupérer les informations d'un expert spécifique
 * Nécessite un token d'authentification valide et un rôle d'expert ou admin
 */
router.get("/expert/:id", validateToken, validateRole([expertRole, adminRole].filter(Boolean)), async (req, res) => { 
  try {
    const expertId = req.params.id; // ID de l'expert à récupérer

    // Recherche de l'expert dans la base de données en excluant les champs sensibles
    const expert = await expertModel.findById(expertId).select("-password -refreshToken -accessToken"); 
    if (!expert) { 
      return res.status(404).json({ message: "Expert introuvable" });
    }

    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/**
 * Route GET pour récupérer les informations d'un utilisateur visiteur
 * Nécessite un token d'authentification valide
 */
router.get("/visiteur/:id", validateToken, async (req, res) => { 
  try {
    const id = req.params.id; // ID du visiteur à récupérer

    // Recherche du visiteur dans la base de données en excluant les champs sensibles
    const visiteur = await userModel.findById(id).select("-password -refreshToken -accessToken"); 
    if (!visiteur) { 
      return res.status(404).json({ message: "Visiteur introuvable" });
    }

    res.json(visiteur);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/**
 * Route GET pour récupérer les projets d'un expert spécifique
 * Nécessite un token d'authentification valide et un rôle d'expert ou admin
 */
router.get("/expert/:id/projets", validateToken, validateRole([expertRole, adminRole].filter(Boolean)), async (req, res) => {
    try {
      const expertId = req.params.id;

      // Recherche de tous les projets où l'expert est le chef
      const projects = await projetModel.find({ chef: expertId })
        .select("titre photoUrl type style");

      return res.status(200).json({ projects });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
);

/**
 * Route POST pour déconnecter l'utilisateur
 * Supprime le refreshToken et efface le cookie JWT
 */
router.post('/deconnexion', async (req, res) => {
  try {
      // Récupération du refreshToken depuis les cookies
      const refreshToken = req.cookies?.jwt;
      if (!refreshToken) {
        return res.sendStatus(204); // Si pas de token, rien à faire
    } 
      // Recherche de l'utilisateur par refreshToken
      const user = await userModel.findOne({ refreshToken });

      if (!user) {
          // Si aucun utilisateur trouvé avec ce token, nettoyage du cookie quand même
          res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
          return res.sendStatus(204);
      }
      
      // Réinitialisation du refreshToken dans la base de données
      user.refreshToken = null;
      await user.save();
      
      // Suppression du cookie JWT
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

      res.json({ message: 'Déconnexion réussie.' });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});


module.exports = router;