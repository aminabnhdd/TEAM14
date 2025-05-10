const express = require('express');
const router = express.Router();
const {userModel} = require('../model/user');
const jwt = require('jsonwebtoken');

// function to convert the role token to a string for the front end
const getRole = (role) => {
    if (role === process.env.ADMIN_ROLE) return "Admin";
    if (role === process.env.EXPERT_ROLE) return "Expert";
    if (role === process.env.VISITOR_ROLE) return "Visiteur";
    return "Unknown";
}

// refresh the access token using the refresh token
router.get('/',async(req,res)=>{

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.json({error:'no cookies'});
    // if there is no cookie, we return an error


    const refreshToken = cookies.jwt;

    const user = await userModel.findOne({refreshToken:refreshToken});

    if (!user) return res.json({error:'no user with this refresh Token'});
    // if there is no user with this refresh token, we return an error

    const validRefresh = jwt.verify(user.refreshToken,process.env.REFRESH_TOKEN_SECRET);
    // verify the validity of the refresh token
    try {
        if (validRefresh) {
            // if it's valid, we create a new access token
            const accessToken = jwt.sign({nom:user.nom,prenom:user.prenom,id:user._id,email:user.email,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
            res.json({email:user.email,role:getRole(user.role),accessToken:accessToken});
        }
    } catch (error) {
        // else we return an error
        res.json({error:'forbidden !'});
    }


});
module.exports = router;