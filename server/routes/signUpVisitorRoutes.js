var express = require('express');
var router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcrypt');



router.post("/", async(req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;

        //Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create the user
        const user = new User({
            nom,
            prenom,
            email,
            password: hashedPwd,
            role: "visitor"
        });

        await user.save();
        res.send("ser registered sucessfully");
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", (req, res) => {
    res.send("ndpoint for visitor registration is working ! ");
})

module.exports = router;