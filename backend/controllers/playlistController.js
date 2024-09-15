const Playlist = require('../models/Playlist');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createPlaylist = async (req, res) => {
    const { name, description } = req.body;

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token and get userId
    let userId;
    // try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = decoded.id;
    // } catch (err) {
        // return res.status(401).json({ success: false, message: 'Invalid token' });
    // }

    try {
        const playlist = new Playlist({
            userId:userId,
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


const deletePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const playlist = await Playlist.findByIdAndDelete(playlistId);
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }
        res.status(200).json({ success: true, message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.params; // Expect songId to be in the request body

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }

        // Check if the song is already in the playlist
        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ success: false, message: 'Song already in playlist' });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({ success: true, message: 'Song added to playlist', playlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove song from playlist
const removeSongFromPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.params; // Expect songId to be in the request body

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }

        // Check if the song is in the playlist
        if (!playlist.songs.includes(songId)) {
            return res.status(400).json({ success: false, message: 'Song not found in playlist' });
        }

        playlist.songs = playlist.songs.filter(id => id !== songId);
        await playlist.save();

        res.status(200).json({ success: true, message: 'Song removed from playlist', playlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPlaylist, getPlaylists, getPlaylist, deletePlaylist,addSongToPlaylist,removeSongFromPlaylist };
