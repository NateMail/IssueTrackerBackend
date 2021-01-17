const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const dotenv = require("dotenv");
import connectDB from "./Config/db.js";
dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const port = process.env.PORT || 7000;
app.listen(port, () => {
  `App listening on port: ${port}`;
});
