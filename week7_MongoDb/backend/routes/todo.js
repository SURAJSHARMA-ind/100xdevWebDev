const express = require("express");
const { z } = require("zod");
const { TodoModel } = require("../db/db");
const loginValidator = require("../middleware/loginValidator");
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
    const userid = req.userid;
    await TodoModel.create({
      userid: userid,
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
  console.log("todo userid", req.userid);
  const userid = req.userid;

  try {
    const todos = await TodoModel.find({ userid: userid });
    return res.send(todos);
  } catch (error) {
    return res.status(500).send({
      message: `Error occurred while fetching todos: ${error.message}`,
    });
  }
});
// Update Todo

router.put("/update/:id", loginValidator, async (req, res) => {
  const todoid = req.params.id;
  const userid = req.userid;

  const updateData = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.boolean().optional(),
  });

  const updatedtodo = updateData.safeParse(req.body);

  if (!updatedtodo.success) {
    return res.status(409).json({
      message: "Incorrect Format",
    });
  }
  try {
    const { title, description, status } = updatedtodo.data;

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: todoid, userid: userid },
      { title, description, status },
      { new: true } //return updated document
    );

    if (!updatedTodo) {
      return res.status(409).json({
        message: "Todo not found ",
      });
    }

    return res.status(200).json({
      message: "Todo Updated Succesfully",
      todo: updatedtodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error : ${error}`,
    });
  }
});
// Delete Todo
router.delete("/delete/:id", loginValidator, async (req, res) => {
  const todoid = req.params.id;
  const userid = req.userid;

  const todo = TodoModel.findOne({ _id: todoid, userid: userid });

  if (!todo) {
    return res.status(409).json({
      message: "Todo not present",
    });
  }
try{
  await TodoModel.deleteOne({_id:todoid});

  return res.status(200).json({
    message :"Todo deleted successfully"
  })

}
catch(error){
  return res.status(500).json({
    message:`Error : ${error}`
  })
}
});
// Clear All
router.delete("/deleteall",loginValidator, async (req,res)=>{
  try{
  const userid = req.userid

  const result = await TodoModel.deleteMany({userid:userid})
   if(result.deletedCount===0){
    return res.status(400).json({
      message:"Todos not found"
    })
   }

   res.status(200).json({message:"Todo deleted successfully"})

  }catch(error){
    return res.status(500).json({
      message:`Error : ${error}`
    })
  }
})

module.exports = router;
