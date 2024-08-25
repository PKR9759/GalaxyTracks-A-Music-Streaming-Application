const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jwtwebtoken');

const registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {

        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password not match' });
        }

        //hash password using bcrypt
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            password: hashPassword
        })

        res.status(200).json({ message: "User registered successfully" });

    }

    catch (error) {

        res.status(500).json({ message: 'Server error' });

    }
}


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