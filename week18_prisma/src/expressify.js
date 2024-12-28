"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./routes/auth");
var todo_1 = require("./routes/todo");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/user', auth_1.default);
app.use('/api/v1/todos', todo_1.default);
var PORT = 3000;
app.listen(PORT, function () {
    console.log("Server Listening at http://localhost:".concat(PORT));
});
