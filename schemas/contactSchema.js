const Joi = require('joi')

const contactJoiShema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
})

module.exports = contactJoiShema
