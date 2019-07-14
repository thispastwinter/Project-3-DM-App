USE initiative_db;

INSERT INTO Users (`email`, `password`, `admin`, created_at, updated_at)
VALUES
('jon@gmail.com', 'password', 1, CURDATE(), CURDATE());

INSERT INTO Games (`name`, created_at, updated_at)
VALUES
('My First D&D Game', CURDATE(), CURDATE());

INSERT INTO Characters (`name`, `initiative`, `armor_class`, `hit_points`, `image`, created_at, updated_at, game_id)
VALUES
('Ront', 12, 17, 68, './images/orc.png', CURDATE(), CURDATE(), 1);