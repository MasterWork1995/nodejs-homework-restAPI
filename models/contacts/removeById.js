const getAll = require('./getAll')
const updateContacts = require('./updateContacts')
const onCorrectId = require('./onCorrectId')

const removeById = async (id) => {
  const contacts = await getAll()
  const index = contacts.findIndex(
    (contact) => contact.id.toString() === id.toString()
  )
  if (index === -1) {
    return onCorrectId()
  }
  const removeContact = contacts.splice(index, 1)
  await updateContacts(contacts)
  return removeContact
}

module.exports = removeById
