const router = require('express').Router()
const UserController = require('../controllers/controller_user')

router.post('/auth/google', UserController.signIn)

module.exports = router