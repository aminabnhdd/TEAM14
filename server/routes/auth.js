const express = require('express');
const router = express.Router();
const {userModel,expertModel} = require('../model/user');
const notificationModel = require('../model/Notification');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const { upload } = require('../middlewares/multerMiddleware');
const {sendPasswordForgotten} = require('../middlewares/emailMiddleware');
const crypto = require('crypto');

const AdminRole = process.env.ADMIN_ROLE;
const ExpertRole = process.env.EXPERT_ROLE;



router.post('/signup/visitor',async (req,res)=>{
    try {
        const {nom,prenom,email,password} = req.body;


        const foundUser = await userModel.findOne({email:email});
        if (foundUser) return res.json({error:'email already taken'});

        const hashedpwd = await bcrypt.hash(password,10);

        const user = await userModel.create({nom:nom,prenom:prenom,email:email,password:hashedpwd});

        const notif = await notificationModel.create({
            type:'validerVisiteur',
            sendeId:user._id,
            recepientId:user._id,
            time:new Date(),
            content:`${nom} ${prenom} souhaite créer un compte visiteur`
        });

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

        const notif = await notificationModel.create({
            type:'validerExpert',
            sendeId:user._id,
            recepientId:user._id,
            time:new Date(),
            content:`${nom} ${prenom} souhaite créer un compte expert`
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

    if (!user) return res.status(404).json({email:"Il n'y a pas d'utilisateur avec cet email"});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(403).json({password:'Mot de passe invalide '});


    if (!user.userValide) return res.status(403).json({password:"Votre compte n'a pas encore été validé"});

    
    const accessToken = jwt.sign({nom:user.nom,prenom:user.prenom,id:user._id,email:user.email,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
    const refreshToken = jwt.sign({nom:user.nom,prenom:user.prenom,id:user._id,email:user.email,role:user.role},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});

    user.refreshToken = refreshToken;
    await user.save();

    
    res.cookie('jwt',refreshToken,{ httpOnly:true,maxAge:1000*3600*24,sameSite:'lax',secure:false});
    res.json({refreshToken:refreshToken,accessToken:accessToken,prenom:user.prenom,nom:user.nom,id:user._id,role:user.role});


});


router.post('/pwd-forgotten/send-link',async (req,res)=>{
    try {
        const token = crypto.randomBytes(32).toString('hex');
        const user = await userModel.findOne({email:req.body.email});
        if (!user) return res.status(404).json({email:"il n'y a pas d'utilisateur avec cet email"});
        user.otl.link = token;
        user.otl.used = false;
        await user.save();
        await sendPasswordForgotten({to:req.body.email,otl:user.otl.link});
        res.status(200).json('success');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        
    }

});
router.get('/pwd-forgotten/check-link/:link',async(req,res)=>{
    try {
        const link = req.params.link;
        const user = await userModel.findOne({ 'otl.link': link ,'otl.used': false });
        if (!user) return res.status(404).json({error:'there is no user with this link !'});
        res.json('success');
    } catch (error) {
        res.status(500).json({error:'server error'});
        console.log(error);
    }
})
router.post('/pwd-forgotten/change-pwd/:link',async (req,res)=>{
    try {
        const {password} = req.body;
        const link = req.params.link;
        const user = await userModel.findOne({ 'otl.link': link ,'otl.used': false });
        if (!user) return res.status(404).json({error:'there is no user with this link !'});
        const hashedpwd = await bcrypt.hash(password,10);
        user.password = hashedpwd;
        user.otl.used = true;
        await user.save();
        res.status(200).json('success');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        
    }

});

module.exports = router;






