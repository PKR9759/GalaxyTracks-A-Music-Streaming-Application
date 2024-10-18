const Playlist = require('../models/Playlist');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createPlaylist = async (req, res) => {
    const { name, description } = req.body;

    // Retrieve token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token and extract userId
    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Create a new playlist for the user
    try {
        const playlist = new Playlist({
            userId: userId,
            name,
            description,
            songs: [] // Initial empty songs array
        });

        // Save the playlist to the database
        await playlist.save();

        // Respond with the created playlist
        res.status(201).json({ success: true, playlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getPlaylists = async (req, res) => {
    // Retrieve token from headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract Bearer token
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token and extract user ID
    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = decoded.id;
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Find playlists by userId
    try {
        const playlists = await Playlist.find({ userId }).select('name _id'); // Select only name and ID
        const playlistArray = playlists.map(playlist => ({
            id: playlist._id,
            name: playlist.name,
        }));

        res.status(200).json({ success: true, playlists: playlistArray });
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

        // Fetch song details from the external API and extract relevant fields
        const songPromises = playlist.songs.map(async (songId) => {
            try {
                const response = await axios.get(`https://saavn.dev/api/songs/${songId}`);
                const songData = response.data.data[0]; // Assuming response is structured this way

                // Extract the fields needed by the frontend
                return {
                    id: songId, // Include song ID in the response
                    name: songData.name,
                    artist:songData.artists?.primary.map(artist => artist.name).join(', '), // Extract primary artists
                    duration: songData.duration, // Duration in seconds
                    image: songData.image[1]?.url || songData.image[0]?.url || '', // Use the second image if available, fallback to the first
                    url: songData.downloadUrl[0].url
                };
            } catch (error) {
                console.error(`Error fetching song ${songId}:`, error.message);
                return {
                    id: songId, // Include the song ID even if there's an error
                    title: 'Unknown Title',
                    primary_artists: 'Unknown Artist',
                    duration: 0,
                    image: '', // Fallback in case of error
                };
            }
        });

        const songs = await Promise.all(songPromises);

        // Send the playlist data along with simplified song details
        res.status(200).json({
            success: true,
            playlist: {
                id: playlist._id,
                name: playlist.name,
                description: playlist.description,
                userId: playlist.userId,
                songs // Simplified song list for frontend
            }
        });
    } catch (error) {
        console.error('Error fetching playlist:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const editPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    // Retrieve token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token and extract userId
    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Find and update the playlist
    try {
        const playlist = await Playlist.findOne({ _id: playlistId, userId: userId });
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }

        playlist.name = name || playlist.name;
        playlist.description = description || playlist.description;

        // Save the updated playlist
        await playlist.save();

        res.status(200).json({ success: true, message: 'Playlist updated successfully', playlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const deletePlaylist = async (req, res) => {
    const { playlistId } = req.params; // Expecting playlistId from URL parameters
    try {
        const playlist = await Playlist.findByIdAndDelete(playlistId); // Delete the playlist
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }
        res.status(200).json({ success: true, message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const addSongToPlaylist = async (req, res) => {
    const { playlistId ,songId} = req.params; // Assuming songId is passed in the request parameters
    
    console.log(playlistId,songId);
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ success: false, message: 'Playlist not found' });
        }

        // Check if the songId is already in the playlist's songs array
        if (playlist.songs.includes(songId.toString())) {
            return res.status(400).json({ success: false, message: 'Song already exists in the playlist' });
        }

        // Add the songId to the songs array
        playlist.songs.push(songId);
        await playlist.save();

        return res.status(200).json({ success: true, message: 'Song added to playlist successfully' });
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
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

module.exports = { createPlaylist, getPlaylists, getPlaylist, editPlaylist,deletePlaylist,addSongToPlaylist,removeSongFromPlaylist };
