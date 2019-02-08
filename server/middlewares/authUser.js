const jwt = require('jsonwebtoken');

function verifyUser (req,res,next) {
  // console.log(req.body, 'ini body')
  // console.log(req.headers.token)
  try{
    const token = jwt.verify(req.headers.token, process.env.jwt_secret);
    res.status(200).json('Authorized')
  }
  catch {
    res.status(401).json('Unauthorized')
  }
}

module.exports = verifyUser