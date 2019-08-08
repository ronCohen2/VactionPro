const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
  const token = req.header("x-token");
  if (!token)
    return res.status(403).send({ status: 403, err: "NO token ptovided." });
  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
    console.log("token ");
  } catch {
    res.status(400).send({ status: 403, err: "Invalid token" });
  }
};
