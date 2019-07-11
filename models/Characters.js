module.exports = (sequelize, DataTypes) => {
  const Characters = sequelize.define('Characters', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    armorClass: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    hitPoints: {
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
    }
  });

  Characters.associate = (models) => {
    Characters.belongsTo(models.Games, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    })
  }

  return Characters;
}