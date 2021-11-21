const express = require('express')

const {
  contactsControllers: {
    getAll,
    getById,
    addContact,
    updateById,
    updateFavoriteStatus,
    removeById,
  },
} = require('../../controllers')
const {
  validation,
  authenticate,
  controllerWrapper,
} = require('../../middlewares')
const {
  contactJoiSchema,
  updateStatusSchema,
} = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(getAll))

router.get('/:contactId', authenticate, controllerWrapper(getById))

router.post(
  '/',
  authenticate,
  validation(contactJoiSchema),
  controllerWrapper(addContact)
)

router.put(
  '/:contactId',
  authenticate,
  validation(contactJoiSchema),
  controllerWrapper(updateById)
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(updateStatusSchema),
  controllerWrapper(updateFavoriteStatus)
)

router.delete('/:contactId', authenticate, controllerWrapper(removeById))

module.exports = router
