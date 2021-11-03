const { NotFound } = require('http-errors')

const sendNotFound = (contactId) => {
  return new NotFound(`Contact with ID: ${contactId} not found`)
}

module.exports = sendNotFound
