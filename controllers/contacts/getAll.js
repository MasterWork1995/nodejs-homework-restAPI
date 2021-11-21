const { BadRequest } = require('http-errors')

const { Contact } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const getAll = async (req, res) => {
  const { page = 0, limit = 0, favorite } = req.query

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    throw new BadRequest('Page and limit must be a number!')
  }
  const skip = (Number(page) - 1) * limit
  const { _id } = req.user

  if (favorite !== undefined) {
    if (favorite !== 'false' && favorite !== 'true') {
      throw new BadRequest('Favorite should be "true" or "false"')
    }
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
