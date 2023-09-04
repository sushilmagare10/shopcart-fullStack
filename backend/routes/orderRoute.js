const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrders,
  updateOrder,
  getDeleteOrder,
  monthlyIncome,
  getTotalOrdersForProduct,
  getTotalOrders,
  getOrdersPerMonth,
} = require("../controllers/orderController");
const { isVerifiedUser, verifyRoles } = require("../middleware/Auth");

const router = express.Router();

router.route("/order/new").post(isVerifiedUser, newOrder);

router.route("/order/:id").get(isVerifiedUser, getSingleOrder);

router.route("/all-orders/:userId").get(isVerifiedUser, getMyOrders);

//admin route
router
  .route("/admin/orders")
  .get(isVerifiedUser, verifyRoles("admin"), getAllOrders);

router
  .route("/admin/totalorders/:productId")
  .get(isVerifiedUser, verifyRoles("admin"), getTotalOrdersForProduct);

router
  .route("/admin/orders/per-month")
  .get(isVerifiedUser, verifyRoles("admin"), getOrdersPerMonth);

router
  .route("/admin/order/:id")
  .put(isVerifiedUser, verifyRoles("admin"), updateOrder)
  .delete(isVerifiedUser, verifyRoles("admin"), getDeleteOrder);

//income
router
  .route("/admin/income")
  .get(isVerifiedUser, verifyRoles("admin"), monthlyIncome);

module.exports = router;
