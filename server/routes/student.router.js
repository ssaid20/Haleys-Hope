const express = require('express');
const router = express.Router();
const pool = require('../modules/pool'); // Adjust the path as needed

// GET route to fetch all students with all their information
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "students" WHERE "is_active" = TRUE';
  pool.query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error('Error in GET all students', err);
      res.sendStatus(500);
    });
});

// GET route to fetch a specific student by ID with all their details
router.get('/:id', (req, res) => {
  const studentId = req.params.id;
  const queryText = 'SELECT * FROM "students" WHERE "id" = $1 AND "is_active" = TRUE';
  pool.query(queryText, [studentId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send('Student not found');
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error('Error in GET specific student', err);
      res.sendStatus(500);
    });
});

// POST route to add a new student
router.post('/', (req, res) => {
  const newStudent = req.body;
  const queryText = `INSERT INTO "students" (
    "first_name", "last_name", "is_active", "grade", "gender", "dob", 
    "address", "zip_code", "county", "picture", "school", "on_site", 
    "pretest_passed", "pretest_date"
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;

  const values = [
    newStudent.first_name, newStudent.last_name, newStudent.is_active, newStudent.grade, newStudent.gender, 
    newStudent.dob, newStudent.address, newStudent.zip_code, newStudent.county, newStudent.picture, 
    newStudent.school, newStudent.on_site, newStudent.pretest_passed, newStudent.pretest_date
  ];

  pool.query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Error in POST new student', err);
      res.sendStatus(500);
    });
});

// PUT route to update a student's information
router.put('/:id', (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;
  const queryText = `UPDATE "students" SET
    "first_name" = $1, "last_name" = $2, "grade" = $3, "gender" = $4, "dob" = $5, 
    "address" = $6, "zip_code" = $7, "county" = $8, "school" = $9, "on_site" = $10, 
    "pretest_passed" = $11, "pretest_date" = $12 WHERE "id" = $13`;

  const values = [
    updatedStudent.first_name, updatedStudent.last_name, updatedStudent.grade, updatedStudent.gender, 
    updatedStudent.dob, updatedStudent.address, updatedStudent.zip_code, updatedStudent.county,
    updatedStudent.school, updatedStudent.on_site, updatedStudent.pretest_passed, updatedStudent.pretest_date,
    studentId
  ];

  pool.query(queryText, values)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error('Error in PUT update student', err);
      res.sendStatus(500);
    });
});

// DELETE (soft delete) route to archive a student
router.delete('/:id', (req, res) => {
  const studentId = req.params.id;
  const queryText = `UPDATE "students" SET "is_active" = FALSE WHERE "id" = $1`;

  pool.query(queryText, [studentId])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error('Error in DELETE (archive) student', err);
      res.sendStatus(500);
    });
});

module.exports = router;
