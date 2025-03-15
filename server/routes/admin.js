var express = require('express');
var router = express.Router();
const { userModel, expertModel } = require("../model/user");
const { validateRole } = require("../middlewares/roleMiddleware");
const validateToken = require("../middlewares/authMiddleware");
const adminRole = process.env.ADMIN_ROLE;

router.put("/validate/:expertId", validateToken, validateRole(adminRole), async(req, res) => {
    const { action } = req.body;
    const { expertId } = req.params;



    try {
        if (action === "validate") {
            const expert = await expertModel.findByIdAndUpdate(
                expertId, { userValide: true }, { new: true }
            );

            if (!expert) {
                return res.status(404).json({ message: "Expert not found" });
            }

            return res.json({ message: "Expert approved", expert });

        } else if (action === "reject") {
            await expertModel.findByIdAndDelete(expertId, { new: true });

            return res.json({ message: "Expert rejected and removed" });

        } else {
            return res.status(400).json({ message: "Invalid action" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;