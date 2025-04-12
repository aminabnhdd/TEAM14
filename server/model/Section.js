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
        type: Object, // Or use Schema.Types.Mixed for flexibility
        default: () => ({
            "type": "doc",
            "content": []
          })
    },
    annotations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Annotation",
        default: () => []
    },
    conflits: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Conflit",
        default: () => []
      },
    images: {
        type: [String],
        default: () => []
      }
});

const sectionModel = mongoose.model("Section", sectionSchema);

module.exports = sectionModel;