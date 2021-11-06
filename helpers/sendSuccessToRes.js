const sendSuccessToRes = (res, data, status = 200) => {
  return res.status(status).json({
    status: 'success',
    code: status,
    data,
  })
}

module.exports = sendSuccessToRes
