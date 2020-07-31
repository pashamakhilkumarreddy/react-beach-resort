const Redis = require('ioredis');
const {
  db: {
    redis,
  },
} = require('../config');

const HOST = redis.DB_HOST;
const PORT = redis.DB_PORT;
const PASSWORD = redis.DB_PASSWORD;

module.exports = new Redis({
  port: PORT,
  host: HOST,
  password: PASSWORD,
});
