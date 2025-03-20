const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        ref: "Projet",
        required: true,
    },
    projetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projet",
        required: true,
    },
    sendeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    recepientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    content: {
        type: String,
        ref: "Expert",
        required: true,
    },
    time: {
        type: Date,
        required: true
    },
    read: {
        type: Boolean
    }
}, { timestamps: true });

const notificationModel = mongoose.model("Notification", notificationSchema);

module.exports = notificationModel;