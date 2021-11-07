const getAll = require('./getAll')
const getById = require('./getById')
const addContact = require('./addContact')
const updateById = require('./updateById')
const removeById = require('./removeById')
const updateFavoriteStatus = require('./updateFavoriteStatus')

module.exports = {
  getAll,
  getById,
  addContact,
  updateById,
  removeById,
  updateFavoriteStatus
}
