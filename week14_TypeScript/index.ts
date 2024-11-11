let x: number = 1;
console.log(x);
// Q1
// Write a function that greets a user given their first name. 
// Argument - firstName
// Logs - Hello {firstName}
// Doesn’t return anything

function greet(firstname: string) {
    console.log("Hello " + firstname);
}

greet("Suraj Sharma")

// Q2 Write a function that calculates the sum of two functions

function sum(a: number, b: number): number {
    return a + b;
}

console.log(sum(3, 8))

//Part 3..........................................................................

// The tsconfig file has a bunch of options that you can change to change the compilation process.
// Some of these include

// 1st
// To try it out, try compiling the following code for target being ES5 and es2020

const greeting = (name: string) => `Hello, ${name}!`;

// Output for ES5
// "use strict";
// var greet = function (name) { return "Hello, ".concat(name, "!"); };


// 2. rootDir  
// Where should the compiler look for .ts files. Good practise is for this to be the src folder

// 3. outDir 
// Where should the compiler look for spit out the .js files.

// 4. noImplicitAny
// Try enabling it and see the compilation errors on the following code - 
// const greet = (name) => `Hello, ${name}!`;

// Then try disabling it

// 5. removeComments
// Weather or not to include comments in the final js file

//   write function which check the no is even or odd

function evenodd(a: number): Boolean {
    if (a % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

console.log(evenodd(44))
//.........................................................................
// Interface in TypeScript 

// An interface is a TypeScript construct that defines the shape of an object.
// It specifies the properties and their types that an object must have.

interface Employee {
    name:  string,
    phoneNo:  string,
    age :number,
    adress: {
        houseNo : string,
        streetNo : number,
        city : string
    } ,
    employeeType : string
}

const employee = {
    name: 'Suraj',
    phoneNo: "9973909794",
    age :21,
    adress: {
        houseNo : "A-2891",
        streetNo : 3,
        city : "string"
    },
    employeeType :"SDE"
}
const employee1 :Employee = {
    name: 'Suraj',
    phoneNo: "9973909794",
    age :21,
    adress: {
        houseNo : "A-2891",
        streetNo : 3,
        city : "string"
    },
    employeeType :"SWE"
}

function findSde(value :Employee):Boolean{
// problem here ?
if(employee.employeeType==="SDE"){
    return  true
}
else{
    return false
}
}

console.log('Sde found',findSde(employee1))