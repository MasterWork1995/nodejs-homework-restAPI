const { BadRequest } = require('http-errors')

const sendBadRequest = (error) => {
  throw new BadRequest(error.message)
}

module.exports = sendBadRequest
