const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      //trim = any space in the beginning or end there will be trimmed out
      trim: true,
      required: true,
      maxlength: 32,
    },
    lName: {
      type: String,
      //trim = any space in the beginning or end there will be trimmed out
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      //trim = any space in the beginning or end there will be trimmed out
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      //we will still take the password from the client but when we save
      //we will save the hashed version of it.
      type: String,
      required: true,
    },
    salt: String,

    role: {
      type: String,
      enum: ["user", "admin"], //enum means = must be user or admin doesn't take other value
      default: "user",
    },
  },
  { timestamps: true }
);

//Virtual Field

//In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
//Virtual field to be displayed on client side.

//for hashing password when user data is saved we will save password in the version of hash
//The uuid, or universally unique identifier, is a secure way to generate cryptographically strong unique
// identifiers with Node. js that doesn't require a large amount of code.
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      //A type of creating hash password
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
