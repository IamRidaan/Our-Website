const errorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ID: ${err.path}`;
    err = new errorHandler(message, 404);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new errorHandler(message, 400);
  }

  // Handle wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid, try again`;
    err = new errorHandler(message, 400);
  }

  // Handle JWT expire error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token has expired, try again`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
