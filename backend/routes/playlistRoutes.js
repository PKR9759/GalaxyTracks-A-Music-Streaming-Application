// routes/playlistRoutes.js
const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create',  playlistController.createPlaylist);
router.get('/all',  playlistController.getPlaylists);
router.get('/:playlistId', playlistController.getPlaylist);

module.exports = router;
