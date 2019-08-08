module.exports = function(req, res, next) {
  if (req.user.admin == "false")
    return res.status(403).send({ status: 403, err: "Access denied." });

  next();
};
