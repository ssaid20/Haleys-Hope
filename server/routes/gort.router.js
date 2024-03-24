const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

//Routes for GORT-5 test
//GORT GET ROUTE
router.get("/:studentId", rejectUnauthenticated, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Query to fetch all GORT-5 items for the given student ID
    const query = "SELECT * FROM gort WHERE student_id = $1 ORDER BY date ASC";
    const { rows } = await pool.query(query, [studentId]);

    // Sending the response with the GORT items
    res.json(rows);
  } catch (error) {
    console.error("Error fetching GORT items:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;

//router to get a specific test for gort
router.get("/gortResults/:testId", rejectUnauthenticated, (req, res) => {
  const testId = req.params.testId;
  const queryText = 'SELECT * FROM "gort" WHERE "id" = $1 ORDER BY date ASC';
  pool
    .query(queryText, [testId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error completing SELECT GORT query for test id", err);
      res.sendStatus(500);
    });
});

// GORT POST ROUTE
router.post("/", rejectUnauthenticated, async (req, res) => {
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
      grade,
      ori_descriptor,
    } = req.body;
    const query = ` INSERT INTO gort (
            student_id, date, examiner_id, sum_scaled_score, oral_reading_percentile_rank, 
            oral_reading_index, rate_raw_total, accuracy_raw_total, fluency_raw_total, 
            comprehension_raw_total, rate_percentile_rank, accuracy_percentile_rank, 
            fluency_percentile_rank, comprehension_percentile_rank, rate_scaled_score, 
            accuracy_scaled_score, fluency_scaled_score, comprehension_scaled_score, grade, ori_descriptor
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
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
      grade,
      ori_descriptor,
    ];
    await pool.query(query, values);

    res.status(201).send("GORT record added successfully");
  } catch (error) {
    console.error("Error adding GORT record:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GORT PUT ROUTE
router.put("/:student_id/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id;
  const testId = req.params.id;
  const updatedGort = req.body;

  // // Constructing the query dynamically based on the fields provided in the body
  // let querySet = [];
  // for (let key in updatedGort) {
  //   if (updatedGort.hasOwnProperty(key) && key !== "student_id" && key !== "id") {
  //     querySet.push(`"${key}" = '${updatedGort[key]}'`);
  //   }
  // }
  // if (querySet.length === 0) {
  //   return res.status(400).send("No update fields provided");
  // }

  // Initialize an array to hold the update fields and values
  let updateFields = [];
  let values = [studentId, testId];
  let valueCount = 3; // Start counting from 3 because $1 and $2 are already used

  // Constructing the query dynamically based on the fields provided in the body
  for (let key in updatedGort) {
    if (updatedGort.hasOwnProperty(key) && key !== "student_id" && key !== "id") {
      updateFields.push(`"${key}" = $${valueCount}`);
      values.push(updatedGort[key]);
      valueCount++;
    }
  }

  if (updateFields.length === 0) {
    return res.status(400).send("No update fields provided");
  }

  const queryText = `UPDATE "gort" SET ${updateFields.join(", ")} WHERE "student_id" = $1 AND "id" = $2`;

  pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error completing UPDATE gort query", err);
      res.sendStatus(500);
    });
}); // end router.put
// router.put("/:studentId/:id", async (req, res) => {
//   try {
//     const studentId = req.params.studentId;
//     const {
//       date,
//       examiner_id,
//       sum_scaled_score,
//       oral_reading_percentile_rank,
//       oral_reading_index,
//       rate_raw_total,
//       accuracy_raw_total,
//       fluency_raw_total,
//       comprehension_raw_total,
//       rate_percentile_rank,
//       accuracy_percentile_rank,
//       fluency_percentile_rank,
//       comprehension_percentile_rank,
//       rate_scaled_score,
//       accuracy_scaled_score,
//       fluency_scaled_score,
//       comprehension_scaled_score,
//     } = req.body;

//     const query = `
//             UPDATE gort SET
//                 date = $2,
//                 examiner_id = $3,
//                 sum_scaled_score = $4,
//                 oral_reading_percentile_rank = $5,
//                 oral_reading_index = $6,
//                 rate_raw_total = $7,
//                 accuracy_raw_total = $8,
//                 fluency_raw_total = $9,
//                 comprehension_raw_total = $10,
//                 rate_percentile_rank = $11,
//                 accuracy_percentile_rank = $12,
//                 fluency_percentile_rank = $13,
//                 comprehension_percentile_rank = $14,
//                 rate_scaled_score = $15,
//                 accuracy_scaled_score = $16,
//                 fluency_scaled_score = $17,
//                 comprehension_scaled_score = $18
//             WHERE student_id = $1`;

//     const values = [
//       studentId,
//       date,
//       examiner_id,
//       sum_scaled_score,
//       oral_reading_percentile_rank,
//       oral_reading_index,
//       rate_raw_total,
//       accuracy_raw_total,
//       fluency_raw_total,
//       comprehension_raw_total,
//       rate_percentile_rank,
//       accuracy_percentile_rank,
//       fluency_percentile_rank,
//       comprehension_percentile_rank,
//       rate_scaled_score,
//       accuracy_scaled_score,
//       fluency_scaled_score,
//       comprehension_scaled_score,
//     ];

//     await pool.query(query, values);

//     res.status(200).send("GORT record updated successfully");
//   } catch (error) {
//     console.error("Error updating GORT record:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// DELETE route to remove a specific record for a given student
router.delete("/:student_id/:id", rejectUnauthenticated, (req, res) => {
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
