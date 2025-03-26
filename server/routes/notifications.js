const express = require("express");
const router = express.Router();
const  sectionModel  = require("../model/section");
const  projetModel  = require("../model/Projet");
const  notificationModel = require("../model/notification");
const conflitModel  = require("../model/conflit");
const validateToken = require("../middlewares/authMiddleware");
const {validateRole,validateProjectOwner} = require("../middlewares/roleMiddleware");
const isCollaborator = require("../middlewares/collaborationMiddleware");
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;
const nodemailer = require ('nodemailer');


router.put("/:conflitId/valider",validateToken,validateProjectOwner, async (req, res) => {
    try {
      const { conflitId } = req.params;
      const { decision } = req.body;
      const conflit = await conflitModel.findById(conflitId);
      if (!conflit) {
        return res.status(404).json({ message: "Conflit non trouvé" });
      }
      if (decision == "accept") {
        conflit.valide = true;
        conflit.lien = "lien vers chat";
      } else if (decision == "refuse") {
        conflit.valide = false;
      }
      if ((conflit.valide)== true){
      await conflit.save();
      const projet = await projetModel
        .findById(conflit.projetId)
        .populate("collaborateurs");
      const section = await sectionModel.findById(conflit.sectionId);
      console.log(section._id);
      const expert = projet.collaborateurs.find(
        (collab) =>
          collab.discipline &&
          collab.discipline.toLowerCase().includes(section.type.toLowerCase())
      );

      section.conflits.push(conflit._id);
      await section.save();

      const people = [...new Set([projet.chef, conflit.signaleur, expert].filter(Boolean))];

      const notifications = people.map((person) => ({
        type: "conflitValide",
        projetId: conflit.projetId,
        sectionId: conflit.sectionId,
        conflitId: conflit._id,
        sendeId: conflit.signaleur,
        recepientId: person,
        content: conflit.content,
        time: new Date(),
        read: false,
      }));
      await notificationModel.insertMany(notifications);
      // redirect to chat but whereee
    }
      return res.status(200).json({
        message: `Conflit ${
          decision === "accept" ? "validé" : "rejeté"
        } avec succès.`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

router.get("/:notifId", validateToken, async (req, res) => {
  try {
    const { notifId } = req.params;

    const notification = await notificationModel.findById(notifId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (!notification.read) {
      notification.read = true;
      await notification.save();
    }

    return res
      .status(200)
      .json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;

