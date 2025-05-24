//Constructor

// const number2 = new Number(5); //constructor
// console.log(number2);
// const stringCase = new String("5");
// console.log(stringCase);
// const functionExample = new Function("5");
// console.log(functionExample);

//Function constructor
// function Person(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.hello = function () {
//     console.log(`Hello ${this.firstName} ${this.lastName}`);
//   };
// }

// const firstPerson = new Person("Berdiyor", "Orzikulov");
// console.log(firstPerson);
// firstPerson.hello();

//Context this

//Oddiy functiondan this ni o'zi kelsa windowni consolega chiqaradi

// function showThis() {
//   console.log(this);  //window
// }
// showThis();

//bind

// function calc(number) {
//   return this * number;
// }
// const double = calc.bind(2);
// console.log(double(100));
