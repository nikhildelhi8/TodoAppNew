// middleware/userAuth.js

const jwt = require("jsonwebtoken");
const { jwt_password } = require("../controllers/userController");

const userAuth = (req, res, next) => {
  const tokenPayload = req.headers.authorization;
  console.log(tokenPayload);

  if (!tokenPayload || !tokenPayload.startsWith("Bearer ")) {
    return res
      .status(401)
      .send("no token is provided or Bearer is missing before token");
  }

  const token = tokenPayload.split(" ")[1];

  console.log(token);

  try {
    const tokenVerify = jwt.verify(token, jwt_password);
    console.log(tokenVerify);
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send("token is invalid");
  }
};

module.exports = { userAuth };
