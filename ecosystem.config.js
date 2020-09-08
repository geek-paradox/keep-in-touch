module.exports = {
  apps : [{
    script: 'app.js',
    watch: '.'
  }, {
    script: './cron/notifyUser.js',
    watch: ['./cron/notifyUser.js']
  }],
};
