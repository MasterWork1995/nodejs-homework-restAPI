
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { Forbidden } = require('http-errors')

const { User } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')
require('dotenv').config()
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user.verify) {
    throw new Forbidden('Email needs to be confirmed')
  }
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
  await User.findByIdAndUpdate(user._id, { token })
  sendSuccessToRes(res, { token })
}

module.exports = login
