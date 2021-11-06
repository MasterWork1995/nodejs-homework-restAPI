const crypto = require('crypto')

const getAll = require('./getAll')
const updateContacts = require('./updateContacts')

const getId = () => crypto.randomBytes(16).toString('hex')

const addContact = async (data) => {
  const contacts = await getAll()
  const id = getId()
  const newContact = { id, ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
