const { NotFound } = require('http-errors')

const { User } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const updateSubscription = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  if (subscription === undefined) {
    throw new NotFound('missing field subscription')
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  )

  sendSuccessToRes(res, { result })
}

module.exports = updateSubscription
