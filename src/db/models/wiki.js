'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING
    },
    private: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
      classMethods: {
        associate: function(models) {
          // Add the correct association and relationship
          Wiki.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE"});
        }
      }
  });
  Wiki.associate = function(models) {
    // associations can be defined here
  };
  return Wiki;
};