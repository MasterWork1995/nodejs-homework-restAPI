const { sendNotFound } = require('../../helpers')
const contactsOperations = require('../../models/contacts')
const { sendSuccessToRes } = require('../../helpers')

const removeById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeById(contactId)
  if (!result) {
    next(sendNotFound(contactId))
  }
  sendSuccessToRes(res, { result })
}

module.exports = removeById
