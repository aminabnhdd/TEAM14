const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    prenom: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: process.env.VISITOR_ROLE
    },
    userValide: {
        type: Boolean,
        default: false
    },
    refreshToken:{
        type:String,
        default:""
    }
}, { timestamps: true }); //timestamps manages automatically two fields createdat and updatedat

const userModel = mongoose.model("User", userSchema);


const expertSchema = new mongoose.Schema({
    discipline: {
        type: String,
        required: true
    },
    labo: {
        type: String,
        required: true
    },
    etablissement: {
        type: String,
        required: true
    },
    niveau: {
        type: String,
        required: true
    },
    projets: {
        type: [mongoose.SchemaTypes.ObjectId],
        default:[]
    }

})


const expertModel = userModel.discriminator("Expert", expertSchema);




module.exports = {userModel,expertModel};

