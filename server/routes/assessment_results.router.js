const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/young/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const queryText = `
  SELECT
  s.id as student_id,
  s.first_name,
  s.last_name,
  gort.*,
  wist.*,
  ctopp.*
FROM
  students s
JOIN gort ON s.id = gort.student_id
JOIN elementary_wist wist ON s.id = wist.student_id AND gort.date = wist.date
JOIN younger_ctopp ctopp ON s.id = ctopp.student_id AND wist.date = ctopp.date
WHERE
  s.id = $1
`;
  pool
    .query(queryText, [studentId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error in GET for ASSESSMENT", err);
      res.sendStatus(500);
    });
});

module.exports = router;
