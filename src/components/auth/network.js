const express = require('express')
const router = express.Router()
require('dotenv').config()

const authCtrl = require('./controller')
const {checkDuplicateUserOrMail, checkRolesExisted} = require('../../middlewares/verifySignup') 

router.post('/signup', checkDuplicateUserOrMail, checkRolesExisted, authCtrl.signUp)

router.post('/signin', authCtrl.signIn)

module.exports = router