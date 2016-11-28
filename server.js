/*jshint esversion: 6 */

var express = require("express");
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.port || 3000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var mediaroute = require('./routes/mediapage.js');
var getDBPosts = require('./routes/mediaposts.js');
var renderAdmin = require('./routes/adminRoute.js');

//Set up and connect to mongo database

mongoose.connect('mongodb://dimethyltryptamine:Dmtmakeamandream1@ds021691.mlab.com:21691/staysavage-media-content', function (err) {
    if (err) return console.log(err);
    else {
        console.log('Connection Succesful');
    }
    //connect to server
    app.listen(port, function () {
        console.log('listening on port ' + port);
    });
});

// Setup Views & View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Define ./public as static
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//get handlers
app.get('/', function (req, res) {
    return res.sendFile(__dirname + '/views/index.html');
});

app.get('/shop', function (req, res) {
    return res.sendFile(__dirname + '/views/index.html');
    //simulate click event on shop button
});

app.get('/kvka', function (req, res) {
    return res.sendFile(__dirname + '/views/kvka.html');
});

app.get('/samgat', function (req, res) {
    return res.sendFile(__dirname + '/views/samgat.html');
});

app.get('/submitdata', function (req, res) {
    return res.sendFile(__dirname + '/views/submitdata.html');
});

app.use('/media', mediaroute);
app.use('/posts', getDBPosts);
app.use('/admin', renderAdmin);

//post handlers
app.post('/submitpost', function (req, res) {
    db.collection('data').save(req.body, function (err, result) {
        if (err) return console.leg(err);

        console.log('saved to database');
        res.redirect('/');
    });
});

module.exports = app;