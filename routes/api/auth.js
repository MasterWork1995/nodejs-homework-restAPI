const express = require('express')

const {
  authControllers: { register, login },
} = require('../../controllers')
const { validation, controllerWrapper } = require('../../middlewares')
const { joiUserSchema } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validation(joiUserSchema),
  controllerWrapper(register)
)

router.post('./login',
  validation(joiUserSchema),
  controllerWrapper(login)
)

module.exports = router
