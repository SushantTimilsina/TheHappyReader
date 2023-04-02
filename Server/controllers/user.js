const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      const password = user.hashed_password;
      if (password !== user.hashed_password) {
        return res.status(401).json({
          error: "Password doesn't match",
        });
      }
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.getProfile = (req, res) => {
  req.user.hashed_password = undefined;
  req.user.salt = undefined;
  req.user.createdAt = undefined;
  req.user.updatedAt = undefined;
  req.user.__v = undefined;
  return res.json(req.user);
};
