const express = require("express");
const { z } = require("zod");
const { TodoModel } = require("../db/db");
const loginValidator = require("../middlewares/loginValidator");
const router = express.Router();

// Add TODO
router.post("/todo", loginValidator, async (req, res) => {
  try {
    const requiredTodo = z.object({
      title: z.string().max(30),
      description: z.string(),
      status: z.boolean(),
    });
    const parsedTodo = requiredTodo.safeParse(req.body);

    if (!parsedTodo.success) {
      return res.status(400).send({
        message: "Incorrect Format",
      });
    }

    const { title, description, status } = parsedTodo.data;
    await TodoModel.create({
      title,
      description,
      status,
    });
  } catch (error) {
    return res.status(400).send({
      message: `Error is ${error}`,
    });
  }
  return res.send({
    message: "TODO added successfully",
  });
});

// Get Todos
router.get("/todos", loginValidator, async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    return res.send(todos);
  } catch (error) {
    return res.status(500).send({
      message: `Error occurred while fetching todos: ${error.message}`,
    });
  }
});

module.exports = router;
