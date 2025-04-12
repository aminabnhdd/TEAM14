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
        unique: true,
        trim: true
    },
    longitude: {
        type: String,
        unique: true,
        trim: true
    },
    longitude: {
        type: String,
        unique: true,
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
        type:String,
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
    },
    collaborateurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
    }],
    references: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reference",
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
        ref: "Expert",
        default: null,
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