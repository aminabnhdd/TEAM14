const express = require('express');
const router = express.Router();
const projectModel = require('../model/projet');
const sectionModel = require('../model/Section');
const {expertModel,userModel} = require('../model/user');
const {validateRole} = require('../middlewares/roleMiddleware');
const validateToken = require('../middlewares/authMiddleware');
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;





router.post('/add',validateToken,validateRole(expertRole,adminRole),async (req,res)=>{
    try {
        const {titre,type,style} = req.body;

        const userID = req.user.id;

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


router.put('/archive/:projectID',validateToken,validateRole(expertRole,adminRole),async (req,res)=>{
    try {

        const userID = req.user.id;

        const projectID = req.params.projectID;

        const found = await projectModel.findById(projectID);
        if (!found) return res.status(404).json({err:"project not found "});

        const author = await expertModel.findById(userID);
        if (!author) return res.status(404).json({err:"expert not found !"});

        found.archive = true;
        found.archivePar = userID;
        await found.save();
        
        res.status(200).send("archived successfully");
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


router.put('/restore/:projectID',validateToken,validateRole(expertRole,adminRole),async (req,res)=>{
    try {

        const userID = req.user.id;

        const projectID = req.params.projectID;

        const found = await projectModel.findById(projectID);
        if (!found) return res.status(404).json({err:"project not found "});

        const author = await expertModel.findById(userID);
        if (!author) return res.status(404).json({err:"expert not found !"});

        found.archive = false;
        found.archivePar = null;
        await found.save();

        res.status(200).send("restored successfully");
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});





// ==> the next one isn't tested yet 

router.get('/search/filters', validateToken, async (req, res) => {
    try {
        const filters = req.query.filters; 

        if (!filters || !Array.isArray(filters)) {
            return res.status(400).json({ error: "Filters must be an array." });
        }

        const sections = await sectionModel.find({ type: { $in: filters } });


        const sectionIds = sections.map(section => section._id);


        const projects = await projectModel.find({ sections: { $in: sectionIds } });

        res.json({ sections, projects });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});



module.exports = router;