const express = require("express");
const router = express.Router();
const  sectionModel  = require("../model/section");
const  projetModel  = require("../model/Projet");
const  notificationModel = require("../model/Notification");
const conflitModel  = require("../model/conflit");
const validateToken = require("../middlewares/authMiddleware");
const {validateRole,validateProjectOwner} = require("../middlewares/roleMiddleware");
const isCollaborator = require("../middlewares/collaborationMiddleware");
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;
const nodemailer = require ('nodemailer');
const {expertModel,userModel} = require('../model/user');



router.put("/valider/:conflitId",validateToken, async (req, res) => {
    try {
      const { conflitId } = req.params;
      const { decision,notifId } = req.body;
      const conflit = await conflitModel.findById(conflitId);
      const notif = await notificationModel.findById(notifId);
      if (!conflit) {
        return res.status(404).json({ message: "Conflit non trouvé" });
      }
      if (notif.type !== "conflitSignale") {
        return res.status(400).json({ message: "invalid notification type",type:notif.type });
      }

      if (decision == "refuse") {
        await notificationModel.findByIdAndDelete(notifId);
        await conflitModel.findByIdAndDelete(conflitId);
        return res.status(200).json({ message: "Conflit supprimé avec succès." });
      } 
      else if (decision == "accept") {
        conflit.valide = true;
        conflit.lien = "lien vers chat";
        await conflit.save();
        const projet = await projetModel
        .findById(conflit.projetId)
        .populate("collaborateurs");

      const section = await sectionModel.findById(conflit.sectionId);

      const expert = projet.collaborateurs.find(
        (collab) =>
          collab.discipline &&
          collab.discipline.toLowerCase() == section.type.toLowerCase()
      );
      console.log(section)
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
      await notificationModel.findByIdAndDelete(notifId);
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

router.get("/", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationModel
      .find({ recepientId: userId })
      .sort({ time: -1 });

    const updatedNotifications = await Promise.all(
      notifications.map(async (notif) => {
        const user = await userModel.findById(notif.sendeId); 
        const rec = await userModel.findById(notif.recepientId);
        const projet = await projetModel.findById(notif.projetId);
        const conflit = await conflitModel.findById(notif.conflitId).populate("sectionId");
        const section = await sectionModel.findById(notif.sectionId);
        
        return {
          ...notif.toObject(), 
          sender: user?.nom || "" + " " + user?.prenom || "",
          recepient: rec?.nom || "" + " " + rec?.prenom || "",
          projet: projet?.titre || "",
          dom: conflit ? conflit.sectionId.type : section ? section.type : "",
        };
        
        
        
      })
    );

    return res.status(200).json({ notifications: updatedNotifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});



router.put("/collaboration/valider/:notifId", validateToken, async (req, res) => {
  try {
    const notif = await notificationModel.findById(req.params.notifId);
  const {decision}  = req.body;
  if (notif.type !== "demandeCollaboration") {
    return res.status(400).json({ message: "Invalid notification type" });
  }
  if (decision !== "accept" && decision !== "refuse") {
    return res.status(400).json({ message: "Invalid decision" });
  }
  if (decision === "accept") {
    const projet = await projetModel.findById(notif.projetId);
    projet.collaborateurs.push(notif.sendeId);
    await projet.save();
    const acceptNotif = await notificationModel.create({
      type: "demandeAccepte",
      projetId: notif.projetId,
      sendeId: req.user.id,
      recepientId: notif.sendeId,
      sectionId: notif.sectionId,
      content: "Votre demande de collaboration a été acceptée.",
      time: new Date(),
      read: false,
    });
  } else {
    const refuseNotif = await notificationModel.create({
      type: "demandeRefuse",
      projetId: notif.projetId,
      sendeId: req.user.id,
      recepientId: notif.sendeId,
      sectionId:notif.sectionId,
      content: "Votre demande de collaboration a été refusée.",
      time: new Date(),
      read: false,
    });
  }
  await notificationModel.findByIdAndDelete(req.params.notifId);
  return res.status(200).json({ message: "Decision recorded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});
router.put("/read/:notifId", validateToken, async (req, res) => {
  try {
    const { notifId } = req.params;
    const notification = await notificationModel.findById(notifId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.read = true;
    await notification.save();
    return res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
);
module.exports = router;

