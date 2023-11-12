const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET route to fetch younger ctopp tests for a specific student
router.get("/:student_id", (req, res) => {
  const studentId = req.params.student_id;
  const queryText = 'SELECT * FROM "younger_ctopp" WHERE "student_id" = $1';

  pool
    .query(queryText, [studentId])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error completing SELECT younger_ctopp query", err);
      res.sendStatus(500);
    });
});

// POST route to add a new record for a specific student   

module.exports = router;
