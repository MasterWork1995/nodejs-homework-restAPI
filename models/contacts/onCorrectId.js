const chalk = require('chalk')

const onCorrectId = () => {
  console.log(
    chalk.red('Incorrected Id! Please check your ID and repeat the request')
  )
  return null
}

module.exports = onCorrectId
