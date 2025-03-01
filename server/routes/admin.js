var express = require('express');
var router = express.Router();
const { userModel, expertModel } = require("../model/user");
const validateExpert = require('../controllers/adminValidationController')


router.put("/:expertId", validateExpert);

module.exports = router;