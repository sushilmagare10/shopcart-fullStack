const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const globalErrorHandler = require("./middleware/errors");
dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

//Routes
const product = require("./routes/productRoute");
const user = require("./routes/usersRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/cartRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", cart);

// Error Middleware
app.use(globalErrorHandler);

module.exports = app;
