const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const expressValidator = require("express-validator");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const genreRoutes = require("./routes/genre");
const authorRoutes = require("./routes/author");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connection Successful"));

app.use(morgan("dev")); //Help us to know which routes have been requested and we can see it in console.
app.use(bodyParser.json()); //Parse the incoming body request in json format.
app.use(cookieParser()); //cookie-parser is a middleware which parses cookies attached to the client request object.
app.use(expressValidator());
app.use(cors({ origin: "*" }));



//routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", genreRoutes);
app.use("/api", authorRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
