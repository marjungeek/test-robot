const argv = require("yargs").demandCommand(
  1,
  "Please enter command to start your robot"
).argv;

const Controls = require("./modules/controls");

const initialize = new Controls({ x: 5, y: 5 }, argv.file || null);
initialize.run();
