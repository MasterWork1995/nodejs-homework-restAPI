const { NotFound } = require('http-errors')

const sendNotFound = (contactId) => {
  throw new NotFound(`Contact with ${contactId} not found`)
}

module.exports = sendNotFound
