const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

// Config
dotenv.config();

// Enable CORS for all routes
const app = express();
app.use(cors());

// Middleware setup
app.use(express.json({ limit: '3mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Route Imports
const user = require("./routes/userRoute");

// Use Route
app.use("/api/v1", user);

// Use error middleware
app.use(errorMiddleware);

module.exports = app;
