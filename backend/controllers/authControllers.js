const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    console.log('Registering user with email:', email); // Debug log for incoming request

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email); // Debug log if user exists
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            console.log('Password and confirm password do not match'); // Debug log for password mismatch
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully'); // Debug log for successful hashing

        // Create user
        const user = await User.create({ email, password: hashPassword });
        console.log('User created:', user); // Debug log for user creation

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error); // Debug log for caught errors
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not exists' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRE_KEY, { expiresIn: '12h' });

        res.status(200).json({ token, userId: user._id });

    } catch (error) {

        res.status(500).json({ message: 'Server error' });

    }

}

module.exports = { registerUser, loginUser }