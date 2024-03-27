const pool = require("../modules/pool");


const incrementGrades = async () => {
  try {
    // Start a transaction
    await pool.query('BEGIN');

    // SQL query to increment the grades
    const updateQuery = 'UPDATE students SET grade = grade + 1 WHERE grade < 14';
    const res = await pool.query(updateQuery);

    // Commit the transaction
    await pool.query('END');

    console.log(`Grades incremented for ${res.rowCount} students with grade less than 14`);
  } catch (err) {
    // If an error is caught, rollback the transaction
    await pool.query('ROLLBACK');
    console.error('Error during grade increment:', err.message);
  }
};
 
module.exports = { incrementGrades };
