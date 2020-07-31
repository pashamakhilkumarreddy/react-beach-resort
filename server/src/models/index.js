const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config');

const {
  // DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  options,
} = config.db.postgres;

const db = {};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, options);

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model =
      require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
