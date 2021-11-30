const { nanoid } = require('nanoid')

const { User } = require('../../models')
const { sendConflict, sendSuccessToRes, sendMail } = require('../../helpers')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email, { protocol: 'https', s: '250' })
  const user = await User.findOne({ email })
  if (user) {
    sendConflict(email)
  }
  const verificationToken = nanoid()
  const newUser = new User({ email, verificationToken, avatarURL })
  newUser.setPassword(password)
  const avatarFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(avatarFolder)
  await newUser.save()
  const { subscription } = newUser

  const mail = {
    to: email,
    subject: 'Confirm email',
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'>Click for confirming your email!</a>`,
  }
  await sendMail(mail)
  sendSuccessToRes(res, { email, subscription }, 201)
}

module.exports = register
