const mongoose = require("mongoose");


const referenceSchema = new mongoose.Schema({
    projetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projet",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    number:{
        type: Number,
        required: true,
        
    }

});

const referenceModel = mongoose.model("Reference", referenceSchema);

module.exports = referenceModel;