//getting user authorization to know whether the user is admin or not

function getUserauthorization(req, res, next) {
  const user = req.user;

  try {
    if (user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .send({ status: "fail", message: "unauthorized access" });
      //401 =Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
      //That is, the client must authenticate itself to get the requested response.
    }
  } catch (ex) {
    return res.status(404).send("Something went Wrong!");
  }
}

module.exports = { getUserauthorization };
