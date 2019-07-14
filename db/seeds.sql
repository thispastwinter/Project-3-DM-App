-- USE initiative_db;

-- DROP TABLE IF EXISTS Users;
-- CREATE TABLE Users (
--   `id` INT AUTO_INCREMENT NOT NULL
-- , `email` VARCHAR (50)
-- , `password` VARCHAR (50)
-- , `admin` BOOLEAN
-- , PRIMARY KEY(`id`)
-- );

-- DROP TABLE IF EXISTS Games;
-- CREATE TABLE Games (
--   `id` INT AUTO_INCREMENT NOT NULL
-- , `name` VARCHAR (250)
-- , PRIMARY KEY(`id`)
-- );

-- DROP TABLE IF EXISTS Characters;
-- CREATE TABLE Characters (
--   `id` INT AUTO_INCREMENT NOT NULL
-- , `name` VARCHAR (250)
-- , `initiative` INT
-- , `armorClass` INT
-- , `hitPoints` INT
-- , `image` VARCHAR (250)
-- , PRIMARY KEY(`id`)
-- );

-- =======================================================================

USE initiative_db;

INSERT INTO Users (`email`, `password`, `admin`, created_at, updated_at)
VALUES
('jon@gmail.com', 'password', 1, CURDATE(), CURDATE());

INSERT INTO Games (`name`, created_at, updated_at, user_id)
VALUES
('My First D&D Game', CURDATE(), CURDATE(), 1);

INSERT INTO Characters (`name`, `initiative`, `armor_class`, `hit_points`, `image`, created_at, updated_at, game_id)
VALUES
('Ront', 12, 17, 68, './images/orc.png', CURDATE(), CURDATE(), 1);
