const { Contact } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const getAll = async (req, res) => {
  const { page = 0, limit = 0, favorite } = req.query
  const skip = (page - 1) * limit
  const { _id } = req.user

  if (favorite !== undefined) {
    const result = await Contact.find(
      { owner: _id, favorite },
      '_id name email phone favorite owner',
      { skip, limit: Number(limit) }
    ).populate('owner', '_id email')

    return sendSuccessToRes(res, { result })
  }

  const result = await Contact.find(
    { owner: _id },
    '_id name email phone favorite owner',
    { skip, limit: Number(limit) }
  ).populate('owner', '_id email')

  sendSuccessToRes(res, { result })
}

module.exports = getAll
