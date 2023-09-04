const express = require("express");
const {
  getAllProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllCategories,
  getCategoriesAndProducts,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isVerifiedUser, verifyRoles } = require("../middleware/Auth");

const router = express.Router();

router.route("/products").get(isVerifiedUser, getAllProducts);

router.route("/product/:id").get(isVerifiedUser, getSingleProduct);

//admin
// router
//   .route("/admin/product/new")
//   .post(isVerifiedUser, verifyRoles("admin"), createProducts);

// router
//   .route("admin/product/:id")
//   .put(isVerifiedUser, verifyRoles("admin"), updateProduct);

router.post(
  "/admin/product/new",
  isVerifiedUser,
  verifyRoles("admin"),
  createProducts
);
router.put(
  "/admin/product/:id",
  isVerifiedUser,
  verifyRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isVerifiedUser,
  verifyRoles("admin"),
  deleteProduct
);

module.exports = router;
