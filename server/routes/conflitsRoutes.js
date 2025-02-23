var express = require('express');
var router = express.Router();
const conflitModel = require("../model/conflit");


//Get request to test the routes (endpoints)


router.get('/', function(req, res, next) {
    res.send('No problem with conflicts endpoint !!');
});

module.exports = router;