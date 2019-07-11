USE initiative_db;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  `email` VARCHAR (50)
, `password` VARCHAR (50)
, `admin` BOOLEAN
);

DROP TABLE IF EXISTS Games;
CREATE TABLE Games (
  `name` VARCHAR (250)
);

DROP TABLE IF EXISTS Characters;
CREATE TABLE Characters (
  `name` VARCHAR (250)
, `initiative` INT
, `armor-class` INT
, `hit-points` INT
, `image` VARCHAR (250)
);

INSERT INTO Users (`email`, `password`, `admin`)
VALUES
('jon@gmail.com', 'password', 1);

INSERT INTO Games (`name`)
VALUES
('My First D&D Game');

INSERT INTO Characters (`name`, `armorClass`, `hitPoints`, `image`)
VALUES
('Ront', 17, 68, './images/orc.png');
