const express = require('express')

const {
  authControllers: {
    register,
    login,
    logout,
    getCurrentUser,
    updateSubscription,
    updateAvatar,
    verify,
    reVerify,
  },
} = require('../../controllers')
const {
  validation,
  authenticate,
  controllerWrapper,
  upload,
} = require('../../middlewares')
const { joiUserSchema, joiSubscriptionSchema } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validation(joiUserSchema),
  controllerWrapper(register)
)

router.post('/login', validation(joiUserSchema), controllerWrapper(login))

router.get('/logout', authenticate, controllerWrapper(logout))

router.get('/current', authenticate, controllerWrapper(getCurrentUser))

router.get('verify/:verificationToken', controllerWrapper(verify))

router.post('/verify', controllerWrapper(reVerify))

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  controllerWrapper(updateAvatar)
)

router.patch(
  '/',
  authenticate,
  validation(joiSubscriptionSchema),
  controllerWrapper(updateSubscription)
)

module.exports = router
