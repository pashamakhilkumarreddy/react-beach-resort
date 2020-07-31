const router = require('express').Router(); // eslint-disable-line new-cap

const {
  validateAuthFields,
} = require('../middlewares');
const {
  register,
  login,
} = require('../controllers');

router.post('/register', validateAuthFields, register)
  .post('/login', validateAuthFields, login);

module.exports = router;
