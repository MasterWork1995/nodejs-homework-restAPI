const { Contact } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const getAll = async (_, res) => {
  const result = await Contact.find()

  sendSuccessToRes(res, { result })
}

module.exports = getAll
