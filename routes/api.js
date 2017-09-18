const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const keys = require('../config/keys');


const db = mongojs(keys.mongoURI, ['surveys']);

// Get All Surveys
router.get('/surveys', function(req, res, next) {
   db.surveys.find((err, surveys) => {
       if(err) {
           res.send(err);
       }
       res.json(surveys);
   })
});

// Get single Survey
router.get('/surveys/:number', (req, res, next) => {
   db.surveys.findOne({number: req.params.number}, (err, survey) => {
       if(err) {
           res.send(err);
       }
       res.json(survey);
   })
});


module.exports = router;
