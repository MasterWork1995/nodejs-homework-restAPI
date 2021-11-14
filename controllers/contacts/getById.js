const { Contact } = require('../../models')
const { sendNotFound, sendSuccessToRes } = require('../../helpers')

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) {
    next(sendNotFound(contactId))
  }
  sendSuccessToRes(res, { result })
}

module.exports = getById
