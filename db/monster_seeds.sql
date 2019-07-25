USE initiative_db;

INSERT INTO Monsters
    (`index`, `name`, `armor_class`, `hit_points`, `image`, `strength`, `dexterity`, `constitution`, `intelligence`, `wisdom`, `charisma`, created_at, updated_at)
VALUES
(1, 'Aboleth', 17, 135, './images/orc.png', 21, 9, 15, 18, 15, 18, CURDATE(), CURDATE()),
(2, 'Acolyte', 10, 9, './images/orc.png', 10, 10, 10, 10, 14, 11, CURDATE(), CURDATE()),
(3, 'Adult Black Dragon', 19, 195, './images/orc.png', 23, 14, 21, 14, 13, 17, CURDATE(), CURDATE());