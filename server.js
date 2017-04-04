var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');

var port = 3000;

var app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', api);
app.use('*', index);

app.listen(port, function() {
    console.log('Server started on port ' + port);
});