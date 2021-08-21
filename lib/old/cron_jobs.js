// const dotenv = require('dotenv');
// dotenv.config();

// /**
//  * pass to maintainance mode
//  * https://github.com/daniely-93/nodejs-server-maintenance#readme
//  * https://healthchecks.io/projects/d066a263-0e99-4088-b1b0-dbbd67d688a4/checks/
//  */
// const https = require('https');

// const CronJob = require('cron').CronJob;
// // Always sort and sometimes setView.
// // “At every 10th minute.”
// // Update public view: because of deactivated items after user choice
// const job_1 = new CronJob('* */10 * * * *', async function() {
//   logger_.log({level: 'info', message: 'set public view (index page)'});
//   // https://hc-ping.com/${process.env.AT_EVERY_10_MIN_CRON}
//   db.sortDB();
//   db.setView();
//   https.get(`https://hc-ping.com/${process.env.AT_EVERY_10_MIN_CRON}`)
//       .on('error', (err) => {
//         console.log('Ping failed: ' + err);
//       });
// }, null, true, 'America/Los_Angeles');

// // “Midnight”*
// // Deactivate old, Clean old then
// // Update public view and persist
// const job_2 = new CronJob('00 00 00 * * *', async function() {
//   logger_.log({level: 'info', message: 'persist listings to db'});
//   // https://hc-ping.com/${process.env.MIDNIGHT_CRON}
//   db.deactivateOld();
//   db.cleanOld();
//   db.sortDB();
//   db.setView();
//   db.persist();
//   https.get(`https://hc-ping.com/${process.env.MIDNIGHT_CRON}`)
//       .on('error', (err) => {
//         console.log('Ping failed: ' + err);
//       });
// }, null, true, 'America/Los_Angeles');
