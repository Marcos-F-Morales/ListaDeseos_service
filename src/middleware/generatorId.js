const crypto = require("crypto");

function genShareId() {
  return crypto.randomBytes(16).toString("hex"); // 32 caracteres hex
}

module.exports = {
  genShareId
};
