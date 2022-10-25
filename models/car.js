'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'deletedBy',
        as: 'deletedby'
      }),
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'createdby'
      }),
      this.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updatedby'
      })
    }
  }
  Car.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sewa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ukuran: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Car',
  });
  return Car;
};