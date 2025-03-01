const express = require('express');
const router = express.Router();
const { userModel, expertModel } = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminRole = process.env.ADMIN_ROLE;
const ExpertRole = process.env.EXPERT_ROLE;



router.post('/signup/visitor', async(req, res) => {
    const { nom, prenom, email, password } = req.body;

    try {
        const foundUser = await userModel.findOne({ email: email });

        if (foundUser) return res.json({ error: 'email already taken' });

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






router.post('/signup/expert', async(req, res) => {
    const { nom, prenom, email, password, discipline, labo, etablissement, niveau, projets } = req.body;

    try {
        const foundUser = await userModel.findOne({ email: email });

        if (foundUser) return res.json({ error: 'email already taken' });


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






router.post('/login', async(req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) return res.status(404).json({ error: 'there is no user with this email !' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ error: 'invalid email or password ' });


    if (!user.userValide) return res.status(403).json({ err: "account not validated yet" });


    const accessToken = jwt.sign({ nom: user.nom, prenom: user.prenom, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s' });
    const refreshToken = jwt.sign({ nom: user.nom, prenom: user.prenom, email: user.email, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    user.refreshToken = refreshToken;
    await user.save();


    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1000 * 3600 * 24, sameSite: 'none', secure: true });

    res.json({ refreshToken: refreshToken, accessToken: accessToken, prenom: user.prenom, nom: user.nom, id: user._id, role: user.role });


});


router.post('/password/forgotten', async(req, res) => {




});

module.exports = router;