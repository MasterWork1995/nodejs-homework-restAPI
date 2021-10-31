const getAll = require('./getAll')
const onCorrectId = require('./onCorrectId')

const getById = async (id) => {
  const contacts = await getAll()
  const contact = contacts.find((item) => item.id.toString() === id.toString())
  if (!contact) {
    return onCorrectId()
  }
  return contact
}

module.exports = getById
