var express = require('express');
var router = express.Router();
const { userModel, expertModel } = require("../model/user");
const bcrypt = require('bcrypt');



router.post("/visitors", async(req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;

        //Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create the user
        const user = new userModel({
            nom,
            prenom,
            email,
            password: hashedPwd,
            role: "visitor"
        });

        await user.save();
        res.send("user registered sucessfully");
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



router.post("/experts", async(req, res) => {
    try {
        const { nom, prenom, email, password, discipline, labo, etablissement, niveau, projets } = req.body;

        //Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        const expert = new expertModel({
            nom,
            prenom,
            email,
            password: hashedPwd,
            role: "expert",
            userValide: false,
            discipline,
            labo,
            etablissement,
            niveau,
            projets
        });

        await expert.save();
        res.send("account created sucessfully awaiting for admin validation ! ");
        res.status(201).json({ expert });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;