const express = require('express');
const router = express.Router();
const { userModel, expertModel } = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminRole = process.env.ADMIN_ROLE;
const ExpertRole = process.env.EXPERT_ROLE;



router.post('/signup/visiteur', async(req, res) => {
    const { name, lastName, email, password } = req.body;

    try {
        const foundUser = await userModel.findOne({ email: email });

        if (foundUser) return res.json({ error: 'email already taken' });

        //Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create the user
        const user = new userModel({
            name,
            lastName,
            email,
            password: hashedPwd,
            userValide: "true",
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
    const { name, lastName, email, password, discipline, labo, etablissement, expertise, projets } = req.body;

    try {
        const foundUser = await userModel.findOne({ email: email });

        if (foundUser) return res.json({ error: 'email already taken' });


        //Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        const expert = new expertModel({
            name,
            lastName,
            email,
            password: hashedPwd,
            role: ExpertRole,
            userValide: false,
            discipline,
            labo,
            etablissement,
            expertise,
            projets
        });

        await expert.save();
        res.status(201).json({
            message: "Account created successfully, awaiting admin validation!",
            expert: {
                id: expert.id,
                nom: expert.nom,
                prenom: expert.prenom,
                email: expert.email,
                role: expert.role
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});






router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await userModel.findOne({ email: email });
        if (!user) return res.status(404).json({ error: "There is no user with this email!" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(403).json({ error: "Invalid email or password" });

        if (!user.userValide) return res.status(403).json({ error: "Account not validated yet" });

        // Generate tokens
        const accessToken = jwt.sign(
            { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '900s' }
        );

        const refreshToken = jwt.sign(
            { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Save refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Send refresh token as HTTP-only cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 3600 * 24, 
            sameSite: 'none', 
            secure: true
        });

        res.json({
            refreshToken,
            accessToken,
            prenom: user.prenom,
            nom: user.nom,
            id: user._id,
            role: user.role
        });

    } catch (error) {
        console.log("login error", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
});





module.exports = router;