module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Users.associate = (models) => {
    Users.hasMany(models.Games, {
      onDelete: 'cascade'
    });
  };

  return Users;
};