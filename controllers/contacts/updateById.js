const { sendNotFound } = require('../../helpers')
const contactsOperations = require('../../models/contacts')
const { sendSuccessToRes } = require('../../helpers')

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateById(contactId, req.body)
  if (!result) {
    next(sendNotFound(contactId))
  }
  sendSuccessToRes(res, { result })
}

module.exports = updateById
