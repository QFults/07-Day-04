const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Item extends Model { }

Item.init({
  text: DataTypes.STRING,
  isDone: DataTypes.BOOLEAN
}, { sequelize, modelName: 'items' })

module.exports = Item
