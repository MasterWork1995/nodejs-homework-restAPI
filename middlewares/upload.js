const multer = require('multer')
const path = require('path')

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const tempDir = path.join(__dirname, '../tmp')
const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 4096,
  },
})

const fileFilter = (req, file, cb) => {
  MIME_TYPE[file.mimetype] ? cb(null, true) : cb(null, false)
}

const upload = multer({ storage: uploadConfig, fileFilter })

module.exports = upload
