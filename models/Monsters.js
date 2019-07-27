module.exports = (sequelize, DataTypes) => {
  const Monsters = sequelize.define('Monsters', {
    index: {
      type: DataTypes.INTEGER,
      primary_key: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    size: DataTypes.STRING,
    type: DataTypes.STRING,
    subtype: DataTypes.STRING,
    alignment: DataTypes.STRING,
    armor_class: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hit_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hit_dice: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    dexterity: DataTypes.INTEGER,
    constitution: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    wisdom: DataTypes.INTEGER,
    charisma: DataTypes.INTEGER,
    constitution_save: DataTypes.INTEGER,
    intelligence_save: DataTypes.INTEGER,
    wisdom_save: DataTypes.INTEGER,
    history: DataTypes.INTEGER,
    perception: DataTypes.INTEGER,
    senses: DataTypes.STRING,
    languages: DataTypes.STRING,
    challenge_rating: DataTypes.INTEGER,

    // Custom Fields
    image: DataTypes.STRING,

    // index: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     len: [1],
    //   },
    // },
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1],
    //   },
    // },
    // armor_class: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     len: [1],
    //   },
    // },
    // hit_points: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     len: [1],
    //   },
    // },
    // image: {
    //   type: DataTypes.STRING,
    //   defaultValue: false,
    //   allowNull: true,
    // },
    // strength: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    // dexterity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    // constitution: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    // intelligence: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    // wisdom: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
    // charisma: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
  });

  return Monsters;
};
