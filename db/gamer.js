var db = require("./models");

db.Gamer.create({
    gamerName: "Tester",
    gamerNumber: "1234",
    medalsBronze: 1,
    medalsSilver: 2,
    medalsGold: 3,
    medalsTotal: 6
}).then(function(dbGamer) {
    console.log(dbGamer);
});