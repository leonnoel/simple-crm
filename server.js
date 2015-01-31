// BASE SETUP	
// ==============================

//CALL THE PACKAGES -------------
var express    = require('express'); //call express
var app		   = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan     = require('morgan'); // used to see requests
var mongoose   = require('mongoose'); // for working w/ our database
var port       = process.env.PORT || 8080; // set the port for our app
var user       = require('./app/models/user');

// APP CONFIGURATION ------------
// use body-parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure our app to handle CORS requests
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
	next();	
});

// log all requests to the console
app.use(morgan('dev'));

//connect to our database (hosted on modulus.io)
mongoose.connect('mongodb://node:noder@proximus.modulusmongo.net:27017/o6qaZyto');

// ROUTES FOR OUR API
// ==============================

//basic route for the home page
app.get('/', function(req,res){
	res.send('Hello World - Home Page');
});

//get an instance of the express router
var apiRouter = express.Router();

//test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req,res){
	res.json({ message: 'hooray! welcome to our api!' });
});

//more routes for our API will happen here

//REGISTER OUR ROUTES -----------
//all of our routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
// ==============================
app.listen(port);
console.log("View on port: " + port);
