const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET request for the YOUNGER versions of the CTOPP and WIST with regular GORT
router.get("/young/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const queryText = `
  SELECT
  s.id as student_id,
  s.first_name,
  s.last_name,
  gort.*,
  wist.*,
  ctopp.elison_scaled_score,
  ctopp.blending_words_scaled_score,
  ctopp.sound_matching_scaled_score,
  ctopp.memory_for_digits_scaled_score,
  ctopp.nonword_repetition_scaled_score,
  ctopp.rapid_digit_naming_scaled_score,
  ctopp.rapid_letter_naming_scaled_score,
  ctopp.rapid_color_naming_scaled_score,
  ctopp.rapid_object_naming,
  ctopp.blending_nonwords_scaled_score,
  ctopp.phonological_awareness_composite,
  ctopp.phonological_memory_composite,
  ctopp.rapid_symbolic_naming_composite,
  ctopp.rapid_non_symbolic_naming_composite
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

// GET request for OLDER versions of CTOPP and WIST with regular GORT
router.get("/older/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    const queryText = `
    SELECT
    s.id as student_id,
    s.first_name,
    s.last_name,
    gort.*,
    wist.*,
    ctopp.elison_scaled_score,
    ctopp.blending_words_scaled_score,
    ctopp.phoneme_isolation_scaled_score,
    ctopp.memory_for_digits_scaled_score,
    ctopp.nonword_repetition_scaled_score,
    ctopp.rapid_digit_naming_scaled_score,
    ctopp.rapid_letter_naming_scaled_score,
    ctopp.blending_nonwords_scaled_score,
    ctopp.segmenting_nonwords_scaled_score,
    ctopp.phonological_awareness_composite,
    ctopp.phonological_memory_composite,
    ctopp.rapid_symbolic_naming_composite,
    ctopp.alt_phonological_awareness
  FROM
    students s
  JOIN gort ON s.id = gort.student_id
  JOIN secondary_wist wist ON s.id = wist.student_id AND gort.date = wist.date
  JOIN older_ctopp ctopp ON s.id = ctopp.student_id AND wist.date = ctopp.date
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
