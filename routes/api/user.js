const express = require('express')

const {
  authControllers: { register, login, logout, updateSubscription },
} = require('../../controllers')
const {
  validation,
  autenticate,
  controllerWrapper,
} = require('../../middlewares')
const { joiUserSchema, joiSubscriptionSchema } = require('../../models/user')

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

router.patch('/', autenticate, validation(joiSubscriptionSchema), controllerWrapper(updateSubscription))

module.exports = router
