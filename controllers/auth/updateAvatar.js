const fs = require('fs/promises')
const jimp = require('jimp')
const path = require('path')
const { NotFound } = require('http-errors')

const { User } = require('../../models')
const { sendSuccessToRes } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file

  try {
    const { _id } = req.user
    const fileName = `${String(_id)}_${originalname}`
    const resultUpload = path.join(avatarsDir, fileName)
    await fs.rename(tmpUpload, resultUpload)
    const avatarURL = path.join('/avatars', fileName)
    const file = await jimp.read(resultUpload)
    file.resize(250, 250).write(resultUpload)

    const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })

    if (!result) {
      throw new NotFound(`User with id:${_id} not found`)
    }
    sendSuccessToRes(res, { avatarURL })
  } catch (error) {
    await fs.unlink(tmpUpload)
    next(error)
  }
}

module.exports = updateAvatar
