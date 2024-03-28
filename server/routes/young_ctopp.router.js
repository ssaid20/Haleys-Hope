const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// GET route to fetch younger ctopp tests for a specific student
router.get("/:student_id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id;
  const queryText = 'SELECT * FROM "younger_ctopp" WHERE "student_id" = $1 ORDER BY date ASC';

  pool
    .query(queryText, [studentId])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error completing SELECT younger_ctopp query", err);
      res.sendStatus(500);
    });
});

//router to get a specific test
router.get("/youngerCtoppResults/:testId", rejectUnauthenticated, (req, res) => {
  const testId = req.params.testId;
  const queryText = 'SELECT * FROM "younger_ctopp" WHERE "id" = $1 ORDER BY date ASC';
  pool
    .query(queryText, [testId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error completing SELECT younger_ctopp query for test id", err);
      res.sendStatus(500);
    });
});

// POST route to add a new record for a specific student
router.post("/", rejectUnauthenticated, (req, res) => {
  //const newYCtopp = req.body.id;
  const newYCtopp = req.body;
  // Check if student_id is provided
  if (!newYCtopp.student_id) {
    return res.status(400).send("Student ID is required");
  }
  const queryText = `INSERT INTO "younger_ctopp" (
        "student_id", "date", "examiner_id", 
        "elison_scaled_score", "blending_words_scaled_score", "sound_matching_scaled_score", 
        "memory_for_digits_scaled_score", "nonword_repetition_scaled_score", 
        "rapid_digit_naming_scaled_score", "rapid_letter_naming_scaled_score", 
        "rapid_color_naming_scaled_score", "rapid_object_naming", 
        "blending_nonwords_scaled_score", "phonological_awareness_composite", 
        "phonological_memory_composite", "rapid_symbolic_naming_composite", "rapid_non_symbolic_naming_composite",
        "phonological_awareness_percentile", 
        "phonological_memory_percentile", "rapid_symbolic_naming_percentile", "rapid_non_symbolic_naming_percentile", "grade", "phonological_awareness_descriptor", "phonological_memory_descriptor", "rapid_symbolic_naming_descriptor", "rapid_non_symbolic_naming_descriptor"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)`;

  const values = [
    newYCtopp.student_id,
    newYCtopp.date,
    newYCtopp.examiner_id,
    newYCtopp.elison_scaled_score,
    newYCtopp.blending_words_scaled_score,
    newYCtopp.sound_matching_scaled_score,
    newYCtopp.memory_for_digits_scaled_score,
    newYCtopp.nonword_repetition_scaled_score,
    newYCtopp.rapid_digit_naming_scaled_score,
    newYCtopp.rapid_letter_naming_scaled_score,
    newYCtopp.rapid_color_naming_scaled_score,
    newYCtopp.rapid_object_naming,
    newYCtopp.blending_nonwords_scaled_score,
    newYCtopp.phonological_awareness_composite,
    newYCtopp.phonological_memory_composite,
    newYCtopp.rapid_symbolic_naming_composite,
    newYCtopp.rapid_non_symbolic_naming_composite,
    newYCtopp.phonological_awareness_percentile,
    newYCtopp.phonological_memory_percentile,
    newYCtopp.rapid_symbolic_naming_percentile,
    newYCtopp.rapid_non_symbolic_naming_percentile,
    newYCtopp.grade,
    newYCtopp.phonological_awareness_descriptor,
    newYCtopp.phonological_memory_descriptor,
    newYCtopp.rapid_symbolic_naming_descriptor,
    newYCtopp.rapid_non_symbolic_naming_descriptor,
  ];
  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error completing INSERT younger_ctopp query", err);
      res.sendStatus(500);
    });
});

// UPDATE route to modify a specific record for a given student
router.put("/:student_id/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id;
  const recordId = req.params.id;
  const updatedYCtopp = req.body;

  // Initialize an array to hold the update fields and values
  let updateFields = [];
  let values = [studentId, recordId];
  let valueCount = 3; // Start counting from 3 because $1 and $2 are already used

  // Constructing the query dynamically based on the fields provided in the body
  for (let key in updatedYCtopp) {
    if (updatedYCtopp.hasOwnProperty(key) && key !== "student_id" && key !== "id") {
      updateFields.push(`"${key}" = $${valueCount}`);
      values.push(updatedYCtopp[key]);
      valueCount++;
    }
  }

  if (updateFields.length === 0) {
    return res.status(400).send("No update fields provided");
  }

  const queryText = `UPDATE "younger_ctopp" SET ${updateFields.join(
    ", "
  )} WHERE "student_id" = $1 AND "id" = $2`;

  pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error completing UPDATE younger_ctopp query", err);
      res.sendStatus(500);
    });
}); // end router.put

// DELETE route to remove a specific record for a given student
router.delete("/:student_id/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id; //Unique identifier for specific student
  const recordId = req.params.id; // This is the unique identifier for the specific test

  const queryText = 'DELETE FROM "younger_ctopp" WHERE "student_id" = $1 AND "id" = $2';
  pool
    .query(queryText, [studentId, recordId])
    .then(() => {
      res.sendStatus(204);
    }) // 204 No Content
    .catch((err) => {
      console.error("Error completing DELETE younger_ctopp", err);
      res.sendStatus(500);
    });
}); // end router.delete

module.exports = router;
