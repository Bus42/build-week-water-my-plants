const functions = require("firebase-functions");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const plantsRouter = require("../routes/plants");

const app = express();
const port = 5280; // setting port with .env file breaks firebase

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/plants", plantsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
exports.app = functions.https.onRequest(app);
