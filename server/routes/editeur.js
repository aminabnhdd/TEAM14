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
// Sauvegarder section
router.put("/editable/:sectionId", upload.array("images"), validateToken, handleImages, async (req, res) => {
    try {
        const sectionId = req.params.sectionId;
        let contenu = req.body.contenu;
        try {
            contenu = contenu ? JSON.parse(contenu) : "";
        } catch (error) {
            console.error("Invalid JSON in contenu:", error);
            return res.status(400).json({ message: "Invalid format for contenu" });
        }
        const section = await sectionModel.findById(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        // Update text content
        section.contenu = contenu;

        section.images = req.uploadedImages;

        await section.save();

        return res.status(200).json({ message: "Section updated successfully", section });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

    router.get("/editable/:sectionId", validateToken, async (req, res) => {
    try {
        const sectionId = req.params.sectionId;
        const expertId = req.user.id;
        const expert = await expertModel.findById(expertId);
       
        if (!expert){
            return res.status(404).json({ message: "Expert not found" });
        }

        const section = await sectionModel.findById(sectionId)
            .populate({
                path: "annotations",
                populate: { path: "auteur" }
            })
            .populate({
                path: "conflits",
                match: { resolu: false, valide: true },
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
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

// Signaler conflit
router.post("/conflits/:projetId/:sectionId", validateToken, isCollaborator, async (req, res) => {
    try {
        const { projetId, sectionId } = req.params;
        const { content } = req.body;
        const expertId = req.user.id;

        const section = await sectionModel.findById(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section non trouvée" });
        }

        const projet = await projetModel.findById(projetId);

        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }

        const conflit = new conflitModel({
            projetId,
            sectionId,
            signaleur:expertId,
            resolu: false,
            valide: false,
            content,
        });
        await conflit.save();


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

        await notification.save()
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

// Résoudre conflit
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

// Annoter section
router.post("/annoter/:projetId/:sectionId", validateToken, isCollaborator, async (req, res) => {
    try {
      const { content } = req.body;
      const { projetId, sectionId } = req.params;
      const expertId = req.user.id;
  
      const section = await sectionModel.findById(sectionId);
      if (!section) {
        return res.status(404).json({ message: "Section non trouvée." });
      }
  
      const annotation = new annotationModel({
        projetId,
        sectionId,
        auteur: expertId,
        content,
      });
  
      const savedAnnotation = await annotation.save();
      const populatedAnnotation = await savedAnnotation.populate("auteur", "nom prenom");
  
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

// Mettre à jour section apres annotation
router.put("/annoter/:projetId/:sectionId/update", validateToken, isCollaborator, async (req, res) => {
    try {
      const { editor_content } = req.body;
      const {  sectionId } = req.params;
      const expertId = req.user.id;
  
      const section = await sectionModel.findById(sectionId);
      if (!section) {
        return res.status(404).json({ message: "Section non trouvée." });
      }
  
      section.contenu = JSON.parse(editor_content);
      await section.save();
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

  // Ajouter une référence
router.post("/references/:projetId", validateToken, isCollaborator, async (req, res) => {
    try {
        const { projetId} = req.params;
        const { number,text } = req.body;
        const expertId = req.user.id;


        const projet = await projetModel.findById(projetId);

        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }

        const reference = new referenceModel({
            projetId,
            number,
            text
        });

        await reference.save();

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
