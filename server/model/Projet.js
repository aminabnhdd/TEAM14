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
    latitude: {
        type: String,
        default:"",
        trim: true
    },
    longtitude: {
        type: String,
        default:"",
        trim: true
    },
    localisation: {
        type: String,
        trim: true
    },
    style: {
        type: String,
        trim: true
    },
    photoUrl: {
        type: String,
        default:""
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
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    }],
    archivePar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
    },
    archive: {
        type: Boolean,
        default:false
    },
}, { timestamps: true });

const projetModel = mongoose.model("Projet", projetSchema);

module.exports = projetModel;