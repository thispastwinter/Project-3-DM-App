module.exports = (sequelize, DataTypes) => {
  const Monsters = sequelize.define('Monsters', {
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    armor_class: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    hit_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: true,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Monsters;
};
