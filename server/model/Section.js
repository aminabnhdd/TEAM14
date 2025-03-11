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
        trim: true
    },
    annotations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Annotation",
    }],
    conflits: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conflit"
    }
});

const sectionModel = mongoose.model("Section", sectionSchema);

module.exports = sectionModel;