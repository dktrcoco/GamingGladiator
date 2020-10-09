-- this is for local use only
DROP DATABASE IF EXISTS gamers_db;
CREATE DATABASE gamers_db;

USE gamers_db;
CREATE TABLE gamers(
id INT NOT NULL AUTO_INCREMENT,
gamertag VARCHAR(50) NOT NULL,
medalsBronze INT NOT NULL,
medalsSilver INT NOT NULL,
medalsGold INT NOT NULL,
medalsTotal INT NOT NULL
PRIMARY KEY (id)
);