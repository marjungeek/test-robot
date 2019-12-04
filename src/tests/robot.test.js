const Robot = require("../modules/robot");

describe("robot testing", () => {
  const Direction = {
    NORTH: 1,
    EAST: 2,
    SOUTH: 3,
    WEST: 4
  };

  let robot = null;

  beforeEach(() => {
    robot = new Robot({ x: 5, y: 5 });
  });

  it("should validate a correct direction", () => {
    expect(robot.isValidDirection("INVALID")).toBe(false);
  });

  it("should not move to past the boundary", () => {
    robot.place(4, 4, "NORTH");
    robot.move();
    expect(robot.x).toBe(4);
    expect(robot.y).toBe(4);
    expect(robot.direction).toBe(Direction.NORTH);
  });

  it("should place the robot in the correct position", () => {
    robot.place(3, 3, "EAST");
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(3);
    expect(robot.direction).toBe(Direction.EAST);
  });

  it("should not place if the direction is incorrect", () => {
    robot.place(3, 3, "WES");
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.direction).toBe(Direction.NORTH);
  });

  it("should move to forward north", () => {
    robot.move();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(1);
    expect(robot.direction).toBe(Direction.NORTH);
  });

  it("should move to forward east", () => {
    robot.place(3, 3, "EAST");
    robot.move();
    expect(robot.x).toBe(4);
    expect(robot.y).toBe(3);
    expect(robot.direction).toBe(Direction.EAST);
  });

  it("should move to forward south", () => {
    robot.place(3, 3, "SOUTH");
    robot.move();
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(2);
    expect(robot.direction).toBe(Direction.SOUTH);
  });

  it("should move to forward west", () => {
    robot.place(3, 3, "WEST");
    robot.move();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(3);
    expect(robot.direction).toBe(Direction.WEST);
  });

  it("should display the current position and direction", () => {
    expect(robot.report()).toBe("0,0,NORTH");
  });

  it("should move the robot left", () => {
    robot.left();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.direction).toBe(Direction.WEST);
  });

  it("should move the robot right", () => {
    robot.right();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(0);
    expect(robot.direction).toBe(Direction.EAST);
  });
});
