var express = require('express');
var router = express.Router();
const User = require("../model/user");
const validateExpert = require('../controllers/adminValidationController')


router.put("/validate-expert/:expertId", validateExpert);

module.exports = router;