var express = require("express");
var path = require('path');
var app = express();
var bodyParser = require('body-parser')

var port = process.env.port || 3000;
const MongoClient = require('mongodb').MongoClient

var db
//Set up and connect to mongo database

MongoClient.connect('mongodb://dimethyltryptamine:Dmtmakeamandream1@ds021691.mlab.com:21691/staysavage-media-content', function (err, database) {
    if (err) return console.log(err);
    db = database;
    //connect to server
    app.listen(port, function () {
        console.log('listening on port ' + port);
    });
})

// Setup Views & View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define ./public as static
app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//get handlers
app.get('/', function (req, res) {
    return res.render('index.html');
});

app.get('/shop', function (req, res) {
    return res.render('index.html');
    //simulate click event on shop button
});

app.get('/kvka', function (req, res) {
    return res.render('kvka.html');
});

app.get('/submitdata', function (req, res) {
    return res.render('submitdata.html');
});

app.get('/media', function (req, res) {
    db.collection('data').find().toArray(function(err, result) {
        if (err) return console.log(err);
        return res.render('media.ejs', {data: result});
    });
});

//post handlers
app.post('/submitpost', function (req, res) {
    db.collection('data').save(req.body, function(err, result) {
        if (err) return console.leg(err);

        console.log('saved to database');
        res.redirect('/');
    });
});