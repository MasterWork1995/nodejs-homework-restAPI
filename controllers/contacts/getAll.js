const contactsOperations = require('../../models/contacts')
const { sendSuccessToRes } = require('../../helpers')

const getAll = async (_, res) => {
  const result = await contactsOperations.getAll()

  sendSuccessToRes(res, { result })
}

module.exports = getAll
