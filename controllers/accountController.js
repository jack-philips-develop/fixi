const getNextSequenceValue = require('../utilities/database/counter/getNextSequenceValue');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')

const signUp = async (req, res) => {
  const id = await getNextSequenceValue('userid', 23984);
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;
    const user = new User({ firstName, lastName, phoneNumber, password, _id: id });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  const { phoneNumber, password } = req.query;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.jwtToken);

    res.set('Authorization', `Bearer ${token}`);
    return res.status(200).json({ message: 'Login successful', user: { firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  signUp,
  signIn,
};
