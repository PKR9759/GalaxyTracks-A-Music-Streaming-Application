const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getHomePageData = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            userId = decoded.id;
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Retrieve latest releases
        const latestReleases = [];
        try {
            const latestReleasesResponse = await axios.get('https://saavn.dev/api/playlists?link=https://www.jiosaavn.com/featured/latest-hindi-songs/TRw,fDVtT7c14faDlWgB3A__');
            const songs = latestReleasesResponse.data.data.songs;
            songs.forEach(song => {
                latestReleases.push({
                    id: song.id,
                    name: song.name,
                    duration: song.duration,
                    artist: song.artists.primary.map(artist => artist.name).join(', '),
                    image: song.image?.[1]?.url || '',
                    url: song.downloadUrl[0].url
                });
            });
        } catch (error) {
            console.error('Error fetching latest releases from JioSaavn:', error);
        }

        // Return the data to the frontend
        return res.json({
            success: true,
            data: {
                latestReleases // Only return latest releases
            }
        });

    } catch (error) {
        console.error('Error fetching home page data:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
