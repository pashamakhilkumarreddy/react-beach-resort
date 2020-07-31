const {
  User,
} = require('../models');
const redis = require('../utils/redis');

module.exports = {
  async register(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        res.status(403).send({
          success: false,
          statusMessages: [
            'A user already exists with the given email address!',
          ],
        });
        return;
      }
      const newUser = await User.create({
        email,
        password,
      });
      if (!newUser) {
        throw new Error('Unable to create a new user!');
      }
      res.status(201).send({
        success: true,
        statusMessages: [
          'Successfully created a new user',
        ],
      });
      return;
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
      const {
        email,
        password,
      } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        res.status(404).send({
          success: false,
          statusMessages: [
            'No user is found with the provided email',
          ],
        });
        return;
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(403).send({
          success: false,
          statusMessages: [
            'Login information is incorrect',
          ],
        });
        return;
      }
      await redis.hmset(user.username, 'email', user.email);
      await redis.expire(user.username, 24 * 60 * 60);
      res.status(200).send({
        success: true,
        user: user.formattedUserObj(),
        tokens: {
          refresh: user.createRefreshToken(),
          access: user.createAccessToken(),
        },
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
