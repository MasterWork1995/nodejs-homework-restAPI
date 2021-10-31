const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')

const {
  getAll,
  getById,
  addContact,
  updateById,
  removeById,
} = require('../../models/contacts')

const joiShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await getAll()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await getById(contactId)
    if (!result) {
      throw new NotFound(`Contact with ID: ${contactId} not found`)
      // const error = new Error(`Contact with ID: ${contactId} not found`)
      // error.status = 404
      // throw error
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const result = await addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    const result = await updateById(contactId, req.body)
    if (!result) {
      throw new NotFound(`Contact with ID: ${contactId} not found`)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await removeById(contactId)
    if (!result) {
      throw new NotFound(`Contact with ID: ${contactId} not found`)
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
