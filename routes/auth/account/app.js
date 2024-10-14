const express = require('express');
const router = express.Router();
const accountController = require('../../../controllers/accountController')
const userController = require('../../../controllers/userController');
const jwtMiddleware = require('../../../utilities/token/jwtMiddleware');
const verifyToken = require('../../../utilities/token/jwtMiddleware');

// router.get('/', verifyToken, userController.getUserById);
router.post('/signup', accountController.signUp);          //sign up
router.get('/signin', accountController.signIn);          //sign in


module.exports = router;