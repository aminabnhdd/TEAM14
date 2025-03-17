const express = require('express');
const router = express.Router();
const projectModel = require('../model/projet');
const { expertModel, userModel } = require('../model/user');
const notificationModel = require('../model/notification');
const projetModel = require('../model/projet');
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



//request to add a collaborator to the project

router.put('/:projectId/collaborateurs/:expertId', validateToken, validateProjectOwner, async(req, res) => {
    //check if the the user that is being added is an expert
    const { projectId, expertId } = req.params;
    try {
        const project = await projetModel.findByIdAndUpdate(
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
        const project = await projetModel.findByIdAndUpdate(
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
        const project = await projetModel.findByIdAndUpdate(
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
        const project = await projetModel.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        //check if the logged in user corresponds to the owner of the project
        if (project.chef.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to manage this project" });
        }

        const demande = projetModel.demandes.find(request => request.expertId.toString() == expertId);
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


router.get("/search", async(req, res) => {
    const { keyword } = req.body; // Get keyword from query params

    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }

    try {
        const results = await projetModel.find({ keyword });

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;