const express = require("express");
const router = express.Router();
const userRouter = require("./api/user");
const adminRouter = require("./api/admin");
const authRouter = require("./api/auth");
// const auth = require("../../middleware/auth");

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/auth", authRouter);

router.get("/", (req, res) => {
  res.send({ msg: "Welcome to Vac-api ! " });
});

module.exports = router;
