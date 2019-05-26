const express = require("express");
const router = express.Router();
const userRouter = require("./api/user");
const adminRouter = require("./api/admin");
const authRouter = require("./api/auth");
const reportsRouter = require("./api/reports");

router.get("/", (req, res) => {
  res.send("this is api page ");
});

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/reports", reportsRouter);

module.exports = router;
