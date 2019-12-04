const fs = require("fs");
const Robot = require("./robot");
const inquirer = require("inquirer");
const {
  error,
  info,
  logTitle,
  success,
  buildPlaceObject
} = require("../libraries/status");
const { command } = require("../libraries/message");

module.exports = class Controls {
  constructor(grid, filepath) {
    this.filePath = filepath;
    this.robot = null;
    this.grid = grid;
  }

  async displayConsolePrompt() {
    const cmd = await inquirer.prompt(command);
    if (cmd.action.toUpperCase() === "CLOSE") return this.close();

    if (!this.robot.placed && !cmd.action.toUpperCase().includes("PLACE")) {
      error("\n[ERROR] You should PLACE the robot first to start.\n");
      return this.displayConsolePrompt();
    }

    this.parseCommand(cmd.action.toUpperCase());
  }

  isMultipleCommands(command) {
    if (/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command)) {
      return (
        command
          .replace(/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/, "")
          .trim()
          .split(" ").length > 1
      );
    } else if (
      !/(s|PLACE )([0-9],)([0-9],)([A-Z]{4})/.test(command) &&
      command.split(" ").length > 1
    ) {
      return true;
    }
    return false;
  }

  /* Parsing command from Prompt */
  parseCommand(command) {
    if (this.isMultipleCommands(command)) {
      error("[ERROR] Please enter one command only");
      return this.displayConsolePrompt();
    }

    if (!command.includes("PLACE") && !this.robot.placed) {
      info(`Ignore command ${command}, PLACE your robot first`);
    }

    this.runCommand(command.trim());
    info(`Command Executed: ${command}`);
    return this.displayConsolePrompt();
  }

  runCommand(command) {
    if (command.includes("PLACE")) {
      let placeData = buildPlaceObject(command.split(/[ ,]+/));
      this.robot.place(placeData.x, placeData.y, placeData.direction);
    } else {
      switch (command) {
        case "MOVE":
          this.robot.move();
          break;
        case "LEFT":
          this.robot.left();
          break;
        case "RIGHT":
          this.robot.right();
          break;
        case "REPORT":
          success(
            `This is your current Robot Location: [${this.robot.report()}]`
          );
          break;
        default:
          error("\n[ERROR]: Invalid command\n");
          break;
      }
    }
  }

  createRobot() {
    this.robot = new Robot(this.grid);
  }

  run() {
    logTitle("My Toy ROBOT \n");
    this.createRobot();
    return this.filePath
      ? this.parseCommandsFromFile(this.filePath)
      : this.displayConsolePrompt();
  }

  close() {
    success("Exiting application");
    return process.exit();
  }
};
