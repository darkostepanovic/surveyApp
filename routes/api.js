const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://nenad:admin@ds141024.mlab.com:41024/surveys', ['surveys']);

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
