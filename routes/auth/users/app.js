const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController');

router.post('/', userController.createUser);          //Create User
router.get('/', userController.getUsers);             //Get All Users
router.get('/:id', userController.getUserById);       //Get User By Id
router.patch('/:id', userController.updateUser);      //Update User By Id
router.delete('/:id', userController.deleteUser);     //Update User By Id

module.exports = router;