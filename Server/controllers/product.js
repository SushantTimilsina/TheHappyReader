const { errorHandler } = require("../helper/errorHandler");
const Product = require("../models/product");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("genre")
    .populate("author")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.readProduct = (req, res) => {
  return res.json(req.product);
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product removed successfully",
    });
  });
};

/**
 * Sold or featured
 * by sell = /products?sortBy=sold&order=descending&limit=4(limit can be any, for here it is 4)
 * if it is 4 then we will return only 4 products.
 * if no params are send , then all products are returned
 */

// for all Product
exports.listProducts = (req, res) => {
  let order = req.query.order ? req.query.order : "asc"; //ascending order
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product.find()
    // .select("-photo") //not selecting photo since it is in binary form and makes slow.
    .populate("genre") //we are refering the category as mongose object id referencing to "Category" model so we populate it.
    .populate("author")
    .sort([[sortBy, order]]) //Arrays of array
    .limit(limit) //limit or it is set by default
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

// for featured Product
exports.listProduct = (req, res) => {
  let order = req.query.order ? req.query.order : "asc"; //ascending order
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 5; //default it's going to be five.

  Product.find()
    // .select("-photo") //not selecting photo since it is in binary form and makes slow.
    .populate("genre") //we are refering the category as mongose object id referencing to "Category" model so we populate it.
    .populate("author")
    .sort([[sortBy, order]]) //Arrays of array
    .limit(limit) //limit or it is set by default
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

/**
 * @search api controller
 */
exports.Search = (req, res) => {
  //create query object to hold search value and genre value
  const query = {};
  //assign search value to query.name
  if (req.query.search) {
    //i is for case insensitivity
    query.name = { $regex: req.query.search, $options: "i" };
    //assign genre value to query.genre
    if (req.query.genre && req.query.genre != "All") {
      query.genre = req.query.genre;
    }
    //find the product based on query object wih 2 properties
    //search and genre
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    });
  }
};

/**
 * @product by search i.e filtering and checkbox work in react frontend
 *we will implement product search in react frontend
 * we will show genres in checkbox
 * as the user clicks on those checkbox
 * we will make api request and show the products to users based on what he/she wants
 */
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 50;
  let skip = parseInt(req.body.skip);
  let findArgs = {}; //we let it be empty for now when we serach product based on that it returns argument we passed in.

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10](gte and lte are already inbuilt in mongodb)
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    // .select("-photo")
    .populate("genre")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

/**
 * It will find the products based on the req product genre
 * Other product which have the same genre, will be returned
 */

exports.relatedProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  Product.find({ _id: { $ne: req.product }, genre: req.product, genre })
    //ne = not including yourself(product itself) and displaying other diff product
    .limit(limit)
    .populate("genre", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};
