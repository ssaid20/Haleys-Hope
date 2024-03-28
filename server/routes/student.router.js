const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// cloudinary.config({
//   cloud_name: "dkpzxau0g",
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "student_pictures",
  allowedFormats: ["jpg", "png"],
});

const parser = multer({ storage: storage });

router.get("/cloudinary-config", (req, res) => {
  res.json({
    cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
    uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  });
});

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

// GET route to fetch all  archived students with all their information
router.get("/archived-students", rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM "students" WHERE "is_active" = FALSE';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all archived students", err);
      res.sendStatus(500);
    });
});

// GET route to fetch a specific student by ID with all their details
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.id;
  const queryText = 'SELECT * FROM "students" WHERE "id" = $1';
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
// GET route to fetch a specific archived student by ID with all their details
router.get("/archived-student/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.id;
  const queryText = 'SELECT * FROM "students" WHERE "id" = $1 AND "is_active" = FALSE';
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
router.post("/", parser.single("picture"), rejectUnauthenticated, (req, res) => {
  const newStudent = req.body;
  const pictureUrl = req.file ? req.file.path : null;

  const queryText = `
    INSERT INTO "students" (
      "first_name", "last_name", "grade", "intake_grade", "gender", "dob", 
      "city", "picture", "school", "on_site", 
      "barton_c", "barton_c_date", "state", "start_date", "is_active", "coach_id"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
  `;

  const values = [
    newStudent.first_name,
    newStudent.last_name,
    newStudent.grade,
    newStudent.intake_grade,
    newStudent.gender,
    newStudent.dob,
    newStudent.city,
    newStudent.picture,
    // pictureUrl,
    newStudent.school,
    newStudent.on_site,
    newStudent.barton_c,
    newStudent.barton_c_date === "" ? null : newStudent.barton_c_date,
    newStudent.state,
    newStudent.start_date,
    newStudent.is_active,
    newStudent.coach_id,
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
router.put("/:id", parser.single("picture"), rejectUnauthenticated, (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;

  const pictureUrl = req.file ? req.file.path : updatedStudent.picture;
  const queryText = `UPDATE "students" SET
    "first_name" = $1, "last_name" = $2, "grade" = $3, "intake_grade" = $4, "gender" = $5, "dob" = $6, 
    "city" = $7, "school" = $8, "on_site" = $9, 
    "barton_c" = $10, "barton_c_date" = $11, "state" = $12, "start_date" = $13, "is_active" = $14, "coach_id" = $15 WHERE "id" = $16`;

  const values = [
    updatedStudent.first_name,
    updatedStudent.last_name,
    updatedStudent.grade,
    updatedStudent.intake_grade,
    updatedStudent.gender,
    updatedStudent.dob,
    updatedStudent.city,
    // updatedStudent.picture,
    // pictureUrl,
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
router.delete("/:id", rejectUnauthenticated, (req, res) => {
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

//routes for uploading pictures to cloudinary
router.get("/picture/:id", (req, res) => {
  const studentId = req.params.id;
  const queryText = 'SELECT picture FROM "students" WHERE id=$1;';
  pool
    .query(queryText, [studentId])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Error in getting Student Picture", err);
      res.sendStatus(500);
    });
});

router.post("/picture/:id", (req, res) => {
  const { pictureUrl } = req.body;
  const studentId = req.params.id; // Ensure that the URL contains the student ID
  console.log("Student ID:", studentId); // Check the type and value
  console.log("Picture URL:", pictureUrl);

  if (!pictureUrl || !studentId) {
    return res.status(400).send("Missing picture URL or student ID");
  }

  const queryText = 'UPDATE "students" SET picture=$1 WHERE id=$2;';
  pool
    .query(queryText, [pictureUrl, parseInt(studentId, 10)])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Error in adding Student Picture", err);
      res.status(500).send(err.message);
    });
});

router.delete("/picture/:id", (req, res) => {
  const studentId = req.params.id;
  const queryText = 'UPDATE "students" SET picture=NULL WHERE id=$1;';
  pool
    .query(queryText, [studentId])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error in deleting Student Picture", err);
      res.sendStatus(500);
    });
});

module.exports = router;
