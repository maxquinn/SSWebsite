/*jshint esversion: 6 */

var express = require("express");
var path = require('path');
var app = module.exports = express();
var bodyParser = require('body-parser');

var port = process.env.port || 3000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var routes = require('./routes');
var mediaroute = require('./routes/mediapage.js');
var getDBPosts = require('./routes/mediaposts.js');
var renderAdmin = require('./routes/adminRoute.js');
var mediaPost = require('./models/media.js');

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
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/partials', express.static(__dirname + '/views/partials'));

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

app.get('/submitdata', function (req, res) {
    return res.sendFile(__dirname + '/views/submitdata.html');
});

app.use('/media', mediaroute);
app.use('/posts', getDBPosts);
app.use('/admin', renderAdmin);

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//post handlers
app.post('/submitpost', function (req, res) {
    var post = new mediaPost();
    post.title = req.body.title;
    post.video = req.body.video;
    post.vidDesc = req.body.vidDesc;

    post.save(function(err) {
        if (err)
            res.send(err);
        res.json({message: 'Post Created'});
    });
});

module.exports = app;