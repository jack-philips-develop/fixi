const getNextSequenceValue = require('../utilities/database/counterFunction/getNextSequenceValue');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')

const signUp = async (req, res) => {
  const id = await getNextSequenceValue('userid', 23984);
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const user = new User({ firstName, lastName, phoneNumber, _id: id });
    const token = jwt.sign({ id }, jwtConfig.jwtToken);

    await user.save();

    res.set('Authorization', `Bearer ${token}`);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  const { phoneNumber, password } = req.query;

  console.log('***req.params',req.query)

  try {
    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    // Successful login (add your token generation or session logic here)
    return res.status(200).json({ message: 'Login successful', user: { firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  signUp,
  signIn,
};
