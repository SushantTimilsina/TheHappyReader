const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
const { errorHandler } = require("../helper/errorHandler");

//user signup
exports.signup = (req, res) => {
  // console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler(err) });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

//user signin
exports.signin = (req, res) => {
  //we will find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email doesn't exist. Please Signup",
      });
    }
    //if user is found we make sure that email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password doesn't match",
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return response with user and token to frontend client
    const { _id, fName, lName, email, role } = user;
    return res.json({ token, user: { _id, email, fName, lName, role } });
  });
};

//user signout
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Successful" });
};
