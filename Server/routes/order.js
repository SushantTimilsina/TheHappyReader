const express = require("express");
const router = express.Router();

//import auth controller
const { VerifyLogin } = require("../middlewares/profile");
const {
  createOrder,
  fetchAllOrders,
  fetchMyOrders,
  createCashOrder,
  updateOrder,
} = require("../controllers/order");

router.get("/orders", fetchAllOrders);
router.get("/my-orders", VerifyLogin, fetchMyOrders);
router.post("/orders", VerifyLogin, createOrder);
router.post("/cash/orders", VerifyLogin, createCashOrder);
router.put("/orders/:id", VerifyLogin, updateOrder);

module.exports = router;
