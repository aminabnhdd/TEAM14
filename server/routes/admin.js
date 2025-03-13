var express = require('express');
var router = express.Router();
const { userModel, expertModel } = require("../model/user");

const sendAccountStatusEmail = require("../middlewares/emailMiddleware");


router.put("/:userId", async (req, res) => {
  const { action } = req.body;
  const { userId } = req.params;

  try {
    let user = await userModel.findById(userId);
    if (!user) {
      user = await expertModel.findById(userId);
    }

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


module.exports = router;