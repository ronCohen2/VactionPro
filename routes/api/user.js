const express = require("express");
const mysql = require("mysql2/promise");
var validator = require("validator");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

const router = express.Router();

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

// Get all users
router.get("/", [auth, admin], async (req, res) => {
  const [result] = await pool.execute("select * from users");
  if (result.length > 0) {
    res.send({ status: 200, user: result });
  }
});
// all vacations
router.get("/vacation", auth, async (req, res) => {
  const [result] = await pool.execute(`select * from vacation`);
  res.status(200).send({ status: 200, vacation: result });
});

// get vacation by id
router.get("/vacation/:id", auth, async (req, res) => {
  const id = req.params.id;
  const [result] = await pool.execute(
    `select * from vacation where unique_id =?`,
    [id]
  );
  res.status(200).send({ status: 200, details: result });
});

//Follow after vacation
router.post("/follow", auth, async (req, res) => {
  const userId = req.body.userId;
  const VacationId = req.body.vacationId;
  const idValid = validator.isUUID(userId, 4);
  const vacationValid = validator.isUUID(VacationId, 4);

  try {
    if (idValid && vacationValid) {
      const [
        result
      ] = await pool.execute(`insert into followVacation (vacation_id,user_id)
    values
    (('${req.body.vacationId}'),'${userId}')`);
      res.status(200).send(result);
    } else {
      res.status(404).send("Userid/vacationID is not valid");
    }
  } catch {
    res.status(404).send("error in follow");
  }
});

router.delete("/Unfollow", auth, async (req, res) => {
  const userId = req.body.userId;
  const VacationId = req.body.vacationId;
  const idValid = validator.isUUID(userId, 4);
  const vacationValid = validator.isUUID(VacationId, 4);
  try {
    if (idValid && vacationValid) {
      const [result] = await pool.execute(
        `delete from  followVacation where vacation_id='${
          req.body.vacationId
        }' and user_id="${userId}"`
      );
      res.status(200).send(result);
    } else {
      res.status(404).send("Userid/vacationID is not valid");
    }
  } catch {
    res.status(404).send("error in UNfollow");
  }
});

// Get all favorite vacation of user
router.get("/favorite/:id", async (req, res) => {
  const id = req.params.id;
  const [result] = await pool.execute(
    `
    select 
        vacation.title,
        vacation.location ,
        vacation.description,
        vacation.img ,
        vacation.depart_data ,
        vacation.return_data ,
        followVacation.vacation_id as unique_id,
        followVacation.user_id as user_id        
    FROM vacation
    INNER JOIN followVacation
    ON vacation.unique_id = followVacation.vacation_id  
    WHERE followVacation.user_id = "${id}";
      `
  );
  res.status(200).send(result);
});

module.exports = router;
