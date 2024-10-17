const express = require("express");
const app = express();
const port = 3000;
let ridesCount = 0;
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})




// global Ratelimiter 

// let requestNo = 0;
// const rateLimiter = (req, res, next) => {
//   console.log(requestNo);
//   requestNo += 1;

//   if (requestNo < 10) {
//     next();
//   } else {
//     setTimeout(() => {
//       requestNo = 0;
//       console.log("limit reset");
//     }, 20000);

//     return res.status(429).send({
//       message: "Limit Exceed",
//     });
//   }
// };


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

// Ride2
app.get("/ride2",limiter ,(req, res) => {
  return res.json({
    message: "You are eligible to ride in ride2",
  });
});

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
