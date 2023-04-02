const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");
const axios = require("axios");

module.exports = {
  createOrder: async (req, res, next) => {
    console.log(req.body.total);
    try {
      const result = await axios({
        method: "post",
        url: "https://khalti.com/api/v2/payment/verify/",
        data: {
          token: await req.body.payment.payload.token,
          amount: await req.body.payment.payload.amount,
        },
        headers: {
          Authorization: `Key test_secret_key_5c0b2fbe5910493f9b36edb74b5e741a`,
          "Content-Type": "application/json",
        },
      });

      if (result.status == 200) {
        const { deliveryLocation, products } = req.body;
        const order = new Order({
          deliveryLocation: `${deliveryLocation.country}. ${deliveryLocation.city}, ${deliveryLocation.province}`,
          user: req.user._id,
          total: req.body.total,
          zip: deliveryLocation.zip,
          phone: deliveryLocation.phone,
          paymentStatus: "paid",
          paymentType: "khalti",
        });
        await order.save();

        try {
          for (let i = 0; i < products.length; i++) {
            const newOrder = {
              order: order._id,
              product: products[i].id,
              quantity: products[i].quantity,
            };
            const orderDetail = new OrderDetail(newOrder);
            await orderDetail.save();
          }
        } catch (ex) {
          return res.status(500).send({ status: "error", message: ex.message });
        }
      } else {
        console.log(result.data);
      }
    } catch (ex) {
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },

  /**
   * @For cash on delivery
   */
  createCashOrder: async (req, res, next) => {
    const { deliveryLocation, products } = req.body;
    try {
      const order = new Order({
        deliveryLocation: `${deliveryLocation.country}. ${deliveryLocation.city}, ${deliveryLocation.province}`,
        user: req.user._id,
        total: req.body.total,
        zip: deliveryLocation.zip,
        phone: deliveryLocation.phone,
      });
      await order.save();

      for (let i = 0; i < products.length; i++) {
        const newOrder = {
          order: order._id,
          product: products[i].id,
          quantity: products[i].quantity,
        };
        const orderDetail = new OrderDetail(newOrder);
        await orderDetail.save();
      }
    } catch (ex) {
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },

  fetchAllOrders: async (req, res, next) => {
    try {
      const orders = await Order.find();
      return res.status(200).send({
        status: "success",
        data: {
          orders,
        },
      });
    } catch (ex) {
      console.log(ex);
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },

  fetchMyOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      return res.status(200).json({
        status: "success",
        data: {
          orders,
        },
      });
    } catch (ex) {
      console.log(ex);
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },

  updateOrder: async (req, res, next) => {
    const id = req.params.id;
    try {
      const order = await Order.findById(id);
      if (req.body.status) {
        order.status = req.body.status;
        if (req.body.status === "delivered") {
          order.paymentStatus = "paid";
        }
      }
      if (req.body.paymentStatus) {
        order.paymentStatus = req.body.paymentStatus;
      }
      const result = await order.save();
      return res
        .status(200)
        .send({ status: "success", data: { order: result } });
    } catch (ex) {
      return res
        .status(400)
        .send({ status: "error", message: "Something went wrong" });
    }
  },
};
