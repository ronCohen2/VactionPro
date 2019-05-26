const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("usetr");
});
module.exports = router;
