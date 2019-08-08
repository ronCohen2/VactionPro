const express = require("express");
const mysql = require("mysql2/promise");
const uuidv4 = require("uuid/v4");
var expressValidator = require("express-validator");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

const router = express.Router();
router.use(expressValidator());

let pool;
(async function initializePool() {
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

//Get all vacation
router.get("/vacation", [auth, admin], async (req, res) => {
  try {
    const [result, fields] = await pool.execute(`select * from vacation`);
    res.status(200).send({ status: 200, vacation: result });
  } catch {
    res.status(404).send({ msg: "error in get vacation" });
  }
});

// Get vacation by id
router.get("/vacation/:id", [auth, admin], async (req, res) => {
  const id = req.params.id;
  const [result, fields] = await pool.execute(
    `select * from vacation where unique_id =?`,
    [id]
  );
  res.status(200).send(result);
});

//Add vacation
router.post("/vacation", [auth, admin], async (req, res) => {
  const body = req.body;
  const vacationId = uuidv4();
  //Validation user input
  req.checkBody("title", "name field cannot be empty.").notEmpty();
  req;
  req.checkBody("return", "return field cannot be empty.").notEmpty();
  req.checkBody("depart", "depart field cannot be empty.").notEmpty();
  req.checkBody("img", " image must be url ").isURL();
  req.checkBody("location", "location field cannot be empty.").notEmpty();
  req
    .checkBody("location", " location must be between 2-20 characters long.")
    .len(2, 20);
  req.checkBody("Description", "Description field cannot be empty.").notEmpty();
  req
    .checkBody(
      "Description",
      " Description must be between 1-200 characters long."
    )
    .len(1, 200);
  var errors = req.validationErrors();

  if (!errors) {
    const [result] = await pool.execute(
      `insert into vacation
      (title,location,description,img,depart_data,return_data,unique_id)
      values
          ('${body.title}','${body.location}','${body.Description}','${
        body.img
      }','${body.depart}','${body.return}','${vacationId}')`
    );
    res.status(200);
    res.json({
      status: 200,
      unique_id: vacationId,
      title: body.title,
      location: body.location,
      description: body.Description,
      image: body.img,
      depart: body.depart,
      return: body.return
    });
  } else {
    res.status(404).json({ status: 404, errors });
  }
});

//delete vacation
router.delete("/vacation/:id", [auth, admin], async (req, res) => {
  const id = req.params.id;
  const [result] = await pool.execute(
    `DELETE FROM vacation WHERE unique_id = ?`,
    [id]
  );
  try {
    res.status(200).send({ msg: "Vacation deleted ! " });
  } catch {
    res.status(404).send({ msg: "Error in delte vacation" });
  }
});

//Update vacation
router.put("/vacation/:id", [auth, admin], async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  //Validate user input
  req
    .checkBody("title", "title must be between 2-20 characters long.")
    .notEmpty()
    .len(2, 20);
  req;
  req.checkBody("return_data", "return field cannot be empty.").notEmpty();
  req.checkBody("depart_data", "depart field cannot be empty.").notEmpty();
  req.checkBody("img", " image must be url ").isURL();
  req.checkBody("location", "location field cannot be empty.").notEmpty();
  req
    .checkBody("location", " location must be between 3-20 characters long.")
    .len(3, 20);
  req.checkBody("description", "Description field cannot be empty.").notEmpty();
  req
    .checkBody(
      "description",
      " Description must be between 3-200 characters long."
    )
    .len(3, 200);

  var EditErrors = req.validationErrors();
  if (EditErrors) {
    res.status(404).json({ status: 404, EditErrors: EditErrors });
  } else {
    const [result] = await pool.execute(
      `UPDATE vacation set
       title="${body.title}",
        location ="${body.location}",
        description="${body.description}",
        img="${body.img}",
        depart_data ="${body.depart_data}",
        return_data="${body.return_data}"
        where unique_id = "${body.unique_id}"`
    );
    res.status(202).json({ status: 200 });
  }
});

router.get("/favoriteSummary", [auth, admin], async (req, res) => {
  try {
    const [result] = await pool.execute(`
    select 
      vacation.title,
      count(followVacation.vacation_id)
      from 
      followVacation
      INNER JOIN vacation
      ON vacation.unique_id = followVacation.vacation_id 
      group by vacation_id
      having count(vacation_id)>0
    `);
    res.status(200).send(result);
  } catch {
    res.status(404).send({ msg: "error in get data " });
  }
});

router.get("/followers", [auth, admin], async (req, res) => {
  const [
    result,
    fields
  ] = await pool.execute(`SELECT COUNT(*) as count FROM followVacation;
  `);
  res.status(200).send(result);
});
module.exports = router;
