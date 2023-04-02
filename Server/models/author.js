const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    //trim = any space in the beginning or end there will be trimmed out
    trim: true,
    required: true,
    maxlength: 32,
  },
  aboutAuthor: {
    type: String,
    //trim = any space in the beginning or end there will be trimmed out
    trim: true,
    required: true,
    maxlength: 2000,
  },
});

module.exports = mongoose.model("Author", authorSchema);
