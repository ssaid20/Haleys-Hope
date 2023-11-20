const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dkpzxau0g', 
  api_key: '186839942639844', 
  api_secret: 'D0nFz2SMjJgdjlTcC5VGOmdvev0' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'student_pictures',
  allowedFormats: ['jpg', 'png'],
});
const parser = multer({ storage: storage });
// GET route to fetch all students with all their information
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "students" WHERE "is_active" = TRUE';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all students", err);
      res.sendStatus(500);
    });
});

// GET route to fetch a specific student by ID with all their details
router.get("/:id", (req, res) => {
  const studentId = req.params.id;
  const queryText =
    'SELECT * FROM "students" WHERE "id" = $1 AND "is_active" = TRUE';
  pool
    .query(queryText, [studentId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send("Student not found");
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch((err) => {
      // console.error("Error in GET specific student", err);
      //commented out for now,
      //this error shows up every time we move to student details page
      res.sendStatus(500);
    });
});

// POST route to add a new student
router.post("/", parser.single('picture'), (req, res) => {
  const newStudent = req.body;
  const pictureUrl = req.file ? req.file.path : null;
  const queryText = `
    INSERT INTO "students" (
      "first_name", "last_name", "grade", "gender", "dob", 
      "city", "picture", "school", "on_site", 
      "barton_c", "barton_c_date", "state", "start_date", "is_active"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 $14)
  `;

  const values = [
    newStudent.first_name,
    newStudent.last_name,
    newStudent.grade,
    newStudent.gender,
    newStudent.dob,
    newStudent.city,
    // newStudent.picture,
    pictureUrl,
    newStudent.school,
    newStudent.on_site,
    newStudent.barton_c,
    newStudent.barton_c_date,
    newStudent.state,
    newStudent.start_date,
    newStudent.is_active,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error in POST new student", err);
      res.sendStatus(500);
    });
});

// PUT route to update a student's information
router.put("/:id", parser.single('picture'), (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;
  const pictureUrl = req.file ? req.file.path : updatedStudent.picture;
  const queryText = `UPDATE "students" SET
    "first_name" = $1, "last_name" = $2, "grade" = $3, "gender" = $4, "dob" = $5, 
    "city" = $6, "school" = $7, "on_site" = $8, 
    "barton_c" = $9, "barton_c_date" = $10, "state" = $11, "start_date" = $12, "is_active" = $13, "coach_id" = $14 WHERE "id" = $15`;

  const values = [
    updatedStudent.first_name,
    updatedStudent.last_name,
    updatedStudent.grade,
    updatedStudent.gender,
    updatedStudent.dob,
    updatedStudent.city,
    pictureUrl,
    updatedStudent.school,
    updatedStudent.on_site,
    updatedStudent.barton_c,
    updatedStudent.barton_c_date,
    updatedStudent.state,
    updatedStudent.start_date,
    updatedStudent.is_active,
    updatedStudent.coach_id,
    studentId,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in PUT update student", err);
      res.sendStatus(500);
    });
});

// DELETE (soft delete) route to archive a student
router.delete("/:id", (req, res) => {
  const studentId = req.params.id;
  const queryText = `UPDATE "students" SET "is_active" = FALSE WHERE "id" = $1`;

  pool
    .query(queryText, [studentId])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in DELETE (archive) student", err);
      res.sendStatus(500);
    });
});

module.exports = router;
