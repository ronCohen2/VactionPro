const express = require("express");
const mysql = require("mysql2/promise");
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
var expressValidator = require("express-validator");

const router = express.Router();
router.use(expressValidator());

let pool;
(async function initelizePool() {
  pool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "209597554",
    database: "DataB",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();

// User login
router.post("/login", async (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  //Check if user exists
  const [result] = await pool.execute(
    `select * from users where user_name = ?`,
    [username]
  );
  // Not exists
  if (result.length < 1) {
    res.status(404).json({ status: 404, err: "Wrong Password Or User" });
  }
  // exists
  if (result) {
    const hase = result[0].password.toString();
    bcrypt.compare(password, hase, (err, respone) => {
      if (respone == true) {
        //Create token
        const token = jwt.sign(
          {
            _id: this._id,
            admin: result[0].admin
          },
          "jwtPrivateKey"
        );
        res.status(200);
        res.send({
          status: 200,
          username: username,
          user_id: result[0].unique_id,
          admin: result[0].admin,
          token
        });
      } else {
        res.status(404).json({ status: 404, err: "Wrong Password Or User" });
      }
    });
  }
});

// Add new user
router.post("/Register", async (req, res, next) => {
  const body = req.body;
  const name = body.name;
  const last_name = body.lastname;
  const user_name = body.username;
  const password = body.password;
  const uuid_user = uuidv4();

  // first name validation
  req.checkBody("name", " fisrt name  faild cannot be empty ").notEmpty();
  req
    .checkBody("name", " name ust be between 5-20 characters long.")
    .len(2, 20);
  //last name validation
  req.checkBody("lastname", " last name field cannot be empty.").notEmpty();
  req
    .checkBody("lastname", " lastname ust be between 5-20 characters long.")
    .len(2, 20);
  //user name validation
  req.checkBody("username", "user name  field cannot be empty.").notEmpty();
  req
    .checkBody("username", "user_name must be between 6-15 characters long.")
    .len(6, 15);
  //password validation
  req.checkBody("password", "pasword field cannot be empty.").notEmpty();
  req
    .checkBody("password", "password must be between 6-15 characters long.")
    .len(6, 15);
  req
    .checkBody("passwordMatch", "Passwords do not match, please try again.")
    .equals(req.body.password);

  //Check if user is exist
  const [userName] = await pool.execute(
    `select * from users where user_name = ?`,
    [user_name]
  );

  const errors = req.validationErrors();
  if (errors) {
    //send error
    res.status(404).json({ status: 404, errors });
  } else {
    if (userName.length == 0) {
      // no error and user is not exist
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const [result] = await pool.execute(
          `
            insert into users(first_name,last_name,user_name,password,admin,unique_id)
            value('${name}','${last_name}','${user_name}','${hash}' ,"false",'${uuid_user}');
                `
        );
        const token = jwt.sign(
          {
            _id: this._id
          },
          "jwtPrivateKey"
        );
        res.status(200);
        res.json({
          status: 200,
          username: user_name,
          user_id: uuid_user,
          token
        });
      });
    } else {
      res
        .status(404)
        .json({ status: 404, errors: [{ msg: "User is already exist" }] });
    }
  }
});

module.exports = router;
