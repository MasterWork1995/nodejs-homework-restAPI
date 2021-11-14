const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  hashPassword: /^\$2[ayb]\$.{56}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
}

const userSchema = Schema(
  {
    email: {
      type: String,
      require: [true, 'Email is required'],
      match: PATTERNS.email,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: PATTERNS.hashPassword,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  }, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const joiUserSchema = Joi.object({
  email: Joi.string().pattern(PATTERNS.email).required(),
  password: Joi.string().pattern(PATTERNS.password).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiUserSchema,
}
