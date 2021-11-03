const sendBadRequest = (res, error, status) => {
  return res.status(status).json({
    status: 'Error',
    code: status,
    message: error.message,
  })
}

module.exports = sendBadRequest
