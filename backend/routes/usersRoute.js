const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getSingleUser,
  getAllUsers,
  getMonthlyUsers,
  adminLogin,
} = require("../controllers/userController");
const { isVerifiedUser, verifyRoles } = require("../middleware/Auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

//Admin
router.route("/adminlogin").post(adminLogin);

router.route("/users").get(isVerifiedUser, verifyRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isVerifiedUser, verifyRoles("admin"), getSingleUser);
router
  .route("/admin/users/stats")
  .get(isVerifiedUser, verifyRoles("admin"), getMonthlyUsers);

module.exports = router;
