const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send({ errors: "Access denied" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Invalid token" });
  }
};

module.exports = fetchUser;
