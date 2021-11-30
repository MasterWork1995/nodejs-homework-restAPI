const { User } = require('../../models')
const { NotFound } = require('http-errors')
const { sendSuccessToRes } = require('../../helpers')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    throw new NotFound('User not found')
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })

  return sendSuccessToRes(res, { message: 'Verification successful' })
}

module.exports = verify
