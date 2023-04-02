const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    //trim = any space in the beginning or end there will be trimmed out
    trim: true,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    //trim = any space in the beginning or end there will be trimmed out
    trim: true,
    required: true,
    maxlength: 32,
  },
  genre: {
    type: ObjectId,
    ref: "Genre",
    required: true,
  },
  author: {
    type: ObjectId,
    ref: "Author",
    required: true,
  },
  language: {
    type: String,
    trim: true,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  photo: {
    type: String,
  },
  sold: {
    type: Number,
    default: 0,
  },
  shipping: {
    required: false,
    type: Boolean,
  },
});

module.exports = mongoose.model("Product", productSchema);
