const express = require('express');
const router = express.Router();
const {userModel,expertModel} = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminRole = process.env.ADMIN_ROLE;
const ExpertRole = process.env.EXPERT_ROLE;



router.post('/signup/visitor',async (req,res)=>{
    const {nom,prenom,email,password} = req.body;


    const foundUser = await userModel.findOne({email:email});

    if (foundUser) return res.json({error:'email already taken'});

 
    const hashedpwd = await bcrypt.hash(password,10);



    const user = await userModel.create({nom:nom,prenom:prenom,email:email,password:hashedpwd});

    res.json('success');

});

router.post('/signup/expert',async (req,res)=>{
    const {nom,prenom,discipline,labo,etablissement,niveau,email,password} = req.body;


    const foundUser = await userModel.findOne({email:email});

    if (foundUser) return res.json({error:'email already taken'});

 
    const hashedpwd = await bcrypt.hash(password,10);



    const user = await expertModel.create({nom:nom,prenom:prenom,role:ExpertRole,discipline:discipline,labo:labo,etablissement:etablissement,niveau:niveau,email:email,password:hashedpwd});

    res.json('success');

});

router.post('/login',async (req,res)=>{

    const {email,password} = req.body;

    const user = await userModel.findOne({email:email});

    if (!user) return res.status(404).json({error:'there is no user with this email !'});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(403).json({error:'invalid email or password '});


    if (!user.userValide) return res.status(403).json({err:"account not validated yet"});

    
    const accessToken = jwt.sign({id: user._id, nom:user.nom,prenom:user.prenom,email:user.email,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
    const refreshToken = jwt.sign({id: user._id,nom:user.nom,prenom:user.prenom,email:user.email,role:user.role},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});

    user.refreshToken = refreshToken;
    await user.save();

    
    res.cookie('jwt',refreshToken,{ httpOnly:true,maxAge:1000*3600*24,sameSite:'none',secure:true});

    res.json({refreshToken:refreshToken,accessToken:accessToken,prenom:user.prenom,nom:user.nom,id:user._id,role:user.role});


});


router.post('/password/forgotten',async (req,res)=>{

    


});

module.exports = router;