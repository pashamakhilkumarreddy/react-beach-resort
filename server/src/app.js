const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const responseTime = require('response-time');
const slowDown = require('express-slow-down');

const {
  server: {
    PORT,
  },
} = require('./config');
const app = express();

app.use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(responseTime())
  .use(slowDown({
    windowMs: 60 * 60 * 1000,
    delayAfter: 300,
    delayMs: 500,
  }));

require('./routes')({
  app,
});

app.listen(PORT, () => {
  console.info(`Application is up and running on ${PORT}`);
});
