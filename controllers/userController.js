const getNextSequenceValue = require('../utilities/database/counter/getNextSequenceValue');
const messageClass = require('../utilities/messageClass/messageClass');
const jwtConfig = require('../config/jwt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const id = await getNextSequenceValue('userid', 23984);
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;
    const user = new User({ firstName, lastName, phoneNumber, _id: id, password });

    await user.save();

    res.status(201).json(messageClass(false, user, 'User successfuly created'));
  } catch (err) {
    res.status(400).json(messageClass(true, null, err.message));
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(messageClass(false, users, 'report successfuly created'));
  } catch (err) {
    res.status(500).json(messageClass(true, null, err.message));
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json(messageClass(true, null, 'User not found'));
    }
    res.json(messageClass(false, user, 'User report successfuly created'));
  } catch (err) {
    res.status(500).json(messageClass(true, null, err.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, phoneNumber },
      { new: true }
    );
    if (!user) {
      return res.status(404).json(messageClass(true, null, 'User not found'));
    }
    res.json(messageClass(false, user, 'User successfuly updated'));
  } catch (err) {
    res.status(500).json(messageClass(true, null, err.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json(messageClass(true, null, 'User not found'));
    }
    res.json(messageClass(false, null, 'User deleted'));
  } catch (err) {
    res.status(500).json(messageClass(true, null, err.message));
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
