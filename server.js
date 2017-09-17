const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const PORT = process.env.PORT || 3000;

const app = express();

// Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// HTTP requests redirect
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use('/api', api);
app.use(express.static('client')); // This needs to change to react "build" directory

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});


// SURVEY REDIRECT LOGIC:
// ----------------------------
//
// if "answers" and "redirect" are FALSE, UI displays input field and redirects
// to next questions
// if "answers" are TRUE (UI display provided answers) and each answer provides
// redirect reference. If none is provided, redirect to next question
// if "answers" are FALSE and "redirect" has value (UI displays input field)
// check the value provided by user. If that value is zero, redirect to
// question from the "redirect" field
//
//
