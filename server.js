// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var bodyParser = require("body-parser");
var mongojs = require('mongojs');
//geth attach qdata/dd1/geth.ipc

var app        = express();

var port = process.env.PORT || 4000;
//var db = mongojs('mongodb://127.0.0.1:27017/MiningDB', ['Projects','DropDown','MiningUsers']);

app.use(express.static(__dirname + '/public')); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes')(app); 
require('./app/userroutes')(app); 
require('./app/miningroutes')(app); 

app.use(morgan("dev"));
//error hadler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});