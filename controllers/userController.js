const getNextSequenceValue = require('../utilities/database/counterFunction/getNextSequenceValue');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')

const createUser = async (req, res) => {
  const id = await getNextSequenceValue('userid', 23984);
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;
    const token = jwt.sign({ id }, jwtConfig.jwtToken);
    const user = new User({ firstName, lastName, phoneNumber, _id: id, password });

    await user.save();

    res.set('Authorization', `Bearer ${token}`);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
