const mongoose = require("mongoose");


const annotationAISchema = new mongoose.Schema({
    imageUrl: {
        type: String,
    },
    content: {
        type: String,
    },
    public: {
        type: Boolean,
        default: false
    }
});

const annotationAIModel = mongoose.model("AnnotationAI", annotationAISchema);

module.exports = annotationAIModel;