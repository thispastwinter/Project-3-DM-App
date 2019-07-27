module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    // auth_token: DataTypes.STRING,
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.Games, {
  //     onDelete: 'cascade'
  //   });
  // };

  Users.associate = (models) => {
    models.Users.belongsToMany(models.Games, { 
      as: 'Users',
      through: 'users_games',
      foreignKey: 'user_id'
      // foreignKey: {
      //   allowNull: false,
      //   defaultValue: 1
      // }
    });
  };

  return Users;
};