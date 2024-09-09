const express = require("express");
const app = express();
const port = 3000;
let ridesCount = 0;

// AgeValidator middleware
const ageValidator = (req, res, next) => {
  const age = req.query.age;
  if (age >= 18) {
    next();
  } else {
    res.json({
      message: "You are not eligible",
    });
  }
};
// Rides counter middleware
const ridesCounter = (req, res, next) => {
  if (ridesCount >= 2) {
    res.json({
      message: "Total rides exhausted (You used your ride limits)  ",
    });
  } else {
    ridesCount += 1;
    next();
  }
};



// Ride1
app.get("/ride1",ageValidator,ridesCounter, (req, res) => {
  res.json({
    message: "You can eligible to ride in ride1",
  });
});

app.use(ageValidator);
// Ride2
app.get("/ride2", (req, res) => {
  res.json({
    message: "You are eligible to ride in ride2",
  });
});

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
