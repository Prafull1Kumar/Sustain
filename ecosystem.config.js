module.exports = {
  apps: [
    {
      script: 'dist/index.js',
      instances: 2,
      autorestart: true,
      watch: true,
      env: {
        LOG_LEVEL: 'info',
        DB_HOST: 'sustain-app.cji8semeum2o.us-east-2.rds.amazonaws.com',
        DB_PORT: 5432,
        DB_USER: 'postgres',
        DB_PASSWORD: 'temp#123456!12',
        DB_DATABASE: 'sustain',
        DB_SCHEMA: 'public'
      }
    }
  ]
};
