const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET route to fetch all comments
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM "student_comments ORDER BY "date" DESC"';
  //const queryText = 'SELECT id, student_id, comments, name, date FROM "student_comments"';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all comments", err);
      res.sendStatus(500);
    });
});

// GET route to fetch a specific comment by studentId
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.id;
  console.log("reqqq.paarraaaammmas", req.params);
  const queryText = 'SELECT * FROM "student_comments" WHERE "student_id" = $1';
  pool
    .query(queryText, [studentId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send("No comments found for this student");
      } else {
        res.send(result.rows);
      }
    })
    .catch((err) => {
      console.error("Error in GET specific comment", err);
      res.sendStatus(500);
    });
});

// POST route to add a new comment
router.post("/", rejectUnauthenticated, (req, res) => {
  const newComment = req.body;
  const queryText = `
    INSERT INTO "student_comments" ("student_id", "comments", "name", "date") 
    VALUES ($1, $2, $3, $4)
  `;
  const values = [
    newComment.student_id,
    newComment.comments,
    newComment.name,
    newComment.date,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error in POST new comment", err);
      res.sendStatus(500);
    });
});

// PUT route to update a comment's information
router.put("/:studentId/:commentId", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.studentId;
  const commentId = req.params.commentId;
  console.log("req.params", req.params);
  const updatedComment = req.body;
  console.log("commentId:", commentId);
  console.log("studentId:", studentId);
  console.log("updated comment req.body:", req.body);

  const queryText = `
      UPDATE "student_comments" SET "comments" = $1, "name" = $2, "date" = $3
      WHERE "id" = $4 AND "student_id" = $5
    `;
  const values = [
    updatedComment.comments,
    updatedComment.name,
    updatedComment.date,
    commentId,
    studentId,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in PUT update comment", err);
      res.sendStatus(500);
    });
});

// DELETE route to remove a comment
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const commentId = req.params.id;
  const queryText = `DELETE FROM "student_comments" WHERE "id" = $1`;

  pool
    .query(queryText, [commentId])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in DELETE comment", err);
      res.sendStatus(500);
    });
});

module.exports = router;
