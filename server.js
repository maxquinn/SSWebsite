var express = require("express");
var path = require('path');
var app = express();
var bodyParser = require('body-parser')

var port = process.env.port || 3000;

// Setup Views & View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define ./public as static
app.use('/public', express.static(__dirname + '/public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res) {
    return res.render('index');
});

app.get('/feature', function(req, res) {
    return res.render('feature');
});

app.get('/shop', function(req, res) {
    return res.render('shop');
});

app.get('/crew', function(req, res) {
    return res.render('crew');
});

app.listen(port, function() {
    console.log('listening on port ' + port);
});