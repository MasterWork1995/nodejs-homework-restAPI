const { User } = require('../../models')
const { sendConflict, sendSuccessToRes } = require('../../helpers')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email)
  const user = await User.findOne({ email })
  if (user) {
    sendConflict(email)
  }
  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  const avatarFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(avatarFolder)
  await newUser.save()
  const { subscription } = newUser

  sendSuccessToRes(res, { email, subscription }, 201)
}

module.exports = register
