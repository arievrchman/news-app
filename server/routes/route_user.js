const router = require('express').Router()
const UserController = require('../controllers/controller_user')

router.post('/auth/google', UserController.signIn)
router.post('/user/verify', UserController.verify)

module.exports = router