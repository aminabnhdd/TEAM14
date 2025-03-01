const { expertModel } = require("../model/user");



const validateExpert = async(req, res) => {
    const { action } = req.body;
    const { expertId } = req.params;

    //add middleware to check admin

    try {
        if (action === "validate") {
            const expert = await expertModel.findByIdAndUpdate(
                expertId, { userValide: true }
            );
            return res.json({ message: "Expert approved", expert });
        } else if (action === "reject") {
            await expertModel.findByIdAndDelete(expertId);
            return res.json({ message: "Expert rejected and removed" });
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = validateExpert;