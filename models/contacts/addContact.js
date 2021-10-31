const crypto = require('crypto')

const getAll = require('./getAll')
const updateContacts = require('./updateContacts')

const id = crypto.randomBytes(16).toString('hex')

const addContact = async (data) => {
  const contacts = await getAll()
  const newContact = { id, ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
