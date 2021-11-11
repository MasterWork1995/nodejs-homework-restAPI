const { Contact } = require('../../models')
const { sendNotFound } = require('../../helpers')
const { sendSuccessToRes } = require('../../helpers')

const removeById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    next(sendNotFound(contactId))
  }
  sendSuccessToRes(res, { result })
}

module.exports = removeById
