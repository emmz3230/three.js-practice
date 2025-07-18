// const anotherThing = () => {
//   hello: "modules are working";
// };

// const oneThing = () => {
//   console.log("hi");
// };

// export { oneThing, anotherThing };

class Robot {
  constructor(name, legs) {
    this.name = name;
    this.legs = legs;

    console.log(`I am ${this.name}. Thank you creator.`);
    this.sayHi();
  }

  sayHi() {
    console.log(`Hello! My name is ${this.name}`);
  }
}
