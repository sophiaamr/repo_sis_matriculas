const loginController = require('../controllers/loginController')
const express = require('express')
const router = express.Router()

router.get('/login', loginController.getLogin)


module.exports = router