const express = require('express');
const router = express.Router();
const projectModel = require('../model/Projet');
const sectionModel = require('../model/section');
const {expertModel,userModel} = require('../model/user');
const {validateRole} = require('../middlewares/roleMiddleware');
const validateToken = require('../middlewares/authMiddleware');
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;

const cloudinary = require('../config/cloudinary');
const upload = require('../middlewares/multerMiddleware');


router.post('/add', validateToken, validateRole(expertRole, adminRole), upload.single("image"), async (req, res) => {
    try {
        const projet = req.body;
        const userID = req.user.id;

        const found = await projectModel.findOne({ titre: projet.titre });
        if (found) return res.status(403).json({ err: "Title already used" });

        const author = await expertModel.findById(userID);
        if (!author) return res.status(404).json({ err: "Expert not found!" });

        let photoUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            photoUrl = result.secure_url;
        }

        const project = await projectModel.create({
            ...projet,
            chef: userID,
            collaborateurs: [userID],
            photoUrl 
        });

        author.projets.push(project._id);

        
        await Promise.all([project.save(), author.save()]);

        res.json(project);
    } catch (error) {
        console.error("Error adding project:", error);
        return res.status(500).json({ err: "Internal Server Error" });
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
        
        res.status(200).json({msg:"project archived successfuly",project:found});
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

        res.status(200).send({msg:"restored successfully",project:found});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});



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


router.get('/favorites', validateToken, async (req, res) => { 
    try {
        const user = await userModel.find({_id:req.user.id}); 
        const projects = await projectModel.find({ _id: { $in: user.favorites } });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);    
    }
 }); 


 router.get('/all', validateToken, async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.put('/modify/:projectID', validateToken, validateRole(expertRole, adminRole), upload.single("image"), async (req, res) => {
    try {
        let project = await projectModel.findById(req.params.projectID);
        if (!project) return res.status(404).json({ err: "Project not found" });

        const projet = req.body;
        let photoUrl = project.photoUrl; 


        if (req.file) {
            if (project.photoUrl) {
                const oldImagePublicId = project.photoUrl.split('/').pop().split('.')[0]; 
                await cloudinary.uploader.destroy(oldImagePublicId); 
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            photoUrl = result.secure_url;
        }


        project = await projectModel.findByIdAndUpdate(
            req.params.projectID,
            { ...projet, photoUrl },
            { new: true } 
        );

        res.json(project);
    } catch (error) {
        console.error("Error modifying project:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

router.get('/get/:projectID',validateToken,async (req,res)=>{    
    try {
        const project = await projectModel.findById(req.params.projectID);
        if (!project) return res.status(404).json({err:"project not found"});
        res.json(project);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/sections/disponibles/:projetId", validateToken, async (req, res) => {
    try {
        const { projetId } = req.params;
        const expertId = req.user.id; 

        const projet = await projectModel.findById(projetId);
        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé." });
        }

        const expert = await userModel.findById(expertId);
        if (!expert) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        console.log("Expert discipline:", expert.discipline);
        const existingSections = await sectionModel.find({ projetId }).select("type");

        const existingSectionTypes = existingSections.map(sec => sec.type);
        const availableSections = [];

        // "Autre" is always available
        if (!existingSectionTypes.includes("Autre")) {
            availableSections.push("Autre");
        }

        // If the user is the project leader, they can add "Description"
        if (projet.chef.toString() === expertId && !existingSectionTypes.includes("Description")) {
            availableSections.push("Description");
        }

        // User can add the section matching their discipline
        if (!existingSectionTypes.includes(expert.discipline)) {
            availableSections.push(expert.discipline);
        }

        return res.status(200).json({ availableSections });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});


router.post("/ajoutersection", validateToken, async (req, res) => {
    try {
        const { projetId, type } = req.body;

        const projet = await projectModel.findById(projetId);
        if (!projet) {
            return res.status(404).json({ message: "Projet non trouvé." });
        }

        const section = new sectionModel({
            projetId,
            type,
            contenu: "",
            annotations: [],
            conflits: null
        });

        await section.save();
        projet.sections.push(section._id);
        await projet.save()

        return res.status(201).json({ message: "Section ajoutée avec succès.", section });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
});
module.exports = router;