const { sendSuccessToRes } = require('../../helpers')

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user

  sendSuccessToRes(res, { email, subscription })
}

module.exports = getCurrentUser
