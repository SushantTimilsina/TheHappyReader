const Author = require("../models/author");
const { errorHandler } = require("../helper/errorHandler");

exports.authorById = (req, res, next, id) => {
  Author.findById(id).exec((err, author) => {
    if (err || !author) {
      return res.status(400).json({
        error: "Author does not exist", //if we have error we let it handle by error handler which is our helper function.
      });
    }
    req.author = author;
    next();
  });
};

exports.createAuthor = (req, res) => {
  const author = new Author(req.body);
  author.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err), //if we have error we let it handle by error handler which is our helper function.
      });
    }
    res.json({ data }); //we don't have to do data : data since key and value are same then we can simply write data only.
  });
};

exports.readAuthor = (req, res) => {
  return res.json(req.author);
};

exports.updateAuthor = (req, res) => {
  const author = req.author;
  author.name = req.body.name;
  author.aboutAuthor = req.body.aboutAuthor;
  author.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.removeAuthor = (req, res) => {
  const author = req.author;
  author.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Author Removed",
    });
  });
};

// exports.listAuthor = (req, res) => {
//   Author.find().exec((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err),
//       });
//     }
//     res.json(data);
//   });
// };
