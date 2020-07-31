/*
  eslint-disable new-cap
*/
const bcrypt = require('bcryptjs');
const {
  sign,
} = require('jsonwebtoken');

const {
  genUsername,
} = require('../utils/helpers');
const {
  jwt,
} = require('../config');

const hashPassword = async (user) => {
  try {
    const SALT_FACTOR = 12;
    if (!user.changed('password')) {
      return;
    }
    const hashedPassword = await bcrypt.hash(user.password, SALT_FACTOR);
    if (hashedPassword) {
      user.setDataValue('password', hashedPassword);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const JWT_SECRET = jwt.JWT_SECRET;
const JWT_ISSUER = jwt.JWT_ISSUER;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    username: {
      type: DataTypes.STRING,
      defaultValue() {
        return genUsername();
      },
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
    },
    mobile: {
      type: DataTypes.STRING,
      unique: true,
    },
    dob: {
      type: DataTypes.STRING,
    },
    doj: {
      type: DataTypes.DATE,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isPremiumUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isUserVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isUserArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: false,
    tableName: 'users',
    hooks: {
      // beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword,
    },
  });

  User.prototype.formattedUserObj = function formattedUserObj() {
    const userObj = {
      username: this.username,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    };
    return userObj;
  };

  User.prototype.comparePassword = async function comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.createRefreshToken = function createRefreshToken() {
    try {
      const JWT_REFRESH_TOKEN_EXPIRY = jwt.JWT_REFRESH_TOKEN_EXPIRY;
      const payload = {
        username: this.username,
        email: this.email,
        isAdmin: this.isAdmin,
      };
      return sign(payload, JWT_SECRET, {
        algorithm: 'HS384',
        expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
        issuer: JWT_ISSUER,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  User.prototype.createAccessToken = function createAccessToken() {
    try {
      const JWT_ACCESS_TOKEN_EXPIRY = jwt.JWT_ACCESS_TOKEN_EXPIRY;
      const payload = {
        username: this.username,
        email: this.email,
        isAdmin: this.isAdmin,
      };
      return sign(payload, JWT_SECRET, {
        algorithm: 'HS384',
        expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
        issuer: JWT_ISSUER,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return User;
};
