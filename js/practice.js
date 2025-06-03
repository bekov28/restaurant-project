"use strict";

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

//Class ES-6 and Rest operator

// class Person {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   greeting() {
//     return `Full name: ${this.firstName} ${this.lastName}`;
//   }
// }
// const firstPerson = new Person("Berdiyor", "Orzikulov");
// console.log(firstPerson.greeting());

//extends

// class StatusPerson extends Person {
//   constructor(firstName, lastName, isMarried) {
//     super(firstName, lastName);
//     this.isMarried = isMarried;
//   }
//   get() {
//     return `Full name: ${this.firstName} ${this.lastName}. Married: ${this.isMarried}`;
//   }
// }
// const secondPerson = new StatusPerson('Samar', 'Badriddinov', false);
// console.log(secondPerson);

//JSON va AJAX

//1. Serverga ma'lumot yuborishda aynan JSON formatda ma'lumot yuborish shart hisoblanadi.
//Oldinlari XML ko'rinishda yuborilgan

//2. Server har doim bizga JSON ko'rinishda ma'lumot qaytaradi

// const person = {
//   firstName: "Berdiyor",
//   lastName: "Orzikulov",
//   hobbies: {
//     sport: "Football",
//     games: "UFC",
//   },
// };
//const objToJSON = JSON.stringify(person); // changing from object to JSON

//cloning

// const clone = JSON.parse(JSON.stringify(person)); //back to object
// clone.hobbies.sport = 'Boxing'
// console.log(clone);

//Promise
const statusFriend = "success";

const request = new Promise((resolve, reject) => {
  if (statusFriend === "success") {
    resolve();
  } else {
    reject();
  }
});

request
  .then(() => {
    console.log("My friend has arrived");
  })
  .then(() => {
    console.log("We will travel together");
  })
  .catch(() => {
    console.log("My friend couldnt come");
  })
  .finally("He called");

// //LocalStorage

// localStorage.setItem("sammi-theme", "dark");

// const theme = localStorage.getItem('sammi-theme')
// console.log(theme)

//Regular expressions

// const firstName = "Berdiyor";

// const regEx = /a/gi;

// console.log(regEx.test(firstName)); //false

//\d - digits   \D  - not digits
//\w - words    \W - not words
//\s - space

// const text = "berd2828 ";
// const regEx = /\s/gi;
// console.log(text.match(regEx));

//Webpack
// function getModules() {
//   this.tabs = function () {
//     console.log("Get tabs");
//   };

//   this.slider = function () {
//     console.log("Get sliders");
//   };
// }

// module.exports = getModules;
