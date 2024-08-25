// controllers/playlistController.js
const Playlist = require('../models/playlist');
const axios = require('axios');

const createPlaylist = async (req, res) => {
    const { name, description } = req.body;
    try {
        const playlist = new Playlist({
            userId: req.userId,
            name,
            description,
            songs: []
        });
        await playlist.save();
        res.status(201).json({ success: true, playlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ userId: req.userId });
        res.status(200).json({ success: true, playlists });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }
        const songPromises = playlist.songs.map(async (songId) => {
            const response = await axios.get(`https://saavn.dev/api/song/${songId}`);
            return response.data.data[0];
        });
        const songs = await Promise.all(songPromises);
        res.status(200).json({ success: true, playlist: { ...playlist._doc, songs } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPlaylist, getPlaylists, getPlaylist };
