const { Conflict } = require('http-errors')

const sendConflict = (email) => {
  throw new Conflict(`Email: ${email} already in use`)
}

module.exports = sendConflict
