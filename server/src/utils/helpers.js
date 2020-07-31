const {
  v4: uuidv4,
  v1: uuidv1,
} = require('uuid');

const genUsername = () => {
  return uuidv4();
};

const genUniqId = () => {
  return uuidv1();
};


module.exports = {
  genUsername,
  genUniqId,
};
