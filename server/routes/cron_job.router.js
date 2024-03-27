const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

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
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("req.body", req.body);
  const newCron = req.body;
  const queryText = `INSERT INTO "cron" ("scheduled_date") VALUES ($1)`;
  const values = [newCron.date];
  console.log("values", values);
  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error in Post new cron", err);
      res.sendStatus(500);
    });
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
