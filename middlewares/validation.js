const { sendBadRequest } = require('../helpers')

const validation = (schema) => {
  const validationMiddleware = async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      next(sendBadRequest(res, error, 400))
    }
    next()
  }
  return validationMiddleware
}

module.exports = validation
