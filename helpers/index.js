const sendSuccessToRes = require('./sendSuccessToRes')
const sendBadRequest = require('./sendBadRequest')
const sendNotFound = require('./sendNotFound')
const sendConflict = require('./sendConflict')

module.exports = {
  sendSuccessToRes,
  sendBadRequest,
  sendNotFound,
  sendConflict,
}
