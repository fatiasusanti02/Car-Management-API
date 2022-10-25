'use strict';
const { database } = require('pg/lib/defaults');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserRole, {
        foreignKey: 'userRoleId',
        as: 'userRoles'
      }),
      this.hasMany(models.Car, {
        foreignKey: 'createdBy',
        as: 'createdBy'
      }),
      this.hasMany(models.Car, {
        foreignKey: 'updatedBy',
        as: 'updatedBy'
      }),
      this.hasMany(models.Car, {
        foreignKey: 'deletedBy',
        as: 'deletedBy'
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull:false
    },
    userRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserRole',
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};