const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET route to fetch cron job configuration
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM "cron" ORDER BY "scheduled_date" ASC ';

  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET cron job", err);
      res.sendStatus(500);
    });
});

//POST ROUTE:
router.post("/", rejectUnauthenticated, async (req, res) => {
  const date  = req.body.date;
  const jobYear = Number(new Date(req.body.date).getFullYear());
  console.log("req.body", req.body, jobYear);
  try {
    const existingJobCheck = await pool.query(
      'SELECT 1 FROM "cron" WHERE EXTRACT(YEAR FROM scheduled_date) = $1',
      [jobYear]
    );

    if (existingJobCheck.rows.length > 0) {
      console.log("year already in cron");
      // If a job for this year already exists, return an error
      return res.status(400).json({ error: "A cron job for this year already exists." });
    }

    // If no job for this year exists, insert the new cron job
    const insertQuery = `INSERT INTO "cron" ("scheduled_date", "job_year") VALUES ($1, $2)`;
    await pool.query(insertQuery, [date, jobYear]);
    console.log("year getting added to cron");

    res.sendStatus(201);
  } catch (err) {
    console.error("Error in Post new cron", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

//PUT ROUTE:
router.put("/update", rejectUnauthenticated, (req, res) => {
  const updatedCron = req.body;
  console.log(req.body);
  const queryText = `UPDATE "cron" SET "scheduled_date" = $1 where "id" = $2`;
  const values = [updatedCron.updatedDate, updatedCron.jobId];
  pool
    .query(queryText, values)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in PUT update cron date", err);
      res.sendStatus(500);
    });
});

//PUT ROUTE to mark completed
router.put("/complete", rejectUnauthenticated, (req, res) => {
  const updatedCron = req.body;
  const queryText = `UPDATE "cron" SET "is_completed" = TRUE WHERE "id" = $1`;
  const values = [updatedCron.id];
  pool
    .query(queryText, values)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in PUT update is_completed to true", err);
      res.sendStatus(500);
    });
});

module.exports = router;
