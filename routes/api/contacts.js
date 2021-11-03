const express = require('express')

const { contactsControllers } = require('../../controllers')
const { validation, controllerWrapper } = require('../../middlewares')
const { contactJoiSchema } = require('../../schemas')

const router = express.Router()

router.get('/', controllerWrapper(contactsControllers.getAll))

router.get('/:contactId', controllerWrapper(contactsControllers.getById))

router.post('/', validation(contactJoiSchema), controllerWrapper(contactsControllers.addContact))

router.put('/:contactId', validation(contactJoiSchema), controllerWrapper(contactsControllers.updateById))

router.delete('/:contactId', controllerWrapper(contactsControllers.removeById))

module.exports = router
