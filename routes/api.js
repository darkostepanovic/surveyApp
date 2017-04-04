var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://darko:darko@ds149700.mlab.com:49700/persons', ['persons']);

// Get All Persons
router.get('/persons', function(req, res, next) {
   db.persons.find(function(err, persons) {
       if(err) {
           res.send(err);
       }
       res.json(persons);
   }) 
});

// Get single Person
router.get('/person/:id', function(req, res, next) {
   db.persons.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, person) {
       if(err) {
           res.send(err);
       }
       res.json(person);
   }) 
});

// Save Person
router.post('/person', function(req,res,next){
    var person = req.body;
    if(!person.firstName || !person.lastName || !person.address) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.persons.save(person, function(err, person) {
            if(err) {
                res.send(err);
            }
                res.json(person);
            });
    }
});

// Delete task

router.delete('/person/:id', function(req, res, next) {
   db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, person) {
       if(err) {
           res.send(err);
       }
       res.json(person);
   }) 
});

// Update task

router.put('/person/:id', function(req, res, next) {
    
    var person = req.body;
    var update = {};
    
    if(person.firstName) {
        update.firstName = person.firstName;
    }
    
    if(person.lastName) {
        update.lastName = person.lastName;
    }
    
    if(person.company) {
        update.company = person.company;
    }
    
    if(person.phone) {
        update.phone = person.phone;
    }
    
    if(person.address) {
        update.address = person.address;
    }
    
    if(!update) {
        res.status(400);
        res.json({
            "error": "Bad data"
        })
    } else {
        
        db.persons.update({_id: mongojs.ObjectId(req.params.id)}, update, {}, function(err, person) {   
           if(err) {
               res.send(err);
           }
           res.json(person);
        }) 
        
    }
    
    
});

module.exports = router;