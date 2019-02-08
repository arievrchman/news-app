const User = require('../models/model_user')
const jwtSignUp = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.client_id
const client = new OAuth2Client(CLIENT_ID);

module.exports = {

  signIn: (req, res) => {
    let data = ''
    client.verifyIdToken({
      idToken: req.body.token,
      audience: CLIENT_ID
    })
      .then(ticket => {
        data = ticket.payload
        return User
          .findOne({
            email: data.email
          }).lean()
      })
      .then(user => {
        if (user) {
          res.status(200).json({ token: jwtSignUp(user) })
        } else {
          let input = {
            name: data.name,
            email: data.email
          }
          return User
            .create(input)
            .then(newUser => {
              res.status(201).json({ user: newUser, token: jwtSignUp(newUser) })
            })
        }
      })
      .catch(err => {
        res.status(500).json({
          err: err.message
        })
      })
  },

  verify: (req,res) => {
    
  }


}