const express = require('express')

const {
  authControllers: { register, login, logout },
} = require('../../controllers')
const {
  validation,
  autenticate,
  controllerWrapper,
} = require('../../middlewares')
const { joiUserSchema } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validation(joiUserSchema),
  controllerWrapper(register)
)

router.post('/login',
  validation(joiUserSchema),
  controllerWrapper(login))

router.get('/logout',
  autenticate,
  controllerWrapper(logout))

module.exports = router
