var express = require('express');
var router = express.Router();
const usersModel = require("../model/user");


//Get request to test the routes (endpoints)


router.get('/', function(req, res, next) {
    res.send('No problem with users endpoint !!');
});

module.exports = router;