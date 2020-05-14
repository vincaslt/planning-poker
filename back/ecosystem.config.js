module.exports = {
  apps: [
    {
      name: 'ws-pp.vincas.dev',
      script: './dist/index.js',
      env: {
        PORT: 5000,
        NODE_ENV: 'production',
        PUBLIC_URL: 'https://pp.vincas.dev',
      },
    },
  ],
};
