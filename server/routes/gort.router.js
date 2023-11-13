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
        const { date,
            examiner_id,
            sum_scaled_score,
            oral_reading_percentile_rank,
            oral_reading_index,
            rate_raw_total,
            accuracy_raw_total,
            fluency_raw_total,
            comprehension_raw_total,
            rate_percentile_rank,
            accuracy_percentile_rank,
            fluency_percentile_rank,
            comprehension_percentile_rank,
            rate_scaled_score,
            accuracy_scaled_score,
            fluency_scaled_score,
            comprehension_scaled_score
        } = req.body;
        const query = ` INSERT INTO gort (
            student_id, date, examiner_id, sum_scaled_score, oral_reading_percentile_rank, 
            oral_reading_index, rate_raw_total, accuracy_raw_total, fluency_raw_total, 
            comprehension_raw_total, rate_percentile_rank, accuracy_percentile_rank, 
            fluency_percentile_rank, comprehension_percentile_rank, rate_scaled_score, 
            accuracy_scaled_score, fluency_scaled_score, comprehension_scaled_score
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
        );`;
        const values = [
            studentId, date, examiner_id, sum_scaled_score, oral_reading_percentile_rank, 
            oral_reading_index, rate_raw_total, accuracy_raw_total, fluency_raw_total, 
            comprehension_raw_total, rate_percentile_rank, accuracy_percentile_rank, 
            fluency_percentile_rank, comprehension_percentile_rank, rate_scaled_score, 
            accuracy_scaled_score, fluency_scaled_score, comprehension_scaled_score
        ];
        await pool.query(query, values);

        res.status(201).send("GORT record added successfully");
    } catch (error) {
        console.error("Error adding GORT record:", error);
        res.status(500).send("Internal Server Error");
    }
});
