// Importation des modules nécessaires
const express = require("express");
require("dotenv").config();
const router = express.Router();
const sectionModel = require("../model/Section");
const projetModel = require("../model/Projet");
const notificationModel = require("../model/Notification");
const conflitModel = require("../model/Conflit");
const validateToken = require("../middlewares/authMiddleware");
const { expertModel, userModel } = require("../model/User");
const { google } = require("googleapis");
const mongoose = require('mongoose');

// Configuration du client OAuth2 pour l'API Google Calendar
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3001/oauth2callback"
);

// Configuration des identifiants avec le refresh token stocké dans les variables d'environnement
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// Initialisation de l'API Google Calendar
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

/**
 * Route GET '/number' - Récupère le nombre de notifications non lues pour l'utilisateur connecté
 * Middleware: validateToken - Vérifie que l'utilisateur est authentifié
 * Réponse: Nombre de notifications non lues
 */
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

/**
 * Route PUT '/valider/:conflitId' - Valide ou refuse un conflit signalé
 * Middleware: validateToken - Vérifie que l'utilisateur est authentifié
 * Paramètres: 
 *   - conflitId: ID du conflit à valider
 * Corps de la requête:
 *   - decision: 'accept' ou 'refuse'
 *   - notifId: ID de la notification à traiter
 *   - time: Heure de la réunion (si accepté)
 *   - date: Date de la réunion (si accepté)
 * Actions:
 *   - Si refusé: Supprime la notification et le conflit
 *   - Si accepté: Crée un événement Google Calendar avec les parties concernées, met à jour le conflit et crée des notifications
 */
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

      // Recherche l'expert responsable de la discipline correspondant au type de section
      let expert = projet.collaborateurs.find(
        (collab) =>
          collab.discipline &&
          collab.discipline.toLowerCase() == section.type.toLowerCase()
      );
      // Pour les sections de type 'autre' ou 'description', le chef de projet est l'expert
      if (section.type == 'autre' || section.type =='description'){
        expert =  await expertModel.findById(projet.chef);
      }

      // Configuration de l'événement Google Calendar pour la réunion
      const startDateTime = new Date(`${date}T${time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60000); // Durée de 1 heure
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

      // Création de l'événement dans Google Calendar
      const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: "all", // Envoie des emails aux participants
      });

      // Mise à jour du conflit avec le lien de la réunion
      conflit.valide = true;
      conflit.lien = response.data.hangoutLink;
      await conflit.save();

      console.log(section);
      // Mise à jour ou ajout du conflit dans la section
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

      // Création d'un ensemble unique d'IDs de personnes concernées par le conflit
      const people = Array.from(
        new Set(
          [projet.chef, conflit.signaleur, expert]
            .filter(Boolean)
            .map(p => (typeof p === 'object' && p._id ? p._id.toString() : p.toString()))
        )
      ).map(id => new mongoose.Types.ObjectId(id));
      
      // Création des notifications pour toutes les personnes concernées
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

/**
 * Route GET '/:notifId' - Marque une notification spécifique comme lue et la récupère
 * Middleware: validateToken - Vérifie que l'utilisateur est authentifié
 * Paramètres:
 *   - notifId: ID de la notification à récupérer
 * Réponse: Notification marquée comme lue
 */
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

/**
 * Route GET '/' - Récupère toutes les notifications de l'utilisateur connecté
 * Middleware: validateToken - Vérifie que l'utilisateur est authentifié
 * Réponse: Liste des notifications avec informations complémentaires (expéditeur, projet, etc.)
 */
router.get("/", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    // Récupération des notifications triées par date (les plus récentes d'abord)
    const notifications = await notificationModel
      .find({ recepientId: userId })
      .sort({ time: -1 });

    // Enrichissement des données de notification avec des informations complémentaires
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
          userDom: rec ? rec.discipline : "",
          projet: projet?.titre || "",
          chat: conflit?.lien || "",
          sectionId: section ? section._id : "",
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

/**
 * Route PUT '/collaboration/valider/:notifId' - Accepte ou refuse une demande de collaboration
 * Middleware: validateToken - Vérifie que l'utilisateur est authentifié
 * Paramètres:
 *   - notifId: ID de la notification de demande de collaboration
 * Corps de la requête:
 *   - decision: 'accept' ou 'refuse'
 * Actions:
 *   - Si acceptée: Ajoute le demandeur aux collaborateurs du projet et crée une notification d'acceptation
 *   - Si refusée: Crée une notification de refus
 *   - Dans les deux cas, supprime la notification de demande originale
 */
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

/**
 * Route PUT '/read/:notifId' - Marque une notification comme lue
 * Middleware: validateToken - Vérifie que l'utilisateur est authentifié
 * Paramètres:
 *   - notifId: ID de la notification à marquer comme lue
 * Réponse: Message de confirmation
 */
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