//Constructor

// const number2 = new Number(5); //constructor
// console.log(number2);
// const stringCase = new String("5");
// console.log(stringCase);
// const functionExample = new Function("5");
// console.log(functionExample);

//Function constructor
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.hello = function () {
    console.log(`Hello ${this.firstName} ${this.lastName}`);
  };
}

const firstPerson = new Person("Berdiyor", "Orzikulov");
console.log(firstPerson);
firstPerson.hello();

