const express = require("express");
const app = express();
const port = 3000;
const rateLimit = require('express-rate-limit');
let ridesCount = 0;

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 2 minutes
	limit: 2, // Limit each IP to 10 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	
})

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
app.get("/ride1", ageValidator, ridesCounter, (req, res) => {
  res.json({
    message: "You can eligible to ride in ride1",
  });
});

// app.use(ageValidator);
// Ride2
app.get("/ride2",limiter, (req, res) => {
  res.json({
    message: "You are eligible to ride in ride2",
  });
});

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
