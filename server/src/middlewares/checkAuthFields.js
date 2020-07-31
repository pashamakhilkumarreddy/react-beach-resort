const {
  emptyEmailText,
  emptyPasswordText,
} = require('../utils/constants');
const {
  isValidEmail,
  isValidPassword,
} = require('../utils/validations');

module.exports = {
  validateAuthFields(req, res, next) {
    try {
      const {
        email,
        password,
      } = req.body;
      const errors = [];
      const formattedEmail = email &&
        (typeof email === 'string') && email.trim();
      const formattedPassword = password &&
        (typeof password === 'string') && password.trim();
      if (!formattedEmail) {
        errors.push(emptyEmailText);
      }
      if (!formattedPassword) {
        errors.push(emptyPasswordText);
      }
      if (errors.length) {
        res.status(401).send({
          success: false,
          statusMessages: [
            ...errors,
          ],
        });
        return;
      }
      const emailValidation = isValidEmail(formattedEmail);
      const passwordValidtion = isValidPassword(formattedPassword);
      if (!emailValidation.isValid) {
        errors.push(emailValidation.message);
      }
      if (!passwordValidtion.isValid) {
        errors.push(passwordValidtion.message);
      }
      if (errors.length) {
        res.status(401).send({
          success: false,
          statusMessages: [
            ...errors,
          ],
        });
        return;
      }
      req.body.email = formattedEmail;
      req.body.password = formattedPassword;
      return next();
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        statusMessages: [
          'Internal server error',
        ],
      });
    }
  },
};
