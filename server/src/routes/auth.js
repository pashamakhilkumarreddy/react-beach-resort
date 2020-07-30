const router = require('express').Router(); // eslint-disable-line new-cap

const {
  register,
  login,
} = require('../controllers');

router.post('/register', register)
  .post('/login', login);

module.exports = router;
