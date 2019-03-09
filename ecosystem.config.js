module.exports = {
  apps: [{
    name: 'nodeapi-boilerplate',
    script: 'dist/index.js',
    watch: ['./src'],
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    args: [
      '--color'
    ],
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};