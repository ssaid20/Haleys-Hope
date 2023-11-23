const cron = require('node-cron');
const { incrementGrades } = require('../routes/gradeService');

const setupCronJobs = () => {
  cron.schedule('*/1 * * * *', () => {
    console.log('Running grade increment job');
    incrementGrades();
  });
};

module.exports = { setupCronJobs };
