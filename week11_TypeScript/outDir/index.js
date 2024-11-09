"use strict";
var x = 1;
console.log(x);
function greet(firstname) {
    console.log("Hello " + firstname);
}
greet("Suraj Sharma");
function sum(a, b) {
    return a + b;
}
console.log(sum(3, 8));
var greeting = function (name) { return "Hello, ".concat(name, "!"); };
