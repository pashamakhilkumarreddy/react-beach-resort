module.exports = {
  async register(req, res) {
    try {
      res.status(201).send({
        success: true,
        statusMessages: [
          'Successfully created a new user',
        ],
      });
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
  async login(req, res) {
    try {
      res.status(200).send({
        success: true,
        statusMessages: [
          'Login is successfull',
        ],
      });
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
