const { BadRequest } = require('http-errors')

const sendBadRequest = (error) => {
  return new BadRequest(error.message)
}

module.exports = sendBadRequest
