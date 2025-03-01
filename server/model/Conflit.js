const mongoose = require("mongoose");


const conflitSchema = new mongoose.Schema({
    projetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projet",
        required: true,
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    signaleur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    resolu: {
        type: Boolean
    },
    valide: {
        type: Boolean
    }
});

const conflitModel = mongoose.model("Conflit", conflitSchema);

module.exports =conflitModel;