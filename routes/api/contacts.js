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
const { validation, controllerWrapper } = require('../../middlewares')
const {
  contactJoiSchema,
  updateStatusSchema,
} = require('../../models/contact')

const router = express.Router()

router.get('/', controllerWrapper(getAll))

router.get('/:contactId', controllerWrapper(getById))

router.post('/', validation(contactJoiSchema), controllerWrapper(addContact))

router.put(
  '/:contactId',
  validation(contactJoiSchema),
  controllerWrapper(updateById)
)

router.patch(
  '/:contactId/favorite',
  validation(updateStatusSchema),
  controllerWrapper(updateFavoriteStatus)
)

router.delete('/:contactId', controllerWrapper(removeById))

module.exports = router
