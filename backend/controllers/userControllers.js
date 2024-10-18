// User Controller

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    const { name, profilePicture, email } = req.body;
    
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Add checks for profilePicture
        if (profilePicture && profilePicture.length > 1000000) { // Example size limit (1MB)
            return res.status(400).json({ message: 'Profile picture is too large. Please upload a smaller file.' });
        }

        const user = await User.findByIdAndUpdate(
            decoded.id,
            { name, email, profilePicture },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
