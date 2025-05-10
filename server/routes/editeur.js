const express = require("express");
const router = express.Router();
const sectionModel = require("../model/section");
const {userModel,expertModel} = require('../model/user');
const projetModel = require("../model/Projet");
const notificationModel = require("../model/Notification");
const conflitModel = require("../model/conflit");
const referenceModel = require("../model/Reference");
const annotationModel = require("../model/Annotation");
const validateToken = require("../middlewares/authMiddleware");
const {validateRole} = require('../middlewares/roleMiddleware');
const isCollaborator = require("../middlewares/collaborationMiddleware");
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;
const { handleImages } = require('../middlewares/multerMiddleware');
const { upload } = require('../middlewares/multerMiddleware');
const { route } = require("./auth");

/**
 * Route PUT pour mettre à jour une section avec contenu et images
 * Nécessite un token d'authentification valide
 * Supporte l'upload de plusieurs images
 */
router.put("/editable/:sectionId", upload.array("images"), validateToken, handleImages, async (req, res) => {
    try {
        const sectionId = req.params.sectionId;
        let contenu = req.body.contenu;
        
        // Parse le contenu JSON envoyé
        try {
            contenu = contenu ? JSON.parse(contenu) : "";
        } catch (error) {
            console.error("Invalid JSON in contenu:", error);
            return res.status(400).json({ message: "Invalid format for contenu" });
        }
        
        // Recherche de la section dans la base de données
        const section = await sectionModel.findById(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        // Mise à jour du contenu
        section.contenu = contenu;

        // Mise à jour des images traitées par le middleware handleImages
        section.images = req.uploadedImages;

        // Sauvegarde des modifications
        await section.save();

        return res.status(200).json({ message: "Section updated successfully", section });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

/**
 * Route GET pour récupérer les détails d'une section 
 * Inclut ses annotations, conflits et informations du projet associé
 * Nécessite un token d'authentification valide
 */
router.get("/editable/:sectionId", validateToken, async (req, res) => {
    try {
        const sectionId = req.params.sectionId;
        const expertId = req.user.id;
        
        // Vérification que l'expert existe
        const expert = await expertModel.findById(expertId);
       
        if (!expert){
            return res.status(404).json({ message: "Expert not found" });
        }

        // Recherche de la section avec population des relations
        const section = await sectionModel.findById(sectionId)
            .populate({
                path: "annotations",
                populate: { path: "auteur" }
            })
            .populate({
                path: "conflits",
                match: { resolu: false, valide: true }, // Uniquement les conflits non résolus et validés
                populate: { path: "signaleur" }
            })
            .populate({
                path: "projetId",
                populate: [
                    { path: "chef" },
                    { path: "collaborateurs" },
                    { path: "references" }
                ]
            });

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        const projet = section.projetId;
        const userChef = projet.chef;

        // Retourne la section et toutes ses données associées
        return res.status(200).json({
            section,
            images: section.images,
            userEditing: expert,
            userChef,
            projet,
            annotations: section.annotations,
            conflits: section.conflits,
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

/**
 * Route POST pour signaler un conflit sur une section
 * Nécessite un token d'authentification valide et être collaborateur du projet
 * Crée une notification pour le chef de projet
 */
router.post("/conflits/:projetId/:sectionId", validateToken, isCollaborator, async (req, res) => {
    try {
        const { projetId, sectionId } = req.params;
        const { content } = req.body;
        const expertId = req.user.id;

        // Vérification que la section existe
        const section = await sectionModel.findById(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section non trouvée" });
        }

        // Vérification que le projet existe
        const projet = await projetModel.findById(projetId);
        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }

        // Création du conflit
        const conflit = new conflitModel({
            projetId,
            sectionId,
            signaleur: expertId,
            resolu: false,
            valide: false,
            content,
        });
        await conflit.save();

        // Création d'une notification pour le chef de projet
        const notification = new notificationModel({
            type: "conflitSignale",
            projetId,
            sectionId,
            sendeId: expertId,  
            recepientId: projet.chef, 
            conflitId: conflit._id,
            content,
            time: new Date(),
            read: false
        });

        await notification.save();
        
        // Ajout du conflit à la section
        section.conflits = section.conflits || [];
        section.conflits.push(conflit._id);
        await section.save();
        
        return res.status(201).json({ 
            message: "Conflit signalé et notifications envoyées.",
            conflit 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

/**
 * Route PUT pour résoudre un conflit
 * Nécessite un token d'authentification valide
 * Seul le signaleur du conflit ou le chef de projet peut résoudre le conflit
 * Crée des notifications pour tous les collaborateurs
 */
router.put("/conflits/:conflitId/resolu", validateToken, async (req, res) => {
    try {
        const { conflitId } = req.params;
        const expertId = req.user.id;

        const conflit = await conflitModel.findById(conflitId);
        if (!conflit) {
            return res.status(404).json({ message: "Conflit non trouvé" });
        }

        const projet = await projetModel.findById(conflit.projetId);

        if ((conflit.signaleur.toString() !== expertId) && (projet.chef.toString() !== expertId )  ) {
            return res.status(403).json({ message: "Accès refusé. Seul le signaleur ou le chef de projet peut résoudre ce conflit." });
        }


        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }

        conflit.resolu = true;
        await conflit.save();

        const notifications = projet.collaborateurs.map(collaborateur => ({
            type: "conflitResolu",
            projetId: conflit.projetId,
            sectionId: conflit.sectionId,
            conflitId: conflit._id,
            sendeId: expertId, 
            recepientId: collaborateur, 
            content: conflit.content,
            time: new Date(),
            read: false
        }));

        await notificationModel.insertMany(notifications);

        return res.status(200).json({ message: "Le conflit a été marqué comme résolu avec succès et les collaborateurs ont été notifiés." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

/**
 * Route POST pour créer une annotation sur une section
 * Nécessite un token d'authentification valide et être collaborateur du projet
 */
router.post("/annoter/:projetId/:sectionId", validateToken, isCollaborator, async (req, res) => {
    try {
      const { content } = req.body;
      const { projetId, sectionId } = req.params;
      const expertId = req.user.id;
  
      // Vérification que la section existe
      const section = await sectionModel.findById(sectionId);
      if (!section) {
        return res.status(404).json({ message: "Section non trouvée." });
      }
  
      // Création de l'annotation
      const annotation = new annotationModel({
        projetId,
        sectionId,
        auteur: expertId,
        content,
      });
  
      // Sauvegarde et population des données de l'auteur
      const savedAnnotation = await annotation.save();
      const populatedAnnotation = await savedAnnotation.populate("auteur", "nom prenom");
  
      // Ajout de l'annotation à la section
      section.annotations.push(savedAnnotation._id);
      await section.save();
  
      return res.status(201).json({
        message: "Annotation enregistrée avec succès",
        annotation: populatedAnnotation,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });

/**
 * Route PUT pour mettre à jour le contenu d'une section après annotation
 * Nécessite un token d'authentification valide et être collaborateur du projet
 */
router.put("/annoter/:projetId/:sectionId/update", validateToken, isCollaborator, async (req, res) => {
    try {
      const { editor_content } = req.body;
      const { sectionId } = req.params;
      const expertId = req.user.id;
  
      // Vérification que la section existe
      const section = await sectionModel.findById(sectionId);
      if (!section) {
        return res.status(404).json({ message: "Section non trouvée." });
      }
  
      // Mise à jour du contenu
      section.contenu = JSON.parse(editor_content);
      await section.save();
      
      // Récupération de la section mise à jour avec toutes les relations
      const populatedSection = await sectionModel.findById(sectionId)
        .populate({
          path: "annotations",
          populate: { path: "auteur" },
        })
        .populate({
          path: "conflits",
          match: { resolu: false, valide: true },
          populate: { path: "signaleur" },
        })
        .populate({
          path: "projetId",
          populate: [
            { path: "chef" },
            { path: "collaborateurs" },
          ],
        });
  
      return res.status(200).json({
        message: "Section mise à jour avec succès",
        section: populatedSection,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  });

/**
 * Route POST pour ajouter une référence à un projet
 * Nécessite un token d'authentification valide et être collaborateur du projet
 */
router.post("/references/:projetId", validateToken, isCollaborator, async (req, res) => {
    try {
        const { projetId } = req.params;
        const { number, text } = req.body;
        const expertId = req.user.id;

        // Vérification que le projet existe
        const projet = await projetModel.findById(projetId);
        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }

        // Création de la référence
        const reference = new referenceModel({
            projetId,
            number,
            text
        });

        await reference.save();

        // Ajout de la référence au projet
        projet.references.push(reference._id);
        await projet.save();

        return res.status(201).json({ 
            message: "Reference created",
            reference
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;