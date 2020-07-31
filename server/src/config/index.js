module.exports = {
  server: {
    PORT: process.env.PORT || 4000,
  },
  db: {
    postgres: {
      DB_PORT: process.env.DB_PORT || 5432,
      DB_NAME: process.env.DB_NAME || 'test',
      DB_USER: process.env.DB_USER || 'johndoe',
      DB_PASS: process.env.DB_PASS || 'stark',
      options: {
        dialect: process.env.DB_DIALECT || 'postgres',
        // host: process.env.DB_HOST || 'localhost',
      },
    },
    redis: {
      DB_PORT: process.env.REDIS_PORT || 6379,
      DB_HOST: process.env.REDIS_HOST || '127.0.0.1',
      DB_PASSWORD: process.env.REDIS_PASSWORD || 'J0hnDo$#!',
    },
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET || 'r0eNjKHDx5JEDOPOUZrmGQjrLNE5k4uFMt3wpxoVbqM', // eslint-disable-line max-len
    JWT_ISSUER: process.env.JWT_ISSUER || 'johndode',
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || '90d',
    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY || '30m',
  },
};
