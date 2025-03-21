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
        required: true,
        unique: true,
        trim: true
    },
    localisation: {
        type: String,
        required: true,
        trim: true
    },
    style: {
        type: String,
        required: true,
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
    },
    collaborateurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
    }],
    demandes: [{

        expert: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert",
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }

    }],
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",

    }],
    archivePar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    archive: {
        type: Boolean,
        required: true
    },
    keywords: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const projetModel = mongoose.model("Projet", projetSchema);

module.exports = projetModel;