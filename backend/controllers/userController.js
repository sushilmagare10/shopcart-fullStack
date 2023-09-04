const CatchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/User");

// create token and save it in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //removing password from the res
  user.password = undefined;

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

exports.registerUser = CatchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  sendToken(user, 201, res);
});

exports.loginUser = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if the user has given both email and password
  if (!email || !password) {
    return next(new AppError("Please Enter Email & Password", 401));
  }

  //check if user exists & password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.adminLogin = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the user has provided both email and password
  if (!email || !password) {
    return next(new AppError("Please enter email and password", 401));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Check if the user is an admin
  if (user.role !== "admin") {
    return next(
      new AppError("You are not authorized to access this resource", 403)
    );
  }

  sendToken(user, 200, res);
});

exports.logout = CatchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.getAllUsers = CatchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError(`User does not  with id ${req.params.id}`, 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getMonthlyUsers = CatchAsync(async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    data,
  });
});
