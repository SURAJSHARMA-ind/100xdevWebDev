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
function evenodd(a) {
    if (a % 2 == 0) {
        return true;
    }
    else {
        return false;
    }
}
console.log(evenodd(44));
var employee = {
    name: 'Suraj',
    phoneNo: "9973909794",
    age: 21,
    adress: {
        houseNo: "A-2891",
        streetNo: 3,
        city: "string"
    },
    employeeType: "SDE"
};
var employee1 = {
    name: 'Suraj',
    phoneNo: "9973909794",
    age: 21,
    adress: {
        houseNo: "A-2891",
        streetNo: 3,
        city: "string"
    },
    employeeType: "SWE"
};
function findSde(value) {
    if (employee.employeeType === "SDE") {
        return true;
    }
    else {
        return false;
    }
}
console.log('Sde found', findSde(employee1));
