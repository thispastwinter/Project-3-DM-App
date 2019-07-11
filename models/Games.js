module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Games.associate = (models) => {
    Games.hasMany(models.Characters, {
      onDelete: 'cascade'
    });
  };

  Games.associate = (models) => {
    Games.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    })
  }

  return Games;
}