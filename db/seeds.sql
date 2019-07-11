USE initiative_db;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  `email` VARCHAR (30)
, `password` VARCHAR (20)
, `admin` BOOLEAN
);

INSERT INTO Users (`email`, `password`, `admin`)
VALUES
('jon@gmail.com', 'password', 1);

SELECT * FROM Users;