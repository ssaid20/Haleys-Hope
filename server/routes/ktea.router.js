const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { RequestQuoteTwoTone } = require("@mui/icons-material");

// Routes for KTEA test

//TODO reject unauth
// GET route to fetch all KTEA items for a specific student
router.get("/:studentId", rejectUnauthenticated, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Query to fetch all KTEA items for the given student ID
    const query = "SELECT * FROM ktea WHERE student_id = $1";
    const { rows } = await pool.query(query, [studentId]);

    // Sending the response with the KTEA items
    res.json(rows);
  } catch (error) {
    console.error("Error fetching KTEA items:", error);
    res.status(500).send("Internal Server Error");
  }
});

//router to get a specific test
router.get("/kteaResults/:testId", rejectUnauthenticated, (req, res) => {
  const testId = req.params.testId;
  const queryText = 'SELECT * FROM "ktea" WHERE "id" = $1';
  pool
    .query(queryText, [testId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error completing SELECT KTEA query for test id", err);
      res.sendStatus(500);
    });
});

// POST route for KTEA
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    const {
      student_id,
      date,
      examiner_id,
      lwr_scaled_score,
      lwr_percentile,
      spelling_scaled_score,
      spelling_percentile,
    } = req.body;
    const query = ` INSERT INTO ktea (
            student_id, date, examiner_id, lwr_scaled_score, lwr_percentile, spelling_scaled_score, spelling_percentile
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7);`;
    const values = [
      student_id,
      date,
      examiner_id,
      lwr_scaled_score,
      lwr_percentile,
      spelling_scaled_score,
      spelling_percentile,
    ];
    await pool.query(query, values);

    res.status(201).send("KTEA record added successfully");
  } catch (error) {
    console.error("Error adding KTEA record:", error);
    res.status(500).send("Internal Server Error");
  }
});
// PUT route for KTEA
router.put("/:student_id/:id", rejectUnauthenticated, (req, res) => {
  const studentId = req.params.student_id;
  const testId = req.params.id;

  const updatedKtea = req.body;

  // Constructing the query dynamically based on the fields provided in the body
  let querySet = [];
  for (let key in updatedKtea) {
    if (
      updatedKtea.hasOwnProperty(key) &&
      key !== "student_id" &&
      key !== "id"
    ) {
      querySet.push(`"${key}" = '${updatedKtea[key]}'`);
    }
  }
  if (querySet.length === 0) {
    return res.status(400).send("No update fields provided");
  }

  const queryText = `UPDATE "ktea" SET ${querySet.join(
    ", "
  )} WHERE "student_id" = $1 AND "id" = $2`;

  pool
    .query(queryText, [studentId, testId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error completing UPDATE ktea query", err);
      res.sendStatus(500);
    });
}); // end router.put
// router.put("/:student_id/:id", async (req, res) => {
//   try {
//     const studentId = req.params.student_id; // TODO: may just be id from front end
//     const testId = req.params.id;
//     const {
//       date,
//       examiner_id,
//       lwr_scaled_score,
//       lwr_percentile,
//       spelling_scaled_score,
//       spelling_percentile,
//     } = req.body;
//     const query = `UPDATE ktea SET
//       date = $2,
//       examiner_id = $3,
//       lwr_scaled_score = $4,
//       lwr_percentile = $5,
//       spelling_scaled_score = $6,
//       spelling_percentile = $7
//       WHERE student_id = $1;`;
//     const values = [
//       studentId,
//       date,
//       examiner_id,
//       lwr_scaled_score,
//       lwr_percentile,
//       spelling_scaled_score,
//       spelling_percentile,
//     ];
//     await pool.query(query, values);

//     res.status(200).send("KTEA record updated successfully");
//   } catch (error) {
//     console.error("Error updating KTEA record:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
