var express = require('express');
var router = express.Router();
const { userModel, expertModel } = require("../model/user");
const notificationModel = require('../model/Notification');

const visitorRole = process.env.VISITOR_ROLE;


const sendAccountStatusEmail = require("../middlewares/emailMiddleware");


router.put("/:userId", async (req, res) => {
  const { action } = req.body;
  const { userId } = req.params;

  try {
    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (action === "validate") {
      user.userValide = true;
      await user.save();

      await sendAccountStatusEmail({
        to: user.email,
        username: `${user.prenom} ${user.nom}`,
        status: "accepted",
      });

      return res.json({ message: "User approved", user });
    } else if (action === "reject") {
      await user.deleteOne();

      await sendAccountStatusEmail({
        to: user.email,
        username: `${user.prenom} ${user.nom}`,
        status: "rejected",
      });

      return res.json({ message: "User rejected and removed" });
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/users/All", async(req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/users/unvalidated", async(req, res) => {
    try {
        const users = await userModel.find({userValide: false});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/experts/All", async(req, res) => {
    try {
        const experts = await expertModel.find({userValide: true});
        res.json(experts);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})
router.get("/visitors/All", async(req, res) => {
    try {
        const visitors = await userModel.find({role: visitorRole,userValide: true});
        res.json(visitors);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/search/projects", async(req, res) => {
    try {
        const {title} = req.body;
        const projects = await projectModel.find({title: {$regex: title, $options: "i"}});
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/search/users', async (req, res) => {
    try {
        const users = await userModel.find();

        res.json(users);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await notificationModel.find({type: {$in : ["validerVisiteur","validerExpert"]} }).populate("sendeId").sort({ createdAt: -1 });
        
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
        console.log(err);
    }
});

router.delete('/notif/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const notif = await notificationModel.findByIdAndDelete(id);
        res.status(200).json({message:"deleted with success"});
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
})



module.exports = router;