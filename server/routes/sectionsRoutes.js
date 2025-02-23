var express = require('express');
var router = express.Router();
const sectionModel = require("../model/section");


//Get request to test the routes (endpoints)


router.get('/', function(req, res, next) {
    res.send('No problem with section endpoint !!');
});

module.exports = router;