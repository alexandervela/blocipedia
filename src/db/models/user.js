'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
      classMethods: {
        associate: function(models) {
          // Add the correct association and relationship
          User.hasMany(Wiki, {foreignKey: "userId", as: "wikis"});
        }
      }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};