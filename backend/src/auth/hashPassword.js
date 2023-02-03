const argon = require("argon2");

const hashOptions = {
  type: argon.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const passwordHash = (password) => {
  return argon.hash(password, hashOptions);
};

module.exports = passwordHash;
