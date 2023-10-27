const express = require("express");
const cors = require("cors");

const exampleRouter = require("./routers/examples");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is an example API");
});

// Routes
app.use("/examples", exampleRouter);

module.exports = app;
