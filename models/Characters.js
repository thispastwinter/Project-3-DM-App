module.exports = (sequelize, DataTypes) => {
  const Characters = sequelize.define('Characters', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    initiative: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        len: [1]
      }
    },
    armor_class: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    hit_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: true
    },
    turn_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });

  Characters.associate = (models) => {
    models.Characters.belongsTo(models.Games, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    })
  }

  return Characters;
}