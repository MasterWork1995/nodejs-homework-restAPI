const chalk = require("chalk");

const onCorrectId = () => {
  console.log(
    chalk.red("Incorrected Id! Please check your id and repeat the request")
  );
};

module.exports = onCorrectId;
