// TODO: revise pathes
const path = require('path');

module.exports = {
  apps: [{
    script: path.join(__dirname, '/bin/www'),
    error_file: path.join(__dirname, '/logs/err.log'),
    out_file: path.join(__dirname, '/logs/out.log'),
    log_file: path.join(__dirname, '/logs/combined.log'),
    watch: ['/lib/helper_data.js',
      '/lib/helper_ops.js',
      '/lib/bigToes.js'].map((p) => path.join(__dirname, p)),
    exec_mode: 'fork',
    detached: true,
    listen_timeout: 3000,
    wait_ready: true,
  }],

  deploy: {
    production: {
      'user': 'SSH_USERNAME',
      'host': 'SSH_HOSTMACHINE',
      'ref': 'origin/master',
      'repo': 'GIT_REPOSITORY',
      'path': 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
