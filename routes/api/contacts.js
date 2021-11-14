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
  autenticate,
  controllerWrapper,
} = require('../../middlewares')
const {
  contactJoiSchema,
  updateStatusSchema,
} = require('../../models/contact')

const router = express.Router()

router.get('/', autenticate, controllerWrapper(getAll))

router.get('/:contactId', autenticate, controllerWrapper(getById))

router.post(
  '/',
  autenticate,
  validation(contactJoiSchema),
  controllerWrapper(addContact)
)

router.put(
  '/:contactId',
  autenticate,
  validation(contactJoiSchema),
  controllerWrapper(updateById)
)

router.patch(
  '/:contactId/favorite',
  autenticate,
  validation(updateStatusSchema),
  controllerWrapper(updateFavoriteStatus)
)

router.delete('/:contactId', autenticate, controllerWrapper(removeById))

module.exports = router
