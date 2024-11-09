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