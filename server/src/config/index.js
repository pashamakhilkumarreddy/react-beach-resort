module.exports = {
  server: {
    PORT: process.env.PORT || 4000,
  },
  db: {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME || 'test',
    DB_USER: process.env.DB_USER || 'johndoe',
    DB_PASS: process.env.DB_PASS || 'stark',
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_ISSUER: process.env.JWT_ISSUER || 'johndode',
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || '90d',
    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY || '30m',
  },
};
