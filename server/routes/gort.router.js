const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//Routes for GORT-5 test
                             //GET
router.get("/:studentId", async (req, res) => {
    try {
      const studentId = req.params.studentId; // TODO: may just be id from front end
  
      // Query to fetch all GORT-5 items for the given student ID
      const query = "SELECT * FROM gort WHERE student_id = $1";
      const { rows } = await pool.query(query, [studentId]);
  
      // Sending the response with the GORT items
      res.json(rows);
    } catch (error) {
      console.error("Error fetching GORT items:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  module.exports = router;


                              // POST
router.post("/:studentId", async (req, res) => {
    try{
        const studentId = req.params.studentId; // TODO: may just be id from front end
        const query = ""
    }
})