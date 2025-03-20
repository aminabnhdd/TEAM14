const mongoose = require("mongoose");


const sectionSchema = new mongoose.Schema({
    projetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projet",
        required: true,
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    contenu: {
        type: String,
        required: true,
        trim: true
    },
    annotations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Annotation",
        required: true,
    }],
    conflits: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conflit",
        required: true
    }
});

const sectionModel = mongoose.model("Section", sectionSchema);

module.exports = sectionModel;