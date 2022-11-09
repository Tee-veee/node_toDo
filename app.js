// DB
require("./db/connect");

// ENV
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

// EXPRESS
const express = require("express");
const app = express();

// DB
const connectDB = require("./db/connect");

// ROUTER
const tasks = require("./routes/tasks");

// MIDDLEWARE
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(express.static("./public"));
app.use(express.json());

// ROUTES
app.use("/api/v1/tasks", tasks);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// PORT
const port = process.env.PORT || 3000;

const launchServer = async () => {
  try {
    await connectDB(mongoURI);
    app.listen(port, console.log(`Server on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

launchServer();
