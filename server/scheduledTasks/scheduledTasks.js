const cron = require('node-cron');
const { incrementGrades } = require('../routes/gradeService');

const setupCronJobs = () => {
  cron.schedule('0 0 1 8 *', () => {
    console.log('Running grade increment job');
    incrementGrades();
  });
};

module.exports = { setupCronJobs };
