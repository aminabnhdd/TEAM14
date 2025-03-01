var express = require('express');
var router = express.Router();
const projetModel = require("../model/projet");


//Get request to test the routes (endpoints)


router.get('/', function(req, res, next) {
    res.send('No problem with projects endpoint !!');
});


module.exports = router;