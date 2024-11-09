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

function sum(a: number, b: number):number {
    return a+b;
}

console.log(sum(3,8))

//Part 3

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