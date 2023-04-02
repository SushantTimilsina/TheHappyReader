const Genre = require("../models/genre");
const { errorHandler } = require("../helper/errorHandler");

exports.genreById = (req, res, next, id) => {
  Genre.findById(id).exec((err, genre) => {
    if (err || !genre) {
      return res.status(400).json({
        error: "Genre does not exist", //if we have error we let it handle by error handler which is our helper function.
      });
    }
    req.genre = genre;
    next();
  });
};

exports.create = (req, res) => {
  const genre = new Genre(req.body);
  genre.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err), //if we have error we let it handle by error handler which is our helper function.
      });
    }
    res.json({ data }); //we don't have to do data : data since key and value are same then we can simply write data only.
  });
};

exports.read = (req, res) => {
  return res.json(req.genre);
};

exports.update = (req, res) => {
  const genre = req.genre;
  genre.name = req.body.name;
  genre.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const genre = req.genre;
  genre.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Genre Deleted",
    });
  });
};

// exports.list = (req, res) => {
//   Genre.find().exec((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err),
//       });
//     }
//     res.json(data);
//   });
// };
