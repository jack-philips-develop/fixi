const express = require('express');
const router = express.Router();
const accountController = require('../../../controllers/accountController');

router.post('/signup', accountController.signUp);         //sign up
router.get('/signin', accountController.signIn);          //sign in


module.exports = router;