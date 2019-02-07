const jwt = require('jsonwebtoken');

function jwtSignUp(data) {
  const token = jwt.sign(data, process.env.jwt_secret);

  return token
}

module.exports = jwtSignUp