// const bcrypt = require('bcryptjs')

const { User } = require('../../models')
const { sendConflict, sendSuccessToRes } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    sendConflict(email)
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()
  const { subscription } = newUser

  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  // await User.create({ email, password: hashPassword })
  sendSuccessToRes(res, { email, subscription }, 201)
}

module.exports = register
