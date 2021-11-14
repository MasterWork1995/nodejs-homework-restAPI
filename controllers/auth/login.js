const { User } = require('../../models')
const { sendNotFound } = require('../../helpers')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = User.findOne({ email })
  if (!user) {
    sendNotFound(email)
  }
}

module.exports = login
