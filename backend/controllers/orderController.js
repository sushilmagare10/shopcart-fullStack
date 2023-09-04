const Order = require("../models/Order");
const Product = require("../models/Product");
const CatchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//create order
exports.newOrder = CatchAsync(async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getSingleOrder = CatchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("userId");

  if (!order) {
    return next(new AppError("Order not found with this ID", 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getMyOrders = CatchAsync(async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getAllOrders = CatchAsync(async (req, res, next) => {
  const productId = req.query.pid; // Retrieve the product ID from the query parameters
  const filter = productId ? { products: { $elemMatch: { productId } } } : {};

  const orders = await Order.find(filter);

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getTotalOrdersForProduct = CatchAsync(async (req, res, next) => {
  const productId = req.params.productId;

  const totalOrders = await Order.countDocuments({
    "products.productId": productId,
  });

  res.status(200).json({
    success: true,
    totalOrders,
  });
});

exports.getOrdersPerMonth = CatchAsync(async (req, res, next) => {
  try {
    const ordersPerMonth = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      ordersPerMonth,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.updateOrder = CatchAsync(async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,

      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getDeleteOrder = CatchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
  });
});

exports.monthlyIncome = CatchAsync(async (req, res, next) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
