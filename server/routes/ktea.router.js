const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Routes for KTEA test

// GET route to grab KTEA test data
router.get("/", rejectUnauthenticated, (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not Authenticated" });
    return;
  }
  //need to get the student id somehow
  //const studentId = req.

  //grab all ktea tests for this student
  //need to walk the databases and join to get the student specific data
  // const queryText = `SELECT * FROM ktea WHERE student_id = $1 ORDER BY date DESC;`;

  pool.query(queryText, [studentId], (error, results) => {
    if (error) {
      console.error("Error fetching ktea tests for this student", error);
      res.status(500).json({ error: "Database error in ktea get" });
    } else {
      res.json(results.rows);
    }
  });
}); //end router.get
