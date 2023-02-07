const express = require('express');
const Auth = require('../controllers/auth.controller');
const router = express.Router();


router.post('/login', Auth.userLogin);
router.patch('/changePassword', Auth.PasswordChange);
router.post('/forgotPassword', Auth.forgotPassword);
router.post('/resetPassword', Auth.verfiyTokenNpassword);

module.exports = router;
