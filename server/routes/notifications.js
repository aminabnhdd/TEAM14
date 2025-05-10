const express = require("express");
require("dotenv").config();
const router = express.Router();
const sectionModel = require("../model/section");
const projetModel = require("../model/Projet");
const notificationModel = require("../model/Notification");
const conflitModel = require("../model/conflit");
const validateToken = require("../middlewares/authMiddleware");
const { expertModel, userModel } = require("../model/user");
const { google } = require("googleapis");
const mongoose = require('mongoose');
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3001/oauth2callback"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

router.get('/number',validateToken,async(req,res)=>{
  try {
    const userId = req.user.id;
    const notifications = await notificationModel.find({ recepientId: userId, read: false });
    return res.status(200).json({ number: notifications.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
})
router.put("/valider/:conflitId", validateToken, async (req, res) => {
  try {
    const { conflitId } = req.params;
    const { decision, notifId, time, date } = req.body;
    const conflit = await conflitModel.findById(conflitId);
    const notif = await notificationModel.findById(notifId);
    if (!conflit) {
      return res.status(404).json({ message: "Conflit non trouvé" });
    }
    if (notif.type !== "conflitSignale") {
      return res
        .status(400)
        .json({ message: "invalid notification type", type: notif.type });
    }

    if (decision == "refuse") {
      await notificationModel.findByIdAndDelete(notifId);
      await conflitModel.findByIdAndDelete(conflitId);
      return res.status(200).json({ message: "Conflit supprimé avec succès." });
    } else if (decision == "accept") {
      const section = await sectionModel.findById(conflit.sectionId);
      const signaleur = await expertModel.findById(conflit.signaleur);
      const projet = await projetModel
      .findById(conflit.projetId)
      .populate("collaborateurs"); 

      let expert = projet.collaborateurs.find(
        (collab) =>
          collab.discipline &&
          collab.discipline.toLowerCase() == section.type.toLowerCase()
      );
      if (section.type == 'autre' || section.type =='description'){
        expert =  await expertModel.findById(projet.chef);
      }

      const startDateTime = new Date(`${date}T${time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60000);
      const event = {
        summary: "Conflit Consultation",
        description: `Meeting programmé par le chef du projet. Le sujet du conflit est: ${conflit.content}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: "Africa/Algiers",
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: "Africa/Algiers",
        },
        attendees: [{ email: signaleur.email }, { email: expert.email }],
        conferenceData: {
          createRequest: {
            requestId: `meeting-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      };

      const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: "all",
      });

      conflit.valide = true;
      conflit.lien = response.data.hangoutLink;
      await conflit.save();

      console.log(section);
      const index = section.conflits.findIndex(
        (id) => id.toString() === conflit._id.toString()
      );

      if (index !== -1) {
        // Replace existing entry
        section.conflits[index] = conflit._id;
      } else {
        // Add new entry if not found
        section.conflits.push(conflit._id);
      }

      await section.save();

      const people = Array.from(
        new Set(
          [projet.chef, conflit.signaleur, expert]
            .filter(Boolean)
            .map(p => (typeof p === 'object' && p._id ? p._id.toString() : p.toString()))
        )
      ).map(id => new mongoose.Types.ObjectId(id));
      
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
});

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
        const conflit = await conflitModel
          .findById(notif.conflitId)
          .populate("sectionId");
        const section = await sectionModel.findById(notif.sectionId);
        return {
          ...notif.toObject(),
          senderId: user?._id,
          sender: (user?.nom || "") + " " + (user?.prenom || ""),
          recepient: (rec?.nom || "") + " " + (rec?.prenom || ""),
          projet: projet?.titre || "",
          chat: conflit?.lien || "",
          sectionId: section?._id || "",
          dom: conflit ? conflit.sectionId.type : section ? section.type : user.discipline,
        };
      })
    );

    return res.status(200).json({ notifications: updatedNotifications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put(
  "/collaboration/valider/:notifId",
  validateToken,
  async (req, res) => {
    try {
      const notif = await notificationModel.findById(req.params.notifId);
      const { decision } = req.body;
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
          sectionId: notif.sectionId,
          content: "Votre demande de collaboration a été refusée.",
          time: new Date(),
          read: false,
        });
      }
      await notificationModel.findByIdAndDelete(req.params.notifId);
      return res
        .status(200)
        .json({ message: "Decision recorded successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }
);
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
});

module.exports = router;
