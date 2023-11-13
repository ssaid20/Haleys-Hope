const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Routes for KTEA test

//TODO reject unauth
// GET route to fetch all KTEA items for a specific student
router.get("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Query to fetch all KTEA items for the given student ID
    const query = "SELECT * FROM ktea WHERE student_id = $1";
    const { rows } = await pool.query(query, [studentId]);

    // Sending the response with the KTEA items
    res.json(rows);
  } catch (error) {
    console.error("Error fetching KTEA items:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
