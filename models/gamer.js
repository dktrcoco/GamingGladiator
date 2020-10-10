// Dependencies
//===================================================================================

module.exports = function(sequelize, DataTypes) {
// create a "Gamer" model that matches up with the database
//20201008 when run in node, "Gamer" is pluralized, just a sequelize convention
var Gamer = sequelize.define("Gamer", {
    gamerName: DataTypes.STRING,
    gamerNumber: DataTypes.STRING,
    medalsBronze: DataTypes.INTEGER,
    medalsSilver: DataTypes.INTEGER,
    medalsGold: DataTypes.INTEGER,
    medalsTotal: DataTypes.INTEGER
});

// sync with database imbedded in sequelize
// Gamer.sync();
return Gamer;
// export the Gamer Model for other files to be able to access
}
