const express = require("express");
const router = express.Router();

//importing middlewares
const { VerifyLogin } = require("../middlewares/profile");
const { getUserauthorization } = require("../middlewares/authorization");
const Genre = require("../models/genre");
const paginate = require("paginate-middleware");

const {
  create,
  genreById,
  read,
  update,
  remove,
} = require("../controllers/genre");
const { userById } = require("../controllers/user");

router.get("/genre/:genreId", read);

router.post("/genre/create", VerifyLogin, getUserauthorization, create);

router.put("/genre/:genreId", VerifyLogin, getUserauthorization, update);

router.delete("/genre/:genreId", VerifyLogin, getUserauthorization, remove);

//GET http://localhost:80/api/genres?page=1&limit=5
router.get("/genres", paginate(Genre), (req, res) => {
  res.json(res.paginatedResult);
});

router.param("genreId", genreById);
//params property is where Express stores the values of the named sections in the URL.

router.param("userId", userById);

module.exports = router;
