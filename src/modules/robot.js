const { error } = require("../libraries/status");

const Direction = {
  NORTH: 1,
  EAST: 2,
  SOUTH: 3,
  WEST: 4
};
module.exports = class Robot {
  constructor(boundaries) {
    this.x = 0;
    this.y = 0;
    this.boundaries = boundaries;
    this.direction = Direction.NORTH;
    this.placed = false;
  }

  place(x, y, direction) {
    if (
      x <= this.boundaries.x &&
      x >= 0 &&
      this.y <= this.boundaries.y &&
      y >= 0 &&
      this.isValidDirection(direction)
    ) {
      this.x = x;
      this.y = y;
      this.direction = Direction[direction];
      this.placed = true;
    } else {
      return error(
        `Invalid direction and the position. Please check the current location.`
      );
    }
  }

  //robot should move forward
  move() {
    switch (this.direction) {
      case Direction.NORTH:
        this.y + 1 < this.boundaries.y ? this.y++ : null;
        break;
      case Direction.EAST:
        this.x + 1 < this.boundaries.x ? this.x++ : null;
        break;
      case Direction.SOUTH:
        this.y - 1 >= 0 ? this.y-- : null;
        break;
      case Direction.WEST:
        this.x - 1 >= 0 ? this.x-- : null;
        break;
    }
  }

  //robot will turn to the left side
  left() {
    return this.direction - 1 === 0
      ? (this.direction = Direction.WEST)
      : this.direction--;
  }

  //robot will turn to the right side
  right() {
    return this.direction + 1 === Object.keys(Direction).length
      ? (this.direction = Direction.NORTH)
      : this.direction++;
  }

  //convert direction to string
  convertToString() {
    for (const dir in Direction) {
      if (this.direction === Direction[dir]) return dir;
    }
  }

  //check if its invalid direction
  isValidDirection(direction) {
    return !Direction[direction] ? false : true;
  }

  //display the current location of the robot
  report() {
    return `${this.x},${this.y},${this.convertToString()}`;
  }
};
