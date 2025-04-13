const mongoose = require("mongoose");


const annotationSchema = new mongoose.Schema({
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
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }
});

const annotationModel = mongoose.model("Annotation", annotationSchema);

module.exports = annotationModel;