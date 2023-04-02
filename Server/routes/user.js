const express = require("express");
const router = express.Router();
const { userById, read, update, getProfile } = require("../controllers/user");
const { VerifyLogin } = require("../middlewares/profile");
const { getUserauthorization } = require("../middlewares/authorization");

//fetch the profile on the basis of jwt token in header
router.get("/user/profile", VerifyLogin, getProfile);

router.get("/secret/:userId", VerifyLogin, getUserauthorization, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", VerifyLogin, read);

router.put("/user/:userId", VerifyLogin, update);

router.param("userId", userById);

module.exports = router;
