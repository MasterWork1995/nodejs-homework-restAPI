const { Contact } = require('../../models')
const {
  sendSuccessToRes,
  sendNotFound,
  sendBadRequest,
} = require('../../helpers')

const updateFavoriteStatus = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  if (favorite === undefined) {
    return next(sendBadRequest({ message: 'missing field favorite' }))
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )
  if (!result) {
    return next(sendNotFound(contactId))
  }
  sendSuccessToRes(res, { result })
}

module.exports = updateFavoriteStatus
