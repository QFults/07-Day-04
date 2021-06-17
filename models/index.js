const Item = require('./Item.js')
const User = require('./User.js')

User.hasMany(Item, { foreignKey: 'uid' })

module.exports = { Item }
