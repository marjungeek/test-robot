const chalk = require("chalk");

const err = chalk.bold.red;
const success = chalk.bold.green;
const info = chalk.yellow;

module.exports = {
  error: message => console.log(err(`\n${message}`)),
  info: message => console.log(info(`\n${message}\n`)),
  success: message => console.log(success(`\n${message}`)),
  log: (message, items) => console.log(message, items || ""),
  logTitle: title => console.log("My Robot"),
  buildPlaceObject: data => {
    return {
      x: parseInt(data[1]),
      y: parseInt(data[2]),
      direction: data[3]
    };
  }
};
