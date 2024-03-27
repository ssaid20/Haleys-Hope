const cron = require('node-cron');
const { incrementGrades } = require('../routes/gradeService');
const pool = require("../modules/pool")



const checkAndRunDueCronJobs = async () => {
  try {
    const result = await pool.query(`SELECT * FROM cron WHERE scheduled_date <= NOW() AND (is_completed = FALSE OR is_completed IS NULL)`);
    const dueCronJobs = result.rows;
    console.log(`Found ${dueCronJobs.length} due cron jobs.`);
    
    for (const job of dueCronJobs) {
      await incrementGrades();
      await pool.query(`UPDATE cron SET is_completed = TRUE WHERE id = $1`, [job.id]);
      console.log(`Cron job ${job.id} completed.`);
    }  
  } catch (err) {
    console.error('Error checking or running due cron jobs:', err.message);
  }
};

const setupCronJobs = () => {
  // Run once on startup
  checkAndRunDueCronJobs();

  // Schedule future cron jobs
  cron.schedule('0 0 1 8 *', async () => {
    console.log('Running scheduled grade increment job');
    await incrementGrades();
    // Here you might want to mark the job as completed if you're creating future cron job entries in your database
  });
};




// -----OLD CRON JOB CODE-----
// const setupCronJobs = () => {
//   cron.schedule('0 0 1 8 *', () => {
//     console.log('Running grade increment job');
//     incrementGrades();
//   });
// };

module.exports = { setupCronJobs };
