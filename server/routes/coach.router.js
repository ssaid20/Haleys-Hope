const express = require("express");
const router = express.Router();
const pool = require("../modules/pool"); // Adjust the path as needed

// GET route to fetch all coaches with all their information
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "coaches" WHERE "is_active" = TRUE';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all coaches", err);
      res.sendStatus(500);
    });
});

// GET route to fetch a specific coach by ID with all their details
// router.get("/:id", (req, res) => {
//   const coachId = req.params.id;
//   const queryText =
//     'SELECT * FROM "coaches" WHERE "id" = $1 AND "is_active" = TRUE';
//   pool
//     .query(queryText, [coachId])
//     .then((result) => {
//       if (result.rows.length === 0) {
//         res.status(404).send("Coach not found");
//       } else {
//         res.send(result.rows[0]);
//       }
//     })
//     .catch((err) => {
//       console.error("Error in GET specific coach", err);
//       res.sendStatus(500);
//     });
// });

// GET route to fetch all users who are archived/deactivated
router.get("/archivedCoaches", (req, res) => {
  const queryText = 'SELECT * FROM "coaches" WHERE "is_active" = false';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all coaches", err);
      res.sendStatus(500);
    });
});

// POST route to add a new coach
router.post("/", (req, res) => {
  const newCoach = req.body;
  const queryText = `INSERT INTO "coaches" (
    "first_name", "last_name"
  ) VALUES ($1, $2)`;

  const values = [newCoach.first_name, newCoach.last_name];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error in POST new coach", err);
      res.sendStatus(500);
    });
});

// PUT route to update a coach's information
router.put("/:id", (req, res) => {
  const coachId = req.params.id;

  const updatedCoach = req.body;

  const queryText = `UPDATE "coaches" SET
    "first_name" = $1, "last_name" = $2, "is_active" = $3 WHERE "id" = $4`;

  const values = [
    updatedCoach.first_name,
    updatedCoach.last_name,
    updatedCoach.is_active,
    coachId,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in PUT update coach", err);
      res.sendStatus(500);
    });
});

// DELETE (soft delete) route to archive a coach
router.delete("/:id", (req, res) => {
  const coachId = req.params.id;
  const queryText = `UPDATE "coaches" SET "is_active" = FALSE WHERE "id" = $1`;

  pool
    .query(queryText, [coachId])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in DELETE (archive) coach", err);
      res.sendStatus(500);
    });
});

module.exports = router;
