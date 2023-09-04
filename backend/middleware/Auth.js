const User = require("../models/User");
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.isVerifiedUser = CatchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookie;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(
      new AppError(
        "You are not logged in! Please log in to access the resources.",
        401
      )
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      new AppError(
        "You are not logged in! Please log in to access the resources.",
        401
      )
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedData) => {
    if (err) {
      return next(new AppError("Token is not valid!", 403));
    }

    req.user = await User.findById(decodedData.id);
    next();
  });
});

exports.verifyRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
