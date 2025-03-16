var express = require('express');
var router = express.Router();
const { userModel, expertModel } = require("./model/User");
const validateExpert = require('../controllers/adminValidationController')


router.put("/:expertId", validateExpert);

module.exports = router;