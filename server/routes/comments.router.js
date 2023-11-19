const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET route to fetch all comments
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "student_comments"';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all comments", err);
      res.sendStatus(500);
    });
});

// GET route to fetch a specific comment by studentId
router.get("/:id", (req, res) => {
  const studentId = req.params.id;
  const queryText = 'SELECT * FROM "student_comments" WHERE "student_id" = $1';
  pool
    .query(queryText, [studentId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send("Comment not found");
      } else {
        res.send(result.rows[0]);
      }
    })
    .catch((err) => {
      console.error("Error in GET specific comment", err);
      res.sendStatus(500);
    });
});

// POST route to add a new comment
router.post("/", (req, res) => {
  const newComment = req.body;
  const queryText = `
    INSERT INTO "student_comments" ("student_id", "comments") 
    VALUES ($1, $2)
  `;
  const values = [newComment.student_id, newComment.comments];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error in POST new comment", err);
      res.sendStatus(500);
    });
});

// PUT route to update a comment's information
router.put("/:studentId/:commentId", (req, res) => {
  const studentId = req.params.studentId;
  const commentId = req.params.commentId;
  const updatedComment = req.body.comments;

  const queryText = `
      UPDATE "student_comments" SET "comments" = $1
      WHERE "id" = $2 AND "student_id" = $3
    `;
  const values = [updatedComment, commentId, studentId];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in PUT update comment", err);
      res.sendStatus(500);
    });
});

// DELETE route to remove a comment
router.delete("/:id", (req, res) => {
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
