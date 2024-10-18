
const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.post('/create', playlistController.createPlaylist);
router.get('/all', playlistController.getPlaylists);
router.get('/:playlistId', playlistController.getPlaylist);
router.delete('/:playlistId', playlistController.deletePlaylist); 
router.post('/:playlistId/addSong/:songId', playlistController.addSongToPlaylist); 
router.post('/:playlistId/removeSong/:songId', playlistController.removeSongFromPlaylist); 
router.put('/:playlistId', playlistController.editPlaylist);
module.exports = router;
