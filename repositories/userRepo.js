const {User} = require("../models");
const {Op} = require("sequelize");
const {QueryTypes} = require('sequelize');

module.exports = {
  create(requestBody){
    return User.create(requestBody);
  },

  findOne(email){
    return User.findAll(email)
  },

  findID(id){
    return User.findByPk(id)
  },

  deleteUser(id){
    return User.destroy({
      where: {
        [Op.and]: [
          {id},
          {roleID: 7}
        ]
      }
    })
  },

  deleteAdmin(id){
    return User.destroy({
      where: {
        [Op.and]: [
          {id},
          {roleID: 6}
        ]
      }
    })
  },
}