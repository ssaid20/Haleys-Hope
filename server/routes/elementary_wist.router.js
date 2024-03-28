const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// GET route to fetch elementary wist tests for a specific student
router.get("/:student_id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id;
  const queryText = 'SELECT * FROM "elementary_wist" WHERE "student_id" = $1 ORDER BY date ASC';
  pool
    .query(queryText, [studentId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error completing SELECT elementary_wist query for student_id", err);
      res.sendStatus(500);
    });
});

//router to get a specific test
router.get("/elementaryWistResults/:testId", rejectUnauthenticated, (req, res) => {
  const testId = req.params.testId;
  const queryText = 'SELECT * FROM "elementary_wist" WHERE "id" = $1 ORDER BY date ASC' ;
  pool
    .query(queryText, [testId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error completing SELECT elementary_wist query for test id", err);
      res.sendStatus(500);
    });
});

// POST route to add a new record for a specific student
//tested and working with Postman
router.post("/", rejectUnauthenticated, (req, res) => {
  const newWist = req.body;

  // Check if student_id is provided
  if (!newWist.student_id) {
    return res.status(400).send("Student ID is required");
  }

  const queryText = `INSERT INTO "elementary_wist" (
        "student_id", 
        "date", 
        "examiner_id", 
        "read_regular_words", 
        "read_irregular_words", 
        "word_identification", 
        "word_identification_percentile", 
        "word_identification_standard_score", 
        "spell_regular_words", 
        "spell_irregular_words", 
        "spelling", 
        "spelling_percentile", 
        "spelling_standard_score", 
        "fundamental_literacy", 
        "fundamental_literacy_percentile", 
        "fundamental_literacy_standard_score", 
        "pseudo_words", 
        "letter_sounds", 
        "sound_symbol_knowledge", 
        "sound_symbol_knowledge_percentile", 
        "sound_symbol_knowledge_standard_score",
        "grade",
        "read_regular_words_descriptor",
        "read_irregular_words_descriptor",
        "spell_regular_words_descriptor",
        "spell_irregular_words_descriptor",
        "pseudo_words_descriptor",
        "letter_sounds_descriptor"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)`;

  const values = [
    newWist.student_id,
    newWist.date,
    newWist.examiner_id,
    newWist.read_regular_words,
    newWist.read_irregular_words,
    newWist.word_identification,
    newWist.word_identification_percentile,
    newWist.word_identification_standard_score,
    newWist.spell_regular_words,
    newWist.spell_irregular_words,
    newWist.spelling,
    newWist.spelling_percentile,
    newWist.spelling_standard_score,
    newWist.fundamental_literacy,
    newWist.fundamental_literacy_percentile,
    newWist.fundamental_literacy_standard_score,
    newWist.pseudo_words,
    newWist.letter_sounds,
    newWist.sound_symbol_knowledge,
    newWist.sound_symbol_knowledge_percentile,
    newWist.sound_symbol_knowledge_standard_score,
    newWist.grade,
    newWist.read_regular_words_descriptor,
    newWist.read_irregular_words_descriptor,
    newWist.spell_regular_words_descriptor,
    newWist.spell_irregular_words_descriptor,
    newWist.pseudo_words_descriptor,
    newWist.letter_sounds_descriptor,
  ];
  pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error("Error completing INSERT elementary_wist query", err);
      res.sendStatus(500);
    });
}); // end router.post

// UPDATE route to modify a specific record for a given student
// tested and working with postman
router.put("/:student_id/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id;
  const recordId = req.params.id;
  const updatedWist = req.body;

  // Initialize an array to hold the update fields and values
  let updateFields = [];
  let values = [studentId, recordId];
  let valueCount = 3; // Start counting from 3 because $1 and $2 are already used

  // Constructing the query dynamically based on the fields provided in the body
  for (let key in updatedWist) {
    if (updatedWist.hasOwnProperty(key) && key !== "student_id" && key !== "id") {
      updateFields.push(`"${key}" = $${valueCount}`);
      values.push(updatedWist[key]);
      valueCount++;
    }
  }

  if (updateFields.length === 0) {
    return res.status(400).send("No update fields provided");
  }

  const queryText = `UPDATE "elementary_wist" SET ${updateFields.join(
    ", "
  )} WHERE "student_id" = $1 AND "id" = $2`;

  pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error completing UPDATE elementary_wist query", err);
      res.sendStatus(500);
    });
}); // end router.put

// DELETE route to remove a specific record for a given student
// Tested and working in Postman
router.delete("/:student_id/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id; //Unique identifier for specific student
  const recordId = req.params.id; // This is the unique identifier for the specific test

  const queryText = 'DELETE FROM "elementary_wist" WHERE "student_id" = $1 AND "id" = $2';
  pool
    .query(queryText, [studentId, recordId])
    .then(() => {
      res.sendStatus(204);
    }) // 204 No Content
    .catch((err) => {
      console.error("Error completing DELETE elementary_wist query", err);
      res.sendStatus(500);
    });
}); // end router.delete

module.exports = router;
