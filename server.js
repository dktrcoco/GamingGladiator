//DEPENDENCIES
//============================================================
var express = require("express");

//this port needs to be different from the sql port
var PORT = process.env.PORT || 8000;

var app = express();

//static content from the 'public' folder
app.use(express.static("public"));

//parse application body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes and give the server access to them
//yet to be named file from the 'controllers' folder
var routes = require("./controllers/CONTROLLER_NAME.js");

app.use(routes);

//start the server so that it can begin listening to client requests
app.listen(PORT, function() {
    //log server side when the server has started
    console.log("Server listening on: " + PORT);
});