const express = require('express');
const router = express.Router();
const {userModel} = require('../model/user');
const jwt = require('jsonwebtoken');


const getRole = (role) => {
    if (role === process.env.ADMIN_ROLE) return "Admin";
    if (role === process.env.EXPERT_ROLE) return "Expert";
    return "Visiteur";
}


router.get('/',async(req,res)=>{

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.json({error:'no cookies'});
    


    const refreshToken = cookies.jwt;

    const user = await userModel.findOne({refreshToken:refreshToken});

    if (!user) return res.json({error:'no user with this refresh Token'});

    const validRefresh = jwt.verify(user.refreshToken,process.env.REFRESH_TOKEN_SECRET);

    try {
        if (validRefresh) {
            const accessToken = jwt.sign({nom:user.nom,prenom:user.prenom,id:user._id,email:user.email,role:getRole(user.role)},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
            res.json({email:user.email,role:getRole(user.role),accessToken:accessToken});
        }
    } catch (error) {
        res.json({error:'forbidden !'});
    }


});
module.exports = router;