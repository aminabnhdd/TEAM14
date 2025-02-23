var express = require('express');
var router = express.Router();
const annotationModel = require("../model/annotation");


//Get request to test the routes (endpoints)


router.get('/', function(req, res, next) {
    res.send('No problem with annotations endpoint !!');
});

module.exports = router;