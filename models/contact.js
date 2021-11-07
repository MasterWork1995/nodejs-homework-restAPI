const { Schema, model } = require('mongoose')
const Joi = require('joi')

const PATTERNS = {
  name: /^([A-Z]?[a-z]+([ ]?[a-z]?['-]?[A-Z]?[a-z]+)*)$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
}

const contactSchema = Schema({
  name: {
    type: String,
    match: PATTERNS.name,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    match: PATTERNS.email,
    required: true,
  },
  phone: {
    type: String,
    match: PATTERNS.phone,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const contactJoiSchema = Joi.object({
  name: Joi.string().pattern(PATTERNS.name).required(),
  email: Joi.string().pattern(PATTERNS.email).required(),
  phone: Joi.string().pattern(PATTERNS.phone).required(),
  favorite: Joi.boolean(),
})

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).unknown(true)

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  contactJoiSchema,
  updateStatusSchema,
}
