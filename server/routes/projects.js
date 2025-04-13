const express = require('express');
const router = express.Router();
const projectModel = require('../model/projet');
const { expertModel, userModel } = require('../model/user');
const notificationModel = require('../model/notification');

const sectionModel = require('../model/section');
const { validateRole, validateProjectOwner } = require('../middlewares/roleMiddleware');
const validateToken = require('../middlewares/authMiddleware');
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;





router.post('/add/:userId', validateToken, validateRole(expertRole, adminRole), async(req, res) => {
    try {
        const { titre, type, style, coord, localisation, photoUrl, dateConstruction, collaborateurs, demandes } = req.body;

        const userID = req.params.userId;

        const found = await projectModel.findOne({ titre });
        if (found) return res.status(403).json({ err: "title already used " });

        const author = await expertModel.findOne({ _id: userID });
        if (!author) return res.status(404).json({ err: "expert not found !" });
        const project = await projectModel.create({
            titre: titre,
            type: type,
            style: style,
            coord: coord,
            localisation: localisation,
            photoUrl: photoUrl,
            dateConstruction: dateConstruction,
            collaborateurs: collaborateurs,
            demandes: demandes,
            archivePar: userID,
            archive: false,
            chef: userID
        });
        await project.save();
        author.projets = [...author.projets, project._id];
        await author.save();
        res.send('project created');
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

});

//request to get all the projects
router.get('', async(req, res) => {
    try {
        const projects = await projectModel.find();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects ", error);
        res.status(500).json({ message: "server error" });
    }

});



//request to add a collaborator to the project

router.put('/:projectId/collaborateurs/:expertId', validateToken, validateProjectOwner, async(req, res) => {
    //check if the the user that is being added is an expert
    const { projectId, expertId } = req.params;
    try {
        const project = await projectModel.findByIdAndUpdate(
            projectId, { $push: { collaborateurs: expertId } }, { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.send("expert added to collaborators of the project");
        res.json(project);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


});

//request to delete collaborator

router.delete("/:projectId/collaborateurs/:expertId", validateToken, validateProjectOwner, async(req, res) => {
    const { projectId, expertId } = req.params;

    try {
        const project = await projectModel.findByIdAndUpdate(
            projectId, { $pull: { collaborateurs: expertId } }, { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.send("expert removed from the collaborators of the project");
        res.json(project);
    } catch {
        console.log(error);
        return res.sendStatus(500);
    }


})

//request to join the collaborators of a project

router.post("/:projectId/demande", validateToken, validateProjectOwner, async(req, res) => {
    const { projectId } = req.params;
    const { expertId } = req.body; //expertId in the body of the request because one project can have several demandes there is no bijection

    try {
        const project = await projectModel.findByIdAndUpdate(
            projectId, { $push: { demandes: { expert: expertId, status: "pending" } } }, { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await project.save();

        const notification = await new notificationModel({
            type: "demandeCollaboration",
            projetId: projectId,
            senderId: expertId,
            recepientId: req.user.id,
            content: "this expert want to join your project",
            read: false
        });

        await notification.save();



        res.json({ message: "Join request sent to the project owner", project });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

})


//request for the project owner to validate or not the demandes of collaborating on  the prject

router.post("/:projectId/validate/:expertId", validateToken, validateProjectOwner, async(req, res) => {
    const { projectId, expertId } = req.params;
    const { status } = req.body;

    try {
        const project = await projectModel.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        //check if the logged in user corresponds to the owner of the project
        if (project.chef.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to manage this project" });
        }

        const demande = projectModel.demandes.find(request => request.expertId.toString() == expertId);
        demande.status = status;

        if (!demande) {
            return res.status(404).json({ message: "Demand not found for this expert" });
        }

        res.send(action);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
})


router.get("/search", async (req, res) => {
    const { keyword } = req.query;
  
    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }
  
    try {
      const results = await projectModel.find({
        keywords: { $regex: keyword, $options: "i" }, // case-insensitive
      });
  
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
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


router.get('/search/filters', async (req, res) => {
    try {
        const filter = req.query.filters; 

        if (!filter) {
            return res.status(400).json({ error: "Filter is required." });
        }

        

        const sections = await sectionModel.find({ type: { $in: filter } });


        const sectionIds = sections.map(section => section._id);


        const projects = await projectModel.find({ sections: { $in: sectionIds } });

        res.json(projects);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


router.get('/favourites/filters', async (req, res) => {
    try {
        const filter = req.query.filters; 

        if (!filter) {
            return res.status(400).json({ error: "Filter is required." });
        }

        

        const favouriteProjects = await projectModel.find({ favourites: { $in: filter } });


        const sectionIds = sections.map(section => section._id);


        const projects = await projectModel.find({ sections: { $in: sectionIds } });

        res.json(projects);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.post('/favourite/add/:userId', async(req, res) =>{
    const {userId} = req.params;
    const {projectId} = req.body;

    try{

        
        const user = await expertModel.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Error." });
        }
    
    if(!user.favorites.includes(projectId)){
        user.favorites.push(projectId);
        await user.save();
    }

    

    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    
})
router.get('/favourite/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await expertModel.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const favouriteProjects = user.favorites; // now this contains full project objects
        res.json(favouriteProjects);
        console.log(favouriteProjects);
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});


module.exports = router;

module.exports = router;