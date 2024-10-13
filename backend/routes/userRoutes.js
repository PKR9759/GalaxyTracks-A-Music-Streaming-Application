const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userControllers');
const router = express.Router();

router.get('/profile', getUserProfile); // Fetch profile
router.put('/profile', updateUserProfile); // Update profile

module.exports = router;
