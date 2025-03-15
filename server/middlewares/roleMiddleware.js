const projetModel = require("../model/projet");

const validateRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) next();
        else {
            return res.status(403).json({ error: "you don't have the permissions :/" });
        }
    }
}

const validateProjectOwner = async(req, res, next) => {
    const { projectId } = req.params;
    const expertId = req.user.id;
    try {
        const project = await projetModel.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        if (project.chef.toString() == expertId) {
            next();
        } else {
            return res.status(403).json({ error: "you don't have the permissions :/" });
        }

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

module.exports = { validateRole, validateProjectOwner };