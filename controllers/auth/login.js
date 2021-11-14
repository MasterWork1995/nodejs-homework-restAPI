// const bcrypt = require('bcryptjs')
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
// const { NotFound, Unauthorized } = require('http-errors')

const { User } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  //   if (!user) {
  //     throw new NotFound(`User with email: ${email} not found`)
  //   }
  //   const compareResult = bcrypt.compareSync(password, user.password)
  //   if (!compareResult) {
  //     throw new Unauthorized('Wrong password')
  //   }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findOneAndUpdate(user._id, { token })
  sendSuccessToRes(res, { token })
}

module.exports = login
