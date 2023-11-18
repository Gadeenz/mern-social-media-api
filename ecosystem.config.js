module.exports = {
  apps : [  {
    name: 'central fish agency',
    script: './dist/src/index.js',
    instances: process.env.WEB_CONCURRENCY ||1,
    exec_mode: 'cluster',
  }]
};
