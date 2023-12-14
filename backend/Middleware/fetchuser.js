var jwt = require("jsonwebtoken");
const JWT_SECRET = "Tanujisnotsogoodboy";

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add id to req object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET); // taking out data from token
    req.user = data.user;
    next();
  } catch (error) {
    // if token is not valid
    res.send(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
