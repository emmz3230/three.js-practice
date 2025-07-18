import Robot from "./robot.js";

export default class FlyingRobot extends Robot {
  constructor(name, legs) {
    super(name, legs);
    super.sayHi();
    console.log(`I am a flying robot `);
  }
  sayHi() {
    console.log(
      `Hello! My name is ${this.name} and i am a flying robot`
    );
  }
  takeOff() {
    console.log(`Have a good flight ${this.name}`);
  }

  land() {
    console.log(`welcome back ${this.name}`);
  }
}
