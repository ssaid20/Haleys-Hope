const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//Routes for GORT-5 test
//GORT GET ROUTE
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

// GORT POST ROUTE
router.post("/", async (req, res) => {
  try {
    const {
      date,
      student_id,
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
      comprehension_scaled_score,
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
      student_id,
      date,
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
      comprehension_scaled_score,
    ];
    await pool.query(query, values);

    res.status(201).send("GORT record added successfully");
  } catch (error) {
    console.error("Error adding GORT record:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GORT PUT ROUTE
router.put("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const {
      date,
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
      comprehension_scaled_score,
    } = req.body;

    const query = `
            UPDATE gort SET
                date = $2,
                examiner_id = $3,
                sum_scaled_score = $4,
                oral_reading_percentile_rank = $5,
                oral_reading_index = $6,
                rate_raw_total = $7,
                accuracy_raw_total = $8,
                fluency_raw_total = $9,
                comprehension_raw_total = $10,
                rate_percentile_rank = $11,
                accuracy_percentile_rank = $12,
                fluency_percentile_rank = $13,
                comprehension_percentile_rank = $14,
                rate_scaled_score = $15,
                accuracy_scaled_score = $16,
                fluency_scaled_score = $17,
                comprehension_scaled_score = $18
            WHERE student_id = $1`;

    const values = [
      studentId,
      date,
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
      comprehension_scaled_score,
    ];

    await pool.query(query, values);

    res.status(200).send("GORT record updated successfully");
  } catch (error) {
    console.error("Error updating GORT record:", error);
    res.status(500).send("Internal Server Error");
  }
});
// DELETE route to remove a specific record for a given student
router.delete("/:student_id/:id", (req, res) => {
  const studentId = req.params.student_id; // Identifier for the specific student
  const recordId = req.params.id; // This is the unique identifier for the specific test

  const queryText = 'DELETE FROM "gort" WHERE "student_id" = $1 AND "id" = $2';
  pool
    .query(queryText, [studentId, recordId])
    .then(() => {
      res.sendStatus(204);
    }) // 204 No Content
    .catch((err) => {
      console.error("Error completing DELETE Gort query", err);
      res.sendStatus(500);
    });
}); // end router.delete

module.exports = router;
