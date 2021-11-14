const { Contact } = require('../../models')
const { sendSuccessToRes, sendNotFound } = require('../../helpers')

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    return next(sendNotFound(contactId))
  }
  sendSuccessToRes(res, { result })
}

module.exports = updateById
