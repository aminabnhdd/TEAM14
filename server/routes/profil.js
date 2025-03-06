const express = require("express");
const router = express.Router();
const { userModel, expertModel } = require("../model/User");
const validateToken = require("../middlewares/authMiddleware");
const {validateRole} = require('../middlewares/roleMiddleware');
const bcrypt = require("bcrypt");
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;

router.get("/mon-compte", validateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token

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

// experttttt
router.put("/mon-compte/modifier", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const algerianPhoneRegex = /^\+213[5-7]\d{8}$/;

    if (updates.email && !emailRegex.test(updates.email)) {
      return res.status(400).json({ message: "Email format invalide." });
    }

    if (updates.email) {
      const existingUser = await userModel.findOne({ email: updates.email });
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

    // Update user
    const user = await userModel
      .findByIdAndUpdate(userId, updates, { new: true, runValidators: true })
      .select("-password -refreshToken -accessToken");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.json({ message: "Profile mis à jour.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/mon-compte/changer-mdp", validateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { oldmdp, newmdp, new2mdp } = req.body;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }
  
      const isMatch = await bcrypt.compare(oldmdp, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
      }
  
      if (newmdp !== new2mdp) {
        return res.status(400).json({ message: "Les nouveaux mots de passe ne correspondent pas." });
      }
      const hashedNewMdp = await bcrypt.hash(newmdp, 10);
  
      // Mettre à jour le mot de passe
      await userModel.findByIdAndUpdate(userId, { password: hashedNewMdp });
  
      res.status(200).json({ message: "Mot de passe changé avec succès !" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });

router.get("/expert/:id", validateToken, validateRole([expertRole, adminRole].filter(Boolean)), async (req, res) => { 
  try {
    const expertId = req.params.id; 

    const expert = await expertModel.findById(expertId).select("-password -refreshToken -accessToken"); 
    if (!expert) { 
      return res.status(404).json({ message: "Expert introuvable" });
    }

    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.post('/deconnexion', async (req, res) => {
  try {
  
      const refreshToken = req.cookies?.jwt;
      if (!refreshToken) {
        return res.sendStatus(204);
    } 
      const user = await userModel.findOne({ refreshToken });

      if (!user) {
          res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
          return res.sendStatus(204);
      }
      user.refreshToken = null;
      await user.save();
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

      res.json({ message: 'Déconnexion réussie.' });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});
//IL MANQUE CELLE DE PROJET MAIS BASICALLY ITS SAME PROCESS AS LA PAGE DECOUVRIR
module.exports = router;

