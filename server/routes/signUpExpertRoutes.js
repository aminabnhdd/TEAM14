var express = require('express');
var router = express.Router();
require("../model/user");
const Expert = require("../model/user");
const bcrypt = require('bcrypt');



router.post("/", async(req, res) => {
    try {
        const { nom, prenom, email, password, discipline, labo, etablissement, niveau, projets } = req.body;

        //Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        const expert = new Expert({
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