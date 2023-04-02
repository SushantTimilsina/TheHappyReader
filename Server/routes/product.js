const express = require("express");
const multer = require("multer");
const router = express.Router();

//importing middlewares
const { VerifyLogin } = require("../middlewares/profile");
const { getUserauthorization } = require("../middlewares/authorization");
const { userById } = require("../controllers/user");
const paginate = require("paginate-middleware");
const {
  productById,
  readProduct,
  removeProduct,
  listProduct,
  Search,
  listBySearch,
  relatedProduct,
} = require("../controllers/product");

//importing product model
const Product = require("../models/product");
// const { userByJwt } = require("../middlewares/profile");

//file or image upload
const storage = multer.diskStorage({
  //Where the incoming file should be stored is(destination)
  //There is request, file and call back
  //You get the request to the folder, access to the file and call back function
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  //It shows how the file name should be define
  filename: function (req, file, cb) {
    //we put the Date.now() function because it gives the date stamp(when we uploaded the image) and makes it unique.
    cb(null, Date.now() + "_" + file.originalname);
  },
});

//filtering the requested file
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//limiting the size of file
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const type = uploads.single("photo");

//get product by id
router.get("/product/:productId", readProduct);

//post product
router.post(
  "/product/create",
  VerifyLogin,
  getUserauthorization,
  type,
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        data: { image: "No file selected" },
      });
    }
    try {
      const productDetails = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        genre: req.body.genre,
        author: req.body.author,
        language: req.body.language,
        pages: req.body.pages,
        shipping: req.body.shipping,
        quantity: req.body.quantity,
        photo: req.file.path,
      };
      const product = new Product(productDetails);
      const result = await product.save();
      return res.send({ status: "Success", data: { product: result } });
    } catch (ex) {
      return res.send({ status: "Error", message: ex.message });
    }
  }
);

//delete product
router.delete(
  "/product/:productId",
  VerifyLogin,
  getUserauthorization,
  removeProduct
);

//edit product
router.put(
  "/product/:productId",
  VerifyLogin,
  getUserauthorization,
  type,
  async (req, res) => {
    const productid = req.params.productId;
    //console.log(req.body);
    try {
      const product = await Product.findById(productid);
      if (req.body.name) {
        product.name = req.body.name;
      }
      if (req.body.description) {
        product.description = req.body.description;
      }
      if (req.body.price) {
        product.price = req.body.price;
      }
      if (req.body.genre) {
        product.genre = req.body.genre;
      }
      if (req.body.author) {
        product.author = req.body.author;
      }
      if (req.body.language) {
        product.language = req.body.language;
      }
      if (req.body.pages) {
        product.pages = req.body.pages;
      }
      if (req.body.quantity) {
        product.quantity = req.body.quantity;
      }
      if (req.file) {
        product.photo = req.file.path;
      }
      if (req.body.shipping) {
        product.shipping = req.body.shipping;
      }
      const result = await product.save();
      return res
        .status(200)
        .send({ status: "success", data: { product: result } });
    } catch (ex) {
      console.log(ex);
      return res
        .status(400)
        .send({ status: "error", message: "Something went wrong" });
    }
  }
);

//GET http://localhost:80/api/products?page=1&limit=5
router.get("/products", paginate(Product), (req, res) => {
  res.json(res.paginatedResult);
});

/**
 * @Related products route
 */
router.get("/products/related/:productId", relatedProduct);

/**
 * @for featured products
 */
router.get("/products/features", listProduct);

/**
 * @search route
 */
router.get("/products/search", Search);

/**
 * @for filtering and checkbox route
 */
router.post("/products/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
