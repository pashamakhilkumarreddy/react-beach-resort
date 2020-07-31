const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const responseTime = require('response-time');
const slowDown = require('express-slow-down');
const logger = require('morgan');

const {
  server: {
    PORT,
  },
} = require('./config');
const {
  sequelize,
} = require('./models');
const app = express();

app.use(require('express-status-monitor')({
  title: 'Server Status',
  path: '/status',
  spans: [{
    interval: 1,
    retention: 60,
  },
  {
    interval: 5,
    retention: 60,
  },
  {
    interval: 15,
    retention: 60,
  },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [{
    protocol: 'http',
    host: 'localhost',
    path: '/',
    port: '3000',
  }],
}))
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(responseTime())
  .use(logger('dev'))
  /* eslint-disable no-multi-str */
  .use(logger('dev'))
  .use(slowDown({
    windowMs: 60 * 60 * 1000,
    delayAfter: 300,
    delayMs: 500,
  }));

require('./routes')({
  app,
});

sequelize.sync({
  force: false,
}).then(() => {
  app.listen(PORT, () => {
    console.info(`Application is up and running on ${PORT}`);
  });
}).catch((err) => {
  console.error(err);
});
