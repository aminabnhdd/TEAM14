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
        required: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    dateConstruction: {
        type: Date,
        required: true
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    collaborateurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    }],
    demandes: [{

        expert: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert",
            required: true
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
        required: true,
    },
    archive: {
        type: Boolean,
        required: true
    },
    keywords: {

    }
}, { timestamps: true });

const projetModel = mongoose.model("Projet", projetSchema);

module.exports = projetModel;