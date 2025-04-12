const express = require('express');
const router = express.Router();
const {userModel,expertModel} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const { upload } = require('../middlewares/multerMiddleware');

const AdminRole = process.env.ADMIN_ROLE;
const ExpertRole = process.env.EXPERT_ROLE;



router.post('/signup/visitor',async (req,res)=>{
    try {
        const {nom,prenom,email,password} = req.body;


        const foundUser = await userModel.findOne({email:email});
        if (foundUser) return res.json({error:'email already taken'});

        const hashedpwd = await bcrypt.hash(password,10);

        const user = await userModel.create({nom:nom,prenom:prenom,email:email,password:hashedpwd});

        res.status(201).json('account successfully created ! waiting for admin validation');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    
    

});

router.post('/signup/expert', upload.single('image'), async (req, res) => {
    try {
        const { nom, prenom, discipline, labo, etablissement, niveau, email, password } = req.body;

        const foundUser = await userModel.findOne({ email });
        if (foundUser) return res.status(400).json({ error: 'Email already taken' });

        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await cloudinary.uploader.upload(req.file.path);

        const user = await expertModel.create({
            nom,
            prenom,
            role: ExpertRole,
            discipline,
            labo,
            etablissement,
            niveau,
            email,
            password: hashedPwd,
            fileUrl: result.secure_url 
        });

        res.status(201).json({ 
            success: true, 
            message: "Account successfully created! Waiting for admin validation",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post('/login',async (req,res)=>{

    const {email,password} = req.body;

    const user = await userModel.findOne({email:email});

    if (!user) return res.status(404).json({error:'there is no user with this email !'});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(403).json({error:'invalid email or password '});


    if (!user.userValide) return res.status(403).json({err:"account not validated yet"});

    
    const accessToken = jwt.sign({nom:user.nom,prenom:user.prenom,id:user._id,email:user.email,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
    const refreshToken = jwt.sign({nom:user.nom,prenom:user.prenom,id:user._id,email:user.email,role:user.role},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});

    user.refreshToken = refreshToken;
    await user.save();

    
    res.cookie('jwt',refreshToken,{ httpOnly:true,maxAge:1000*3600*24,sameSite:'none',secure:false});
    console.log('Setting jwt cookie');
    res.json({refreshToken:refreshToken,accessToken:accessToken,prenom:user.prenom,nom:user.nom,id:user._id,role:user.role});


});


router.post('/password/forgotten',async (req,res)=>{

    


});

module.exports = router;






