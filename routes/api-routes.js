// Requiring our models and passport as we've configured it
//our db connection should be in here
// we only want to connect to the db when we have info to add to it
//or if we want to pull to display
//db is here so not needed in server.js
const db = require("../models");

// bringing in the Gamer model
// var Gamer = require("../models/gamer.js");

//the front end will call the api
//where ever you have a route it will be called from the front end

module.exports = function (app) {
  //get all gamers from database
  app.get("/api/all", function (req, res) {
    db.Gamer.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/gold", function (req, res) {
    db.Gamer.findOne({medalsGold}).then(function(results) {
      res.json(results);
    })
  })

  //post for adding new gamertag and relevant info to the database
  //
  app.post("/api/new", function (req, res) {
    console.log("New Player: ");
    console.log(req.body);

    db.Gamer.create({
      gamerName: req.body.gamerName,
      gamerNumber: req.body.gamerNumber,
      medalsBronze: req.body.medalsBronze,
      medalsSilver: req.body.medalsSilver,
      medalsGold: req.body.medalsGold,
      medalsTotal: req.body.medalsTotal
    }).then(function (results) {
      // 'results' here would be the newly created gamer
      res.end();
    });
  });
};
