const express = require("express");
const router = express.Router();
const sectionModel = require("../model/section");
const projetModel = require("../model/Projet");
const notificationModel = require("../model/notification");
const conflitModel = require("../model/conflit");
const annotationModel = require("../model/Annotation");
const validateToken = require("../middlewares/authMiddleware");
const {validateRole} = require('../middlewares/roleMiddleware');
const isCollaborator = require("../middlewares/collaborationMiddleware");
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;


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
            sendeId: expertId,  
            recepientId: projet.chef, 
            conflitId: conflit._id,
            content,
            time: new Date(),
            read: false

        });

        await notification.save()

        return res.status(201).json({ message: "Conflit signalé et notifications envoyées." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

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


router.post("/annoter/:projetId/:sectionId", validateToken, isCollaborator, async (req, res) => {
    try {
        const { textSelected, content, expertId } = req.body;
        const { projetId, sectionId } = req.params;

        const section = await sectionModel.findById(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section non trouvée." });
        }

        const annotation = new annotationModel({
            projetId,
            sectionId,
            auteur: expertId,
            selected: textSelected,
            content
        });

        await annotation.save();

        section.annotations.push(annotation._id);
        await section.save();

        return res.status(201).json({ 
            message: "Annotation enregistrée avec succès", 
            annotation 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;
