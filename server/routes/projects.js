const express = require('express');
const router = express.Router();
const projectModel = require('../model/projet');
const {expertModel,userModel} = require('../model/user');
const {validateRole} = require('../middlewares/roleMiddleware');
const validateToken = require('../middlewares/authMiddleware');
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;





router.post('/add/:userId',validateToken,validateRole(expertRole,adminRole),async (req,res)=>{
    try {
        const {titre,type,style} = req.body;

        const userID = req.params.userId;

        const found = await projectModel.findOne({titre});
        if (found) return res.status(403).json({err:"title already used "});

        const author = await expertModel.findOne({_id:userID});
        if (!author) return res.status(404).json({err:"expert not found !"});
        const project = await projectModel.create({
        titre:titre,
        type:type,
        style:style,
        chef:userID,
        collaborateurs:[userID]
        });
        await project.save();
        author.projets = [...author.projets,project._id];
        await author.save();
        res.send('project created');
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

});

module.exports = router;