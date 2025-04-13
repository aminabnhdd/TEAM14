const mongoose = require("mongoose");


const projetSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    coord: {
        type: String,
        default: "",
        trim: true
    },
    localisation: {
        type: String,
        trim: true
    },
    style: {
        type: String,
        required: true,
        trim: true
    },
    photoUrl: {
        type: String,
        default: ""
    },
    dateConstruction: {
        type: Date,
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    collaborateurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
    }],
    demandes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
    }],
    sections: [{ //list of ids of sections contained in a peoject
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    }],
    archivePar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    keywords: {
        type: String
    },
    archive: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const projectModel = mongoose.model("Projet", projetSchema);

module.exports = projectModel;