

const express = require('express');
const router = express.Router();
const projectModel = require('../model/Projet');
const sectionModel = require('../model/section');
const {expertModel,userModel} = require('../model/user');
const {validateRole,validateProjectOwner} = require('../middlewares/roleMiddleware');
const validateToken = require('../middlewares/authMiddleware');
const expertRole = process.env.EXPERT_ROLE;
const adminRole = process.env.ADMIN_ROLE;
const notificationModel = require("../model/Notification");
const cloudinary = require('../config/cloudinary');
const { upload } = require('../middlewares/multerMiddleware');
const fs = require('fs');
const path = require('path');
const referenceModel = require("../model/Reference");



//request to get all the projects
router.get('', async(req, res) => {
    try {
        const projects = await projectModel.find({archive: false});
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects ", error);
        res.status(500).json({ message: "server error" });
    }

});


//create projet
router.post('/add', validateToken, validateRole(expertRole, adminRole),upload.single("image"), async (req, res) => {
    try {

        const { titre, type, latitude, longitude, localisation, style, dateConstruction,keywords } = req.body;
        const userID = req.user?.id;
        let imageUrl = "";
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          imageUrl = result.secure_url;
        }


        if (!userID) return res.status(401).json({ err: "Unauthorized - No user ID" });

        if (!titre || !type) {
            return res.status(400).json({ err: "Missing required fields" });
        }

        const found = await projectModel.findOne({ titre });
        if (found){alert('Il existe déja un projet avec ce titre') ; return res.status(403).json({ err: "Title already used" });}


        const author = await expertModel.findById(userID);
        if (!author) return res.status(404).json({ err: "Expert not found!" });


        const project = await projectModel.create({
            titre,
            type,
            latitude: latitude || "",
            archive: false,
            longitude: longitude || "",
            localisation: localisation || "",
            style: style || "",
            keywords: keywords || [],
            photoUrl: imageUrl || "",
            dateConstruction: dateConstruction || "",
            chef: userID,
            collaborateurs: [userID],
        });

        author.projets.push(project._id);
        await author.save();

        res.json(project);
    } catch (error) {
        console.error("Error in /add route:", error);
        return res.sendStatus(500);
    }
});

// modifier projet get request
router.get("/modifier/:id",  validateToken, validateRole(expertRole, adminRole),async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Projet not found" });
        }

        res.json({
            titre: project.titre,
            type: project.type,
            latitude: project.latitude,
            longitude: project.longitude,
            localisation: project.localisation,
            style: project.style,
            dateConstruction: project.dateConstruction,
            photoUrl: project.photoUrl,
            keywords: project.keywords
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
    
});

// archiver projet
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

// restaurer projet archiver
router.put('/restore/:projectID',validateToken ,async (req,res)=>{
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

// search by keywords
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

// search by filters
  router.get('/search/filters', async (req, res) => {
    try {
        const filter = req.query.filters; 

        if (!filter) {
            return res.status(400).json({ error: "Filter is required." });
        }

        

        // const sections = await sectionModel.find({
        //     type: { $in: filter },
        //     "contenu.content.0": { $exists: true } 
        //   });
          
          const rawSections = await sectionModel.find({
            type: { $in: filter }
          }).lean();
          
          const sections = rawSections.filter(section => {
            const outer = section?.contenu?.content;
            const inner = outer?.[0]?.content;
          
            return Array.isArray(inner) && inner.some(e => e?.text?.trim());
          });

        const sectionIds = sections.map(section => section._id);

       

        const projects = await projectModel.find({ sections: { $in: sectionIds },archive: false });

        res.json(projects);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

//  get favorites
router.get('/favorites', validateToken, async (req, res) => { 
    try {
        const user = await userModel.find({_id:req.user.id}); 
        const projects = await projectModel.find({ _id: { $in: user.favorites } ,archive: false});
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

// get mes projets
router.get("/mesprojets", validateToken, async (req, res) => {
    try {
      const expertId = req.user.id;
        const expert = await expertModel.findById(expertId);    
        if (!expert) {              
            return res.status(404).json({ message: "Expert not found" });
        }
        const projects = await projectModel.find({
            archive: false,
            $or: [
              { chef: expertId },
              { collaborateurs: expertId }
            ]
          });

      return res.status(200).json({ projects });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
);
// get mes projets archiver
router.get("/mesprojets-archiver", validateToken, async (req, res) => {
    try {
      const expertId = req.user.id;
        const expert = await expertModel.findById(expertId);    
        if (!expert) {              
            return res.status(404).json({ message: "Expert not found" });
        }
      const projects = await projectModel.find({ chef: expertId ,archive: true});

      return res.status(200).json({ projects });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
);

// modifier(editer) projet
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

router.get('/projet/:projetId', validateToken, async (req, res) => {
    try {
        const { projetId } = req.params;

        const projet = await projectModel.findById(projetId)
            .populate('references')
            .populate('sections')

        if (!projet) return res.status(404).json({ err: "Projet not found" });
        
        const expertId = req.user.id; 

        const user = await userModel.findById(expertId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        

        const chef = await expertModel.findById(projet.chef);
        if (!chef) {    
            return res.status(404).json({ message: "Chef de projet non trouvé." });
        }

        const collaborateurs = await expertModel.find({
            _id: { $in: projet.collaborateurs }
        });
        const isExpert = user.role === expertRole;
        const isAdmin = user.role === adminRole;
        const isChef = projet.chef?.toString() === expertId;
        const isCollaborateur = projet.collaborateurs.some(collabId =>
            collabId.toString() === expertId
        );
        const discipline = user.discipline || null;

        return res.status(200).json({
            projet,
            user,
            chef,
            collaborateurs,
            isExpert,
            isAdmin,
            isChef,
            isCollaborateur,
            discipline
        });

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});


// ajouter section 
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



//request to add a collaborator to the project

router.put('/:projetId/collaborateurs', validateToken, async(req, res) => {
    const { projetId } = req.params;
    const {userId} = req.body; 
    console.log(projetId);
    try {
        const project = await projectModel.findByIdAndUpdate(
            projetId, { $push: { collaborateurs: userId } }, { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const expert = await expertModel.findById(userId);
        if (!expert) {
            return res.status(404).json({ message: "Expert not found" });
        }       
        expert.projets.push(project._id);
        await project.save();
        await expert.save();
        return res.status(201).json({ message: "Collaborateur ajoutée avec succès.", project });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }


});

//email thing and all 
router.get('/:projectId/collaborateurs/:email', validateToken, async(req, res) => {
    const { email } = req.params;
    const { projectId } = req.params;
    console.log(email);
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({ exist: false });
        }

        const project = await projectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const expert = user.role === expertRole ? "expert" : "";

        return res.status(200).json({
            message: "User fetched",
            user,
            expert,
            exist: true
        });
    } catch (error) {
        console.error(error);
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
router.post("/:projectId/demande", validateToken,  async(req, res) => {
    const { projectId } = req.params;
    const  expertId  = req.user.id; 
    console.log("the expert id",expertId);
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
            sendeId: expertId,
            recepientId: project.chef,
            time: new Date(),
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

// wth is this
router.get("/search", async(req, res) => {
    const { keyword } = req.body; // Get keyword from query params

    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }

    try {
        const results = await projectModel.find({ keyword });

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
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
router.post("/:projectId/:sectionId/demande", validateToken, validateProjectOwner, async(req, res) => {
    const { projectId,sectionId } = req.params;
    const { expertId } = req.body; //expertId in the body of the request because one project can have several demandes there is no bijection

    try {
        const project = await projectModel.findByIdAndUpdate(
            projectId, { $push: { demandes: { expert: expertId, status: "pending" } } }, { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await project.save();

        const notification = await notificationModel.create({
            type: "demandeCollaboration",
            projetId: projectId,
            senderId: expertId,
            sectionId,
            recepientId: req.user.id,
            content: "this expert want to join your project",
            read: false
        });




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


router.get("/search", async(req, res) => {
    const { keyword } = req.body; // Get keyword from query params

    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }

    try {
        const results = await projectModel.find({ keyword });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// modifier projet 
router.put("/update/:id", upload.single("image"), validateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const projet = req.body;
  
      const project = await projectModel.findById(id);
      if (!project) {
        return res.status(404).json({ err: "Project not found" });
      }
  
      let photoUrl = project.photoUrl;
  
      if (req.file) {
       
        if (project.photoUrl) {
        
          const oldImagePublicId = project.photoUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(oldImagePublicId);
          photoUrl = "";
        }
  
        const result = await cloudinary.uploader.upload(req.file.path);
        photoUrl = result.secure_url;
      } 
  
    
      project.titre = projet.titre;
      project.type = projet.type;
      project.latitude = projet.latitude;
      project.longitude = projet.longitude;
      project.localisation = projet.localisation;
      project.style = projet.style;
      project.dateConstruction = projet.dateConstruction;
      project.photoUrl = photoUrl;
      project.keywords = projet.keywords;
  
      await project.save();
  
      res.json({ message: "Project updated successfully", project });
    } catch (error) {
      console.error("Error in /update route:", error);
      res.sendStatus(500);
    }
  });

  router.post('/favourite/add', validateToken, async(req, res) =>{
    const userId = req.user.id;
    const {projectId} = req.body;

    try{

        
        const user = await userModel.findById(userId);
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

// remove from favorites
router.put('/favourite/remove', validateToken, async(req, res) =>{
    const userId = req.user.id;
    const {projectId} = req.body;

    try{     
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Error." });
        }
    
        if(!user.favorites.includes(projectId)){
            return res.sendStatus(200);
        }
        user.favorites = user.favorites.filter((el) => el.toString() !== projectId.toString());
        await user.save();
        res.status(200).json({ message: "Project removed from favorites" });
    

    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    
})

// wth is this 
router.get('/favourite/', validateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        let favouriteProjects = user.favorites; // now this contains full project objects
        favouriteProjects = favouriteProjects.filter(project => project.archive === false);
        res.json(favouriteProjects);
        console.log(favouriteProjects);
    } catch (error) {
        console.error(error);
        res.sendStatus(500); 
    }
});


router.get('/export-projet/:id', validateToken,validateRole(expertRole),async (req, res) => {
    try {
        const projet = await projectModel.findById(req.params.id)
            .populate('sections')
            .lean();

        if (!projet) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }

        delete projet.__v;

        const jsonData = JSON.stringify(projet, null, 2);
        const fileName = `ATHAR - ${projet.titre}.json`;


        const tmpDir = path.join(__dirname, '..', 'tmp');
        const filePath = path.join(tmpDir, fileName);

        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }

        fs.writeFileSync(filePath, jsonData);

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error(err);
            }
            fs.unlinkSync(filePath);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.post('/import-projet', async (req, res) => {
    try {
      const projetData = req.body;
  
      if (!projetData.titre || !projetData.type) {
        return res.status(400).json({ message: 'Titre et type sont requis.' });
      }
  
      const existingProjet = await projectModel.findById(projetData._id);
      if (existingProjet && existingProjet.archive == false) {
        return res.status(200).json({ message: 'Ce projet existe déjà et n\'a pas besoin d\'être restauré.' });
      }
      const existingTitle = await projectModel.findOne({ titre: projetData.titre });
      if (existingTitle) {
        return res.status(200).json({ message: 'Un projet avec ce titre existe déja' });

      }
  
      delete projetData._id;
      delete projetData.createdAt;
      delete projetData.updatedAt;
      delete projetData.__v;
  

      const nouveauProjet = await projectModel.create(projetData);
  

      const chef = await expertModel.findById(projetData.chef);
      if (chef) {
        chef.projets.push(nouveauProjet._id);
        await chef.save();
      }
  
      const sections = await sectionModel.find({ _id: { $in: projetData.sections || [] } });
      await Promise.all(sections.map(section => {
        section.projetId = nouveauProjet._id;
        return section.save();
      }));
  
      const collaborateurs = await expertModel.find({ _id: { $in: projetData.collaborateurs || [] } });
      await Promise.all(collaborateurs.map(collab => {
        collab.projets.push(nouveauProjet._id);
        return collab.save();
      }));
  
      const references = await referenceModel.find({ _id: { $in: projetData.references || [] } });
      await Promise.all(references.map(ref => {
        ref.projetId = nouveauProjet._id;
        return ref.save();
      }));
  
      res.status(201).json({ message: 'Projet restauré avec succès.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la restauration du projet.' });
    }
  });
  
  


module.exports = router;