const express = require('express')
const app = express()

////Assignment 03 exception handling

// Middleware to simulate an error
app.get("/", (req, res, next) => {
    const error = new Error("Something went wrong!");
    next(error); // Pass error to the error-handling middleware
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
     
    });
  });



app.listen(3000,()=>{
    console.log('server listening at http://localhost:3000')
})
