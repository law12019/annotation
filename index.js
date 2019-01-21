// FileName: index.js

// Import express
let express = require('express')
// Import Body parser
//let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

//var MongoClient = require('mongodb').MongoClient;


// Initialize the app
let app = express();
app.use(express.json());



// Import routes
let apiRoutes = require("./api-routes")




// Configure bodyparser to handle post requests
//app.use(bodyParser.urlencoded({
//    extended: true
//}));
//app.use(bodyParser.json());


// Connect to Mongoose and set connection variable
// How does  "express" get this db connection? The model?
mongoose.connect('mongodb://localhost:27017/annotation', { useNewUrlParser: true });
var db = mongoose.connection;


// Setup server port
var port = process.env.PORT || 8081;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));



// Use Api routes in the App
app.use('/api', apiRoutes)





// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});



