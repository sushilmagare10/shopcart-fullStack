const Product = require("../models/Product");
const CatchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createProducts = CatchAsync(async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getAllProducts = CatchAsync(async (req, res, next) => {
  const countProducts = await Product.countDocuments();
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(8);
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({ products, countProducts });
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.updateProduct = CatchAsync(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

exports.getSingleProduct = CatchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
